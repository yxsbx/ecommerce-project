import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastComponent } from './shared/components/toast/toast.component';
import { AuthService } from './core/services/auth.service';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './shared/components/header/header.component';
import {
  FontAwesomeModule,
  FaIconLibrary,
} from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HeaderComponent,
    ToastComponent,
    SidebarComponent,
    CommonModule,
    FontAwesomeModule,
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Mercadinho da Mesada';

  isAuthenticated = false;
  isSidebarFixed = true;

  constructor(
    private authService: AuthService,
    library: FaIconLibrary
  ) {
    this.authService.isAuthenticated$.subscribe(status => {
      this.isAuthenticated = status;
    });

    library.addIconPacks(fas);
  }

  toggleSidebarFixed(isFixed: boolean) {
    this.isSidebarFixed = isFixed;
  }
}
