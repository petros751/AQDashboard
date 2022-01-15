/* eslint-disable prefer-arrow/prefer-arrow-functions */
import * as WeatherActions from './weather.actions';
import * as _ from 'lodash';

export interface State {
  currentWeather: any;
}

const initialState: State = {
  currentWeather: null
};

export function weatherReducer(
  state = initialState,
  action: WeatherActions.WeatherActions
) {
  switch (action.type) {
    case WeatherActions.FETCH_CURRENT_WEATHER:
      return {
        ...state,
        currentWeather: action.payload
      };
    default:
      return state;
  }
}
