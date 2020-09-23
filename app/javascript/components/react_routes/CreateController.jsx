import React, { Component } from "react"

import OwnerNew from "../partials/auth/OwnerNew"
import PhaseNew from "../partials/projects/PhaseNew"
import PrimeNew from "../partials/auth/PrimeNew"
import ProjectNew from "../partials/projects/ProjectNew"
import TaskNew from "../partials/projects/TaskNew"

class CreateController extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pageStatus: '',
            dataLoaded: false
        }

        this.togglePrimeOrOwner = this.togglePrimeOrOwner.bind(this)
        this.successfulPhaseOrTask = this.successfulPhaseOrTask.bind(this)
        this.primeContract = this.primeContract.bind(this)
        this.subContract = this.subContract.bind(this)
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

    togglePrimeOrOwner(company_id) {
        this.props.history.push(`/profile/${company_id}`)
    }

    subContract() {
        // may need to take in data
    }

    primeContract(data) {
        // console.log(data)
        let project_id = data.id
        let company_id = this.props.company.id
        let contract = {
            api_v1_prime_contract: {
                api_v1_company_id: company_id,
                api_v1_project_id: project_id,
                amount: amount  // MAKE SURE THIS DOES NOT EXCEED 10% OF PROJECT BUDGET
            }
        }
        fetch(`/api/v1/companies/${company_id}/projects/${project_id}/prime_contracts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contract),
            credentials: 'include'
        })
        .then(res => res.json())
        .then(() => {
            this.props.history.push(`/project/${data.id}`)
        })
    }

    successfulPhaseOrTask(id) {
        // <Redirect push to={`/project/${id}`} />
        this.props.history.push(`/project/${id}`)  // NEED TO UNDERSTAND MORE ABOUT HOW TO UPDATE OR REDIRECT
    }

    conditionalRender() {
        let project_id = this.props.match.params.project_id
        let phase_id = this.props.match.params.phase_id
        switch (this.state.pageStatus) {
            case 'Project_New':
                return <ProjectNew
                        loggedInStatus={this.props.loggedInStatus}
                        company={this.props.company}
                        />
            case 'Phase_New':
                return <PhaseNew
                        loggedInStatus={this.props.loggedInStatus}
                        company={this.props.company}
                        project_id={project_id}
                        successfulPhaseOrTask={this.successfulPhaseOrTask}
                        />
            case 'Task_New':
                return <TaskNew
                        loggedInStatus={this.props.loggedInStatus}
                        company={this.props.company}
                        project_id={project_id}
                        phase_id={phase_id}
                        successfulPhaseOrTask={this.successfulPhaseOrTask}
                        />
            case 'Prime_Contractor':
                return <PrimeNew
                        loggedInStatus={this.props.loggedInStatus}
                        company={this.props.company}
                        togglePrimeOrOwner={this.togglePrimeOrOwner}
                        />
            case 'Property_Owner':
                return <OwnerNew
                        loggedInStatus={this.props.loggedInStatus}
                        company={this.props.company}
                        togglePrimeOrOwner={this.togglePrimeOrOwner}
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