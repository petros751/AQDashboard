/* eslint-disable prefer-arrow/prefer-arrow-functions */
import * as WeatherActions from './weather.actions';
import * as _ from 'lodash';

export interface State {
  statistics: Array<any>;
}

const initialState: State = {
  statistics: null
};

export function weatherReducer(
  state = initialState,
  action: WeatherActions.WeatherActions
) {
  switch (action.type) {
    case WeatherActions.FETCH_CUSTOMERS_STATISTICS:
      return {
        ...state,
        statistics: action.payload
      };
    case WeatherActions.CLEAR_CUSTOMERS_STATS:
      return{
        ...state,
        statistics: null
      };
    default:
      return state;
  }
}
