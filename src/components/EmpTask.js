import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../style/EmpTask.css'
import NavBar from './NavBar'
import Service from './Service'

const EmpTask = () => {
    const [employeeTask,setEmployeeTask] = useState({taskId:"",taskName:"",description:"",taskCreation:"",durationOfTask:"",taskExpiryDate:"",comment:"",status:"",consumedHours:"",remainingHours:"",progress:"" })
    const { slug, slug1, slug2 } = useParams()    
    const [timer, setTimer] = useState({active:false,value:0,result:0})

    useEffect(()=>{
        const empAcc = JSON.parse(localStorage.getItem('EmployeeCredentials'))
        const sheet = empAcc.account.timeSheet.filter(val => val.sheetDate === slug1)
        const finalSheet = sheet[0]
        const tasksList = finalSheet.empTask
        const oneTask = tasksList.filter(val=> val.taskId === slug2 )
        const finalTask = oneTask[0]
        setEmployeeTask((preValue)=>{return{...preValue,taskId:finalTask.taskId,taskName:finalTask.taskName,description:finalTask.description,taskCreation:finalTask.taskCreation,durationOfTask:finalTask.durationOfTask,
           taskExpiryDate:finalTask.taskExpiryDate,comment:finalTask.comment,status:finalTask.status,consumedHours:finalTask.consumedHours,remainingHours:finalTask.remainingHours,progress:finalTask.progress }})
    },[slug1,slug2])

    //  Update_Task_Modal_Input_Fields_Handler
    function taskInputHandler(e){
        const { name, value } = e.target
        setEmployeeTask((preValue)=>{return {...preValue, [name]:value}})
    }

    //  Update_Task_Function
    function updateTaskField(){
        const updatedTask = {empId:slug,date:slug1,taskId:employeeTask.taskId,comment:employeeTask.comment,status:employeeTask.status,consumedHours:Number(employeeTask.consumedHours) }
        Service.empTaskUpdate(updatedTask)
        .then(res=>{
            if(res.data === 'Status Updated'){
                alert('Successfully Updated..!! Results will be reflect after next login')
            }else(
                alert(res.data)
            )
        })
        .catch(err=>console.log(err))
        //console.log(updatedTask)
    }

    //  Counter_For_Task_To_Count_Working_Hour_On_Task
    function counter(){
        if(timer.active !== true){
            setTimer((preValue)=>{return {...preValue, active:true,value:new Date().getTime()}})
        }else{            
            const workDuration = Number(((new Date().getTime() - timer.value)/(60*60*1000)).toFixed(3))
            setTimer((preValue)=>{return {...preValue, active:false,value:new Date().getTime(),result:workDuration}})
            //console.log(`StopTime : ${timer.value} and work duration : ${workDuration} hours`)
            const updatedConsumedHours = Number(employeeTask.consumedHours)+workDuration
            const updatedRemainingHours = Number(employeeTask.remainingHours)-updatedConsumedHours
            const updatedProgress = (updatedConsumedHours*100/Number(employeeTask.durationOfTask)).toFixed(3)
            setEmployeeTask((preValue)=>{return {...preValue,consumedHours:updatedConsumedHours,remainingHours:updatedRemainingHours,progress:updatedProgress}})
        }
    }

    

    return (
        <React.Fragment>
        <NavBar flag={false} role={'Employee'} />
        <div className='container-fluid whole_div'>
            <h1 className='text-center main_heading mb-4'>Employee Task Detail</h1>
            <div className='row main_row mx-auto py-4'>
                <div className="col-lg-6 col-md-6 mb-4">
                    <div id="first-group">
                        <div className="form-group" id="content">
                            <label htmlFor="taskId">TaskId:</label>
                            <input type="text" className='input-group form-control my-1' name='taskId' defaultValue={employeeTask.taskId} readOnly/>
                        </div>

                        <div className="form-group" id="content" >
                            <label htmlFor="creation">Created At : </label>
                            <input type="text" className='input-group form-control my-1' name='taskCreation' defaultValue={employeeTask.taskCreation} readOnly/>
                        </div>

                        <div className="form-group" id="content">
                            <label htmlFor="duration">Total Duration(in hrs) : </label>
                            <input type="text" className='input-group form-control my-1' name='durationOfTask' defaultValue={employeeTask.durationOfTask} readOnly/>
                        </div>

                        <div className="form-group" id="content">
                            <label htmlFor="remaining">Remaining Hours : </label>
                            <input type="number" className='input-group form-control my-1' name='remainingHours' defaultValue={employeeTask.remainingHours} readOnly/>
                        </div>

                        <div className="form-group" id="content">
                            <label htmlFor="description">Description : </label>
                            <textarea name="description" className='input-group form-control' id="description" cols="50" rows="9"  defaultValue={employeeTask.description} readOnly ></textarea>
                        </div>
                        
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 mb-4">
                    <div id="second-group">
                        <div className="form-group" id="content">
                            <label htmlFor="taskname">TaskName : </label>
                            <input type="text" className='input-group form-control my-1' name='taskname' defaultValue={employeeTask.taskName} readOnly/>
                        </div>

                        <div className="form-group" id="content">
                            <label htmlFor="expiry">Expiry Date : </label>
                            <input type="text" className='input-group form-control my-1' name='taskExpiryDate'  defaultValue={employeeTask.taskExpiryDate} readOnly/>
                        </div>

                        <div className="form-group" id="content">
                            <label htmlFor="consumed">Consumed Hours : </label>
                            <input type="number" className='input-group form-control my-1'  name='consumedHours' defaultValue={employeeTask.consumedHours} readOnly/>
                        </div>

                        <div className="form-group" id="content">
                            <label htmlFor="progress">Progress(%) : </label>
                            <input type="text" className='input-group form-control my-1' name='progress'  defaultValue={employeeTask.progress } readOnly/>
                        </div>

                        <div className="form-group" id="content">
                            <label htmlFor="status">Status : </label>
                            <input type="text" className='input-group form-control my-1'  name='status' onChange={taskInputHandler} value={employeeTask.status} />
                        </div>

                        <div className="form-group" id="content">
                            <label htmlFor="comment">Comment : </label>
                            <textarea name="comment" className='input-group form-control' id="comment" cols="50" rows="6" onChange={taskInputHandler} value={employeeTask.comment} ></textarea>
                        </div>
                        
                    </div>
                </div>
                <div className="btns mx-auto text-center">
                    <p>Note: Dont forget to update the task after Stop, Updation  will be reflect at next login </p>
                    {
                        timer.active !== true ? 
                            <button className='btn btn-success mx-2' onClick={counter}>Start</button>
                            : <button className='btn btn-danger mx-2' onClick={counter}>Stop</button>
                    }
                    
                    <button className='btn btn-success mx-2' onClick={updateTaskField} >Update</button>
                </div>
            </div>        
        </div>
        </React.Fragment>
    )
}
export default EmpTask
