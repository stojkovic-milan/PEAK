using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PEAK.Data;
using PEAK.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace PEAK.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class InteresovanjaController : ControllerBase
    {
        public ApplicationDbContext Context { get; set; }
        public InteresovanjaController(ApplicationDbContext context)
        {
            Context = context;
        }

        [HttpGet]
        [Route("InteresovanjaKorisnika/{idKorisnika}")]
        public async Task<ActionResult> InteresovanjaKorisnika(string idKorisnika)
        {
            if (string.IsNullOrWhiteSpace(idKorisnika))
                return BadRequest("Nevalidan ID korisnika");
            var t=await Context.Interesovanja.Where(p => p.Korisnik.Id == idKorisnika).ToListAsync();
            if (t.Count == 0)
                return BadRequest("Nema interesovanja");
            return Ok(t);
        }

        [HttpPost]
        [Route("DodajInteresovanje/{idKorisnika}/{tip}/{mesto}/{udaljenost}")]
        public async Task<ActionResult> DodajInteresovanje(string idKorisnika, string tip, string mesto,int udaljenost)
        {
            if(string.IsNullOrWhiteSpace(idKorisnika))
                return BadRequest("Nevalidan id korisnika");
            if (string.IsNullOrWhiteSpace(tip)&&string.IsNullOrWhiteSpace(mesto))
                return BadRequest("Prazno interesovanje");
            var k = await Context.Users.FindAsync(idKorisnika);
            if (k == null)
                return BadRequest("Ne postoji korisnik sa trazenim ID");
            if (!string.IsNullOrWhiteSpace(tip))
                if (!Enum.IsDefined(typeof(Tipovi), tip))
                    return BadRequest("Nevalidan tip dogadjaja");
            if (udaljenost < 0)
                return BadRequest("Nevaldna udaljenost");

            try
            {
                Interesovanje i = new Interesovanje();
                i.Udaljenost = udaljenost;
                i.Tip = tip;
                i.Mesto = mesto;
                i.Korisnik = k;
                k.Interesovanja.Add(i);
                Context.Interesovanja.Add(i);
                await Context.SaveChangesAsync();
                return Ok(i);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("ObrisiInteresovanje/{id}")]
        [HttpDelete]
        public async Task<ActionResult> ObrisiInteresovanje(int id)
        {
            if (id < 0)
                return BadRequest("Nevalidan id interesovanja");
            var i = await Context.Interesovanja.FindAsync(id);
            if (i == null)
                return BadRequest("Ne postoji interesovanje");
            try
            {
                Context.Interesovanja.Remove(i);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}