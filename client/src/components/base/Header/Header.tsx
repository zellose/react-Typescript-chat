import * as React from 'react';
import styled from 'styled-components';
import oc from 'open-color';
import { Link } from 'react-router-dom';

import { shadow, media } from 'style/styleUtils';

const Positioner = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0px;
    width: 100%;
    ${shadow(1)}
`;

// 흰 배경, 내용 중간 정렬
const WhiteBackground = styled.div`
    background: white;
    display: flex;
    justify-content: center;
    height: auto;
`;

// 해더의 내용
const HeaderContents = styled.div`
    width: 1200px;
    height: 53px;
    display: flex;
    flex-direction: row;
    align-items: center;

    padding-right: 1rem;
    padding-left: 1rem;
		@media ${media.laptopL} {
			width: 992px;
		}
    @media ${media.tablet} {
			width: 100%;
		}
`;

// 로고
const Logo = styled(Link)`
    font-size: 1.4rem;
    letter-spacing: -2px;
    color: ${oc.teal[7]};
		font-weight: 600;
    font-family: 'Rajdhani';
		cursor: pointer;
`;

// 중간 여백
const Spacer = styled.div`
    flex-grow: 1;
`;

// 하단 그래디언트 테두리
const GradientBorder = styled.div`
    height: 1px;
    background: linear-gradient(to right, ${oc.teal[6]}, ${oc.cyan[5]});
`;

interface HeaderProps {
	children: React.ReactChild;
}

const Header: React.SFC<HeaderProps> = ({ children }) => (
	<Positioner>
		<WhiteBackground>
			<HeaderContents>
				<Logo to='/'>HEURM</Logo>
				<Spacer/>
				{children}
			</HeaderContents>
		</WhiteBackground>
		<GradientBorder/>
	</Positioner>
);

export default Header;