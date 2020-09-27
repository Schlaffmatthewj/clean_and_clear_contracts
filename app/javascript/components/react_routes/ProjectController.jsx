import React, { Component } from "react"

import Project from "../partials/projects/Project"
import Task from "../partials/projects/Task"

class ProjectController extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pageStatus: '',
            dataLoaded: false
        }

        this.switchToProfile = this.switchToProfile.bind(this)
    }

    
    componentDidMount() {
        if (this.props.currentStatus !== this.state.pageStatus) {
            this.setState({
                pageStatus: this.props.currentStatus,
                dataLoaded: true
            })
        }
    }
    
    componentDidUpdate(prevProps) {
        if (this.props.currentStatus !== this.state.pageStatus) {
            this.setState({ pageStatus: this.props.currentStatus })
        }
        if (prevProps.company.id !== this.props.company.id) {
            this.props.history.push('/')
        }
    }

    switchToProfile() {
        this.props.history.push(`/profile/${this.props.company.id}`)
    }

    conditionalRender() {
        let project_id = this.props.match.params.project_id
        let phase_id = this.props.match.params.phase_id
        let task_id = this.props.match.params.task_id
        switch (this.state.pageStatus) {
            case 'Project':
                return <Project
                        loggedInStatus={this.props.loggedInStatus}
                        company={this.props.company}
                        project_id={project_id}
                        phaseForm={this.phaseForm}
                        switchToProfile={this.switchToProfile}
                        />
            case 'Task':
                return <Task
                        loggedInStatus={this.props.loggedInStatus}
                        company={this.props.company}
                        project_id={project_id}
                        phase_id={phase_id}
                        task_id={task_id}
                        />
            default:
                this.props.history.push('/')
        }
    }

    render() {
        return (
            <main>
               {this.state.dataLoaded ? this.conditionalRender() : <p>Loading...</p>}
            </main>
        )
    }
}
export default ProjectController;