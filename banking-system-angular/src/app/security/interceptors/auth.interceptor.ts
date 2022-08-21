import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthenticationInterceptorService implements HttpInterceptor {
  constructor(public authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if(!!token)
    {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        },
        
    });
    }
   

    return next.handle(req);
}
}
