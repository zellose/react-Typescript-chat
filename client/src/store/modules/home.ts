import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';

const CHAGE_WRITE_POST_INPUT = 'home/CHANGE_WRITE_POST_INPUT';

export const homeActions = {
	changeWritePostInput: createAction<string, string>(CHAGE_WRITE_POST_INPUT, value => value)
};

type ChangeWritePostInputAction = ReturnType<typeof homeActions.changeWritePostInput>;

export interface HomeState {
	writePost: {
		value: string;
	};
}

const initialState: HomeState = {
	writePost: {
		value: ''
	}
};

const reducer = handleActions<HomeState, any>({
	[CHAGE_WRITE_POST_INPUT]: (state, action: ChangeWritePostInputAction) => {
		return produce (state, draft => {
			if(action.payload === undefined) return;
			draft.writePost.value = action.payload;
		});
	}
}, initialState);

export default reducer;