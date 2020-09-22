import React, { Component } from "react"
import { Link } from "react-router-dom"

class Task extends Component {
    constructor(props) {
        super(props)
        this.state = {
            task: null,
            dataLoaded: false
        }
    }

    componentDidMount() {
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

    conditionalRender() {
        return (
            <article>
                <h2>{this.state.task.title}</h2>
                <p>{this.state.task.description}</p>
                <p>{this.state.task.budget}</p>
                <p>{this.state.task.start_date}</p>
                <p>{this.state.task.turnover_date}</p>
                <p>Completed: {this.state.task.is_done ? 'Completed' : 'Incomplete'}</p>
                <ul>
                    <li>Sub Contractor</li>
                        <ul>
                            <li>{this.state.task.sub_contractor.name}</li>
                            <li>{this.state.task.sub_contractor.address}</li>
                            <li>{this.state.task.sub_contractor.phone}</li>
                        </ul>
                    <li>Sub Contract</li>
                        <ul>
                            <li>{this.state.task.subcontract.amount}</li>
                        </ul>
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