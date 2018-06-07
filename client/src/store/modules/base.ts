import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';

const SET_HEADER_VISIBILITY = 'base/SET_HEADER_VISIBILITY';

export const baseActions = {
	setHeaderVisibility: createAction<boolean, boolean>(SET_HEADER_VISIBILITY, visible => visible)
};

type SetHeaderVisibilityAction = ReturnType<typeof baseActions.setHeaderVisibility>;

export interface BaseState {
	header: {
		visible: boolean
	};
}

const initialState: BaseState = {
	header: {
		visible: true
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
	}
}, initialState);

export default reducer;