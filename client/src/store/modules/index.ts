/* tslint:disable */
import { combineReducers } from 'redux';
import { penderReducer as pender } from 'redux-pender';

import base, { BaseState } from './base';
import auth, { AuthState } from './auth';
import user, { UserState } from './user';

export default combineReducers({
	base,
	auth,
	user,
	pender
});

export interface State {
	base: BaseState;
	auth: AuthState;
	user: UserState;
}	