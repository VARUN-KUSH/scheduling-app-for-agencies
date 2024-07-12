import React from 'react';
import Task from '../Card/Card';
import { Droppable } from 'react-beautiful-dnd';
import { Container, RowHeading } from './CellStyles';

const Cell = ({ id, tasks, taskIds, gridRow, gridCol, rows, tabValue, rowIDs, rowId }) => {
	return (
		<Droppable droppableId={id}>
			{(provided, snapshot) => (
				<div
					style={{
						gridRow: `${gridRow + 2} / span 1`,
						gridColumn: `${gridCol + 2} / span 1`
					}}
					ref={provided.innerRef}
					{...provided.droppableProps}
					isDraggingOver={snapshot.isDraggingOver}
				>
					{gridCol === 1 && <RowHeading>{rows[rowId].title}</RowHeading>}

					<Container gridRow={gridRow} gridCol={gridCol}>
						{taskIds.map((taskId, index) => {
							const task = tasks[taskId];

							if (tabValue === task.projectTypeList) {
								return <Task key={taskId} task={task} index={index} />;
							}
						})}
					</Container>
					{provided.placeholder}
				</div>
			)}
		</Droppable>
	);
};

export default Cell;
