import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { baseActions } from 'store/modules/base';
import { userActions } from 'store/modules/user';

import { State } from 'store/modules/index';
import { 
	Header, 
	LoginButton,
	UserThumbnail
} from 'components/base/Header';

import UserMenuContainer from './UserMenuContainer';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type HeaderContainerProps = StateProps & DispatchProps;

class HeaderContainer extends React.Component<HeaderContainerProps> {

	handleThumbnailClick = () => {
		const { BaseActions } = this.props;
		BaseActions.setUserMenuVisibility(true);
	}

	public render() {
		const { handleThumbnailClick } = this;
		const { loggedInfo, logged } = this.props;
		const { thumbnail } = loggedInfo;
		return (
			<Header>
				{
					logged ? (<UserThumbnail thumbnail={thumbnail} onClick={handleThumbnailClick}/>) : <LoginButton />
				}
				<UserMenuContainer/>
			</Header>
		);
	}
}

const mapStateToProps = ({ base, user }: State) => ({
	visible: base.header.visible,
	loggedInfo: user.loggedInfo,
	logged: user.logged,
	userVisible: base.userMenu.visible
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	BaseActions: bindActionCreators(baseActions, dispatch),
	UserActions: bindActionCreators(userActions, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps 
)(HeaderContainer);