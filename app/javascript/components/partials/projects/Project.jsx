import React, { Component } from "react"
import { Link } from "react-router-dom"
import NumberFormat from 'react-number-format';

import PrimeContractNew from "./create/PrimeContractNew"
import ProjectPhases from "./ProjectPhases"
import ToggleIsDone from "./edit/ToggleIsDone"

class Project extends Component {
    constructor(props) {
        super(props)
        this.state = {
            project: null,
            is_current_owner: false,
            is_current_prime: false,
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
            if (res.status === 'not_found') {
                this.props.errorHandle()
                alert(`${res.error}`)
            } else {
                this.setState({
                    project: res.results,
                    dataLoaded: true
                })
            }
            if (this.props.loggedInStatus === 'LOGGED_IN') {
                if (this.props.company.id 
                    === this.state.project.api_v1_company.id) 
                    this.setState({ is_current_owner: true })
                if (this.state.project.prime_contractor) if (this.state.project.prime_contractor.id 
                                                            === this.props.company.id) 
                    this.setState({ is_current_prime: true })
            }
        })
        .catch(err => console.log(err))
    }

    addAPhaseAndToggleDone() {
        return (
            <div>
                {(this.state.is_current_owner
                    || this.state.is_current_prime)
                ? <div>
                    <Link to={`/create/project/${this.state.project.id}/phase`}><button>Add A Phase • 👷</button></Link>
                    <ToggleIsDone
                        parentType='Project'
                        is_done={this.state.project.is_done}
                        fireReload={this.fireReload}
                        project_id={this.state.project.id}
                    />
                </div>
                : null}
            </div>
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
                : <Link to='/create/prime'>
                    <button>
                        Request Prime Contractor Permissions • 🏗️
                    </button>
                </Link>
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
            if (res.status === 'not_found') {
                this.props.errorHandle()
                alert(`${res.error}`)
            } else {
                this.setState({
                    project: res.results,
                    dataLoaded: true
                })
            }
        })
        .catch(err => console.log(err))
    }

    deleter(type, project_id, phase_id, task_id) {
        if (type === 'Project') {
            fetch(`/api/v1/projects/${project_id}`, {
                method: 'DELETE',
                credentials: 'include'
            }).then(() => this.props.switchToProfile())
            .catch(err => console.log(err))
        } else if (type === 'Phase') {
            fetch(`/api/v1/projects/${project_id}/phases/${phase_id}`, {
                method: 'DELETE',
                credentials: 'include'
            }).then(() => this.fireReload())
            .catch(err => console.log(err))
        } else if (type === 'Task') {
            fetch(`/api/v1/projects/${project_id}/phases/${phase_id}/tasks/${task_id}`, {
                method: 'DELETE',
                credentials: 'include'
            }).then(() => this.fireReload())
            .catch(err => console.log(err))
        }
    }

    conditionalRender() {
        console.log('this.state.project', this.state.project)
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
            total_cost,
            prime_profits,
            project_profits,
            updated
        } = this.state.project
        let new_start = (new Date(start_date)).toLocaleDateString()
        let new_turn = (new Date(turnover_date)).toDateString()
        let new_update = (new Date(updated)).toDateString()
        return (
            <section className='project-task-container flex-column'>
                <article className='project-task-top'>
                    <aside className='project-task-top-left flex-column'>
                        {this.state.is_current_owner
                            ? <div>
                                <h4>You Own This Project</h4>
                                <button onClick={() => this.deleter('Project', id)}>
                                    Delete Project • 🗑️
                                </button>
                                <Link to={{
                                    pathname: `/edit/project/${id}`,
                                    state: {
                                        project: this.state.project,
                                        pageStatus: 'Project'
                                    }
                                }}><button>Edit Project • 🛠️</button></Link>
                            </div>
                            : <div>
                                <h4>Owner: 
                                    <Link to={`/company/${api_v1_company.id}`}>
                                        {owner}
                                    </Link>
                                </h4>
                            </div>}
                        <p>Project Budget: 
                            <NumberFormat
                                value={budget}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'$'}
                            />
                        </p>
                        <p>Project Over/Under: 
                            <NumberFormat
                                value={project_profits}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'$'}
                            />
                        </p>
                        {this.addAPhaseAndToggleDone()}
                    </aside>
                    <div className='project-task-details'>
                        <h2>{name}</h2>
                        <h2>Owner: 
                            <Link to={`/company/${api_v1_company.id}`}>
                                {owner}
                            </Link>
                        </h2>
                        <p>Address: {location}</p>
                        <p>Start Date: {new_start}</p>
                        <p>Turnover Date: {new_turn}</p>
                        <p>Status: {is_done
                            ? `Completed • ${new_update}`
                            : 'Incomplete'}
                        </p>
                    </div>
                    <aside className='project-task-top-right flex-column'>
                    {prime_contractor
                        ? <div>
                            <h5>Prime Contractor: 
                                <Link to={`/company/${prime_contractor.id}`}>
                                    {prime_contractor.name}
                                </Link>
                            </h5>
                            <p>Address: {prime_contractor.address}</p>
                            <p>Phone: {prime_contractor.phone}</p>
                            <div>
                                <h5>Prime Contract</h5>
                                <p>Contract Amount: 
                                    <NumberFormat
                                        value={prime_contract.amount}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                    />
                                </p>
                                <p>Prime Contract Profits: 
                                    <NumberFormat
                                        value={prime_profits}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                    />

                                </p>
                                <p>Total Cost: 
                                    <NumberFormat
                                        value={total_cost}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                    />
                                </p>
                            </div>
                        </div>
                        : this.checkPrime()}
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
            <main className='project-task-container flex-column'>
               {this.state.dataLoaded
                ? this.conditionalRender()
                : <p>Loading...</p>}
            </main>
        )
    }
}
export default Project;