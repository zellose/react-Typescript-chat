import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { homeActions } from 'store/modules/home';

import { State } from 'store/modules/index';
import { 
	WritePost
} from 'components/home/WritePost';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type WritePostContainerProps = StateProps & DispatchProps;

class WritePostContainer extends React.Component<WritePostContainerProps> {

	handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		const { HomeActions } = this.props;
		const { value } = e.target;
		HomeActions.changeWritePostInput(value);
	}

	handlePost = () => {
		const { HomeActions } = this.props;
		HomeActions.changeWritePostInput('');
		console.log('posted!');
	}

	public render() {
		const { handleChange, handlePost } = this;
		const { value } = this.props;
		return (
			<WritePost
				value={value}
				onChange={handleChange}
				onPost={handlePost}
			/>
		);
	}
}

const mapStateToProps = ({ home }: State) => ({
	value: home.writePost.value
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	HomeActions: bindActionCreators(homeActions, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps 
)(WritePostContainer);