import React, { Component } from "react"
import { Link } from "react-router-dom"

import PrimeContractNew from "./create/PrimeContractNew"
import SubContractNew from "./create/SubContractNew"
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
    }

    componentDidMount() {
        let id = this.props.project_id
        fetch(`/api/v1/projects/${id}`)
        .then(res => res.json())
        .then(res => {
            // console.log('fetching', res)
            this.setState({
                project: res.results,
                dataLoaded: true
            })
            if (this.props.loggedInStatus === 'LOGGED_IN') {
                if (this.props.company.id === this.state.project.api_v1_company.id) {
                    this.setState({ is_current_owner: true })
                }
                if (this.state.project.prime_contractor) {
                    if (this.state.project.prime_contractor.id === this.props.company.id) {
                        this.setState({ is_current_prime: true })
                    }
                }
                if (this.state.project.phases) {
                    this.state.project.phases.map(phase => {
                        if (phase.tasks) {
                            phase.tasks.map(task => {
                                if (task.sub_contractor) {
                                    if (task.sub_contractor.id === this.props.company.id) {
                                        this.setState({ is_current_sub: true })
                                    }
                                }
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
                ? <Link to={`/create/project/${this.state.project.id}/phase`}>Add A Phase</Link>
                : null}
            </p>
        )
    }

    addATask(phase_id) {
        return (
            <p>
                {(this.state.is_current_owner || this.state.is_current_prime)
                ? <Link to={`/create/project/${this.state.project.id}/phase/${phase_id}/task`}>Add A Task</Link>
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
            // console.log('fetching', res)
            this.setState({
                project: res.results,
                dataLoaded: true
            })
        })
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
                                <p>Delete This Project?</p>
                            </div>
                            : null}
                    </aside>
                    <div>
                        <h2>{name}</h2>
                        <cite><Link to={`/company/${api_v1_company.id}`}>{owner}</Link></cite>
                        <p>Address: {location}</p>
                        <p>Start Date: {start_date}</p>
                        <p>Turnover Date: {turnover_date}</p>
                    </div>
                    <aside>
                        <div>
                            <p>Status: {is_done
                                    ? `Completed • ${updated}`
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
                <article>
                    {phases.length > 0
                        ? <h3>Phases</h3>
                        : null}
                    <ol>
                        {phases.length > 0
                            ? phases.map(phase => {
                                return (
                                    <li key={phase.id}>
                                        <div>
                                            <h4>{phase.title}</h4>
                                            <div>
                                                <p>Description: {phase.description}</p>
                                                <p>Start Date: {phase.start_date}</p>
                                                <p>Turnover Date: {phase.turnover_date}</p>
                                                <p>Budget: {phase.budget}</p>
                                                <p>Status: {phase.is_done
                                                    ? `Completed • ${phase.updated}` 
                                                    : 'Incomplete'}
                                                </p>
                                                {(this.state.is_current_owner
                                                    || this.state.is_current_prime)
                                                    ? <ToggleIsDone
                                                        parentType='Phase'
                                                        is_done={phase.is_done}
                                                        fireReload={this.fireReload}
                                                        project_id={id}
                                                        phase_id={phase.id}
                                                        />
                                                    : null}
                                                <div>
                                                    {phase.tasks.length > 0
                                                        ? <h4>Tasks</h4>
                                                        : null}
                                                    <ol>
                                                        {phase.tasks.length > 0
                                                            ? phase.tasks.map(task => {
                                                                return (
                                                                    <li key={task.id}>
                                                                        <h4>
                                                                            <Link to={`/project/${id}/phase/${phase.id}/task/${task.id}`}>
                                                                                {task.title}
                                                                            </Link>
                                                                        </h4>
                                                                        <div>
                                                                            <p>Description: {task.description}</p>
                                                                            <p>Start Date: {task.start_date}</p>
                                                                            <p>Turnover Date: {task.turnover_date}</p>
                                                                            <p>Budget: {task.budget}</p>
                                                                            <p>Status: {task.is_done
                                                                                ? `Completed • ${task.updated}`
                                                                                : 'Incomplete'}
                                                                            </p>
                                                                            {(task.sub_contractor)
                                                                                ? <ul>
                                                                                    <li><Link to={`/company/${task.sub_contractor.id}`}>{task.sub_contractor.name}</Link></li>
                                                                                    <li>{task.sub_contractor.address}</li>
                                                                                    <li>{task.sub_contractor.phone}</li>
                                                                                    <li>
                                                                                        <h5>Sub Contract</h5>
                                                                                        <p>Total: {task.subcontracts.amount}</p>
                                                                                    </li>
                                                                                </ul>
                                                                                : (this.props.loggedInStatus === 'LOGGED_IN')
                                                                                ? <SubContractNew
                                                                                    project={this.state.project}
                                                                                    phase={phase}
                                                                                    task={task}
                                                                                    addedContract={this.addedContract}
                                                                                    company={this.props.company}
                                                                                />
                                                                                : <span>No Subcontract</span>}
                                                                            {(task.sub_contractor && (this.state.is_current_owner || this.state.is_current_prime))
                                                                                ? <ToggleIsDone
                                                                                    parentType='Task'
                                                                                    is_done={task.is_done}
                                                                                    fireReload={this.fireReload}
                                                                                    project_id={id}
                                                                                    phase_id={phase.id}
                                                                                    task_id={task.id}
                                                                                    />
                                                                                : null}
                                                                            delete option
                                                                        </div>
                                                                    </li>
                                                                )
                                                            })
                                                            : null}
                                                    </ol>
                                                </div>
                                            </div>
                                            <div>
                                                {this.addATask(phase.id)}
                                                delete phase
                                            </div>
                                        </div>
                                    </li>
                                )
                            })
                            : null}
                    </ol>
                </article>
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