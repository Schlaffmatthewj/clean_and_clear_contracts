import React, { Component } from "react"

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            password: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value })
    }

    handleSubmit(evt) {
        evt.preventDefault()
        const {
            name,
            password
        } = this.state
        let data = {
            api_v1_company: {
                name: name,
                password: password
            }
        }
        fetch('/api/v1/sessions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            // console.log('Sessions Response', res)
            this.props.handleSuccessfulAuth(res.company)
        })
        .catch(err => console.log(err))
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                type='text'
                name='name'
                placeholder="Company's Name"
                value={this.state.name}
                onChange={this.handleChange}
                />
                <input
                type='password'
                name='password'
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
                />
                <input
                type='submit'
                value='Login'
                />
            </form>
        )
    }
}
export default Login;