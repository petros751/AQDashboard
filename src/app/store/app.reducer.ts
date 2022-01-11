import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromAdmins from '../admins/store/admins.reducer';
import * as fromWeather from '../weather/store/weather.reducer';

export interface AppState {
    auth: fromAuth.State;
    admins: fromAdmins.State;
    weather: fromWeather.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    admins: fromAdmins.adminsReducer,
    weather: fromWeather.weatherReducer,
};
