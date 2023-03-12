using System.ComponentModel.DataAnnotations;

namespace encuestas_api.Models
{
    public class Tipo
    {
        [Key]
        public int IdTipo { get; set; }

        public string nombre { get; set; } = null!; 

 
    }
}
