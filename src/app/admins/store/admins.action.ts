import { Action } from '@ngrx/store';
import { Admin } from '../admin.model';

export const FETCH_ADMINS = '[Admins Flow] Fetch Admins Flow to store';
export const CLEAR_ADMIN_USERS = '[Admin] Clear admin users';
export const DELETE_ADMIN = '[Admin] Delete Admin';
export const ADD_ADMIN = '[Admin] Add Admin';
export const UPDATE_ADMIN = '[Admin] Update Admin';

export class FetchAdmins implements Action {
  readonly type = FETCH_ADMINS;
  constructor(public payload: Admin[]) {}
}

export class ClearAdminUsers implements Action {
  readonly type = CLEAR_ADMIN_USERS;
  constructor() {}
}

export class DeleteAdmin implements Action {
  readonly type = DELETE_ADMIN;
  constructor(
    public payload: string
    ) {}
}

export class AddAdmin implements Action {
  readonly type = ADD_ADMIN;
  constructor(
    public payload: Admin
    ) {}
}

export class UpdateAdmin implements Action {
  readonly type = UPDATE_ADMIN;
  constructor(
    public payload: Admin
  ) {}
}

export type AdminsActions =
  | FetchAdmins
  | ClearAdminUsers
  | DeleteAdmin
  | AddAdmin
  | UpdateAdmin;
