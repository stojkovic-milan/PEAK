using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PEAK.Data;
using PEAK.Models;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace PEAK.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UtisakController : Controller
    {
        
        
            public ApplicationDbContext Context { get; set; }
            public UtisakController(ApplicationDbContext context)
            {
                Context = context;
            }

            [Route("PreuzmiUtiskeZaDogadjaj/{idDogadjaja}")]
            [HttpGet]
            public async Task<ActionResult> PreuzmiUtiskeZaDogadjaj(int idDogadjaja)
            {
                //proveri jel moze ovako
                var utisci = await Context.Utisci
                    .Where(p => p.Dogadjaj.ID == idDogadjaja)
                    .Include(p => p.Dogadjaj)
                    .Include(p => p.Drustvo)
                    .Include(p => p.Korisnik)
                    .ToListAsync();
                return Ok(utisci);
            }

            [Route("PreuzmiUtiskeZaDrustvo/{idDrustva}")]
            [HttpGet]
            public async Task<ActionResult> PreuzmiUtiskeZaDrustvo(int idDrustva)
            {
                //proveri jel moze ovako
                var utisci = await Context.Utisci
                    .Where(p => p.Drustvo.ID == idDrustva)
                    .Include(p => p.Dogadjaj)
                    .Include(p => p.Drustvo)
                    .Include(p => p.Korisnik)
                    .ToListAsync();
                return Ok(utisci);
            }

            [Route("DodajUtisak/{komentar}/{ocena}/{iddgdj}/{idplnnrskdrstv}")]
            [HttpPost]
            public async Task<ActionResult> DodajUtisak(string komentar, float ocena, 
                int iddgdj, int idplnnrskdrstv)
            {
            //VALIDACIJA
            if (iddgdj < 0)
            {
                return BadRequest("Dogadjaj ne postoji!");
            }
            //KRAJ VALIDACIJE
            try
            {
                    Dogadjaj dog = await Context.Dogadjaji
                        .Where(p => p.ID == iddgdj)
                        .FirstOrDefaultAsync();
                    PlaninarskoDrustvo pldr = await Context.PlaninarskaDrustva
                        .Where(p => p.ID == idplnnrskdrstv)
                        .FirstOrDefaultAsync();

                    Utisak u = new Utisak
                    {
                        Komentar = komentar,
                        Ocena = ocena,
                        Dogadjaj = dog,
                        Drustvo = pldr
                    };

                    Context.Utisci.Add(u);
                    await Context.SaveChangesAsync();
                    return Ok();
                }
                catch (Exception e)
                {
                    return BadRequest(e.Message);
                }
            }

            [Route("ObrisiUtisak/{id}")]
            [HttpDelete]
            public async Task<ActionResult> IzbrisiUtisak(int id)
            {
                if (id <= 0)
                {
                    return BadRequest();
                }
                try
                {
                    var utisak = await Context.Utisci.FindAsync(id);
                    Context.Utisci.Remove(utisak);
                    await Context.SaveChangesAsync();
                    return Ok();
                }
                catch (Exception e)
                {
                    return BadRequest(e.Message);
                }
            }

            [HttpPost]
            [Route("DodajKomentarZaDogadjaj/{dogadjajId}/{komentar}/{ocena}/{datum}/{korisnikId}")]
            public async Task<ActionResult> DodajKomentarZaDogadjaj(int dogadjajId, String komentar,int ocena, DateTime datum, String korisnikId)
            {
                try
                {
                if(dogadjajId<0)
                {
                    return BadRequest("Id ne sme da bude manji od 0");
                }
                if(ocena<0 || ocena>5)
                {
                    return BadRequest("Ocena mora da bude u rasponu od 0 do 5");
                }
                var dog = await Context.Dogadjaji.Where(p => p.ID==dogadjajId).FirstOrDefaultAsync();
                if(dog==null)
                {
                    return BadRequest("Ovaj dogajajaj ne postoji");
                }
                var kor = await Context.Korisnici.Where(p => p.Id==korisnikId).FirstOrDefaultAsync();
                Utisak u = new Utisak
                {
                    Dogadjaj = dog,
                    Komentar = komentar,
                    Ocena = ocena,
                    Korisnik = kor,
                    DatumObjave = datum
                };
                Context.Utisci.Add(u);
                await Context.SaveChangesAsync();
                return Ok(u);
                }
                catch(Exception e)
                {
                    return BadRequest(e.Message);
                }
                
            }

            [HttpPost]
            [Route("DodajKomentarZaDrustvo/{drustvoId}/{komentar}/{ocena}/{datum}/{korisnikId}")]
            public async Task<ActionResult> DodajKomentarZaDrustvo(int drustvoId, String komentar,int ocena, DateTime datum, String korisnikId)
            {
                try
                {
                if(drustvoId<0)
                {
                    return BadRequest("Id ne sme da bude manji od 0");
                }
                if(ocena<0 || ocena>5)
                {
                    return BadRequest("Ocena mora da bude u rasponu od 0 do 5");
                }
                var drus = await Context.PlaninarskaDrustva.Where(p => p.ID==drustvoId).FirstOrDefaultAsync();
                if(drus==null)
                {
                    return BadRequest("Ovaj dogajajaj ne postoji");
                }
                var kor = await Context.Korisnici.Where(p => p.Id==korisnikId).FirstOrDefaultAsync();
                Utisak u = new Utisak
                {
                    Drustvo = drus,
                    Komentar = komentar,
                    Ocena = ocena,
                    Korisnik = kor,
                    DatumObjave = datum
                };
                Context.Utisci.Add(u);
                await Context.SaveChangesAsync();
                return Ok(u);
                }
                catch(Exception e)
                {
                    return BadRequest(e.Message);
                }
                
            }

            [HttpGet]
            [Route("ProsecnaOcenaUtisakaDogadjaja/{dogadjajId}")]
            public async Task<ActionResult> ProsecnaOcenaUtisakaDogadjaja(int dogadjajId)
            {
                if(dogadjajId<0)
                {
                    return BadRequest("Neodgovarajuci parametri!");
                }
                var dog = await Context.Dogadjaji.Where(p => p.ID==dogadjajId).Include(p=>p.Utisci).FirstOrDefaultAsync();
                if(dog==null)
                {
                    return BadRequest("Dogadjaj ne postoji!");
                }
                var utisci = await Context.Utisci.Where(p => p.Dogadjaj==dog).FirstOrDefaultAsync();
            if (dog.Utisci.Count == 0)
                return Ok("Nema ocena");
            double prosek=0;
                int brojac=0;
                foreach (var u in dog.Utisci)
                {
                    brojac++;
                    prosek+=u.Ocena;
                }
                prosek=(double)prosek/brojac;

                return Ok(prosek);
            }

            [HttpGet]
            [Route("ProsecnaOcenaUtisakDrustvo/{drustvoId}")]
            public async Task<ActionResult> ProsecnaOcenaUtisakDrustvo(int drustvoId)
            {
                if(drustvoId<0)
                {
                    return BadRequest("Neodgovarajuci paramteri");
                }
                var drustvo = await Context.PlaninarskaDrustva.Where(p => p.ID==drustvoId).Include(p => p.Utisci).FirstOrDefaultAsync();
                if(drustvo==null)
                {
                    return BadRequest("Ne postoji drustvo");
                    
                }
                var utisci = await Context.Utisci.Where(p => p.Drustvo==drustvo).ToListAsync();
                double prosek=0;
                int brojac=0;
            if(drustvo.Utisci.Count==0)
                return Ok("Nema ocena");
                foreach(var u in drustvo.Utisci)
                {
                    brojac++;
                    prosek+=u.Ocena;
                }
                prosek=(double)prosek/brojac;
                return Ok(prosek);
            }

            //mislim da nije neophodna mogucnost editovanja utiska, osim ako nismo naveli u dokumentaciji
        }
    }

