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
    public class RutaController : ControllerBase
    {
        public ApplicationDbContext Context { get; set; }
        public RutaController(ApplicationDbContext context)
        {
            Context = context;
        }

        [Route("PreuzmiRute")]
        [HttpGet]
        public async Task<ActionResult> Preuzmi()
        {
            return Ok(await Context.Ruta.ToListAsync());
        }

        [Route("DodajRutu/{naziv}/{duzina}/{tezina}/{idplanine}")]
        [HttpPost]
        public async Task<ActionResult> NovaRuta(string naziv,int duzina,
            int tezina,int idplanine)
        {
            //VALIDACIJA
            if (String.IsNullOrWhiteSpace(naziv))
            {
                return BadRequest("Mora se uneti naziv rute!");
            }
            if (duzina < 0)
            {
                return BadRequest("Nemoguca je negativna duzina rute!");
            }
            if (tezina > 10 || tezina < 1)
            {
                return BadRequest("Neispravna tezina rute!");
            }
            if (idplanine <= 0)
            {
                return BadRequest("Nepostojeca planina!");
            }
            //KRAJ VALIDACIJE
            try
            {
                Planina planina = await Context.Planine
                        .Where(p => p.ID == idplanine)
                        .FirstOrDefaultAsync();
                Ruta r = new Ruta
                {
                    Naziv = naziv,
                    Duzina = duzina,
                    Tezina = tezina,
                    Planina = planina
                };

                Context.Ruta.Add(r);
                await Context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("DodeliLokacijuRuti/{rutaid}/{lokacijaid}")]
        [HttpPost]
        public async Task<ActionResult> DodeliLokacijuRuti(int rutaid,int lokacijaid)
        {
            if (rutaid <= 0)
            {
                return BadRequest();
            }
            if (lokacijaid <= 0)
            {
                return BadRequest();
            }
            try
            {
                var r = await Context.Ruta.FindAsync(rutaid);
                var l = await Context.Lokacije.FindAsync(lokacijaid);
                r.Lokacije.Add(l);
                l.Rute.Add(r);
                await Context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("ObrisiRutu/{id}")]
        [HttpDelete]
        public async Task<ActionResult> IzbrisiRutu(int id)
        {
            if (id <= 0)
            {
                return BadRequest();
            }
            try
            {
                var ruta = await Context.Ruta.FindAsync(id);
                Context.Ruta.Remove(ruta);
                await Context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("EditujRutu")]
        [HttpPut]
        public async Task<ActionResult> RutaEdit([FromBody] Ruta ruta)
        {
            if (ruta.ID <= 0)
            {
                return BadRequest("Pogrešan ID!");
            }

            try
            {

                Context.Ruta.Update(ruta);

                await Context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}