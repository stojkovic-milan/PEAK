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

namespace PEAK.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LokacijaController : Controller
    {
        public ApplicationDbContext Context { get; set; }

        public LokacijaController(ApplicationDbContext context)
        {
            Context = context;
        }

        [HttpGet]
        [Route("PreuzmiLokacije")]
        public async Task<ActionResult> PreuzmiLokacije()
        {
            var loks = await Context.Lokacije.Where(p => p.potvrdjena==true).ToListAsync();
            return Ok(loks);
        }

        [HttpPost]
        //[Authorize(Roles = "ADMIN")]
        [Route("DodajLokaciju/{xCord}/{yCord}/{naziv}/{visina}")]
        public async Task<ActionResult> DodajLokaciju(float xCord, float yCord, String naziv, int visina)
        {
            //geografska duzina
            if (xCord < 0 || xCord > 180)
            {
                return BadRequest("Presli ste limit za x koordinatu!");
            }
            //geografska sirina
            if (yCord < 0 || yCord > 90)
            {
                return BadRequest("Presli ste limit za y koordinatu!");
            }
            if (string.IsNullOrEmpty(naziv) || naziv.Length > 70)
            {
                return BadRequest("Presli ste limit za broj slova!");
            }
            if (visina < 500 || visina > 9000)
            {
                return BadRequest("Presli ste limit za visinu planine!");
            }
            
            var lok = await Context.Lokacije.Where(p => p.Naziv == naziv && p.Visina == visina).FirstOrDefaultAsync();
            if (lok == null)
            {
                Lokacija l = new Lokacija
                {
                    potvrdjena=false,
                    XCord = xCord,
                    YCord = yCord,
                    Naziv = naziv,
                    Visina = visina
                };
                Context.Lokacije.Add(l);
                await Context.SaveChangesAsync();
            }
            return Ok("Uspesno dodata lokacija.");

        }

        [HttpDelete]
        // [Authorize(Roles = "ADMIN")]
        [Route("ObrisiLokaciju/{idLokacije}")]
        public async Task<ActionResult> ObrisiLokaciju(int idLokacije)
        {
            try
            {
                if (idLokacije < 0)
                {
                    return BadRequest("Prosledjen je pogresan ID!");
                }
                var lok = await Context.Lokacije.Where(p => p.ID == idLokacije).FirstOrDefaultAsync();
                if (lok == null)
                {
                    return BadRequest("Lokacija koju pokusavate da obrisete ne postoji!");
                }
                Context.Lokacije.Remove(lok);
                await Context.SaveChangesAsync();
                return Ok("Lokacija je izbrisana.");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }

        [HttpPost]
        [Authorize(Roles = "ADMIN")]
        [Route("DodajRutuNaLokaciju/{idLokacije}/{idRute}")]
        public async Task<ActionResult> DodajRutuNaLokaciju(int idLokacije, int idRute)
        {
            if (idLokacije < 0 || idRute < 0)
            {
                return BadRequest("Prosledjen je pogresan ID!");
            }
            var lok = await Context.Lokacije.Where(p => p.ID == idLokacije && p.potvrdjena==true).FirstOrDefaultAsync();
            if (lok == null)
            {
                return BadRequest("Lokacija na kojoj zelimo da dodamo novu rutu ne postoji!");
            }
            var ruta = await Context.Ruta.Where(p => p.ID == idRute).FirstOrDefaultAsync();
            if (ruta == null)
            {
                return BadRequest("Ova ruta ne postoji!");
            }
            lok.Rute.Add(ruta);
            await Context.SaveChangesAsync();
            return Ok("Uspresno dodavanje nove rute na zeljenu lokaciju.");
        }

        [HttpDelete]
        [Authorize(Roles = "ADMIN")]
        [Route("ObrisiRutuNaLokaciji/{idLokacije}/{idRute}")]
        public async Task<ActionResult> ObrisiRutuNaLokaciji(int idLokacije, int idRute)
        {
            if (idLokacije < 0 || idRute < 0)
            {
                return BadRequest("Prosledjen je pogresan ID!");
            }
            var lok = await Context.Lokacije.Where(p => p.ID == idLokacije && p.potvrdjena==true).FirstOrDefaultAsync();
            if (lok == null)
            {
                return BadRequest("Ova lokacija ne postoji!");
            }
            var ruta = await Context.Ruta.Where(p => p.ID == idRute).FirstOrDefaultAsync();
            if (ruta == null)
            {
                return BadRequest("Ova ruta ne postoji!");
            }
            if (!lok.Rute.Contains(ruta))
            {
                return BadRequest("Ova ruta nije bila dodata na lokaciju!");
            }
            lok.Rute.Remove(ruta);
            await Context.SaveChangesAsync();
            return BadRequest("Ruta je uspesno uklonjena sa lokacije.");
        }
        [HttpGet]
        [Route("VratiSveRuteNaLokaciji/{idLokacije}")]
        public async Task<ActionResult> VratiSveUcesnikeNaDogadjaju(int idLokacije)
        {
            if (idLokacije < 0)
            {
                return BadRequest("Prosledjen je pogresan ID!");
            }
            var lok = await Context.Lokacije.Where(p => p.ID == idLokacije && p.potvrdjena==true).FirstOrDefaultAsync();
            if (lok == null)
            {
                return BadRequest("Lokacija ne postoji!");
            }
            return Ok(lok.Rute.Select(p =>
                new
                {
                    p.Naziv,
                    p.Duzina,
                    p.Tezina,
                    p.Planina
                }
            ).ToList());
        }

        [HttpGet]
        [Route("VratiInfoRuteNaLokaciji/{idLokacije}/{idRute}")]
        public async Task<ActionResult> VratiInfoRuteNaLokaciji(int idLokacije, int idRute)
        {
            if (idLokacije < 0 || idRute < 0)
            {
                return BadRequest("Prosledjen je pogresan ID!");
            }
            var lok = await Context.Lokacije.Where(p => p.ID == idLokacije && p.potvrdjena==true).FirstOrDefaultAsync();
            if (lok == null)
            {
                return BadRequest("Ova lokacija ne postoji!");
            }
            var ruta = await Context.Ruta.Where(p => p.ID == idRute).FirstOrDefaultAsync();
            if (ruta == null)
            {
                return BadRequest("Ova ruta ne postoji!");
            }
            if (!lok.Rute.Contains(ruta))
            {
                return BadRequest("Ova ruta nije bila dodata na lokaciju!");
            }
            return Ok(
                new
                {
                    Naziv = ruta.Naziv,
                    Duzina = ruta.Duzina,
                    Tezina = ruta.Tezina,
                    Planina = ruta.Planina
                });
        }

        [HttpPut]
        [Route("PromeniStanjeLokacije/lokacijaId")]
        public async Task<ActionResult> PromeniStanjeLokacije(int lokacijaId)
        {
            try
            {
                if(lokacijaId<0)
                {
                    return BadRequest("Id ne sme da bude negativna vrednost");
                }
                var lok = await Context.Lokacije.Where(p => p.ID==lokacijaId).FirstOrDefaultAsync();
                if(lok==null)
                {
                    return BadRequest("Ne postoji zadata lokacija");
                }
                if(lok.potvrdjena==false)
                {
                    lok.potvrdjena=true;
                }
                await Context.SaveChangesAsync();
                return Ok("Lokacija je sada odobrena od strane administratora");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        [Route("PreuzmiSveNeodobreneLokacije")]
        public async Task<ActionResult> PreuzmiSveNeodobreneLokacije()
        {
            try
            {
                var loks = await Context.Lokacije.Where(p => p.potvrdjena==false).ToListAsync();
                return Ok(loks);
            }
            catch(Exception e)
            {
                return Ok(e.Message);
            }
        }
        [HttpGet]
        [Route("VratiLokacijeDogadjaja/{idDogadjaja}")]
        public async Task<ActionResult> VratiLokacijeDogadjaja(int idDogadjaja)
        {
            if (idDogadjaja < 0)
            {
                return BadRequest("Prosledjen je pogresan ID!");
            }
            var dog = await Context.Dogadjaji.Include(p=>p.Ruta).ThenInclude(q=>q.Lokacije).Where(p=>p.ID==idDogadjaja).FirstOrDefaultAsync();
            if (dog == null)
            {
                return BadRequest("Ovaj dogadjaj ne postoji!");
            }

            var lokacije = dog.Ruta.Lokacije;

            return Ok(lokacije);
        }

        [HttpGet]
        [Route("VratiPrvuRutuLokacije/{lokacijaId}")]
        public async Task<ActionResult> VratiPrvuRutuLokacije(int lokacijaId)
        {
            if(lokacijaId<0)
            {
                return BadRequest("Id ne sme da bude negativan");
            }
            var lok = await Context.Lokacije.Where(p => p.ID==lokacijaId)
                                            .FirstOrDefaultAsync();
           
            if(lok==null)
            {
                return BadRequest("Ova lokacija ne postoji");
            }
             var rute = await Context.Ruta.Where(p => p.Lokacije.Contains(lok))
                                                                .Include(p => p.Planina)
                                                                .FirstOrDefaultAsync();
            if(rute==null)
            {
                return BadRequest("Ne postoje rute");
            }
            return Ok(rute);
        }
        //[HttpGet]
        //[Route("VratiPrvuRutuPlanine/{planinaId}")]
        //public async Task<ActionResult> VratiPrvuRutuPlanine(int planinaId)
        //{
        //    if (planinaId < 0)
        //    {
        //        return BadRequest("Id ne sme da bude negativan");
        //    }
        //    var lok = await Context.Planine.Where(p => p.ID == planinaId).Include(p=>p.Rute).ThenInclude(p=>p.Lokacije)
        //                                    .FirstOrDefaultAsync();

        //    if (lok == null)
        //    {
        //        return BadRequest("Ova lokacija ne postoji");
        //    }
        //    var rute = await Context.Ruta.Where(p => p.Lokacije.Contains(lok))
        //                                                       .Include(p => p.Planina)
        //                                                       .FirstOrDefaultAsync();
        //    if (rute == null)
        //    {
        //        return BadRequest("Ne postoje rute");
        //    }
        //    return Ok(rute);
        //}
    }

}
