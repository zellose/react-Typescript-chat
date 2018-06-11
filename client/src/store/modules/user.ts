import { handleActions, createAction } from 'redux-actions';
import { applyPenders } from 'redux-pender';
import produce from 'immer';

import * as AuthAPI from 'lib/api/auth';

const SET_LOGGED_INFO = 'user/SET_LOGGED_INFO';
const CHECK_STATUS = 'user/CHECK_STATUS';
const LOGOUT = 'user/LOGOUT';
const VALIDATED = 'user/VALIDATED';
const LOGGED_SET = 'user/LOGGED_SET';

export const userActions = {
	setLoggedInfo: createAction<any, any>(SET_LOGGED_INFO, loggedInfo => loggedInfo),
	checkStatus: createAction<any>(CHECK_STATUS, AuthAPI.checkStatus),
	logout:	createAction<any>(LOGOUT, AuthAPI.logout),
	validated: createAction<boolean, boolean>(VALIDATED, value => value),
	loggedSet: createAction<boolean, boolean>(LOGGED_SET, value => value)
};

type SetLoggedInfoAction = ReturnType<typeof userActions.setLoggedInfo>;
type CheckStatusAction = ReturnType<typeof userActions.checkStatus>;
type LogoutAction = ReturnType<typeof userActions.logout>;
type ValidatedAction = ReturnType<typeof userActions.validated>;
type LoggedSetAction = ReturnType<typeof userActions.loggedSet>;

export interface UserState {
	loggedInfo: {
		displayname: string | null;
		thumbnail: string | null;
	};
	logged: boolean;
	validated: boolean;
}

const initialState: UserState = {
	loggedInfo: {
		displayname: null,
		thumbnail: null
	},
	logged: false,
	validated: false
};
const reducer = handleActions<UserState, any>({
	[SET_LOGGED_INFO]: (state, action: SetLoggedInfoAction) => {
		return produce (state, draft => {
			if(!action.payload) return;
			const { display_name, thumbnail } = action.payload;
			draft.loggedInfo.displayname = display_name;
			draft.loggedInfo.thumbnail = thumbnail;
		});
	},
	[VALIDATED]: (state, action: ValidatedAction) => {
		return produce (state, draft => {
			if(!action.payload) return;
			draft.validated = action.payload;
		});
	},
	[LOGGED_SET]: (state, action: LoggedSetAction) => {
		return produce (state, draft => {
			if(!action.payload) return;
			draft.logged = action.payload;
		});
	}
}, initialState);

export default applyPenders(reducer, [
	{
		type: CHECK_STATUS,
		onSuccess: (state: UserState, action: CheckStatusAction) => {
			return produce (state, draft => {
				if(!action.payload) return;
				draft.validated = action.payload;
			});
		}
	},
	{
		type: LOGOUT,
		onSuccess: (state: UserState, action: LogoutAction) => {
			return produce( state, draft => {
				if(!action.payload) return;
				draft.logged = false;
			});
		}
	}
]);