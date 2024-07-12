import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { AllDataContext } from 'context/AllDataContext';
import { pageTransitions, pageVariants } from 'animations';
import { ProjectCard } from './DriveStyles';
import Color from '../../components/Needs/Color';
const Needs = ({ setIsDragging, isInverted, setOpenFocusMode }) => {
	const { globalState, setGlobalState } = useContext(AllDataContext);
	const { tasks, activities, projectOrder, allPainPoints, activityOrder, painPointOrder } =
		globalState;
	const [color, setColor] = useState('White');
	const [showoptions, setShowOption] = useState(false);
	const [clicked, setClicked] = useState('');
	// console.log(projectOrder);
	return (
		<motion.div
			initial='initial'
			animate={isInverted ? 'inRight' : 'inLeft'}
			exit={isInverted ? 'outRight' : 'outLeft'}
			variants={pageVariants}
			transition={pageTransitions}
			style={{ width: '100%', height: '100%', color: 'red' }}
		>
			{['Red', 'Yellow', 'green', 'white'].map(pcolor => {
				// console.log(pcolor);
				return (
					<>
						{projectOrder.map(projectID => {
							const project = tasks[projectID];

							if (pcolor === project.needsColor) {
								return (
									<ProjectCard key={project.id} color={project.needsColor} className='green'>
										<div
											className='outer'
											style={{ backgroundColor: project.needsColor }}
											onClick={() => {
												if (clicked === project.id) {
													setClicked('');
												} else {
													setClicked(project.id);
												}
											}}
										></div>

										<Color
											isSelected={project.id === clicked}
											project={project}
											setClicked={setClicked}
										/>

										{project.content.toUpperCase()}
									</ProjectCard>
								);
							}
						})}
					</>
				);
			})}
		</motion.div>
	);
};

export default Needs;
