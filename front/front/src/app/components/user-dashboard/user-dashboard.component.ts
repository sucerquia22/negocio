import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SERVER_CONFIG } from '../../app.config.server';

@Component({
  standalone: true,
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css'],
  imports: [CommonModule, FormsModule],
})
export class UserDashboardComponent implements OnInit {
  tareas: any[] = [];
  usuarioId = 1; // Reemplazar con el ID del usuario autenticado
  mensajeExito = '';
  mensajeError = '';
  progreso = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarTareas();
  }

  cargarTareas(): void {
    const url = `${SERVER_CONFIG.apiBaseUrl}/tareas/usuario/${this.usuarioId}`;
    this.http.get(url).subscribe(
      (response: any) => {
        this.tareas = response.tareas;
        this.calcularProgreso();
      },
      () => {
        this.mensajeError = 'Error al cargar tareas.';
      }
    );
  }

  calcularProgreso(): void {
    const totalTareas = this.tareas.length;
    const tareasCompletadas = this.tareas.filter((tarea) => tarea.estado === 'Completada').length;
    this.progreso = totalTareas > 0 ? Math.round((tareasCompletadas / totalTareas) * 100) : 0;
  }

  marcarCompletada(tareaId: number): void {
    this.http
      .put(`${SERVER_CONFIG.apiBaseUrl}/tareas/marcar-completada`, { tarea_id: tareaId, usuario_id: this.usuarioId })
      .subscribe(
        () => {
          this.mensajeExito = 'Tarea marcada como completada.';
          this.cargarTareas();
        },
        () => {
          this.mensajeError = 'Error al marcar la tarea como completada.';
        }
      );
  }
}
