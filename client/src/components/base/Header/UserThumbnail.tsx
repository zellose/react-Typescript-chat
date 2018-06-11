import * as React from 'react';
import styled, { css } from "styled-components";
import oc from 'open-color';

interface StyledProps {
	image: string | null;
}

const Wrapper = styled.div`
	${(props: StyledProps) => {
		return css`
			width: 40px;
			height: 40px;
			border-radius: 50%;
			cursor: pointer;

			background: ${oc.cyan[5]};
			background-image: url(${props.image});
			background-size: cover;
			background-position: center;
			background-repeat: no-repeat;
			&:hover {
					filter: brightness(105%);
			}
		`;
	}}
`;

interface UserThumbnailProps {
	thumbnail: string | null;
	onClick(): void;
}

const UserThumbnail: React.SFC<UserThumbnailProps> = ({ onClick, thumbnail }) => (
	<Wrapper image={thumbnail} onClick={onClick}/>
);

export default UserThumbnail;