import React from 'react';
import useLongPress from 'hooks/useLongPress';
import styles from '../../BigDashboard/BigDashboard.module.css';

const OtherActivity = ({ work, isSelected, globalState, setTimer, setGlobalState, workList }) => {
	const useBigDashboardTheme = window.location.pathname === '/';

	const defaultOptions = {
		shouldPreventDefault: true,
		delay: 500
	};

	const onLongPress = () => {
		setTimer(t => (t = t - work.time));

		let newData = globalState;
		const newWorkList = workList;
		const newWork = newWorkList.find(a => a.id === work.id);
		newWork.isSelected = !isSelected;
		newWork.eveningWork = work.evening || false;

		newData.workList = newWorkList;

		// setLocalSelected(prev => !prev);
		setGlobalState(newData);
		localStorage.setItem('data', JSON.stringify(newData));
	};

	const longPressEvent = useLongPress(onLongPress, () => {}, defaultOptions);

	return !useBigDashboardTheme ? (
		<p {...longPressEvent}>{work.content}</p>
	) : (
		<div className={styles.eachProject} style={{ marginLeft: 38, marginTop: 10 }}>
			<p {...longPressEvent}>{work.content}</p>
		</div>
	);
};

export default OtherActivity;
