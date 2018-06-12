import * as React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const MenuItem = styled.div`

	& + & {
			border-top: 1px solid ${oc.gray[3]};
	}

	padding-left: 1rem;
	padding-top: 0.5rem;
	padding-bottom: 0.5rem;
	color: ${oc.gray[7]};
	cursor: pointer;
	&:hover {
			background: ${oc.gray[0]};
			font-weight: 500;
			color: ${oc.cyan[6]};
	}
`;

interface UserMenuItemsProps {
	children: React.ReactNode;
	onClick?(): void;
}

const UserMenuItems: React.SFC<UserMenuItemsProps> = ({ children, onClick }) => (
	<MenuItem onClick={onClick}>
		{children}
	</MenuItem>
);

export default UserMenuItems;