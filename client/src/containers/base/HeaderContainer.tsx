import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { baseActions } from 'store/modules/base';
import { userActions } from 'store/modules/user';

import { State } from 'store/modules/index';
import { 
	Header, 
	LoginButton
} from 'components/base/Header';
import { storage } from 'lib/common';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type HeaderContainerProps = StateProps & DispatchProps;

class HeaderContainer extends React.Component<HeaderContainerProps> {

	handleLogout = async () => {
		const { UserActions } = this.props;
		try {
			await UserActions.logout();
			storage.remove('loggedInfo');
		} catch (e) {
			console.log(e);
		}
	}

	public render() {
		const { loggedInfo, logged } = this.props;
		console.log(logged);
		return (
			<Header>
				{
					logged ? (<div>{loggedInfo.displayname}</div>) : <LoginButton />
				}
			</Header>
		);
	}
}

const mapStateToProps = ({ base, user }: State) => ({
	visible: base.header.visible,
	loggedInfo: user.loggedInfo,
	logged: user.logged
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	BaseActions: bindActionCreators(baseActions, dispatch),
	UserActions: bindActionCreators(userActions, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps 
)(HeaderContainer);