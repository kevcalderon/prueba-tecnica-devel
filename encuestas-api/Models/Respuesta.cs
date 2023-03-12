using System.ComponentModel.DataAnnotations;

namespace encuestas_api.Models
{
    public class Respuesta
    {
        [Key]
        public int idRespuesta { get; set; }

        public string valor { get; set; } = null!;

        public int idCampo { get; set; }

    }
}
