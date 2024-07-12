import styled from 'styled-components';
export const Container = styled.div`
	background: transparent;
	display: flex !important;
	flex-direction: row;
	flex-wrap: wrap;
	max-height: 100px;
	min-width: 100px;
	// padding: 4px;
	grid-row: ${props => `${props.gridRow - 1} / span 1`};
	grid-column: ${props => `${props.gridCol - 1} / span 1`};
	position: relative;
`;

export const RowHeading = styled.div`
	color: white;
	margin: auto;
	textalign: center;
	background-color: rgb(0 0 0);
	width: fit-content;
	margin-top: -8px;
	padding-left: 10px;
	padding-right: 10px;
	padding-top: 0px;
	font-weight: 250;
	font-size: 1.3rem;
	margin-bottom: 0px;
`;
