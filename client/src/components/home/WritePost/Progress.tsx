import * as React from 'react';
import styled, { css } from 'styled-components';
import oc from 'open-color';

interface StyledProps {
	percentage: number;
}

const Wrapper = styled.div`
	${(props: StyledProps) => {
		return css`
			background: ${oc.cyan[4]};
			height: 4px;
			position: absolute;
			left: 0px;
			bottom: 0px;
			width: ${props.percentage + '%'};
			${props.percentage !== 0 && `transition: all 1s ease-in-out;`}
		`;
	}}
`;

interface State {
	percentage: number;
}

interface ProgressProps {
	value: string;
	onPost(): void;
}

class Progress extends React.Component<ProgressProps, State> {

	timeoutId:any = undefined;

	state: State = {
		percentage: 0
	};
	
	public handlePost = () => {
		const { onPost } = this.props;
		onPost();
	}

	// staticgetDerivedStateFromProps(nextProps: ProgressProps) {
	// 	clearTimeout(this.timeoutId);

	// 	this.setState({
	// 		percentage: 0
	// 	});

	// 	if(nextProps.value === '') {
	// 		return;
	// 	}

	// 	setTimeout(() => this.setState({ percentage: 100 }), 0);

	// 	this.timeoutId = setTimeout(this.handlePost, 1000);
	// }

	// componentDidMount() {
	// 	this.setState({
	// 		percentage: 100
	// 	});

	// 	setTimeout(() => {
	// 		console.log(`done`);
	// 	}, 1000);
	// }
	
	componentWillReceiveProps(nextProps: ProgressProps) {
		// props 가 변할 때마다

		clearTimeout(this.timeoutId); // 기존의 타임아웃을 중지시킵니다

		this.setState({
			percentage: 0
		});

		if(nextProps.value === '') {
				// 내용이 비어있으면
			return; // 여기서 작업을 중단합니다.
		}

		// 상태를 100 으로 변경합니다. 하나의 이벤트 루프에서 setState 가 두번 호출되면
		//  setState 를 한번에 하게 되므로 setTimeout 으로 감싸줍니다. 
		setTimeout(() => this.setState({
			percentage: 100
		}), 0);

		// 나중에 취소 할 수 있도록 this.timeoutId 에 setTimeout 의 결과를 담아줍니다
		this.timeoutId = setTimeout(this.handlePost, 1000);
	}
		
	render() {
		const { percentage } = this.state;
		return (
			<Wrapper percentage={percentage}/>
		);
	}
}

export default Progress;
