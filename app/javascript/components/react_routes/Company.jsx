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
            if (res.status === 'not_found') {
                this.props.history.push('/')
                alert(`${res.error}`)
            } else {
                this.props.history.push(`/company/${id}`)
                this.setState({
                    company: res.results,
                    dataLoaded: true
                })
            }
        })
        .catch(err => console.log(err))
    }

    toggleCompanies(id) {
        fetch(`/api/v1/companies/${id}`)
        .then(res => res.json())
        .then(res => {
            if (res.status === 'not_found') {
                this.props.history.push('/')
                alert(`${res.error}`)
            } else {
                this.props.history.push(`/company/${id}`)
                this.setState({
                    company: res.results,
                    dataLoaded: true
                })
            }
        })
        .catch(err => console.log(err))
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
        return (
            <article className='company-profile-container flex-column'>
                <div className='company-profile-body flex-column'>
                    <div className='company-profile-details'>
                        <h2>{name}</h2>
                        <cite>EST: {year}</cite>
                        <p>Address: {address}</p>
                        <p>Phone: {phone}</p>
                    </div>
                    <div className='company-profile-all-projects'>
                        {owned_projects
                            ? <div className='company-profile-projects flex-column'>
                                <h3>Owned Projects</h3>
                                {owned_projects.map(owned => {
                                    return (
                                        <div className='company-profile-single flex-column' key={owned.id}>
                                            <h4>Project: 
                                                <Link to={`/project/${owned.id}`}>
                                                    {owned.name}
                                                </Link>
                                            </h4>
                                            {owned.prime_contract.length > 0
                                                ? owned.prime_contract.map(contract => (
                                                    <div key={contract.id}>
                                                        <h4>Prime Contractor: 
                                                            <span className='link'
                                                                onClick={() => this.toggleCompanies(contract.prime_contractor.id)}>
                                                                    {contract.prime_contractor.name}
                                                            </span>
                                                        </h4>
                                                        <p>Contract Amount: 
                                                            <NumberFormat
                                                                value={contract.amount}
                                                                displayType={'text'}
                                                                thousandSeparator={true}
                                                                prefix={'$'}
                                                            />
                                                        </p>
                                                    </div>
                                                ))
                                                : null }
                                            <p>Address: {owned.location}</p>
                                            <p>Completed: {owned.is_done
                                                ? 'Completed'
                                                : 'Incomplete'}
                                            </p>
                                            <p>Project Budget: 
                                                <NumberFormat
                                                    value={owned.budget}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    prefix={'$'}
                                                />
                                            </p>
                                            <p>Project Over/Under: 
                                                <NumberFormat
                                                    value={owned.project_profits}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    prefix={'$'}
                                                />
                                            </p>
                                            <p>Total Cost: 
                                                <NumberFormat
                                                    value={owned.total_cost}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    prefix={'$'}
                                                />
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>
                            : <div className='company-profile-projects flex-column'>
                                <h3>No Owned Projects</h3>
                            </div>}
                        {contracts.prime_contracts.length > 0 
                            ? <div className='company-profile-projects flex-column'>
                                <h3>Prime Contracts</h3>
                                {contracts.prime_contracts.map(prime => {
                                    return (
                                        <div className='company-profile-single flex-column' key={prime.id}>
                                            <h4>Project: 
                                                <Link to={`/project/${prime.project.id}`}>
                                                    {prime.project.name}
                                                </Link>
                                            </h4>
                                            <h4>Project Owner: 
                                                <span className='link'
                                                    onClick={() => this.toggleCompanies(prime.project.api_v1_company_id)}>
                                                        {prime.project.owner}
                                                </span>
                                            </h4>
                                            <p>Address: {prime.project.location}</p>
                                            <p>Completed: {prime.project.is_done
                                                ? 'Completed'
                                                : 'Incomplete'}
                                            </p>
                                            <p>Project Budget: 
                                                <NumberFormat
                                                    value={prime.project.budget}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    prefix={'$'}
                                                />
                                            </p>
                                            <p>Contract: 
                                                <NumberFormat
                                                    value={prime.amount}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    prefix={'$'}
                                                />
                                            </p>
                                            <p>Prime Contract Profits: 
                                                <NumberFormat
                                                    value={prime.prime_profits}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    prefix={'$'}
                                                />
                                            </p>
                                        </div>
                                    )
                                })}
                            </div>  
                            : <div className='company-profile-projects flex-column'>
                                <h3>No Prime Contracts</h3>
                            </div>}
                        {contracts.sub_contracts.length > 0 
                            ? <div className='company-profile-projects flex-column'>
                                <h3>Sub Contracts</h3>
                                {contracts.sub_contracts.map(task => {
                                    return (
                                        <div className='company-profile-single flex-column' key={task.id}>
                                            <h4>Task: 
                                                <Link to={`/project/${task.id}/phase/${task.task.api_v1_phase_id}/task/${task.task.id}`}>
                                                    {task.task.title}
                                                </Link>
                                            </h4>
                                            <h4>Project: 
                                                <Link to={`/project/${task.project.id}`}> 
                                                    {task.project.name}
                                                </Link>
                                            </h4>
                                            <h4>Project Owner: 
                                                <span className='link'
                                                    onClick={() => this.toggleCompanies(task.project.api_v1_company_id)}>
                                                        {task.project.owner}
                                                </span>
                                            </h4>
                                            <p>Address: {task.project.location}</p>
                                            <p>Completed: {task.project.is_done
                                                ? 'Completed'
                                                : 'Incomplete'}
                                            </p>
                                            <p>Task Budget: 
                                                <NumberFormat
                                                    value={task.task.budget}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    prefix={'$'}
                                                />
                                            </p>
                                            <p>Task Over/Under: 
                                                <NumberFormat
                                                    value={task.task.task_profits}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    prefix={'$'}
                                                />
                                            </p>
                                            <p>Contract: 
                                                <NumberFormat
                                                    value={task.amount}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    prefix={'$'}
                                                />
                                            </p>
                                        </div>
                                    )
                                })}
                            </div> 
                            : <div className='company-profile-projects flex-column'>
                                <h3>No Sub Contracts</h3>
                            </div>}
                    </div>
                </div>
            </article>
        )
    }

    render() {
        return (
            <main className='main-container flex-column'>
               {this.state.dataLoaded
                ? this.conditionalRender()
                : <p>Loading...</p>}
            </main>
        )
    }
}
export default Company;