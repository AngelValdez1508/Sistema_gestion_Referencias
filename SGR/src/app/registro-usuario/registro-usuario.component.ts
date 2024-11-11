import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-usuario',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.scss']
})
export class RegistroUsuarioComponent {
  constructor(private authservice: AuthService, private router: Router) {}

  registroData = {
    NombreUsuario: '',
    Email: '',
    Password: '',
    confirmarPassword: ''
  }

  registroError: string = '';  // Variable para manejar los errores
  emailValido: boolean = true;  // Validación del email
  usuarioExistente: boolean = false;  // Si el usuario ya existe

  onSubmit() {
    // Verificar si las contraseñas coinciden
    if (this.registroData.Password !== this.registroData.confirmarPassword) {
      this.registroError = "Las contraseñas deben ser iguales";
      return;
    }

    // Verificar que todos los campos requeridos tengan valores
    if (!this.registroData.NombreUsuario || !this.registroData.Email || !this.registroData.Password) {
      this.registroError = "Todos los campos son obligatorios";
      return;
    }

    // Validación del email para que sea un email con dominio @gmail.com
    if (!this.registroData.Email.includes('@gmail.com')) {
      this.registroError = "El email debe ser de tipo @gmail.com";
      return;
    }

    // Se crea un objeto con los datos correctos que serán enviados a la API
    const dataRegistro = {
      NombreUsuario: this.registroData.NombreUsuario,
      Password: this.registroData.Password,
      Email: this.registroData.Email
    }

    // Llamar al servicio de registro y manejar la respuesta
    this.authservice.register(dataRegistro).subscribe({
      next: () => {
        console.log("Usuario registrado exitosamente");
        this.registroError = '';  // Limpiar mensaje de error en caso de éxito
        this.router.navigate(['/login']);  // Redirigir al login
      },
      error: (error) => {
        console.log("Error en el registro", error);
        // Mostrar mensaje de error si el usuario o email ya existen
        if (error.error.message === "El nombre de usuario o el email ya está en uso.") {
          this.usuarioExistente = true;
          this.registroError = 'El nombre de usuario o el email ya están en uso.';
        } else {
          this.registroError = 'Hubo un error al registrar el usuario.';
        }
      }
    });
  }

  // Función para navegar a la página de login programáticamente
  irALogin() {
    this.router.navigate(['/login']);  // Redirigir a la ruta de login
  }
}