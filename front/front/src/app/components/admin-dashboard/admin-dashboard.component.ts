import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { SERVER_CONFIG } from '../../app.config.server';



@Component({
  standalone: true,
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  imports: [CommonModule], // Necesario para plantillas
})
export class AdminDashboardComponent {
  negocios: any[] = []; // Lista de negocios con tareas

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarResumenNegocios();
  }

  cargarResumenNegocios(): void {
    this.http
      .get('http://localhost:3000/api/dashboard/admin') // Reemplaza con SERVER_CONFIG si aplica
      .subscribe((data: any) => {
        this.negocios = data.tareasPorNegocio;
      });
  }

  irGestionUsuarios(): void {
    console.log('Ir a Gestión de Usuarios');
  }

  irGestionTareas(): void {
    console.log('Ir a Gestión de Tareas');
  }
}
