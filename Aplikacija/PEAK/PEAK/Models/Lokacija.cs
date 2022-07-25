using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace PEAK.Models
{
    public class Lokacija
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public float XCord { get; set; }
        [Required]
        public float YCord { get; set; }
        [Required]
        public String Naziv { get; set; }

        public int Visina { get; set; }
        [JsonIgnore]
        public List<Ruta> Rute{ get; set; }
        public List<PrijavaDogadjaja> Prijave { get; set; }
        public Boolean potvrdjena { get; set; }
    }
}
