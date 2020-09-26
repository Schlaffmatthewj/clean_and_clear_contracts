import React, { Component } from "react"
import { Link } from "react-router-dom"

import PhaseTasks from "./PhaseTasks"
import ToggleIsDone from "./forms/ToggleIsDone"

export default class ProjectPhases extends Component {
    constructor(props) {
        super(props)    
    }

    addATask(phase_id) {
        return (
            <p>
                {(this.props.is_current_owner || this.props.is_current_prime)
                ? <Link to={`/create/project/${this.props.project_id}/phase/${phase_id}/task`}><button>Add A Task • 👷</button></Link>
                : null}
            </p>
        )
    }

    render() {
        return (
            <article>
                {this.props.phases.length > 0
                    ? <h3>Phases</h3>
                    : null}
                <ol>
                    {this.props.phases.length > 0
                        ? this.props.phases.map(phase => {
                            let new_start = (new Date(phase.start_date)).toDateString()
                            let new_turn = (new Date(phase.turnover_date)).toDateString()
                            let new_update = (new Date(phase.updated)).toDateString()
                            return (
                                <li key={phase.id}>
                                    <div>
                                        <h4>{phase.title}</h4>
                                        <div>
                                            <p>Description: {phase.description}</p>
                                            <p>Start Date: {new_start}</p>
                                            <p>Turnover Date: {new_turn}</p>
                                            <p>Budget: {phase.budget}</p>
                                            <p>Status: {phase.is_done
                                                ? `Completed • ${new_update}` 
                                                : 'Incomplete'}
                                            </p>
                                            {(this.props.is_current_owner
                                                || this.props.is_current_prime)
                                                ? <ToggleIsDone
                                                    parentType='Phase'
                                                    is_done={phase.is_done}
                                                    fireReload={this.props.fireReload}
                                                    project_id={this.props.project_id}
                                                    phase_id={phase.id}
                                                    />
                                                : null}
                                            <PhaseTasks
                                            is_current_prime={this.props.is_current_prime}
                                            is_current_owner={this.props.is_current_owner}
                                            loggedInStatus={this.props.loggedInStatus}
                                            phase={phase}
                                            project_id={this.props.project_id}
                                            project={this.props.project}
                                            addedContract={this.props.addedContract}
                                            company={this.props.company}
                                            fireReload={this.props.fireReload}
                                            deleter={this.props.deleter}
                                            />
                                        </div>
                                        <div>
                                            {this.addATask(phase.id)}
                                            {this.props.is_current_owner
                                                || this.props.is_current_prime
                                                ? <div>
                                                    <button onClick={() => this.props.deleter('Phase', this.props.project_id, phase.id)}>Delete Phase • 🗑️</button>
                                                    <Link to={{
                                                        pathname: `/edit/phase/${phase.id}`,
                                                        state: {
                                                            project: this.props.project,
                                                            phase: phase,
                                                            pageStatus: 'Phase'
                                                        }
                                                    }}><button>Edit Phase • 🛠️</button></Link>
                                                </div>
                                                : null}
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                        : null}
                </ol>
            </article>
        )
    }
}