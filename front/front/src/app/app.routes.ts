import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { TaskManagementComponent } from './components/task-management/task-management.component';
import { UserManagementComponent } from './components/user-management/user-management.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component'; // Nueva importación
import { AuthGuard } from './guards/auth.guard'; // Importar el guard


export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'usuarios', component: UserManagementComponent, canActivate: [AuthGuard] },
  { path: 'tareas', component: TaskManagementComponent, canActivate: [AuthGuard] },
  { path: 'user', component: UserDashboardComponent, canActivate: [AuthGuard] }, // Nueva ruta
  { path: '**', redirectTo: '' },
];
