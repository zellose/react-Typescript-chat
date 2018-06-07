import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';

import { authActions } from 'store/modules/auth';
import { State } from 'store/modules/index';
import { 
	AuthContent, 
	AuthWrapper,
	InputWithLabel,
	AuthButton,
	RightAlignedLink
} from 'components/auth';

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type LoginContainerProps = StateProps & DispatchProps;

class LoginContainer extends React.Component<LoginContainerProps> {

	public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value, name } = e.target;
		const { AuthActions } = this.props;

		AuthActions.changeInput({
			name, 
			value,
			form: 'login'
		});
	}

	public componentWillUnmount() {
		const { AuthActions } = this.props;
		AuthActions.initialState();
	}

	public render() {
		const { handleChange } = this;
		const { email, password } = this.props.form;
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
					<AuthButton>로그인</AuthButton>
					<RightAlignedLink to='/auth/register'>회원가입</RightAlignedLink>
				</AuthContent>
			</AuthWrapper>
		);
	}
}

const mapStateToProps = ({ auth }: State) => ({
	form: auth.login.form
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	AuthActions: bindActionCreators(authActions, dispatch)
});

export default connect(
	mapStateToProps, 
	mapDispatchToProps
)(LoginContainer);
