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
type RegisterContainerProps = StateProps & DispatchProps;

class RegisterContainer extends React.Component<RegisterContainerProps> {

	public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { AuthActions } = this.props;
		const { name, value } = e.target;

		AuthActions.changeInput({
			name,
			value,
			form: 'register'
		});
	}

	public componentWillUnmount() {
		const { AuthActions } = this.props;
		AuthActions.initialState();
	}

	public render() {
		const { handleChange } = this;
		const { email, username, password, passwordConfirm } = this.props.form;
		return (
			<AuthWrapper>
				<AuthContent title='로그인'>
					<InputWithLabel 
						label='이메일' 
						name='email' 
						placeholder='이메일' 
						type='text'
						value={email}
						onChange={handleChange}
					/>
					<InputWithLabel 
						label='아이디' 
						name='username' 
						placeholder='아이디' 
						type='text'
						value={username}
						onChange={handleChange}
					/>
					<InputWithLabel 
						label="비밀번호" 
						name="password" 
						placeholder="비밀번호" 
						type="password"
						value={password}
						onChange={handleChange}
					/>
					<InputWithLabel 
						label="비밀번호 확인" 
						name="passwordConfirm" 
						placeholder="비밀번호 확인" 
						type="password"
						value={passwordConfirm}
						onChange={handleChange}
					/>
					<AuthButton>회원가입</AuthButton>
					<RightAlignedLink to='/auth/login'>로그인</RightAlignedLink>
				</AuthContent>
			</AuthWrapper>
		);
	}
}

const mapStateToProps = ({ auth }: State) => ({
	form: auth.register.form
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	AuthActions: bindActionCreators(authActions, dispatch)
});

export default connect(
	mapStateToProps, 
	mapDispatchToProps
)(RegisterContainer);
