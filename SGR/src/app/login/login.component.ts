import { Component, input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { response } from 'express';
import { RegistroUsuarioComponent } from "../registro-usuario/registro-usuario.component";
import { OlvidePasswordComponent } from "../olvide-password/olvide-password.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  loginData = {
    NombreUsuario: '',
    Password: ''
  }

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    // Validamos si los campos están vacíos
    if (!this.loginData.NombreUsuario || !this.loginData.Password) {
      this.errorMessage = 'Todos los campos son requeridos.';
      return;
    }
  
    // Enviamos la solicitud de inicio de sesión al AuthService
    this.authService.login(this.loginData).subscribe(
      response => {
        console.log('Login exitoso', response);
        this.router.navigate(['/home']); // Redirige al usuario si el login es exitoso
      },
      error => {
        // Verificamos el código de estado de la respuesta para mostrar el mensaje adecuado
        if (error.status === 404) {
          this.errorMessage = 'Usuario no encontrado.';
        } else if (error.status === 401) {
          this.errorMessage = 'Contraseña incorrecta.';
        } else {
          this.errorMessage = 'Error en el login. Intente de nuevo.';
        }
      }
    );
  }
  
  
  
  cambiaRegistro(){
    this.router.navigate(['/registro'])
    console.log('entra')
  }

   
   cambiaOlvidarPassword(){
    this.router.navigate(['/olvide'])
    console.log('entra')
  }

}
