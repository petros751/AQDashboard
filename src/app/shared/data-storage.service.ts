/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, retry, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import * as fromApp from '../store/app.reducer';

export class FetchCities {
  success: boolean;
  comment_id?: string;
  cities: any;
  lastEvaluatedKey: any;
}

export class NewCity {
  success: boolean;
  comment_id?: string;
  city: any;
}

export class UpdateCity {
  success: boolean;
  comment_id?: string;
}

export class DeleteCity {
  success: boolean;
  comment_id?: string;
}

export class FetchHotels {
  success: boolean;
  comment_id?: string;
  hotels: any;
  lastEvaluatedKey: any;
}

export class NewHotel {
  success: boolean;
  comment_id?: string;
  hotel: any;
}

export class UpdateHotel {
  success: boolean;
  comment_id?: string;
  hotel: any;
}

export class DeleteHotel {
  success: boolean;
  comment_id?: string;
}

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) { }


  fetchCitiesFlow() {
    return this.http
      .post<FetchCities>('https://v29wjx6x0a.execute-api.eu-central-1.amazonaws.com/dev/navication-panel/fetch_cities', {})
      .pipe(retry(1))
      .pipe(
        tap((resData) => {
          if (resData && resData.success) {
            console.log(resData);
            // this.store.dispatch(new CitiesActions.FetchCities(resData.cities));
          }
        })
      );
  }

  createCity(newcity) {
    return this.http
      .post<NewCity>('https://su2xy28v9l.execute-api.eu-central-1.amazonaws.com/dev/navication_panel/add_city', newcity)
      .pipe(retry(1))
      .pipe(
        tap(data => {
          console.log(data);

          if (data.success) {
            // this.store.dispatch(new CitiesActions.AddCity(data.city));
          }
        })
      );
  }

  updateCity(city) {
    return this.http
      .post<UpdateCity>('https://m9jb7if7o3.execute-api.eu-central-1.amazonaws.com/dev/navication-panel/save-city', city)
      .pipe(retry(1))
      .pipe(
        tap(data => {
          console.log(data);

          if (data.success) {
            // this.store.dispatch(new CitiesActions.UpdateCity(city));
          }
        })
      );
  }

  deleteCity(city) {
    return this.http
      .post<DeleteCity>('https://m9jb7if7o3.execute-api.eu-central-1.amazonaws.com/dev/navication-panel/save-city', city.id)
      .pipe(retry(1))
      .pipe(
        tap(data => {
          console.log(data);

          if (data.success) {
            // this.store.dispatch(new CitiesActions.DeleteCity(city));
          }
        })
      );
  }


  //hotels
  fetchHotels() {
    return this.http.post<FetchHotels>('', {})
      .pipe(retry(1))
      .pipe(
        tap(data => {
          if (data.success) {
            console.log(data);
            // this.store.dispatch(new HotelsActions.FetchHotels(data.hotels));
          }
        })
      );
  }

  createHotel(newHotel) {
    return this.http
      .post<NewHotel>('', newHotel)
      .pipe(retry(1))
      .pipe(
        tap(data => {
          console.log(data);

          if (data.success) {
            // this.store.dispatch(new HotelsActions.AddHotel(newHotel));
          }
        })
      );
  }

  updateHotel(hotel) {
    return this.http
      .post<UpdateCity>('', hotel)
      .pipe(retry(1))
      .pipe(
        tap(data => {
          console.log(data);

          if (data.success) {
            // this.store.dispatch(new HotelsActions.UpdateHotel(hotel));
          }
        })
      );
  }

  deleteHotel(hotel) {
    return this.http
      .post<DeleteCity>('', hotel.id)
      .pipe(retry(1))
      .pipe(
        tap(data => {
          console.log(data);

          if (data.success) {
            // this.store.dispatch(new HotelsActions.UpdateHotel(hotel));
          }
        })
      );
  }
}
