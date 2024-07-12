import styled from 'styled-components';

export const TopContainer = styled.div`
	padding: 20px;
	padding-top: 60px;
	padding-bottom:0px !important;
	display: flex;
	justify-content: space-between;	
	align-items: center;

	h1 {
		color: ${p => p.theme.white};
		letter-spacing: 0.4em;
		font-size: 3rem;
		@media only screen and (max-width: 750px) {
			font-size: 2.5rem;}
		}
		
		.home-icon{
		color:#fff;
		font-size: 4rem;
		}
		.home-icon:hover{
		color:#969BA5;
		font-size: 4rem;
		
		}
		@media only screen and (max-width: 600px) {
			text-align: center;
			font-size: 2rem;
			letter-spacing: 0.7em;
		}
	}
`;

export const TeamworkContainer = styled.div`
	padding: 5px;
	padding-top: 60px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding-bottom: 0px !important;
	svg {
		margin-top: 20px;
		fill: grey;
		@media only screen and (max-width: 600px) {
			text-align: center;
			font-size: 2rem;
			letter-spacing: 0.7em;
		}
	}
	h1 {
		margin-top: 20px !important;
		text-align: center;
		color: ${p => p.theme.white};
		letter-spacing: 0.8em;
		font-size: 3rem;
		@media only screen and (max-width: 600px) {
			text-align: center;
			font-size: 2.25rem;
			letter-spacing: 0.8em;
		}
	}
`;
