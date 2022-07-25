using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PEAK.Models
{
    public class PrijavaLokacije
    {
        [Key]
        public int ID { get; set; }
        public String Razlog { get; set; }
        public ApplicationUser Korisnik { get; set; }
        public Lokacija Lokacija { get; set; }
    }
}