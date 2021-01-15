import React, { Component } from 'react'
import './TodoListItem.css'

export default class TodoListItem extends Component {

    onLabelClick = () => {
        return this.setState(({ done }) => {
            return {
                done: !done
            }
        })
    }

    onMarkImportant = () => {
        return this.setState(({ important }) => {
            return {
                important: !important
            }
        })
    }

    render() {
        const { label, onDeleted, onToggleDone, onToggleImportant, important, done, onEdit } = this.props
        let className = 'todo-list-item'

        if (important) {
            className += ' important';
        }

        if (done) {
            className += ' done';
        }

        return (
            <span className={className}>
                <span
                    className="todo-list-item-label"
                    onClick={onToggleDone}>
                    {label}
                </span>

                <button type="button"
                    className="btn btn-outline-success btn-sm float-right"
                    onClick={onToggleImportant}>
                    <i className="fa fa-exclamation" />
                </button>

                <button type="button"
                    className="btn btn-outline-danger btn-sm float-right"
                    onClick={onDeleted}>
                    <i className="fa fa-trash-o" />
                </button>

                <button type="button"
                    className="btn btn-outline-primary btn-sm float-right"
                    onClick={onEdit}>
                    <i className="fa fa-edit small" />
                </button>
            </span>
        )
    }
}

