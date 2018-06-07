/* tslint:disable */
import { combineReducers } from 'redux';
import { penderReducer as pender } from 'redux-pender';

import base, { BaseState } from './base';
import auth, { AuthState } from './auth';

export default combineReducers({
	base,
	auth,
	pender
});

export interface State {
	base: BaseState;
	auth: AuthState;
}	