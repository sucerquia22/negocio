import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, FormsModule, HttpClientModule], // Asegúrate de incluir FormsModule y CommonModule
})
export class LoginComponent {
  nombreUsuario: string = '';
  contrasena: string = '';
  mensajeError: string = '';

  constructor(private router: Router) {}

  onSubmit() {
    // Lógica para manejar el inicio de sesión
  }

  iniciarSesion(): void {
    this.http
      .post('http://localhost:3000/api/auth/login', {
        nombre_usuario: this.nombreUsuario,
        contrasena: this.contrasena,
      })
      .subscribe(
        (response: any) => {
          if (response.usuario.rol === 'admin') {
            this.router.navigate(['/admin-dashboard']);
          } else if (response.usuario.rol === 'personal') {
            this.router.navigate(['/user-dashboard']);
          }
          localStorage.setItem('token', response.token);
        },
        (error) => {
          this.mensajeError = error.error.message || 'Error al iniciar sesión.';
        }
      );
  }
}




