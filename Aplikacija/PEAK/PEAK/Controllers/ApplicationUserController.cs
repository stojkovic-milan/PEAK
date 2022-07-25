using IdentityServer4.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using PEAK.Data;
using PEAK.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace PEAK.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class ApplicationUserController : Controller
    {
        public ApplicationDbContext Context { get; set; }
        private readonly UserManager<ApplicationUser> _userManager;


        public ApplicationUserController(ApplicationDbContext context, UserManager<ApplicationUser> userManager)
        {
            Context = context;
            _userManager = userManager;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("PreuzmiSvePrijavljeneKorisnike")]
        public async Task<ActionResult> PreuzmiSvePrijavljeneKorisnike()
        {
             return Ok(await Context.Korisnici.Select(p =>
            new
            {
                p.Id,
                p.Ime,
                p.Prezime,
                p.Spremnost,
                p.Email
            }).ToListAsync());
        }
        [Authorize]
        [HttpGet]
        [Route("PreuzmiPrijavljenogKorisnika")]
        public async Task<ActionResult> PreuzmiPrijavljenogKorisnika()
        {

            //ClaimsPrincipal currentUser = this.User;
            //var currentUserID = currentUser.FindFirst(ClaimTypes.NameIdentifier).Value;
            //var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // ID trenutnog korisnika
            var user=await _userManager.GetUserAsync(HttpContext.User);
            var userId = user.Id;
            return Ok(userId);

        }
        [Authorize] //SWAGGER TEST
        [HttpGet]
        [Route("PreuzmiRoleKorisnika")]
        public async Task<ActionResult> PreuzmiRoleKorisnika()
        {
            var user = await _userManager.GetUserAsync(HttpContext.User);
            if (user == null)
                return BadRequest("Korisnik nije ulogovan");
            var roles=await _userManager.GetRolesAsync(user);
            return Ok(roles);
        }
        [AllowAnonymous]
        [HttpGet]
        [Route("VerifikacijaKlijenta")]
        public async Task<ActionResult> VerifikacijaKlijenta([FromQuery]String codeEncoded, [FromQuery] String email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
                return BadRequest("Ne postoji registrovani korisnik sa datim email-om");
            //
            var codeDecodedBytes = WebEncoders.Base64UrlDecode(codeEncoded);
            var codeDecoded = Encoding.UTF8.GetString(codeDecodedBytes);
            //
            var result = await _userManager.ConfirmEmailAsync(user, codeDecoded);
            if (result.Succeeded)
                return Redirect("https://localhost:5001/");
            //return Ok(result.Succeeded ? "ConfirmEmail" : "Error confirming");
            return BadRequest("Greska prilikom verifikacije korisnika");
        }
        [Authorize]
        [HttpGet]
        [Route("PreuzmiInformacijeKorisnika")]
        public async Task<ActionResult> PreuzmiInformacijeKorisnika(string id)
        {
            return Ok(await Context.Korisnici.Where(p=>p.Id==id).Select(p =>
           new
           {
               p.Id,
               p.Ime,
               p.Prezime,
               p.Spremnost,
               p.Email,
               p.ProfilnaSlika,
               p.PhoneNumber
           }).FirstOrDefaultAsync());
        }
        //Preuzmi pratitelje
        [AllowAnonymous]
        [HttpGet]
        [Route("PreuzmiSvePratitelje/{idKorisnika}")]
        public async Task<ActionResult> PreuzmiSvePratitelje(string idKorisnika)
        {
            if(idKorisnika==null)
            {
                return BadRequest("Pogresan id je poslat");
            }
            var kor = await Context.Korisnici.Where(p => p.Id == idKorisnika)
                                    .Include(p => p.Pratitelj)
                                    .FirstOrDefaultAsync();
            if(kor==null)
            {
                return BadRequest("Ne postoji korisnik sa ovim id-em");
            }
            // return Ok(plan);
            return Ok(kor.Pratitelj.Select(p =>
            new
            {
                Id = p.Id,
                Ime = p.Ime,
                Prezime = p.Prezime,
                Adresa = p.Adresa,
                ProfilnaSlika = p.ProfilnaSlika
            }
            ).ToList());
        }
        //Preuzmi one koje korisnik prati
        [AllowAnonymous]
        [HttpGet]
        [Route("PreuzmiKogaKorisnikPrati/{idKorisnika}")]
        public async Task<ActionResult> PreuzmiKogaKorisnikPrati(string idKorisnika)
        {
            if(idKorisnika==null)
            {
                return BadRequest("Pogresan id je poslat");
            }
            var kor = await Context.Korisnici.Where(p => p.Id == idKorisnika)
                                    .Include(p => p.Prati)
                                    .FirstOrDefaultAsync();
            if(kor==null)
            {
                return BadRequest("Ne postoji korisnik sa ovim id-em");
            }
            // return Ok(plan);
            return Ok(kor.Prati.Select(p =>
            new
            {
                Id = p.Id,
                Ime = p.Ime,
                Prezime = p.Prezime,
                Adresa = p.Adresa,
                ProfilnaSlika = p.ProfilnaSlika
            }
            ).ToList());
        }

        [HttpGet]
        [Route("ProveraKorisnikDogadjaj/{idDogadjaja}")]
        public async Task<ActionResult> ProveraKorisnikDogadjaj(int idDogadjaja)
        {
            var user = await _userManager.GetUserAsync(HttpContext.User);
            if (idDogadjaja < 0)
            {
                return BadRequest("Pogresan id je poslat");
            }
            var dog = await Context.Dogadjaji.Where(p => p.ID == idDogadjaja).Include(p => p.Korisnici).Include(p=>p.Organizator).ThenInclude(p=>p.NalogDrustva).FirstOrDefaultAsync();
            if (dog == null)
            {
                return BadRequest("Dogadjaj za koji zelite da prijavite korisnika ne postoji");
            }
            var korisnik = await Context.Korisnici.Where(p => p.Id == user.Id).FirstOrDefaultAsync();
            if (dog.Organizator.NalogDrustva == korisnik)
                return Ok("org");
            if (dog.Korisnici.Contains(korisnik))
                return Ok("da");
            else
                return Ok("ne");
        }

        [HttpPut]
        [Route("PrijaviKorisnikaDogadjaj/{idDogadjaja}")]
        public async Task<ActionResult> DodajPrijavljenogKorisnika(int idDogadjaja)
        {
            var user = await _userManager.GetUserAsync(HttpContext.User);

            if (idDogadjaja < 0)
            {
                return BadRequest("Pogresan id je poslat");
            }
            var dog = await Context.Dogadjaji.Include(p => p.Korisnici).Where(p => p.ID == idDogadjaja).FirstOrDefaultAsync();
            if (dog == null)
            {
                return BadRequest("Dogadjaj za koji korisnik zeli da se prijavi ne postoji!");
            }
            var kor = await Context.Users.Include(p => p.Dogadjaji).Where(p => p.Id == user.Id).FirstOrDefaultAsync();
            if (kor == null)
            {
                return BadRequest("Ovaj korisnik ne postoji!");
            }
            dog.Korisnici.Add(kor);
            kor.Dogadjaji.Add(dog);
            await Context.SaveChangesAsync();
            return Ok("Korisnik se uspesno prijavio za dogadjaj");
        }

        //Dodaj u pratitelj
        [HttpPost]
        [Route("DodajUPratitelj/{idLogovan}/{idPratitelj}")]
        public async Task<ActionResult> DodajUPratitelj(string idLogovan, string idPratitelj)
        {
            if(idLogovan==null || idPratitelj==null)
            {
                return BadRequest("Pogresan id je poslat");
            }
            var logovan = await Context.Korisnici.Where(p => p.Id==idLogovan)
                                            .Include(p => p.Pratitelj)
                                            .FirstOrDefaultAsync();
            if(logovan==null)
            {
                return BadRequest("Logovan korisnik ne postoji");
            }
            var pratitelj = await Context.Korisnici.Where(p => p.Id == idPratitelj)
            .Include(p => p.Prati)
            .FirstOrDefaultAsync();
            if(pratitelj==null)
            {
                return BadRequest("Pratitelj ne postoji");
            }
            logovan.Pratitelj.Add(pratitelj);
            pratitelj.Prati.Add(logovan);
            await Context.SaveChangesAsync();
            return Ok("Uspesno ste dodali pratitelja");
            //return Ok(logovan);
        }
        //dodaj u prati
        [HttpPost]
        [Route("DodajUPrati/{idLogovan}/{idPrati}")]
        public async Task<ActionResult> DodajUPrati(string idLogovan, string idPrati)
        {
            if(idLogovan==null || idPrati==null)
            {
                return BadRequest("Pogresan id je poslat");
            }
            var logovan = await Context.Korisnici.Where(p => p.Id==idLogovan)
                                            .Include(p => p.Prati)
                                            .FirstOrDefaultAsync();
            if(logovan==null)
            {
                return BadRequest("Logovan korisnik ne postoji");
            }
            var prati = await Context.Korisnici.Where(p => p.Id == idPrati)
            .Include(p => p.Pratitelj)
            .FirstOrDefaultAsync();
            if(prati==null)
            {
                return BadRequest("Korisnik koga zelite da pratite ne postoji");
            }
            logovan.Prati.Add(prati);
            prati.Pratitelj.Add(logovan);
            await Context.SaveChangesAsync();
            return Ok("Uspesno ste dodali korisnika koga zelite da pratite");
            //return Ok(logovan);
        }
        [AllowAnonymous]
        [HttpGet]
        [Route("PreuzmiDrustvoKorisnika")]
        public async Task<ActionResult> PreuzmiDrustvoKorisnika(string id)
        {
            var korisnik = await Context.Korisnici.Include(p => p.PlaninarskoDrustvo).Where(p => p.Id == id).FirstOrDefaultAsync();
            var drustvo = korisnik.PlaninarskoDrustvo;
            if (drustvo == null)
                return Ok("");
            else return Ok(drustvo.ID);
        }
        //PreuzmiDrustvoUVlasnistvu
        [HttpGet]
        [Route("PreuzmiDrustvoUVlasnistvu")]
        public async Task<ActionResult> PreuzmiDrustvoUVlasnistvu()
        {
            var user = await _userManager.GetUserAsync(HttpContext.User);
            var userid = user.Id;
            var korisnik = await Context.Korisnici.Where(p => p.Id == userid).Include(p => p.UpravljaDrustvom).FirstOrDefaultAsync();
            if (korisnik.UpravljaDrustvom == null)
                return Ok("-1");
            else return Ok(korisnik.UpravljaDrustvom.ID);
        }
        [Authorize]
        [HttpPut]
        [Route("PromeniPodatkeKorisnika/{id}/{ime}/{prezime}/{brTel}/{spremnost}/")]
        public async Task<ActionResult> PromeniPodatkeKorisnika(String id, String ime, String prezime, String brTel, int spremnost,[FromBody]String profilnaUrl)
        {
            //var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // ID trenutnog korisnika
            var user = await _userManager.GetUserAsync(HttpContext.User);
            var userId = user.Id;
            if (id != userId)
                return BadRequest("Id se ne poklapa sa korisnikom");
            if (String.IsNullOrEmpty(id))
            {
                return BadRequest("Pogresan id je poslat za izmenu");
            }
            if (String.IsNullOrEmpty(ime))
            {
                return BadRequest("Ne validno ime");
            }
            if (String.IsNullOrEmpty(prezime))
            {
                return BadRequest("Ne validno prezime");
            }
            if (String.IsNullOrEmpty(brTel))
            {
                return BadRequest("Ne validan broj telefona");
            }
            var kor = await Context.Korisnici.Where(p => p.Id == id).FirstOrDefaultAsync();
            if (kor == null)
            {
                return BadRequest("Ne postoji ovaj dogadjaj");
            }
            try
            {
                kor.Ime = ime;
                kor.Prezime = prezime;
                kor.PhoneNumber = brTel;
                kor.Spremnost = spremnost;
                kor.ProfilnaSlika = profilnaUrl;
                await Context.SaveChangesAsync();
                return Ok("Podaci korisnika uspesno izmenjeni");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("ProveraAdministratora")]
        public ActionResult ProveraAdministratora()
        {
            //var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // ID trenutnog korisnika
            //var user =await Context.Korisnici.Where(p => p.Id == userId).FirstOrDefaultAsync();
            //var roles = _userManager.GetRolesAsync(user);
            return Ok("Ulogovan korisnik je administrator");
        }

        [Authorize(Roles = "Korisnik")]
        [HttpGet]
        [Route("ProveraRegistrovanogKorisnika")]
        public ActionResult ProveraRegistrovanogKorisnika()
        {
            //var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // ID trenutnog korisnika
            //var user =await Context.Korisnici.Where(p => p.Id == userId).FirstOrDefaultAsync();
            //var roles = _userManager.GetRolesAsync(user);
            return Ok("Ulogovan korisnik je registrovan korisnik");
        }

        [Authorize(Roles = "Drustvo")]
        [HttpGet]
        [Route("ProveraDrustva")]
        public ActionResult ProveraDrustva()
        {
            //var userId = User.FindFirstValue(ClaimTypes.NameIdentifier); // ID trenutnog korisnika
            //var user =await Context.Korisnici.Where(p => p.Id == userId).FirstOrDefaultAsync();
            //var roles = _userManager.GetRolesAsync(user);
            return Ok("Ulogovan korisnik je registrovano drustvo");
        }

        //[Authorize(Roles = "Admin")]
        // [HttpPut]
        // [Route("DodajAdministratora/{id}")]
        // public async Task<ActionResult> DodajAdministratora(String id)
        // {

        //     var user = await Context.Korisnici.Where(p => p.Id == id).FirstOrDefaultAsync();
        //     //var roles = _userManager.GetRolesAsync(user);
        //     //return Ok("Ulogovan korisnik je administrator");
        //     await _userManager.AddToRoleAsync(user, "Admin");
        //     await Context.SaveChangesAsync();
        //     return Ok($"Korisnik {id} dodat kao admin!");
        // }

        [HttpPut]
        [Route("DodajPlaninarskoDrustvo/{id}")]
        public async Task<ActionResult> DodajPlaninarskoDrustvo(String id)
        {

            var user = await Context.Korisnici.Where(p => p.Id == id).FirstOrDefaultAsync();
            //var roles = _userManager.GetRolesAsync(user);
            //return Ok("Ulogovan korisnik je administrator");
            await _userManager.AddToRoleAsync(user, "Drustvo");
            await Context.SaveChangesAsync();
            return Ok($"Korisnik {id} dodat kao planinarsko drustvo!");
        }
        [Authorize(Roles = "Admin")]
        [HttpPut]
        [Route("PromeniStanjeClana/{korisnikId}")]
        public async Task<ActionResult> PromeniStanjeClana(string korisnikId)
        {
            try
            {
                if(String.IsNullOrEmpty(korisnikId))
                {
                    return BadRequest("Id ne sme da bude negativna vrednost");
                }
                var dog = await Context.Korisnici.Where(p => p.Id == korisnikId).FirstOrDefaultAsync();
                if(dog==null)
                {
                    return BadRequest("Ne postoji korisnik");
                }
                if(dog.Prihvacen==false)
                {
                    dog.Prihvacen=true;
                    // foreach (var k in dog.Organizator.Clanovi)
                    // {
                    //     ObavestiKreiranje(dog, k, dog.Organizator);
                    // }
                }
                else if(dog.Prihvacen==true)
                {
                    dog.Prihvacen=false;
                }
                await Context.SaveChangesAsync();
                return Ok("Dogdajaj je sada prihvacen od strane administarora");
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

    }
}