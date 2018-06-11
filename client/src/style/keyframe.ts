import { keyframes } from 'styled-components';

export const transitions = {
	shake: keyframes`
		0% {
			transfrom: tranlate(-50px);
		},
		25% {
			transfrom: tranlate(35px);
		},
		75% {
			transfrom: tranlate(20px);
		},
		100% {
			transfrom: tranlate(0px);
		}
	`
};