import { Action } from '@ngrx/store';

export const FETCH_CURRENT_WEATHER = '[Weather] Fetch Current Weather';

export class FetchCurrentWeather implements Action {
  readonly type = FETCH_CURRENT_WEATHER;
  constructor(
    public payload: any
  ) {}
}


export type WeatherActions =
  | FetchCurrentWeather;
