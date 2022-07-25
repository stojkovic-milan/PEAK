using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using PEAK.Data;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace PEAK.Controllers
{
    [Authorize]
    [ApiController]
    [Route("files")]
    public class FileController : ControllerBase
    {
        private ApplicationDbContext Context;

        public IImageService _imageSevice;

        public FileController(ApplicationDbContext context, IImageService imgSevice)
        {
            Context = context;
            this._imageSevice = imgSevice;
        }
        [AllowAnonymous]
        [HttpPost]
        [Route("postaviSliku")]
        public async Task<String> postaviSliku(IFormFile file)
        {
            try
            {
                var username = User.FindFirstValue(ClaimTypes.NameIdentifier);
                String msg = await _imageSevice.SaveFile(file, username);
                //return Ok(new { url = msg });
                //return Ok(msg);
                return msg;
            }
            catch (Exception e)
            {
                return ("Greska!" +e.Message);
            }
        }

        [AllowAnonymous]
        [HttpGet]
        [Route("vratisliku/{url}")]
        public ActionResult vratisliku(String url)
        {
            try
            {
                var image = System.IO.File.OpenRead(Path.Combine(Directory.GetCurrentDirectory(), "files/images", url));
                return File(image, "image/jpeg");
            }
            catch (Exception e)
            {
                return BadRequest("Greska! " + e.Message);
            }
        }
    }
}