using IdentityServer4.Extensions;
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
    public class VrhController : Controller
    {
        public ApplicationDbContext Context { get; set; }

        public VrhController(ApplicationDbContext context)
        {
            Context = context;
        }

        [HttpGet]
        [Route("PreuzmiSveVrhove")]
        public async Task<ActionResult> PreuzmiSveVrhove()
        {
            return Ok(await Context.Vrhovi.Select(p =>
            new
            {
                p.ID,
                p.Planina,
                p.Naziv,
                p.Visina
            }).ToListAsync());
        }

        [HttpPost]
        [Route("DodajVrh/{planina}/{naziv}/{visina}")]
        public async Task<ActionResult> DodajVrh(int planina, String naziv, int visina)
        {
            if (planina < 0)
            {
                return BadRequest("Pogresna planina!");
            }
            if (string.IsNullOrEmpty(naziv) || naziv.Length > 70)
            {
                return BadRequest("Presli ste limit za broj slova!");
            }
            if (visina < 0 || visina > 9000)
            {
                return BadRequest("Presli ste limit za visinu vrha!");
            }

            var pln = await Context.Planine.Where(p => p.ID == planina).FirstOrDefaultAsync();
            if (pln == null)
            {
                return BadRequest("Ova planina ne postoji!");
            }
            var vrh = await Context.Vrhovi.Where(p => p.Naziv == naziv && p.Visina == visina).FirstOrDefaultAsync();
            if (vrh == null)
            {
                Vrh v = new Vrh
                {
                    Planina = pln,
                    Naziv = naziv,
                    Visina = visina

                };
                Context.Vrhovi.Add(v);
                await Context.SaveChangesAsync();
            }
            return Ok("Vrh je uspesno dodat.");

        }

        [HttpDelete]
        [Route("ObrisiVrh/{idVrha}")]
        public async Task<ActionResult> ObrisiVrh(int idVrha)
        {
            if (idVrha < 0)
            {
                return BadRequest("Prosledjen je pogresan ID!");
            }
            var vrh = await Context.Vrhovi.Where(p => p.ID == idVrha).FirstOrDefaultAsync();
            if (vrh == null)
            {
                return BadRequest("Vrh koji pokusavate da obrisete ne postoji!");
            }
            Context.Vrhovi.Remove(vrh);
            await Context.SaveChangesAsync();
            return Ok("Vrh je obrisan.");
        }

    }
}
