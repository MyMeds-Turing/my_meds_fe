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
            <NavLink to='/my_meds_fe/' className='navButton'>
                Home
            </NavLink>
            <NavLink to='/my_meds_fe/add-new' className='navButton'>
                Add New Med
            </NavLink>
        </nav>
    )
}

export default Nav