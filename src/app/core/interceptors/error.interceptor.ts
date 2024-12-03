import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 401:
            this.router.navigate(['/401']);
            break;
          case 403:
            this.router.navigate(['/403']);
            break;
          case 404:
            this.router.navigate(['/404']);
            break;
          case 500:
            this.router.navigate(['/500']);
            break;
          case 501:
            this.router.navigate(['/501']);
            break;
          default:
            this.router.navigate(['/500']);
            console.error('Erro desconhecido:', error);
        }
        return throwError(() => error);
      })
    );
  }
}
