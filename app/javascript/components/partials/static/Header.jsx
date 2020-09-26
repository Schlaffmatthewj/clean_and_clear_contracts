import React from "react"
import { Link } from "react-router-dom"

import Logout from "../auth/Logout"

export default (props) => {
    
    function toggleLogout() {
        props.handleLogout()
    }

    return (
        <header>
            <h1><Link to='/'>Clean &amp; Clear Contracts</Link></h1>
            <nav>
                <Link to='/'>Home</Link>
                {(props.loggedInStatus === 'NOT_LOGGED_IN')
                    ? <div>
                        <Link to='/verify/login'>Login</Link>
                        <Link to='/verify/register'>Register</Link>
                    </div>
                    : <div>
                        <Link to={`/profile/${props.company.id}`}>{props.company.name}'s Page</Link>
                        <Logout toggleLogout={toggleLogout} />
                    </div> }
            </nav>
        </header>
    )
}