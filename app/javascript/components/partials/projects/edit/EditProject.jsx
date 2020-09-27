import React, { Component } from "react"

export default class EditProject extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      location: '',
      start_date: '',
      turnover_date: '',
      dataLoaded: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.setState({
      name: this.props.project.name,
      location: this.props.project.location,
      start_date: this.props.project.start_date,
      turnover_date: this.props.project.turnover_date,
      dataLoaded: true
    })
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    let data = {
      api_v1_project: {
        name: this.state.name,
        location: this.state.location,
        start_date: this.state.start_date,
        turnover_date: this.state.turnover_date
      }
    }
    fetch(`/api/v1/projects/${this.props.project.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include'
    }).then(() => this.props.handleSuccessfulEdit(this.props.project.id))
    .catch(err => console.log(err))
  }

  conditionalRender() {
    return (
      <form className='flex-column' onSubmit={this.handleSubmit}>
        <input
        type='text'
        name='name'
        value={this.state.name}
        placeholder="Project's Name"
        onChange={this.handleChange}
        />
        <input
        type='text'
        name='location'
        value={this.state.location}
        placeholder='Address'
        onChange={this.handleChange}
        />
        <input
        type='date'
        name='start_date'
        value={this.state.start_date}
        placeholder='Start Date'
        onChange={this.handleChange}
        />
        <input
        type='date'
        name='turnover_date'
        value={this.state.turnover_date}
        placeholder='Turnover Date'
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