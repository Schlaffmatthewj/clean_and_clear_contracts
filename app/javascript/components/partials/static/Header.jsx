import React from "react"
import { Link } from "react-router-dom"

export default (props) => {

    function logoutCompany() {
        fetch('/api/v1/logout', {
            method: 'DELETE',
            credentials: 'include'
        })
        .then(() => {
            props.handleLogout()
        })
        .catch(err => console.log(err))
    }

    return (
        <header>
            <h1><Link to='/'>Clean &amp; Clear Contracts</Link></h1>
            <nav>
                <ul className='nav'>
                    <li><Link to='/'>Home</Link></li>
                    {(props.loggedInStatus === 'NOT_LOGGED_IN')
                        ? <div>
                            <li><Link to='/verify/login'>Login</Link></li>
                            <li><Link to='/verify/register'>Register</Link></li>
                        </div>
                        : <div>
                            <li><Link to={`/profile/${props.company.id}`}>{props.company.name}</Link></li>
                            <li className='link' onClick={() => logoutCompany()}>Logout</li>
                        </div> }
                    <li><Link to='/about'>About</Link></li>
                </ul>
            </nav>
        </header>
    )
}