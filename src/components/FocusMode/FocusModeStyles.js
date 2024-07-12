import styled from 'styled-components';

export const Overlay = styled.div`
	position: fixed;
	inset: 0;
	background-color: rgba(0, 0, 0, 0.8);
	cursor: pointer;
`;

export const FocusModeContainer = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	width: 80vw;
	height: 80vh;
	background-color: ${p => p.theme.primary};
	display: flex;
	flex-direction: column;
`;

export const ProjectContainer = styled.div`
	flex: 1;
	padding: 40px;

	h6 {
		color: ${p => p.theme.white};
		font-weight: 700;
		font-size: 1.5rem;
		text-align: right;
	}
`;

export const Flex = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	h3,
	h4 {
		font-size: 2.25rem;
		letter-spacing: 2px;
		color: ${p => p.theme.white};
		font-weight: 700;
		text-transform: capitalize;
	}
	h4 {
		font-size: 1.5rem;
		letter-spacing: initial;
	}
`;

export const ButtonsContainer = styled.div`
	height: 100px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	gap: 1px;

	button {
		height: 100%;
		flex: 1;
		background-color: ${p => p.theme.primary_dark};
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 1.2rem;
		font-weight: 700;
		letter-spacing: 5px;
		cursor: pointer;
		text-transform: uppercase;
		border: none;
		color: ${p => p.theme.white};

		&:disabled {
			background-color: ${p => p.theme.white};
			color: ${p => p.theme.black};
		}
	}
`;

export const ActivityContainer = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	margin: 0;
	color: ${p => (p.isSelected ? p.theme.white : 'rgba(255, 255, 255, 0.5)')};
	font-size: 1.2rem;
	margin-bottom: 30px;
	cursor: pointer;

	span {
		margin-right: 20px;
		color: ${p => (p.isSelected ? p.theme.white : 'rgba(255, 255, 255, 0.5)')};
	}
`;
