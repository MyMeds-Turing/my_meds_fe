import React from "react";
import { NavLink } from "react-router-dom";
import Graphic from './../Graphic/Graphic'
import './Nav.css'

type UserProps = {
    name: string
}


const Nav: React.FC<UserProps> = ({ name }) => {

    return (

        <nav>

            <h1 className="page-title">MyMeds</h1>
            <h2 className="welcome-message">Welcome, {name}</h2>
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