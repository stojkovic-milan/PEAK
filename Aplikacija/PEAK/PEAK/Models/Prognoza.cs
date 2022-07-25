using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace PEAK.Models
{
    public class Prognoza
    {
        [Key]
        public int Id { get; set; }
        [Range(-20,50)]
        public int Temperatura { get; set; }
        [Range(0,100)]
        public int VerovatnocaPadavina { get; set; }
        [Range(0,100)]
        public int Oblacnost { get; set; }
        public Dogadjaj Dogadjaj { get; set; }
    }
}
