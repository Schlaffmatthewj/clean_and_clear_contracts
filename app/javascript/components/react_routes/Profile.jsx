import React, { Component } from "react"
import { Link } from "react-router-dom"
import NumberFormat from 'react-number-format';

import Logout from "../partials/auth/Logout"

class Profile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            company: null,
            dataLoaded: false
        }

        this.toggleLogout = this.toggleLogout.bind(this)
        this.deleteAccount = this.deleteAccount.bind(this)
    }

    componentDidMount() {
        if (this.props.loggedInStatus === 'NOT_LOGGED_IN') {
            this.props.history.push('/')
        }
        let id = this.props.match.params.company_id
        fetch(`/api/v1/companies/${id}`)
        .then(res => res.json())
        .then(res => {
            this.setState({
                company: res.results,
                dataLoaded: true
            })
        })
        .catch(err => console.log(err))
    }

    componentDidUpdate(prevProps) {
        if (prevProps.company !== this.props.company) {
            this.props.history.push('/')
        }
    }

    toggleLogout() {
        this.props.history.push('/')
        this.props.handleLogout()
    }

    deleteAccount() {
        fetch(`/api/v1/companies/${this.state.company.id}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        .then(() => {
            this.props.deletedCompany()
            this.props.history.push('/')
        })
        .catch(err => console.log(err))
    }

    isPrimeOrOwner() {
        return (
            <aside className='profile-top-right'>
                {!this.state.company.is_prime
                    ? <Link to='/create/prime'><button>Prime Contractor Permissions • 🏗️</button></Link>
                    : null }
                {!this.state.company.is_owner
                    ? <Link to='/create/owner'><button>Property Owner Permissions • 💼</button></Link>
                    : <Link to='/create/project'><button>Create New Project • 👷</button></Link> }
            </aside>
        )
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
            <article>
                <div className='profile-controls'>
                    <aside className='profile-top-left'>
                        <Logout toggleLogout={this.toggleLogout} />
                        <button onClick={() => this.deleteAccount()}>Delete Account • 🗑️</button>
                        <Link to={{
                            pathname: `/edit/company/${this.state.company.id}`,
                            state: {
                                company: this.state.company,
                                pageStatus: 'Company'
                            }
                        }}><button>Edit Profile • 🛠️</button></Link>
                    </aside>
                    {this.isPrimeOrOwner()}
                </div>
                <div className='profile-body'>
                    <div className='profile-details'>
                        <h2>{name}</h2>
                        <cite>EST: {year}</cite>
                        <p>Address: {address}</p>
                        <p>Phone: {phone}</p>
                    </div>
                    <div className='profile-all-projects'>
                        {owned_projects
                            ? <div className='profile-projects'>
                                <h4>Owned Projects</h4>
                                {owned_projects.map(owned => {
                                    return (
                                        <div className='profile-single' key={owned.id}>
                                            <Link to={`/project/${owned.id}`}>
                                                {owned.name}
                                            </Link>
                                            <p>Address: {owned.location}</p>
                                            <p>Completed: {owned.is_done
                                                ? 'Completed'
                                                : 'Incomplete'}
                                            </p>
                                            <p>Project Budget: <NumberFormat
                                                                    value={owned.budget}
                                                                    displayType={'text'}
                                                                    thousandSeparator={true}
                                                                    prefix={'$'}
                                                                />
                                            </p>
                                            <p>Project Over/Under: <NumberFormat
                                                    value={owned.project_profits}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    prefix={'$'}
                                                />
                                            </p>
                                            <p>Total Cost: <NumberFormat
                                                    value={owned.total_cost}
                                                    displayType={'text'}
                                                    thousandSeparator={true}
                                                    prefix={'$'}
                                                />
                                            </p>
                                            {owned.prime_contract.length > 0
                                                ? owned.prime_contract.map(contract => (
                                                    <div key={contract.id}>
                                                        <Link to={`/company/${contract.prime_contractor.id}`}>
                                                            Prime Contractor: {contract.prime_contractor.name}
                                                        </Link>
                                                        <p>Contract Amount: <NumberFormat
                                                                                value={contract.amount}
                                                                                displayType={'text'}
                                                                                thousandSeparator={true}
                                                                                prefix={'$'}
                                                                            />
                                                        </p>
                                                    </div>
                                                ))
                                                : null }
                                        </div>
                                    )
                                })}
                            </div>
                            : <p>No Owned Projects</p>}
                        {contracts.prime_contracts.length > 0 
                            ? <div className='profile-projects'>
                                <h4>Prime Contracts</h4>
                                {contracts.prime_contracts.map(prime => {
                                    return (
                                        <div className='profile-single' key={prime.id}>
                                            <Link to={`/project/${prime.project.id}`}>
                                                {prime.project.name}
                                            </Link>
                                            <Link to={`/company/${prime.project.api_v1_company_id}`}>
                                                {prime.project.owner}
                                            </Link>
                                            <p>Address: {prime.project.location}</p>
                                            <p>Completed: {prime.project.is_done
                                                ? 'Completed'
                                                : 'Incomplete'}
                                            </p>
                                            <p>Project Budget: <NumberFormat
                                                                    value={prime.project.budget}
                                                                    displayType={'text'}
                                                                    thousandSeparator={true}
                                                                    prefix={'$'}
                                                                />
                                            </p>
                                            <p>Contract: <NumberFormat
                                                            value={prime.amount}
                                                            displayType={'text'}
                                                            thousandSeparator={true}
                                                            prefix={'$'}
                                                        />
                                            </p>
                                            <p>Prime Contract Profits: <NumberFormat
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
                            : <p>No Prime Contracts</p>}
                        {contracts.sub_contracts.length > 0 
                            ? <div className='profile-projects'>
                                <h4>Sub Contracts</h4>
                                {contracts.sub_contracts.map(task => {
                                    return (
                                        <div className='profile-single' key={task.id}>
                                            <p>Project: 
                                                <Link to={`/project/${task.project.id}`}> 
                                                    {task.project.name}
                                                </Link>
                                            </p>
                                            <p>Address: {task.project.location}</p>
                                            <p>Completed: {task.project.is_done
                                                ? 'Completed'
                                                : 'Incomplete'}
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
                                            <p>Task Over/Under: <NumberFormat
                                                                value={task.task.task_profits}
                                                                displayType={'text'}
                                                                thousandSeparator={true}
                                                                prefix={'$'}
                                                            />
                                            </p>
                                            <p>Contract: <NumberFormat
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
                            : <p>No Sub Contracts</p>}
                    </div>
                </div>
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
export default Profile;