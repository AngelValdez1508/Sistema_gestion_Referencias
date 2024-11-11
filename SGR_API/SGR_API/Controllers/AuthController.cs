namespace SGR_API.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using System.Linq;
    using SGR_API.Data;
    using SGR_API.Models;
    using System.Threading.Tasks;
    using Microsoft.EntityFrameworkCore;

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly SGRContext _context;

        public AuthController(SGRContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] Usuario loginUser)
        {
            // Primero buscamos si el usuario existe
            var usuario = _context.Usuarios.FirstOrDefault(u => u.NombreUsuario == loginUser.NombreUsuario);

            if (usuario == null)
            {
                // Si el usuario no existe, devolvemos 404
                return NotFound(new { message = "Usuario no encontrado" });
            }

            // Si el usuario existe pero la contraseña es incorrecta
            if (usuario.Password != loginUser.Password)
            {
                // Devolvemos 401 si la contraseña es incorrecta
                return Unauthorized(new { message = "Contraseña incorrecta" });
            }

            // Si las credenciales son correctas, devolvemos éxito
            return Ok(new { message = "Login exitoso" });
        }


        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Usuario newUser)
        {
            newUser.Estado = true;
            newUser.Rol = "User";

            // Validación de campos específicos
            if (newUser == null)
            {
                return BadRequest(new { message = "Datos de usuario no proporcionados." });
            }
            if (string.IsNullOrEmpty(newUser.NombreUsuario))
            {
                return BadRequest(new { message = "El nombre de usuario es requerido." });
            }
            if (string.IsNullOrEmpty(newUser.Password))
            {
                return BadRequest(new { message = "La contraseña es requerida." });
            }
            if (string.IsNullOrEmpty(newUser.Email))
            {
                return BadRequest(new { message = "El email es requerido." });
            }

            // Validación de formato específico para email
            if (!newUser.Email.EndsWith("@gmail.com"))
            {
                return BadRequest(new { message = "El email debe ser un correo @gmail.com." });
            }

            // Verificación de duplicados
            var existingUser = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.NombreUsuario == newUser.NombreUsuario || u.Email == newUser.Email);

            if (existingUser != null)
            {
                return Conflict(new { message = "El nombre de usuario o el email ya está en uso." });
            }

            // Registro exitoso
            _context.Usuarios.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Usuario registrado exitosamente" });
        }

        // Método para verificar si el usuario existe
        [HttpGet("verificar-usuario/{nombreUsuario}")]
        public IActionResult VerificarUsuario(string nombreUsuario)
        {
            var usuario = _context.Usuarios.FirstOrDefault(u => u.NombreUsuario == nombreUsuario);
            if (usuario == null)
            {
                return NotFound(new { message = "Usuario no encontrado" });
            }

            return Ok(new { message = "Usuario encontrado" });
        }

        // Método para restablecer la contraseña
        [HttpPost("restablecer-contrasena")]
        public async Task<IActionResult> RestablecerContrasena([FromBody] RestablecerContrasenaRequest request)
        {
            if (string.IsNullOrEmpty(request.NombreUsuario) || string.IsNullOrEmpty(request.NuevaContraseña))
            {
                return BadRequest(new { message = "Todos los campos son requeridos." });
            }

            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.NombreUsuario == request.NombreUsuario);
            if (usuario == null)
            {
                return NotFound(new { message = "Usuario no encontrado" });
            }

            // Aquí puedes cifrar la nueva contraseña antes de almacenarla
            // usuario.Password = BCrypt.Net.BCrypt.HashPassword(request.NuevaContraseña);
            usuario.Password = request.NuevaContraseña; // Asegúrate de cifrar la contraseña
            await _context.SaveChangesAsync();

            return Ok(new { message = "Contraseña restablecida exitosamente" });
        }
    }

    // Clase para la solicitud de restablecimiento de contraseña
    public class RestablecerContrasenaRequest
    {
        public string NombreUsuario { get; set; }
        public string NuevaContraseña { get; set; }
    }
}
