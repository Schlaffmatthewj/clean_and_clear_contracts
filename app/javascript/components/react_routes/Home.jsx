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
            return this.state.companies.map(el => <p key={el.id}><Link to={`/company/${el.id}`}>{el.name}, est. {el.established_date}</Link></p> )
        } else {
            return (
                <p>Sadly, there are NO Companies in this Database</p>
            )
        }
    }

    condtionalProjectRender() {
        if (this.state.projects.length > 0) {
            return this.state.projects.map(el => <p key={el.id}><Link to={`/project/${el.id}`}>{el.name}</Link></p> )
        } else {
            return (
                <p>Sadly, there are NO Projects in this Database</p>
            )
        }
    }

    render() {
        return (
            <main className='flex-column'>
                <article className='home-container'>
                    <div className='home-content'>
                        <h3>Companies</h3>
                        {this.state.dataLoaded ? this.condtionalCompanyRender() : <p>Loading Companies...</p>}
                    </div>
                    <div className='home-content'>
                        <h3>Projects</h3>
                        {this.state.dataLoaded ? this.condtionalProjectRender() : <p>Loading Projects...</p>}
                    </div>
                </article>
            </main>
        )
    }
}
export default Home