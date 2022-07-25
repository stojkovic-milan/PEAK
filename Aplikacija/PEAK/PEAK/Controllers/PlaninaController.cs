using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PEAK.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using PEAK.Models;
using System.Security.Claims;
using System.Collections;


namespace PEAK.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class PlaninaController : Controller
    {
        public ApplicationDbContext Context { get; set; }
        public IImageService _imageSevice;

        public PlaninaController(ApplicationDbContext context, IImageService imgSevice)
        {
            Context = context;
                this._imageSevice = imgSevice;

        }

        [HttpGet]
        [Route("PreuzmiSvePlanine")]
        public async Task<ActionResult> PreuzmiSvePlanine()
        {
            return Ok(await Context.Planine.Where(p => p.Odobrena==true).Select(p =>
            new
            {
                Id = p.ID,
                Naziv = p.Naziv,
                Vrhovi = p.Vrhovi,
                Rute = p.Rute,
                Slika = p.SlikaPlanine
            }).ToListAsync());
        }

        [HttpPost]
        [Route("DodajRutu/{idPlanine}/{idRute}")]
        public async Task<ActionResult> DodajRutu(int idPlanine, int idRute)
        {
            if(idRute<0)
            {
                return BadRequest("Pogrsan id je poslat");
            }
            var plan = await Context.Planine.Where(p => p.ID == idPlanine).FirstOrDefaultAsync();
            if(plan==null)
            {
                return BadRequest("Ne mozete da dodate rutu ako ne postoji planina");
            }
            var r = await Context.Ruta.Where(p => p.ID == idRute).FirstOrDefaultAsync();
            if(r==null)
            {
                return BadRequest("Ne postoji ruta koju zelite da dodate");
            }
            plan.Rute.Add(r);
            await Context.SaveChangesAsync();
            return Ok("Sada dogadjaj moze da se organizuje i na ovoj ruti");
        }

        [HttpPost]
        [Route("DodajVrh/{idPlanine}/{idVrha}")]
        public async Task<ActionResult> DodajVrh(int idPlanine, int idVrha)
        {
            if(idPlanine<0 || idVrha<0)
            {
                return BadRequest("Pogresan id je poslat");
            }
            var plan = await Context.Planine.Where(p => p.ID == idPlanine).FirstOrDefaultAsync();
            if(plan==null)
            {
                return BadRequest("Ova planina ne postoji");
            }
            var v = await Context.Vrhovi.Where(p => p.ID == idVrha).FirstOrDefaultAsync();
            if(v==null)
            {
                return BadRequest("Ovaj vrh ne postoji");
            }
            plan.Vrhovi.Add(v);
            await Context.SaveChangesAsync();
            return Ok("Uspesno registrovan novi vrh na planini");
        }

        [HttpGet]
        [Route("PreuzmiSveVrhovePlanine/{idPlanine}")]
        public async Task<ActionResult> PreuzmiSveVrhovePlanine(int idPlanine)
        {
            if(idPlanine<0)
            {
                return BadRequest("Pogresan id je poslat");
            }
            var plan = await Context.Planine.Where(p => p.ID == idPlanine)
                                    .Include(p => p.Vrhovi)
                                    .FirstOrDefaultAsync();
            if(plan==null)
            {
                return BadRequest("Ne postoji planina sa ovim id-em");
            }
            // return Ok(plan);
            return Ok(plan.Vrhovi.Select(p =>
            new
            {
                Id = p.ID,
                NazivVrha = p.Naziv,
                Visina = p.Visina
            }
            ).ToList());
        }

        [HttpGet]
        [Route("PreuzmiSveRutePlanine/{idPlanine}")]
        public async Task<ActionResult> PreuzmiSveRutePlanine(int idPlanine)
        {
            if (idPlanine < 0)
            {
                return BadRequest("Pogresan id je poslat");
            }
            var plan = await Context.Planine.Where(p => p.ID == idPlanine)
                                            .Include(p => p.Rute)
                                            .FirstOrDefaultAsync();
            if (plan == null)
            {
                return BadRequest("Ne postoji planina sa ovim id-em");
            }
            return Ok(plan.Rute.Select(p =>
            new
            {
                Id = p.ID,
                NazivRute = p.Naziv,
                Tezina = p.Tezina,
                Duzina = p.Duzina
            }
            ).ToList());
        }

        [HttpGet]
        [Route("PreuzmiInformacijeZaPlaninu/{idPlanine}")]
        public async Task<ActionResult> PreuzmiInformacijeZaPlaninu(int idPlanine)
        {
            if(idPlanine<0)
            {
                return BadRequest("ID ne sme da bude manji od nule!!");
            }
            var plan = await Context.Planine.Where(p => p.ID==idPlanine)
                            .Include(p => p.Vrhovi)
                            .Include(p=>p.Rute)
                            .ThenInclude(p=>p.Lokacije)
                            .FirstOrDefaultAsync();
            if(plan==null)
            {
                return BadRequest("Ova planina ne postoji!");
            }
            return Ok(
                new
                {
                    Id = plan.ID,
                    Naziv = plan.Naziv,
                    Vrhovi = plan.Vrhovi,
                    Rute = plan.Rute,
                }
            );
        }

        [HttpPost]
        [Route("DodajPlaninu/{naziv}")]
        public async Task<ActionResult> DodajPlaninu(String naziv, IFormFile slika)
        {
            if(String.IsNullOrEmpty(naziv))
            {
                return BadRequest("Naziv ne sme biti prazan string!");
            }
            var planina = await Context.Planine.Where(p => p.Naziv==naziv).FirstOrDefaultAsync();
            if(planina!=null)
            {
                return BadRequest("Planina sa ovim imenom postoji!");
            }

            Planina p = new Planina();
            p.Naziv=naziv;
            p.Odobrena=false;
            var username = User.FindFirstValue(ClaimTypes.NameIdentifier);
            string urlo;

            if(slika!=null)
            {
                urlo = await _imageSevice.SaveFile(slika, username);
            }
            else{
                urlo="";
            }         
            p.SlikaPlanine=urlo;   
            try
            {
                Context.Planine.Add(p);
                await Context.SaveChangesAsync();
                return Ok(p);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("PronadjiNajvisiVrhPlanine/{planinaId}")]
        public async Task<ActionResult> PronadjiNajvisiVrhPlanine(int planinaId)
        {
            var plan = await Context.Planine.Where(p => p.ID==planinaId)
                                            .Include(p => p.Vrhovi)
                                            .FirstOrDefaultAsync();
            if(plan==null)
            {
                return BadRequest("Ne postoji ta planina");
            }
           var vrh = plan.Vrhovi;
           var najvisi=vrh[0];
            foreach (var v in vrh)
            {
                if(v.Visina>najvisi.Visina)
                {
                    najvisi=v;
                }
            }
            try
            {
                return Ok(najvisi);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            } 
        }

        [HttpGet]
        [Route("PreuzmiNajpopularnijeDestinacije")]
        public async Task<ActionResult> PreuzmiNajpopularnijeDestinacije()
        {
            var plan = await Context.Planine.Where(p => p.Odobrena==true).Include(p => p.Rute).ThenInclude(p => p.Dogadjaji).Include(p => p.Vrhovi).Select(p => new
            {
                Planina = p,
                BrojDogadjaja=p.Rute.Count()
            }).ToListAsync();
            var popularneDestinacije = plan.OrderByDescending(o => o.BrojDogadjaja).ToList();
            var niz = popularneDestinacije.Take(6);
            return Ok(niz);
        }
        
        [HttpGet]
        [Route("PreuzmiSveNeodobrenePlanine")]
        public async Task<ActionResult> PreuzmiSveNeodobrenePlanine()
        {
            var planine = await Context.Planine.Where(p => p.Odobrena==false)
                                                .Include(p => p.Rute)
                                                .ThenInclude(p=>p.Lokacije)
                                                .Include(p => p.Vrhovi)
                                                .ToListAsync();
            return  Ok(planine);
        }

        [HttpPut]
        [Route("PromeniStanjePlanine/{planinaId}")]
        public async Task<ActionResult> PromeniStanjePlanine(int planinaId)
        {
            if(planinaId<0)
            {
                return BadRequest("Neodgovarajci parametri");
            }
            var planina = await Context.Planine.Where(p => p.ID==planinaId).FirstOrDefaultAsync();
            if(planina==null)
            {
                return BadRequest("Ova planina ne postoji");
            }
            if(planina.Odobrena==false)
            {
                planina.Odobrena=true;
            }
            else if(planina.Odobrena==true)
            {
                planina.Odobrena=false;
            }
            try
            {
                Context.Planine.Update(planina);
                await Context.SaveChangesAsync();
                return Ok(planina);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete]
        [Route("ObrisiPlaninu/{planinaId}")]
        public async Task<ActionResult> ObrisiPlaninu(int planinaId)
        {
            if(planinaId<0)
            {
                return BadRequest("Neodgovarajuci parametri");
            }
            var planina = await Context.Planine.Where(p => p.ID==planinaId).FirstOrDefaultAsync();
            var ruta = await Context.Ruta.Include(p => p.Planina).Where(p => p.Planina==planina).ToListAsync();
            var vrhovi = await Context.Vrhovi.Include(p => p.Planina).Where(p => p.Planina==planina).ToListAsync();
            if(planina==null)
            {
                return BadRequest("Ne postoji planina koju zelite da obrisete");
            }
            // try
            // {
                foreach(var a in ruta)
                {
                    Context.Ruta.Remove(a);
                }
                foreach(var v in vrhovi)
                {
                    Context.Vrhovi.Remove(v);
                }
                
                await Context.SaveChangesAsync();
                Context.Planine.Remove(planina);
                await Context.SaveChangesAsync();
                return Ok("Uspesno izbisana planina");
            // }
            // catch(Exception e)
            // {
            //     return BadRequest(e.InnerException);
            // }
        }

        [HttpPost]
        [Route("PredloziPlaninu/{naziv}/{najvisiVrh}/{visina}/{xKord}/{yKord}/{nazivRute}/{duzinaRute}/{tezinaRute}")]
        public async Task<ActionResult> PredloziPlaninu(string naziv,[FromBody]String file,
        string najvisiVrh,int visina,float xKord,float yKord,string nazivRute,int duzinaRute, int tezinaRute)
        {
            if(String.IsNullOrEmpty(naziv))
            {
                return BadRequest("Naziv ne sme biti prazan string!");
            }
            var planina = await Context.Planine.Where(p => p.Naziv==naziv).FirstOrDefaultAsync();
            if(planina!=null)
            {
                return BadRequest("Planina sa ovim imenom postoji!");
            }
            if (string.IsNullOrEmpty(najvisiVrh) || najvisiVrh.Length > 70)
            {
                return BadRequest("Presli ste limit za broj slova!");
            }
            if (visina < 0 || visina > 9000)
            {
                return BadRequest("Presli ste limit za visinu vrha!");
            }

            Planina p = new Planina();
            p.Naziv=naziv;
            p.Odobrena=false;
            var username = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var urlo = file;   
            p.SlikaPlanine=urlo;
            // try
            // {
                Context.Planine.Add(p);
                await Context.SaveChangesAsync();
                Vrh v = new Vrh();
                v.Naziv=najvisiVrh;
                v.Planina=p;
                v.Visina=visina;
                Context.Vrhovi.Add(v);
                await Context.SaveChangesAsync();
                p.Vrhovi.Add(v);
                Ruta r = new Ruta();
                r.Naziv=nazivRute;
                r.Duzina=duzinaRute;
                r.Tezina=tezinaRute;
                r.Planina=p;
                Context.Ruta.Add(r);
                await Context.SaveChangesAsync();
                p.Rute.Add(r);
                Lokacija l = new Lokacija();
                l.XCord=xKord;
                l.YCord=yKord;
                l.Naziv=p.Naziv;
                l.Visina=visina;
                Context.Lokacije.Add(l);
                await Context.SaveChangesAsync();
                l.Rute.Add(r);
                r.Lokacije.Add(l);
                await Context.SaveChangesAsync();
                return Ok(p);
            // }
            // catch(Exception e)
            // {
            //     return BadRequest(e.Message);
            // }

            
        }
    }
}
