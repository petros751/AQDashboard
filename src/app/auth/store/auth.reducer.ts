// tslint:disable-next-line: import-spacing
import { User } from '../user.model';
import * as AuthActions from './auth.actions';

export interface State {
  user: any;
}

const initialState: State = {
  user: null
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch (action.type) {
    case AuthActions.LOGIN:
      const user = new User(
        action.payload.token,
        action.payload.expirationDate,
        action.payload.user,
        action.payload.stores,
        action.payload.socketConnected
      );
      return {
        ...state,
        user
      };
    case AuthActions.SOCKET_STATUS:
      const socketConnected = action.payload.socketConnected;
      if (state.user) {
        return {
          ...state,
          user: {
            ...state.user,
            socketConnected
          }
        };
      } else { //DO NOTHING THE USER IS ALREADY NULL
        return state;
      }
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null
      };
    case AuthActions.SET_REALTIME_STATS_FLAG:
      if (state.user) {
        const userUpdated = {...state.user.user, realTimeStats: action.payload}
        return {
          ...state,
          user: {
            ...state.user,
            user: userUpdated
          }
        };
      } else { 
        return state;
      }
    default:
      return state;
  }
}
