import React, { Component } from "react"
import { Link } from "react-router-dom"

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            projects: [],
            companies: [],
            dataLoaded: false
        }
    }

    componentDidMount() {
        fetch('/api/v1/projects')
        .then(res => res.json())
        .then((res) => {
            this.setState({
                projects: res.results
            })
        })
        .catch(err => console.log(err))
        fetch('/api/v1/companies')
        .then(res => res.json())
        .then(res => {
            this.setState({
                companies: res.results,
                dataLoaded: true
            })
        })
        .catch(err => console.log(err))
    }

    condtionalCompanyRender() {
        if (this.state.companies.length > 0) {
            return this.state.companies.map(el => <li key={el.id}><Link to={`/company/${el.id}`}>{el.name}, est. {el.established_date}</Link></li> )
        } else {
            return (
                <p>Sadly, there are NO Companies in this Database</p>
            )
        }
    }

    condtionalProjectRender() {
        if (this.state.projects.length > 0) {
            return this.state.projects.map(el => <li key={el.id}><Link to={`/project/${el.id}`}>{el.name}, Owner: {el.owner}</Link></li> )
        } else {
            return (
                <p>Sadly, there are NO Projects in this Database</p>
            )
        }
    }

    render() {
        return (
            <main className='flex-column'>
                <article>
                    <ul>
                        <li><h3>Companies</h3></li>
                        {this.state.dataLoaded ? this.condtionalCompanyRender() : <li>Loading Companies...</li>}
                    </ul>
                    <ul>
                        <li><h3>Projects</h3></li>
                        {this.state.dataLoaded ? this.condtionalProjectRender() : <li>Loading Projects...</li>}
                    </ul>
                </article>
            </main>
        )
    }
}
export default Home