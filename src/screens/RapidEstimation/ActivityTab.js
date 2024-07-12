import React, { useContext } from 'react';
import { AllDataContext } from 'context/AllDataContext';

const ActivityTab = () => {
	const { globalState, setGlobalState } = useContext(AllDataContext);
	const { tasks, activities, projectOrder, activityOrder } = globalState;

	let allProjects = projectOrder.map(projectID => {
		return tasks[projectID].activityList;
	});
	let allActivities = activityOrder.map(activityID => {
		return activities[activityID];
	});
	// console.log('ASJHDAS', allProjects);
	// console.log('IUASEDASD', allActivities);

	function ReturnActivityList() {
		return allActivities.map(activity => {
			return (
				<div>
					{allProjects.map(({ id, isSelected }) => {
						return isSelected === true && id === activity.id ? (
							<div>
								<h1>{activity.content} </h1>
							</div>
						) : null;
					})}
				</div>
			);
		});
	}

	return ReturnActivityList();
};
export default ActivityTab;
