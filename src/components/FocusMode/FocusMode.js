import { AllDataContext } from 'context/AllDataContext';
import React, { useContext, useEffect, useState } from 'react';
import {
	Flex,
	FocusModeContainer,
	Overlay,
	ProjectContainer,
	ButtonsContainer,
	ActivityContainer
} from './FocusModeStyles';
import DoneIcon from '@material-ui/icons/Done';

const FocusMode = ({ open, setOpen }) => {
	const calculateTimer = (activities, selectedProject) => {
		if (!selectedProject) return 0;
		let t = 0;
		selectedProject.activityList.forEach(a => {
			const activity = activities[a.id];
			if (a.isSelected) {
				t += activity.time;
			}
		});
		return t;
	};

	const { globalState, setGlobalState } = useContext(AllDataContext);
	const { tasks, activities, projectOrder } = globalState;
	const [selectedProject, setSelectedProject] = useState(null);
	const [timer, setTimer] = useState(() => calculateTimer(activities, selectedProject));
	const [activeProject, setActiveProject] = useState(0);

	useEffect(() => {
		const project = tasks[projectOrder[activeProject]];
		setSelectedProject(project);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [activeProject]);

	useEffect(() => {
		setTimer(t => (t = calculateTimer(activities, selectedProject)));
	}, [globalState, activities, selectedProject]);

	const handleSnooze = () => {
		setActiveProject(old => {
			return (old + 1) % projectOrder.length;
		});
	};

	useEffect(() => {
		if (selectedProject) {
			setGlobalState(old => {
				const newData = { ...old };
				newData.tasks[selectedProject.id].isCompleted = timer === 0;
				localStorage.setItem('data', JSON.stringify(newData));
				return newData;
			});
		}
	}, [timer, selectedProject, setGlobalState]);

	const handleComplete = () => {
		// setGlobalState(old => {
		// 	const newData = {
		// 		...old,
		// 		tasks: {
		// 			...old.tasks,
		// 			[selectedProject.id]: { ...selectedProject, isCompleted: true }
		// 		}
		// 	};
		// 	localStorage.setItem('data', JSON.stringify(newData));
		// 	return newData;
		// });

		handleSnooze();
	};

	const onClickActivity = (activity, isSelected) => {
		const clonedActivityList = [...selectedProject.activityList];
		const currentActivity = clonedActivityList.find(val => val.id === activity.id);
		currentActivity.isSelected = !isSelected;

		setGlobalState(old => {
			const newData = {
				...old,
				tasks: {
					...old.tasks,
					[selectedProject.id]: { ...selectedProject, activityList: clonedActivityList }
				}
			};
			localStorage.setItem('data', JSON.stringify(newData));
			return newData;
		});
	};

	return open ? (
		<>
			<Overlay onClick={() => setOpen(false)} />
			<FocusModeContainer>
				{selectedProject && (
					<ProjectContainer>
						<Flex>
							<h3>{selectedProject.content}</h3>
							<h4>{timer} Hours</h4>
						</Flex>
						<div style={{ marginTop: '60px', height: '35vh', overflowY: 'auto' }}>
							{selectedProject.activityList.map(a => {
								const activity = activities[a.id];
								return a.isSelected ? (
									<ActivityContainer
										key={a.id}
										isSelected={a.isSelected}
										onClick={() => onClickActivity(activity, a.isSelected)}
									>
										<span>
											<DoneIcon />
										</span>
										{activity.content}
									</ActivityContainer>
								) : null;
							})}
						</div>
						<h6>{`${activeProject + 1} / ${projectOrder.length}`}</h6>
					</ProjectContainer>
				)}
				<ButtonsContainer>
					<button disabled={selectedProject.isCompleted} onClick={handleComplete}>
						done
					</button>
					<button onClick={handleSnooze}>Snooze</button>
				</ButtonsContainer>
			</FocusModeContainer>
		</>
	) : null;
};

export default FocusMode;
