import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    RouterOutlet,
    LoginComponent,
    CommonModule, // Importa CommonModule para usar *ngIf
  ],
})
export class AppComponent {
  title = 'frontend';

  get isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); // Devuelve true si el token existe
  }

  logout(): void {
    localStorage.removeItem('token'); // Elimina el token
    window.location.href = '/'; // Redirige al login
  }
}
