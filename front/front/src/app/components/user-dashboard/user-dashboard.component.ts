import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SERVER_CONFIG } from '../../app.config.server';

@Component({
  standalone: true,
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  imports: [CommonModule],
})
export class UserDashboardComponent implements OnInit {
  nombreUsuario = '';
  fotoUsuario = '';
  tareasCompletadas: any[] = [];
  tareasPendientes: any[] = [];
  progreso = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarInformacionUsuario();
    this.cargarTareas();
  }

  cargarInformacionUsuario(): void {
    const token = localStorage.getItem('token');
    this.http.get(`${SERVER_CONFIG.apiBaseUrl}/usuarios/perfil`, { headers: { Authorization: `Bearer ${token}` } })
      .subscribe((response: any) => {
        this.nombreUsuario = response.nombre_completo;
        this.fotoUsuario = response.foto_url;
      });
  }

  cargarTareas(): void {
    const token = localStorage.getItem('token');
    this.http.get(`${SERVER_CONFIG.apiBaseUrl}/tareas/asignadas`, { headers: { Authorization: `Bearer ${token}` } })
      .subscribe((response: any) => {
        this.tareasCompletadas = response.tareas.filter((tarea: any) => tarea.estado === 'Completada');
        this.tareasPendientes = response.tareas.filter((tarea: any) => tarea.estado === 'Pendiente');
        this.calcularProgreso();
      });
  }

  calcularProgreso(): void {
    const total = this.tareasPendientes.length + this.tareasCompletadas.length;
    const completadas = this.tareasCompletadas.length;
    this.progreso = total > 0 ? (completadas / total) * 100 : 0;
  }
}
