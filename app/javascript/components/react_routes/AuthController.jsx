import React, { Component } from "react"

import Login from "../partials/auth/Login"
import Register from "../partials/auth/Register"

class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pageStatus: '',
            dataLoaded: false
        }

        this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this)
    }

    handleSuccessfulAuth(data) {
        this.props.currentCompany(data)
        this.props.history.push(`/profile/${data.id}`)
    }

    componentDidUpdate() {
        if (this.props.currentStatus !== this.state.pageStatus) {
            this.setState({ pageStatus: this.props.currentStatus })
        }
    }

    componentDidMount() {
        if (this.props.loggedInStatus === 'LOGGED_IN') {
            let id = this.props.company.id
            this.props.history.push(`/profile/${id}`)
        }
        if (this.props.currentStatus !== this.state.pageStatus) {
            this.setState({
                pageStatus: this.props.currentStatus, 
                dataLoaded: true 
            })
        }
    }

    conditionalRender() {
        switch (this.state.pageStatus) {
            case 'Login':
                return <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
            case 'Register':
                return <Register handleSuccessfulAuth={this.handleSuccessfulAuth} />
            default:
                return this.props.history.push('/')
        }
    }

    render() {
        return (
            <main className='main-container flex-column'>
               {this.state.dataLoaded && this.conditionalRender()}
            </main>
        )
    }
}
export default Auth;