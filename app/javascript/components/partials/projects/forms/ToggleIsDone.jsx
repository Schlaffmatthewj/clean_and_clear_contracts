import React, { Component } from "react"

export default class ToggleIsDone extends Component {
    constructor(props) {
        super(props)
        this.state = {
            is_done: false,
            updatedAt: '',
            parentType: '',
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value })
    }

    handleSubmit(evt) {
        evt.preventDefault()
        let data = {}
        const {
            project_id,
            phase_id,
            task_id
        } = this.props
        const {
            parentType,
            is_done
        } = this.state
        if (parentType === 'Task') {
            data = { api_v1_task: { is_done: is_done } }
            fetch(`/api/v1/projects/${project_id}/phases/${phase_id}/tasks/${task_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                credentials: 'include'
            }).then(res => res.json())
            .then(res => {
                this.setState({
                    updatedAt: res.results.updated,
                    is_done: res.results.is_done
                })
                console.log('PUT to TASK res', res)
                this.props.fireReload()
            })
            .catch(err => console.log(err))
        } else if (parentType === 'Phase') {
            data = { api_v1_phase: { is_done: is_done } }
            fetch(`/api/v1/projects/${project_id}/phases/${phase_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                credentials: 'include'
            }).then(res => res.json())
            .then(res => {
                this.setState({
                    updatedAt: res.results.updated,
                    is_done: res.results.is_done
                })
                console.log('PUT to PHASE res', res)
                this.props.fireReload()
            })
            .catch(err => console.log(err))
        } else if (parentType === 'Project') {
            data = { api_v1_project: { is_done: is_done } }
            fetch(`/api/v1/projects/${project_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                credentials: 'include'
            }).then(res => res.json())
            .then(res => {
                this.setState({
                    updatedAt: res.results.updated,
                    is_done: res.results.is_done
                })
                console.log('PUT to PROJECT res', res)
                this.props.fireReload()
            })
            .catch(err => console.log(err))
        }
    }

    render() {
        return (
            <div>
                <p>Status: {this.state.is_done
                    ? `Completed on: ${this.state.updatedAt}`
                    : 'Incomplete' }
                </p>
                <form onSubmit={this.handleSubmit}>
                    <input
                    type='checkbox'
                    name='is_done'
                    value={this.state.is_done}
                    onChange={this.handleChange}
                    />
                    <input
                    type='submit'
                    value='Update Status'
                    />
                </form>
            </div>
        )
    }
}