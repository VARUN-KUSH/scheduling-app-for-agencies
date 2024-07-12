import styled from 'styled-components';

export const TopContainer = styled.div`
	margin: 20px;
	display: flex;
	flex-direction: column;
	h1 {
		color: ${p => p.theme.white};
		letter-spacing: 0.8em;
		font-size: 3rem;
		@media only screen and (max-width: 750px) {
			font-size: 2.5rem;
		}
	}
	.row {
		margin: 0 !important;
	}
`;

export const TabList = styled.div`
	font-family: inherit;
	display: flex;
	overflow-x: scroll;
    padding-right: -26px;
	h4 {
		color: white;
		letter-spacing: 1px;
		font-weight: bold;
	}
	p {  
		color: white;
	}
	::-webkit-scrollbar {
		display: none;
	}
}
`;

export const TabButton = styled.div`
	font-size: 1em;
	@media only screen and (min-width: 750px) {
		font-size: 1.25em;
	}
	color: white;
	cursor: pointer;
	opacity: ${props => (props.isTabSelected ? '100%' : '30%')};
	padding-right: 20px;
	white-space: nowrap;
`;
