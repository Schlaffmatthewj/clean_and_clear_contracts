import React, { Component } from "react"
import { Link } from "react-router-dom"

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
    }

    isPrimeOrOwner() {
        return (
            <aside>
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
        let year = (this.state.company.established_date).split('-')[0]
        return (
            <article>
                {this.isPrimeOrOwner()}
                <Logout toggleLogout={this.toggleLogout} />
                <button onClick={() => this.deleteAccount()}>Delete Account • 🗑️</button>
                <Link to={{
                    pathname: `/edit/company/${this.state.company.id}`,
                    state: {
                        company: this.state.company,
                        pageStatus: 'Company'
                    }
                }}><button>Edit Profile • 🛠️</button></Link>
                <h2>{this.state.company.name}</h2>
                <cite>EST: {year}</cite>
                <p>Address: {this.state.company.address}</p>
                <p>Phone: {this.state.company.phone}</p>
                <ul>
                    <li>Owned Projects</li>
                    <li>
                        {this.state.company.owned_projects
                        ? this.state.company.owned_projects.map(el => {
                            return (
                                <ul key={el.id}>
                                    <li><Link to={`/project/${el.id}`}>{el.name}</Link></li>
                                    <li>Address: {el.address}</li>
                                </ul>
                            )
                        }) : <p>No Owned Projects</p>}
                    </li>
                    <li>Prime Contracts</li>
                    <li>
                    {this.state.company.contracts.prime_contracts.length > 0 
                    ? this.state.company.contracts.prime_contracts.map(el => {
                        return (
                            <ul key={el.id}>
                                <li><Link to={`/project/${el.project.id}`}>{el.project.name}</Link></li>
                                <li>Total: {el.amount}</li>
                            </ul>
                        )
                    }) : <p>No Prime Contracts</p>}
                    </li>
                    <li>Sub Contracts</li>
                    <li>
                    {this.state.company.contracts.sub_contracts.length > 0 
                    ? this.state.company.contracts.sub_contracts.map(el => {
                        return (
                            <ul key={el.id}>
                                <li>Project: {el.project.name}</li>
                                <li>Total: {el.amount}</li>
                                <li><Link to={`/project/${el.project.id}/phase/${el.task.api_v1_phase_id}/task/${el.task.id}`}>{el.task.title}</Link></li>
                            </ul>
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
export default Profile;