using System.ComponentModel.DataAnnotations;

namespace encuestas_api.Models
{
    public class Campo
    {
        [Key]
        public int IdCampo { get; set; }
        public string nombre { get; set; } = null!;
        public string titulo { get; set; } = null!;
   
        public int isRequerido { get; set; }

        public int idTipo { get; set; }

        public int idEncuesta { get; set; }

    }
}
