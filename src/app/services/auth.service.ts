import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { LoginRequest, LoginResponse } from '../models/auth.model';
import { Router } from '@angular/router';
import { API_URLS } from '../config/api.config';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly loginUrl = API_URLS.auth.login;
  private readonly TOKEN_KEY = 'auth_token';
  private readonly USER_EMAIL_KEY = 'user_email';

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {}

  login(credentials: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.loginUrl, credentials).pipe(
      tap(response => {
        if (response.token) {
          this.setToken(response.token);
          this.setUserEmail(credentials.email);
          this.isAuthenticatedSubject.next(true);
        }
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    this.removeToken();
    this.removeUserEmail();
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getUserEmail(): string | null {
    return localStorage.getItem(this.USER_EMAIL_KEY);
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  private setUserEmail(email: string): void {
    localStorage.setItem(this.USER_EMAIL_KEY, email);
  }

  private removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  private removeUserEmail(): void {
    localStorage.removeItem(this.USER_EMAIL_KEY);
  }

  private hasToken(): boolean {
    return !!this.getToken();
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred during login';
    
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Server Error: ${error.status} - ${error.message}`;
      if (error.error?.message) {
        errorMessage = error.error.message;
      }
    }
    
    return throwError(() => new Error(errorMessage));
  }
}
