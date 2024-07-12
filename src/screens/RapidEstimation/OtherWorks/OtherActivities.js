import React from 'react';
import useLongPress from 'hooks/useLongPress';
import { categoriesForOtherWorks } from '../../../initial-data';
import OtherActivity from './OtherActivity';
import styles from '../../BigDashboard/BigDashboard.module.css';
const OtherActivities = ({ globalState, setTimer, setGlobalState }) => {
	const { workList, otherWorks } = globalState;
	const useBigDashboardTheme = window.location.pathname === '/';
	const activities = categoriesForOtherWorks.map(cw => {
		let cnt = 0;
		workList.map(({ id, isSelected }) => {
			const work = otherWorks[id];
			if (work.category.text === cw.text && isSelected) {
				cnt++;
			}
		});
		return { category: cw, tasks: cnt };
	});
	// console.log(globalState);
	// console.log(activities);
	const times = {};
	workList.map(({ id, isSelected }) => {
		const work = otherWorks[id];
		const name = work.category.text;
		if (isSelected) {
			if (!times[name]) {
				times[name] = 0;
			}
			times[name] += work.time;
		}
	});
	return (
		<div>
			{activities.map(({ category, tasks }) => {
				if (tasks > 0) {
					return (
						<div style={{ marginBottom: 30 }}>
							{!useBigDashboardTheme ? (
								<h4>{category.text}</h4>
							) : (
								<div
									style={{
										display: 'flex',
										width: '100%',
										justifyContent: 'flex-start',
										alignItems: 'center',
										gap: 20
									}}
								>
									<div className={`${styles.selectedActivity}`} />
									<div
										className={styles.projectHeading}
										style={{ color: '#14fa01', marginLeft: 14, width: '78%' }}
									>
										{category.text}
									</div>
									<div
										style={{
											color: '#14fa01',
											width: '22%'
										}}
									>
										{times[category.text]}
									</div>
								</div>
							)}
							{workList.map(({ id, isSelected }) => {
								const work = otherWorks[id];
								// console.log(work);
								if (work.category.text === category.text && isSelected) {
									return (
										<OtherActivity
											work={work}
											isSelected={isSelected}
											globalState={globalState}
											setTimer={setTimer}
											setGlobalState={setGlobalState}
											workList={workList}
										/>
									);
								}
							})}
						</div>
					);
				}
			})}
		</div>
	);
};

export default OtherActivities;
