import styled from 'styled-components';
import { rgba } from 'polished';

export const Title = styled.h3`
	color: #fff;
	padding: 8px;
	margin: 0 px;
	margin-bottom: 6px;
	font-weight: 400;
	font-size: 1.5rem;
	letter-spacing: 1.5px;
`;

export const TitleContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export const GridContainer = styled.div`
	display: grid;
	grid-template-columns: ${props => `auto repeat(${props.numColumns}, 1fr)`};
	grid-template-rows: ${props => `auto repeat(${props.numRows}, 1fr)`};
	width: 100%;
	height: 100%;
	border: ${`1px solid ${rgba('white', 0.3)}`};
	overflow: auto;

	& > div {
		border: ${`1px solid ${rgba('white', 0.3)}`};
		border-right: none;
		border-bottom: none;
	}

	& > div.column_title {
		border-top: none;
	}
`;

export const TabContainer = styled.div`
	padding: 35px;
	padding-top: 6px;
	justify-content: center;
	align-item: center;
	display: flex;
	flex-direction: horizontal;

	h1 {
		color: ${p => p.theme.white};
		letter-spacing: 14px;
		margin-bottom: 15px;
		@media only screen and (max-width: 600px) {
			font-size: 1.2rem;
			margin-bottom: 10px;
		}
	}
	@media only screen and (max-width: 300px) {
		overflow: scroll;
		justify-content: left;
	}
`;

export const TabButton = styled.div`
	display: inline-block;
	font-size: 1em;
	@media only screen and (min-width: 750px) {
		font-size: 1.25em;
	}
	margin-right: 15px;
	margin-top: 15px;
	color: white;
	cursor: pointer;

	opacity: ${props => (props.isTabSelected ? '100%' : '30%')};
`;
