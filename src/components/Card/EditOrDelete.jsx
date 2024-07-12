import React, { useState, useContext } from 'react';
import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
	TextField,
	Radio,
	RadioGroup,
	FormControlLabel
} from '@material-ui/core';

import { AllDataContext } from 'context/AllDataContext';

export default function EditOrDelete({ open, handleClose, project }) {
	const [editProject, setEditProject] = useState(project);
	const { setGlobalState } = useContext(AllDataContext);

	const handleDeleteProject = () => {
		if (!window.confirm('Are you sure you want to delete this project?')) return;
		setGlobalState(old => {
			const newData = {
				...old
			};

			delete newData.tasks[editProject.id];
			newData.projectOrder = newData.projectOrder.filter(pro => pro !== editProject.id);
			newData.grid = newData.grid.map(row => {
				return row.map(col => {
					return col.filter(pro => pro !== editProject.id);
				});
			});
			localStorage.setItem('data', JSON.stringify(newData));

			return { ...newData };
		});
	};

	const handleEditProject = () => {
		setGlobalState(old => {
			old.tasks[editProject.id] = {
				...editProject
			};

			localStorage.setItem('data', JSON.stringify(old));

			return { ...old };
		});
		handleClose();
	};

	return (
		<Dialog open={open} onClose={handleClose} aria-labelledby='form-dialog-title'>
			<DialogTitle id='form-dialog-title'>Edit</DialogTitle>
			<DialogContent>
				<TextField
					autoFocus
					margin='dense'
					id='content'
					label='Title'
					type='text'
					value={editProject.content}
					onChange={e => setEditProject(old => ({ ...old, content: e.target.value }))}
					fullWidth
				/>
				<RadioGroup
					aria-label='Project category'
					value={editProject.projectTypeList}
					name='type'
					onChange={e => setEditProject(old => ({ ...old, projectTypeList: e.target.value }))}
				>
					<FormControlLabel value='A' control={<Radio />} label='Clients' />
					<FormControlLabel value='B' control={<Radio />} label='Internal' />
					<FormControlLabel value='C' control={<Radio />} label='Closed' />
					<FormControlLabel value='D' control={<Radio />} label='Situations' />
				</RadioGroup>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} color='primary'>
					Cancel
				</Button>
				<Button variant='contained' onClick={handleDeleteProject} color='secondary'>
					Delete
				</Button>
				<Button variant='contained' onClick={handleEditProject} color='primary'>
					Save
				</Button>
			</DialogActions>
		</Dialog>
	);
}
