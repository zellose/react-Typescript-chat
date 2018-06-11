import * as React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Location, History } from 'history';
import onClickOutside from 'react-onclickoutside';

import { userActions } from 'store/modules/user';
import { baseActions } from 'store/modules/base';

import { State } from 'store/modules/index';
import storage from 'lib/common/storage';

import { 
	UserMenu,
	UserMenuItems,
	Username
} from 'components/base/UserMenu';

interface MatchParams {
	name: string;
}

interface RouterProps extends RouteComponentProps<MatchParams> {

}

// from typings
export interface RouteComponentProps<P> {
	match: Match<P>;
	location: Location;
	history: History;
	staticContext?: any;
}

export interface Match<P> {
	params: P;
	isExact: boolean;
	path: string;
	url: string;
}

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type UserMenuContainerProps = StateProps & DispatchProps & RouterProps;

class UserMenuContainer extends React.Component<UserMenuContainerProps> {

	public handleClickOutside = (e: React.MouseEvent<HTMLDivElement>): void  => {
		const { BaseActions } = this.props;
		BaseActions.setUserMenuVisibility(false);
	}

	public handleLogout = async () => {
		const { BaseActions, UserActions, history } = this.props;

		try {
			await UserActions.logout();
			await UserActions.loggedSet(false);
			BaseActions.setUserMenuVisibility(!this.props.visible);
		} catch (e) {
			console.log(e);
		}

		storage.remove('loggedInfo');
		history.push('/');
	}

	public render() {
		const { handleLogout } = this;
		const { loggedInfo, visible } = this.props;
		const { displayname } = loggedInfo;

		if(!visible) return null;

		return (
			<UserMenu>
				<Username username={displayname}/>
				<UserMenuItems>나의 흐름</UserMenuItems>
				<UserMenuItems>설정</UserMenuItems>
				<UserMenuItems onClick={handleLogout}>로그아웃</UserMenuItems>
			</UserMenu>
		);
	}
}

const mapStateToProps = ({ user, base }: State) => ({
	loggedInfo: user.loggedInfo,
	visible: base.userMenu.visible
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	BaseActions: bindActionCreators(baseActions, dispatch),
	UserActions : bindActionCreators(userActions, dispatch)
});

export default connect(
	mapStateToProps,
	mapDispatchToProps 
)(withRouter(onClickOutside<any>(UserMenuContainer)));