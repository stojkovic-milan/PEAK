using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;
using System.Text.Json; 
using System.Text.Json.Serialization;

namespace PEAK.Models
{
    public class Dogadjaj
    {   
        [Key]
        public int ID { get; set; }
        public String Naziv { get; set; }
        public DateTime Datum { get; set; }
        public String Tip { get; set; }
        public List<ApplicationUser> Korisnici { get; set; }
        public List<PrijavaDogadjaja> Prijave { get; set; }
        [JsonIgnore]
        public Ruta Ruta{ get; set; }
        public PlaninarskoDrustvo Organizator { get; set; }
        public Prognoza Prognoza { get; set; }
        public String SlikaDogadjaja { get; set; }
        public Boolean potvrdjen { get; set; }
        [JsonIgnore]
        public List<Utisak> Utisci { get; set; }
    }
}
