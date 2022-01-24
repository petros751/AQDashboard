/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, retry, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import * as fromApp from '../store/app.reducer';
import * as WeatehrActions from '../weather/store/weather.actions';
import { Admin } from '../admins/admin.model';
import * as AdminsActions from '../admins/store/admins.action';


export class FetchCurrentWeather {
  success: boolean;
  currentWeather: any;
}

export class FetchUsers {
  success: boolean;
  comment_id?: string;
  users: Admin[];
  lastEvaluatedKey: any;
}

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) { }


  fetchCurrentWeather() {
    return this.http
      .post<FetchCurrentWeather>(' https://api.ambeedata.com/weather/latest/by-lat-lng?lat=12&lng=77', {})
      .pipe(retry(1))
      .pipe(
        tap((resData) => {
          if (resData && resData.success) {
            console.log(resData);
            this.store.dispatch(new WeatehrActions.FetchCurrentWeather(resData.currentWeather));
          }
        })
      );
  }

  fetchUsers() {
    return this.http
    .post<FetchUsers>('',
      {}
    )
    .pipe(retry(1))
    .pipe(
      map(res => res.users.map(user => ({
            ...user
          }))),
      tap(users => {
        this.store.dispatch(new AdminsActions.FetchAdmins(users));
      })
    )
    .subscribe();
  }

  ClearAdminUsers() {
    this.store.dispatch(new AdminsActions.ClearAdminUsers());
  }

  createAdmin(newUser) {
    // return this.http
    //   .post<FetchUsers>('', newUser)
    //   .pipe(retry(1))
    //   .pipe(
    //   tap(data => {
    //     if (data.success) {
    //       this.store.dispatch(new AdminsActions.AddAdmin(newUser));
    //     }
    //   })
    // );
  }

  deleteAdmin(user) {
    console.log(user);
    return this.http.post<FetchUsers>('',
        user
      )
      .pipe(retry(1))
      .pipe(
      tap(data => {
        if (data.success) {
          this.store.dispatch(new AdminsActions.DeleteAdmin(user.superadmin_id));
        }
      })
    );
  }

  updateAdmin(newEditAdmin) {
    return this.http
      .post<FetchUsers>('', newEditAdmin)
      .pipe(retry(1))
      .toPromise()
      .then(data => {
        if (data.success) {
          this.store.dispatch(new AdminsActions.UpdateAdmin(newEditAdmin));
        }
        return data;
      });
  }
}
