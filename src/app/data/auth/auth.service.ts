import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BASE_URL } from '../../helpers/pipe/consts';
import { catchError, tap, throwError } from 'rxjs';
import type { TokenResponse } from './auth.interface';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  baseURL = BASE_URL + '/auth/';
  cookieService = inject(CookieService);
  refreshToken: string | null = this.cookieService.get('refreshToken') || '';
  accessToken: string | null = this.cookieService.get('accessToken') || '';
  router = inject(Router)

  get isAuth() {
    if (!this.accessToken) {
      this.accessToken = this.cookieService.get('accessToken');
      this.refreshToken = this.cookieService.get('refreshToken');
    }
    return !!this.accessToken;
  }

  login(payload: { username: string; password: string }) {
    const fd = new FormData();
    fd.append('username', payload.username);
    fd.append('password', payload.password);
    return this.http.post<TokenResponse>(`${this.baseURL}token`, fd).pipe(
      tap((val) => {
        this.setTokens(val);
      })
    );
  }

  private setTokens(val: TokenResponse) {
    this.refreshToken = val.refresh_token;
    this.accessToken = val.access_token;

    this.cookieService.set('refreshToken', this.refreshToken);
    this.cookieService.set('accessToken', this.accessToken);
  }

  makeRefreshToken() {
    return this.http
      .post<TokenResponse>(`${this.baseURL}refresh`, {
        refresh_token: this.refreshToken,
      })
      .pipe(
        tap((val) => this.setTokens(val)),
        catchError((error) => {
          this.logout();
          return throwError(() => error);
        })
      );
  }

  logout() {
    return this.http.post(`${this.baseURL}logout`, {}).pipe(
      tap(() => {
        this.cookieService.delete('refreshToken');
        this.cookieService.delete('accessToken');
        this.router.navigate(['/login'])
      })
    );
  }
}
