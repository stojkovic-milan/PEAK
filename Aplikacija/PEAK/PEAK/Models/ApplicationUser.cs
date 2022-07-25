using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json; 
using System.Text.Json.Serialization;

namespace PEAK.Models
{
    public class ApplicationUser : IdentityUser
    {
        //[Key]
        //public int ID { get; set; }
        //[EmailAddress,Required]
        //public String Email { get; set; }
        //[Required]
        //public String Password { get; set; }
        [PersonalData]
        public String Ime { get; set; }
        [PersonalData]
        public String Prezime { get; set; }
        public String Adresa { get; set; }
        [Range(1,10)]
        public int Spremnost { get; set; }
        public List<Interesovanje> Interesovanja { get; set; }
        public List<ApplicationUser> Pratitelj { get; set; }
        public List<ApplicationUser> Prati { get; set; }
        //public List<Prijava> Prijave { get; set; }
        public List<Obavestenje> Obavestenja { get; set; }
        [JsonIgnore]
        public PlaninarskoDrustvo PlaninarskoDrustvo { get; set; }
        [JsonIgnore]
        public List<Dogadjaj> Dogadjaji { get; set; }
        public String ProfilnaSlika { get; set; }
        [JsonIgnore]
        public List<Utisak> Utisci { get; set; }
        public PlaninarskoDrustvo UpravljaDrustvom { get; set; }
        public Boolean Prihvacen { get; set; }
    }
}