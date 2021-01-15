import React, { Component } from 'react'
import './ItemAddForm.css'


export default class ItemAddForm extends Component {

    render() {
        const { valueForm, onLabelChangeNew, onSubmit } = this.props
        return (
            <form className="item-add-form d-flex"
                onSubmit={onSubmit}>

                <input type="text"
                    className="form-control"
                    onChange={onLabelChangeNew}
                    placeholder="What needs to be done"
                    value={valueForm} />

                <button
                    className="btn btn-outline-secondary">
                    Add
                </button>
            </form>
        )
    }
}
