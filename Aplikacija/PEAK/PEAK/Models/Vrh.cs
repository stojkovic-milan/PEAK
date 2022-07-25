using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json; 
using System.Text.Json.Serialization;

namespace PEAK.Models
{
    public class Vrh
    {
        [Key]
        public int ID { get; set; }
        [JsonIgnore]
        public Planina Planina { get; set; }
        public String Naziv { get; set; }
        public int Visina { get; set; }
    }
}