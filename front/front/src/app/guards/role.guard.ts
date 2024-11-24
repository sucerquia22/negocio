import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const role = localStorage.getItem('rol'); // Asegúrate de guardar este dato en el login
    if (role === 'Admin') {
      return true; // Permitir acceso solo a Admins
    }
    this.router.navigate(['/']); // Redirige al login o una página de error
    return false;
  }
}
