using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using System.Drawing;
using System.Text.Json; 
using System.Text.Json.Serialization;


namespace PEAK.Models
{
    public class PlaninarskoDrustvo
    {
        [Key]
        public int ID { get; set; }
        [Required]
        public String Adresa { get; set; }
        public String BrojTelefona { get; set; }
        public String Naziv { get; set; }
        public int Clanarina { get; set; }
        public int BrojClanova { get; set; }
        [JsonIgnore]
        public List<Dogadjaj> Dogadjaji { get; set; }
        public List<ApplicationUser> Clanovi{ get; set; }
        public List<Obavestenje> Obavestenja { get; set; }
        public List<Objava> Objave { get; set; }
        [JsonIgnore]
        public List<Utisak> Utisci { get; set; }
        public String SlikaDrustva { get; set; }
        public ApplicationUser NalogDrustva { get; set; }
        public bool Kreirano { get; set; }
    }
}
