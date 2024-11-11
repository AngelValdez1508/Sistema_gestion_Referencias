import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-olvide-password',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './olvide-password.component.html',
  styleUrls: ['./olvide-password.component.scss']
})
export class OlvidePasswordComponent {
  olvideData = {
    NombreUsuario: ''
  };
  nuevaContrasena = '';
  confirmarContrasena = '';
  registroError: string | null = null;
  mostrarCampos: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    if (!this.olvideData.NombreUsuario) {
      this.registroError = 'El nombre de usuario es requerido.';
      return;
    }

    this.authService.verificarUsuario(this.olvideData.NombreUsuario).subscribe(
      response => {
        this.mostrarCampos = true;
        this.registroError = null;
      },
      error => {
        this.registroError = error.error.message || 'Usuario no encontrado';
        this.mostrarCampos = false;
      }
    );
  }

  restablecerContrasena() {
    if (!this.nuevaContrasena || !this.confirmarContrasena) {
      this.registroError = 'Todos los campos son requeridos.';
      return;
    }

    if (this.nuevaContrasena !== this.confirmarContrasena) {
      this.registroError = 'Las contraseñas no coinciden.';
      return;
    }

    this.authService.restablecerContrasena(this.olvideData.NombreUsuario, this.nuevaContrasena).subscribe(
      response => {
        alert('Contraseña restablecida exitosamente');
        this.olvidarCampos();
        this.router.navigate(['/login']);
      },
      error => {
        this.registroError = error.error.message || 'Error al restablecer la contraseña';
      }
    );
  }

  olvidarCampos() {
    this.olvideData.NombreUsuario = '';
    this.nuevaContrasena = '';
    this.confirmarContrasena = '';
    this.mostrarCampos = false;
  }
}

