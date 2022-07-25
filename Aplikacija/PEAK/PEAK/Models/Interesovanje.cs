using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace PEAK.Models
{
    public enum Tipovi
    {
        Tip1,
        Tip2,
        Tip3
    }
    public class Interesovanje
    {
        [Key]
        public int ID { get; set; }
        //public Korisnik Korisnik { get; set; }
        [StringLength(50),Column(TypeName = "VARCHAR(50)")]
        public String Tip{ get; set; }
        [StringLength(50),Column(TypeName = "VARCHAR(50)")]
        public String Mesto { get; set; }
        public int Udaljenost { get; set; }
        public ApplicationUser Korisnik;
    }
}
