import styled from 'styled-components';

export const Work = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding: 10px 0;
	margin-bottom: 5px;

	& * {
		cursor: pointer;
	}

	span {
		font-family: 'Roboto Mono', monospace;
		color: ${p => (p.isSelected ? '#fff' : 'rgba(255, 255, 255, 0.5)')};
		margin-right: 25px;
		position: relative;
		font-size: 1.8rem;

		&::after {
			content: '';
			position: absolute;
			top: -50%;
			left: -50%;
			width: 200%;
			height: 200%;
		}
	}

	p {
		font-size: 1.8rem;
		margin: 0;
		color: ${p => p.theme.white};
	}
`;
