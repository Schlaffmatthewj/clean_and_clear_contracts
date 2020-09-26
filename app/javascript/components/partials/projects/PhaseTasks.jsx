import React, { Component } from "react"
import { Link } from "react-router-dom"
import NumberFormat from 'react-number-format';

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
                            let new_start = (new Date(task.start_date)).toDateString()
                            let new_turn = (new Date(task.turnover_date)).toDateString()
                            let new_update = (new Date(task.updated)).toDateString()
                            return (
                                <li key={task.id}>
                                    <h4>
                                        <Link to={`/project/${this.props.project_id}/phase/${this.props.phase.id}/task/${task.id}`}>
                                            {task.title}
                                        </Link>
                                    </h4>
                                    <div>
                                        <p>Description: {task.description}</p>
                                        <p>Start Date: {new_start}</p>
                                        <p>Turnover Date: {new_turn}</p>
                                        <p>Task Budget: <NumberFormat
                                                            value={task.budget}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            prefix={'$'}
                                                        />
                                        </p>
                                        <p>Status: {task.is_done
                                            ? `Completed • ${new_update}`
                                            : 'Incomplete'}
                                        </p>
                                        {(task.sub_contractor)
                                            ? <ul>
                                                <li><Link to={`/company/${task.sub_contractor.id}`}>{task.sub_contractor.name}</Link></li>
                                                <li>{task.sub_contractor.address}</li>
                                                <li>{task.sub_contractor.phone}</li>
                                                <li>
                                                    <h5>Sub Contract</h5>
                                                    <p>Contract Amount: <NumberFormat
                                                                            value={task.subcontracts.amount}
                                                                            displayType={'text'}
                                                                            thousandSeparator={true}
                                                                            prefix={'$'}
                                                                        />
                                                    </p>
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
                                                <button onClick={() => this.props.deleter('Task', this.props.project_id, this.props.phase.id, task.id)}>Delete Task • 🗑️</button>
                                                <Link to={{
                                                    pathname: `/edit/task/${task.id}`,
                                                    state: {
                                                        project: this.props.project,
                                                        phase: this.props.phase,
                                                        task: task,
                                                        pageStatus: 'Task'
                                                    }
                                                }}><button>Edit Task • 🛠️</button></Link>
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