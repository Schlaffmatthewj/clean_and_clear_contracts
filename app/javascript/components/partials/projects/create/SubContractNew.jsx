import React, { Component } from "react"

export default class SubContractNew extends Component {
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
        let data = {
            api_v1_sub_contract: {
                amount: this.state.amount,
                api_v1_company: this.props.company.id,
                api_v1_task: this.props.task.id
            }
        }
        fetch(`/api/v1/companies/${this.props.company.id}/sub_contracts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include'
        })
        .then(res => res.json())
        .then(res => {
            // console.log('NEW SUB Contract res', res)
            this.props.addedContract()
        })
    }

    render() {
        return (
            <article>
                <div>
                    {this.props.task.budget}
                </div>
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
            </article>
        )
    }
}