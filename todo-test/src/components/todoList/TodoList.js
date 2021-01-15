import React, { useState } from 'react'
import TodoListItem from '../todoListItem/TodoListItem'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './TodoList.css'


const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleDone, onEdit, handleOnDragEnd }) => {
    // const [characters, updateCharacters] = useState(todos);
    // function handleOnDragEnd(result) {
    //     if (!result.destination) return;
    //     const items = Array.from(todos);
    //     const [reorderedItem] = items.splice(result.source.index, 1);
    //     items.splice(result.destination.index, 0, reorderedItem);
    //     // updateCharacters(items);
    // }
    const elements = todos.map((item, index) => {
        const { id, ...itemProps } = item

        return (
            <Draggable key={id} draggableId={String(id)} index={index}>
                {(provided) => (
                    <li className="list-group-item" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                        <TodoListItem
                            {...itemProps}
                            onDeleted={() => onDeleted(id)}
                            onToggleImportant={() => { onToggleImportant(id) }}
                            onToggleDone={() => { onToggleDone(id) }}
                            onEdit={() => { onEdit(id) }}
                        />
                    </li>
                )}
            </Draggable>

        )
    })

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId="characters">
                {(provided) => (
                    <ul className="list-group todo-list" {...provided.droppableProps} ref={provided.innerRef}>
                        {elements}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    )

}
export default TodoList