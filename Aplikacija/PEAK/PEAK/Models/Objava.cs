using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PEAK.Models
{
    public class Objava
    {
        [Key]
        public int ID { get; set; }
        public String Naslov { get; set; }
        public String Tekst { get; set; }
        public DateTime Datum { get; set; }
        public String Tip { get; set; }
        public PlaninarskoDrustvo Drustvo { get; set; }
        //Admin
    }
}
