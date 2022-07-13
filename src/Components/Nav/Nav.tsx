import React from "react";
import { NavLink } from "react-router-dom";
import './Nav.css'

type UserProps = {
    name: string
}


const Nav: React.FC<UserProps> = ({name}) => {

    return (
    
        <nav>
            <h2>Welcome, {name}</h2>
            <NavLink to='/' className='navButton'>
                Home
            </NavLink>
            <NavLink to='/add-new' className='navButton'>
                Add new med
            </NavLink>
        </nav>
    )
}

export default Nav