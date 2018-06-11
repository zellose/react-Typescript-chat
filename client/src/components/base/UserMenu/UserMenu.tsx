import * as React from 'react';
import styled from 'styled-components';

const Positioner = styled.div`
	position: absolute;
	right: -40px;
	top: 53px;
`;

const MenuWrapper = styled.div`
    background: white;
    min-width: 140px;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`;

interface UserMenuProps {
	children: React.ReactNode;
}

const UserMenu: React.SFC<UserMenuProps> = ({ children }) => (
	<Positioner>
		<MenuWrapper>
			{children}
		</MenuWrapper>
	</Positioner>
);

export default UserMenu;