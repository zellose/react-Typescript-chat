import * as React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Title = styled.div`
    font-size: 1.5rem;
    font-weight: 500;
    color: ${oc.gray[8]};
    margin-bottom: 1rem;
`;

interface AuthContentProps {
	title: string;
	children: React.ReactNode;
}

const AuthContent: React.SFC<AuthContentProps> = ({ title, children }) => (
	<React.Fragment>
		<Title>{title}</Title>
		{children}
	</React.Fragment>
);

export default AuthContent;