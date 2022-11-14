import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse,
  HttpHeaders


} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './core/services/user.service';

@Injectable()


export class AuthInterceptor implements HttpInterceptor {

  constructor(private _user: UserService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    let token = this._user.token;
    headersConfig['Authorization'] = `Bearer ${token}`

    const newRequest = request.clone({
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    });

    return next.handle(newRequest).pipe(map((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        event = event.clone({ body: this.modifyBody(event.body) });
      }
      return event;
    }));

  }

  private modifyBody(body: any) {
    if (body?.respuesta) {
      if (body.respuesta == 'no autenticado') {
        window.location.reload();
      }
    }
  }
}