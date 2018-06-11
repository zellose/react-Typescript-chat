import * as React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { shadow } from 'style/styleUtils';

const Wrapper = styled.div`
    margin-top: 1rem;
    padding-top: 0.6rem;
    padding-bottom: 0.5rem;

    background: ${oc.teal[6]};
    color: white;

    text-align: center;
    font-size: 1.25rem;
    font-weight: 500;

    cursor: pointer;
    user-select: none;
    transition: .2s all;

    &:hover {
        background: ${oc.teal[5]};
        ${shadow(0)}
    }

    &:active {
        background: ${oc.teal[7]};
    }
`;

interface AuthButtonProps {
	children: React.ReactNode;
	handleClick?: () => void;
}

const AuthButton: React.SFC<AuthButtonProps> = ({ children, handleClick }) => (
	<Wrapper onClick={handleClick}>
		{children}
	</Wrapper>
);

export default AuthButton;