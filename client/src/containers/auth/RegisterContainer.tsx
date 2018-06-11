import * as React from 'react';
import { connect } from 'react-redux';
import { Dispatch, bindActionCreators } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { debounce } from 'lodash';

import { authActions } from 'store/modules/auth';
import { userActions } from 'store/modules/user';

import { State } from 'store/modules/index';
import { storage } from 'lib/common';

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
type RegisterContainerProps = StateProps & DispatchProps & RouterProps;

class RegisterContainer extends React.Component<RegisterContainerProps> {

	public checkEmailExists = debounce(async (email: string) => {
		const { AuthActions } = this.props;
		try {
			await AuthActions.checkEmailExists(email);
			if(this.props.exists.email) {
				this.setError('이미 이메일이 존재합니다.');
			} else {
				this.setError(null);
			}
		} catch (e) {
			console.log(e);
		}
	}, 300);

	public checkDisplaynameExists = debounce(async(displayname: string) => {
		const { AuthActions } = this.props;
		try {
			await AuthActions.checkDisplaynameExists(displayname);
			if(this.props.exists.displayname) {
				this.setError('이미 아이디가 존재합니다.');
			} else {
				this.setError('');
			}
		} catch (e) {
			console.log(e);
		}
	}, 300);

	validate = {
		email: (value: string) => {
			const emailPattern = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i; 
			if(!emailPattern.test(value)) {
				this.setError('이메일을 정확하게 입력해주세요!');
				return false;
			}
			this.setError(null);
			return true;
		},
		displayname: (value: string) => {
			const displaynamePattern = /^[a-zA-Z0-9가-힣]{2,10}$/;

			if(value.length < 1) {
				this.setError('아이디를 입력해주세요');
				return false;
			}

			if(!displaynamePattern.test(value)) {
				this.setError('닉네임은 2~10자의 한글/영문/숫자가 허용됩니다.');
				return false;
			}
			this.setError(null);
			return true;
		},

		password: (value: string) => {
			const passwordPattern = /^[a-zA-Z0-9가-힣!@#$%^*+=-]{6,15}$/;
			if(value.length < 1) {
				this.setError('패스워드를 입력해주세요!');
				return false;
			}
			if(!passwordPattern.test(value)) {
				this.setError('패스워드는 6~15로 해주세요');
				return false;
			}
			this.setError(null);
			return true;
		},

		passwordConfirm: (value: string) => {
			const { password } = this.props.form;
			if( password !== value ) {
				this.setError('비밀번호가 일치하지 않습니다.');
				return false;
			}
			this.setError(null);
			return true;
		}
	};

	public setError = (message: string | null) => {
		const { AuthActions } = this.props;
		AuthActions.setError({ form: 'register', message });
		return false;
	}

	public handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { checkValidate } = this;
		const { AuthActions } = this.props;
		const { name, value } = e.target;

		AuthActions.changeInput({
			name,
			value,
			form: 'register'
		});

		const validate = this.validate[name](value);
		if(name.indexOf('password') > -1 ||!validate) return;
		
		checkValidate(name, value);
	}

	public checkValidate = (name: string, value: string) => {
		const { checkEmailExists, checkDisplaynameExists } = this;
		name === 'email' ? `${checkEmailExists(value)}` : `${checkDisplaynameExists(value)}`;
		return true;
	}

	public handleLocalRegister = async () => {
		const { form, AuthActions, error, UserActions, history } = this.props;
		const { email, displayname, password, passwordConfirm } = form;
		const { validate } = this;
		if(error) return;

		if(!validate.email(email)
		|| !validate.displayname(displayname)
		|| !validate.password(password)
		|| !validate.passwordConfirm(passwordConfirm)) {
			return;
		}

		try {
			await AuthActions.localRegister({
				email, 
				password, 
				display_name: displayname
			});

			const loggedInfo = this.props.result;
			storage.set('loggedInfo', loggedInfo);
			UserActions.setLoggedInfo(loggedInfo);
			UserActions.validated(true);
			await UserActions.loggedSet(true);
			history.push('/');
		} catch (e) {

			if(e.response.status === 409) {
				const { key } = e.response.data;
				const message = key === 'email' ? '이미 존재하는 이메일입니다.' : '이미 존재하는 아이디 입니다.';
				this.setError(message);
				return;
			}
			this.setError('알 수 없는 에러가 발생했습니다');
		}
	}

	public componentWillUnmount() {
		const { AuthActions } = this.props;
		AuthActions.initialState();
	}

	public render() {
		const { handleChange, handleLocalRegister } = this;
		const { error } = this.props;
		const { email, displayname, password, passwordConfirm } = this.props.form;
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
						name='displayname' 
						placeholder='아이디' 
						type='text'
						value={displayname}
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
					{
						error && <AuthError>{error}</AuthError>
					}
					<AuthButton handleClick={handleLocalRegister}>회원가입</AuthButton>
					<RightAlignedLink to='/auth/login'>로그인</RightAlignedLink>
				</AuthContent>
			</AuthWrapper>
		);
	}
}

const mapStateToProps = ({ auth }: State) => ({
	form: auth.register.form,
	exists: auth.register.exists,
	error: auth.register.error,
	result: auth.result
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
	AuthActions: bindActionCreators(authActions, dispatch),
	UserActions: bindActionCreators(userActions, dispatch)
});

export default connect(
	mapStateToProps, 
	mapDispatchToProps
)(withRouter<any>(RegisterContainer));
