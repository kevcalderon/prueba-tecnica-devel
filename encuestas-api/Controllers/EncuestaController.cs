using encuestas_api.Context;
using encuestas_api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Routing;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.Net.Http.Json;
using System.Security.Claims;
using System.Text.Json.Serialization;

namespace encuestas_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EncuestaController : ControllerBase
    {
        private readonly Connection connection;

        public EncuestaController(Connection connection)
        {
            this.connection = connection;
        }

        [HttpGet(Name = "GetEncuestas")]
        public IActionResult GetEncuestas()
        {
            return Ok(connection.Encuesta.ToList());
        }

        [HttpGet("user/{id}", Name = "GetEncuestasUsuario")]
        public IActionResult GetEncuestasUser(int id)
        {

            var encuesta = connection.Encuesta.Where(e => e.idUsuario == id).ToList();
            return Ok(encuesta);
        }

        [HttpGet("{id}", Name = "GetEncuestaIndividual")]
        public IActionResult GetEncuestaIndividual(int id)
        {

            var encuesta = connection.Encuesta.Where(e => e.IdEncuesta == id).ToList();
            return Ok(encuesta);
        }


        [HttpPost(Name = "PostEncuesta")]
        public IActionResult RegistraEncuesta([FromBody] Object data)
        {
            var temp = JsonConvert.DeserializeObject<dynamic>(data.ToString()); ;
            var idUsuario = (int)temp.idUsuario;
            var isExiste = connection.Usuario.Where(us => (int)us.IdUsuario == idUsuario).FirstOrDefault();

            if (isExiste != null)
            {
                var encuesta = new Encuesta { nombre = temp.nombre, descripcion = temp.descripcion, idUsuario = temp.idUsuario };
                connection.Encuesta.Add(encuesta);
                connection.SaveChanges();
                return Ok(new { message = "Encuesta creada correctamente.", id = encuesta.IdEncuesta });
            } else
            {
                return BadRequest(new {error = "No existe el usuario para realizar encuesta."});
            }
        }

        [HttpPut("{id}", Name="ActualizarEncuesta")]
        public IActionResult ActualizarEncuesta(int id, [FromBody] Object data)
        {
            var isExiste = connection.Encuesta.FirstOrDefault(en => en.IdEncuesta == id);

            if (isExiste != null)
            {
                var dataJson = JsonConvert.DeserializeObject<dynamic>(data.ToString());
                isExiste.nombre = dataJson.nombre.ToString();
                isExiste.descripcion = dataJson.descripcion.ToString();

                connection.SaveChanges();
                return Ok(new { message = "Encuesta actualizada correctamente" });
            } else
            {
                return BadRequest(new { error = "No existe la encuesta" });
            }
        }

        [HttpDelete("{id}", Name= "BorrarEncuesta")]
        public IActionResult BorrarEncuesta(int id)
        {
            var isExiste = connection.Encuesta.FirstOrDefault(en => en.IdEncuesta == id);

            if(isExiste != null)
            {
                
                connection.Encuesta.Remove(isExiste);
                connection.SaveChanges();
                return Ok(new { message = "Encuestas eliminada correctamente." });
            }
            else
            {
                return BadRequest(new { error = "No existe la encuesta" });
            }
        }




    }
}
