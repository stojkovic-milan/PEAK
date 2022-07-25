using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PEAK.Data;
using PEAK.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using System.Net.Mail;
using System.Net;

namespace PEAK.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlaninarskoDrustvoController : Controller
    {
        public FileController fileControler {get; set;}
        public IImageService _imageSevice;
        public ApplicationDbContext Context { get; set; }

        public PlaninarskoDrustvoController(ApplicationDbContext context, IImageService imgSevice)
        {
            Context = context;
            this._imageSevice = imgSevice;
        }
        //vracamo sva planinarska drusstva za stranicu vezanu za drustva
        [HttpGet]
        [Route("PreuzmiSvaPlaninarskaDrustva")]
        public async Task<ActionResult> PreuzmiSvaPlaninarskaDrustva()
        {
            return Ok(await Context.PlaninarskaDrustva.Where(p => p.Kreirano==true).Select(p =>
            new
            {
                p.ID,
                p.Naziv,
                p.Adresa,
                p.BrojClanova,
                p.BrojTelefona,
                p.Clanarina,
                p.SlikaDrustva,
                p.Clanovi,
                p.Obavestenja,
                p.Utisci,
                p.Dogadjaji
            }).ToListAsync());
        }

        [HttpGet]
        [Route("PreuzmiPlaninarskaDrustvaFilter/{minclanarina}/{maxclanarina}")]
        public async Task<ActionResult> PreuzmiPlaninarskaDrustvaFilter(int minclanarina, int maxclanarina)
        {
            return Ok(await Context.PlaninarskaDrustva.Select(p =>
            new
            {
                p.ID,
                p.Naziv,
                p.Adresa,
                p.BrojClanova,
                p.BrojTelefona,
                p.Clanarina,
                p.SlikaDrustva,
                p.Clanovi,
                p.Obavestenja,
                p.Utisci,
                p.Dogadjaji
            })
            .Where(p=>p.Clanarina>=minclanarina&&p.Clanarina<=maxclanarina)
            .ToListAsync());
        }

        [HttpGet]
        [Route("PreuzmiSvaNeodobrenaDrustva")]
        public async Task<ActionResult> PreuzmiSvaNeodobrenaDrustva()
        {
            var drus = await Context.PlaninarskaDrustva.Where(p => p.Kreirano==false).ToListAsync();
            return Ok(drus);
        }

        //Ovom funkcijom vracamo onsovne informacije koje ce da budu prikazane na toj strani za drustvo
        [HttpGet]
        [Route("PreuzmiInformacijZaDrustvo/{idDrustva}")]
        public  async Task<ActionResult> PreuzmiInformacijZaDrustvo(int idDrustva)
        {
            if(idDrustva<0)
            {
                return BadRequest("Id ne moze da bude negativan broj");
            }
            var dr = await Context.PlaninarskaDrustva.Where(p => p.ID == idDrustva).FirstOrDefaultAsync();
            if(dr==null)
            {
                return BadRequest("Drustvo za koje se traze informacije se ne postoji");
            }
            return Ok(
                new
                {
                    Naziv = dr.Naziv,
                    Adresa = dr.Adresa,
                    BrojTelefona = dr.BrojTelefona,
                    Clanarina = dr.Clanarina,
                    BrojClanova = dr.BrojClanova,
                    Dogadjaji = dr.Dogadjaji,
                    SlikaDrustva = dr.SlikaDrustva
                });
        }
        //Ovom funkcijom dobijamo info o clanovima drustva
        [HttpGet]
        [Route("PreuzmiSveClanove/{idDrustva}")]
        public async Task<ActionResult> PreuzmiSveClanove(int idDrustva)
        {
            if(idDrustva<0)
            {
                return BadRequest("Pogresan id je poslat");
            }
            var drus = await Context.PlaninarskaDrustva.Where(p => p.ID == idDrustva)
                                    .Include(p => p.Clanovi)
                                    .FirstOrDefaultAsync();
            if(drus==null)
            {
                return BadRequest("Ne postoji drustvo sa ovim id-em");
            }
            return Ok(drus.Clanovi.Select(p =>
            new
            {
                Id = p.Id,
                Ime = p.Ime,
                Prezime = p.Prezime,
                Adresa = p.Adresa,
                Spremnost = p.Spremnost,
                ProfilnaSlika = p.ProfilnaSlika
            }
            ).ToList());
        }
        //Ovom funkcijom dodajemo novo planinarsko drustvo
        [HttpPost]
        [Route("DodajPlaninarskoDrustvo/{adresa}/{broj}/{naziv}/{clanarina}/{vlasnik}")]
        public async Task<ActionResult> DodajPlaninarskoDrustvo(String adresa, String broj, String naziv,int clanarina, string vlasnik, [FromBody]String file)
        {
            if(String.IsNullOrEmpty(adresa) || adresa.Length>70)
            {
                return BadRequest("Adresa je nevalidna");
            }
            if(String.IsNullOrEmpty(naziv) || naziv.Length>70)
            {
                return BadRequest("Naziv je nevalidan");
            }
            if(String.IsNullOrEmpty(broj) || broj.Length>11)
            {
                return BadRequest("Broj je nevalidan");
            }
            if(clanarina<0)
            {
                return BadRequest("Clanarina ne sme da bude negativan broj");
            }
            var drus = await Context.PlaninarskaDrustva.Where(p => p.Naziv == naziv && p.Adresa == adresa).FirstOrDefaultAsync();
            if(drus!=null)
            {
                return BadRequest("Drustvo sa ovim podacima vec postoji");
            }
            if(String.IsNullOrEmpty(vlasnik))
            {
                return BadRequest("Neodgovarajuci parametri");
            }
            var korisnik = await Context.Korisnici.Where(p => p.Id==vlasnik).FirstOrDefaultAsync();
            if(korisnik==null)
            {
                return BadRequest("Ne postoji korisnik");
            }
            var username = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var urlo = file;
            PlaninarskoDrustvo p = new PlaninarskoDrustvo();
            p.Adresa = adresa;
            p.Clanarina = clanarina;
            p.Naziv = naziv;
            p.BrojTelefona = broj;
            p.SlikaDrustva = urlo;
            p.Kreirano=false;
            int i = 0;
            if(p.Clanovi!=null)
            {
                foreach (var e in p.Clanovi)
                    i++;
            }
            p.BrojClanova = i;
            Context.PlaninarskaDrustva.Add(p);
            await Context.SaveChangesAsync();
            korisnik.UpravljaDrustvom=p;
            Context.Korisnici.Update(korisnik);
            await Context.SaveChangesAsync();
            return Ok("Uspesno je dodato drustvo");
        }
        //Drustvo ce pomocu ove funckije da organizuje neki novi dogadjaj
        [HttpPost]
        [Route("OrganizujDogadjaj/{idDogadjaja}/{idDrustva}")]
        public async Task<ActionResult> OrganizujDogadjaj(int idDogadjaja,int idDrustva)
        {
            if(idDogadjaja<0 || idDrustva<0)
            {
                return BadRequest("Id ne sme da bude negativan");
            }
            var dog = await Context.Dogadjaji.Where(p => p.ID == idDogadjaja).FirstOrDefaultAsync();
            if(dog==null)
            {
                return BadRequest("Ovaj dogadjaj ne postoji!");
            }
            var drus = await Context.PlaninarskaDrustva.Where(p => p.ID == idDrustva).FirstOrDefaultAsync();
            if (drus == null)
            {
                return BadRequest("Ovo drustvo ne postoji");
            }
            drus.Dogadjaji.Add(dog);
            await Context.SaveChangesAsync();
            dog.Organizator = drus;
            await Context.SaveChangesAsync();
            return Ok("Organizator: " + drus.Naziv + ", naziv dogadjaja: " + dog.Naziv);
        }
        
        //Neki novi clan se uclanjuje u drustvo
        [HttpPost]
        [Route("DodajClana/{idKorisnika}/{idDrustva}")]
        public async Task<ActionResult> DodajClana(string idKorisnika, int idDrustva)
        {
            if(String.IsNullOrEmpty(idKorisnika) || idDrustva<0)
            {
                return BadRequest("ID ne sme da bude negativna vrednost!");
            }
            var kor = await Context.Users.Include(p => p.PlaninarskoDrustvo).Where(p => p.Id == idKorisnika).FirstOrDefaultAsync();
            if(kor==null)
            {
                return BadRequest("Ne postoji ovaj korisnik");
            }
            var drus = await Context.PlaninarskaDrustva.Include(p=>p.Clanovi).Where(p => p.ID == idDrustva).FirstOrDefaultAsync();
            if(drus==null)
            {
                return BadRequest("Drustvo sa ovim id-em ne postoji");
            }
            drus.Clanovi.Add(kor);
            kor.PlaninarskoDrustvo = drus;
            drus.BrojClanova++;
            await Context.SaveChangesAsync();
            return Ok(kor.Ime + " " + kor.Prezime + " je sada clan: " + drus.Naziv);
        }
        //korisnik napusta drustvo
        [HttpDelete]
        [Route("NapustiDrustvo/{idKorisnika}/{idDrustva}")]
        public async Task<ActionResult> NapustiDrustvo(String idKorisnika, int idDrustva)
        {
            if(String.IsNullOrEmpty(idKorisnika) || idDrustva<0)
            {
                return BadRequest("Pogresni parametri");
            }
            var kor = await Context.Users.Where(p => p.Id == idKorisnika).FirstOrDefaultAsync();
            if(kor==null)
            {
                return BadRequest("Ne postoji korisnik");
            }
            var dr = await Context.PlaninarskaDrustva.Where(p => p.ID == idDrustva).FirstOrDefaultAsync();
            if(dr==null)
            {
                return BadRequest("Ne postoji drustvo");
            }
            String ime = kor.Ime;
            String prezime = kor.Prezime;
            dr.Clanovi.Remove(kor);
            dr.BrojClanova--;
            await Context.SaveChangesAsync();
            return Ok("Clan: " + ime + " " + prezime + " je uspesno napustio drustvo " + dr.Naziv);
        }
        //Menjanje podataka o drustvu, a za to ima privilegije samo sef drustva
        [HttpPut]
        [Route("IzmeniPodatkeODrustvu/{idDrustva}/{naziv}/{brojTel}/{adresa}/{clanarina}")]
        public async Task<ActionResult> IzmeniPodatkeODrustvu(int idDrustva, String naziv,String brojTel,String adresa,int clanarina)
        {
            if (String.IsNullOrEmpty(adresa) || adresa.Length > 70)
            {
                return BadRequest("Adresa je nevalidna");
            }
            if (String.IsNullOrEmpty(naziv) || naziv.Length > 70)
            {
                return BadRequest("Naziv je nevalidan");
            }
            if (String.IsNullOrEmpty(brojTel) || brojTel.Length > 11)
            {
                return BadRequest("Broj je nevalidan");
            }
            if (clanarina < 0)
            {
                return BadRequest("Clanarina ne sme da bude negativan broj");
            }
            if(idDrustva<0)
            {
                return BadRequest("Id ne moze da bude negativan broj");
            }

            var dr = await Context.PlaninarskaDrustva.Where(p => p.ID == idDrustva).FirstOrDefaultAsync();
            if(dr==null)
            {
                return BadRequest("Ovo drustvo ne postoji");
            }
            dr.Naziv = naziv;
            dr.Adresa = adresa;
            dr.Clanarina = clanarina;
            dr.BrojTelefona = brojTel;
            await Context.SaveChangesAsync();
            return Ok("Uspesno ste obavili izmenu podataka za drustvo");
        }
        //Vracaju se dogadjaji koje je odredjeno drustvo organizvalo i ovo se koristi kada prikazujemo malo vise informaicja za drustvo.
        [HttpGet]
        [Route("VratiDogadjajeDrustva/{idDrusva}")]
        public async Task<ActionResult> VratiDogadjajeDrustva(int idDrustva)
        {
            if(idDrustva<0)
            {
                return BadRequest("Id ne moze da bude negativan");
            }
            var dr = await Context.PlaninarskaDrustva.Where(p => p.ID == idDrustva).FirstOrDefaultAsync();
            return Ok(dr.Dogadjaji.Select(p =>
            new
            {
                Naziv = p.Naziv,
                Datum = p.Datum,
                Tip = p.Tip,
                Ruta = p.Ruta.Naziv,
                Organizator = p.Organizator
            }));
        }



        //[HttpPost]
        //[Route("NapraviObavestenje/{idDrustva}/{sadrzaj}")]
        //public async Task<ActionResult> NapraviObavestenje(int idDrustva, String sadrzaj)
        //{

        //}

        //[HttpPost]
        //[Route("NapraviObjavu/{idDrustva}/{sadrzaj}")]
        //public async Task<ActionResult> NapraviObavestenje(int idDrustva, String sadrzaj)
        //{

        //}

        [HttpGet]
        [Route("PreuzmiZahteveZaUclanjivanje/{drustvoId}")]
        public async Task<ActionResult> PreuzmiZahteveZaUclanjivanje(int drustvoId)
        {
            if(drustvoId<0)
            {
                return BadRequest("Neodgovarajuci parametri");
            }
            var drustvo = await Context.PlaninarskaDrustva.Where(p => p.ID==drustvoId).FirstOrDefaultAsync();
            if(drustvo==null)
            {
                return BadRequest("Ne postoji ovo drustvo");
            }
            var korisnici = await Context.Korisnici.Where(p => p.PlaninarskoDrustvo==drustvo && p.Prihvacen==false).ToListAsync();
            return Ok(korisnici);
        }

        [HttpGet]
        [Route("PreuzmiOdobreneKorisnike/{drustvoId}")]
        public async Task<ActionResult> PreuzmiOdobreneKorisnike(int drustvoId)
        {
            if(drustvoId<0)
            {
                return BadRequest("Neodgovarajuci parametri");
            }
            var drustvo = await Context.PlaninarskaDrustva.Where(p => p.ID==drustvoId).Include(p => p.Clanovi).FirstOrDefaultAsync();
            if(drustvo==null)
            {
                return BadRequest("Ne postoji ovo drustvo");
            }
            var korisnici = await Context.Korisnici.Where(p => p.PlaninarskoDrustvo==drustvo && p.Prihvacen==true).Include(p => p.PlaninarskoDrustvo).ToListAsync();
            if(korisnici==null)
            {
                return BadRequest("Ne postoje odobreni korisnici!");
            }
            return Ok(korisnici);
        }

        [HttpGet]
        [Route("PruzmiSvaNeprihvacenaDrustva")]
        public async Task<ActionResult> PruzmiSvaNeprihvacenaDrustva()
        {
            var drustva = await Context.PlaninarskaDrustva.Where(p => p.Kreirano==false)
                                                        .ToListAsync();
            return Ok(drustva);
                                                        
        }

        [HttpPut]
        [Route("PromeniStanjeDrustva/{drustvoId}")]
        public async Task<ActionResult> PromeniStanjeDrustva(int drustvoId)
        {
            if(drustvoId<0)
            {
                return BadRequest("Neodgovarajuci parametri");
            }
            var drustvo = await Context.PlaninarskaDrustva.Where(p => p.ID==drustvoId).Include(p=>p.NalogDrustva).FirstOrDefaultAsync();
            if(drustvo==null)
            {
                return BadRequest("Ne postoji drustvo");
            }
            if(drustvo.Kreirano==false)
            {
                drustvo.Kreirano=true;
            }
            else if(drustvo.Kreirano==true)
            {
                drustvo.Kreirano=false;
            }
            try
            {
                Context.PlaninarskaDrustva.Update(drustvo);
                await Context.SaveChangesAsync();
                if(drustvo.Kreirano)
                ObavestiUspesno(drustvo, drustvo.NalogDrustva);
                return Ok(drustvo);
            }
            catch (Exception e)
            {
                
                return BadRequest(e.Message);
            }
        }
        private async void ObavestiUspesno(PlaninarskoDrustvo d, ApplicationUser k)
        {
            String poruka;
            poruka = $"Postovani {k.Ime}\n\nPlaninarsko drustvo " + d.Naziv + " je uspesno kreirano." + "\n\nProfilu drustva mozete pristupiti na sledecem linku\n" +
               /* HtmlEncoder.Default.Encode(callbackUrl)*/"https://localhost:5001/planinarskoDrustvo/" + d.ID +
            "\n\nPEAK";
            SmtpClient Client = new SmtpClient()
            {
                Host = "smtp.outlook.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential()
                {
                    UserName = "peaksw@outlook.com",
                    Password = "Kjkszpj1@"
                }
            };
            MailAddress fromMail = new MailAddress("peaksw@outlook.com", "PEAK");
            MailAddress toMail = new MailAddress(k.Email, k.Ime);
            MailMessage message = new MailMessage()
            {
                From = fromMail,
                Subject = "Uspesno kreirano planinarsko drustvo",
                Body = poruka
            };

            message.To.Add(toMail);
            Client.SendMailAsync(message);
        }

        [HttpDelete]
        [Route("ObisiDrustvo/{drustvoId}")]
        public async Task<ActionResult> ObisiDrustvo(int drustvoId)
        {
            if(drustvoId<0)
            {
                return BadRequest("Neodgovarajuci parametri");
            }
            var drustvo = await Context.PlaninarskaDrustva.Where(p => p.ID==drustvoId).Include(p=>p.NalogDrustva).FirstOrDefaultAsync();
            if(drustvo==null)
            {
                return BadRequest("Ne postoji drustvo");
            }
            try
            {
                Context.PlaninarskaDrustva.Remove(drustvo);
                //TODO:Mail
                ObavestiBrisanje(drustvo, drustvo.NalogDrustva);
                await Context.SaveChangesAsync();
                return Ok("Uspseno obrisano drustvo");
            }
            catch (Exception e)
            {
                
                return BadRequest(e.Message);
            }
        }
        private async void ObavestiBrisanje(PlaninarskoDrustvo d, ApplicationUser k)
        {
            String poruka;
            poruka = $"Postovani {k.Ime}\n\nPlaninarsko drustvo " + d.Naziv + " je obrisano. \n\nMolimo Vas, podnesite novi zahtev sa ispravljenim podacima.\n" +
            "\n\nPEAK";
            SmtpClient Client = new SmtpClient()
            {
                Host = "smtp.outlook.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential()
                {
                    UserName = "peaksw@outlook.com",
                    Password = "Kjkszpj1@"
                }
            };
            MailAddress fromMail = new MailAddress("peaksw@outlook.com", "PEAK");
            MailAddress toMail = new MailAddress(k.Email, k.Ime);
            MailMessage message = new MailMessage()
            {
                From = fromMail,
                Subject = "Obrisano planinarsko drustvo",
                Body = poruka
            };

            message.To.Add(toMail);
            Client.SendMailAsync(message);
        }
    }
}
