import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { ImHome } from 'react-icons/im';
import { Link, useLocation } from 'react-router-dom';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Typography,
	Checkbox,
	FormControlLabel
} from '@material-ui/core';
import PushToEvening from 'screens/RapidEstimation/PushToEvening';
import {
	BottomContainerparent,
	TabButton,
	TabList,
	BottomProjectType,
	ProjectTypeCard,
	BottomContainer,
	TopContainer,
	PainPointList,
	Container,
	Flex,
	CheckboxGroup,
	PainPointContainer,
	MiddleContainer,
	ProjectCard,
	Grid,
	Estimatecontainer
} from './RapidEstimationStyles';
import { pageTransitions } from 'animations';
import { AllDataContext } from 'context/AllDataContext';
import ActivityCard from 'components/ActivityCard/ActivityCard';
import ActivityCardIn from './Activitycard1';
import {
	activityList,
	painPointsList,
	categoriesForActivity,
	categoriesForOtherWorks
} from 'initial-data';
import CheckBox from 'components/CheckBox/CheckBox';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import TabComponent from 'components/TabComponent/TabComponent';
import OtherWorks from './OtherWorks/OtherWorks';
import OtherActivities from './OtherWorks/OtherActivities';

const pageVariants = {
	initial: {
		x: 0
	},
	in: {
		x: 0
	},
	out: {
		x: '100vw'
	}
};

