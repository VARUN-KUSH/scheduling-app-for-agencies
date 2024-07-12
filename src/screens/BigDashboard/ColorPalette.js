import React, { useEffect } from 'react';
import styles from './BigDashboard.module.css';
import { Close } from '@material-ui/icons';

const ColorPalette = ({ setShowID, setGlobalState, project: { id } }) => {
	const handleColor = color => {
		setGlobalState(prev => {
			const newState = { ...prev };
			newState.tasks[id].needsColor = color;
			localStorage.setItem('data', JSON.stringify(newState));

			return newState;
		});
	};
	return (
		<>
			<React.Fragment>
				<div className={styles.colorPalette}>
					<div
						className={`${styles.rectangle} ${styles['rectanglewhite']}`}
						onClick={() => handleColor('white')}
					></div>
					<div
						className={`${styles.rectangle} ${styles['rectanglegreen']}`}
						onClick={() => handleColor('green')}
					></div>
					<div
						className={`${styles.rectangle} ${styles['rectangleRed']}`}
						onClick={() => handleColor('Red')}
					></div>
					<div
						className={`${styles.rectangle} ${styles['rectangleYellow']}`}
						onClick={() => handleColor('Yellow')}
					></div>
					<Close style={{ cursor: 'pointer', color: 'white' }} onClick={() => setShowID(null)} />
				</div>
			</React.Fragment>
		</>
	);
};

export default ColorPalette;
