import React, { Component } from "react"

class TaskNew extends Component {
    constructor(props) {
        super(props)
        this.state = {
            title: '',
            description: '',
            budget: '',
            start_date: '',
            turnover_date: '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value })
    }

    handleSubmit(evt) {
        evt.preventDefault()
        const {
            title,
            description,
            budget,
            start_date,
            turnover_date,
        } = this.state
        let data = {
            api_v1_task: {
                title: title,
                description: description,
                budget: budget,
                start_date: start_date,
                turnover_date: turnover_date
            }
        }
        fetch(`/api/v1/projects/${this.props.project_id}/phases/${this.props.phase_id}/tasks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })
        .then(res => res.json())
        .then(res => {
            // console.log('NEW Task res', res)
            this.props.successfulCreation(res.results.project_id)
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                type='text'
                name='title'
                value={this.state.title}
                placeholder="Task's title"
                onChange={this.handleChange}
                />
                <textarea
                name='description'
                value={this.state.description}
                placeholder="Description"
                onChange={this.handleChange}
                />
                <input
                type='money'
                name='budget'
                value={this.state.budget}
                placeholder='Budget'
                onChange={this.handleChange}
                />
                <label>Start Date:
                <input
                type='date'
                name='start_date'
                value={this.state.date}
                placeholder='Start Date'
                onChange={this.handleChange}
                />
                </label>
                <label>Turnover Date:
                <input
                type='date'
                name='turnover_date'
                value={this.state.date}
                placeholder='Turnover Date'
                onChange={this.handleChange}
                />
                </label>
                <input
                type='submit'
                value='Create Task • 🏗️'
                />
            </form>
        )
    }
}
export default TaskNew