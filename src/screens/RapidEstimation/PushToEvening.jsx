import React from 'react';
import { useContext } from 'react';
import { AllDataContext } from 'context/AllDataContext';
import { Icon } from './moonIconStyle';

export default function PushToEvening({ selectedProject }) {
	const { setGlobalState } = useContext(AllDataContext);
	const handlePush = () => {
		const oldStateOfEvening = selectedProject.isEveningTask;
		setGlobalState(old => {
			const newData = {
				...old,
				tasks: {
					...old.tasks,
					[selectedProject.id]: {
						...selectedProject,
						isEveningTask: !oldStateOfEvening
					}
				}
			};
			localStorage.setItem('data', JSON.stringify(newData));
			return newData;
		});
	};

	const handlePush2 = () => {
		const oldStateOfEvening = selectedProject.isInfullswing || false;
		setGlobalState(old => {
			const newData = {
				...old,
				tasks: {
					...old.tasks,
					[selectedProject.id]: {
						...selectedProject,
						isInfullswing: !oldStateOfEvening
					}
				}
			};
			localStorage.setItem('data', JSON.stringify(newData));
			return newData;
		});
	};

	return (
		<React.Fragment>
			{selectedProject?.isCompleted ? (
				<Icon>
					<img
						style={{ opacity: '30%', marginLeft: '20px' }}
						onClick={handlePush}
						alt='pushToEvening'
						src='EveningIcon.png'
					/>
				</Icon>
			) : selectedProject?.isEveningTask ? (
				<Icon>
					<img
						style={{ opacity: '100%', marginLeft: '20px' }}
						onClick={handlePush}
						alt='pushToEvening'
						src='EveningIcon.png'
					/>
				</Icon>
			) : (
				<Icon>
					<img
						style={{ opacity: '30%', marginLeft: '20px' }}
						onClick={handlePush}
						alt='pushToEvening'
						src='EveningIcon.png'
					/>
				</Icon>
			)}

			{selectedProject?.isInfullswing ? (
				<Icon>
					<img
						style={{ opacity: '100%', marginLeft: '20px', minHeight: '18px' }}
						onClick={handlePush2}
						alt='pushToFullSwing'
						src='thunder.png'
					/>
				</Icon>
			) : (
				<Icon>
					<img
						style={{ opacity: '40%', marginLeft: '20px', minHeight: '20px' }}
						onClick={handlePush2}
						alt='pushToFullSwing'
						src='thunder.png'
					/>
				</Icon>
			)}
		</React.Fragment>
	);
}
