import React, { Component } from "react"
import { Link } from "react-router-dom"

import ToggleIsDone from "../projects/forms/ToggleIsDone"
import SubContractNew from "./create/SubContractNew"
import PrimeContractNew from "./create/PrimeContractNew"

class Task extends Component {
    constructor(props) {
        super(props)
        this.state = {
            task: null,
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
            console.log('fetching', res)
            this.setState({
                task: res.results,
                dataLoaded: true
            })
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps.company.is_prime !== this.props.company.is_prime) {
            let project_id = this.props.project_id
            let phase_id = this.props.phase_id
            let id = this.props.task_id
            fetch(`/api/v1/projects/${project_id}/phases/${phase_id}/tasks/${id}`)
            .then(res => res.json())
            .then(res => {
                // console.log('fetching', res)
                this.setState({
                    task: res.results,
                    dataLoaded: true
                })
            })
        }
    }

    fireReload() {
        let project_id = this.props.project_id
        let phase_id = this.props.phase_id
        let id = this.props.task_id
        fetch(`/api/v1/projects/${project_id}/phases/${phase_id}/tasks/${id}`)
        .then(res => res.json())
        .then(res => {
            // console.log('fetching', res)
            this.setState({
                task: res.results,
                dataLoaded: true
            })
        })
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

    isPrimeOrOwner() {
        return (
            <div>
                {/* {(this.props.loggedInStatus === 'LOGGED_IN')
                ? (this.company.id === this.)} */}
            </div>
        )
    }

    conditionalRender() {
        // console.log('state from task', this.state.task)
        const {
            task
        } = this.state
        return (
            <article>
                <h2>Owner: <Link to={`/company/${task.project.api_v1_company_id}`}>{task.project.owner}</Link></h2>
                <h2>Project: <Link to={`/project/${task.project.id}`}>{task.project.name}</Link></h2>
                {task.prime_contractor
                    ? <h2>Prime Contractor: <Link to={`/company/${task.prime_contractor.id}`}>{task.prime_contractor.name}</Link></h2> 
                    : this.checkPrime() }
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>{task.budget}</p>
                <p>{task.start_date}</p>
                <p>{task.turnover_date}</p>
                <p>Status: {task.is_done
                        ? `Completed • ${task.updated}`
                        : 'Incomplete'}
                </p>
                {this.isPrimeOrOwner()}
                <ul>
                    <li>Sub Contractor</li>
                        {task.sub_contractor ? <ul>
                            <li>
                                <Link to={`/company/${task.sub_contractor.id}`}>
                                {task.sub_contractor.name}
                                </Link>
                            </li>
                            <li>{task.sub_contractor.address}</li>
                            <li>{task.sub_contractor.phone}</li>
                            <li>
                                <h5>Sub Contract</h5>
                                <p>Total: {task.subcontract.amount}</p>
                            </li>
                        </ul> : <span>No Subcontractor</span>}
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
export default Task;