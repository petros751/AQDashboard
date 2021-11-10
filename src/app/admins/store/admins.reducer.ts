/* eslint-disable prefer-arrow/prefer-arrow-functions */
import * as AdminsActions from './admins.action';
import * as _ from 'lodash';

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
        default:
            return state;
    }
}
