import styled from 'styled-components';
export const ProjectCard = styled.div`
	color: white;

	padding-top: 0px;
	font-weight: 350;
	font-size: 1.8rem;
	margin-bottom: 0px;
	padding: 14px;
	.outer {
		width: 20px;
		height: 20px;
		border-radius: 50%;
		position: relative;
		background-color: red;
		margin-left: 10px;
		margin-right: 10px;
		cursor: pointer;
		display: inline-block;
		opacity: 40%;
	}

	.outer:hover {
		opacity: 100%;
	}
`;
