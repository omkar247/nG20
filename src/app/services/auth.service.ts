// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, delay, map } from 'rxjs/operators';
import { AuthResponse, User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  currentUser$ = this.currentUserSubject.asObservable();
  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();


  constructor(
    private router: Router,
    private http: HttpClient
) {
   this.initializeAuth();
  }

  private initializeAuth(): void {
    const token = this.getToken();
    if (token && !this.isTokenExpired(token)) {
      this.validateToken(token);
    } else {
      this.clearSession();
    }
  }
  

  login(email: string, password: string): Observable<AuthResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
 
    return this.http.post<AuthResponse>(
      `${environment.apiUrl}/auth/login`,
      { email, password },
      { headers }
    ).pipe(
      map(response => {
        this.setSession(response);
        this.router.navigate(['/']);
        return response;
      }),
      catchError(error => {
        console.error('Login error:', error);
        throw this.handleError(error);
      })
    );
  }
 
  signup(userData: { name: string; email: string; password: string }): Observable<AuthResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    console.log('Sending signup request:', userData);

    return this.http.post<AuthResponse>(
      `${environment.apiUrl}/auth/signup`,
      userData,
      { headers }
    ).pipe(
      map(response => {
        console.log('Signup response received:', response);
        this.setSession(response);
        this.router.navigate(['/']);
        return response;
      }),
      catchError(error => {
        console.error('Signup error:', error);
        throw this.handleError(error);
      })
    );
  }
 
  logout(): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
 
    return this.http.post(`${environment.apiUrl}/auth/logout`, {}, { headers }).pipe(
      map(() => {
        this.clearSession();
        this.router.navigate(['/login']);
      }),
      catchError(error => {
        console.error('Logout error:', error);
        this.clearSession();
        this.router.navigate(['/login']);
        throw this.handleError(error);
      })
    );
  }
 
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/users`).pipe(
      catchError(error => {
        console.error('Get users error:', error);
        throw this.handleError(error);
      })
    );
  }
 
  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`).pipe(
      catchError(error => {
        console.error('Get user by ID error:', error);
        throw this.handleError(error);
      })
    );
  }
 
  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
 
  isLoggedIn(): boolean {
    return this.isAuthenticatedSubject.value;
  }
 
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }
 
  private setSession(response: AuthResponse): void {
    console.log('Setting session with:', response);
    localStorage.setItem('authToken', response.token);
    this.currentUserSubject.next(response.user);
    this.isAuthenticatedSubject.next(true);
    console.log('Session set, token stored:', response.token);
  }
 
  private clearSession(): void {
    localStorage.removeItem('authToken');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }
 
  private validateToken(token: string): void {
    // For now, we'll assume token is valid if it exists
    // In a real app, you might want to validate with the backend
    this.isAuthenticatedSubject.next(true);
  }
 
  private isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp * 1000 < Date.now();
    } catch {
      return true;
    }
  }
 
  private handleError(error: any): Error {
    if (error.error?.message) {
      return new Error(error.error.message);
    } else if (error.message) {
      return new Error(error.message);
    } else {
      return new Error('An unexpected error occurred');
    }
  }
}