import { AllDataContext } from 'context/AllDataContext';
import useLongPress from 'hooks/useLongPress';
import { activityList } from 'initial-data';
import React, { useContext, useState } from 'react';
import { Activity } from './ActivityCardStyles';

const ActivityCard = ({
	task,
	activity,
	isSelected,
	setTimer,
	setOpen,
	setEditActivity,
	setSelectedProject
}) => {
	const color = () => {
		if (activity.evening) {
			return '#06d4c2';
		} else {
			return '';
		}
	};
	const [localSelected, setLocalSelected] = useState(isSelected);
	const { globalState, setGlobalState } = useContext(AllDataContext);

	const onLongPress = () => {
		setEditActivity(activity);
		setOpen(true);
	};

	const onClick = async e => {
		if (!isSelected) {
			setTimer(t => (t = t + activity.time));
		} else {
			setTimer(t => (t = t - activity.time));
		}

		let newData = globalState;
		const newActivityList = JSON.parse(JSON.stringify(task.activityList));
		const newActivity = newActivityList.find(a => a.id === activity.id);
		newActivity.isSelected = !isSelected;
		newActivity.eveningActivity = activity.evening || false;
		var count = 0,
			count2 = 0;
		var onlyEveningActivity = false;
		{
			newActivityList.forEach(e => {
				if (e.isSelected === true && e.eveningActivity === false) {
					count++;
				} else if (e.isSelected === true && e.eveningActivity === true) {
					count2++;
				}
			});
		}

		if (count === 0 && count2 > 0) {
			onlyEveningActivity = true;
		} else {
			onlyEveningActivity = false;
		}

		setSelectedProject({ ...task, activityList: newActivityList });

		if (count + count2 === 0) {
			newData = {
				...newData,
				tasks: {
					...newData.tasks,
					[task.id]: {
						...task,
						activityList: newActivityList,
						isEveningTaskonly: onlyEveningActivity,
						isEveningTask: false
					}
				}
			};
		} else {
			newData = {
				...newData,
				tasks: {
					...newData.tasks,
					[task.id]: {
						...task,
						activityList: newActivityList,
						isEveningTaskonly: onlyEveningActivity
					}
				}
			};
		}

		setLocalSelected(prev => !prev);
		setGlobalState(newData);
		localStorage.setItem('data', JSON.stringify(newData));
	};

	const defaultOptions = {
		shouldPreventDefault: true,
		delay: 500
	};

	const longPressEvent = useLongPress(onLongPress, () => {}, defaultOptions);

	return (
		<Activity key={activity.id} isSelected={isSelected}>
			<span
				onClick={e => {
					onClick(e);
				}}
			>
				{activity.time.toFixed(2)}
			</span>
			<p {...longPressEvent} style={{ color: color() }}>
				{activity.content}
			</p>
		</Activity>
	);
};

export default ActivityCard;
