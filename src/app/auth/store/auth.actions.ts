import { Action } from '@ngrx/store';

export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';
export const AUTO_LOGIN = '[Auth] Auto Login'
export const SOCKET_STATUS = '[Auth] SOCKET STATUS CONNECTED'
export const SET_REALTIME_STATS_FLAG = "[Auth] Set real time stats flag";

export class Login implements Action {
  readonly type = LOGIN;

  constructor(
    public payload: {
      token: string;
      expirationDate: Date;
      user: any;
      stores: any;
      socketConnected: boolean;
    }
  ) {

  }
}
export class Logout implements Action {
  readonly type = LOGOUT;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export class SocketStatus implements Action {
  readonly type = SOCKET_STATUS;

  constructor(
    public payload: {
      socketConnected: boolean;
    }
  ) { }
}

export class SetRealTimeStatsFlag implements Action {
  readonly type = SET_REALTIME_STATS_FLAG;
  constructor(public payload: boolean ) {}
}

export type AuthActions =
  Login
  | Logout
  | AutoLogin
  | SocketStatus
  | SetRealTimeStatsFlag;
