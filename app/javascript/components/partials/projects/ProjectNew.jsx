import React, { Component } from "react"

class ProjectNew extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            owner: '',
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
            owner,
            location,
            budget,
            start_date,
            turnover_date,
        } = this.state
        let data = {
            api_v1_project: {
                name: name,
                owner: owner,
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
            // console.log('NEW Project res', res)
            this.props.successfulProject(res.results)
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                type='text'
                name='name'
                value={this.state.name}
                placeholder="Project's Name"
                onChange={this.handleChange}
                />
                <input
                type='text'
                name='owner'
                value={this.state.owner}
                placeholder="Property Owner"
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
                value='Sign Contract'
                />
            </form>
        )
    }
}
export default ProjectNew