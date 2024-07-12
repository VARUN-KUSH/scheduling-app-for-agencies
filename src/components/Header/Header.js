import React, { useContext, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import NewProject from 'screens/Kanban/NewProject';
import { categoriesForActivity } from 'initial-data';
import { AllDataContext } from 'context/AllDataContext';
import { TeamworkContainer, TopContainer } from './style';
import { Link } from 'react-router-dom';
import {
	Button,
	Dialog,
	DialogTitle,
	DialogContent,
	TextField,
	FormControl,
	Select,
	DialogActions,
	MenuItem,
	InputLabel,
	Checkbox,
	FormControlLabel
} from '@material-ui/core';

function Header({ setOpenFocusMode, selectedProject }) {
	const initialActivity = {
		id: '',
		content: '',
		time: 0,
		evening: false
	};
	const { globalState, setGlobalState } = useContext(AllDataContext);
	const { tasks } = globalState;
	const [group, setGroup] = React.useState('');
	const [activity, setActivity] = useState(initialActivity);
	const [open, setOpen] = useState(false);
	// const [checked, setChecked] = useState(true);

	// const handleChangeE = (activity) => {
	// 	setChecked(activity.target.checked);
	// }

	// const handleClickOpen = () => {
	// 	setOpen(true);
	// };

	const handleClose = () => {
		setOpen(false);
	};

	const handleChange = event => {
		setGroup(event.target.value);
	};

	const addActivity = () => {
		const newActivity = {
			...activity,
			id: uuidv4(),
			time: parseFloat(activity.time),
			category: categoriesForActivity.find(val => val.id === group),
			evening: activity.evening
		};

		const projectOrder = globalState?.projectOrder;
		projectOrder.forEach(projectID => {
			const project = tasks[projectID];
			project.activityList.push({ id: newActivity.id, isSelected: false });
		});

		const newData = {
			...globalState,
			tasks: tasks,
			activities: { ...globalState.activities, [newActivity.id]: newActivity }
		};

		setActivity(initialActivity);
		handleClose();
		setGlobalState(newData);
		localStorage.setItem('data', JSON.stringify(newData));
	};

	if (window.location.pathname === '/kanban') {
		return (
			<TopContainer>
				<h1>
					PROJECTS
					<NewProject />
				</h1>
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
			</TopContainer>
		);
	}

	if (window.location.pathname === '/rapid-estimation') {
		return (
			<div>
				<Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
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
						<FormControl fullWidth>
							<InputLabel>Group</InputLabel>
							<Select fullWidth value={group} onChange={handleChange}>
								{categoriesForActivity.map((val, ind) => {
									return (
										<MenuItem key={val.id} value={val.id}>
											{val.text}
										</MenuItem>
									);
								})}
							</Select>
						</FormControl>
						<TextField
							margin='dense'
							id='name'
							label='Timer'
							type='number'
							value={activity.time}
							onChange={e => setActivity({ ...activity, time: e.target.value })}
							fullWidth
						/>
						<FormControlLabel
							control={
								<Checkbox
									margin='dense'
									id='name'
									inputProps={{ 'aria-label': 'primary checkbox' }}
									//checked={checked}
									//onChange={handleChangeE}
									value={activity.evening}
									onChange={e => setActivity({ ...activity, evening: e.target.checked })}
									fullWidth
								/>
							}
							label='Evening Activity'
						/>
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose} color='primary'>
							Cancel
						</Button>
						<Button variant='contained' onClick={addActivity} color='primary'>
							Add
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}

	if (window.location.pathname === '/drive') {
		return (
			<TopContainer>
				<h1> Drive</h1>
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
			</TopContainer>
		);
	}

	if (window.location.pathname === '/team-work') {
		return (
			<TopContainer>
				<h1>Team Work</h1>
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
			</TopContainer>
		);
	}

	if (window.location.pathname === '/homepage') {
		return (
			<TopContainer style={{ justifyContent: 'center' }}>
				 <h1>
					REDWING 
					<Link to='/newhome' className='home-icon'>
						<svg
							width='20'
							height='20'
							viewBox='0 0 18 19'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M6.61994 16.4115V13.8558C6.61993 13.2082 7.14656 12.682 7.79886 12.6779H10.194C10.8492 12.6779 11.3804 13.2053 11.3804 13.8558V13.8558V16.4041C11.3804 16.9658 11.8368 17.4223 12.4026 17.4264H14.0367C14.7999 17.4284 15.5325 17.1288 16.0728 16.5937C16.6132 16.0586 16.9168 15.3321 16.9168 14.5744V7.31464C16.9168 6.70259 16.6436 6.12203 16.1707 5.72935L10.6193 1.32166C9.64892 0.550701 8.26297 0.575606 7.32132 1.38092L1.88934 5.72935C1.39411 6.11045 1.09812 6.69273 1.0835 7.31464V14.567C1.0835 16.1462 2.37298 17.4264 3.96364 17.4264H5.5604C5.83281 17.4284 6.09474 17.3223 6.28806 17.1318C6.48138 16.9412 6.5901 16.682 6.59009 16.4115H6.61994Z'
								stroke='#00bbbb'
								strokeWidth='1.4'
							/>
						</svg>
					</Link>
				</h1>
			 </TopContainer> 
		);
	}

	if (window.location.pathname === '/newhome') {
		return (
			<TopContainer style={{ justifyContent: 'center' }}>
				<h1>
					REDWING
					<Link to='/' className='home-icon'>
						<svg
							width='20'
							height='20'
							viewBox='0 0 18 19'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M6.61994 16.4115V13.8558C6.61993 13.2082 7.14656 12.682 7.79886 12.6779H10.194C10.8492 12.6779 11.3804 13.2053 11.3804 13.8558V13.8558V16.4041C11.3804 16.9658 11.8368 17.4223 12.4026 17.4264H14.0367C14.7999 17.4284 15.5325 17.1288 16.0728 16.5937C16.6132 16.0586 16.9168 15.3321 16.9168 14.5744V7.31464C16.9168 6.70259 16.6436 6.12203 16.1707 5.72935L10.6193 1.32166C9.64892 0.550701 8.26297 0.575606 7.32132 1.38092L1.88934 5.72935C1.39411 6.11045 1.09812 6.69273 1.0835 7.31464V14.567C1.0835 16.1462 2.37298 17.4264 3.96364 17.4264H5.5604C5.83281 17.4284 6.09474 17.3223 6.28806 17.1318C6.48138 16.9412 6.5901 16.682 6.59009 16.4115H6.61994Z'
								stroke='#00bbbb'
								strokeWidth='1.4'
							/>
						</svg>
					</Link>
				</h1>
			</TopContainer>
		);
	}

	// if (window.location.pathname === '/team-work') {
	// 	return (
	// 		<TeamworkContainer>
	// 			<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'>
	// 				<path d='M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z' />
	// 			</svg>
	// 			<h1>TEAM WORK</h1>
	// 			<svg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24'>
	// 				<path d='M7.33 24l-2.83-2.829 9.339-9.175-9.339-9.167 2.83-2.829 12.17 11.996z' />
	// 			</svg>
	// 		</TeamworkContainer>
	// 	);
	// }

	return null;
}

export default Header;
