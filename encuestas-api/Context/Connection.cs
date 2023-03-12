using encuestas_api.Models;
using Microsoft.EntityFrameworkCore;

namespace encuestas_api.Context
{
    public class Connection: DbContext
    {
        public Connection(DbContextOptions<Connection> options) : base(options) { }

        public DbSet<Usuario> Usuario { get; set; }

        public DbSet<Encuesta> Encuesta { get; set; }

        public DbSet<Campo> Campo { get; set; }

        public DbSet<Respuesta> Respuesta { get; set; }

        public DbSet<Tipo> Tipo { get; set; }   

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
       => optionsBuilder.UseSqlServer("Server=DESKTOP-LBDH6DF\\SQLEXPRESS;Database=DevelDB;Trusted_Connection=True;TrustServerCertificate=True;");
    }
}
