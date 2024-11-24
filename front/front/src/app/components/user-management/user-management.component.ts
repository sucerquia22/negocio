import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SERVER_CONFIG } from '../../app.config.server';

@Component({
  standalone: true,
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  imports: [CommonModule, FormsModule],
})
export class UserManagementComponent implements OnInit {
  usuarios: any[] = [];
  nuevoUsuario = {
    nombre_completo: '',
    nombre_usuario: '',
    contrasena: '',
    rol: 'Personal',
  };
  mensajeError = '';
  mensajeExito = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios(): void {
    this.http.get(`${SERVER_CONFIG.apiBaseUrl}/usuarios`).subscribe(
      (response: any) => {
        this.usuarios = response.usuarios;
      },
      () => {
        this.mensajeError = 'Error al cargar usuarios.';
      }
    );
  }

  agregarUsuario(): void {
    this.http.post(`${SERVER_CONFIG.apiBaseUrl}/usuarios`, this.nuevoUsuario).subscribe(
      () => {
        this.mensajeExito = 'Usuario agregado exitosamente.';
        this.cargarUsuarios();
        this.nuevoUsuario = { nombre_completo: '', nombre_usuario: '', contrasena: '', rol: 'Personal' };
      },
      () => {
        this.mensajeError = 'Error al agregar usuario.';
      }
    );
  }

  eliminarUsuario(id: number): void {
    this.http.delete(`${SERVER_CONFIG.apiBaseUrl}/usuarios/${id}`).subscribe(
      () => {
        this.mensajeExito = 'Usuario eliminado exitosamente.';
        this.cargarUsuarios();
      },
      () => {
        this.mensajeError = 'Error al eliminar usuario.';
      }
    );
  }
}
