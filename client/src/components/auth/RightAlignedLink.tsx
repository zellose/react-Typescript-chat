import * as React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';

const Aligner = styled.div`
	margin-top: 1rem;
	text-align: right;
`;

const StyledLink = styled(Link)`
	color: ${oc.gray[6]};
	&:hover {
			color: ${oc.gray[7]};
	}
`;

interface RightAlignedLinkProps {
	to: string;
	children: React.ReactNode;
}

const RightAlignedLink: React.SFC<RightAlignedLinkProps> = ({ to, children }) => (
	<Aligner>
		<StyledLink to={to}>{children}</StyledLink>
	</Aligner>
);

export default RightAlignedLink;