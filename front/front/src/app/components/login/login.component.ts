import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { SERVER_CONFIG } from '../../app.config.server';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, CommonModule], // Incluye CommonModule
})
export class LoginComponent {
  nombre_usuario = '';
  contrasena = '';
  mensajeError = '';

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    this.mensajeError = ''; // Resetear mensaje de error

    this.http
      .post(`${SERVER_CONFIG.apiBaseUrl}/auth/login`, {
        nombre_usuario: this.nombre_usuario,
        contrasena: this.contrasena,
      })
      .subscribe(
        (response: any) => {
          localStorage.setItem('token', response.token);
          if (response.rol === 'Admin') {
            this.router.navigate(['/admin']);
          } else if (response.rol === 'Personal') {
            this.router.navigate(['/tareas']);
          } else {
            this.mensajeError = 'Rol desconocido.';
          }
        },
        () => {
          this.mensajeError = 'Credenciales incorrectas. Inténtalo nuevamente.';
        }
      );
  }
}
