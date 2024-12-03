import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../core/services/toast.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './toast.component.html',
})
export class ToastComponent {
  toasts$ = this.toastService.toasts$;

  constructor(private toastService: ToastService) {}

  removeToast(id: number) {
    this.toastService.remove(id);
  }

  getIcon(type: 'success' | 'error'): IconProp {
    return type === 'success'
      ? ['fas', 'circle-check']
      : ['fas', 'circle-xmark'];
  }
}
