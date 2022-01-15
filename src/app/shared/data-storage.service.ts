/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, retry, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import * as fromApp from '../store/app.reducer';
import * as WeatehrActions from '../weather/store/weather.actions';

export class FetchCurrentWeather {
  success: boolean;
  currentWeather: any;
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
}
