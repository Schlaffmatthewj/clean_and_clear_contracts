import React, { Component } from "react"

export default class EditPhaseAndTask extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      description: '',
      start_date: '',
      turnover_date: '',
      dataLoaded: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (this.props.task) {
      this.setState({
        title: this.props.task.title,
        description: this.props.task.description,
        start_date: this.props.task.start_date,
        turnover_date: this.props.task.turnover_date,
        dataLoaded: true
      })
    } else {
      this.setState({
        title: this.props.phase.title,
        description: this.props.phase.description,
        start_date: this.props.phase.start_date,
        turnover_date: this.props.phase.turnover_date,
        dataLoaded: true
      })
    }
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    if (this.props.task) {
      let data = {
        api_v1_task: {
          title: this.state.title,
          description: this.state.description,
          start_date: this.state.start_date,
          turnover_date: this.state.turnover_date
        }
      }
      fetch(`/api/v1/projects/${this.props.project.id}/phases/${this.props.phase.id}/tasks/${this.props.task.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
      }).then(() => this.props.handleSuccessfulEdit(this.props.project.id))
      .catch(err => console.log(err))
    } else {
      let data = {
        api_v1_phase: {
          title: this.state.title,
          description: this.state.description,
          start_date: this.state.start_date,
          turnover_date: this.state.turnover_date
        }
      }
      fetch(`/api/v1/projects/${this.props.project.id}/phases/${this.props.phase.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
        credentials: 'include'
      }).then(() => this.props.handleSuccessfulEdit(this.props.project.id))
      .catch(err => console.log(err))
    }
  }

  conditionalRender() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
        type='text'
        name='title'
        value={this.state.title}
        placeholder="Title"
        onChange={this.handleChange}
        />
        <input
        type='text'
        name='description'
        value={this.state.description}
        placeholder='Description'
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
      <div>
        {this.state.dataLoaded && this.conditionalRender()}
      </div>
    )
  }
}