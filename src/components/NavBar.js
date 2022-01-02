import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Service from './Service';
import '../style/NavBar.css'

const NavBar = (props) => {
    const [login, setLogin] = useState({flag:true, role:""}) 
    
    useEffect(()=>setLogin((preValue)=>{return { ...preValue, flag:props.flag, role:props.role}}),[props])
    const logout = ()=>{
        if(login.role === "Manager"){
            Service.managerLogout()
            .then(res=>{alert(res.data)})
            .catch(err=>{console.log(err)})
            setLogin((preValue)=>{return {...preValue,role:""}})
            localStorage.removeItem('ManagerCredentials')
        }else if(login.role === "Employee"){
            Service.employeeLogout()
            .then(res=>{alert(res.data)})
            setLogin((preValue)=>{return {...preValue,role:""}})
            localStorage.removeItem('EmployeeCredentials')
            localStorage.removeItem('EmpCre')
        }else{
            setLogin((preValue)=>{return {...preValue,flag:false,role:""}})
            alert('Logged Out')
        }
        
    }


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
                            login.flag !== false?
                            <li className="nav-item">
                                <NavLink className="nav-link text-light" to="/login">Login</NavLink>
                            </li>
                            :
                            <li className="nav-item">
                                <NavLink className="nav-link text-light" to="/" onClick={logout}>Logout</NavLink>
                            </li>
                        }
                        
                    </ul>                
                </div>
            </nav>
        </div> 
    )
}

export default NavBar
