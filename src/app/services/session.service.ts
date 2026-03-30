import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly TOKEN_REFRESH_INTERVAL = 5 * 60 * 1000; // 5 minutes
  private sessionTimer$: Observable<number>;

  constructor() {
    this.sessionTimer$ = timer(0, this.TOKEN_REFRESH_INTERVAL);
    this.startSessionMonitoring();
  }

  private startSessionMonitoring(): void {
    this.sessionTimer$.pipe(
      switchMap(() => {
        return this.checkSessionValidity();
      })
    ).subscribe();
  }

  private checkSessionValidity(): Observable<void> {
    return new Observable(observer => {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        observer.next();
        observer.complete();
        return;
      }

      if (this.isTokenExpired(token)) {
        this.clearSession();
        window.location.href = '/login';
      }
      
      observer.next();
      observer.complete();
    });
  }

  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }

  private clearSession(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userSession');
  }

  extendSession(): void {
    // Implement token refresh logic if needed
    console.log('Session extended');
  }
}