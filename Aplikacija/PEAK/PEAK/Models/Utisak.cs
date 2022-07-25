using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json; 
using System.Text.Json.Serialization;

namespace PEAK.Models
{
    public class Utisak
    {
        [Key]
        public int ID { get; set; }
        [MaxLength(256)]
        public String Komentar { get; set; }
        [Range(1,5),Required]
        public float Ocena { get; set; }
        public Dogadjaj Dogadjaj { get; set; }
        //public Korisnik Korisnik { get; set; }
        public PlaninarskoDrustvo Drustvo{ get; set; }
        [JsonIgnore]
        public List<PrijavaDogadjaja> Prijave { get; set; }
        [JsonIgnore]
        public List<PrijavaUtiska> PrijavaUtiska { get; set; }
        public ApplicationUser Korisnik { get; set; }
        public DateTime DatumObjave { get; set; }
    }
}
