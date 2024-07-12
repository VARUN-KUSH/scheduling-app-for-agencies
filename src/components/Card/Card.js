import React, { useContext, useState, useEffect } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Container } from './CardStyles';
import EditOrDelete from './EditOrDelete';
import useLongPress from 'hooks/useLongPress';

import { DraggingContext } from 'context/isDragging';

export default function Task({ task, index }) {
	const [open, setOpen] = useState(false);
	const { isDragging } = useContext(DraggingContext);

	const onLongPress = () => {
		if (!isDragging) {
			setOpen(true);
		}
	};

	useEffect(() => {
		if (isDragging) {
			setOpen(false);
		}
	}, [isDragging]);

	const defaultOptions = {
		shouldPreventDefault: true,
		delay: 1500
	};

	const longPressEvent = useLongPress(onLongPress, () => {}, defaultOptions);
	//console.log(task);
	return (
		<>
			<Draggable draggableId={task.id} index={index}>
				{(provided, snapshot) => (
					<Container
						{...longPressEvent}
						isCompleted={task.isCompleted}
						isEveningTask={task.isEveningTask}
						{...provided.draggableProps}
						{...provided.dragHandleProps}
						ref={provided.innerRef}
						isDragging={snapshot.isDragging}
					>
						{task.content}
					</Container>
				)}
			</Draggable>
			<EditOrDelete {...{ open }} handleClose={() => setOpen(false)} project={task} />
		</>
	);
}
