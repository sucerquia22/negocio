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
  filtroEstado = '';
  queryBusqueda = '';
  mensajeError = '';
  mensajeExito = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarTareas();
  }

  cargarTareas(): void {
    let url = `${SERVER_CONFIG.apiBaseUrl}/tareas/filtrar`;
    const params: any = {};
    if (this.filtroEstado) params.estado = this.filtroEstado;
    if (this.queryBusqueda) params.query = this.queryBusqueda;

    this.http.get(url, { params }).subscribe(
      (response: any) => {
        this.tareas = response.tareas;
      },
      () => {
        this.mensajeError = 'Error al cargar tareas.';
      }
    );
  }

  limpiarFiltros(): void {
    this.filtroEstado = '';
    this.queryBusqueda = '';
    this.cargarTareas();
  }

  marcarCompletada(tareaId: number): void {
    this.http
      .put(`${SERVER_CONFIG.apiBaseUrl}/tareas/marcar-completada`, {
        tarea_id: tareaId,
      })
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

  eliminarTarea(tareaId: number): void {
    this.http.delete(`${SERVER_CONFIG.apiBaseUrl}/tareas/${tareaId}`).subscribe(
      () => {
        this.mensajeExito = 'Tarea eliminada exitosamente.';
        this.cargarTareas();
      },
      () => {
        this.mensajeError = 'Error al eliminar la tarea.';
      }
    );
  }
}
