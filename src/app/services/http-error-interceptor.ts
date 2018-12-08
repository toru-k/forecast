import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptor implements HttpInterceptor {
  message: string;

  constructor() {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const req = request.clone();
    return next.handle(req).pipe(
      catchError(res => {
        switch (res.status) {
          case 400:
          case 401:
          case 403:
          case 404:
          case 500:
            if (res.error) {
              this.message = `${res.error.cod}: ${res.error.message}`;
            }
            break;
          default:
            break;
        }
        if (this.message) {
          return throwError(this.message);
        }
        return throwError(res);
      })
    );
  }
}
