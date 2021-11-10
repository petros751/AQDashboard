import { Action } from '@ngrx/store';

export const FETCH_ADMINS = '[Admin users Flow] Fetch admin users Flow to store';

export class FetchAdmins implements Action {
    readonly type = FETCH_ADMINS;
    constructor(public payload: any) { }
}


export type AdminsActions =
    | FetchAdmins;
