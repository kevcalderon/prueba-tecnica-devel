using encuestas_api.Context;
using encuestas_api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace encuestas_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly Connection context;

        public UsuarioController(Connection context)
        {
            this.context = context;
        }


        [HttpGet]
        public IEnumerable<Usuario> GetUsuarios()
        {
            return context.Usuario.ToList();
        }

        [HttpPost("login", Name ="Login")]
        public IActionResult Login([FromBody] Usuario usuario)
        {
            var busqueda = context.Usuario.FirstOrDefault(row => row.username == usuario.username && row.password == usuario.password);
            
            if (busqueda != null)
            {

                return Ok(new { idUsuario = busqueda.IdUsuario, user = busqueda.username});
            }
            else
            {
                return BadRequest(new { message = "Credenciales no validas." });
            }

        }


        [HttpPost("registro", Name ="Registro")]
        public IActionResult Registro([FromBody] Usuario usuario)
        {
            var busqueda = context.Usuario.FirstOrDefault(row => row.username == usuario.username);
            if (busqueda != null)
            {
                return BadRequest(new { message = "El usuario ya existe" });
            }
            else
            {
                context.Usuario.Add(usuario);
                context.SaveChanges();
                return Ok(new { message = "Usuario registrado correctamente." });
            }
        
        }

    }
}
