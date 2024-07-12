import styled from 'styled-components';

export const TopContainer = styled.div`
	padding: 10px;
	padding-top: 60px;
	padding-bottom: 0px;
	display: flex;
	justify-content: space-between;
	align-item: center;
	h1 {
		color: ${p => p.theme.white};
		letter-spacing: 14px;
		margin-top: 15px;
		@media only screen and (max-width: 600px) {
			font-size: 2.2rem;
			margin-bottom: 10px;
		}
	}
	svg {
		margin-top: 20px;
		fill: grey;
		@media only screen and (max-width: 600px) {
			text-align: center;
			font-size: 2rem;
			letter-spacing: 0.7em;
		}
	}
`;

export const Container = styled.div`
	display: grid;
	h2,
	h3,
	h5 {
		color: ${p => p.theme.white};
	}
`;

export const TeamTabBottom = styled.div`
	grid-column: 1/2;
	width: 95%;
	margin-right: 3rem;
	justify-self: center;
	h3 {
		font-weight: 300;
		margin: 0px;
		font-size: 1rem;
	}
	table {
		color: ${p => p.theme.white};
		thead,
		tbody {
			border: none;
		}
		thead {
			border-bottom: 2.5625rem solid transparent;
			border-left: 1em solid transparent;
			border-right: 0.3em solid transparent;
		}
		th {
			font-weight: 300;
			font-size: 1.7rem;
		}
		td {
			padding-top: 0;
		}
		tbody tr {
			border-bottom: 0.6rem solid transparent;
			td {
				font-size: 1.4rem;
				&:first-child {
					display: flex;
					align-items: center;
					img {
						width: 3rem;
						height: 3rem;
						border-radius: 50%;
						margin-right: 1em;
					}
				}
				&:nth-child(2),
				&:nth-child(3) {
					text-align: center;
				}
			}
		}
	}
	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
`;
export const TeamTabTop = styled.div`
	min-width: 90%;
	margin: auto;
	justify-content: space-between;
	table {
		color: ${p => p.theme.white};
		margin-bottom: 20px;

		text-align: center;
		thead {
			border-bottom: 3em solid transparent;
		}
		th {
			font-size: 1.6rem;
			padding: 10px;
			padding-left: 5px;
			text-align: center;
		}
		td {
			text-align: center;
			font-size: 1.8rem;
			padding: 10px;
			padding-left: 5px;
		}
	}
`;
export const Projects = styled.div`
	grid-column: 1/2;
	justify-self: center;
	min-width: 80%;
	h2 {
		font-size: 2rem;
		margin-left: 0.5em;
	}
	table {
		color: ${p => p.theme.white};
		thead {
			border-bottom: 3em solid transparent;
			border-left: 0.5em solid transparent;
			border-right: 0.2em solid transparent;
		}
		th {
			font-weight: 300;
			font-size: 1.7rem;
		}
		tbody tr {
			border-bottom: 2em solid transparent;
			td {
				font-size: 1.6rem;
				&:first-child {
					display: flex;
					align-items: center;
				}
				&:nth-child(2),
				&:nth-child(3) {
					text-align: center;
				}
			}
		}
	}
	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
`;
export const ModalBody = styled.div`
	.modal_header {
		padding: 10px;
		border-bottom: 1px solid black;
	}
	.modal_body {
		padding: 20px;
		text-align: center;
		button {
			margin-top: 20px;
		}
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

export const TabContainer = styled.div`
	padding: 35px;
	padding-top: 0px;
	display: flex;
	align-item: center;
	h1 {
		color: ${p => p.theme.white};
		letter-spacing: 14px;
		margin-bottom: 15px;
		@media only screen and (max-width: 600px) {
			font-size: 1.2rem;
			margin-bottom: 10px;
		}
	}
`;
