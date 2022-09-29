import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { SystemService } from '../services/system.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private _systemService :SystemService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

      request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this._systemService.getToken()}`
      }
    });
    return next.handle(request);
  }
}
