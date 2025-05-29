import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  // en tu componente (ej: AppComponent o DashboardComponent)
  userName = localStorage.getItem('user_name');
  userRole = localStorage.getItem('user_role');
  dropdownOpen = false;
  constructor(private authService: AuthService, private router: Router) {}
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  logout() {
    this.authService.logout(); // Aquí puedes limpiar tokens, etc.
    this.router.navigate(['/login']); // Redirige al login
  }
}
