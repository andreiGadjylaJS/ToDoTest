import React from 'react'
import TodoListItem from '../todoListItem/TodoListItem'
import './TodoList.css'

const TodoList = ({ todos, onDeleted, onToggleImportant, onToggleDone, onEdit }) => {

    const elements = todos.map(item => {
        const { id, ...itemProps } = item

        return (
            <li key={id} className="list-group-item">
                <TodoListItem
                    {...itemProps}
                    onDeleted={() => onDeleted(id)}
                    onToggleImportant={() => { onToggleImportant(id) }}
                    onToggleDone={() => { onToggleDone(id) }}
                    onEdit={() => { onEdit(id) }}
                />
            </li>
        )
    })

    return (
        <ul className="list-group todo-list">
            {elements}
        </ul>
    )

}
export default TodoList