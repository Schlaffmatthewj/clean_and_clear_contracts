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
                ? <Link to={`/create/project/${this.props.project_id}/phase/${phase_id}/task`}>Add A Task</Link>
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
                                            phase={phase}
                                            project_id={this.props.project_id}
                                            project={this.props.project}
                                            addedContract={this.props.addedContract}
                                            company={this.props.company}
                                            fireReload={this.props.fireReload}
                                            />
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
        )
    }
}