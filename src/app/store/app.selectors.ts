/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/naming-convention */
import { createSelector } from '@ngrx/store';
import * as fromAdmins from '../store/app.reducer';
import * as fromReviews from '../store/app.reducer';
import * as FromAuth from '../store/app.reducer';
import * as _ from 'lodash';

export const selectUser = (state: FromAuth.AppState) => state.auth;
export const selectAdmin = (state: fromAdmins.AppState) => state.admins;

export const getItemByAdminId = (superadmin_id) => createSelector(selectAdmin, item => _.cloneDeep(_.find(item.admins, editItem => editItem.superadmin_id === superadmin_id)) || {});

export const getActiveUser = () => createSelector(selectUser, item => _.cloneDeep(item) || {});

