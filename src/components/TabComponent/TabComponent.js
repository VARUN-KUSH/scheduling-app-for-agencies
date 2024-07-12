import React from 'react';
import { TabButton, TabList, TopContainer } from './TabStyles';

const TabComponent = props => {
	const { setActive, active, tabList, tabIds, styles, counts } = props;
	return (
		<TopContainer
		// style={styles}
		>
			<TabList>
				{!tabIds
					? tabList.map((t, i) => (
							<TabButton isTabSelected={active === t} onClick={() => setActive(t)}>
								{' '}
								{t} {counts && counts[t] && `(${counts[t]})`}
							</TabButton>
					  ))
					: tabList.map((t, i) => (
							<TabButton isTabSelected={active === tabIds[i]} onClick={() => setActive(tabIds[i])}>
								{' '}
								{t} {counts && counts[t] && `(${counts[t]})`}
							</TabButton>
					  ))}
			</TabList>
		</TopContainer>
	);
};

export default TabComponent;
