import React, { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import '../style/ManagerComp.css'
import NavBar from "./NavBar"

const ManagerComp = () => { 
    const [manResponseData, setManResponseData] = useState({userId:"",username:"",name:"",email:"",password:"",token:""}) 
    useEffect(() => {
        const store = JSON.parse(localStorage.getItem('ManagerCredentials'))
        setManResponseData((preValue)=>{return{ ...preValue, userId:store.userId, username:store.username, name:store.name, email:store.email }})        
    },[])
    

    return (
        <React.Fragment>
        <NavBar flag={false} role={'Manager'} />
        <div className="manager_page container-fluid mx-auto">
            <div className="row mx-auto">
                <div className="left_part col-lg-3 col-md-4 col-10 mx-auto">
                    <h3>My Dashboard</h3>
                    <div className="operations">
                        <button>Profile</button>
                        <Link className="nav-link" to={`/login/operations`}>Operations</Link>
                    </div>
                </div>
                <div className="right_part col-lg-9 col-md-8 col-10 mx-auto">
                    <h1>Profile</h1>                    
                       <form className="profile_div form-group">
                       <table className="mx-auto mt-3 profile_table">
                            <tbody>
                            <tr><td><label htmlFor="username">Username : </label></td><td><input className="m-2 form-control" type="email" name="username" value={manResponseData.username} readOnly/></td></tr>
                            
                            <tr><td><label htmlFor="name">Name : </label></td><td><input className="m-2 form-control" type="text" name="name" value={manResponseData.name} readOnly/></td></tr>
                            
                            <tr><td><label htmlFor="email">Email : </label></td><td><input className="m-2 form-control" type="email" name="email" value={manResponseData.email} readOnly/></td></tr>
                            
                            </tbody>                        
                        </table>   
                       </form>                    
                </div>
            </div>
        </div>
        </React.Fragment>
        // <tr><td><label htmlFor="password">Password : </label></td><td><input className="m-2 form-control" type="password" name="password" value={props.man_data.password} readOnly/></td></tr>
    )
}

export default ManagerComp
