import { AllDataContext } from 'context/AllDataContext';
import { Typography } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { Checkbox } from '@material-ui/core';
import { PainPoint } from './CheckBoxStyles';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	root: {
		margin: 0,
		padding: 10
	},
	icon: {
		borderRadius: 3,
		opacity: '30%',
		width: 20,
		height: 20,
		border: '1px solid #fff',
		backgroundColor: 'inherit'
	},
	checkedIcon: {
		opacity: '100%',
		border: 'none',
		backgroundImage: 'url("Vector.svg")',
		backgroundSize: '8px 8px',
		backgroundPosition: 'center center',
		backgroundRepeat: 'no-repeat',
		background: '#D70000',
		'&:before': {
			content: '""',
			color: '#fff'
		}
	}
});

function StyledCheckbox(props) {
	const classes = useStyles();

	return (
		<Checkbox
			className={classes.root}
			disableRipple
			color='default'
			checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
			icon={<span className={classes.icon} />}
			inputProps={{ 'aria-label': 'decorative checkbox' }}
			{...props}
		/>
	);
}

const CheckBox = ({ task, point, isChecked, setSelectedProject }) => {
	const [localSelected, setLocalSelected] = useState(isChecked);
	const { globalState, setGlobalState } = useContext(AllDataContext);

	const onClick = () => {
		let newData = globalState;
		const newPainPointsList = JSON.parse(JSON.stringify(task.painPointsList));
		const newPainPoint = newPainPointsList.find(a => a.id === point.id);
		newPainPoint.isChecked = !localSelected;

		setSelectedProject({ ...task, painPointsList: newPainPointsList });

		newData = {
			...newData,
			tasks: {
				...newData.tasks,
				[task.id]: { ...task, painPointsList: newPainPointsList }
			}
		};
		setLocalSelected(prev => !prev);
		setGlobalState(newData);
		localStorage.setItem('data', JSON.stringify(newData));
	};

	return (
		<PainPoint key={point.id} onClick={onClick}>
			<StyledCheckbox checked={isChecked} />
			<Typography align='center' variant='h5' style={{ color: 'white', marginRight: '10px' }}>
				{point.content}
			</Typography>
		</PainPoint>
	);
};

export default CheckBox;
