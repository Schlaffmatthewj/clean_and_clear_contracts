import React, { Component } from "react"

class ProjectNew extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            location: '',
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
            name,
            location,
            budget,
            start_date,
            turnover_date,
        } = this.state
        let data = {
            api_v1_project: {
                name: name,
                owner: this.props.company.name,
                location: location,
                budget: budget,
                start_date: start_date,
                turnover_date: turnover_date
            }
        }
        fetch('/api/v1/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })
        .then(res => res.json())
        .then(res => {
            this.props.successfulCreation(res.results.id)
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <form className='flex-column' onSubmit={this.handleSubmit}>
                <input
                type='text'
                name='name'
                value={this.state.name}
                placeholder="Project's Name"
                onChange={this.handleChange}
                />
                <input
                type='text'
                name='location'
                value={this.state.location}
                placeholder="Address"
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
                value='Draft Project • 🏗️'
                />
            </form>
        )
    }
}
export default ProjectNew