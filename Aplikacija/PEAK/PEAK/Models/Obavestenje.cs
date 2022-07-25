using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PEAK.Models
{
    public class Obavestenje
    {
        [Key]
        public int ID { get; set; }
        public String Naslov { get; set; }
        public String Tekst { get; set; }
        public List<ApplicationUser> Korisnici { get; set; }
        public PlaninarskoDrustvo Drustvo { get; set; }
        public DateTime Datum { get; set; }
    }
}
