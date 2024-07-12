import React, { useContext, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { motion } from 'framer-motion';

import Cell from 'components/Cell/Cell';
import { AllDataContext } from 'context/AllDataContext';
import { pageTransitions, pageVariants } from 'animations';

import { GridContainer, Title, TitleContainer, TabButton, TabContainer } from './KanbanStyles';
import TabComponent from 'components/TabComponent/TabComponent';

function renderGrid({ columnOrder, rowOrder, grid, tasks, rows }, tabValue) {
	return rowOrder.map((rowId, rowIndex) =>
		columnOrder.map((columnId, columnIndex) => (
			<Cell
				id={`${rowIndex}-${columnIndex}`}
				key={`${rowId}-${columnId}`}
				tasks={tasks}
				rows={rows}
				rowIDs={rowOrder}
				taskIds={grid[rowIndex][columnIndex]}
				gridRow={rowIndex}
				gridCol={columnIndex}
				tabValue={tabValue}
				rowId={rowId}
			/>
		))
	);
}

const Kanban = ({ setIsDragging, isInverted, setOpenFocusMode }) => {
	const { globalState, setGlobalState } = useContext(AllDataContext);
	const [tabValue, setTabValue] = useState('A');
	const onDragStart = () => {
		setIsDragging(true);
	};

	const onDragEnd = result => {
		//console.log(globalState);

		const { destination, source, draggableId } = result;
		// console.log(result);
		setIsDragging(false);
		// console.log(result);
		if (!destination) {
			return;
		}

		if (destination.droppableId === source.droppableId && destination.index === source.index) {
			return;
		}

		const [startX, startY] = source.droppableId.split('-');
		const [endX, endY] = destination.droppableId.split('-');

		const start = globalState.grid[startX][startY];
		const finish = globalState.grid[endX][endY];

		if (destination.droppableId === source.droppableId) {
			const newTaskIds = Array.from(start);
			newTaskIds.splice(source.index, 1);
			newTaskIds.splice(destination.index, 0, draggableId);

			const newGrid = Array.from(globalState.grid);
			newGrid[startX][startY] = newTaskIds;

			setGlobalState({
				...globalState,
				grid: newGrid
			});
			return;
		}

		const startTaskIds = Array.from(start);
		startTaskIds.splice(source.index, 1);
		const newStart = startTaskIds;

		const finishTaskIds = Array.from(finish);
		finishTaskIds.splice(destination.index, 0, draggableId);
		const newFinish = finishTaskIds;

		const newGrid = Array.from(globalState.grid);
		newGrid[startX][startY] = newStart;
		newGrid[endX][endY] = newFinish;

		setGlobalState({
			...globalState,
			grid: newGrid
		});

		localStorage.setItem('data', JSON.stringify(globalState));

		return;
	};

	return (
		<motion.div
			initial='initial'
			animate={isInverted ? 'inRight' : 'inLeft'}
			exit={isInverted ? 'outRight' : 'outLeft'}
			variants={pageVariants}
			transition={pageTransitions}
			style={{ width: '100%', height: '100%' }}
		>
			<TabComponent
				active={tabValue}
				setActive={setTabValue}
				tabList={['Clients', 'Internal', 'Closed', 'Situations']}
				tabIds={['A', 'B', 'C', 'D']}
			/>

			{/* <TabContainer className='container-1'>

				<TabButton isTabSelected={tabValue === 'A'} onClick={() => setTabValue('A')}>
					Clients
				</TabButton>
				<TabButton
					isTabSelected={tabValue === 'B'}
					onClick={() => setTabValue('B')}
				>
					Internal
				</TabButton>
				<TabButton
					isTabSelected={tabValue === 'D'}
					onClick={() => setTabValue('D')}
				>
					Situations
				</TabButton>
				<TabButton
					isTabSelected={tabValue === 'C'}
					onClick={() => setTabValue('C')}
				>
					Closed
				</TabButton>

			</TabContainer> */}

			<DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
				<GridContainer
					numRows={globalState.rowOrder.length}
					numColumns={globalState.columnOrder.length}
				>
					{globalState.columnOrder.map((columnId, index) => {
						const column = globalState.columns[columnId];
						return (
							<TitleContainer
								key={column.id}
								className='column_title'
								style={{
									gridColumn: `${index + 2} / span 1`,
									gridRow: '1 / span 1',
									margin: 'auto',
									width: '100%'
								}}
							>
								<Title>{column.title}</Title>
							</TitleContainer>
						);
					})}

					{/* {globalState.rowOrder.map((rowId, index) => {
						const row = globalState.rows[rowId];
						return (
							<TitleContainer
								key={row.id}
								style={{
									gridRow: `${index + 2} / span 1`,
									gridColumn: '1 / span 1',
									margin: '0 auto',
									width: '100%'
								}}
							>
								<Title>{row.title}</Title>
							</TitleContainer>
						);
					})} */}
					{renderGrid(globalState, tabValue)}
				</GridContainer>
			</DragDropContext>
		</motion.div>
	);
};

export default Kanban;
