import { handleActions, createAction } from 'redux-actions';
import { applyPenders } from 'redux-pender';
import produce from 'immer';

import * as AuthAPI from 'lib/api/auth';

const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
const CHECK_EMAIL_EXISTS = 'auth/CHECK_EMAIL_EXISTS';
const CHECK_USERNAME_EXISTS = 'auth/CHECK_USERNAME_EXISTS';

interface Info {
	form: string;
	name: string;
	value: string;
}

export const authActions = {
	changeInput: createAction<Info, Info>(CHANGE_INPUT, ({ name, form, value }) => ({ name, form, value })),
	initialState: createAction(INITIALIZE_FORM),
	checkEmailExists: createAction<string, Promise<any>>(CHECK_EMAIL_EXISTS, value => value, AuthAPI.checkEmailExists),
	checkUsernameExists: createAction<string, Promise<any>>(CHECK_USERNAME_EXISTS, value => value, AuthAPI.checkUserExists)
};

type ChangeInputAction = ReturnType<typeof authActions.changeInput>;
type CheckEmailExistsAction = ReturnType<typeof authActions.checkEmailExists>;
type CheckUsernameExistsAction = ReturnType<typeof authActions.checkUsernameExists>; 

export interface AuthState {
	register: {
		form: {
			email: string;
			username: string;
			password: string;
			passwordConfirm: string;
		}
	};

	login: {
		form: {
			email: string;
			password: string;
		}
	};

	exists: {
		email: boolean;
		username: boolean;
	};
}

const initialState: AuthState = {
	register: {
		form: {
			email: '',
			username: '',
			password: '',
			passwordConfirm: ''
		}
	},
	login: {
		form: {
			email: '',
			password: ''
		}
	},
	exists: {
		email: false,
		username: false
	}
};

const reducer = handleActions<AuthState, any>({
	[INITIALIZE_FORM]: () => {
		return initialState;
	},
	[CHANGE_INPUT]: (state, action: ChangeInputAction) => {
		return produce (state, draft => {
			if(!action.payload) return;
			const { form, name, value } = action.payload;
			form === 'register' ? draft.register.form[name] = value : draft.login.form[name] = value;
		});
	}
}, initialState);

export default applyPenders(reducer, [
	{
		type: CHECK_EMAIL_EXISTS,
		onSuccess: (state: AuthState, action: CheckEmailExistsAction) => {
			return produce (state, draft => {
				if(!action.payload) return;
				console.log(action.payload);
			});
		}
	},
	{
		type: CHECK_USERNAME_EXISTS,
		onSuccess: (state: AuthState, action: CheckUsernameExistsAction) => {
			return produce (state, draft => {
				if(!action.payload) return;
				console.log(action.payload);
			});
		}
	}
]);