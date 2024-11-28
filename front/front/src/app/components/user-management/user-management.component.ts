import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { SERVER_CONFIG } from '../../app.config.server';

@Component({
  standalone: true,
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  imports: [CommonModule, FormsModule], // Asegurarse de importar CommonModule y FormsModule
})
export class UserManagementComponent {
  negocioId!: number;
  usuarios: { nombreCompleto: string; nombreUsuario: string; contrasena: string }[] = [];

  constructor(private http: HttpClient) {}

  addUser() {
    this.usuarios.push({ nombreCompleto: '', nombreUsuario: '', contrasena: '' });
  }

  removeUser(index: number) {
    this.usuarios.splice(index, 1);
  }

  confirmUsers() {
    this.http.post(`${SERVER_CONFIG.apiBaseUrl}/usuarios`, {
      negocioId: this.negocioId,
      usuarios: this.usuarios,
    }).subscribe(() => alert('Usuarios guardados correctamente.'));
  }
}
