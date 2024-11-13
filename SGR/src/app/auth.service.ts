import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

// Estructura de los datos de login
interface LoginData {
  NombreUsuario: string;
  Password: string;
}

// Estructura de los datos de registro
export interface RegisterData {
  NombreUsuario: string;
  Password: string;
  Email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:44383/api/auth'; // URL de la API

  constructor(private http: HttpClient, private router: Router) { }

  // Método para el login
  // se envían los datos del login a la API y me debería de devolver la respuesta de la API como un observable
  login(data: LoginData): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/login`, data, { headers });
  }

  // Método para el registro
  // se envían los datos del formulario de registro a la API y me debería devolver el observable 
  register(data: RegisterData): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/register`, data, { headers });
  }

  // Método para verificar si el usuario existe
  verificarUsuario(nombreUsuario: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.get<any>(`${this.apiUrl}/verificar-usuario/${nombreUsuario}`, { headers });
  }

  // Método para restablecer la contraseña
  restablecerContrasena(nombreUsuario: string, nuevaContrasena: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/restablecer-contrasena`, {
      NombreUsuario: nombreUsuario,
      NuevaContraseña: nuevaContrasena
    }, { headers });
  }

  // Método para almacenar el token JWT en localStorage
  guardarToken(token: string) {
    localStorage.setItem('userToken', token);
  }

  // Método para obtener el token JWT desde localStorage
  obtenerToken(): string | null {
    return localStorage.getItem('userToken');
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.obtenerToken();
    return !!token; // Retorna true si hay un token, false si no
  }

  // Método para cerrar sesión
  logout() {
    localStorage.removeItem('userToken'); // Eliminar el token del almacenamiento local
    this.router.navigate(['/login']); // Redirigir al usuario a la página de login
  }
}


