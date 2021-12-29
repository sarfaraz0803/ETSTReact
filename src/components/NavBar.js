import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import '../style/NavBar.css'

const NavBar = (props) => {
    const [login, setLogin] = useState({flag:false}) 
    
    useEffect(()=>setLogin((preValue)=>{return { ...preValue, flag:props.flag}}),[props.flag])


    return (
        <div className="navmenu">
            <nav className="navbar navbar-expand text-dark bg-dark">
            <div className="container">
                <NavLink className="navbar-brand" to="/">ETST</NavLink>                
                    <ul className="navbar-nav ">
                        <li className="nav-item">
                            <NavLink className="nav-link text-light" to="/">Home</NavLink>
                        </li>
                        {
                            login.flag === false?
                            <li className="nav-item">
                                <NavLink className="nav-link text-light" to="/login">Login</NavLink>
                            </li>
                            :
                            <li className="nav-item">
                                <NavLink className="nav-link text-light" to="/" onClick={props.logout}>Logout</NavLink>
                            </li>
                        }
                        
                    </ul>                
                </div>
            </nav>
        </div> 
    )
}

export default NavBar
