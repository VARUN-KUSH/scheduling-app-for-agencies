import React, { useState, useContext, useEffect, useCallback, useMemo } from 'react';
import styles from './BigDashboard.module.css';
import { AllDataContext } from '../../context/AllDataContext';
import ColorPalette from './ColorPalette';
import OutsideClickHandler from 'react-outside-click-handler';

var timer;
const ProjectsColumn = ({ setTopStatisticsCount }) => {
	const [selectedType, setSelectedType] = useState('Clients');
	const { globalState, setGlobalState } = useContext(AllDataContext);
	const [amount, setAmount] = useState({});
	const [showID, setShowID] = useState(null);
	const {
		tasks,
		activities,
		otherWorks,
		projectOrder,
		allPainPoints,
		activityOrder,
		painPointOrder,
		workList
	} = globalState;


	useEffect(() => {
		const interval = setTimeout(()=>{
			const amountStored = JSON.parse(localStorage.getItem('worthOrders'));
			if(!amountStored) return;
            setAmount(amountStored);
		},5000);

		return () => clearInterval(interval);
	   
	}, [localStorage.getItem('worthOrders')]);

	const changeTotal = useCallback(() => {
		if (!amount) return;
		if (!Object.keys(amount)?.length) return;
		var worthOrders = 0;
		Object.values(amount).forEach(([a, b]) => (worthOrders += a + b));
		setTopStatisticsCount(prev => ({ ...prev, worthOrders: '$' + worthOrders }));
	}, [amount]);

	useEffect(() => {
		changeTotal();
		localStorage.setItem('worthOrders', JSON.stringify(amount));
	}, [amount]);
	useEffect(() => {
		setShowID(null);
	}, [globalState]);

	const projects = {};
	Object.values(tasks).forEach(project => {
		if (!projects[project.category]) projects[project.category] = [];
		projects[project.category].push(project);
	});
	// const projects = {
	// 	client: [
	// 		{ name: 'eduwave', count: 45 },
	// 		{ name: 'eduwave', count: 45 },
	// 		{ name: 'eduwave', count: 45 },
	// 		{ name: 'eduwave', count: 45 }
	// 	],
	// 	internal: [
	// 		{ name: 'redwing', count: 56 },
	// 		{ name: 'redwing', count: 56 }
	// 	],
	// 	closed: [
	// 		{ name: 'folks creative', count: 5 },
	// 		{ name: 'folks creative', count: 89 },
	// 		{ name: 'folks creative', count: 10 }
	// 	],

	// };

	const fadeOutProject = array => {
		for (var i = 0; i < array.length; i++) if (array[i].isSelected) return false;

		return true;
	};

	return (
		<div className={styles.projectContainer}>
			{Object.keys(projects).sort((a,b)=>a.localeCompare(b)).map(projectType => {
				return (
					<div className={styles.projects}>
						{projectType === 'Clients' || projectType === 'Internal' || projectType === 'Closed' ? (
							<h1 className={styles.projectsHeading} onClick={() => setSelectedType(projectType)}>
								{projects[projectType].length} {projectType} Projects
							</h1>
						) : (
							<h1 className={styles.projectsHeading} onClick={() => setSelectedType(projectType)}>
								{projectType}
							</h1>
						)}
						{selectedType === projectType &&
							projects[projectType].map(({ id, content, count, needsColor, activityList }) => {
								return (
									<div
										className={styles.eachProject}
									>
										<div
											style={{
												display: 'flex',
												width: '50%',
												justifyContent: 'flex-start',
												alignItems: 'center',
												gap: 15,
												marginTop: 7,
												marginBottom: 7
											}}
										>
											{showID === id && projectType === 'Clients' ? (
												<OutsideClickHandler onOutsideClick={()=>{
													setShowID(null);
												}}>
													<ColorPalette
													setShowID={setShowID}
													project={{ id }}
													setGlobalState={setGlobalState}
													globalState={globalState}
													/>
												</OutsideClickHandler>
											) : (
												<div
													className={`${styles.rectangle} ${styles['rectangle' + needsColor]}`}
													style={{ cursor: projectType === 'Clients' ? 'pointer' : 'initial' }}
													onClick={() => setShowID(id)}
												></div>
											)}

											<div
												style={{ opacity: fadeOutProject(activityList) ? 0.3 : 1 }}
												className={styles.projectHeading}>{content}</div>
										</div>
										<div
											style={{
												display: 'flex',
												width: '30%',
												justifyContent: 'space-around',
												alignItems: 'center',
												opacity: fadeOutProject(activityList) ? 0.3 : 1
											}}
										>
											{projectType === 'Clients' && (
												<input
													style={{opacity:amount && amount[id] && amount[id][0] ? 1 :0}}
													type='number'
													min='0'
													className={styles.projectInputs}
													value={amount && amount[id] && amount[id][0] ? amount[id][0] : ''}
													onChange={e => {
														setAmount(prev => {
															const temp = { ...prev };
															if (!temp[id]) temp[id] = [Number(e.target.value), 0];
															temp[id][0] = Number(e.target.value);
															return temp;
														});
													}}
												/>
											)}
											{projectType === 'Clients' && (
												<input
												    style={{opacity:amount && amount[id] && amount[id][1] ? 1 :0}}
													type='number'
													min='0'
													className={styles.projectInputs}
													value={amount && amount[id] && amount[id][1] ? amount[id][1] : ''}
													onChange={e => {
														setAmount(prev => {
															const temp = { ...prev };
															if (!temp[id]) temp[id] = [0, Number(e.target.value)];
															temp[id][1] = Number(e.target.value);

															return temp;
														});
													}}
												/>
											)}
										</div>
									</div>
								);
							})}
					</div>
				);
			})}
		</div>
	);
};

export default ProjectsColumn;
