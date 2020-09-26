import React, { Component } from "react"
import { Link } from "react-router-dom"
import NumberFormat from 'react-number-format';

import PhaseTasks from "./PhaseTasks"
import ToggleIsDone from "./forms/ToggleIsDone"

export default class ProjectPhases extends Component {
    constructor(props) {
        super(props)    
    }

    addATaskAndEditPhase(phase) {
        return (
            <div>
                {(this.props.is_current_owner || this.props.is_current_prime)
                ? <div>
                    <ToggleIsDone
                        parentType='Phase'
                        is_done={phase.is_done}
                        fireReload={this.props.fireReload}
                        project_id={this.props.project_id}
                        phase_id={phase.id}
                    />
                    <button
                        onClick={() => this.props.deleter('Phase', this.props.project_id, phase.id)}>
                            Delete Phase • 🗑️
                    </button>
                    <Link to={{
                        pathname: `/edit/phase/${phase.id}`,
                        state: {
                            project: this.props.project,
                            phase: phase,
                            pageStatus: 'Phase'
                        }
                    }}><button>Edit Phase • 🛠️</button></Link>
                    <Link to={`/create/project/${this.props.project_id}/phase/${phase.id}/task`}>
                        <button>Add A Task • 👷</button>
                    </Link>
                </div>
                : null}
            </div>
        )
    }

    render() {
        return (
            <article>
                {this.props.phases.length > 0
                    ? <article>
                        <h3>Phases</h3>
                        <ol>
                            {this.props.phases.map(phase => {
                                let new_start = (new Date(phase.start_date)).toDateString()
                                let new_turn = (new Date(phase.turnover_date)).toDateString()
                                let new_update = (new Date(phase.updated)).toDateString()
                                return (
                                    <li key={phase.id}>
                                        <h4>{phase.title}</h4>
                                        <div>
                                            <p>Description: {phase.description}</p>
                                            <p>Start Date: {new_start}</p>
                                            <p>Turnover Date: {new_turn}</p>
                                            <p>Status: {phase.is_done
                                                ? `Completed • ${new_update}` 
                                                : 'Incomplete'}
                                            </p>
                                            <p>Phase Budget: <NumberFormat
                                                                value={phase.budget}
                                                                displayType={'text'}
                                                                thousandSeparator={true}
                                                                prefix={'$'}
                                                            />
                                            </p>
                                            <p>Total Cost: <NumberFormat
                                                                value={phase.total_cost}
                                                                displayType={'text'}
                                                                thousandSeparator={true}
                                                                prefix={'$'}
                                                            />
                                            </p>
                                            <p>Phase Over/Under: <NumberFormat
                                                                value={phase.phase_profits}
                                                                displayType={'text'}
                                                                thousandSeparator={true}
                                                                prefix={'$'}
                                                            />
                                            </p>
                                            {this.addATaskAndEditPhase(phase)}
                                            <PhaseTasks
                                                is_current_prime={this.props.is_current_prime}
                                                is_current_owner={this.props.is_current_owner}
                                                is_current_sub={this.props.is_current_sub}
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
                                    </li>
                                )
                            })}
                        </ol>
                    </article>
                : null }
            </article>
        )
    }
}