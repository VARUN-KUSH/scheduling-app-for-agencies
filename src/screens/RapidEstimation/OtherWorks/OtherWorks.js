import React from 'react';
import { Flex } from '../RapidEstimationStyles';
import WorkCard from 'components/WorkCard/WorkCard';

const OtherWorks = ({ category, workList, otherWorks, setTimer }) => {
	return (
		<>
			<div style={{ marginBottom: '20px' }}>
				{workList.map(({ id, isSelected }) => {
					const work = otherWorks[id];
					return work.category.text === category ? (
						<WorkCard work={work} isSelected={isSelected} setTimer={setTimer} key={work.id} />
					) : null;
				})}
			</div>
		</>
	);
};

export default OtherWorks;
