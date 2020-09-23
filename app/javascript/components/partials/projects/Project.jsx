import React, { Component } from "react"
import { Link } from "react-router-dom"

class Project extends Component {
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
            console.log('fetching', res)
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
            phases
        } = this.state.project
        return (
            <article>
                <h2>{name}</h2>
                <cite>{owner}</cite>
                <p>{location}</p>
                <p>{budget}</p>
                <p>{start_date}</p>
                <p>{turnover_date}</p>
                <p>Completed: {is_done ? 'Completed' : 'Incomplete'}</p>
                <div>
                    <h5>Prime Contractor</h5>
                    <h6><Link to={`/company/${prime_contractor.id}`}>{prime_contractor.name}</Link></h6>
                    <p>{prime_contractor.address}</p>
                    <p>{prime_contractor.phone}</p>
                    <div>
                        <h5>Prime Contract</h5>
                        <p>{prime_contract.amount}</p>
                    </div>
                </div>
                <ul>
                    <li>Phases</li>
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
                                <li>Completed: {el.is_done ? 'Completed' : 'Incomplete'}</li>
                                <li>
                                    Tasks: {el.tasks.length > 0 ? el.tasks.map(task => (
                                        <ul key={task.id}>
                                            <li><Link to={`/project/${id}/phase/${el.id}/task/${task.id}`}>{task.title}</Link></li>
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