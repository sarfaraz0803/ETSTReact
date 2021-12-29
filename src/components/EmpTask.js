import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../style/EmpTask.css'

const EmpTask = () => {
    const [employeeTask,setEmployeeTask] = useState({taskId:"",taskName:"",description:"",taskCreation:"",durationOfTask:0,taskExpiryDate:"",comment:"",status:"",consumedHours:0.0,remainingHours:0.0,progress:0
          })

    const { slug, slug1 } = useParams()
    const empAcc = JSON.parse(localStorage.getItem('EmployeeCredentials'))
    const timeSheetList = empAcc.account.timeSheet
    const getSheet = timeSheetList.filter( val => val.sheetId === slug )
    const finalSheet = getSheet[0]
    const taskList = finalSheet.empTask
    const getTask = taskList.filter( val => val.taskId === slug1 )
    const finalTask = getTask[0]

    useEffect(()=>setDefaults(),[])

    function setDefaults(){
        setEmployeeTask((preValue)=>{return{...preValue,taskId:finalTask.taskId,taskName:finalTask.taskName,description:finalTask.description,taskCreation:finalTask.taskCreation,durationOfTask:finalTask.durationOfTask,
            taskExpiryDate:finalTask.taskExpiryDate,comment:finalTask.comment,status:finalTask.status,consumedHours:finalTask.consumedHours,remainingHours:finalTask.remainingHours,progress:finalTask.progress }})
    }

    

    const submitHandler = (event)=>{
        event.preventDefault()
        alert('formSubmitted')

    }

    return (
        <React.Fragment>
        
        <div className='container-fluid emptask_main'>
            <h1 className='text-center main_heading'>Employee Task Detail</h1>
            <div className="row main_div">
                <div className="col-lg-8 offset-lg-2 task_detail">
                    <form className='form-group'>
                        <table>
                            <tbody className='table_body'>
                                <tr>
                                    <td><label htmlFor="taskId">TaskId : </label></td>
                                    <td><input type="text" className='form-control my-1' name='taskId' value={employeeTask.taskId} readOnly/></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="taskname">TaskName : </label></td>
                                    <td><input type="text" className='form-control my-1' name='taskname' value={employeeTask.taskName} readOnly/></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="creation">Created At : </label></td>
                                    <td><input type="text" className='form-control my-1' name='creation' value={employeeTask.taskCreation} readOnly/></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="expiry">Expiry Date : </label></td>
                                    <td><input type="text" className='form-control my-1' name='expiry' value={employeeTask.taskExpiryDate} readOnly/></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="duration">Total Duration(in hrs) : </label></td>
                                    <td><input type="number" className='form-control my-1' name='duration' value={employeeTask.durationOfTask} readOnly/></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="consumed">Consumed Hours : </label></td>
                                    <td><input type="number" className='form-control my-1' name='consumed' value={employeeTask.consumedHours} readOnly/></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="remaining">Remaining Hours : </label></td>
                                    <td><input type="number" className='form-control my-1' name='remaining' value={employeeTask.remainingHours} readOnly/></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="progress">Progress : </label></td>
                                    <td><input type="number" className='form-control my-1' name='progress' value={employeeTask.progress} readOnly/></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="status">Status : </label></td>
                                    <td><input type="text" className='form-control my-1' name='status' value={employeeTask.status} readOnly/></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="description">Description : </label></td>
                                    <td><textarea name="description"  className='form-control' id="description" cols="50" rows="5" readOnly defaultValue={employeeTask.description}></textarea></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor="comment">Comment : </label></td>
                                    <td><textarea name="comment"  className='form-control' id="comment" cols="50" rows="5" defaultValue={employeeTask.comment}></textarea></td>
                                </tr>

                            </tbody>
                        </table>
                        <div className='buttons'>
                            <button className='btn btn-success mx-2'>Start</button>
                            <button className='btn btn-success mx-2'>Stop</button>
                            <button className='btn btn-success mx-2' onClick={submitHandler}>Submit</button>
                        </div>                        
                    </form>
                </div>
            </div>
        </div>
        </React.Fragment>
    )
}

export default EmpTask
