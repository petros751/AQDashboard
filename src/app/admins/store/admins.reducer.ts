/* eslint-disable prefer-arrow/prefer-arrow-functions */
import * as AdminsActions from './admins.action';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';

export interface State {
  admins: any;
}

const initialState: State = {
  admins: null,
};

export function adminsReducer(
  state = initialState,
  action: AdminsActions.AdminsActions
) {
  switch (action.type) {
    case AdminsActions.FETCH_ADMINS:
      return {
        ...state,
        admins: action.payload,
      };
    case AdminsActions.CLEAR_ADMIN_USERS:
      return {
        ...state,
        admins: null,
      };
    case AdminsActions.DELETE_ADMIN:
      return {
        ...state,
        admins: state.admins.filter((user) => user.superadmin_id !== action.payload),
      };
    case AdminsActions.ADD_ADMIN:
      return {
        ...state,
        admins: [...state.admins, action.payload],
      };
    case AdminsActions.UPDATE_ADMIN:
      const index = _.findIndex(state.admins, (superadmin) => superadmin.superadmin_id === action.payload.superadmin_id);
      const updatedAdmin = {
        ...state.admins[index],
        ...action.payload,
      };

      const updatedAdmins = [...state.admins];
      updatedAdmins[index] = updatedAdmin;

      return {
        ...state,
        admins: updatedAdmins,
      };
    default:
      return state;
  }
}
