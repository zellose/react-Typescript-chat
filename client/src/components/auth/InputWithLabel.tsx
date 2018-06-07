import * as React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Wrapper = styled.div`
    & + & {
        margin-top: 1rem;
    }
`;

const Label = styled.div`
    font-size: 1rem;
    color: ${oc.gray[6]};
    margin-bottom: 0.25rem;
`;

const Input = styled.input`
    width: 100%;
    border: 1px solid ${oc.gray[3]};
    outline: none;
    border-radius: 0px;
    line-height: 2.5rem;
    font-size: 1.2rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
		::placeholder {
			color: ${oc.gray[3]};
    }
`;

interface InputWithLabelProps {
	label: string;
	type: string;
	placeholder: string;
	name: string;
	value: string;
	onChange(e: React.ChangeEvent<HTMLInputElement>): void;
}

const InputWithLabel: React.SFC<InputWithLabelProps> = ({ label, onChange, value, ...rest }) => (
	<Wrapper>
		<Label>{label}</Label>
		<Input {...rest} onChange={onChange} value={value}/>
	</Wrapper>
);

export default InputWithLabel;