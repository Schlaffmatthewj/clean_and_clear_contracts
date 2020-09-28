import React, { Component } from "react"
import { Link } from "react-router-dom"
import NumberFormat from 'react-number-format';

import ToggleIsDone from "./edit/ToggleIsDone"
import PrimeContractNew from "./create/PrimeContractNew"
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
        this.addedContract = this.addedContract.bind(this)
    }

    componentDidMount() {
        let project_id = this.props.project_id
        let phase_id = this.props.phase_id
        let id = this.props.task_id
        fetch(`/api/v1/projects/${project_id}/phases/${phase_id}/tasks/${id}`)
        .then(res => res.json())
        .then(res => { 
            if (res.status === 'not_found') {
                this.props.errorHandle()
                alert(`${res.error}`)
            } else {
                this.setState({
                    task: res.results,
                    dataLoaded: true
                })
            }
            if (this.props.loggedInStatus === 'LOGGED_IN') {
                if (this.props.company.id
                    === this.state.task.project.api_v1_company_id) 
                        this.setState({ is_current_owner: true })
                if (this.state.task.prime_contractor) {
                    if (this.state.task.prime_contractor.id
                        === this.props.company.id) 
                            this.setState({ is_current_prime: true })
                }
                if (this.state.task.sub_contractor) {
                    if (this.state.task.sub_contractor.id
                        === this.props.company.id) 
                            this.setState({ is_current_sub: true })
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
                if (res.status === 'not_found') {
                    this.props.errorHandle()
                    alert(`${res.error}`)
                } else {
                    this.setState({
                        task: res.results,
                        dataLoaded: true
                    })
                }
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
            if (res.status === 'not_found') {
                this.props.errorHandle()
                alert(`${res.error}`)
            } else {
                this.setState({
                    task: res.results,
                    dataLoaded: true
                })
            }
        })
        .catch(err => console.log(err))
    }

    addedContract() {
        this.props.switchToProfile()
    }

    conditionalRender() {
        const {
            task
        } = this.state
        let new_start = (new Date(task.start_date)).toDateString()
        let new_turn = (new Date(task.turnover_date)).toDateString()
        let new_update = (new Date(task.updated)).toDateString()
        return (
            <section className='project-task-container flex-column'>
                <article className='project-task-content flex-column'>
                    <div className='task-details'>
                        <h2>Project: 
                            <Link to={`/project/${task.project.id}`}>
                                {task.project.name}
                            </Link>
                        </h2>
                        <h2>Owner: 
                            <Link to={`/company/${task.project.api_v1_company_id}`}>
                                {task.project.owner}
                            </Link>
                        </h2>
                        {task.prime_contractor
                            ? <h2>Prime Contractor: 
                                <Link to={`/company/${task.prime_contractor.id}`}>
                                    {task.prime_contractor.name}
                                </Link>
                            </h2> 
                            : <p>No Prime Contractor</p>}
                        <h3>Task: {task.title}</h3>
                        <p>Description: {task.description}</p>
                        <p>Start Date: {new_start}</p>
                        <p>Turnover Date: {new_turn}</p>
                        <p>Status: {task.is_done
                                ? `Completed • ${new_update}`
                                : 'Incomplete'}
                        </p>
                    </div>
                    {task.sub_contractor && (this.state.is_current_owner
                                        || this.state.is_current_prime
                                        || this.state.is_current_sub )
                        ? <ToggleIsDone
                            parentType='Task'
                            is_done={this.state.task.is_done}
                            fireReload={this.fireReload}
                            project_id={this.props.project_id}
                            phase_id={this.props.phase_id}
                            task_id={this.props.task_id}
                        />
                        : null}
                    <div className='task-numbers'>
                        <p>Task Budget: 
                            <NumberFormat
                                value={task.budget}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'$'}
                            />
                        </p>
                        <p>Task Over/Under: 
                            <NumberFormat
                                value={task.task_profits}
                                displayType={'text'}
                                thousandSeparator={true}
                                prefix={'$'}
                            />
                        </p>
                    </div>
                    {task.sub_contractor
                        ? <div className='task-sub'>
                            <p>Sub Contractor</p>
                            <p>
                                <Link to={`/company/${task.sub_contractor.id}`}>
                                    {task.sub_contractor.name}
                                </Link>
                            </p>
                            <p>{task.sub_contractor.address}</p>
                            <p>{task.sub_contractor.phone}</p>
                            <div>
                                <h5>Sub Contract</h5>
                                <p>Contract Amount: 
                                    <NumberFormat
                                        value={task.subcontract.amount}
                                        displayType={'text'}
                                        thousandSeparator={true}
                                        prefix={'$'}
                                    />
                                </p>
                            </div>
                        </div> 
                        : (this.props.loggedInStatus === 'LOGGED_IN')
                            ? <SubContractNew
                                task={this.state.task}
                                addedContract={this.addedContract}
                                company={this.props.company}
                            />
                            : <p>No Sub Contractor</p>}
                </article>
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
export default Task;