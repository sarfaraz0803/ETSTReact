import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Service from './Service'
import '../style/EmpProfile.css'
import NavBar from './NavBar'

const EmpProfile = (props) => {
    const [show, setShow] = useState(true)
    const [loginCre, setLoginCre] = useState({_id:"",username:"",password:""})
    const [employeeData, setEmployeeData] = useState({name:"",address:"",age:0,email:"",mobile:"",gender:"",department:"",socialCategory:"",
        physicallyChallenged:"",religion:"",dateOfBirth:"",maritalStatus:"",profileStatus:"",fatherName:""})
    const emp = props.empData.employee
    const empPassword = JSON.parse(localStorage.getItem('EmpCre'))
    const account = props.empData.timeSheet

    useEffect(()=>setDefaults(),[])
    
    const setDefaults = ()=>{
        
        setEmployeeData((preValue)=>{return {...preValue, name:emp.name, address:emp.address, age:emp.age, email:emp.email, mobile:emp.mobile, gender:emp.gender, department:emp.department, socialCategory:emp.socialCategory,
                    physicallyChallenged:emp.physicallyChallenged, religion:emp.religion, dateOfBirth:emp.dateOfBirth,maritalStatus:emp.maritalStatus, profileStatus:emp.profileStatus, fatherName:emp.fatherName }})
        setLoginCre((preValue)=>{return {...preValue,_id:props.empData._id,username:props.empData.username, password:empPassword.password}})
        //console.log(account)
    }
    

    const inputHandler = (event)=>{
        const {name, value} = event.target;
        name === 'password'?
        setLoginCre((preValue)=>{return {...preValue, [name]:value }}):
        setEmployeeData((preValue)=>{return {...preValue, [name]:value }})
        
    }

    const submitHandler = (event)=>{
        event.preventDefault()
        const empUpdateData = {_id:loginCre._id,username:loginCre.username,password:empPassword.password,employee:employeeData}
        console.log(empUpdateData)
        // Service.empUpdate(empUpdateData)
        // .then((response=>console.log(response)))
        // .catch(err=>console.log(err))
    }

    return (
        <React.Fragment>
        <NavBar flag={props.flag} logout={props.logout_func} />
        {
            show === true?
        
        <div className='emp_profile'>
        <h2>Profile</h2>
        <div className='main_div'>
            <form onSubmit={submitHandler}>
                <div className="row mx-auto">

                    <div className="col-lg-6 col-md-6 col-6">
                        <div className='form-group mt-1'>
                            <label htmlFor="useridControl">UserId</label>
                            <input type="text" className="form-control" name='userId' id="useridControl" defaultValue={loginCre._id} readOnly/>
                        </div>
                        <div className='form-group mt-1'>
                            <label htmlFor="nameControl">Name</label>
                            <input type="text" className="form-control" name='name' id="nameControl" placeholder="Enter Your Name" onChange={inputHandler} value={employeeData.name}/>
                        </div>
                        <div className='form-group mt-1'>
                            <label htmlFor="addressControl">Address</label>
                            <input type="text" className="form-control" name='address' id="addressControl" placeholder="Enter Your Address" onChange={inputHandler} value={employeeData.address}/>
                        </div>
                        <div className='form-group mt-1'>
                            <label htmlFor="ageControl">Age</label>
                            <input type="nubmer" className="form-control" name='age' id="ageControl" placeholder="Enter Your Age" onChange={inputHandler} value={employeeData.age}/>
                        </div>
                        <div className="form-group mt-1">
                            <label htmlFor="emailControl">Email address/ Username</label>
                            <input type="email" className="form-control" name='email' id="emailControl" placeholder="name@example.com" onChange={inputHandler} value={employeeData.email}/>
                        </div>
                        <div className='form-group mt-1'>
                            <label htmlFor="mobileControl">Mobile Number</label>
                            <input type="number" className="form-control" name='mobile' id="mobileControl" placeholder="Enter Your Mobile Number"  onChange={inputHandler} value={employeeData.mobile}/>
                        </div>
                        <div className="form-group mt-1">
                            <label htmlFor="genderControl">Gender</label>
                            <select className="form-control" id="genderControl" name='gender' onChange={inputHandler} value={employeeData.gender}>
                            <option value="">--select--</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            </select>
                        </div>
                        <div className='form-group mt-1'>
                            <label htmlFor="departmentControl">Department</label>
                            <input type="text" className="form-control" name='department' id="departmentControl" placeholder="Enter Your Department" onChange={inputHandler} value={employeeData.department}/>
                        </div>                
                    </div>

                    <div className="col-lg-6 col-md-6 col-6">

                        <div className='form-group mt-1'>
                            <label htmlFor="passwordControl">Password</label>
                            <input type="password" className="form-control" name='password' id="passwordControl" placeholder="Enter Your Password" onChange={inputHandler} value={loginCre.password}/>
                        </div> 
                        <div className='form-group mt-1'>
                            <label htmlFor="categoryControl">Category</label>
                            <select className="form-control" id="categoryControl" name='socialCategory' onChange={inputHandler} value={employeeData.socialCategory}>
                            <option value="">--select--</option>
                            <option value="general">General</option>
                            <option value="obc">OBC</option>
                            <option value="sc">SC</option>
                            <option value="st">ST</option>
                            <option value="others">others</option>
                            </select>
                        </div>
                        <div className="form-group mt-1">
                            <label htmlFor="disabilityControl">Physically Challenged</label>
                            <select className="form-control" id="disabilityControl" name='physicallyChallenged' onChange={inputHandler} value={employeeData.physicallyChallenged}>
                            <option value="">--select--</option>
                            <option value="false">False</option>
                            <option value="true">True</option>
                            </select>
                        </div>
                        <div className='form-group mt-1'>
                            <label htmlFor="religionControl">Religion</label>
                            <input type="text" className="form-control" name='religion' id="religionControl" placeholder="Enter Your Religion" onChange={inputHandler} value={employeeData.religion}/>
                        </div>
                        <div className='form-group mt-1'>
                            <label htmlFor="dobControl">Date Of Birth</label>
                            <input type="date" className="form-control" name='dateOfBirth' id="dobControl" onChange={inputHandler} value={employeeData.dateOfBirth}/>
                        </div>
                        <div className='form-group mt-1'>
                            <label htmlFor="maritalControl">Marital Status</label>
                            <select className="form-control" id="maritalControl" name='maritalStatus' onChange={inputHandler} value={employeeData.maritalStatus}>
                            <option value="">--select--</option>
                            <option value="married">Married</option>
                            <option value="unmarried">Unmarried</option>
                            <option value="divorsed">Divorsed</option>
                            <option value="others">others</option>
                            </select>
                        </div>
                        <div className='form-group mt-1'>
                            <label htmlFor="profileStatusControl">Profile Status</label>
                            <input type="text" className="form-control" name='profileStatus' id="profileStatusControl" placeholder="Enter Profile Status"  onChange={inputHandler} value={employeeData.profileStatus}/>
                        </div>
                        <div className='form-group mt-1'>
                            <label htmlFor="nameControl">Father Name</label>
                            <input type="text" className="form-control" name='fatherName' id="fatherControl" placeholder="Enter Your Father Name" onChange={inputHandler} value={employeeData.fatherName}/>
                        </div>
                    </div>
                </div>
                <div className='form-group mt-4 text-center'>
                    <button className='btn btn-success mx-2' type='submit'>Update</button>
                    <button className='btn btn-danger mx-2' onClick={()=>{setShow(false)}}>Show TimeSheets</button>
                </div>
            </form>
            
        </div> 
        </div>
        :
        <div className='timeSheet'>
                <h2 className='my-3 text-center'>Sheets List</h2>
                <hr />
                <div className='listofSheet'>
                    <table className='table table-striped'>
                    <thead>
                        <tr>
                            <th>Sheet Id</th>
                            <th>Sheet Date</th>
                            <th>LastLogin</th>
                            <th>LastLogout</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                            {
                                account.map((val,ind)=>{
                                    return (
                                        <tr key={val.sheetId}>
                                            <td>{val.sheetId}</td>
                                            <td>{val.sheetDate}</td>
                                            <td>{val.lastLogInTime}</td>
                                            <td>{val.lastLogOutTime}</td>
                                            <td><Link className="nav-link text-dark" to={`/login/${val.sheetId}`} >view</Link></td>
                                        </tr>
                                    )
                                })
                            }
                    </tbody>
                </table>
                </div>
            
                <div className='timeSheetButton text-center'><button className='btn btn-dark' onClick={()=>{setShow(true)}}>Profile</button></div>
        </div>
        }
        </React.Fragment>
    )
}

export default EmpProfile
