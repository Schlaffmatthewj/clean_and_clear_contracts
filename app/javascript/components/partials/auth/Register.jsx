import React, { Component } from "react"

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '',
            password: '',
            password_confirmation: '',
            address: '',
            phone: '',
            established_date: '',
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
            password,
            password_confirmation,
            address,
            phone,
            established_date
        } = this.state
        let data = {
            api_v1_company: {
                name: name,
                password: password,
                password_confirmation: password_confirmation,
                address: address,
                phone: phone,
                established_date: established_date
            }
        }
        fetch('/api/v1/companies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(res => {
            this.props.handleSuccessfulAuth(res.results)
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
                type='password'
                name='password_confirmation'
                placeholder="Password Confirmation"
                value={this.state.password_confirmation}
                onChange={this.handleChange}
                />
                <input
                type='text'
                name='address'
                placeholder="Address"
                value={this.state.address}
                onChange={this.handleChange}
                />
                <input
                type='text'
                name='phone'
                placeholder="1(555)555-5555"
                value={this.state.phone}
                onChange={this.handleChange}
                />
                <input
                type='text'
                name='established_date'
                placeholder="Established Date"
                value={this.state.established_date}
                onChange={this.handleChange}
                />
                <input
                type='submit'
                value='Register Company'
                />
            </form>
        )
    }
}
export default Register;