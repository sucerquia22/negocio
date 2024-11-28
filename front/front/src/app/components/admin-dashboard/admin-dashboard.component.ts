import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router'; // Importa Router y RouterModule
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css'],
  imports: [CommonModule, RouterModule], // Agrega RouterModule aquí
})
export class AdminDashboardComponent {
  constructor(private router: Router) {}

  goToTasks(negocioId: number) {
    this.router.navigate(['/tareas', negocioId]);
  }

  goToUsers() {
    this.router.navigate(['/usuarios']);
  }
}
