using encuestas_api.Context;
using encuestas_api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;

namespace encuestas_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CampoController : ControllerBase
    {
        private readonly Connection connection;

        public CampoController(Connection connection)
        {
            this.connection = connection;
        }

        [HttpGet("{id}", Name = "GetCamposEncuesta")]
        public IActionResult GetCampos(int id)
        {
          
            var campos = connection.Campo.Where(c => c.idEncuesta == id).ToList();
            if (campos != null)
            {
                return Ok(campos);
            }
            else
            {
                return BadRequest(new { error = "No hay campos agregados" });
            }
            
        }

        [HttpPost(Name = "PostCampo")]
        public IActionResult PostCampo([FromBody] Object data)
        {
            var temp = JsonConvert.DeserializeObject<dynamic>(data.ToString());

            foreach (var campo in temp.campo)
            {

                var cam = new Campo
                {
                    idEncuesta = temp.idEncuesta,
                    nombre = campo?.nombre.ToString(),
                    titulo = campo?.titulo.ToString(),
                    idTipo = int.Parse(campo?.idTipo.ToString()),
                    isRequerido = campo.isRequerido
                };
                connection.Campo.Add(cam);
            }
            connection.SaveChanges();
            return Ok(new { message = "Campos registrados correctamente." });


        }

        [HttpDelete("{id}", Name = "BorrarCampo")]
        public IActionResult BorrarCampo(int id)
        {
            var isExiste = connection.Campo.FirstOrDefault(en => en.IdCampo == id);

            if (isExiste != null)
            {

                connection.Campo.Remove(isExiste);
                connection.SaveChanges();
                return Ok(new { message = "Campo eliminado correctamente." });
            }
            else
            {
                return BadRequest(new { error = "No existe el campo" });
            }
        }

    }
}
