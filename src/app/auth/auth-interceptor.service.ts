/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { exhaustMap, take, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService, private store: Store<fromApp.AppState>) {

  }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('auth').pipe(
      take(1),
      map(authState => authState.user),
      exhaustMap(user => {
        if (!user) {
          console.log('REQUEST: ', req);
          return next.handle(req);
        }
        const modifedReq = req.clone({
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              // Authorization: user.token,
              'x-api-key': 'EdNrXnEdDo3JhFuxn4dVCaIXI03pFotQ6BScYGZK'
            })
        });
        console.log('modifedReq: ', modifedReq);
        return next.handle(modifedReq);
      }));
}
}
