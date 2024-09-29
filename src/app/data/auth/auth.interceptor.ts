import {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { BehaviorSubject, catchError, filter, switchMap, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

let isRefreshing$ = new BehaviorSubject<boolean>(false);

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).accessToken;
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!token) return next(req);

  if (isRefreshing$.value) {
    return refreshing(authService, req, next);
  }

  const newReq = midifyRequest(req, token);

  return next(newReq).pipe(
    catchError((error) => {
      if (error.status === 403) {
        return refreshing(authService, req, next);
      }
      return throwError(() => error);
    })
  );
};

function refreshing(
  authService: AuthService,
  req: HttpRequest<any>,
  next: HttpHandlerFn
) {
  if (!isRefreshing$.value) {
    isRefreshing$.next(true)
    return authService.makeRefreshToken()
    .pipe(
      switchMap(() => {
        const newToken = authService.accessToken as string;
        const retryReq = midifyRequest(req, newToken);
        return next(retryReq).pipe(
          tap(() => {
            isRefreshing$.next(false) // make false when request was finish
          })
        )
      })
    );
  }

  if(req.url.includes('refresh')) return next(midifyRequest(req, authService.accessToken!))

  return isRefreshing$.pipe( // holdinmg request during refreshing
    filter(isRefreshing => !isRefreshing),
    switchMap(res => {
      return next(midifyRequest(req, authService.accessToken!))
    })
  )
  // return next(midifyRequest(req, authService.accessToken!));
}

function midifyRequest(req: HttpRequest<any>, token: string) {
  return req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}
