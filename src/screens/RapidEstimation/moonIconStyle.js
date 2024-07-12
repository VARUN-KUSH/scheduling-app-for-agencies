import styled from 'styled-components';

export const Icon = styled.div`
	display: flex;
	align-items: center;
	img {
		height: 15px;
	}

	@media only screen and (min-width: 600px) {
		align-items: center;
		img {
			height: 14px;
		}
	}
`;
