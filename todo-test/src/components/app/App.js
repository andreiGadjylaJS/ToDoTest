import React, { Component } from 'react'
import AppHeader from '../appHeader'
import ItemAddForm from '../itemAddForm'
import TodoList from '../todoList'
import TodoService from '../../services/TodoService'
import './App.css'

export default class App extends Component {

    todoService = new TodoService()

    componentDidMount() {
        this.todoService.getTodos()
            .then(
                result => this.setState({
                    isLoaded: true,
                    todoData: result
                }),
                error => this.setState({
                    isLoaded: true,
                    error
                })
            )

    }

    maxId = 100

    state = {
        error: null,
        isLoaded: false,
        todoData: [],
        valueForm: "",
        isEditing: null,
    }

    deleteItem = id => {
        this.setState(({ todoData }) => {
            const newArray = todoData.filter(item => item.id !== id)
            return {
                todoData: newArray
            }
        })
    }

    addItem = (text) => {
        this.setState(({ todoData }) => {
            const newItem = {
                label: text,
                id: this.maxId++,
                important: false,
                done: false
            }
            const newArray = [...todoData, newItem]

            return {
                todoData: newArray
            }
        })
    }

    toggleProperty(arr, id, propName) {
        const idx = arr.findIndex(item => item.id === id)
        const oldItem = arr[idx]
        const newItem = { ...oldItem, [propName]: !oldItem[propName] }
        const newArray = arr.slice()
        newArray.splice(idx, 1, newItem)
        return newArray

    }

    onToggleImportant = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'important')
            }
        })
    }

    onToggleDone = (id) => {
        this.setState(({ todoData }) => {
            return {
                todoData: this.toggleProperty(todoData, id, 'done')
            }
        })
    }

    onEdit = (id) => {
        const { todoData } = this.state
        const idx = todoData.findIndex(item => item.id === id)
        const oldItem = todoData[idx]
        this.setState({
            valueForm: oldItem.label,
            isEditing: id
        })
    }

    onLabelChangeNew = (e) => {
        this.setState({
            valueForm: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        if (this.state.valueForm && !this.state.isEditing) {
            this.addItem(this.state.valueForm)
            this.setState({ valueForm: "" })
        } else if (this.state.valueForm && this.state.isEditing) {
            const { todoData } = this.state
            const id = this.state.isEditing
            const editElement = todoData.find(item => item.id === id)
            const newElement = { ...editElement, label: this.state.valueForm }

            this.setState(({ todoData }) => {
                const newArray = [...todoData]
                const idElement = newArray.findIndex(item => item.id === newElement.id)
                newArray.splice(idElement, 1, newElement)
                return {
                    todoData: newArray,
                    isEditing: null,
                    valueForm: ""
                }
            })


        } else return

    }

    render() {
        const { todoData, valueForm, error, isLoaded } = this.state
        if (error) {
            return <div>Error: {error.message}</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            const doneCount = todoData.filter(item => item.done).length
            const done = todoData.length - doneCount
            return (
                <div className="todo-app">
                    <AppHeader toDo={doneCount} done={done} />
                    <div className="top-panel d-flex">
                        <ItemAddForm
                            addItem={this.addItem}
                            onLabelChangeNew={this.onLabelChangeNew}
                            onSubmit={this.onSubmit}
                            valueForm={valueForm} />
                    </div>
                    <TodoList
                        todos={this.state.todoData}
                        onDeleted={this.deleteItem}
                        onToggleImportant={this.onToggleImportant}
                        onToggleDone={this.onToggleDone}
                        onEdit={this.onEdit}
                    />
                </div>
            )
        }
    }
}
