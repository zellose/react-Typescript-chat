import * as React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { transitions } from 'style/keyframe';

const Wrapper = styled.div`
	margin-top: 1rem;
	margin-bottom: 1rem;
	color: ${oc.red[7]};
	font-weight: 500;
	text-align: center;
	animation: ${transitions.shake} 10s ease-in;
	animation-fill-mode: forwards;
`;

interface AuthErrorProps {
	children: React.ReactNode;
}

const AuthError: React.SFC<AuthErrorProps> = ({ children }) => (
	<Wrapper>
		{children}
	</Wrapper>
);

export default AuthError;