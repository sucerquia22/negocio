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

  ngOnInit() {
    if (this.isBrowser()) {
      const loggedIn = localStorage.getItem('isLoggedIn');
      console.log('Estado de sesión:', loggedIn);
    }
  }

  get isLoggedIn(): boolean {
    if (this.isBrowser()) {
      return !!localStorage.getItem('token'); // Comprueba si existe el token
    }
    return false; // En SSR, asume que no está logueado
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('token'); // Elimina el token
      window.location.href = '/'; // Redirige al login
    }
  }

  private isBrowser(): boolean {
    return typeof window !== 'undefined' && !!window.localStorage;
  }
}


