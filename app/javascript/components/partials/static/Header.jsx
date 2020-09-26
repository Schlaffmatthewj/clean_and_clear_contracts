import React from "react"
import { Link } from "react-router-dom"

export default (props) => (
    <header>
        <h1><Link to='/'>Clean &amp; Clear Contracts</Link></h1>
        <nav>
            <Link to='/'>Home</Link>
            {(props.loggedInStatus === 'NOT_LOGGED_IN') ? <div>
                <Link to='/verify/login'>Login</Link>
                <Link to='/verify/register'>Register</Link>
            </div> : <Link to={`/profile/${props.company.id}`}>Profile</Link> }
        </nav>
    </header>
)