import React, { Component } from "react"
import { Link } from "react-router-dom"
import NumberFormat from 'react-number-format';

import ToggleIsDone from "./edit/ToggleIsDone"
import SubContractNew from "./create/SubContractNew"

class Task extends Component {
    constructor(props) {
        super(props)
        this.state = {
            task: null,
            is_current_owner: false,
            is_current_prime: false,
            is_current_sub: false,
            dataLoaded: false
        }

        this.fireReload = this.fireReload.bind(this)
    }

    componentDidMount() {
        let project_id = this.props.project_id
        let phase_id = this.props.phase_id
        let id = this.props.task_id
        fetch(`/api/v1/projects/${project_id}/phases/${phase_id}/tasks/${id}`)
        .then(res => res.json())
        .then(res => {
            this.setState({
                task: res.results,
                dataLoaded: true
            })
            if (this.props.loggedInStatus === 'LOGGED_IN') {
                if (this.props.company.id === this.state.task.project.api_v1_company_id) {
                    this.setState({ is_current_owner: true })
                }
                if (this.state.task.prime_contractor) {
                    if (this.state.task.prime_contractor.id === this.props.company.id) {
                        this.setState({ is_current_prime: true })
                    }
                }
                if (this.state.task.sub_contractor) {
                    if (this.state.task.sub_contractor.id === this.props.company.id) {
                        this.setState({ is_current_sub: true })
                    }
                }
            }
        })
        .catch(err => console.log(err))
    }

    componentDidUpdate(prevProps) {
        if (prevProps.company.is_prime !== this.props.company.is_prime) {
            let project_id = this.props.project_id
            let phase_id = this.props.phase_id
            let id = this.props.task_id
            fetch(`/api/v1/projects/${project_id}/phases/${phase_id}/tasks/${id}`)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    task: res.results,
                })
            })
            .catch(err => console.log(err))
        }
    }

    fireReload() {
        let project_id = this.props.project_id
        let phase_id = this.props.phase_id
        let id = this.props.task_id
        fetch(`/api/v1/projects/${project_id}/phases/${phase_id}/tasks/${id}`)
        .then(res => res.json())
        .then(res => {
            this.setState({
                task: res.results,
            })
        })
        .catch(err => console.log(err))
    }

    addedContract() {
        this.props.switchToProfile()
    }

    checkPrime() {
        return (
            <div>
                {(this.props.loggedInStatus ===  'LOGGED_IN')
                ? (this.props.company.is_prime)
                    ? <PrimeContractNew
                            project={this.state.task.project}
                            company={this.props.company}
                            addedContract={this.addedContract}
                        />
                    : <Link to='/create/prime'>Request Prime Contractor Permissions</Link>
                : <p>No Prime Contractor</p> }
            </div>
        )
    }

    checkSub() {
        return (
            <div>
                {(this.props.loggedInStatus === 'LOGGED_IN')
                ? <SubContractNew
                    task={this.state.task}
                    addedContract={this.addedContract}
                    company={this.props.company}
                />
                : <p>No Sub Contractor</p>}
            </div>
        )
    }

    isPrimeOrOwner() {
        return (
            <div>
                {(this.state.is_current_owner || this.state.is_current_prime || this.state.is_current_sub )
                ? <ToggleIsDone
                    parentType='Task'
                    is_done={this.state.task.is_done}
                    fireReload={this.fireReload}
                    project_id={this.props.project_id}
                    phase_id={this.props.phase_id}
                    task_id={this.props.task_id}
                />
                : null}
            </div>
        )
    }

    conditionalRender() {
        const {
            task
        } = this.state
        let new_start = (new Date(task.start_date)).toDateString()
        let new_turn = (new Date(task.turnover_date)).toDateString()
        let new_update = (new Date(task.updated)).toDateString()
        return (
            <article>
                {/* THIS IS RATHER UGLY FIX THAT */}
                <h2>Owner: <Link to={`/company/${task.project.api_v1_company_id}`}>{task.project.owner}</Link></h2>
                <h2>Project: <Link to={`/project/${task.project.id}`}>{task.project.name}</Link></h2>
                {task.prime_contractor
                    ? <h2>Prime Contractor: <Link to={`/company/${task.prime_contractor.id}`}>{task.prime_contractor.name}</Link></h2> 
                    : this.checkPrime() }
                <h3>{task.title}</h3>
                <p>Description: {task.description}</p>
                <p>Task Budget: <NumberFormat
                                    value={task.budget}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                />
                </p>
                <p>Task Over/Under: <NumberFormat
                                    value={task.task_profits}
                                    displayType={'text'}
                                    thousandSeparator={true}
                                    prefix={'$'}
                                />
                </p>
                <p>Start Date: {new_start}</p>
                <p>Turnover Date: {new_turn}</p>
                <p>Status: {task.is_done
                        ? `Completed • ${new_update}`
                        : 'Incomplete'}
                </p>
                {task.sub_contractor && this.isPrimeOrOwner()}
                <div>
                    <p>Sub Contractor</p>
                    {task.sub_contractor
                        ? <div>
                            <p>
                                <Link to={`/company/${task.sub_contractor.id}`}>
                                {task.sub_contractor.name}
                                </Link>
                            </p>
                            <p>{task.sub_contractor.address}</p>
                            <p>{task.sub_contractor.phone}</p>
                            <div>
                                <h5>Sub Contract</h5>
                                <p>Contract Amount: <NumberFormat
                                                        value={task.subcontract.amount}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        prefix={'$'}
                                                    />
                                </p>
                            </div>
                        </div> 
                        : this.checkSub()}
                </div>
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
export default Task;