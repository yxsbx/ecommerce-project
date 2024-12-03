import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, RouterModule],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  @Output() sidebarFixedChange = new EventEmitter<boolean>();

  isSidebarExpanded = true;
  isFixed = true;
  isSidebarHovering = false;

  menuItems = [
    {
      label: 'Dashboard',
      icon: ['fas', 'chart-line'] as IconProp,
      route: '/dashboard',
      role: 'all',
    },
    {
      label: 'Tarefas',
      icon: ['fas', 'tasks'] as IconProp,
      route: '/tasks',
      role: 'parent',
    },
    {
      label: 'Loja',
      icon: ['fas', 'store'] as IconProp,
      route: '/store',
      role: 'all',
    },
  ];

  constructor(private authService: AuthService, private router: Router) {}

  toggleSidebar(isHovering: boolean) {
    this.isSidebarHovering = isHovering;
    if (!this.isFixed) {
      this.isSidebarExpanded = isHovering;
    }
  }

  toggleFixedSidebar() {
    this.isFixed = !this.isFixed;
    this.sidebarFixedChange.emit(this.isFixed);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
