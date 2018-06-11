import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';

const SET_HEADER_VISIBILITY = 'base/SET_HEADER_VISIBILITY';
const SET_USER_MENU_VISIBILITY = 'base/SET_USER_MENU_VISIBILITY';

export const baseActions = {
	setHeaderVisibility: createAction<boolean, boolean>(SET_HEADER_VISIBILITY, visible => visible),
	setUserMenuVisibility: createAction(SET_USER_MENU_VISIBILITY)
};

type SetHeaderVisibilityAction = ReturnType<typeof baseActions.setHeaderVisibility>;
type SetUserMenuVisibilityAction = ReturnType<typeof baseActions.setUserMenuVisibility>;

export interface BaseState {
	header: {
		visible: boolean
	};
	userMenu: {
		visible: boolean;
	};
}

const initialState: BaseState = {
	header: {
		visible: true
	},
	userMenu: {
		visible: false
	}
};

const reducer = handleActions<BaseState, any>({
	[SET_HEADER_VISIBILITY]: (state, action: SetHeaderVisibilityAction) => {
		return produce(state, draft => {
			if(!action.payload) {
				return;
			}
			draft.header.visible = action.payload;
		});
	},
	[SET_USER_MENU_VISIBILITY]: (state, action: SetUserMenuVisibilityAction) => {
		return produce(state, draft => {
			draft.userMenu.visible = action.payload;
		});
	}
}, initialState);

export default reducer;