import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast } from '../models/toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastsSubject = new BehaviorSubject<Toast[]>([]);
  toasts$ = this.toastsSubject.asObservable();

  show(title: string, message: string, type: 'success' | 'error') {
    const id = Date.now();
    const currentToasts = this.toastsSubject.getValue();
    this.toastsSubject.next([...currentToasts, { id, title, message, type }]);

    setTimeout(() => this.remove(id), 5000);
  }

  remove(id: number) {
    const updatedToasts = this.toastsSubject
      .getValue()
      .filter((toast) => toast.id !== id);
    this.toastsSubject.next(updatedToasts);
  }
}
