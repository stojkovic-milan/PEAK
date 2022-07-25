using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json; 
using System.Text.Json.Serialization;

namespace PEAK.Models
{
    public class Planina
    {
        [Key]
        public int ID { get; set; }
        public String Naziv { get; set; }
        [JsonIgnore]    
        public List<Ruta> Rute { get; set; }
        public List<Vrh> Vrhovi { get; set; }
        public String SlikaPlanine { get; set; }
        public Boolean Odobrena { get; set; }
    }
}