import { AllDataContext } from 'context/AllDataContext';
import useLongPress from 'hooks/useLongPress';
import { activityList } from 'initial-data';
import React, { useContext, useState } from 'react';

const ActivityCard = ({
	task,
	activity,
	isSelected,
	setTimer,
	setOpen,
	setEditActivity,
	setSelectedProject,
	setselectAct
}) => {
	const [localSelected, setLocalSelected] = useState(isSelected);
	const { globalState, setGlobalState } = useContext(AllDataContext);

	const onLongPress = async e => {
		setTimer(t => (t = t - activity.time));

		let newData = globalState;
		const newActivityList = JSON.parse(JSON.stringify(task.allActivityList));
		const newActivity = newActivityList.find(a => a.id === activity.id);
		newActivity.isSelected = false;
		newActivity.eveningActivity = activity.evening || false;
		var count = 0,
			count2 = 0;

		var onlyEveningActivity = false;

		newActivityList.forEach(e => {
			if (e.isSelected === true && e.eveningActivity === false) {
				count++;
			} else if (e.isSelected === true && e.eveningActivity === true) {
				count2++;
			}
		});

		if (count === 0 && count2 > 0) {
			onlyEveningActivity = true;
		} else {
			onlyEveningActivity = false;
		}
		setselectAct(true);
		//	setSelectedProject({ ...task, activityList: newActivityList });
		// console.log(task);
		const copyofproject = task.copyofproject;
		if (count + count2 === 0) {
			newData = {
				...newData,
				tasks: {
					...newData.tasks,
					[task.id]: {
						...copyofproject,
						activityList: newActivityList,
						isEveningTaskonly: onlyEveningActivity,
						isEveningTask: false,
						isCompleted: true
					}
				}
			};
		} else {
			newData = {
				...newData,
				tasks: {
					...newData.tasks,
					[task.id]: {
						...copyofproject,
						activityList: newActivityList,
						isEveningTaskonly: onlyEveningActivity
					}
				}
			};
		}

		setLocalSelected(prev => !prev);
		setGlobalState(newData);
		localStorage.setItem('data', JSON.stringify(newData));

		// console.log(newData);
	};

	const defaultOptions = {
		shouldPreventDefault: true,
		delay: 500
	};

	const longPressEvent = useLongPress(onLongPress, () => {}, defaultOptions);

	const isEveTask = task.copyofproject.isEveningTask;

	return (
		<p
			style={{
				maxWidth: 'fit-content',
				color: `${isEveTask ? '#307383' : 'white'}`,
				fontWeight: `${isEveTask ? 'bold' : 'normal'}`
			}}
			{...longPressEvent}
		>
			{task.projectName}
		</p>
	);
};

export default ActivityCard;
