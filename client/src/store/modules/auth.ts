import { handleActions, createAction } from 'redux-actions';
import { applyPenders } from 'redux-pender';
import produce from 'immer';

import * as AuthAPI from 'lib/api/auth';

const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';
const CHECK_EMAIL_EXISTS = 'auth/CHECK_EMAIL_EXISTS';
const CHECK_USERNAME_EXISTS = 'auth/CHECK_USERNAME_EXISTS';
const LOCAL_REGISTER = 'auth/LOCAL_REGISTER';
const LOCAL_LOGIN = 'auth/LOCAL_LOGIN';
const LOGOUT = 'auth/LOGOUT';
const SET_ERROR = 'auth/ERROR';

interface Info {
	form: string;
	name: string;
	value: string;
}

interface Error {
	form: string;
	message: string | null;
}

export const authActions = {
	changeInput: createAction<Info, Info>(CHANGE_INPUT, ({ name, form, value }) => ({ name, form, value })),
	initialState: createAction(INITIALIZE_FORM),
	checkEmailExists: createAction<any, string>(CHECK_EMAIL_EXISTS, AuthAPI.checkEmailExists),
	checkDisplaynameExists: createAction<any, string>(CHECK_USERNAME_EXISTS, AuthAPI.checkUserExists),
	localRegister: createAction<any, any>(LOCAL_REGISTER, AuthAPI.localRegister),
	localLogin: createAction<any, any>(LOCAL_LOGIN, AuthAPI.localLogin),
	logout: createAction<any, Promise<any>>(LOGOUT, AuthAPI.logout),
	setError: createAction<Error, Error>(SET_ERROR, ({ form, message }) => ({ form, message }))
};

type ChangeInputAction = ReturnType<typeof authActions.changeInput>;
type CheckEmailExistsAction = ReturnType<typeof authActions.checkEmailExists>;
type CheckDisplaynameExistsAction = ReturnType<typeof authActions.checkDisplaynameExists>; 
type LocalLoginAction = ReturnType<typeof authActions.localLogin>;
type LocalRegisterAction = ReturnType<typeof authActions.localRegister>;
type LogoutAction = ReturnType<typeof authActions.logout>;
type SetErrorAction = ReturnType<typeof authActions.setError>;

export interface AuthState {
	register: {
		form: {
			email: string;
			displayname: string;
			password: string;
			passwordConfirm: string;
		};
		exists: {
			email: boolean;
			displayname: boolean;
		};
		error: string | null;
	};

	login: {
		form: {
			email: string;
			password: string;
		},
		error: string | null;
	};

	result: {};
}

const initialState: AuthState = {
	register: {
		form: {
			email: '',
			displayname: '',
			password: '',
			passwordConfirm: ''
		},
		exists: {
			email: false,
			displayname: false
		},
		error: null
	},
	login: {
		form: {
			email: '',
			password: ''
		},
		error: null
	},
	result: {}
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
	},
	[SET_ERROR]: (state, action: SetErrorAction) => {
		return produce (state, draft => {
			if(!action.payload) return;
			const { form, message } = action.payload;
			form === 'register' ? draft.register.error = message : draft.login.error = message;
		});
	}
}, initialState);

export default applyPenders(reducer, [
	{
		type: CHECK_EMAIL_EXISTS,
		onSuccess: (state: AuthState, action: CheckEmailExistsAction) => {
			return produce (state, draft => {
				if(!action.payload) return;
				const { data } = action.payload;
				draft.register.exists.email = data.exists;
			});
		}
	},
	{
		type: CHECK_USERNAME_EXISTS,
		onSuccess: (state: AuthState, action: CheckDisplaynameExistsAction) => {
			return produce (state, draft => {
				if(!action.payload) return;
				const { data } = action.payload;
				draft.register.exists.displayname = data.exists;
			});
		}
	},
	{
		type: LOCAL_LOGIN,
		onSuccess: (state: AuthState, action: LocalLoginAction) => {
			return produce (state, draft => {
				if(!action.payload) return;
				const { data } = action.payload;
				draft.result = data;
			});
		}
	},
	{
		type: LOCAL_REGISTER,
		onSuccess: (state: AuthState, action: LocalRegisterAction) => {
			return produce (state, draft => {
				if(!action.payload) return;
				const { data } = action.payload;
				draft.result = data;
			});
		}
	},
	{
		type: LOGOUT,
		onSuccess: (state: AuthState, action: LogoutAction) => {
			return produce (state, draft => {
				if(!action.payload) return;
				console.log(action.payload);
			});
		}
	}
]);