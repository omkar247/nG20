import { inject } from '@angular/core';
import {
  HttpRequest,
  HttpEvent,
  HttpErrorResponse,
  HttpHandlerFn,
  HttpInterceptorFn
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const router = inject(Router);
  
  const authEndpoints = ['/auth/login', '/auth/signup', '/auth/logout'];
  const isAuthEndpoint = authEndpoints.some(endpoint => 
    request.url.includes(endpoint)
  );
  
  const token = authService.getToken();
  
  if (token && !isAuthEndpoint) {
    console.log('Adding token to request:', token.substring(0, 20) + '...');
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  } else if (!token && !isAuthEndpoint) {
    console.log('No token available for request:', request.url);
  }

  return next(request).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        authService.logout();
        router.navigate(['/login']);
      }
      return throwError(error);
    })
  );
};