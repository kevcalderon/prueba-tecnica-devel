using System.ComponentModel.DataAnnotations;

namespace encuestas_api.Models
{
    public class Usuario
    {
        [Key]
        public int IdUsuario { get; set; }
        
        public string username { get; set; } = null!;
        public string password { get; set; } = null!;

    }
}
