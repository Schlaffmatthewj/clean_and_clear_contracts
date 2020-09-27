import React, { Component } from "react"

import EditCompany from "../partials/projects/edit/EditCompany"
import EditPhaseAndTask from "../partials/projects/edit/EditPhaseAndTask"
import EditProject from "../partials/projects/edit/EditProject"

export default class EditController extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pageStatus: '',
      project: null,
      phase: null,
      task: null,
      dataLoaded: false
    }

    this.handleSuccessfulCompanyEdit = this.handleSuccessfulCompanyEdit.bind(this)
    this.handleSuccessfulEdit = this.handleSuccessfulEdit.bind(this)
  }

  handleSuccessfulEdit(project_id) {
    this.props.history.push(`/project/${project_id}`)
  }

  handleSuccessfulCompanyEdit(company) {
    this.props.currentCompany(company)
    this.props.history.push(`/profile/${company.id}`)
  }

  componentDidMount() {
    const {
      project,
      phase,
      task,
      pageStatus
    } = this.props.location.state
    this.setState({
      pageStatus: pageStatus,
      dataLoaded: true,
      project: project,
      phase: phase,
      task: task
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.company.id !== this.props.company.id) {
      this.props.history.push('/')
    }
  }

  conditionalRender() {
    const {
      project,
      phase,
      task,
      pageStatus
    } = this.state
    switch (pageStatus) {
      case 'Project':
        return <EditProject
                handleSuccessfulEdit={this.handleSuccessfulEdit}
                project={project}
                />
      case 'Phase':
        return <EditPhaseAndTask
                handleSuccessfulEdit={this.handleSuccessfulEdit}
                project={project}
                phase={phase}
                />
      case 'Task':
        return <EditPhaseAndTask
                handleSuccessfulEdit={this.handleSuccessfulEdit}
                project={project}
                phase={phase}
                task={task}
                />
      case 'Company':
        return <EditCompany
                company={this.props.company}
                handleSuccessfulCompanyEdit={this.handleSuccessfulCompanyEdit}
                />
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