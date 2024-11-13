namespace SGR_API.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using System.Linq;
    using SGR_API.Data;
    using SGR_API.Models;
    using System.Threading.Tasks;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.IdentityModel.Tokens;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.Extensions.Configuration;

    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly SGRContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(SGRContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] Usuario loginUser)
        {
            var usuario = _context.Usuarios.FirstOrDefault(u => u.NombreUsuario == loginUser.NombreUsuario);
            if (usuario == null)
            {
                return NotFound(new { message = "Usuario no encontrado" });
            }

            if (usuario.Password != loginUser.Password)
            {
                return Unauthorized(new { message = "Contraseña incorrecta" });
            }

            // Crear el token JWT
            var claims = new[]
            {
            new Claim(JwtRegisteredClaimNames.Sub, usuario.NombreUsuario),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.Role, usuario.Rol)
        };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds);

            return Ok(new { token = new JwtSecurityTokenHandler().WriteToken(token) });
        }  


    [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] Usuario newUser)
        {
            newUser.Estado = true;
            newUser.Rol = "User";

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

            if (!newUser.Email.EndsWith("@gmail.com"))
            {
                return BadRequest(new { message = "El email debe ser un correo @gmail.com." });
            }

            var existingUser = await _context.Usuarios
                .FirstOrDefaultAsync(u => u.NombreUsuario == newUser.NombreUsuario || u.Email == newUser.Email);

            if (existingUser != null)
            {
                return Conflict(new { message = "El nombre de usuario o el email ya está en uso." });
            }

            _context.Usuarios.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Usuario registrado exitosamente" });
        }

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

            usuario.Password = request.NuevaContraseña; // Asegúrate de cifrar la contraseña
            await _context.SaveChangesAsync();

            return Ok(new { message = "Contraseña restablecida exitosamente" });
        }

        // Método protegido con autorización JWT
        [Authorize]
        [HttpGet("datos-protegidos")]
        public IActionResult GetDatosProtegidos()
        {
            return Ok(new { message = "Datos accesibles solo con un token válido" });
        }
    }

    public class RestablecerContrasenaRequest
    {
        public string NombreUsuario { get; set; }
        public string NuevaContraseña { get; set; }
    }
}
