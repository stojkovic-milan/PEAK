using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using PEAK.Models;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Threading.Tasks;

namespace PEAK.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseMySql(connectionString: @"Database=peak; Data Source=peak2-sw.mysql.database.azure.com; User Id=PEAK; Password=Kjkszpj1@",
                new MySqlServerVersion(new Version(10, 4, 17)));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Dogadjaj>()
            .HasOne(a => a.Prognoza)
            .WithOne(a => a.Dogadjaj)
            .HasForeignKey<Prognoza>(c => c.Id);

            modelBuilder.Entity<PlaninarskoDrustvo>()
                .HasOne(a => a.NalogDrustva)
                .WithOne(a => a.UpravljaDrustvom)
                .HasPrincipalKey<ApplicationUser>(c => c.Id);
            base.OnModelCreating(modelBuilder);
        }
        public DbSet<Dogadjaj> Dogadjaji{ get; set; }
        public DbSet<Interesovanje> Interesovanja{ get; set; }
        public DbSet<Lokacija> Lokacije{ get; set; }
        public DbSet<Objava> Objave{ get; set; }
        public DbSet<Planina> Planine{ get; set; }
        public DbSet<PlaninarskoDrustvo> PlaninarskaDrustva{ get; set; }
        public DbSet<Ruta> Ruta { get; set; }
        public DbSet<Utisak> Utisci{ get; set; }  
        public DbSet<Obavestenje> Obavestenja{ get; set; }  
        public DbSet<PrijavaDogadjaja> PrijaveDogadjaja{ get; set; }
        public DbSet<PrijavaLokacije> PrijaveLokacije { get; set; }
        public DbSet<PrijavaUtiska> PrijaveUtisaka{ get; set; }  
        public DbSet<Vrh> Vrhovi { get; set; }
        public DbSet<ApplicationUser> Korisnici { get; set; }
    }
}