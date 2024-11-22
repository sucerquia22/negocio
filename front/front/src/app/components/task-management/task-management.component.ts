import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SERVER_CONFIG } from '../../app.config.server';

@Component({
  standalone: true,
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.css'],
  imports: [CommonModule, FormsModule],
})
export class TaskManagementComponent implements OnInit {
  tareas: any[] = [];
  usuarioId = 1; // ID del usuario actual (ajustar según autenticación)
  tareaEditada: any = null; // Tarea actualmente en edición
  mensajeError = '';
  mensajeExito = '';
  progreso = 0; // Porcentaje de tareas completadas

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarTareas();
  }

  cargarTareas(): void {
    this.http.get(`${SERVER_CONFIG.apiBaseUrl}/tareas/usuario/${this.usuarioId}`).subscribe(
      (response: any) => {
        this.tareas = response.tareas;
        this.calcularProgreso();
      },
      () => {
        this.mensajeError = 'Error al cargar tareas.';
      }
    );
  }

  marcarCompletada(tareaId: number): void {
    const payload = { tarea_id: tareaId, usuario_id: this.usuarioId };
    this.http.put(`${SERVER_CONFIG.apiBaseUrl}/tareas/marcar-completada`, payload).subscribe(
      () => {
        this.mensajeExito = 'Tarea marcada como completada.';
        this.cargarTareas();
      },
      () => {
        this.mensajeError = 'Error al marcar la tarea como completada.';
      }
    );
  }

  eliminarTarea(tareaId: number): void {
    if (confirm('¿Está seguro de eliminar esta tarea?')) {
      this.http.delete(`${SERVER_CONFIG.apiBaseUrl}/tareas/${tareaId}`).subscribe(
        () => {
          this.mensajeExito = 'Tarea eliminada correctamente.';
          this.cargarTareas();
        },
        () => {
          this.mensajeError = 'Error al eliminar la tarea.';
        }
      );
    }
  }

  // Activar edición de una tarea
  editarTarea(tarea: any): void {
    this.tareaEditada = { ...tarea }; // Clonar la tarea para edición
  }

  // Guardar cambios en la tarea editada
  guardarEdicion(): void {
    if (this.tareaEditada) {
      this.http.put(`${SERVER_CONFIG.apiBaseUrl}/tareas/${this.tareaEditada.id}`, this.tareaEditada).subscribe(
        () => {
          this.mensajeExito = 'Tarea actualizada correctamente.';
          this.tareaEditada = null;
          this.cargarTareas();
        },
        () => {
          this.mensajeError = 'Error al actualizar la tarea.';
        }
      );
    }
  }

  cancelarEdicion(): void {
    this.tareaEditada = null; // Cancelar edición
  }

  calcularProgreso(): void {
    const totalTareas = this.tareas.length;
    const tareasCompletadas = this.tareas.filter((tarea) => tarea.estado === 'Completada').length;
    this.progreso = totalTareas > 0 ? Math.round((tareasCompletadas / totalTareas) * 100) : 0;
  }
}