const RapidEstimation = ({ props, isInverted, setSelectedProject, selectedProject, tabValues }) => {
	const initialPainPoint = {
		id: '',
		content: ''
	};
	const initialActivity = {
		id: '',
		content: '',
		time: 0
		// activity: ''
	};

	const initialWork = {
		id: '',
		content: '',
		time: 0
		// work: ''
	};

	const { globalState, setGlobalState } = useContext(AllDataContext);

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

	const categoryWiseProjectCount = {};
	projectOrder.forEach(projectID => {
		const category = tasks[projectID].category;
		if (!categoryWiseProjectCount[category]) {
			categoryWiseProjectCount[category] = 1;
		} else {
			categoryWiseProjectCount[category] += 1;
		}
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
	const [openEdit, setOpenEdit] = useState(false);
	const [addPainPointOpen, setAddPainPointOpen] = useState(false);

	// Activity states
	const [addActivityOpen, setAddActivityOpen] = useState(false);
	const [editActivity, setEditActivity] = useState(initialActivity);
	const [activity, setActivity] = useState(initialActivity);
	const [selectAct, setselectAct] = useState(false);

	const [newPainPoint, SetPainPoint] = useState(initialPainPoint);
	const [checked, setChecked] = useState(true);
	const [selectedProjectID, setSelectedProjectID] = useState(projectOrder[0]);
	const [projectType, setProjectType] = useState('A');
	const [timer, setTimer] = useState(() => calculateTimer(activities, selectedProject));
	const [categoryValue, setCategoryValue] = useState('');
	const [categoryID, setCategoryID] = useState('');
	const [tabValue, setTabValue] = useState(tabValues);
	const location = useLocation();

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

	let allPoints = painPointOrder.map(pointID => {
		const points = allPainPoints[pointID];
		return { pointID: pointID, pointName: points.content };
	});

	let allActivities = activityOrder.map(activityID => {
		const activity = activities[activityID];
		const activityName = activity.content ? activity.content : 'No Content';
		return {
			activityID,
			activityName
		};
	});

	useEffect(() => {
		const project = tasks[selectedProjectID];
		setSelectedProject(project);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedProjectID, globalState.tasks, projectType, selectAct]);

	useEffect(() => {
		setTimer(t => (t = calculateTimer(activities, selectedProject)));
		setselectAct(false);
		// console.log('timer');
	}, [activities, selectedProject, selectAct]);

	useEffect(() => {
		if (selectedProject) {
			setGlobalState(old => {
				const newData = { ...old };
				// if (newData.tasks[selectedProject.id].isCompleted) {
				// 	newData.tasks[selectedProject.id].isEveningTask = false;
				// }

				//console.log(newData.tasks[selectedProject.id].id);
				if (newData.tasks[selectedProject.id].id === selectedProjectID) {
					newData.tasks[selectedProject.id].isCompleted = timer === 0;
				}
				//	console.log(newData);
				localStorage.setItem('data', JSON.stringify(newData));
				return newData;
			});
		}
	}, [timer, selectedProjectID, selectedProject, setGlobalState, projectType, selectAct]);

	const handleChange = activity => {
		setChecked(activity.target.checked);
	};

	const handleClickOpen = () => {
		setAddPainPointOpen(true);
	};

	const handleAddPainPointClose = () => {
		setAddPainPointOpen(false);
	};
	const handleAddActivityClose = () => {
		setAddActivityOpen(false);
	};

	const handleCloseEdit = () => {
		setOpenEdit(false);
	};

	const addActivity = () => {
		const newActivity = {
			...activity,
			id: uuidv4(),
			time: parseFloat(activity.time),
			category: { id: categoryID, text: categoryValue }
		};

		const projectOrder = globalState?.projectOrder;
		projectOrder.forEach(projectID => {
			const project = tasks[projectID];
			project.activityList.push({ id: newActivity.id, isSelected: false });
		});

		setGlobalState(old => {
			old.activityOrder.push(newActivity.id);
			localStorage.setItem('data', JSON.stringify(old));
			return { ...old };
		});

		const newData = {
			...globalState,
			tasks: tasks,
			activities: { ...globalState.activities, [newActivity.id]: newActivity }
		};

		setActivity(initialActivity);
		handleAddActivityClose();
		setGlobalState(newData);
		localStorage.setItem('data', JSON.stringify(newData));
	};

	const addNewPainPoint = () => {
		// console.log('OLD GLOBAL STATE', globalState);
		const newPoint = {
			...newPainPoint,
			id: uuidv4()
		};
		const projectOrder = globalState?.projectOrder;
		projectOrder.forEach(projectID => {
			let project = tasks[projectID];
			let painPointList = [...project.painPointsList, { id: newPoint.id, isChecked: false }];
			project.painPointsList = painPointList;
			// project.painPointsList.push({});
			// console.log('ProjectsAFterLOOP', project.painPointsList);
		});
		setGlobalState(old => {
			old.painPointOrder.push(newPoint.id);
			localStorage.setItem('data', JSON.stringify(old));
			return { ...old };
		});
		const newData = {
			...globalState,
			tasks: tasks,
			allPainPoints: { ...globalState.allPainPoints, [newPoint.id]: newPoint }
		};

		SetPainPoint(initialPainPoint);
		handleAddPainPointClose();
		setGlobalState(newData);
		localStorage.setItem('data', JSON.stringify(newData));
		// console.log('NEW GLOBAL STATE', globalState);
	};

	const editActivityHandler = () => {
		const newActivity = {
			...editActivity,
			time: parseFloat(editActivity.time)
		};

		const newActivities = { ...activities };
		newActivities[editActivity.id] = newActivity;

		const newData = {
			...globalState,
			activities: { ...newActivities }
		};

		setEditActivity(initialActivity);
		handleCloseEdit();
		setGlobalState(newData);
		localStorage.setItem('data', JSON.stringify(newData));
		setTimer(() => calculateTimer(newActivities, selectedProject));
	};

	const deleteActivity = () => {
		if (!window.confirm('Are you sure you want to delete this activity?')) return;
		const projectOrder = globalState.projectOrder;

		projectOrder.forEach(projectID => {
			const project = tasks[projectID];
			const newActivityList = project.activityList.filter(({ id }) => id !== editActivity.id);
			project.activityList = newActivityList;
		});

		const newActivities = { ...activities };
		delete newActivities[editActivity.id];

		const newData = {
			...globalState,
			tasks: tasks,
			activities: { ...newActivities }
		};

		setEditActivity(initialActivity);
		handleCloseEdit();
		setGlobalState(newData);
		localStorage.setItem('data', JSON.stringify(newData));
		setTimer(() => calculateTimer(newActivities, selectedProject));
	};

	const openAddActivity = e => {
		setAddActivityOpen(true);
		setCategoryValue(e.target.value);
		setCategoryID(e.target.id);
	};

	return (
		<motion.div
			initial='initial'
			animate={isInverted ? 'inRight' : 'inLeft'}
			exit={isInverted ? 'outRight' : 'outLeft'}
			variants={pageVariants}
			transition={pageTransitions}
			style={{ width: '100%', height: '100%' }}
		>
			<Container>
				<Estimatecontainer>
					<h1 className='estimation'>ESTIMATES</h1>
					<div>
						<Link to='/' className='home-icon'>
							<svg
								width='30'
								height='30'
								viewBox='0 0 18 19'
								fill='none'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									d='M6.61994 16.4115V13.8558C6.61993 13.2082 7.14656 12.682 7.79886 12.6779H10.194C10.8492 12.6779 11.3804 13.2053 11.3804 13.8558V13.8558V16.4041C11.3804 16.9658 11.8368 17.4223 12.4026 17.4264H14.0367C14.7999 17.4284 15.5325 17.1288 16.0728 16.5937C16.6132 16.0586 16.9168 15.3321 16.9168 14.5744V7.31464C16.9168 6.70259 16.6436 6.12203 16.1707 5.72935L10.6193 1.32166C9.64892 0.550701 8.26297 0.575606 7.32132 1.38092L1.88934 5.72935C1.39411 6.11045 1.09812 6.69273 1.0835 7.31464V14.567C1.0835 16.1462 2.37298 17.4264 3.96364 17.4264H5.5604C5.83281 17.4284 6.09474 17.3223 6.28806 17.1318C6.48138 16.9412 6.5901 16.682 6.59009 16.4115H6.61994Z'
									stroke='white'
									strokeWidth='1.4'
								/>
							</svg>
						</Link>
					</div>
				</Estimatecontainer>
				<TabComponent
					active={tabValue}
					setActive={setTabValue}
					// tabList={['Activities', 'Growth', 'Projects', 'Back Office', 'Pain Points']}
					tabList={['Activities', 'Growth', 'Projects', 'Back Office']}
				/>

				{tabValue === 'Projects' && (
					<React.Fragment>
						<MiddleContainer>
							{selectedProject && (
								<>
									<Flex>
										<div className='headingIcon'>
											<Typography variant='h4' component='h4' style={{ color: '#fff' }}>
												{selectedProject.content}
											</Typography>
											<PushToEvening {...{ selectedProject }} />
										</div>
									</Flex>

									{/* <PainPointList>
										<PainPointContainer>
											<CheckboxGroup>
												{selectedProject.painPointsList !== undefined
													? selectedProject.painPointsList.map(({ id, isChecked }) => {
															const point = allPainPoints[id];
															if (isChecked === true) {
																return (
																	<CheckBox
																		key={point.id}
																		task={selectedProject}
																		point={point}
																		isChecked={isChecked}
																		setSelectedProject={setSelectedProject}
																	/>
																);
															}
													  })
													: null}
												{selectedProject.painPointsList !== undefined
													? selectedProject.painPointsList.map(({ id, isChecked }) => {
															const point = allPainPoints[id];
															if (isChecked === false) {
																return (
																	<CheckBox
																		key={point.id}
																		task={selectedProject}
																		point={point}
																		isChecked={isChecked}
																		setSelectedProject={setSelectedProject}
																	/>
																);
															}
													  })
													: null}
											</CheckboxGroup>
										</PainPointContainer>
										<button className='button' onClick={handleClickOpen}>
											+
										</button>
									</PainPointList> */}

									<Grid style={{ marginTop: '40px' }}>
										{categoriesForActivity.map(category => {
											return (
												<div key={category.id} style={{ marginBottom: '20px' }}>
													<div style={{ display: 'flex', alignItems: 'flex-start' }}>
														<p style={{ marginRight: '2em' }} className='heading'>
															{category.text}
														</p>
														<button
															className='button'
															id={category.id}
															value={category.text}
															onClick={e => {
																openAddActivity(e);
															}}
														>
															+
														</button>
													</div>
													{selectedProject.activityList.map(({ id, isSelected }) => {
														const activity = activities[id];
														return activity.category.id === category.id ? (
															<ActivityCard
																task={selectedProject}
																activity={activity}
																isSelected={isSelected}
																setTimer={setTimer}
																setOpen={setOpenEdit}
																setEditActivity={setEditActivity}
																key={activity.id}
																setSelectedProject={setSelectedProject}
															/>
														) : null;
													})}
												</div>
											);
										})}
									</Grid>
								</>
							)}
						</MiddleContainer>
						<BottomContainerparent>
							<TabComponent
								active={projectType}
								setActive={setProjectType}
								tabList={['Clients', 'Internal', 'Closed']}
								tabIds={['A', 'B', 'C']}
								counts={categoryWiseProjectCount}
							/>
							<BottomContainer key={selectAct}>
								{projectOrder.map(projectID => {
									const project = tasks[projectID];
									if (
										project.projectTypeList === projectType &&
										project.isCompleted === false &&
										project.isEveningTask === false &&
										project.isEveningTaskonly === false
									) {
										return (
											<ProjectCard
												key={project.id}
												isCompleted={project.isCompleted}
												isEveningTask={project.isEveningTask}
												isEveningTaskonly={project.isEveningTaskonly}
												isSelected={selectedProject?.id === project.id}
												isInfullswing={project.isInfullswing}
												onClick={() => {
													setSelectedProjectID(project.id);
												}}
											>
												{project.content.toUpperCase()}
											</ProjectCard>
										);
									}
								})}
								{projectOrder.map(projectID => {
									const project = tasks[projectID];
									if (
										project.projectTypeList === projectType &&
										project.isCompleted === false &&
										(project.isEveningTaskonly === true || project.isEveningTask === true)
									) {
										return (
											<ProjectCard
												key={project.id}
												isCompleted={project.isCompleted}
												isEveningTask={project.isEveningTask}
												isEveningTaskonly={project.isEveningTaskonly}
												isSelected={selectedProject?.id === project.id}
												isInfullswing={project.isInfullswing}
												onClick={() => {
													setSelectedProjectID(project.id);
												}}
											>
												{project.content.toUpperCase()}
											</ProjectCard>
										);
									}
								})}
								{projectOrder.map(projectID => {
									const project = tasks[projectID];
									if (
										project.projectTypeList === projectType &&
										project.isCompleted === true &&
										project.isInfullswing === false
									) {
										return (
											<ProjectCard
												key={project.id}
												isCompleted={project.isCompleted}
												isEveningTask={project.isEveningTask}
												isEveningTaskonly={project.isEveningTaskonly}
												isSelected={selectedProject?.id === project.id}
												isInfullswing={project.isInfullswing}
												onClick={() => {
													setSelectedProjectID(project.id);
												}}
											>
												{project.content.toUpperCase()}
											</ProjectCard>
										);
									}
								})}
								{projectOrder.map(projectID => {
									const project = tasks[projectID];
									if (
										project.projectTypeList === projectType &&
										project.isCompleted === true &&
										project.isInfullswing === true
									) {
										return (
											<ProjectCard
												key={project.id}
												isCompleted={project.isCompleted}
												isEveningTask={project.isEveningTask}
												isEveningTaskonly={project.isEveningTaskonly}
												isSelected={selectedProject?.id === project.id}
												isInfullswing={project.isInfullswing}
												onClick={() => {
													setSelectedProjectID(project.id);
												}}
											>
												{project.content.toUpperCase()}
											</ProjectCard>
										);
									}
								})}
							</BottomContainer>
						</BottomContainerparent>
					</React.Fragment>
				)}

				{tabValue === 'Activities' && (
					<React.Fragment>
						<TabList key={selectAct}>
							{allActivities.map(({ activityID, activityName }) => {
								// console.log(allActivities, allProjects);
								var count = 0;
								{
									allProjects.map(project => {
										project.allActivityList.map(({ id, isSelected }) => {
											if (isSelected === true && activityID === id) {
												count++;
											}
										});
									});
								}
								if (count >= 1) {
									return (
										<div>
											<h4>{activityName}</h4>
											{allProjects.map(project => {
												return project.allActivityList.map(({ id, isSelected }) => {
													const activity = activities[id];
													if (isSelected === true && activityID === id) {
														return (
															<ActivityCardIn
																task={project}
																activity={activity}
																isSelected={isSelected}
																setTimer={setTimer}
																setSelectedProject={setSelectedProject}
																setselectAct={setselectAct}
																key={activity.id}
															/>
														);
													}
												});
											})}
										</div>
									);
								}
							})}

							<OtherActivities
								globalState={globalState}
								setTimer={setTimer}
								setGlobalState={setGlobalState}
							/>
						</TabList>
					</React.Fragment>
				)}

				{/* {tabValue === 'Pain Points' && (
					<React.Fragment>
						<TabList>
							{allPoints.map(({ pointID, pointName }) => {
								var count1 = 0;
								{
									allProjects.map(project => {
										project.allPainPointsList.map(({ id, isChecked }) => {
											if (isChecked === true && pointID === id) {
												count1++;
											}
										});
									});
								}
								if (count1 >= 1) {
									return (
										<div>
											<h4>{pointName}</h4>
											{allProjects.map(project => {
												return project.allPainPointsList.map(({ id, isChecked }) => {
													if (isChecked === true && pointID === id) {
														return <p>{project.projectName}</p>;
													}
												});
											})}
										</div>
									);
								}
							})}
						</TabList>
					</React.Fragment>
				)} */}

				{tabValue === 'Growth' && (
					<React.Fragment>
						<MiddleContainer>
							<OtherWorks
								category='Growth'
								workList={workList}
								otherWorks={otherWorks}
								setTimer={setTimer}
							/>
						</MiddleContainer>
					</React.Fragment>
				)}

				{tabValue === 'Back Office' && (
					<React.Fragment>
						<MiddleContainer>
							<OtherWorks
								category='Back Office'
								workList={workList}
								otherWorks={otherWorks}
								setTimer={setTimer}
							/>
						</MiddleContainer>
					</React.Fragment>
				)}
			</Container>
			<Dialog
				open={addPainPointOpen}
				onClose={handleAddPainPointClose}
				aria-labelledby='form-dialog-title1'
			>
				<DialogTitle id='form-dialog-title1'>Add Pain Point</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin='dense'
						id='content'
						label='Content'
						type='text'
						value={newPainPoint.content}
						onChange={e => SetPainPoint({ ...newPainPoint, content: e.target.value })}
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleAddPainPointClose} color='primary'>
						Cancel
					</Button>
					<Button variant='contained' onClick={addNewPainPoint} color='primary'>
						Add
					</Button>
				</DialogActions>
			</Dialog>

			<Dialog open={openEdit} onClose={handleCloseEdit} aria-labelledby='form-dialog-title'>
				<DialogTitle id='form-dialog-title'>Edit Activity : {editActivity.content}</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin='dense'
						id='content'
						label='Content'
						type='text'
						value={editActivity.content}
						onChange={e => setEditActivity({ ...editActivity, content: e.target.value })}
						fullWidth
					/>
					<TextField
						margin='dense'
						id='name'
						label='Timer'
						type='number'
						value={editActivity.time}
						onChange={e => setEditActivity({ ...editActivity, time: e.target.value })}
						fullWidth
					/>
					<FormControlLabel
						control={
							<Checkbox
								margin='dense'
								id='name'
								label='Activity'
								//checked={setChecked(editActivity.evening)}
								inputProps={{ 'aria-label': 'primary checkbox' }}
								checked={editActivity.evening}
								//onChange={handleChange}
								value={editActivity.evening}
								onChange={e => setEditActivity({ ...editActivity, evening: e.target.checked })}
								fullWidth
							/>
						}
						label='Evening Hour'
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleCloseEdit} color='primary'>
						Cancel
					</Button>
					<Button variant='contained' onClick={deleteActivity} color='secondary'>
						Delete
					</Button>
					<Button variant='contained' onClick={editActivityHandler} color='primary'>
						Edit
					</Button>
				</DialogActions>
			</Dialog>

			<Dialog
				open={addActivityOpen}
				onClose={handleAddActivityClose}
				aria-labelledby='form-dialog-title'
			>
				<DialogTitle id='form-dialog-title'>Add Activity</DialogTitle>
				<DialogContent>
					<TextField
						autoFocus
						margin='dense'
						id='content'
						label='Content'
						type='text'
						value={activity.content}
						onChange={e => setActivity({ ...activity, content: e.target.value })}
						fullWidth
					/>
					<TextField
						margin='dense'
						id='category'
						label='Category Value'
						value={categoryValue}
						disabled
						fullWidth
					/>
					<TextField
						margin='dense'
						id='name'
						label='Timer'
						type='number'
						value={activity.time}
						onChange={e => setActivity({ ...activity, time: e.target.value })}
						fullWidth
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleAddActivityClose} color='primary'>
						Cancel
					</Button>
					<Button variant='contained' onClick={addActivity} color='primary'>
						Add
					</Button>
				</DialogActions>
			</Dialog>
		</motion.div>
	);
};

export default RapidEstimation;
