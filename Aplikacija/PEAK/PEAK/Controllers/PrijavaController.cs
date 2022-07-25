using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PEAK.Data;
using PEAK.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

using IdentityServer4.Extensions;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json.Linq;

namespace PEAK.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PrijavaController : ControllerBase
    {
        private readonly UserManager<ApplicationUser> _userManager;
        public ApplicationDbContext Context { get; set; }
        public PrijavaController(ApplicationDbContext context,UserManager<ApplicationUser> userManager)
        {
            Context = context;
            _userManager = userManager;
        }
        
        [Authorize(Roles ="ADMIN")]
        [HttpGet]
        [Route("VratiPrijaveDogadjaja")]
        public ActionResult VratiPrijaveDogadjaja()
        {
            var pd = Context.PrijaveDogadjaja.ToList();
            return Ok(pd);
        }

        [Authorize(Roles = "ADMIN")]
        [HttpGet]
        [Route("VratiPrijaveLokacija")]
        public ActionResult VratiPrijaveLokacija()
        {
            var pl = Context.PrijaveLokacije.ToList();
            return Ok(pl);
        }

        // [Authorize(Roles = "ADMIN")]
        [HttpGet]
        [Route("VratiPrijaveUtisakaDogadjaja")]
        public ActionResult VratiPrijaveUtisakaDogadjaja()
        {
            var pu = Context.PrijaveUtisaka.Where(p => p.Utisak.Dogadjaj!=null).Include(p => p.Korisnik).Include(p => p.Utisak).ThenInclude(p => p.Dogadjaj).Include(p => p.Utisak).ThenInclude(p => p.Drustvo)
                                        .Include(p => p.Utisak)
                                        .ThenInclude(p => p.Korisnik)
                                        .ToList();
            return Ok(pu);
        }

        [HttpGet]
        [Route("VratiPrijaveUtisakaDrustva")]
        public ActionResult VratiPrijaveUtisakaDrustva()
        {
            var pu = Context.PrijaveUtisaka.Where(p => p.Utisak.Drustvo!=null).Include(p => p.Korisnik).Include(p => p.Utisak).ThenInclude(p => p.Dogadjaj).Include(p => p.Utisak).ThenInclude(p => p.Drustvo)
                                        .Include(p => p.Utisak)
                                        .ThenInclude(p => p.Korisnik)
                                        .ToList();
            return Ok(pu);
        }

        [HttpPost]
        [Route("PrijaviDogadjaj/{id}/{razlog}")]
        public async Task<ActionResult> PrijaviDogadjaj(int id, string razlog)
        {
            if (id < 0)
                return BadRequest("Nevalidan id");
            if (string.IsNullOrWhiteSpace(razlog))
                return BadRequest("Nevalidan razlog");
            string idKorisnika = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrWhiteSpace(idKorisnika))
                return BadRequest("Korisnik nije prijavljen");
            var d = await Context.Dogadjaji.FindAsync(id);
            if (d == null)
                return BadRequest("Nevalidan id dogadjaja");
            var u = await Context.Users.FindAsync(idKorisnika);

            try
            {
                PrijavaDogadjaja p = new();
                p.Dogadjaj = d;
                p.Korisnik = u;
                p.Razlog = razlog;
                await Context.AddAsync(p);
                await Context.SaveChangesAsync();
                return Ok("Uspesna prijava");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpPost]
        [Route("PrijaviLokaciju/{id}/{razlog}")]
        public async Task<ActionResult> PrijaviLokaciju(int id, string razlog)
        {
            if (id < 0)
                return BadRequest("Nevalidan id");
            if (string.IsNullOrWhiteSpace(razlog))
                return BadRequest("Nevalidan razlog");
            string idKorisnika = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrWhiteSpace(idKorisnika))
                return BadRequest("Korisnik nije prijavljen");
            var d = await Context.Lokacije.FindAsync(id);
            if (d == null)
                return BadRequest("Nevalidan id lokacije");
            var u = await Context.Users.FindAsync(idKorisnika);

            try
            {
                PrijavaLokacije p = new();
                p.Lokacija = d;
                p.Korisnik = u;
                p.Razlog = razlog;
                await Context.AddAsync(p);
                await Context.SaveChangesAsync();
                return Ok("Uspesna prijava");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        [Route("PrijaviUtisak/{id}/{razlog}/{korisnikId}")]
        public async Task<ActionResult> PrijaviUtisak(int id, string razlog, String korisnikId)
        {
            if (id < 0)
                return BadRequest("Nevalidan id");
            if (string.IsNullOrWhiteSpace(razlog))
                return BadRequest("Nevalidan razlog");
            // string idKorisnika = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if(String.IsNullOrEmpty(korisnikId))
                return BadRequest("Korinsik nije ulogovan!");
            var d = await Context.Utisci.FindAsync(id);
            if (d == null)
                return BadRequest("Nevalidan id utiska");
            // var u = await Context.Users.FindAsync(idKorisnika);
            var k = await Context.Korisnici.FindAsync(korisnikId);

            try
            {
                PrijavaUtiska p = new();
                p.Utisak = d;
                p.Korisnik = k;
                p.Razlog = razlog;
                Context.PrijaveUtisaka.Add(p);
                await Context.SaveChangesAsync();
                return Ok(p);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpDelete]
        [Route("ObrisiPrijavuDogadjaja/{id}")]
        public async Task<ActionResult> ObrisiPrijavuDogadjaja(int id)
        {
            var p = await Context.PrijaveDogadjaja.FindAsync(id);
            if (p == null)
                return BadRequest("Ne postoji prijava sa trazenim ID");
            try
            {
                Context.Remove(p);
                await Context.SaveChangesAsync();
                return Ok("Prijava obrisana");
            }
            catch (Exception e)
            {
                return Ok(e.Message);
            }
        }
        [HttpDelete]
        [Route("ObrisiPrijavuLokacije/{id}")]
        public async Task<ActionResult> ObrisiPrijavuLokacije(int id)
        {
            var p = await Context.PrijaveLokacije.FindAsync(id);
            if (p == null)
                return BadRequest("Ne postoji prijava sa trazenim ID");
            try
            {
                Context.Remove(p);
                await Context.SaveChangesAsync();
                return Ok("Prijava obrisana");
            }
            catch (Exception e)
            {
                return Ok(e.Message);
            }
        }
        [HttpDelete]
        [Route("ObrisiPrijavuUtiska/{id}")]
        public async Task<ActionResult> ObrisiPrijavuUtiska(int id)
        {
            var p = await Context.PrijaveUtisaka.FindAsync(id);
            if (p == null)
                return BadRequest("Ne postoji prijava sa trazenim ID");
            try
            {
                Context.Remove(p);
                await Context.SaveChangesAsync();
                return Ok("Prijava obrisana");
            }
            catch (Exception e)
            {
                return Ok(e.Message);
            }
        }
    }
}