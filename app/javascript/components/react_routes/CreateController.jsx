import React, { Component } from "react"

import PrimeNew from "../partials/auth/PrimeNew"
import ProjectNew from "../partials/projects/Project"
import TaskNew from "../partials/tasks/Task"

class CreateController extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pageStatus: '',
            dataLoaded: false
        }

        this.togglePrime = this.togglePrime.bind(this)
    }

    componentDidMount() {
        if (this.props.currentStatus !== this.state.pageStatus) {
            this.setState({
                pageStatus: this.props.currentStatus,
                dataLoaded: true
            })
        }
    }

    componentDidUpdate() {
        if (this.props.currentStatus !== this.state.pageStatus) {
            this.setState({ pageStatus: this.props.currentStatus })
        }
    }

    togglePrime() {
        this.props.history.push(`/profile/${this.props.company.id}`)
    }

    conditionalRender() {
        let project_id = this.props.match.params.project_id
        let phase_id = this.props.match.params.phase_id
        switch (this.state.pageStatus) {
            case 'Project_New':
                return <ProjectNew
                        loggedInStatus={this.props.loggedInStatus}
                        company={this.props.company}
                        project_id={project_id}
                        />
            case 'Task_New':
                return <TaskNew
                        loggedInStatus={this.props.loggedInStatus}
                        company={this.props.company}
                        project_id={project_id}
                        phase_id={phase_id}
                        />
            case 'Prime_Contractor':
                return <PrimeNew
                        loggedInStatus={this.props.loggedInStatus}
                        company={this.props.company}
                        togglePrime={this.togglePrime}
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
export default CreateController;