import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { LoginComponent } from './components/login/login.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router'; 
import { StorageUtils } from './utils/storage.utils';


@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
    RouterModule, // Importa RouterModule
    LoginComponent, // Asegúrate de que es standalone
    AdminDashboardComponent,
    UserDashboardComponent,
  ],
})
export class AppComponent {
  isLoggedIn = false;
  userRole: string | null = null;

  constructor(private router: Router) {}

  private checkLocalStorage(): boolean {
    return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
  }

  ngOnInit() {
    const token = StorageUtils.getItem('token');
    const role = StorageUtils.getItem('role');
    if (token && role) {
      this.isLoggedIn = true;
      this.userRole = role;
    }
  }

  logout() {
    StorageUtils.clear();
    this.isLoggedIn = false;
    this.userRole = null;
    this.router.navigate(['/']);
  }
}