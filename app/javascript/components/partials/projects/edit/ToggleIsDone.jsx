import React, { Component } from "react"

export default class ToggleIsDone extends Component {
    constructor(props) {
        super(props)
    }

    toggleComplete() {
        let data = {}
        const {
            project_id,
            phase_id,
            task_id,
            parentType
        } = this.props
        if (parentType === 'Task') {
            data = { api_v1_task: { is_done: !this.props.is_done } }
            fetch(`/api/v1/projects/${project_id}/phases/${phase_id}/tasks/${task_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                credentials: 'include'
            }).then(res => res.json())
            .then(res => {
                if (res.updated) this.props.fireReload()
                else alert(`${res.results}`)
            })
            .catch(err => console.log(err))
        } else if (parentType === 'Phase') {
            data = { api_v1_phase: { is_done: !this.props.is_done } }
            fetch(`/api/v1/projects/${project_id}/phases/${phase_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                credentials: 'include'
            }).then(res => res.json())
            .then(res => {
                if (res.updated) this.props.fireReload()
                else alert(`${res.results}`)
            })
            .catch(err => console.log(err))
        } else if (parentType === 'Project') {
            data = { api_v1_project: { is_done: !this.props.is_done } }
            fetch(`/api/v1/projects/${project_id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
                credentials: 'include'
            }).then(res => res.json())
            .then(res => {
                if (res.updated) this.props.fireReload()
                else alert(`${res.results}`)
            })
            .catch(err => console.log(err))
        }
    }

    render() {
        return (
            <button onClick={() => this.toggleComplete()}>
                {this.props.is_done
                        ? 'Mark as Incomplete • ↩️'
                        : 'Mark as Completed • ✅'}
            </button>
        )
    }
}