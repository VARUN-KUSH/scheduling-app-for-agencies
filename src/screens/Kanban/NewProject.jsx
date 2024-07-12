import { useState, useContext } from 'react';
import { Box, TextField, Radio, RadioGroup, FormControlLabel } from '@material-ui/core';
import { v4 as uniqueID } from 'uuid';
import { Modal } from 'components';
import { AllDataContext } from 'context/AllDataContext';
import styled from 'styled-components';

const Button = styled.button`
	display: inline-flex;
	position: static;
	align-items: center;
	justify-content: center;
	width: 18px;
	height: 18px;
	background-color: inherit;
	border: 1px solid #fff;
	color: #fff;
	font-size: 16px;
	font-weight: 100;
	border-radius: 3px;
	font-weight: 200;
`;

export default function NewProject() {
	const [open, setOpen] = useState(false);
	const [title, setTitle] = useState('');
	const [projectTypeList, setProjectTypeList] = useState('A');
	const { setGlobalState } = useContext(AllDataContext);

	const handleSubmit = e => {
		const value = JSON.parse(localStorage.getItem('data'));
		const activityList = value.tasks['project-1'].activityList;
		const painPointsList = value.tasks['project-1'].painPointsList;
		activityList.forEach(a => (a.isSelected = false));
		const newTask = {
			id: uniqueID(),
			content: title,
			isCompleted: true,
			isEveningTask: false,
			activityList: activityList,
			painPointsList: painPointsList,
			projectTypeList: projectTypeList
		};
		setGlobalState(old => {
			old.tasks[newTask.id] = newTask;
			old.grid[0][0].push(newTask.id);
			old.projectOrder.push(newTask.id);
			localStorage.setItem('data', JSON.stringify(old));
			return { ...old };
		});
		setOpen(false);
		e.preventDefault();
		setTitle('');
		setProjectTypeList('A');
	};

	return (
		<>
			<Button onClick={() => setOpen(true)}>+</Button>
			<Modal title='New Project' {...{ open, setOpen }}>
				<form
					onSubmit={handleSubmit}
					style={{ padding: '20px', minWidth: '20vw', fontSize: '1.4rem' }}
				>
					<TextField
						label='Title'
						value={title}
						onChange={e => setTitle(e.target.value)}
						required
						fullWidth
					/>
					<RadioGroup
						aria-label='Project category'
						value={projectTypeList}
						name='type'
						onChange={e => setProjectTypeList(e.target.value)}
						required
					>
						<FormControlLabel value='A' control={<Radio />} label='Clients' />
						<FormControlLabel value='B' control={<Radio />} label='Internal' />
						<FormControlLabel value='C' control={<Radio />} label='Closed' />
						<FormControlLabel value='D' control={<Radio />} label='Situations' />
					</RadioGroup>
					<Box display='flex' flexDirection='row-reverse' p={1} m={1}>
						<Button type='submit' variant='contained' color='secondary'>
							Add
						</Button>
					</Box>
				</form>
			</Modal>
		</>
	);
}
