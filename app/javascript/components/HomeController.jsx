import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"

import Header from "./partials/static/Header"
import Footer from "./partials/static/Footer"

import Home from "../components/react_routes/Home"
import Company from "./react_routes/Company"
import Profile from "./react_routes/Profile"
import AuthController from "../components/react_routes/AuthController"
import CreateController from "../components/react_routes/CreateController"
import ProjectController from "../components/react_routes/ProjectController";


// BUILD A PROFILE COMPONENT AND HAVE AC PUSH TO IT

export default class HomeController extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedInStatus: 'NOT_LOGGED_IN',
      company: {}
    }

    this.currentCompany = this.currentCompany.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  currentCompany(data) {
    this.setState({
      loggedInStatus: 'LOGGED_IN',
      company: data
    })
  }

  handleLogout() {
    this.setState({
      loggedInStatus: 'NOT_LOGGED_IN',
      company: {}
    })
  }

  componentDidMount() {
    if (this.state.loggedInStatus === 'NOT_LOGGED_IN') {
      fetch('/api/v1/logged_in', {
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      })
      .then(res => res.json())
      .then(res => {
        // console.log('sessions res', res)
        if (res.logged_in) {
          this.setState({
            company: res.company,
            loggedInStatus: 'LOGGED_IN'
          })
        }
      })
    }
  }

  render() {
    return (
      <Router>
        <Header
          loggedInStatus={this.state.loggedInStatus}
          company={this.state.company}
          />
        <Switch>
          <Route path='/' exact
          render={props => <Home {...props}
                            loggedInStatus={this.state.loggedInStatus}
                            company={this.state.company}
                            />}
          />
          <Route path='/company/:company_id' exact
          render={props => <Company {...props}
                            loggedInStatus={this.state.loggedInStatus}
                            company={this.state.company}
                            />}
          />
          <Route path='/create/owner' exact
          render={props => <CreateController {...props}
                            currentStatus='Property_Owner'
                            loggedInStatus={this.state.loggedInStatus}
                            company={this.state.company}
                            />}
          />
          <Route path='/create/prime' exact
          render={props => <CreateController {...props}
                            currentStatus='Prime_Contractor'
                            loggedInStatus={this.state.loggedInStatus}
                            company={this.state.company}
                            />}
          />
          <Route path='/create/project' exact
          render={props => <CreateController {...props}
                            currentStatus='Project_New'
                            loggedInStatus={this.state.loggedInStatus}
                            company={this.state.company}
                            />}
          />
          <Route path='/create/project/:project_id/phase' exact
          render={props => <CreateController {...props}
                            currentStatus='Phase_New'
                            loggedInStatus={this.state.loggedInStatus}
                            company={this.state.company}
                            />}
          />
          <Route path='/create/project/:project_id/phase/:phase_id/task' exact
          render={props => <CreateController {...props}
                            currentStatus='Task_New'
                            loggedInStatus={this.state.loggedInStatus}
                            company={this.state.company}
                            />}
          />
          <Route path='/profile/:company_id' exact
          render={props => <Profile {...props}
                            company={this.state.company}
                            handleLogout={this.handleLogout}
                            />}
          />
          <Route path='/project/:project_id' exact
          render={props => <ProjectController {...props}
                            currentStatus='Project'
                            loggedInStatus={this.state.loggedInStatus}
                            company={this.state.company}
                            />}
          />
          <Route path='/project/:project_id/phase/:phase_id/task/:task_id' exact
          render={props => <ProjectController {...props}
                            currentStatus='Task'
                            loggedInStatus={this.state.loggedInStatus}
                            company={this.state.company}
                            />}
          />
          <Route path='/verify/login' exact
          render={props => <AuthController {...props}
                            currentStatus='Login'
                            currentCompany={this.currentCompany}
                            loggedInStatus={this.state.loggedInStatus}
                            company={this.state.company}
                            />}
          />
          <Route path='/verify/register' exact
          render={props => <AuthController {...props}
                            currentStatus='Register'
                            currentCompany={this.currentCompany}
                            loggedInStatus={this.state.loggedInStatus}
                            company={this.state.company}
                            />}
          />
        </Switch>
        <Footer />
      </Router>
    )
  }
}