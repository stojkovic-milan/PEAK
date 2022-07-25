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
    public class ObjavaController : ControllerBase
    {
        public ApplicationDbContext Context { get; set; }
        public ObjavaController(ApplicationDbContext context)
        {
            Context = context;
        }

        [Route("PreuzmiObjave")]
        [HttpGet]
        public async Task<ActionResult> Preuzmi()
        {
            return Ok(await Context.Objave.ToListAsync());
        }

        [Route("NapisiObjavu/{naslov}/{tekst}/{datum}/{tip}/{idplnrskgdrustva}")]
        [HttpPost]
        public async Task<ActionResult> Objavi(string naslov,string tekst
            , DateTime datum,string tip,int idplnrskgdrustva)
        {
            //VALIDACIJA
            if (idplnrskgdrustva <= 0)
            {
                return BadRequest("Nepostojece planinarsko drustvo!");
            }
            //KRAJ VALIDACIJE
            try
            {
                PlaninarskoDrustvo pldr = await Context.PlaninarskaDrustva
                        .Where(p => p.ID == idplnrskgdrustva)
                        .FirstOrDefaultAsync();
                Objava p = new Objava
                {
                    Naslov = naslov,
                    Tekst = tekst,
                    Datum = datum,
                    Tip = tip,
                    Drustvo = pldr
                };

                Context.Objave.Add(p);
                await Context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("ObrisiObjavu/{id}")]
        [HttpDelete]
        public async Task<ActionResult> Izbrisi(int id)
        {
            if (id <= 0)
            {
                return BadRequest("Pogrešan ID!");
            }
            try
            {
                var objava = await Context.Objave.FindAsync(id);
                Context.Objave.Remove(objava);
                await Context.SaveChangesAsync();
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("EditujObjavu")]
        [HttpPut]
        public async Task<ActionResult> ObjavaEdit([FromBody] Objava objava)
        {
            if (objava.ID <= 0)
            {
                return BadRequest("Pogrešan ID!");
            }

            try
            {

                Context.Objave.Update(objava);

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
