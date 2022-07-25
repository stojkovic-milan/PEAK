using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json; 
using System.Text.Json.Serialization;

namespace PEAK.Models
{
    public class PrijavaUtiska
    {
        [Key]
        public int ID { get; set; }
        public String Razlog { get; set; }
        public ApplicationUser Korisnik { get; set; }
        public Utisak Utisak{ get; set; }
    }
}