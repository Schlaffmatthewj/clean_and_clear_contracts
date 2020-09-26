import React, { Component } from "react"

export default class PrimeContractNew extends Component {
    constructor(props) {
        super(props)
        this.state = {
            amount: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(evt) {
        this.setState({ [evt.target.name]: evt.target.value })
    }

    handleSubmit(evt) {
        evt.preventDefault()
        let budget = Math.round(this.props.project.budget)
        let percentage = budget / 10
        let max = budget + percentage
        let data = {
            api_v1_prime_contract: {
                amount: this.state.amount,
                api_v1_company_id: this.props.company.id,
                api_v1_project_id: this.props.project.id
            }
        }
        if (this.state.amount <= max) {
            fetch(`/api/v1/companies/${this.props.company.id}/prime_contracts`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include'
            })
            .then(res => res.json())
            .then(res => {
                // console.log('NEW PRIME Contract res', res)
                this.props.addedContract()
            })
        } else {
            alert(`Your bid was too high!, the budget is $${this.props.project.budget}`)
            this.setState({ amount: '' })
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                type='money'
                name='amount'
                placeholder='Contract Amount'
                value={this.state.amount}
                onChange={this.handleChange}
                />
                <input
                type='submit'
                value='Sign Contract'
                />
            </form>
        )
    }
}