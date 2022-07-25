using IdentityServer4.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PEAK.Data;
using PEAK.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json.Linq;
using System.Security.Claims;
using System.Net.Mail;
using System.Net;
using Microsoft.AspNetCore.Identity;

namespace PEAK.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DogadjajController : Controller
    {

        public FileController fileControler {get; set;}
        public IImageService _imageSevice;
        private readonly UserManager<ApplicationUser> _userManager;

        public ApplicationDbContext Context { get; set; }

        public DogadjajController(ApplicationDbContext context, IImageService imgSevice, UserManager<ApplicationUser> userManager)
        {
            Context = context;
            this._imageSevice = imgSevice;
            _userManager = userManager;
        }

        [HttpGet]
        [Route("PreuzmiDogadjaje")]
        public async Task<ActionResult> PreuzmiDogadjaje()
        {
            try
            {
                var dogadaji = await Context.Dogadjaji.Where(p => p.potvrdjen==true).ToListAsync();
                return Ok(dogadaji);
            }
            
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpGet]
        [Route("PreuzmiPopularneDogadjaje/{n}")]
        public async Task<ActionResult> PreuzmiPopularneDogadjaje(int n)
        {
            try
            {
                var dogadaji = await Context.Dogadjaji.Include(p => p.Korisnici).Where(p => p.potvrdjen == true).Select(p => new
                {
                    Dogadjaj = p,
                    BrojPrijava = p.Korisnici.Count()
                }).ToListAsync();
                var popularniDogadjaji = dogadaji.OrderByDescending(o => o.BrojPrijava).ToList().Take(n);
                return Ok(popularniDogadjaji);
            }

            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        
        [HttpGet]
        [Route("PreuzmiPrvihN/{n}")]
        public ActionResult PreuzmiPrvihN(int n)
        {
            try
            {
                var dogadajiPrvihN =Context.Dogadjaji
                        .Where(p => p.potvrdjen==true)
                        .ToList()
                        .Take(n);
                return Ok(dogadajiPrvihN);
            }
            
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("PreuzmiDogadjaje/{datumOd}/{datumDo}/{locationID}/{sortType}")]
        public ActionResult PreuzmiDogadjajeFilterovano(DateTime datumOd, DateTime datumDo, 
        int locationID, int sortType){
            
            if(locationID>0)
            {
                    if(sortType==0)
                    {
                        var dogadaji = Context.Dogadjaji
                        .Where(p => p.potvrdjen==true)
                        .Include(p=>p.Ruta)
                        .Where(p=>p.Datum>datumOd && p.Datum<datumDo 
                        && p.Ruta.Lokacije.Any(p=>p.ID==locationID) ).Select(p => new
                        {
                            Dogadjaj = p,
                            BrojPrijava = p.Korisnici.Count()
                        });
                        var popularniDogadjaji = dogadaji.OrderByDescending(o => o.BrojPrijava);
                        var filterovaniDogadjaji=popularniDogadjaji.Select(p=>p.Dogadjaj).ToList();
                        return Ok(filterovaniDogadjaji);
                    }
                else if(sortType==1)
                    {
                        var dogadaji = Context.Dogadjaji
                        .Where(p => p.potvrdjen==true)
                        .Include(p=>p.Ruta)
                        .Where(p=>p.Datum>datumOd && p.Datum<datumDo 
                        && p.Ruta.Lokacije.Any(p=>p.ID==locationID) ).Select(p => new
                        {
                            Dogadjaj = p
                        });
                        var popularniDogadjaji = dogadaji.OrderByDescending(o => o.Dogadjaj.Datum);
                        var filterovaniDogadjaji=popularniDogadjaji.Select(p=>p.Dogadjaj).ToList();
                        return Ok(filterovaniDogadjaji);
                    }
                else if(sortType==2)
                    {
                        var dogadaji = Context.Dogadjaji
                        .Where(p => p.potvrdjen==true)
                        .Include(p=>p.Ruta)
                        .Where(p=>p.Datum>datumOd && p.Datum<datumDo 
                        && p.Ruta.Lokacije.Any(p=>p.ID==locationID) ).Select(p => new
                        {
                            Dogadjaj = p
                        });
                        var popularniDogadjaji = dogadaji.OrderBy(o => o.Dogadjaj.Datum);
                        var filterovaniDogadjaji=popularniDogadjaji.Select(p=>p.Dogadjaj).ToList();
                        return Ok(filterovaniDogadjaji);
                    }
                else if(sortType==3)
                    {
                        var dogadaji = Context.Dogadjaji
                        .Where(p => p.potvrdjen==true)
                        .Include(p=>p.Ruta)
                        .Where(p=>p.Datum>datumOd && p.Datum<datumDo 
                        && p.Ruta.Lokacije.Any(p=>p.ID==locationID) ).Select(p => new
                        {
                            Dogadjaj = p,
                            Tezina = p.Ruta.Tezina
                        });
                        var popularniDogadjaji = dogadaji.OrderBy(o => o.Tezina);
                        var filterovaniDogadjaji=popularniDogadjaji.Select(p=>p.Dogadjaj).ToList();
                        return Ok(filterovaniDogadjaji);
                    }
                else if(sortType==4)
                    {
                        var dogadaji = Context.Dogadjaji
                        .Where(p => p.potvrdjen==true)
                        .Include(p=>p.Ruta)
                        .Where(p=>p.Datum>datumOd && p.Datum<datumDo 
                        && p.Ruta.Lokacije.Any(p=>p.ID==locationID) ).Select(p => new
                        {
                            Dogadjaj = p,
                            Tezina = p.Ruta.Tezina
                        });
                        var popularniDogadjaji = dogadaji.OrderByDescending(o => o.Tezina);
                        var filterovaniDogadjaji=popularniDogadjaji.Select(p=>p.Dogadjaj).ToList();
                        return Ok(filterovaniDogadjaji);
                    }
                else
                {
                    return BadRequest("nije dobro filtrirano");
                }
            }
            else if(locationID==-1)
            {
                    if(sortType==0)
                    {
                        var dogadjaji= Context.Dogadjaji
                        .Where(p => p.potvrdjen==true)
                        .Include(p=>p.Ruta)
                        .Where(p=>p.Datum>datumOd && p.Datum<datumDo)
                        .Select(p => new
                        {
                            Dogadjaj = p,
                            BrojPrijava = p.Korisnici.Count()
                        });
                        var popularniDogadjaji = dogadjaji.OrderByDescending(o => o.BrojPrijava);
                        var filterovaniDogadjaji=popularniDogadjaji.Select(p=>p.Dogadjaj).ToList();
                        return Ok(filterovaniDogadjaji);
                    }
                else if(sortType==1)
                    {
                        var dogadjaji= Context.Dogadjaji
                        .Where(p => p.potvrdjen==true)
                        .Include(p=>p.Ruta)
                        .Where(p=>p.Datum>datumOd && p.Datum<datumDo)
                        .Select(p => new
                        {
                            Dogadjaj = p
                        });
                        var popularniDogadjaji = dogadjaji.OrderByDescending(o => o.Dogadjaj.Datum);
                        var filterovaniDogadjaji=popularniDogadjaji.Select(p=>p.Dogadjaj).ToList();
                        return Ok(filterovaniDogadjaji);
                    }
                else if(sortType==2)
                    {
                        var dogadjaji= Context.Dogadjaji
                        .Where(p => p.potvrdjen==true)
                        .Include(p=>p.Ruta)
                        .Where(p=>p.Datum>datumOd && p.Datum<datumDo)
                        .Select(p => new
                        {
                            Dogadjaj = p
                        });
                        var popularniDogadjaji = dogadjaji.OrderBy(o => o.Dogadjaj.Datum);
                        var filterovaniDogadjaji=popularniDogadjaji.Select(p=>p.Dogadjaj).ToList();
                        return Ok(filterovaniDogadjaji);
                    }
                else if(sortType==3)
                    {
                        var dogadjaji= Context.Dogadjaji
                        .Where(p => p.potvrdjen==true)
                        .Include(p=>p.Ruta)
                        .Where(p=>p.Datum>datumOd && p.Datum<datumDo)
                        .Select(p => new
                        {
                            Dogadjaj = p,
                            Tezina = p.Ruta.Tezina
                        });
                        var popularniDogadjaji = dogadjaji.OrderBy(o => o.Tezina);
                        var filterovaniDogadjaji=popularniDogadjaji.Select(p=>p.Dogadjaj).ToList();
                        return Ok(filterovaniDogadjaji);
                    }
                else if(sortType==4)
                    {
                        var dogadjaji= Context.Dogadjaji
                        .Where(p => p.potvrdjen==true)
                        .Include(p=>p.Ruta)
                        .Where(p=>p.Datum>datumOd && p.Datum<datumDo)
                        .Select(p => new
                        {
                            Dogadjaj = p,
                            Tezina = p.Ruta.Tezina
                        });
                        var popularniDogadjaji = dogadjaji.OrderByDescending(o => o.Tezina);
                        var filterovaniDogadjaji=popularniDogadjaji.Select(p=>p.Dogadjaj).ToList();
                        return Ok(filterovaniDogadjaji);
                    }
                    else
                    {
                        return BadRequest("nije dobro filtrirano");
                    }
            }
            else
            {
                return BadRequest("nije dobro");
            }
        }
            
        
        //Ovo je funkcija koja sluzi da bi se dodao neki novi dogadjaj
        [HttpPost]
        // [Authorize(Roles = "ADMIN")]
        [Route("DodajDogadjaj/{naziv}/{datum}/{tip}/{ruta}/{organizator}")]
        public async Task<ActionResult> DodajDogadjaj(String naziv, DateTime datum, String tip, int ruta, int organizator,[FromBody]String file)
        {
            if (string.IsNullOrEmpty(naziv) || naziv.Length>70)
            {
                return BadRequest("Presli ste limit za broj slova");
            }
            if(string.IsNullOrEmpty(tip) || tip.Length > 40)
            {
                return BadRequest("Presli ste limit za broj slova");
            }
            // if(DateTime.Compare(datum,DateTime.Now)<0)
            // {
            //     return BadRequest("Da bi ste organizovali dogadjaj morate da uneste neki datum koji je veci od trenutnog!");
            // }
            if(ruta<0)
            {
                return BadRequest("Pogresna ruta");
            }
            if(organizator<0)
            {
                return BadRequest("Pogresan organizator");
            }
            var org = await Context.PlaninarskaDrustva.Where(p => p.ID == organizator).Include(p=>p.Clanovi).FirstOrDefaultAsync();
            if(org==null)
            {
                return BadRequest("Ovo drustvo ne postoji");
            }
            var r = await Context.Ruta.Where(p => p.ID == ruta).FirstOrDefaultAsync();
            if(r==null)
            {
                return BadRequest("Na planini ne postoji ova ruta");
            }
            var dog = await Context.Dogadjaji.Where(p => p.Naziv == naziv && DateTime.Compare(datum, p.Datum) == 0).FirstOrDefaultAsync();
            //var urlo =await fileControler.postaviSliku(file);
            //var username = User.FindFirstValue(ClaimTypes.NameIdentifier);
            //string urlo;

            //if(file!=null)
            //{
            //    urlo = await _imageSevice.SaveFile(file, username);
            //}
            //else{
            //    urlo="";
            //}
        
            //ImageResponse slika= JToken.Parse(urlo.ToString()).ToObject<ImageResponse>();
            if (dog == null)
            {
                Dogadjaj d = new Dogadjaj
                {
                    Naziv = naziv,
                    potvrdjen = false,
                    Organizator = org,
                    Ruta = r,
                    Datum = datum,
                    Tip = tip,
                    SlikaDogadjaja = file
                };
                Context.Dogadjaji.Add(d);
                //foreach (var k in org.Clanovi)
                //{
                //    ObavestiKreiranje(d, k, org);
                //}
                await Context.SaveChangesAsync();
                return Ok(d);
            }
            return BadRequest("Postoji vec dogadjaj");
        }
        private async void ObavestiKreiranje(Dogadjaj d, ApplicationUser k, PlaninarskoDrustvo drustvo)
        {
            String poruka;
            poruka = $"Postovani {k.Ime}\n\nPlaninarsko drustvo "+drustvo.Naziv+" ciji ste clan, organizuje novi dogadjaj " + d.Naziv+". \n\nDogadjaju mozete pristupiti na sledecem linku\n" +
               /* HtmlEncoder.Default.Encode(callbackUrl)*/"https://localhost:5001/dogadjaj/" + d.ID + "\n\nUkoliko ste zainteresovani, mozete se prijaviti na dogadjaj i dobijati dalja obavestenja o ovom dogadjaju." + "\n\nPEAK";
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
                Subject = "Novi dogadjaj planinarskog drustva",
                Body = poruka
            };

            message.To.Add(toMail);
            Client.SendMailAsync(message);
            //System.Threading.Thread.Sleep(1000);// RADI
            System.Threading.Thread.Sleep(500);//PROBA
        }
        //Ovo je funkcija koja sluzi da se dogadjaj otkaze ako se nesto nepredvidjeno dogodilo
        //TODO-MS:Autorizacija samo nalog drustva ili admin moze da otkaze dogadjaj
        [Authorize]
        [HttpDelete]
        [Route("OtkaziDogadjaj/{idDogadjaja}")]
        public async Task<ActionResult> OtkaziDogadjaj(int idDogadjaja)
        {
            var user = await _userManager.GetUserAsync(HttpContext.User);

            if (idDogadjaja<0)
            {
                return BadRequest("Pogresan id je poslat za brisanje");
            }
            var dog = await Context.Dogadjaji.Where(p => p.ID == idDogadjaja).Include(p=>p.Korisnici).Include(p=>p.Organizator).ThenInclude(p=>p.NalogDrustva).FirstOrDefaultAsync();
            if(dog==null)
            {
                return BadRequest("Dogadjaj koji pokusavate da otkazete ne postoji");
            }
            if (dog.Organizator.NalogDrustva != user)
                return BadRequest("Ne mozete otkazati dogadjaj drugog drustva");
            foreach (var k in dog.Korisnici)
            {
                 ObavestiOtkazivanje(dog, k);
            }
            Context.Dogadjaji.Remove(dog);
            await Context.SaveChangesAsync();
            return Ok("Dogadjaj je otkazan");
        }
        private async void ObavestiOtkazivanje(Dogadjaj d,ApplicationUser k)
        {
            String poruka;
            poruka = $"Postovani {k.Ime}\n\nDogadjaj "+ d.Naziv+" na koji ste prijavljeni je otkazan od strane organizatora,\n" +
               /* HtmlEncoder.Default.Encode(callbackUrl)*/ "Izvinjavamo se na izazvanoj neprijatnosti i hvala Vam na razumevanju," + "\n\nPEAK";
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
                Subject = "Otkazan dogadjaj na koji ste prijavljeni",
                Body = poruka
            };

            message.To.Add(toMail);
            Client.SendMailAsync(message);
            //System.Threading.Thread.Sleep(1000);// RADI
            System.Threading.Thread.Sleep(500);//PROBA
        }

        //Ako je potrebno da se promeni datum zbog loseg vremena onda se sa ovom funkcijom menja datum.
        [Authorize(Roles = "Drustvo")]
        [HttpPut]
        [Route("PromeniDatumOdrzavanja/{idDogadjaja}/{noviDatum}")]
        public async Task<ActionResult> PromeniDatumOdrzavanja(int idDogadjaja, DateTime noviDatum)
        {
            var user = await _userManager.GetUserAsync(HttpContext.User);
            if (idDogadjaja < 0)
            {
                return BadRequest("Pogresan id je poslat za izmenu");
            }
            if (DateTime.Compare(noviDatum, DateTime.Now) < 0)
            {
                return BadRequest("Ne mozemo da zakazemo dogadjaj u proslosti");
            }
            var dog = await Context.Dogadjaji.Where(p => p.ID == idDogadjaja && p.potvrdjen==true).Include(p=>p.Korisnici).Include(p=>p.Organizator).ThenInclude(p=>p.NalogDrustva).FirstOrDefaultAsync();

            if (dog == null)
            {
                return BadRequest("Ne postoji ovaj dogadjaj");
            }
            if (dog.Organizator.NalogDrustva != user)
                return BadRequest("Ne mozete promeniti dogadjaj drugog drustva");
            if (DateTime.Compare(noviDatum, dog.Datum) == 0)
            {
                return BadRequest("Ako zelite da izmenite datum zasto ponovo unosite isto vreme?");
            }
            foreach (var k in dog.Korisnici)
            {
                ObavestiPomeranje(dog, k,noviDatum);
            }
            dog.Datum = noviDatum;
            await Context.SaveChangesAsync();
            return Ok("Vreme odrzavanja je izmenjeno i sada je: " + dog.Datum);
        }
        private async void ObavestiPomeranje(Dogadjaj d, ApplicationUser k,DateTime noviDatum)
        {
            String poruka;
            poruka = $"Postovani {k.Ime}\n\nDatum odrzavanja dogadjaja " + d.Naziv + " na koji ste prijavljeni je pomeren za "+ noviDatum.ToString() +" od strane organizatora. Dogadjaju mozete pristupiti na sledecem linku\n" +
               /* HtmlEncoder.Default.Encode(callbackUrl)*/"https://localhost:5001/dogadjaj/"+ d.ID + "\n\nIzvinjavamo se na izazvanoj neprijatnosti i hvala Vam na razumevanju \n\nPEAK";
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
                Subject = "Pomerenje dogadjaja na koji ste prijavljeni",
                Body = poruka
            };

            message.To.Add(toMail);
            Client.SendMailAsync(message);
            //System.Threading.Thread.Sleep(1000);// RADI
            System.Threading.Thread.Sleep(500);//PROBA
        }
        //Ovom funkcijom se vrsi prijavljivanje korisnika za neki dogadjaj
        [HttpPut]
        [Route("DodajPrijavljenogKorisnika/{idDogadjaja}/{idKorisnika}")]
        public async Task<ActionResult> DodajPrijavljenogKorisnika(int idDogadjaja,string idKorisnika)
        {
            if(idDogadjaja<0 || String.IsNullOrEmpty(idKorisnika))
            {
                return BadRequest("Pogresan id je poslat");
            }
            var dog = await Context.Dogadjaji.Include(p=>p.Korisnici).Where(p => p.ID == idDogadjaja).FirstOrDefaultAsync();
            if(dog==null)
            {
                return BadRequest("Dogadjaj za koji korisnik zeli da se prijavi ne postoji!");
            }
            var kor = await Context.Users.Include(p=>p.Dogadjaji).Where(p => p.Id == idKorisnika).FirstOrDefaultAsync();
            if(kor==null)
            {
                return BadRequest("Ovaj korisnik ne postoji!");
            }
            dog.Korisnici.Add(kor);
            kor.Dogadjaji.Add(dog);
            await Context.SaveChangesAsync();
            return Ok("Korisnik se uspesno prijavio za dogadjaj");
        }

        //Ovom funckijom neki korisnik ipak odlaze odlazak na dogadjaj
        [HttpDelete]
        [Route("OtkaziOdlazak/{idDogadjaja}/{idKorisnika}")]
        public async Task<ActionResult> OtkaziOdlazak(int idDogadjaja, String idKorisnika)
        {
            if(idDogadjaja<0 || String.IsNullOrEmpty(idKorisnika))
            {
                return BadRequest("Pogresan id je poslat");
            }
            var dog = await Context.Dogadjaji.Where(p => p.ID == idDogadjaja).FirstOrDefaultAsync();
            if(dog==null)
            {
                return BadRequest("Ne postoji ovaj dogadjaj");
            }
            var kor = await Context.Users.Where(p => p.Id == idKorisnika).FirstOrDefaultAsync();
            if(kor==null)
            {
                return BadRequest("Ovaj korisnik ne postoji");
            }
            if(!dog.Korisnici.Contains(kor))
            {
                return BadRequest("Korisnik se nije bio prijavio za ovaj dogadjaja");
            }
            dog.Korisnici.Remove(kor);
            await Context.SaveChangesAsync();
            return BadRequest("Korisnik je uspesno otkazao odlazak na dogadjaj");
        }
        //Vraca sve prijavljene ucesnike za dogadjaj koji su se prijavili ili ako je dogadjaj vec bio onda one koji su se bili prijavili
        [HttpGet]
        [Route("VratiSveUcesnikeNaDogadjaju/{idDogadjaja}")]
        public async Task<ActionResult> VratiSveUcesnikeNaDogadjaju(int idDogadjaja)
        {
            if(idDogadjaja<0)
            {
                return BadRequest("Pogresan id je poslat");
            }
            var dog = await Context.Dogadjaji.Where(p => p.ID == idDogadjaja && p.potvrdjen==true).FirstOrDefaultAsync();
            if (dog == null)
            {
                return BadRequest("Dogadjaj za koji zelite prijavljene korisnike ne postoji");
            }
            return Ok(dog.Korisnici.Select(p =>
                new
                {
                    p.UserName,
                    p.Prezime,
                    p.Email,
                    p.Adresa,
                    p.Interesovanja,
                    p.PhoneNumber,
                    p.PlaninarskoDrustvo
                }
            ).ToList());
        }

        //Ova funkcija sluzi za to kada ispisujemo osnovne informacije za drustvo
        [HttpGet]
        [Route("PreuzmiInformacijeZaDogadjaj/{idDogadjaja}")]
        public async Task<ActionResult> PreuzmiInformacijeZaDogadjaj(int idDogadjaja)
        {
            if(idDogadjaja<0)
            {
                return BadRequest("Id ne sme da bude negativna vrednost");
            }
            var dog = await Context.Dogadjaji.Where(p => p.ID == idDogadjaja && p.potvrdjen==true)
                                             .Include(p => p.Organizator)
                                             .ThenInclude(p=>p.NalogDrustva)
                                             .Include(p => p.Ruta)
                                             .ThenInclude(p=>p.Lokacije)
                                             .Include(p => p.Ruta)
                                             .ThenInclude(p => p.Planina)
                                             .FirstOrDefaultAsync();
            if(dog==null)
            {
                return BadRequest("Ne postoji dogadjaj za kojeg zelimo podatke");
            }
            return Ok(
                new
                {
                    Naziv = dog.Naziv,
                    Datum = dog.Datum,
                    Tip = dog.Tip,
                    RutaNaziv = dog.Ruta.Naziv,
                    RutaTezina = dog.Ruta.Tezina,
                    RutaDuzina = dog.Ruta.Duzina,
                    OrganizatorId = dog.Organizator.ID,
                    Organizator = dog.Organizator.Naziv,
                    Prognoza = dog.Prognoza,
                    SlikaDogadjaja = dog.SlikaDogadjaja,
                    Ruta = dog.Ruta,
                    NalogOrganizatoraId = dog.Organizator.NalogDrustva != null ? dog.Organizator.NalogDrustva.Id : ""
                });
        }

        [HttpGet]
        [Route("PreuzmiDogadjajeNaPlanini/{planinaId}")]
        public async Task<ActionResult> PreuzmiDogadjajeNaPlanini(int planinaId)
        {
            if(planinaId < 0)
            {
                return BadRequest("Id ne sme da bude negativna vrednost");
            }
            var plan = await Context.Planine.Where(p => p.ID==planinaId).FirstOrDefaultAsync();
            var dogadjaji = await Context.Dogadjaji.Where(p => p.Ruta.Planina==plan && p.potvrdjen==true).ToListAsync();

            if(dogadjaji==null)
            {
                return BadRequest("Ne postoje dogadjaji na ovoj planini!");
            }

            return Ok(dogadjaji);
        }

        [HttpGet]
        [Route("PreuzmiPrethodneDogadjajeDrustva/{drustvoId}/{dogadjajId}")]
        public async Task<ActionResult> PreuzmiPrethodneDogadjajeDrustva(int drustvoId, int dogadjajId)
        {
            if(drustvoId<0 || dogadjajId < 0)
            {
                return BadRequest("Id ne sme da bude negativna vrednost!");
            }
            var drs = await Context.PlaninarskaDrustva.Where(p => p.ID==drustvoId).FirstOrDefaultAsync();
            if(drs==null)
            {
                return BadRequest("Ne postoji zadato drustvo!!");
            }
            var dogadajajGlavni = await Context.Dogadjaji.Where(p => p.ID==dogadjajId && p.potvrdjen==true).FirstOrDefaultAsync();
            if(drs==null)
            {
                return BadRequest("Ne postoji zadati dogadjaj!!");
            }
            var prethodniDogadjaji = await Context.Dogadjaji.Where(p => p.Organizator==drs && DateTime.Compare(dogadajajGlavni.Datum,p.Datum)>0 && p.potvrdjen==true).ToListAsync();
            if(prethodniDogadjaji==null)
            {
                return BadRequest("Ovo drustvo nema nijedan dogadjaj!");
            }
            if(prethodniDogadjaji.Contains(dogadajajGlavni))
            {
                prethodniDogadjaji.Remove(dogadajajGlavni);
            }
            return Ok(prethodniDogadjaji.Select(p => 
            new
            {
                Naziv = p.Naziv,
                Datum = p.Datum,
                Tip = p.Tip
            }));
        }

        [HttpGet]
        [Route("PreuzmiPrethodneDogadjajeKorisnika/{korisnikId}")]
        public async Task<ActionResult> PreuzmiPrethodneDogadjajeDrustva(string korisnikId)
        {
            var kor = await Context.Korisnici.Where(p => p.Id==korisnikId).Include(p=>p.Dogadjaji).FirstOrDefaultAsync();
            if(kor==null)
            {
                return BadRequest("Ne postoji zadat korisnik!!");
            }
            var prethodniDogadjaji = await Context.Dogadjaji.Where(p => DateTime.Compare(DateTime.Now,p.Datum)>0 
            && p.potvrdjen==true && kor.Dogadjaji.Contains(p)).ToListAsync();
            if(prethodniDogadjaji==null)
            {
                return BadRequest("Ovaj korisnik nema nijedan prethodni dogadjaj!");
            }
            return Ok(prethodniDogadjaji.Select(p => 
            new
            {
                ID=p.ID,
                SlikaDogadjaja=p.SlikaDogadjaja,
                Naziv = p.Naziv,
                Datum = p.Datum,
                Tip = p.Tip
            }));
        }

        [HttpGet]
        [Route("PreuzmiSlicneDogadjaje/{dogadjajId}")]
        public async Task<ActionResult> PreuzmiSlicneDogadjaje(int dogadjajId)
        {
            if (dogadjajId < 0)
            {
                return BadRequest("Id ne sme da bude negativna vrednost!");
            }
            var dogadajajGlavni = await Context.Dogadjaji.Where(p => p.ID == dogadjajId).Include(p=>p.Ruta)
                .ThenInclude(p=>p.Planina).FirstOrDefaultAsync();
            if (dogadajajGlavni == null)
            {
                return BadRequest("Dati dogadjaj ne postoji!");
            }
            var istaPlanina = await Context.Dogadjaji.Include(p=>p.Ruta).ThenInclude(p=>p.Planina)
                .Where(p => p.Ruta.Planina == dogadajajGlavni.Ruta.Planina).ToListAsync();
            istaPlanina.Remove(dogadajajGlavni);
                if (istaPlanina.Count > 3)
                {
                istaPlanina = istaPlanina.GetRange(0, 3);
                }
                else if (istaPlanina.Count < 3)
                {
                var istiTip = await Context.Dogadjaji.Include(p => p.Ruta).ThenInclude(p => p.Planina)
                .Where(p => p.Tip == dogadajajGlavni.Tip).ToListAsync();
                istaPlanina.AddRange(istiTip.GetRange(0, 3 - istaPlanina.Count));
                }
            return Ok(istaPlanina);
        }

        [HttpGet]
        [Route("PreuzmiDogadjajeDrustva/{drustvoId}")]
        public async Task<ActionResult> PreuzmiDogadjajeDrustva(int drustvoId)
        {
            try
            {
            if(drustvoId<0)
            {
                return BadRequest("Id ne sme da bude negativna vrednost!");
            }
            var drs = await Context.PlaninarskaDrustva.Where(p => p.ID==drustvoId)
                                                      .Include(p => p.Dogadjaji)
                                                      .FirstOrDefaultAsync();
            if(drs==null)
               { return BadRequest("Ne postoji drustvo sa zadatim Id-em");}
            return Ok(drs.Dogadjaji);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }

        [HttpGet]
        [Route("PreuzmiSveNeodobreneDogadjaje")]
        public async Task<ActionResult> PreuzmiSveNeodobreneDogadjaje()
        {
            try
            {
                var dogadjaji = await Context.Dogadjaji.Where(p => p.potvrdjen==false).ToListAsync();
                return Ok(dogadjaji);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
            
            
        }
        //TEST IZ SWAGGERA
        //[Authorize(Roles = "Admin")]
        [HttpPut]
        [Route("PromeniStanjeDogadjaja/{dogadjajId}")]
        public async Task<ActionResult> PromeniStanjeDogadjaja(int dogadjajId)
        {
            try
            {
                if(dogadjajId<0)
                {
                    return BadRequest("Id ne sme da bude negativna vrednost");
                }
                var dog = await Context.Dogadjaji.Where(p => p.ID == dogadjajId).Include(p=>p.Organizator).ThenInclude(p=>p.Clanovi).FirstOrDefaultAsync();
                if(dog==null)
                {
                    return BadRequest("Ne postoji dogadjaj");
                }
                if(dog.potvrdjen==false)
                {
                    dog.potvrdjen=true;
                    foreach (var k in dog.Organizator.Clanovi)
                    {
                        ObavestiKreiranje(dog, k, dog.Organizator);
                    }
                }
                else if(dog.potvrdjen==true)
                {
                    dog.potvrdjen=false;
                }
                await Context.SaveChangesAsync();
                return Ok("Dogdajaj je sada prihvacen od strane administarora");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("PreuzmiSveUcensnikeDogadjaja/{dogadjajId}")]
        public async Task<ActionResult> PreuzmiSveUcensnikeDogadjaja(int dogadjajId)
        {
            if (dogadjajId < 0)
            {
                return BadRequest("Neodgovarajuci paramteri");
            }
            var dogadjaj = await Context.Dogadjaji.Where(p => p.ID == dogadjajId).Include(p => p.Korisnici).FirstOrDefaultAsync();
            if (dogadjaj == null)
            {
                return BadRequest("Ne postoji dogadjaj");
            }

            var korisnici = dogadjaj.Korisnici;
            return Ok(dogadjaj);
        }
        [HttpGet]
        [Route("VratiStatistiku")]
        public async Task<ActionResult> VratiStatistiku()
        {
            var rute =await Context.Ruta.Select(p=>p.Duzina).ToListAsync();
            int ukupnaDuzina = 0;
            rute.ForEach(p => ukupnaDuzina += p);
            var brKorisnika = await Context.Korisnici.CountAsync();
            var brDogadjaja = await Context.Dogadjaji.CountAsync();
            return Ok(new
            {
                ukupnaDuzina,brKorisnika,brDogadjaja
            });
        }
    }
}
