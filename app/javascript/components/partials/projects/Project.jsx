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
            <li>
                {(this.state.is_current_owner || this.state.is_current_prime)
                ? <Link to={`/create/project/${this.state.project.id}/phase`}>Add A Phase</Link>
                : null}
            </li>
        )
    }

    addATask(phase_id) {
        return (
            <li>
                {(this.state.is_current_owner || this.state.is_current_prime)
                ? <Link to={`/create/project/${this.state.project.id}/phase/${phase_id}/task`}>Add A Task</Link>
                : null}
            </li>
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
            <article>
                <h2>{name}</h2>
                <cite><Link to={`/company/${api_v1_company.id}`}>{owner}</Link></cite>
                <p>{location}</p>
                <p>{budget}</p>
                <p>{start_date}</p>
                <p>{turnover_date}</p>
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
                <ul>
                    <li>Phases</li>
                    {this.state.dataLoaded && this.addAPhase()}
                    <li>
                    {phases.length > 0 
                    ? phases.map(el => {
                        return (
                            <ul key={el.id}>
                                <li>{el.title}</li>
                                <li>Budget: {el.budget}</li>
                                <li><p>Description: {el.description}</p></li>
                                <li>{el.start_date}</li>
                                <li>{el.turnover_date}</li>
                                <li>Status: {el.is_done
                                        ? `Completed • ${el.updated}` 
                                        : 'Incomplete'}
                                </li>
                                {(this.state.is_current_owner || this.state.is_current_prime)
                                    ? <ToggleIsDone
                                        parentType='Phase'
                                        is_done={el.is_done}
                                        fireReload={this.fireReload}
                                        project_id={id}
                                        phase_id={el.id}
                                        />
                                    : null}
                                <li>Tasks</li>
                                {this.state.dataLoaded && this.addATask(el.id)}
                                <li>
                                    {el.tasks.length > 0 ? el.tasks.map(task => (
                                        <ul key={task.id}>
                                            <li><Link to={`/project/${id}/phase/${el.id}/task/${task.id}`}>{task.title}</Link></li>
                                            <li>{task.budget}</li>
                                            <li>{task.description}</li>
                                            <li>{task.start_date}</li>
                                            <li>{task.turnover_date}</li>
                                            <li>Status: {task.is_done
                                                        ? `Completed • ${task.updated}`
                                                        : 'Incomplete'}
                                            </li>
                                            {(task.sub_contractor && (this.state.is_current_owner || this.state.is_current_prime))
                                                ? <ToggleIsDone
                                                    parentType='Task'
                                                    is_done={task.is_done}
                                                    fireReload={this.fireReload}
                                                    project_id={id}
                                                    phase_id={el.id}
                                                    task_id={task.id}
                                                    />
                                                : null}
                                            <li>Sub Contractor</li>
                                            <li>
                                                {task.sub_contractor
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
                                                    phase={el}
                                                    task={task}
                                                    addedContract={this.addedContract}
                                                    company={this.props.company}
                                                />
                                                : <span>No Subcontract</span>}
                                            </li>
                                        </ul>
                                    )) : <span>No Tasks</span>}
                                </li>
                            </ul>
                        )
                    }) : <span>No Phases</span>}
                    </li>
                </ul>
            </article>
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