import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import '../style/EmpProfile.css'
import NavBar from './NavBar'
import Service from './Service'
import { Button, Modal, Form} from 'react-bootstrap'

const EmpProfile = () => {
    const [updateEmpModal,setUpdateEmpModal] = useState(false)  //  Employee_Account_Update_Modal_Handler
    const [employeeData, setEmployeeData] = useState({id:0,username:"",password:"",name:"",address:"",age:0,email:"",mobile:"",gender:"",department:"",socialCategory:"",physicallyChallenged:"",religion:"",
        dateOfBirth:"",maritalStatus:"",profileStatus:"",fatherName:""})
    const [empSheet, setEmpSheet ] = useState([]) // props.empData.timeSheet
    
    useEffect(()=>{
        const empStore = JSON.parse(localStorage.getItem('EmployeeCredentials')).account
        const empCre = JSON.parse(localStorage.getItem('EmpCre'))
        setEmployeeData((preValue)=>{return {...preValue,id:empStore._id,username:empStore.username,password:empCre.password,name:empStore.employee.name,address:empStore.employee.address,age:empStore.employee.age,
        email:empStore.employee.email,mobile:empStore.employee.mobile,gender:empStore.employee.gender,department:empStore.employee.department,socialCategory:empStore.employee.socialCategory,
        physicallyChallenged:empStore.employee.physicallyChallenged,religion:empStore.employee.religion,dateOfBirth:empStore.employee.dateOfBirth,maritalStatus:empStore.employee.maritalStatus,
        profileStatus:empStore.employee.profileStatus,fatherName:empStore.employee.fatherName}})
        setEmpSheet(()=>empStore.timeSheet)        
    },[])   

    
    //  Upadte_Account_Information_Function
    function updateEmpDetails(e){
        e.preventDefault()
        const employeeDetail = {_id:employeeData.id, username:employeeData.username, password:employeeData.password,employee:{name:employeeData.name,address:employeeData.address,age:employeeData.age,
            email:employeeData.username,mobile:employeeData.mobile,gender:employeeData.gender,department:employeeData.department,socialCategory:employeeData.socialCategory,
            physicallyChallenged:employeeData.physicallyChallenged,religion:employeeData.religion,dateOfBirth:employeeData.dateOfBirth,maritalStatus:employeeData.maritalStatus,profileStatus:employeeData.profileStatus,
            fatherName:employeeData.fatherName}}
        Service.empUpdate(employeeDetail)
        .then(res=>{
            if(res.data._id === employeeDetail._id){
                alert('Successfully Updated')
                setUpdateEmpModal(false)
            }else{
                console.log(res)
            }
        })
        .catch(err=>console.log(err))
    }

    //  Update_Modal_Input_Field_Handler
    function updateModalInputHandler(e){
        const { name, value } = e.target
        setEmployeeData((preValue)=>{return{...preValue, [name]:value}})
    }
    
    return (
        <React.Fragment>
        <NavBar flag={false} role={'Employee'} />

        {/*----------------------------------------Employee_Details_Update_Modal--------------------------------------*/}

        {/* ---------Update_Account_Modal--------- */}

        <Modal show={updateEmpModal} onHide={()=>{setUpdateEmpModal(false)}} backdrop="static" keyboard={false} >
            <Modal.Header closeButton>
            <Modal.Title>Update Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/*Form*/}
                <Form onSubmit={updateEmpDetails} method='POST'>
                    <Form.Group className="mb-3" controlId="empId">
                        <Form.Label>Employee Id</Form.Label>
                        <Form.Control type="number" name='id' defaultValue={employeeData.id} readOnly />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="empUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="email" name='username' defaultValue={employeeData.username} readOnly />                    
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="empPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter password" name='password' onChange={updateModalInputHandler} value={employeeData.password} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="empName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your name" name='name' onChange={updateModalInputHandler} value={employeeData.name} required />                    
                    </Form.Group>                    
                    <Form.Group className="mb-3" controlId="empAddress">
                        <Form.Label>Address</Form.Label>
                        <Form.Control type="text" placeholder="Enter your address" name='address' onChange={updateModalInputHandler} value={employeeData.address} required />                    
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="empAge">
                        <Form.Label>Age</Form.Label>
                        <Form.Control type="number" placeholder="Enter your age" name='age' onChange={updateModalInputHandler} value={employeeData.age} required />                    
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="empEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" name='email' defaultValue={employeeData.email} readOnly />                    
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="empMobile">
                        <Form.Label>Mobile</Form.Label>
                        <Form.Control type="number" placeholder="Enter your contact number" name='mobile' onChange={updateModalInputHandler} value={employeeData.mobile} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="empGender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control type="text" placeholder="Your Gender" name='gender' onChange={updateModalInputHandler} value={employeeData.gender} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="empDepartment">
                        <Form.Label>Department</Form.Label>
                        <Form.Control type="text" placeholder="Enter your department" name='department' onChange={updateModalInputHandler} value={employeeData.department} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="empCategory">
                        <Form.Label>Social Category</Form.Label>
                        <Form.Control type="text" placeholder="Enter your category" name='socialCategory' onChange={updateModalInputHandler} value={employeeData.socialCategory} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="empPWD">
                        <Form.Label>Physically Challenged</Form.Label>
                        <Form.Control type="text" placeholder="True / False" name='physicallyChallenged' onChange={updateModalInputHandler} value={employeeData.physicallyChallenged} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="empReligion">
                        <Form.Label>Religion</Form.Label>
                        <Form.Control type="text" placeholder="Enter your religion" name='religion' onChange={updateModalInputHandler} value={employeeData.religion} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="empDateOfBirth">
                        <Form.Label>Date Of Birth</Form.Label>
                        <Form.Control type="date" name='dateOfBirth' onChange={updateModalInputHandler} value={employeeData.dateOfBirth} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="empMaritalStatus">
                        <Form.Label>Marital Status</Form.Label>
                        <Form.Control type="text" placeholder="Enter your marital status" name='maritalStatus' onChange={updateModalInputHandler} value={employeeData.maritalStatus} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="empProfileStatus">
                        <Form.Label>Profile Status</Form.Label>
                        <Form.Control type="text" placeholder="Enter your profile status(active/deactive)" name='profileStatus' onChange={updateModalInputHandler} value={employeeData.profileStatus} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="empFathername">
                        <Form.Label>Father Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter your father name" name='fatherName' onChange={updateModalInputHandler} value={employeeData.fatherName} required />
                    </Form.Group>                    
                    <Button variant="primary" type="submit">Update</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={()=>{setUpdateEmpModal(false)}}>Close</Button>
            {/*<Button variant="primary" onClick={addAccount}>Understood</Button>*/}
            </Modal.Footer>
        </Modal>

        {/*----------------------------------------React_JSX--------------------------------------*/}

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
                                        <h3>{employeeData.name}</h3>
                                    </div>
                                    <div className="card-body">
                                        <p className="mb-0"><strong className="pr-1">Employee ID:</strong>{employeeData.id}</p>
                                        <p className="mb-0"><strong className="pr-1">Username:</strong>{employeeData.username}</p>
                                    </div>
                                    <div className='card-footer update_footer text-center'>
                                        <button className='btn btn-success' onClick={()=>setUpdateEmpModal(true)}>Update Profile</button> 
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
                                            <tr><th width="30%">Name</th><td width="2%">:</td><td>{employeeData.name}</td></tr>
                                            <tr><th width="30%">Address	</th><td width="2%">:</td><td>{employeeData.address}</td></tr>
                                            <tr><th width="30%">Age</th><td width="2%">:</td><td>{employeeData.age}</td></tr>
                                            <tr><th width="30%">Email</th><td width="2%">:</td><td>{employeeData.email}</td></tr>
                                            <tr><th width="30%">Mobile</th><td width="2%">:</td><td>{employeeData.mobile}</td></tr>
                                            <tr><th width="30%">Gender</th><td width="2%">:</td><td>{employeeData.gender}</td></tr>
                                            <tr><th width="30%">Department</th><td width="2%">:</td><td>{employeeData.department}</td></tr>
                                            <tr><th width="30%">Category</th><td width="2%">:</td><td>{employeeData.socialCategory}</td></tr>
                                            <tr><th width="30%">Pwd</th><td width="2%">:</td><td>{employeeData.physicallyChallenged}</td></tr>
                                            <tr><th width="30%">Religion</th><td width="2%">:</td><td>{employeeData.religion}</td></tr>
                                            <tr><th width="30%">Date Of Birth</th><td width="2%">:</td><td>{employeeData.dateOfBirth}</td></tr>
                                            <tr><th width="30%">Marital Status</th><td width="2%">:</td><td>{employeeData.maritalStatus}</td></tr>
                                            <tr><th width="30%">Profile Status</th><td width="2%">:</td><td>{employeeData.profileStatus}</td></tr>
                                            <tr><th width="30%">Father Name</th><td width="2%">:</td><td>{employeeData.fatherName}</td></tr>
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
                                                empSheet.map((value,index)=>{
                                                    return(
                                                        <tr key={value.sheetId}>
                                                            <td className='values'>{ value.sheetId }</td>
                                                            <td className='values'>{ value.sheetDate }</td>
                                                            <td className='values'>{ value.lastLogInTime }</td>
                                                            <td className='values'>{ value.lastLogOutTime }</td>
                                                            <td className='values'><Link className='nav-link p-0' to={`/login/${value.employeeId}/${value.sheetDate}`}>View</Link></td>
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

export default EmpProfile
