import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FontAwesomeModule, CommonModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  userName: string | null = null;
  userEmail: string | null = null;
  profilePictureNumber: number = 1;
  isProfileMenuOpen = false;

  constructor(private authService: AuthService, private router: Router) {
    const currentUser = this.authService.getCurrentUser();
    this.userName = currentUser?.name ?? 'Usuário';
    this.userEmail = currentUser?.email ?? 'email@example.com';
    this.profilePictureNumber = currentUser?.profilePictureNumber ?? 1;
  }

  toggleProfileMenu(event: Event) {
    event.stopPropagation();
    this.isProfileMenuOpen = !this.isProfileMenuOpen;
  }

  closeProfileMenu(event: Event) {
    if (!event.target || !(event.target as HTMLElement).closest('.relative')) {
      this.isProfileMenuOpen = false;
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

  toggleMode() {
    console.log('Modo infantil alternado!');
  }
}
