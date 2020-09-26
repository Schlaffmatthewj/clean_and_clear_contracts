import React, { Component } from "react"
import { Link } from "react-router-dom"
import NumberFormat from 'react-number-format';

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
        let year = established_date.split('-')[0]
        console.log('this.state.company', this.state.company)
        return (
            <article>
                <h2>{name}</h2>
                <cite>EST: {year}</cite>
                <p>Address: {address}</p>
                <p>Phone: {phone}</p>
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
                                    <p>
                                        Project Budget: <NumberFormat
                                                            value={owned.budget}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            prefix={'$'}
                                                        />
                                    </p>
                                    <div>
                                        {owned.prime_contract.length > 0
                                        ? owned.prime_contract.map(contract => {
                                            return (
                                                <div key={contract.id}>
                                                    <p onClick={() => this.toggleCompanies(contract.prime_contractor.id)}>
                                                        Prime Contractor: {contract.prime_contractor.name}
                                                    </p>
                                                    <p>Contract Amount: <NumberFormat
                                                                            value={contract.amount}
                                                                            displayType={'text'}
                                                                            thousandSeparator={true}
                                                                            prefix={'$'}
                                                                        />
                                                    </p>
                                                </div>
                                            )
                                        })
                                        : null }
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
                                    <p>Contract: <NumberFormat
                                                    value={prime.amount}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    prefix={'$'}
                                                />
                                    </p>
                                    <p>Project Budget: <NumberFormat
                                                            value={prime.project.budget}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            prefix={'$'}
                                                        />
                                    </p>
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
                                    <p>Contract: <NumberFormat
                                                    value={task.amount}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    prefix={'$'}
                                                />
                                    </p>
                                    <p>Task: 
                                        <Link to={`/project/${task.id}/phase/${task.task.api_v1_phase_id}/task/${task.task.id}`}>
                                            {task.task.title}
                                        </Link>
                                    </p>
                                    <p>Task Budget: <NumberFormat
                                                        value={task.task.budget}
                                                        displayType={'text'}
                                                        thousandSeparator={true}
                                                        prefix={'$'}
                                                    />
                                    </p>
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