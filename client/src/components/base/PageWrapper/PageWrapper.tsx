import * as React from 'react';
import styled, { css } from 'styled-components';
import { media } from 'style/styleUtils';

interface StyledProps {
	responsive: any;
}

const Wrapper = styled.div`
	${(props: StyledProps) => {
		return css`
			margin-top: 58px;
			padding: 1rem;

			width: 1200px;
			margin-left: auto;
			margin-right: auto;

			@media ${media.laptopL} {
				width: 992px;
			}
			@media ${media.laptop} {
				width: 100%;
			}
		`;
	}}
`;

interface PageWrapperProps {
	responsive?: any;
	children: React.ReactNode;
}

const PageWrapper: React.SFC<PageWrapperProps> = ({ responsive, children }) => (
	<Wrapper responsive={responsive}>
		{children}
	</Wrapper>
);

export default PageWrapper;