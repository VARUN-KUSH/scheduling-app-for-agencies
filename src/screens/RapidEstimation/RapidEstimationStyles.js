import styled from 'styled-components';

export const Container = styled.div`
	width: 100%;
	min-height: 100vh;
	display: flex;
	flex-direction: column;
`;

export const Estimatecontainer = styled.div`
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

export const TopContainer = styled.div`
	padding: 0 2em;
	display: flex;
	flex-direction: column;
	.EstimateTabs {
		display: flex;
		button {
			border: none;
			outline: none;
			margin-right: 15px;
			background: inherit;
			color: white;
			font-size: 1.5rem;
			@media only screen and (max-width: 430px) {
				font-size: 1.5rem;
			}
		}
	}
	h1 {
		color: ${p => p.theme.white};
		letter-spacing: 0.8em;
		font-size: 3rem;
		@media only screen and (max-width: 750px) {
			font-size: 2.5rem;
		}
	}
`;

export const TabList = styled.div`
	font-family: inherit;
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(1fr, 1fr));
	grid-gap: 2em;
	div {
		h4 {
			color: white;
			letter-spacing: 1px;
			font-weight: bold;
		}
		p {
			color: white;
		}
	}
`;

export const TabButton = styled.div`
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

export const MiddleContainer = styled.div`
	flex: 1;
	padding: 20px;
`;
export const BottomContainerparent = styled.div`
	background-color: #181a1e;
	position: sticky;
	bottom: 0;
	z-index: 1;
`;

export const BottomProjectType = styled.div`
	background-color: #181a1e;
`;
export const ProjectTypeCard = styled.div`
	display: inline-block;
	padding: 2px;
	font-size: 1.7rem;
	margin: 0em 0.4em 0.8em 1em;
	color: ${props => (props.isItSelected ? 'white' : 'rgba(255,255,255,0.3)')};
`;

export const BottomContainer = styled.div`
	padding-left: 0em;
	padding-bottom: 0em;
	border-top: 1px solid white;
	white-space: nowrap;
	display: flex;
	overflow-x: auto;
	-ms-overflow-style: none;
	scrollbar-width: none;
	&::-webkit-scrollbar {
		display: none;
	}
`;
export const PainPointContainer = styled.div`
	padding-bottom: 1.75em;
	margin-left: -10px;
	@media only screen and (min-width: 768px) {
		margin-left: -25px;
	}
	@media only screen and (min-width: 1024px) {
		margin-left: -35px;
	}
	width: 90%;
	overflow-x: auto;
	overflow-y: hidden;
	white-space: nowrap;
	-ms-overflow-style: none;
	scrollbar-width: none;
	&::-webkit-scrollbar {
		display: none;
	}
`;

export const Flex = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	.headingIcon {
		display: flex;
	}

	h3 {
		color: ${p => p.theme.white};
	}
`;

export const PainPointList = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	.button {
		display: flex;
		position: static;
		align-items: center;
		justify-content: center;
		width: 20px;
		height: 20px;
		background-color: inherit;
		border: 1px solid #d70000;
		color: #d70000;
		font-size: 18px;
		font-weight: 100;
		border-radius: 3px;
		font-weight: 200;
	}
`;

export const CheckboxGroup = styled.div`
	margin-top: 25px;
	display: flex;
	align-items: center;
	position: relative;
	p {
		color: ${p => p.theme.white};
	}
`;
export const CategoryButton = styled.div`
	display: flex;
`;

export const ProjectCard = styled.div`
	display: inline-block;
	border: 2.6px solid;
	padding: 0.9em;
	padding-left: 2em;
	padding-right: 2em;
	font-size: 1.5rem;
	width: auto;
	height: fit-content;
	cursor: pointer;
	color: ${p => (p.isInfullswing && p.isCompleted ? 'black' : 'white')};
	background-color: ${props =>
		props.isCompleted && props.isInfullswing
			? 'yellow'
			: props.isCompleted
			? props.theme.primary_dark
			: props.isEveningTask
			? props.theme.secondary_dark
			: props.isEveningTaskonly
			? props.theme.secondary_dark
			: 'transparent'};
	border-color: ${props =>
		props.isCompleted && props.isInfullswing && props.isSelected
			? 'black'
			: props.isSelected
			? props.theme.white
			: 'transparent'};
`;

export const Grid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
	grid-gap: 2em;
	.button {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 18px;
		height: 18px;
		background-color: inherit;
		border: 1px solid white;
		color: white;
		font-size: 16px;
		font-weight: 100;
		border-radius: 3px;
	}

	p {
		color: ${p => p.theme.white};
		font-size: 1.8rem;

		white-space: nowrap;
		&.heading {
			margin-bottom: 1.5em;
			font-size: 1.4rem;
		}
	}
`;
