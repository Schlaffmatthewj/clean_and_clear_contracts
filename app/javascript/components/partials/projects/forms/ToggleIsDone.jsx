import React, { Component } from "react"

export default class ToggleIsDone extends Component {
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(evt) {
        evt.preventDefault()
        let data = {}
        const {
            project_id,
            phase_id,
            task_id,
            parentType
        } = this.props
        if (parentType === 'Task') {
            // if (this.state.is_done === 'Completed') data = { api_v1_task: { is_done: true } }
            // else data = { api_v1_task: { is_done: false } }
            data = { api_v1_task: { is_done: !this.props.is_done } }
            console.log('UPDATE TASK', data)
            fetch(`/api/v1/projects/${project_id}/phases/${phase_id}/tasks/${task_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                credentials: 'include'
            }).then(res => res.json())
            .then(res => {
                console.log('PUT to TASK res', res)
                this.props.fireReload()
            })
            .catch(err => console.log(err))
        } else if (parentType === 'Phase') {
            // if (this.state.is_done === 'Completed') data = { api_v1_phase: { is_done: true } }
            // else data = { api_v1_phase: { is_done: false } }
            data = { api_v1_phase: { is_done: !this.props.is_done } }
            console.log('UPDATE PHASE', data)
            fetch(`/api/v1/projects/${project_id}/phases/${phase_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                credentials: 'include'
            }).then(res => res.json())
            .then(res => {
                console.log('PUT to PHASE res', res)
                this.props.fireReload()
            })
            .catch(err => console.log(err))
        } else if (parentType === 'Project') {
            // if (this.state.is_done === 'Completed') data = { api_v1_project: { is_done: true } }
            // else data = { api_v1_project: { is_done: false } }
            data = { api_v1_project: { is_done: !this.props.is_done } }
            console.log('UPDATE PROJECT', data)
            fetch(`/api/v1/projects/${project_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                credentials: 'include'
            }).then(res => res.json())
            .then(res => {
                console.log('PUT to PROJECT res', res)
                this.props.fireReload()
            })
            .catch(err => console.log(err))
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                type='submit'
                value={this.props.is_done
                        ? 'Mark as Incomplete'
                        : 'Mark as Completed'}
                />
            </form>
        )
    }
}