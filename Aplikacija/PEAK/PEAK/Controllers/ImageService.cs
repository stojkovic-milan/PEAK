
using Microsoft.AspNetCore.Http;
using System;
using System.IO;
using System.Threading.Tasks;

namespace PEAK.Controllers
{
    public interface IImageService
    {
        public Task<String> SaveFile(IFormFile file, String user = "");
        
    }

    public class ImageService : IImageService
    {
        public async Task<String> SaveFile(IFormFile file, String user = "")
        {
            string path = Path.Combine(Directory.GetCurrentDirectory(), "files", "images");

            string filename = "image_" + user + DateTime.Now.ToString("yyyyMMddHHmmss") + Path.GetExtension(file.FileName);

            using (var stream = new FileStream(Path.Combine(path, filename), FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            return "https://localhost:5001/files/vratisliku/" + filename;
        }

        

    }
}