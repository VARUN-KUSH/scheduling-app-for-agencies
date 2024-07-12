import React, { useState, useContext, useEffect } from 'react';
import styles from './BigDashboard.module.css';
import { TabList } from '../RapidEstimation/RapidEstimationStyles';
import { AllDataContext } from '../../context/AllDataContext';
import ActivityCardIn from '../RapidEstimation/Activitycard1';
import OtherActivities from '../RapidEstimation/OtherWorks/OtherActivities';

function TempCol({ selectedProject, setSelectedProject, setTopStatisticsCount }) {
	const { globalState, setGlobalState } = useContext(AllDataContext);

	const {
		tasks,
		activities,

		projectOrder,

		activityOrder
	} = globalState;

	let allProjects = projectOrder.map(projectID => {
		return {
			id: tasks[projectID].id,
			activityList: tasks[projectID].activityList,
			projectName: tasks[projectID].content,
			allActivityList: tasks[projectID].activityList,
			allPainPointsList: tasks[projectID].painPointsList,
			copyofproject: tasks[projectID]
		};
	});
	const times = {};
	Object.values(tasks).forEach(({ activityList }) => {
		for (var i = 0; i < activityList.length; i++) {
			const name = activities[activityList[i].id].content;
			const unitTime = activities[activityList[i].id].time;
			if (activityList[i].isSelected) {
				if (!times[name]) times[name] = 0;
				times[name] += unitTime;
			}
		}
	});
	// console.log(times);
	let allActivities = activityOrder.map(activityID => {
		const activity = activities[activityID];
		return { activityID: activityID, activityName: activity.content };
	});
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
	const [timer, setTimer] = useState(() => calculateTimer(activities, selectedProject));

	const [selectedProjectID, setSelectedProjectID] = useState(projectOrder[0]);
	const [projectType, setProjectType] = useState('A');
	const [selectAct, setselectAct] = useState(false);
	useEffect(() => {
		const project = tasks[selectedProjectID];
		setSelectedProject(project);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedProjectID, globalState.tasks, projectType, selectAct]);

	useEffect(() => {
		setTimer(t => (t = calculateTimer(activities, selectedProject)));
		setselectAct(false);
	}, [activities, selectedProject, selectAct]);

	useEffect(() => {
		if (selectedProject) {
			setGlobalState(old => {
				const newData = { ...old };

				if (newData.tasks[selectedProject.id].id === selectedProjectID) {
					newData.tasks[selectedProject.id].isCompleted = timer === 0;
				}
				localStorage.setItem('data', JSON.stringify(newData));
				return newData;
			});
		}
	}, [timer, selectedProjectID, selectedProject, setGlobalState, projectType, selectAct]);

	const displayActivities = [];

	allActivities.forEach(activity => {
		const list = [];
		let count = 0;
		allProjects.forEach(project => {
			project.allActivityList.forEach(activityList => {
				if (activityList.isSelected === true && activity.activityID === activityList.id) {
					count++;
				}
			});
		});
		if (count >= 1) {
			displayActivities.push(
				<div key={Math.floor(Math.random() * 100000) + 1}>
					<div
						style={{
							display: 'flex',
							width: '100%',
							gap: 20
						}}
					>
						<div className={styles.selectedActivity} />
						<div
							className={styles.projectHeading}
							style={{ color: '#14fa01', marginLeft: 14, width: '78%' }}
						>
							{activity.activityName}
						</div>
						<div
							style={{
								color: '#14fa01',
								width: '22%',
								background:"transparent"
							}}
						>
							{times[activity.activityName]}
						</div>
					</div>
					{allProjects.forEach(project => {
						project.allActivityList.forEach(activityList => {
							const individualActivity = activities[activity.activityID];
							if (activityList.isSelected === true && activity.activityID === activityList.id) {
								list.push(
									<div className={styles.eachProject} style={{ marginLeft: 38, marginTop: 10 }}>
										<ActivityCardIn
											key={individualActivity.id}
											task={project}
											activity={individualActivity}
											isSelected={activity.isSelected}
											setTimer={setTimer}
											setSelectedProject={setSelectedProject}
											setselectAct={setselectAct}
										/>
									</div>
								);
							}
						});
					})}
					{list}
				</div>
			);
		}
	});

	return (
		<React.Fragment>
			<TabList>
				{displayActivities}

				<OtherActivities
					globalState={globalState}
					setTimer={setTimer}
					setGlobalState={setGlobalState}
				/>
			</TabList>
		</React.Fragment>
	);
}

export default TempCol;
