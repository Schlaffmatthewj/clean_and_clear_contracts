import React, { Component } from "react"
import { Link } from "react-router-dom"

class Company extends Component {
    constructor(props) {
        super(props)
        this.state = {
            company: null,
            dataLoaded: false
        }
    }

    componentDidMount() {
        let id = this.props.match.params.company_id
        fetch(`/api/v1/companies/${id}`)
        .then(res => res.json())
        .then(res => {
            // console.log('fetching', res)
            this.setState({
                company: res.results,
                dataLoaded: true
            })
        })
    }

    // componentDidUpdate() {
    //     if (this.state.company !== this.state.company) {
    //         let id = this.props.match.params.company_id
    //         fetch(`/api/v1/companies/${id}`)
    //         .then(res => res.json())
    //         .then(res => {
    //             // console.log('fetching', res)
    //             this.setState({
    //                 company: res.results,
    //                 dataLoaded: true
    //             })
    //         })
    //     }
    // }

    conditionalRender() {
        return (
            <article>
                <h2>{this.state.company.name}</h2>
                <cite>{this.state.company.established_date}</cite>
                <p>{this.state.company.address}</p>
                <p>{this.state.company.phone}</p>
                <ul>
                    <li>Prime Contracts</li>
                    <li>
                    {this.state.company.contracts.prime_contracts.length > 0 
                    ? this.state.company.contracts.prime_contracts.map(el => {
                        return (
                            <ul key={el.id}>
                                <li>Total: {el.amount}</li>
                                <li>{el.project.title}</li>
                            </ul>
                        )
                    }) : <p>No Prime Contracts</p>}
                    </li>
                    <li>Sub Contracts</li>
                    <li>
                    {this.state.company.contracts.sub_contracts.length > 0 
                    ? this.state.company.contracts.sub_contracts.map(el => {
                        return (
                            <ul key={el.id}>
                                <li>Project: {el.project.name}</li>
                                <li>Total: {el.amount}</li>
                                <li><Link to={`/project/${el.project.id}/phase/${el.task.api_v1_phase_id}/task/${el.task.id}`}>{el.task.title}</Link></li>
                            </ul>
                        )
                    }) : <p>No Sub Contracts</p>}
                    </li>
                </ul>
            </article>
        )
    }

    render() {
        return (
            <main>
               {this.state.dataLoaded ? this.conditionalRender() : <p>Loading...</p>}
            </main>
        )
    }
}
export default Company;