import React, { Component } from "react"
import { Link } from "react-router-dom"

class Company extends Component {
    constructor(props) {
        super(props)
        this.state = {
            company: null,
            dataLoaded: false
        }
    }

    componentDidMount() {
        let id = this.props.match.params.company_id
        fetch(`/api/v1/companies/${id}`)
        .then(res => res.json())
        .then(res => {
            // console.log('fetching', res)
            this.setState({
                company: res.results,
                dataLoaded: true
            })
        })
    }

    toggleCompanies(id) {
        if (this.state.company.id !== id) {
            fetch(`/api/v1/companies/${id}`)
            .then(res => res.json())
            .then(res => {
                // console.log('fetching', res)
                this.setState({
                    company: res.results,
                    dataLoaded: true
                })
            })
        }
    }

    conditionalRender() {
        const {
            name,
            established_date,
            address,
            phone,
            owned_projects,
            contracts,
        } = this.state.company
        return (
            <article>
                <h2>{name}</h2>
                <cite>{established_date}</cite>
                <p>{address}</p>
                <p>{phone}</p>
                <ul>
                    <li>
                        <h4>Owned Projects</h4>
                        {owned_projects
                        ? owned_projects.map(owned => {
                            return (
                                <div key={owned.id}>
                                    <p>
                                        <Link to={`/project/${owned.id}`}>
                                            {owned.name}
                                        </Link>
                                    </p>
                                    <p>Address: {owned.location}</p>
                                    <p>Completed: {owned.is_done ? 'Completed' : 'Incomplete'}</p>
                                    <p>Budget: ${owned.budget}</p>
                                    <p>Turnover Date: {owned.turnover_date}</p>
                                    <div>
                                        {owned.prime_contract.length > 0
                                        ? owned.prime_contract.map(contract => {
                                            return (
                                                <p key={contract.id} onClick={() => this.toggleCompanies(contract.prime_contractor.id)}>Prime Contractor: {contract.prime_contractor.name}</p>
                                            )
                                        })
                                        : null } {/* maybe have sign contract here?? */}
                                    </div>
                                </div>
                            )
                        }) : <p>No Owned Projects</p>}
                    </li>
                    <li>
                        <h4>Prime Contracts</h4>
                        {contracts.prime_contracts.length > 0 
                        ? contracts.prime_contracts.map(prime => {
                            return (
                                <div key={prime.id}>
                                    <p>Project: 
                                        <Link to={`/project/${prime.project.id}`}>
                                            {prime.project.name}
                                        </Link>
                                    </p>
                                    <p onClick={() => this.toggleCompanies(prime.project.api_v1_company_id)}>Project Owner: {prime.project.owner}</p>
                                    <p>Contract: ${prime.amount}</p>
                                    <p>Project Budget: ${prime.project.budget}</p>
                                </div>
                            )
                        }) : <p>No Prime Contracts</p>}
                    </li>
                    <li>
                        <h4>Sub Contracts</h4>
                        {contracts.sub_contracts.length > 0 
                        ? contracts.sub_contracts.map(task => {
                            return (
                                <div key={task.id}>
                                    <p>Project: 
                                        <Link to={`/project/${task.project.id}`}>
                                            {task.project.name}
                                        </Link>
                                    </p>
                                    <p>Contract: ${task.amount}</p>
                                    <p>Task: 
                                        <Link to={`/project/${task.id}/phase/${task.task.api_v1_phase_id}/task/${task.task.id}`}>
                                            {task.task.title}
                                        </Link>
                                    </p>
                                    <p>Task Budget: ${task.task.budget}</p>
                                </div>
                            )
                        }) : <p>No Sub Contracts</p>}
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
export default Company;