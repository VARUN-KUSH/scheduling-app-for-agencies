import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	position: fixed;
	z-index: 1000;
	width: 100%;
	justify-content: center;
	align-items: center;
	text-align: center;
	background-color: #373e1c;
	color: rgba(255, 255, 255, 0.5);
	font-size: 1.5rem;
	padding: 0.5em;
	text-transform: uppercase;
	letter-spacing: 2px;

	span {
		font-weight: bold;
		color: #fff;
	}
`;
