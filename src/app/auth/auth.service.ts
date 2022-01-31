/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { User } from './user.model';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { Router } from '@angular/router';

export class RenewTokenResponse {
  success: boolean;
  expiresIn: number;
  token: string;
  user: any;
  stores: any;
}
export interface AuthResponseData {
  token: string;
  user: any;
  expiresIn: number; //str
  localId: string;
  success: boolean;
  comment_id: string;
  stores: any;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpirationTimer: any;
  token: string;
  expirationDate: Date;
  socketConnected: boolean;
  user: any;
  stores: any;
  constructor(
    private http: HttpClient,
    private store: Store<fromApp.AppState>,
    private router: Router,
    ) { }

  login(superadmin_id: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://sap.deliverymanager.gr/prod/superadminpanel-login',
        {
          superadmin_id,
          password
        }
      )
      .pipe(
        tap(resData => {
          if (resData && resData.success) {
            console.log(resData);
            console.log(resData.user);
            this.handleAuth(
              resData.token,
              +resData.expiresIn,
              resData.user,
              resData.stores,
              false
            );
          }
        }),
      );
  }

  signup(superadmin_id: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDhTm9nlI3TV99kU1p1My-1k87E6qvuRiw',
        {
          email: superadmin_id,
          password,
          returnSecureToken: true
        }
      )
      .pipe(
        tap(resData => {
          if (resData && resData.success) {
            console.log(resData);
            console.log(resData.user);
            this.handleAuth(
              resData.token,
              +resData.expiresIn,
              resData.user,
              resData.stores,
              false
            );
          }
        }),
      );
  }

  private handleAuth(token: string, expiresIn: number, user: any, stores: any, socketConnected: boolean) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const newUser = new User(token, expirationDate, user, stores, socketConnected);
    this.loadUserOnState(token, expirationDate, user, stores, socketConnected);

    localStorage.setItem('userData', JSON.stringify(newUser));
    this.tokenExpirationTimer = setTimeout(() => {
      this.logout();
    }, expiresIn * 1000);
  }

  private loadUserOnState(token: string, expirationDate: Date, user: any, stores: any, socketConnected: boolean) {
    this.store.dispatch(
      new AuthActions.Login({
        token,
        expirationDate,
        user,
        stores,
        socketConnected
      })
    );
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout());
    this.router.navigate(['/auth'], { replaceUrl: true });
    localStorage.clear();
    window.location.reload();
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogin() {
    if (localStorage.getItem('userData')) {
      try {
        this.token = JSON.parse(localStorage.getItem('userData')).token;
        this.expirationDate = new Date(JSON.parse(localStorage.getItem('userData')).tokenExpirationDate);
        this.user = JSON.parse(localStorage.getItem('userData')).user;
        this.stores = JSON.parse(localStorage.getItem('userData')).stores;
      } catch (er) {
        this.token = null;
        this.expirationDate = null;
        localStorage.clear();
      }
      // User
      if (this.token && this.expirationDate) {
        this.loadUserOnState(this.token, this.expirationDate, this.user, this.stores, true); //true, because this is for the first time the app opens and we do not care what it is saved from the past
        return this.http
          .post<RenewTokenResponse>(
            'https://sap.deliverymanager.gr/prod/superadminpanel-renew-token',
            {}
          )
          .subscribe(resData => {
            this.handleAuth(
              resData.token,
              +resData.expiresIn,
              resData.user,
              resData.stores,
              false // false because we now want to trigger the socket to connect!
            );
          }, error => {
            this.logout();
          });
      } else {
        this.logout();
      }
    }
  }
}
