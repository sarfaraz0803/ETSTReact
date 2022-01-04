import React, { useState, useEffect } from 'react'
import '../style/Account.css'
import NavBar from './NavBar'
import Service from './Service'
import { useParams , Link } from 'react-router-dom'

const Account = () => {
    const { slug } = useParams()
    const [empAcc, setEmpAcc] = useState({id:"",username:"",name:"",address:"",age:"",email:"",mobile:"",gender:"",department:"",socialCategory:"",
        physicallyChallenged:"",religion:"",dateOfBirth:"",maritalStatus:"",profileStatus:"",fatherName:""})
    const [empSheets,setEmpSheets] = useState([])
    

    useEffect(()=>{
        Service.getAccountById(slug)
        .then(res=>{
            if(res.data.msg === 'Id not found'){
                alert('Employee Not Found')
            }else{
                setEmpAcc(()=>{return {id:res.data._id,username:res.data.username,name:res.data.employee.name,address:res.data.employee.address,age:res.data.employee.age,
                    email:res.data.employee.email,mobile:res.data.employee.mobile,gender:res.data.employee.gender,department:res.data.employee.department,socialCategory:res.data.employee.socialCategory,
                    physicallyChallenged:res.data.employee.physicallyChallenged,religion:res.data.employee.religion,dateOfBirth:res.data.employee.dateOfBirth,maritalStatus:res.data.employee.maritalStatus,
                    profileStatus:res.data.employee.profileStatus,fatherName:res.data.employee.fatherName}})
                setEmpSheets(res.data.timeSheet)
            }
        })
        .catch(err=>console.log(err))
    },[slug])

    

    return (
        <React.Fragment>
        <NavBar flag={false} role={'Manager'} />

        <section className='whole_section'>

        <header className="ScriptHeader">
        <div className="rt-container">
            <div className="col-rt-12">
                <div className="rt-heading text-center">
                    <h1> Employee Account</h1>
                </div>
            </div>
        </div>
        </header>
        <hr className='text-light'/>

        <section className='account_section'>
        <div className="rt-container">
            <div className="col-rt-12">
            <div className="Scriptcontent">
            <div className="student-profile py-4">
            <div className="container">
                {/* First_Row */}
                <div className="row mx-auto first_row">
                <div className="col-lg-4 mb-1">
                    <div className="card shadow-sm" style={{height:"100%"}}>
                    <div className="card-header bg-transparent text-center">
                        <img className="profile_img" src="https://source.unsplash.com/600x300/?student" alt="student dp" />
                        <h3>{empAcc.name}</h3>
                    </div>
                    <div className="card-body">
                        <p className="mb-0"><strong className="pr-1">Employee ID : </strong>{slug}</p>
                        <p className="mb-0"><strong className="pr-1">Username:</strong>{empAcc.username}</p>
                        {/*<button className='btn btn-success mt-5' onClick={()=>{alert('Hello')}}>Update Profile</button>*/}
                    </div>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div className="card shadow-sm empDetail">
                    <div className="card-header bg-transparent border-0">
                        <h3 className="mb-0"><i className="far fa-clone pr-1"></i>General Information</h3>
                    </div>
                    <div className="card-body pt-0">
                        <table className="table table-bordered">
                            <tbody>
                            <tr><th width="30%">Name</th><td width="2%">:</td><td>{empAcc.name}</td></tr>
                            <tr><th width="30%">Address	</th><td width="2%">:</td><td>{empAcc.address}</td></tr>
                            <tr><th width="30%">Age</th><td width="2%">:</td><td>{empAcc.age}</td></tr>
                            <tr><th width="30%">Email</th><td width="2%">:</td><td>{empAcc.email}</td></tr>
                            <tr><th width="30%">Mobile</th><td width="2%">:</td><td>{empAcc.mobile}</td></tr>
                            <tr><th width="30%">Gender</th><td width="2%">:</td><td>{empAcc.gender}</td></tr>
                            <tr><th width="30%">Department</th><td width="2%">:</td><td>{empAcc.department}</td></tr>
                            <tr><th width="30%">Category</th><td width="2%">:</td><td>{empAcc.socialCategory}</td></tr>
                            <tr><th width="30%">Pwd</th><td width="2%">:</td><td>{empAcc.physicallyChallenged}</td></tr>
                            <tr><th width="30%">Religion</th><td width="2%">:</td><td>{empAcc.religion}</td></tr>
                            <tr><th width="30%">Date Of Birth</th><td width="2%">:</td><td>{empAcc.dateOfBirth}</td></tr>
                            <tr><th width="30%">Marital Status</th><td width="2%">:</td><td>{empAcc.maritalStatus}</td></tr>
                            <tr><th width="30%">Profile Status</th><td width="2%">:</td><td>{empAcc.profileStatus}</td></tr>
                            <tr><th width="30%">Father Name</th><td width="2%">:</td><td>{empAcc.fatherName}</td></tr>
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
                </div>
                {/* Second_Row */}
                <div className="row mx-auto second_row">
                    <div className="card shadow-sm my-1">
                    <div className="card-header bg-transparent border-0 text-center">
                        <h2 className="mb-0"><i className="far fa-clone pr-1"></i>List of TimeSheets</h2>
                    </div>
                    <hr />
                    <div className="card-body pt-0">
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th>Sheet Id</th>
                                    <th>Sheet Date</th>
                                    <th>Last Login</th>
                                    <th>Last Logout</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    empSheets.map((val)=>{
                                        return (
                                            <tr key={val.sheetId}>
                                                <td className='values'>{val.sheetId}</td>
                                                <td className='values'>{val.sheetDate}</td>
                                                <td className='values'>{val.lastLogInTime}</td>
                                                <td className='values'>{val.lastLogOutTime}</td>
                                                <td className='values'><Link className='nav-link' to={`/login/operations/${slug}/${val.sheetDate}`} >View</Link></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </div>
            </div>
            </div>
            </div>
            </div>
        </section>
        </section>
            
        </React.Fragment>
    )
}

export default Account
