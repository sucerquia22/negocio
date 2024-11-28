import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { SERVER_CONFIG } from '../../app.config.server';

@Component({
  standalone: true,
  selector: 'app-task-management',
  templateUrl: './task-management.component.html',
  styleUrls: ['./task-management.component.css'],
  imports: [CommonModule, FormsModule], // Asegurarse de importar CommonModule y FormsModule
})
export class TaskManagementComponent {
  negocioId!: number;
  tareas: { titulo: string; descripcion: string }[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.negocioId = +this.route.snapshot.paramMap.get('negocioId')!;
  }

  addTask() {
    this.tareas.push({ titulo: '', descripcion: '' });
  }

  removeTask(index: number) {
    this.tareas.splice(index, 1);
  }

  confirmTasks() {
    this.http.post(`${SERVER_CONFIG.apiBaseUrl}/tareas`, {
      negocioId: this.negocioId,
      tareas: this.tareas,
    }).subscribe(() => alert('Tareas guardadas correctamente.'));
  }
}
