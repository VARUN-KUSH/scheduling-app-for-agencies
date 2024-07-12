import { AllDataContext } from 'context/AllDataContext';
import useLongPress from 'hooks/useLongPress';
import { activityList } from 'initial-data';
import React, { useContext, useState } from 'react';
import { Work } from './WorkCardStyles';

const WorkCard = ({ work, isSelected, setTimer }) => {
	const color = () => {
		if (work.evening) {
			return '#06d4c2';
		} else {
			return '';
		}
	};
	const [localSelected, setLocalSelected] = useState(isSelected);
	const { globalState, setGlobalState } = useContext(AllDataContext);

	const onLongPress = () => {
		// console.log('longpress is triggered');
	};

	const onClick = async e => {
		if (!isSelected) {
			setTimer(t => (t = t + work.time));
		} else {
			setTimer(t => (t = t - work.time));
		}

		let newData = globalState;
		const newWorkList = newData.workList;
		const newWork = newWorkList.find(a => a.id === work.id);
		newWork.isSelected = !isSelected;
		newWork.eveningWork = work.evening || false;

		newData.workList = newWorkList;

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
		<Work key={work.id} isSelected={isSelected}>
			<span
				onClick={e => {
					onClick(e);
				}}
			>
				{work.time.toFixed(2)}
			</span>
			<p {...longPressEvent} style={{ color: color() }}>
				{work.content}
			</p>
		</Work>
	);
};

export default WorkCard;
