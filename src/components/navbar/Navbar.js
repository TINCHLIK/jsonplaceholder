import React from 'react';
import './Navbar.scss'
import { NavLink } from 'react-router-dom';
const Navbar = () => {
    return (
        <div className="navbar">
            <div>
                <NavLink to="/users" className="link">List Post</NavLink>
                <NavLink to="/add_post" className="link">Add Post</NavLink>
            </div>
            <div> <h3>TINCHLIK</h3> </div>
        </div>
    );
};

export default Navbar;