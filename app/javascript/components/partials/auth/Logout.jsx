import React, { Component } from "react"

export default class Logout extends Component {
    constructor(props) {
        super(props)
    }

    logoutCompany() {
        fetch('/api/v1/logout', {
            method: 'DELETE',
            credentials: 'include'
        })
        .then(() => {
            this.props.toggleLogout()
        })
    }

    render() {
        return (
            <button onClick={() => {this.logoutCompany()}}>Logout • 👋</button>
        )
    }
}