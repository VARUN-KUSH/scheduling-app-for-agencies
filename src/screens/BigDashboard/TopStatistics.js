import React from 'react';
export const TopStatistics = ({ text, count }) => {
	return (
		<div style={{ color: 'white', fontSize: 12 }}>
			<div style={{ fontSize: 25 }}>{count}</div>

			<div style={{ fontSize: 12 }}>{text}</div>
		</div>
	);
};
