import React, { useContext, useState, useEffect } from 'react';
import { AllDataContext } from 'context/AllDataContext';

export default function Color({ isSelected, project, setClicked }) {
	const { globalState, setGlobalState } = useContext(AllDataContext);
	const { tasks, activities, projectOrder, allPainPoints, activityOrder, painPointOrder } =
		globalState;
	const [color, setColor] = useState('White');
	const [expand, setExpand] = useState(isSelected);
	useEffect(() => {
		setExpand(isSelected);
	}, [isSelected]);
	const handleColor = (color, projectid) => {
		// console.log(color);
		// console.log(projectid);
		setClicked(() => {
			'wewe';
		});
		const oldStateOfEvening = tasks[projectid].needsColor;
		setGlobalState(old => {
			const newData = {
				...old,
				tasks: {
					...old.tasks,
					[projectid]: {
						...tasks[projectid],
						needsColor: color
					}
				}
			};
			localStorage.setItem('data', JSON.stringify(newData));

			return newData;
		});
	};
	//  console.log(project);
	console.log(isSelected);
	return (
		<>
			{expand && (
				<React.Fragment key={expand}>
					<div className={project.id} style={{ display: 'inline-block' }}>
						<div
							className='outer'
							style={{ backgroundColor: 'Red' }}
							onClick={() => {
								handleColor('Red', project.id);
							}}
						></div>
						<div
							className='outer'
							style={{ backgroundColor: 'Yellow' }}
							onClick={() => {
								handleColor('Yellow', project.id);
							}}
						></div>
						<div
							className='outer'
							style={{ backgroundColor: 'Green' }}
							onClick={() => {
								handleColor('green', project.id);
								setExpand(false);
							}}
						></div>
						<div
							className='outer'
							style={{ backgroundColor: 'grey' }}
							onClick={() => {
								handleColor('white', project.id);
							}}
						></div>
					</div>
				</React.Fragment>
			)}
		</>
	);
}
