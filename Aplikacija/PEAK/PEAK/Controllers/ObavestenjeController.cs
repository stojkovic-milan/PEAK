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
    public class ObavestenjeController : Controller
    {
        public ApplicationDbContext Context { get; set; }

        public ObavestenjeController(ApplicationDbContext context)
        {
            Context = context;
        }

        [HttpGet]
        [Route("PreuzmiObavestenja")]
        public async Task<ActionResult> PreuzmiObavestenja()
        {
            return Ok(await Context.Obavestenja.Select(p =>
            new
            {
                p.ID,
                p.Naslov,
                p.Tekst,
                p.Drustvo,
                p.Datum
            }).ToListAsync());
        }

        [HttpPost]
        [Route("DodajObavestenje/{naslov}/{tekst}/{drustvo}/{datum}")]
        public async Task<ActionResult> DodajObavestenje(String naslov, String tekst, int drustvo, DateTime datum)
        {
            if (string.IsNullOrEmpty(naslov) || naslov.Length > 70)
            {
                return BadRequest("Presli ste limit za broj slova!");
            }
            if (string.IsNullOrEmpty(tekst) || tekst.Length > 1000)
            {
                return BadRequest("Presli ste limit za broj slova!");
            }
            if (drustvo < 0)
            {
                return BadRequest("Pogresno drustvo!");
            }
            if (DateTime.Compare(datum, DateTime.Now) < 0)
            {
                return BadRequest("Datum nije validan!");
            }

            var drs = await Context.PlaninarskaDrustva.Where(p => p.ID == drustvo).FirstOrDefaultAsync();
            if (drs == null)
            {
                return BadRequest("Ovo drustvo ne postoji!");
            }
            var obv = await Context.Obavestenja.Where(p => p.Naslov == naslov && p.Tekst == tekst).FirstOrDefaultAsync();
            if (obv == null)
            {
                Obavestenje o = new Obavestenje
                {
                    Naslov = naslov,
                    Tekst = tekst,
                    Drustvo = drs,
                    Datum = datum

                };
                Context.Obavestenja.Add(o);
                await Context.SaveChangesAsync();
            }
            return Ok("Obavestenje je uspesno dodato.");

        }

        [HttpDelete]
        [Route("ObrisiObavestenje/{idObavestenja}")]
        public async Task<ActionResult> ObrisiObavestenje(int idObavestenja)
        {
            if (idObavestenja < 0)
            {
                return BadRequest("Prosledjen je pogresan ID!");
            }
            var obv = await Context.Obavestenja.Where(p => p.ID == idObavestenja).FirstOrDefaultAsync();
            if (obv == null)
            {
                return BadRequest("Obavestenje koje pokusavate da obrisete ne postoji!");
            }
            Context.Obavestenja.Remove(obv);
            await Context.SaveChangesAsync();
            return Ok("Obavestenje je obrisano.");
        }

        [HttpPost]
        [Route("DodajKorisnika/{idObavestenja}/{idKorisnika}")]
        public async Task<ActionResult> DodajKorisnika(int idObavestenja, string idKorisnika)
        {
            if (idObavestenja < 0 || String.IsNullOrEmpty(idKorisnika))
            {
                return BadRequest("Prosledjen je pogresan ID!");
            }
            var obv = await Context.Obavestenja.Where(p => p.ID == idObavestenja).FirstOrDefaultAsync();
            if (obv == null)
            {
                return BadRequest("Obavestenje ne postoji!");
            }
            var kor = await Context.Users.Where(p => p.Id == idKorisnika).FirstOrDefaultAsync();
            if (kor == null)
            {
                return BadRequest("Ovaj korisnik ne postoji!");
            }
            obv.Korisnici.Add(kor);
            await Context.SaveChangesAsync();
            return Ok("Uspesno smo dodali korisnika u listu zeljenog obavestenja.");
        }

        [HttpDelete]
        [Route("UkloniKorisnika/{idObavestenja}/{idKorisnika}")]
        public async Task<ActionResult> OtkaziOdlazak(int idObavestenja, String idKorisnika)
        {
            if (idObavestenja < 0 || String.IsNullOrEmpty(idKorisnika))
            {
                return BadRequest("Prosledjen je pogresan ID!");
            }
            var obv = await Context.Obavestenja.Where(p => p.ID == idObavestenja).FirstOrDefaultAsync();
            if (obv == null)
            {
                return BadRequest("Ovo obavestenje ne postoji!");
            }
            var kor = await Context.Users.Where(p => p.Id == idKorisnika).FirstOrDefaultAsync();
            if (kor == null)
            {
                return BadRequest("Ovaj korisnik ne postoji!");
            }
            if (!obv.Korisnici.Contains(kor))
            {
                return BadRequest("Korisnik se nije postojao u listi ovog obavestenja.");
            }
            obv.Korisnici.Remove(kor);
            await Context.SaveChangesAsync();
            return BadRequest("Korisnik je uspesno uklonjen iz liste zeljenog obavestenja.");
        }

        [HttpGet]
        [Route("VratiSveKorisnike/{idObavestenja}")]
        public async Task<ActionResult> VratiSveKorisnike(int idObavestenja)
        {
            if (idObavestenja < 0)
            {
                return BadRequest("Prosledjen je pogresan ID!");
            }
            var obv = await Context.Obavestenja.Where(p => p.ID == idObavestenja).FirstOrDefaultAsync();
            if (obv == null)
            {
                return BadRequest("Obavestenje ne postoji!");
            }
            return Ok(obv.Korisnici.Select(p =>
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

        [HttpGet]
        [Route("PreuzmiInfoZaObavestenje/{idObavestenja}")]
        public async Task<ActionResult> PreuzmiInformacijeZaDogadjaj(int idObavestenja)
        {
            if (idObavestenja < 0)
            {
                return BadRequest("Prosledjen je pogresan ID!");
            }
            var obv = await Context.Obavestenja.Where(p => p.ID == idObavestenja).FirstOrDefaultAsync();
            if (obv == null)
            {
                return BadRequest("Obavestenje ne postoji!");
            }
            return Ok(
                new
                {
                    Naslov = obv.Naslov,
                    Tekst = obv.Tekst,
                    Drustvo = obv.Drustvo,
                    Datum = obv.Datum
                });
        }
    }
}
