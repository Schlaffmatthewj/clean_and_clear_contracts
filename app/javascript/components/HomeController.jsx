import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom"

import Header from "./partials/static/Header"
import Footer from "./partials/static/Footer"

import About from "../components/partials/static/About"
import Home from "../components/react_routes/Home"
import Company from "./react_routes/Company"
import Profile from "./react_routes/Profile"
import AuthController from "../components/react_routes/AuthController"
import EditController from "../components/react_routes/EditController"
import CreateController from "../components/react_routes/CreateController"
import ProjectController from "../components/react_routes/ProjectController";

export default class HomeController extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loggedInStatus: 'NOT_LOGGED_IN',
      company: {}
    }

    this.currentCompany = this.currentCompany.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
    this.updateCompany = this.updateCompany.bind(this)
    this.deletedCompany = this.deletedCompany.bind(this)
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

  updateCompany(company) {
    this.setState({ company: company })
  }

  deletedCompany() {
    this.setState({
      company: {},
      loggedInStatus: 'NOT_LOGGED_IN'
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
        console.log('login res', res)
        if (res.logged_in) {
          this.setState({
            company: res.company,
            loggedInStatus: 'LOGGED_IN'
          })
        }
      })
      .catch(err => console.log(err))
    }
  }

  render() {
    return (
      <div className='Page'>
        <Router>
          <Header
            loggedInStatus={this.state.loggedInStatus}
            handleLogout={this.handleLogout}
            company={this.state.company}
          />
          <Switch>
            <Route path='/' exact
            render={props => <Home {...props}
                                loggedInStatus={this.state.loggedInStatus}
                                company={this.state.company}
                              />}
            />
            <Route path='/about' exact component={About} />
            <Route path='/company/:company_id' exact
            render={props => <Company {...props}
                                loggedInStatus={this.state.loggedInStatus}
                                company={this.state.company}
                              />}
            />
            <Route path='/create/owner' exact
            render={props => <CreateController {...props}
                                updateCompany={this.updateCompany}
                                currentStatus='Property_Owner'
                                loggedInStatus={this.state.loggedInStatus}
                                company={this.state.company}
                              />}
            />
            <Route path='/create/prime' exact
            render={props => <CreateController {...props}
                                updateCompany={this.updateCompany}
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
            <Route path='/edit/:type/:type_id' exact
            render={props => <EditController {...props}
                                loggedInStatus={this.state.loggedInStatus}
                                company={this.state.company}
                                currentCompany={this.currentCompany}
                              />}
            />
            <Route path='/profile/:company_id' exact
            render={props => <Profile {...props}
                                company={this.state.company}
                                handleLogout={this.handleLogout}
                                deletedCompany={this.deletedCompany}
                                loggedInStatus={this.state.loggedInStatus}
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
            <Route path='/*' component={Home} />
          </Switch>
          <Footer/>
        </Router>
      </div>
    )
  }
}