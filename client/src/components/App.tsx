import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import {
	Login,
	Register,
	Home
} from 'pages';

class App extends React.Component {
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

export default App;
