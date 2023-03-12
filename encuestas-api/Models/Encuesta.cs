using System.ComponentModel.DataAnnotations;

namespace encuestas_api.Models
{
    public class Encuesta
    {
        [Key]
        public int IdEncuesta { get; set; }
        public string nombre { get; set; } = null!;
        public string descripcion { get; set; } = null!;
        public int idUsuario { get; set; }



    }
}
