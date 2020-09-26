import React, { Component } from "react"
import { Link } from "react-router-dom"

import PrimeContractNew from "./create/PrimeContractNew"
import ProjectPhases from "./ProjectPhases"
import ToggleIsDone from "./forms/ToggleIsDone"

class Project extends Component {
    constructor(props) {
        super(props)
        this.state = {
            project: null,
            is_current_owner: false,
            is_current_prime: false,
            is_current_sub: false,
            dataLoaded: false,
        }

        this.addedContract = this.addedContract.bind(this)
        this.fireReload = this.fireReload.bind(this)
        this.deleter = this.deleter.bind(this)
    }

    componentDidMount() {
        let id = this.props.project_id
        fetch(`/api/v1/projects/${id}`)
        .then(res => res.json())
        .then(res => {
            // console.log('fetching projects res', res)
            this.setState({
                project: res.results,
                dataLoaded: true
            })
            if (this.props.loggedInStatus === 'LOGGED_IN') {
                if (this.props.company.id === this.state.project.api_v1_company.id) this.setState({ is_current_owner: true })
                if (this.state.project.prime_contractor) if (this.state.project.prime_contractor.id === this.props.company.id) this.setState({ is_current_prime: true })
                if (this.state.project.phases) {
                    this.state.project.phases.map(phase => {
                        if (phase.tasks) {
                            phase.tasks.map(task => {
                                if (task.sub_contractor) if (task.sub_contractor.id === this.props.company.id) this.setState({ is_current_sub: true })
                            })
                        }
                    })
                }
            }
        })
    }

    addAPhase() {
        return (
            <p>
                {(this.state.is_current_owner || this.state.is_current_prime)
                ? <Link to={`/create/project/${this.state.project.id}/phase`}><button>Add A Phase • 👷</button></Link>
                : null}
            </p>
        )
    }

    checkPrime() {
        return (
            <div>
                {(this.props.loggedInStatus ===  'LOGGED_IN')
                ? (this.props.company.is_prime)
                ? <PrimeContractNew
                        project={this.state.project}
                        company={this.props.company}
                        addedContract={this.addedContract}
                    />
                : <Link to='/create/prime'>Request Prime Contractor Permissions</Link>
                : <p>No Prime Contractor</p> }
            </div>
        )
    }

    addedContract() {
        this.props.switchToProfile()
    }

    fireReload() {
        let id = this.props.project_id
        fetch(`/api/v1/projects/${id}`)
        .then(res => res.json())
        .then(res => {
            this.setState({
                project: res.results,
                dataLoaded: true
            })
        })
    }

    deleter(type, project_id, phase_id, task_id) {
        if (type === 'Project') {
            fetch(`/api/v1/projects/${project_id}`, {
                method: 'DELETE',
                credentials: 'include'
            }).then(() => this.props.switchToProfile())
        } else if (type === 'Phase') {
            fetch(`/api/v1/projects/${project_id}/phases/${phase_id}`, {
                method: 'DELETE',
                credentials: 'include'
            }).then(() => this.fireReload())
        } else if (type === 'Task') {
            fetch(`/api/v1/projects/${project_id}/phases/${phase_id}/tasks/${task_id}`, {
                method: 'DELETE',
                credentials: 'include'
            }).then(() => this.fireReload())
        }
    }

    conditionalRender() {
        const {
            id,
            name,
            owner,
            location,
            budget,
            prime_contract,
            prime_contractor,
            start_date,
            turnover_date,
            is_done,
            phases,
            api_v1_company,
            updated
        } = this.state.project
        let new_start = (new Date(start_date)).toLocaleDateString()
        let new_turn = (new Date(turnover_date)).toDateString()
        let new_update = (new Date(updated)).toDateString()
        // console.log(this.state.project)
        return (
            <section>
                <article>
                    <aside>
                        {prime_contractor
                            ? <div>
                                <h5>Prime Contractor</h5>
                                <h6><Link to={`/company/${prime_contractor.id}`}>{prime_contractor.name}</Link></h6>
                                <p>{prime_contractor.address}</p>
                                <p>{prime_contractor.phone}</p>
                                <div>
                                    <h5>Prime Contract</h5>
                                    <p>{prime_contract.amount}</p>
                                </div>
                            </div>
                            : this.checkPrime()}
                        'ADD You are Owner and Sub here'
                        {this.state.is_current_owner
                            ? <div>
                                <h6>You Own This Project</h6>
                                <button onClick={() => this.deleter('Project', id)}>Delete Project • 🗑️</button>
                                <Link to={{
                                    pathname: `/edit/project/${id}`,
                                    state: {
                                        project: this.state.project,
                                        pageStatus: 'Project'
                                    }
                                }}><button>Edit Project • 🛠️</button></Link>
                            </div>
                            : null}
                    </aside>
                    <div>
                        <h2>{name}</h2>
                        <cite><Link to={`/company/${api_v1_company.id}`}>{owner}</Link></cite>
                        <p>Address: {location}</p>
                        <p>Start Date: {new_start}</p>
                        <p>Turnover Date: {new_turn}</p>
                    </div>
                    <aside>
                        <div>
                            <p>Status: {is_done
                                    ? `Completed • ${new_update}`
                                    : 'Incomplete'}
                            </p>
                            {(prime_contractor && (this.state.is_current_owner || this.state.is_current_prime))
                                ? <ToggleIsDone
                                    parentType='Project'
                                    is_done={is_done}
                                    fireReload={this.fireReload}
                                    project_id={id}
                                    />
                                : null}
                        </div>
                        <p>{budget}</p>
                        {this.state.dataLoaded && this.addAPhase()}
                    </aside>
                </article>
                <ProjectPhases 
                loggedInStatus={this.props.loggedInStatus}
                project_id={id}
                project={this.state.project}
                phases={phases}
                is_current_owner={this.state.is_current_owner}
                is_current_prime={this.state.is_current_prime}
                fireReload={this.fireReload}
                addedContract={this.addedContract}
                deleter={this.deleter}
                company={this.props.company}
                />
            </section>
        )
    }

    render() {
        return (
            <main>
               {this.state.dataLoaded ? this.conditionalRender() : <p>Loading...</p>}
            </main>
        )
    }
}
export default Project;