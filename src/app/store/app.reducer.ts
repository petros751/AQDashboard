import { ActionReducerMap } from '@ngrx/store';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromAdmins from '../admins/store/admins.reducer';

export interface AppState {
    auth: fromAuth.State;
    admins: fromAdmins.State;
}

export const appReducer: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer,
    admins: fromAdmins.adminsReducer
};
