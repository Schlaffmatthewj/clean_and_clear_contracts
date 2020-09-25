import React, { Component } from "react"
import { Link } from "react-router-dom"

import SubContractNew from "./create/SubContractNew"
import ToggleIsDone from "./forms/ToggleIsDone"

export default class PhaseTasks extends Component {
    constructor(props) {
        super(props)    
    }

    render() {
        return (
            <div>
                {this.props.phase.tasks.length > 0
                    ? <h4>Tasks</h4>
                    : null}
                <ol>
                    {this.props.phase.tasks.length > 0
                        ? this.props.phase.tasks.map(task => {
                            return (
                                <li key={task.id}>
                                    <h4>
                                        <Link to={`/project/${this.props.project_id}/phase/${this.props.phase.id}/task/${task.id}`}>
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
                                                project={this.props.project}
                                                phase={this.props.phase}
                                                task={task}
                                                addedContract={this.props.addedContract}
                                                company={this.props.company}
                                            />
                                            : <span>No Subcontract</span>}
                                        {(task.sub_contractor && (this.props.is_current_owner || this.props.is_current_prime))
                                            ? <ToggleIsDone
                                                parentType='Task'
                                                is_done={task.is_done}
                                                fireReload={this.props.fireReload}
                                                project_id={this.props.project_id}
                                                phase_id={this.props.phase.id}
                                                task_id={task.id}
                                                />
                                            : null}
                                        {this.props.is_current_owner
                                            || this.props.is_current_prime
                                            ? <div>
                                                <p>Delete Task? • <span onClick={() => this.props.deleter('Task', this.props.project_id, this.props.phase.id, task.id)}>X</span></p>
                                                <Link to={{
                                                    pathname: '/edit',
                                                    state: {
                                                        project: this.props.project,
                                                        phase: this.props.phase,
                                                        task: task,
                                                        pageStatus: 'Task'
                                                    }
                                                }}>Edit Task? • 🛠️</Link>
                                            </div>
                                            : null}
                                    </div>
                                </li>
                            )
                        })
                        : null}
                </ol>
            </div>

        )
    }
}