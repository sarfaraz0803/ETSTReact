import React from "react"
import '../style/ManagerComp.css'
import NavBar from "./NavBar"

const ManagerComp = (props) => { 
    return (
        <React.Fragment>
        <NavBar flag={true} logout={props.logout_func} />
        <div className="manager_page container-fluid mx-auto">
            <div className="row mx-auto">
                <div className="left_part col-lg-3 col-md-4 col-10 mx-auto">
                    <h3>My Dashboard</h3>
                    <div className="operations">
                        <button>Profile</button>
                        <button>Operations</button>
                        <button onClick={props.logout_func}>Logout</button>
                    </div>
                </div>
                <div className="right_part col-lg-9 col-md-8 col-10 mx-auto">
                    <h1>Profile</h1>                    
                       <form className="profile_div form-group">
                       <table className="mx-auto mt-3">
                            <tbody>
                            <tr><td><label htmlFor="username">Username : </label></td><td><input className="m-2 form-control" type="email" name="username" value={props.man_data.username} readOnly/></td></tr>
                            
                            <tr><td><label htmlFor="name">Name : </label></td><td><input className="m-2 form-control" type="text" name="name" value={props.man_data.name} readOnly/></td></tr>
                            
                            <tr><td><label htmlFor="email">Email : </label></td><td><input className="m-2 form-control" type="email" name="email" value={props.man_data.email} readOnly/></td></tr>
                            
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
