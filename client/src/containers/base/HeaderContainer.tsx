import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { State } from 'store/modules/index';
import { baseActions } from 'store/modules/base';
import { 
	Header, 
	LoginButton
} from 'components/base/Header';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type HeaderContainerProps = StateProps & DispatchProps;

class HeaderContainer extends React.Component<HeaderContainerProps> {

	public render() {
		return (
			<Header>
				<LoginButton/>
			</Header>
		);
	}
}

const mapStateToProps = ({ base }: State) => ({
	visible: base.header.visible
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	BaseActions: bindActionCreators(baseActions, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps 
)(HeaderContainer);