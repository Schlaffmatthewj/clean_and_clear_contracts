import React, { Component } from "react"

export default class EditProject extends Component {
  constructor(props) {
    super(props)
    this.state = {
      address: '',
      phone: '',
      dataLoaded: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({
      address: this.props.company.address,
      phone: this.props.company.phone,
      dataLoaded: true
    })
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    let data = {
      api_v1_company: {
        address: this.state.address,
        phone: this.state.phone,
      }
    }
    fetch(`/api/v1/companies/${this.props.company.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include'
    }).then(res => res.json())
    .then(res => {
      if (res.updated) this.props.handleSuccessfulCompanyEdit(this.props.company)
      else alert(`${res.results}`)
    })
    .catch(err => console.log(err))
  }

  conditionalRender() {
    return (
      <form className='flex-column' onSubmit={this.handleSubmit}>
        <input
        type='text'
        name='address'
        value={this.state.address}
        placeholder='Address'
        onChange={this.handleChange}
        />
        <input
        type='text'
        name='phone'
        value={this.state.phone}
        placeholder='Start Date'
        onChange={this.handleChange}
        />
        <input
        type='submit'
        value='Submit Changes • 🛠️'
        />
      </form>
    )
  }

  render() {
    return (
      <div className='form-div flex-column'>
        {this.state.dataLoaded && this.conditionalRender()}
      </div>
    )
  }
}