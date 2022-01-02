import React, {useEffect, useState} from 'react'
import { Button, Modal, Form } from 'react-bootstrap'
import NavBar from './NavBar'
import '../style/Operations.css'
import Service from './Service'
import { Link } from 'react-router-dom'


const Operations = () => {
    const tempDate = new Date();    // Current Date
    const formatedDate = tempDate.getFullYear() + '-' + (tempDate.getMonth()+1) + '-' + tempDate.getDate()  //  Formatted current date('yyyy-MM-dd')
    const [addAccountModal, setAddAccountModal] = useState(false)   // Add Account Modal Handler
    const [oneAccModal, setOneAccModal] = useState(false)     //  Get Employee Account Modal Handler
    const [updateAccountModal, setUpdateAccountModal] = useState(false) // Update Account Modal Handler
    const [deleteAccountModal, setDeleteAccountModal] = useState(false) // Delete Account Modal Handler
    const [assignTaskModal, setAssignTaskModal] = useState(false)   // Assign Task Modal Handler
    const [allSheetsModal, setAllSheetsModal] = useState(false)     //  All TimeSheets Modal Handler
    const [oneSheetModal, setOneSheetModal] = useState(false)   // Get One TimeSheet Modal Handler
    const [updateTaskModal, setUpdateTaskModal] = useState(false)   // Update Task Modal Handler
    const [delTaskModal, setDelTaskModal] = useState(false) // Delete Task Modal Handler

    const [empAcc, setEmpAcc] = useState({_id:0,username:"",password:"",employeeName:""})
    const [allAccounts, setAllAccounts] = useState([])
    const [commonEmpId, setCommonEmpId] = useState(0)
    const [assignTask, setAssignTask] = useState({empId:0,assignDate:formatedDate,taskId:"",taskName:"",description:"",durationOfTask:0,taskExpiryDate:"",comment:""})
    const [oneSheet, setOneSheet] = useState({id:0,date:""})
    const [updateTask, setUpdateTask] = useState({empId:0,taskDate:"",taskId:"",taskName:"",description:"",durationOfTask:0,taskExpiryDate:"",comment:""})
    const [delTaskDetail, setDelTaskDetail] = useState({empId:0,date:"",taskId:""})

    useEffect(()=>getAllAccounts(),[])

    //  -------------------------------------------------------------------INPUT_HANDLER-------------------------------------------------------------------

    //  Add_Account_Modal_Input_Handler
    const addAccInputHandler = (e) =>{
        const {name,value} = e.target
        setEmpAcc((preValue)=>{return {...preValue,[name]:value}})        
    }
    //  Delete_Account_Modal_Input_Handler
    const delGetInputHandler = (e)=>{
        const empId = e.target.value
        setCommonEmpId(empId)
    }
    //  Assign_Task_Modal_Input_Handler
    const assignTaskInputHandle = (e) =>{
        const {name,value} = e.target
        setAssignTask((preValue)=>{return {...preValue, [name]:value}})
    }
    //  One_TimeSheet_Modal_Input_Handler
    const oneSheetInputHandler = (e) =>{
        const {name,value} = e.target
        setOneSheet((preValue)=>{return {...preValue, [name]:value}})
    }
    //  Update_Task_Modal_Input_Handler
    const updateTaskInputHandler = (e) =>{
        const {name,value} = e.target
        setUpdateTask((preValue)=>{return {...preValue, [name]:value}})
    }
    //  Delete_Task_Modal_Input_Handler
    const delTaskInputHandler = (e) =>{
         const {name,value} = e.target
         setDelTaskDetail((preValue)=>{return {...preValue, [name]:value}})
    }


    // -------------------------------------------------------------------ACCOUNT_FUNCTIONS-------------------------------------------------------------------

    //  Add_New_Account
    function addAccount(e){
        // e.preventDefault()
        setEmpAcc((preValue)=>{return {...preValue,_id:0,username:"",password:"",employeeName:""}})
        setAddAccountModal(false)
        if(empAcc._id !== 0){
            const employeeDetail = {_id:empAcc._id,username:empAcc.username,password:empAcc.password,employee:{name:empAcc.employeeName,address:"",age:0,email:"",mobile:"",gender:"",department:"",socialCategory:"",
        physicallyChallenged:"",religion:"",dateOfBirth:"",maritalStatus:"",profileStatus:"",fatherName:""}}
            Service.addNewAccount(employeeDetail)
            .then(res=>{
                if(res.data.msg === "Account already exists by this Id"){
                    alert('Account already exists by this Id')
                }else if(res.data.msg === "Added"){
                    alert('Successfully Added')
                }else if(res.data.msg === 'Account already exists by username'){
                    alert('Username/Email already Exist try another')
                }else{
                    console.log(res.data)
                }
            })
            .catch(err=>{alert(err)})
        }
        else{
            alert('Id should not be zero')
        }
                
    }

    //  Get_All_Accounts
    function getAllAccounts(){
        Service.getAllAccounts()
        .then(res=>{
            setAllAccounts(()=>{return res.data})
        })
        .catch(err=>console.log(err))
    }

    //  Get_Employee_Account_By_Id
    function getAccountById(e){
        e.preventDefault()
        if(commonEmpId !== 0){
            Service.getAccountById(commonEmpId)
            .then(res=>{
                if(res.data.msg === 'Id not found'){
                    alert('Employee Id Not Exist')
                    setCommonEmpId(0)
                }else{
                    console.log(res.data)
                }
            })
            .catch(err=>console.log(err))
            setOneAccModal(false)
        }else{
            alert("Employee Id Can't be zero")
        }
    }

    //  Delete_Account_By_Id
    function deleteAccount(e){
        e.preventDefault()
        if(commonEmpId !== 0){
            Service.deleteAccount(commonEmpId)
            .then(res=>{
                if(res.data.msg === 'No Account for this Id to delete'){
                    alert(`${commonEmpId} Id Not Exist `)
                }else if(res.data.msg === 'Deleted'){
                    alert('Deleted')
                    setCommonEmpId(0)
                }else{console.log(res)}})
            .catch(err=>console.log(err))
            setDeleteAccountModal(false)
        }else{
            alert("Employee Id Can't be zero")
        }        
    }

    //  Assign_Task_To_Employee
    function assignEmpTask(e){
        e.preventDefault()
        if(assignTask.empId !== 0){
            if(assignTask.durationOfTask > 0){
                const empCreDet = {id:assignTask.empId,date:assignTask.assignDate,task:{taskId:assignTask.taskId,taskName:assignTask.taskName,description:assignTask.description,durationOfTask:assignTask.durationOfTask,
                    taskExpiryDate:assignTask.taskExpiryDate,comment:assignTask.comment,status:"",consumedHours:0.0,remainingHours:0.0,progress:0} }
                Service.assignTask(empCreDet)
                .then(res=>{
                    if(res.data === 'TaskId Exist try another '){
                        alert('Task Number already Exist')
                    }else if(res.data.msg === 'Task Created'){
                        alert("Task Created")
                    }else if(res.data.msg === 'Given empId Not Exist'){
                        alert('Given EmployeeId Not Exist')
                    }else{
                        console.log(res.data)                    
                    }
                })
                .catch(err=>console.log(err))
                setAssignTask({empId:0,assignDate:formatedDate,taskId:"",taskName:"",description:"",durationOfTask:0,taskExpiryDate:"",comment:""})
                setAssignTaskModal(false)
            }else{
                alert('Task Duration Should be greater than zero')
            }
        }else{
            alert("Employee Id Can't be zero")
        }        
    }
    
    //  Get_All_TimeSheets_Of_One_Employee
    function getAllTimeSheets(e){
        e.preventDefault()
        if(commonEmpId !== 0){
            Service.getAllTimeSheetById(commonEmpId)
            .then(res=>{
                if(res.data === 'TimeSheets Not Exist'){
                    alert('TimeSheets Not Exist for this EmployeeId')
                }else{
                    console.log(res.data)
                }
            })
            .catch(err=>console.log(err))
            setAllSheetsModal(false)
            setCommonEmpId(0)
        }else{
            alert("Employee Id Can't be zero")
        } 
    }

    //  Get_One_TimeSheet_Of_Employee
    function getOneTimeSheet(e){
        e.preventDefault()
        if(oneSheet.id !== 0){
            Service.getOneSheet(oneSheet)
            .then(res=>{
                if(res.data === 'No Sheet for given empId of given date'){
                    alert('No Sheet for given empId of given date')
                }else{
                    console.log(res.data)
                }
            })
            .catch(err=>console.log(err))
            setOneSheetModal(false)
            setOneSheet({id:0,date:""})
        }else{
            alert("Employee Id Can't be zero")
        }
        

        // const empDetail = {id:111,date:"2021-12-28"}
         
    }

    //  Update_Task_For_Employee
    function updateEmpTask(e){
         e.preventDefault()
        if(updateTask.empId !== 0){
            if(updateTask.durationOfTask > 0){
                const taskDetail = {empId:updateTask.empId,date:updateTask.taskDate,taskId:updateTask.taskId,empTask:{taskId:updateTask.taskId,taskName:updateTask.taskName,description:updateTask.description,durationOfTask:updateTask.durationOfTask,taskExpiryDate:updateTask.taskExpiryDate,comment:updateTask.comment,status:"",consumedHours:0.0,remainingHours:0.0,progress:0}}
                Service.updateTask(taskDetail)
                .then(res=>{
                    if(res.data.msg === 'EmpId Not Exist'){
                        alert('Employee Id Not Exist')
                    }if(res.data.msg === 'Sheet Not Exist with given empId and date'){
                        alert(`No Sheet Exist for ${updateTask.taskDate} Date`)
                    }if(res.data.msg === 'TaskId Not Exist'){
                        alert('TaskId Not Exist')
                    }if(res.data.msg === 'Task Updated'){
                        alert('Task Updated')
                        setUpdateTask({empId:0,taskDate:"",taskId:"",taskName:"",description:"",durationOfTask:0,taskExpiryDate:"",comment:""})
                        setUpdateTaskModal(false)
                    }else{
                        console.log(res.data)
                    }
                })
                .catch(err=>console.log(err))
            }else{
                alert('Task Duration Should be greater than zero')
            }
        }else{
            alert("Employee Id Can't be zero")
        }
        
        // const taskDetail = {empId:111,date:"2021-12-28",taskId:"111202112283",empTask:{taskId:"111202112283",taskName:"task3",description:"this is updates task3",durationOfTask:4,taskExpiryDate:"2021-12-31",comment:"updated",status:"",consumedHours:0.0,remainingHours:0.0,progress:0}}
        // Service.updateTask(taskDetail)
        // .then(res=>console.log(res.data))
        // .catch(err=>console.log(err))
    }

    //  Delete_Task_By_Id
    function deleteTask(e){
        e.preventDefault()
        if(delTaskDetail.empId !== 0){            
            Service.deleteTask(delTaskDetail)
            .then(res=>{
                 if(res.data.msg === 'EmpId Not Exist'){
                     alert('EmployeeId Not Exist')
                 }else if(res.data.msg === 'Sheet Not Exist with given empId and date'){
                     alert('Sheet Not Exist with given empId and date')
                 }if(res.data.msg === 'No Task with this taskId to delete'){
                     alert('No Task on this taskId to delete')
                 }if(res.data.msg === 'Deleted'){
                     alert('Deleted')
                 }else{
                     console.log(res.data)
                 }
            })
            .catch(err=>console.log(err))
            setDelTaskModal(false)
            setDelTaskDetail({empId:0,date:"",taskId:""})
        }else{
            alert("EmployeeId Can't be Zero")
        }
        
    }


    //  -------------------------------------------------------------------RENDERING_BODY-------------------------------------------------------------------
    
    return (
        <React.Fragment>
        <NavBar flag={false} role={'Manager'} />

        {/*-------------------------------------------------------------------BOOTSTRAP_MODALS-------------------------------------------------------------------*/}

        {/* ---------Add_New_Account_Modal--------- */}

        <Modal show={addAccountModal} onHide={()=>{setAddAccountModal(false)}} backdrop="static" keyboard={false} >
            <Modal.Header closeButton>
            <Modal.Title>Add Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/*Form*/}
                <Form onSubmit={addAccount} method='POST'>
                    <Form.Group className="mb-3" controlId="formBasicId">
                        <Form.Label>Employee Id</Form.Label>
                        <Form.Control type="text" placeholder="Enter employee id" name='_id' onChange={addAccInputHandler} value={empAcc._id} required />                    
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Employee Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter employee email/username" name='username' onChange={addAccInputHandler} value={empAcc.username} required />                    
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Any Password" name='password' onChange={addAccInputHandler} value={empAcc.password} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="empName">
                        <Form.Label>Employee Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter employee Name" name='employeeName' onChange={addAccInputHandler} value={empAcc.employeeName} required />                    
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={()=>{setAddAccountModal(false)}}>Close</Button>
            {/*<Button variant="primary" onClick={addAccount}>Understood</Button>*/}
            </Modal.Footer>
        </Modal>

        {/*----------Get_All_TimeSheets_By_Id_Modal------------- */}

        <Modal show={oneAccModal} onHide={()=>{setOneAccModal(false)}} backdrop="static" keyboard={false} >
            <Modal.Header closeButton>
            <Modal.Title>Employee Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/*Form*/}
                <Form onSubmit={getAccountById} method='POST'>
                    <Form.Group className="mb-3" controlId="formBasicId">
                        <Form.Label>Employee Id</Form.Label>
                        <Form.Control type="text" placeholder="Enter employee id" name='empId' onChange={delGetInputHandler} value={commonEmpId} />                    
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={()=>{setOneAccModal(false)}}>Close</Button>
            </Modal.Footer>
        </Modal>

        {/*-----------Update_Account_By_Id_Modal--------------- */}

        <Modal show={updateAccountModal} onHide={()=>{setUpdateAccountModal(false)}} backdrop="static" keyboard={false} >
            <Modal.Header closeButton>
            <Modal.Title>Update Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/*Form*/}
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicId">
                        <Form.Label>Employee Id</Form.Label>
                        <Form.Control type="text" placeholder="Enter employee id" name='id' />                    
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Employee Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter employee email/username" />                    
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Enter Any Password" />
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>{setUpdateAccountModal(false)}}>Close</Button>
            </Modal.Footer>
        </Modal>

        {/*----------Delete_Accout_By_Id_Modal------------- */}

        <Modal show={deleteAccountModal} onHide={()=>{setDeleteAccountModal(false)}} backdrop="static" keyboard={false} >
            <Modal.Header closeButton>
            <Modal.Title>Delete Account</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/*Form*/}
                <Form onSubmit={deleteAccount} method='POST'>
                    <Form.Group className="mb-3" controlId="formBasicId">
                        <Form.Label>Employee Id</Form.Label>
                        <Form.Control type="text" placeholder="Enter employee id" name='empId' onChange={delGetInputHandler} value={commonEmpId} />                    
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={()=>{setDeleteAccountModal(false)}}>Close</Button>
            </Modal.Footer>
        </Modal>

        {/*----------Assign_Task_Modal------------- */}

        <Modal show={assignTaskModal} size='lg' onHide={()=>{setAssignTaskModal(false)}} backdrop="static" keyboard={false} >
            <Modal.Header closeButton>
            <Modal.Title>Assign Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/*Form*/}  
                <Form onSubmit={assignEmpTask} method='POST'>
                    <Form.Group className="mb-3" controlId="employeeId">
                        <Form.Label>Employee Id</Form.Label>
                        <Form.Control type="text" placeholder="Enter employee id" name='empId' onChange={assignTaskInputHandle} value={assignTask.empId} required />                    
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="taskAssignDate">
                        <Form.Label>Assign Date</Form.Label>
                        <Form.Control type="date" name='assignDate' onChange={assignTaskInputHandle} value={assignTask.assignDate} required />                    
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="taskId">
                        <Form.Label>Task Number</Form.Label>
                        <Form.Control type="number" placeholder="Enter task number" name='taskId' title='Task Number Ex-(1,2,3)' onChange={assignTaskInputHandle} value={assignTask.taskId} required />                    
                    </Form.Group>                    
                    <Form.Group className="mb-3" controlId="taskName">
                        <Form.Label>Task Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Task Name" name='taskName' onChange={assignTaskInputHandle} value={assignTask.taskName} required />                    
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="taskDescription">
                        <Form.Label>Task Description</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder='Enter Description Here' name='description' onChange={assignTaskInputHandle} value={assignTask.description} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="taskDuration">
                        <Form.Label>Total Task Duration</Form.Label>
                        <Form.Control type="number" placeholder="Enter Task Duration(in hrs)" name='durationOfTask' onChange={assignTaskInputHandle} value={assignTask.durationOfTask} required />                    
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="taskExpiryDate">
                        <Form.Label>Task Expiry Date</Form.Label>
                        <Form.Control type="date" name='taskExpiryDate' onChange={assignTaskInputHandle} value={assignTask.taskExpiryDate} required />                    
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="taskComment">
                        <Form.Label>Task Comment</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder='Enter Comment Here' name='comment' onChange={assignTaskInputHandle} value={assignTask.comment} />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={()=>{setAssignTaskModal(false)}}>Close</Button>
            
            </Modal.Footer>
        </Modal>

        {/*----------Get_All_TimeSheets_By_Id_Modal------------- */}

        <Modal show={allSheetsModal} onHide={()=>{setAllSheetsModal(false)}} backdrop="static" keyboard={false} >
            <Modal.Header closeButton>
            <Modal.Title>All TimeSheets of Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/*Form*/}
                <Form onSubmit={getAllTimeSheets} method='POST'>
                    <Form.Group className="mb-3" controlId="formBasicId">
                        <Form.Label>Employee Id</Form.Label>
                        <Form.Control type="text" placeholder="Enter employee id" name='empId' onChange={delGetInputHandler} value={commonEmpId} />                    
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={()=>{setAllSheetsModal(false)}}>Close</Button>
            </Modal.Footer>
        </Modal>

        {/*-----------Get_One_TimeSheet_Modal-------------*/}

        <Modal show={oneSheetModal} onHide={()=>{setOneSheetModal(false)}} backdrop="static" keyboard={false} >
            <Modal.Header closeButton>
            <Modal.Title>Employee Time Sheet</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/*Form*/}
                <Form onSubmit={getOneTimeSheet} method='POST'>
                    <Form.Group className="mb-3" controlId="empId">
                        <Form.Label>Employee Id</Form.Label>
                        <Form.Control type="text" placeholder="Enter employee id" name='id' onChange={oneSheetInputHandler} value={oneSheet.id} required />                    
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="timeSheetDate">
                        <Form.Label>Date of TimeSheet</Form.Label>
                        <Form.Control type="date" name='date' onChange={oneSheetInputHandler} value={oneSheet.date} required />                    
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={()=>{setOneSheetModal(false)}}>Close</Button>
            </Modal.Footer>
        </Modal>

        {/*----------Update_Employee_Task_Modal------------- */}

        <Modal show={updateTaskModal} size='lg' onHide={()=>{setUpdateTaskModal(false)}} backdrop="static" keyboard={false} >
            <Modal.Header closeButton>
            <Modal.Title>Update Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/*Form*/}  
                <Form onSubmit={updateEmpTask} method='POST'>
                    <Form.Group className="mb-3" controlId="employeeId">
                        <Form.Label>Employee Id</Form.Label>
                        <Form.Control type="text" placeholder="Enter employee id" name='empId' onChange={updateTaskInputHandler} value={updateTask.empId} required />                    
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="taskDate">
                        <Form.Label>Task Date</Form.Label>
                        <Form.Control type="date" name='taskDate' onChange={updateTaskInputHandler} value={updateTask.taskDate} required />                    
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="taskId">
                        <Form.Label>Task Id</Form.Label>
                        <Form.Control type="number" placeholder="Enter TaskId" name='taskId' title='Task Number Ex-(1,2,3)' onChange={updateTaskInputHandler} value={updateTask.taskId} required />                    
                    </Form.Group>                    
                    <Form.Group className="mb-3" controlId="taskName">
                        <Form.Label>Task Name</Form.Label>
                        <Form.Control type="text" placeholder="Update Task Name" name='taskName' onChange={updateTaskInputHandler} value={updateTask.taskName} required />                    
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="taskDescription">
                        <Form.Label>Task Description</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder='Update Description Here' name='description' onChange={updateTaskInputHandler} value={updateTask.description} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="taskDuration">
                        <Form.Label>Total Task Duration</Form.Label>
                        <Form.Control type="number" placeholder="Update Task Duration(in hrs)" name='durationOfTask' onChange={updateTaskInputHandler} value={updateTask.durationOfTask} required />                    
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="taskExpiryDate">
                        <Form.Label>Task Expiry Date</Form.Label>
                        <Form.Control type="date" name='taskExpiryDate' onChange={updateTaskInputHandler} value={updateTask.taskExpiryDate} required />                    
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="taskComment">
                        <Form.Label>Task Comment</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder='Enter Comment Here' name='comment' onChange={updateTaskInputHandler} value={updateTask.comment} />
                    </Form.Group>
                    
                    <Button variant="primary" type="submit">Update</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={()=>{setUpdateTaskModal(false)}}>Close</Button>            
            </Modal.Footer>
        </Modal>

        {/*-----------Delete_Task_Modal-------------*/}

        <Modal show={delTaskModal} onHide={()=>{setDelTaskModal(false)}} backdrop="static" keyboard={false} >
            <Modal.Header closeButton>
            <Modal.Title>Delete Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/*Form*/}
                <Form onSubmit={deleteTask} method='POST'>
                    <Form.Group className="mb-3" controlId="Id">
                        <Form.Label>Employee Id</Form.Label>
                        <Form.Control type="text" placeholder="Enter employee id" name='empId' onChange={delTaskInputHandler} value={delTaskDetail.empId} required />                    
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="delTaskDate">
                        <Form.Label>Task Date</Form.Label>
                        <Form.Control type="date" name='date' onChange={delTaskInputHandler} value={delTaskDetail.date} required />                    
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="taskId">
                        <Form.Label>Task Id</Form.Label>
                        <Form.Control type="number" placeholder="Enter task id" name='taskId' onChange={delTaskInputHandler} value={delTaskDetail.taskId}  required />
                    </Form.Group>
                    <Button variant="primary" type="submit">Submit</Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={()=>{setDelTaskModal(false)}}>Close</Button>
            </Modal.Footer>
        </Modal>

        
        {/*-------------------------------------------------------------------REACT_JSX-------------------------------------------------------------------*/}
        
        <div className='container-fluid parent_div '>
            <h2 className='text-center mb-2 pt-2'>Operations</h2>
            <hr className='mb-0' />
            <div className='p-4 op_btns row mx-auto '>
                <div className='col-lg-3 col-md-3 col-sm-4 border border-success column_1'>
                    <button className='btn btn-primary my-2 m-1' title='Add New Account for Employee ' onClick={()=>{setAddAccountModal(true)}}>Add Account</button>  {/* Working */}
                    <button className='btn btn-primary my-2 m-1' title='All Employees Accounts List' onClick={getAllAccounts}>All Accounts List</button>    {/* Working but Not Designed */}
                    <button className='btn btn-primary my-2 m-1' title='Get One Employee Account By Employee Id' onClick={()=>{setOneAccModal(true)}}>Get Account By Id</button>    {/* Working but not designed */}
                    {/*<button className='btn btn-primary my-2 m-1' onClick={()=>{setUpdateAccountModal(true)}}>Update Account By Id</button>   */}
                    <button className='btn btn-primary my-2 m-1' title='Delete Employee Account By Employee Id' onClick={()=>{setDeleteAccountModal(true)}}>Delete Account By Id</button>  {/* Working */}
                    <button className='btn btn-primary my-2 m-1' title='Assign Task to any Employee' onClick={()=>{setAssignTaskModal(true)}}>Assign Task</button>  {/* Working */}
                    <button className='btn btn-primary my-2 m-1' title='Get All TimeSheets of One Employee' onClick={()=>{setAllSheetsModal(true)}}>AllTimeSheets</button> {/* Working but not Designed */}
                    <button className='btn btn-primary my-2 m-1' title='Get One TimeSheet of Any Employee' onClick={()=>{setOneSheetModal(true)}}>GetOneSheet</button>    {/* Working but not Designed */}
                    <button className='btn btn-primary my-2 m-1' title='Update Task for Any Employee' onClick={()=>{setUpdateTaskModal(true)}}>UpdateTask</button>   {/* Working */}
                    <button className='btn btn-primary my-2 m-1' title='Delete Task of Any Employee' onClick={()=>{setDelTaskModal(true)}}>Delete Task</button> {/* Working */}
                </div>                
                <div className='col-lg-9 col-md-9 col-sm-8 border border-secondary column_2'>
                    
                    <div className='show_div'>
                        <h3 className='text-center mt-2'>All Employees Account List</h3>
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th>EmployeeId</th>
                                    <th>Employee Email</th>
                                    <th>Employee Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                    {
                                        allAccounts.map((value,index)=>{
                                            return (
                                                
                                                <tr key={index}>
                                                    <td>{value._id}</td>
                                                    <td>{value.username}</td>
                                                    <td>{value.employee.name}</td>
                                                    <td><Link className='nav-link' to={`/login/operations/${value._id}`} >view</Link></td>
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
        </React.Fragment>
    )
}

export default Operations
