import moment from 'moment';
import React from 'react';
import { Container } from './TimeBarStyles';

const TimeBar = ({ timer }) => {
	return (
		<Container>
			{timer.day ? (
				<p>
					<span>{timer.day}</span> hours of work completion by{' '}
					<span>{moment().add(timer.day, 'hours').format('hh:mm A')}</span>
				</p>
			) : (
				<p>
					Day completed. <span>{timer.evening}</span> hours of evening work.
				</p>
			)}
		</Container>
	);
};

export default TimeBar;
