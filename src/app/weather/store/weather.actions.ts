import { Action } from '@ngrx/store';

export const FETCH_CUSTOMERS_STATISTICS = '[Customers] Fetch Statistics';
export const CLEAR_CUSTOMERS_STATS = '[Customers] Clear Stats from store';

export class FetchCustomersStatistics implements Action {
  readonly type = FETCH_CUSTOMERS_STATISTICS;
  constructor(
    public payload: Array<any>
  ) {}
}

export class ClearCustomersStats implements Action {
  readonly type = CLEAR_CUSTOMERS_STATS;
  constructor() {}
}

export type WeatherActions =
  | FetchCustomersStatistics
  | ClearCustomersStats;
