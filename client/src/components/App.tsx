import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { Route, Switch, withRouter, RouteComponentProps } from 'react-router-dom';

import { userActions } from 'store/modules/user';

import storage from 'lib/common/storage';
import { State } from 'store/modules/index';
import {
	Login,
	Register,
	Home
} from 'pages';

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
type AppProps = DispatchProps & RouterProps & StateProps;

class App extends React.Component<AppProps> {

	public initializeUserInfo = async () => {
		const loggedInfo = storage.get('loggedInfo');
		if(!loggedInfo) return;
		const { UserActions } = this.props;

		try {
			await UserActions.setLoggedInfo(loggedInfo);
			await UserActions.loggedSet(true);
		} catch (e) {
			UserActions.loggedSet(false);
			storage.remove('loggedInfo');
			window.location.href = '/auth/login?expired';
		}
	}

	componentDidMount() {
		const { initializeUserInfo } = this;
		initializeUserInfo();
	}

	public render() {
		return (
			<React.Fragment>
				<Switch>
					<Route exact={true} path='/' component={Home}/>
					<Route path='/auth/login' component={Login}/>
					<Route path='/auth/register' component={Register}/>
				</Switch>
			</React.Fragment>
		);
	}
}

const mapStateToProps = ({ }: State) => ({

});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	UserActions: bindActionCreators(userActions, dispatch)
});

export default withRouter(connect(
	mapStateToProps,
	mapDispatchToProps
)(App));
