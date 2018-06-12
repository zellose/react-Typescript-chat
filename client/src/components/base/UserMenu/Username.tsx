import * as React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
    background: ${oc.gray[1]};
    border-bottom: 1px solid ${oc.gray[3]};
    padding-right: 1rem;
    padding-left: 1rem;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    color: ${oc.gray[9]};
    font-weight: 500;
    font-size: 0.9rem;
		user-select: none;
`;

interface UsernameProps {
	username: string | null;
}

const Username: React.SFC<UsernameProps> = ({ username }) => (
	<Wrapper>
		@{username}
	</Wrapper>
);

export default Username;