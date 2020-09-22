import React, { Component } from "react"
import { Link } from "react-router-dom"

class ProjectController extends Component {
    constructor(props) {
        super(props)
        this.state = {
            project: null,
            dataLoaded: false,
        }
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
        })
    }

    conditionalRender() {
        return (
            <article>
                <h2>{this.state.project.name}</h2>
                <cite>{this.state.project.owner}</cite>
                <p>{this.state.project.location}</p>
                <p>{this.state.project.budget}</p>
                <p>{this.state.project.prime_contractor}</p>
                <p>{this.state.project.prime_contract}</p>
                <p>{this.state.project.start_date}</p>
                <p>{this.state.project.turnover_date}</p>
                <p>Completed: {this.state.project.is_done ? 'Completed' : 'Incomplete'}</p>
                <ul>
                    <li>Phases</li>
                    <li>
                    {this.state.project.phases.length > 0 
                    ? this.state.project.phases.map(el => {
                        return (
                            <ul key={el.id}>
                                <li>{el.title}</li>
                                <li>Budget: {el.budget}</li>
                                <li><p>Description: {el.description}</p></li>
                                <li>{el.start_date}</li>
                                <li>{el.turnover_date}</li>
                                <li>Completed: {el.is_done ? 'Completed' : 'Incomplete'}</li>
                                <li>
                                    Tasks: {el.tasks.length > 0 ? el.tasks.map(task => (
                                        <ul key={task.id}>
                                            <li><Link to={`/project/${this.state.project.id}/phase/${el.id}/task/${task.id}`}>{task.title}</Link></li>
                                            <li>{task.budget}</li>
                                            <li>{task.description}</li>
                                            <li>{task.start_date}</li>
                                            <li>{task.turnover_date}</li>
                                            <li>Completed: {task.is_done ? 'Completed' : 'Incomplete'}</li>
                                            <li>
                                                <h5>Sub Contractor</h5>
                                                <ul>
                                                    <li><Link to={`/company/${task.sub_contractor.id}`}>{task.sub_contractor.name}</Link></li>
                                                    <li>{task.sub_contractor.address}</li>
                                                    <li>{task.sub_contractor.phone}</li>
                                                </ul>
                                            </li>
                                            <li>
                                                <h5>Sub Contract</h5>
                                                <ul>
                                                    <li>Total: {task.subcontracts.amount}</li>
                                                </ul>
                                            </li>
                                        </ul>
                                    )) : <span>No Tasks</span>}
                                </li>
                            </ul>
                        )
                    }) : <li>No Phases</li>}
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
export default ProjectController;