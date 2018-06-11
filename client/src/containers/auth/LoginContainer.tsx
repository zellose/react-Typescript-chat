import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import * as queryString from 'query-string';
import { Location, History } from 'history';

import { authActions } from 'store/modules/auth';
import { userActions } from 'store/modules/user';

import storage from 'lib/common/storage';
import { State } from 'store/modules/index';

import { 
	AuthContent, 
	AuthWrapper,
	InputWithLabel,
	AuthButton,
	RightAlignedLink,
	AuthError
} from 'components/auth';

interface MatchParams {
	name: string;
}

interface RouterProps extends RouteComponentProps<MatchParams> {}

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
type LoginContainerProps = StateProps & DispatchProps & RouterProps;

class LoginContainer extends React.Component<LoginContainerProps> {

	handleLocalLogin = async () => {
		const { form, AuthActions, UserActions, history } = this.props;
		const { setError } = this;
		const { email, password } = form;

		try {
			await AuthActions.localLogin({ email, password });
			const loggedInfo = this.props.result;
			await UserActions.setLoggedInfo(loggedInfo);
			await UserActions.loggedSet(true);
			storage.set('loggedInfo', loggedInfo);
			history.push('/');
		} catch (e) {
			console.log(e);
			console.log(e.response.status);
			if(e.response.status === 403) {
				setError('계정정보가 잘못 되었습니다.');
				return;
			}
			setError('알 수 없는 에러가 발생했습니다.');
		}
	}

	public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		const { AuthActions } = this.props;

		AuthActions.changeInput({
			name, 
			value,
			form: 'login'
		});
	}

	public setError = (message: string | null) => {
		const { AuthActions } = this.props;
		AuthActions.setError({
			form: 'login',
			message
		});
		return false;
	}

	public componentWillUnmount() {
		const { AuthActions } = this.props;
		AuthActions.initialState();
	}

	public componentDidMount() {
		const { setError } = this;
		const { location } = this.props;
		const query = queryString.parse(location.search);
		if(query.expired !== undefined) {
			setError('세션이 만료되었습니다. 다시 로그인 해주세요');
		}
	}

	public render() {
		const { handleChange, handleLocalLogin } = this;
		const { form, error } = this.props;
		const { email, password } = form;
		return (
			<AuthWrapper>
				<AuthContent title='로그인'>
					<InputWithLabel 
						label='이메일' 
						name='email'
					  placeholder='이메일'
						type='string'
						value={email}
						onChange={handleChange}
					/>
					<InputWithLabel 
						label='비밀번호' 
						name='password' 
						placeholder='비밀번호'
						type='password'
						value={password}
						onChange={handleChange}
					/>
					{
						error && <AuthError>{error}</AuthError>
					}
					<AuthButton handleClick={handleLocalLogin}>로그인</AuthButton>
					<RightAlignedLink to='/auth/register'>회원가입</RightAlignedLink>
				</AuthContent>
			</AuthWrapper>
		);
	}
}

const mapStateToProps = ({ auth }: State) => ({
	form: auth.login.form,
	result: auth.result,
	error: auth.login.error
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	AuthActions: bindActionCreators(authActions, dispatch),
	UserActions: bindActionCreators(userActions, dispatch)
});

export default connect(
	mapStateToProps, 
	mapDispatchToProps
)(withRouter(LoginContainer));
