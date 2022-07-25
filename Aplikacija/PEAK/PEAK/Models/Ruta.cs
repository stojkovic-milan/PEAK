using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json; 
using System.Text.Json.Serialization;

namespace PEAK.Models
{
    public class Ruta
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public String Naziv { get; set; }
        public int Duzina { get; set; }
        [Range(1,10)]
        public int Tezina { get; set; }
        
        public List<Lokacija> Lokacije { get; set; }
        //[JsonIgnore]
        public Planina Planina { get; set; }
        [JsonIgnore]
        public List<Dogadjaj> Dogadjaji { get; set; }
    }
}
