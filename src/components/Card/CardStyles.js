import styled from 'styled-components';
import { rgba } from 'polished';

export const Container = styled.div`
	// border-radius: 5px !important;
	padding: 4px;
	margin: 3px;
	width: auto;
	height: auto;
	font-size: 1.25rem;
	font-weight: 400;
	color: ${props =>
		props.isCompleted
			? props.theme.primary_dark
			: props.isEveningTask
			? props.theme.secondary_dark
			: 'white'};
`;
