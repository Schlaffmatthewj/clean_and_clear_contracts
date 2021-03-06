import React, { Component } from "react"
const keys = require('../../../keys')


class OwnerNew extends Component {
    constructor(props) {
        super(props)

        this.state = {
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
        if (this.state.password === keys.OWNER_KEY) {
            let data = {
                api_v1_company: {
                    is_owner: true
                }
            }
            fetch(`/api/v1/companies/${this.props.company.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(res => {
                if (res.updated) this.props.togglePrimeOrOwner(res.results)
                else {
                    this.setState({ password: '' })
                    alert(`${res.results}`)
                }
            })
            .catch(err => console.log(err))
        } else {
            alert('You did NOT enter the Correct password!')
            this.setState({ password: '' })
        }
    }

    render() {
        return (
            <form className='flex-column' onSubmit={this.handleSubmit}>
                <input
                type='password'
                name='password'
                value={this.state.password}
                placeholder='Project Owner Password'
                onChange={this.handleChange}
                />
                <input
                type='submit'
                value='Submit'
                />
            </form>
        )
    }
}
export default OwnerNew