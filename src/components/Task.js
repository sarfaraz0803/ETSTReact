import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import '../style/EmpTask.css'
import NavBar from './NavBar'
import Service from './Service'

const Task = () => {
    const [employeeTask,setEmployeeTask] = useState({taskId:"",taskName:"",description:"",taskCreation:"",durationOfTask:"",taskExpiryDate:"",comment:"",status:"",consumedHours:"",remainingHours:"",progress:"" })
    const { slug, slug1, slug2 } = useParams()    
    //const [taskList,setTaskList] = useState([])


    useEffect(()=>setDefaults(),[])

    function setDefaults(){
        console.log("hello")
    //     const getOne = {id:slug,date:slug1}
    //     Service.getOneSheet(getOne)
    //         .then(res=>{
    //            if(res.data === 'No Sheet for given empId of given date'){
    //                 alert('No Sheet for given empId of given date')
    //             }else{
    //                 setTaskList(()=>res.data.empTask)
    //             }
    //         })
    //        .catch(err=>console.log(err))

    //     setTimeout(() => {
    //         const oneTask = taskList.filter(val=> val.taskId === slug2 )
    //     const finalTask = oneTask[0]
    //     console.log(oneTask)
    //     if(finalTask !== null){
    //         setEmployeeTask((preValue)=>{return{...preValue,taskId:finalTask.taskId,taskName:finalTask.taskName,description:finalTask.description,taskCreation:finalTask.taskCreation,
    //             durationOfTask:finalTask.durationOfTask,taskExpiryDate:finalTask.taskExpiryDate,comment:finalTask.comment,status:finalTask.status,consumedHours:finalTask.consumedHours,
    //             remainingHours:finalTask.remainingHours,progress:finalTask.progress }})
    //         } 
    //     }, 3000);
        
        
    }
    
    
             




    //  Input_Field_Handler
    function taskInputHandler(e){
       const { name, value } = e.target
        setEmployeeTask((preValue)=>{return {...preValue, [name]:value}})
    }

    function updateTaskField(){
        const updatedTask = {empId:slug,date:slug1,taskId:employeeTask.taskId,taskName:"",description:"",durationOfTask:"",taskExpiryDate:"",comment:"" }
        console.log(updatedTask)
    }

    

    

    return (
        <React.Fragment>
        <NavBar flag={false} role={'Manager'} />
        <div className='container-fluid whole_div'>
            <h1 className='text-center main_heading mb-4'>Task Detail</h1>
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
                            <input type="number" className='input-group form-control my-1' name='durationOfTask' onChange={taskInputHandler} value={employeeTask.durationOfTask} />
                        </div>

                        <div className="form-group" id="content">
                            <label htmlFor="remaining">Remaining Hours : </label>
                            <input type="number" className='input-group form-control my-1' name='remainingHours' defaultValue={employeeTask.remainingHours} readOnly/>
                        </div>

                        <div className="form-group" id="content">
                            <label htmlFor="description">Description : </label>
                            <textarea name="description" className='input-group form-control' id="description" cols="50" rows="9" onChange={taskInputHandler} value={employeeTask.description} ></textarea>
                        </div>
                        
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 mb-4">
                    <div id="second-group">
                        <div className="form-group" id="content">
                            <label htmlFor="taskname">TaskName : </label>
                            <input type="text" className='input-group form-control my-1' name='taskName' onChange={taskInputHandler} value={employeeTask.taskName} />
                        </div>

                        <div className="form-group" id="content">
                            <label htmlFor="expiry">Expiry Date : </label>
                            <input type="date" className='input-group form-control my-1' name='taskExpiryDate' onChange={taskInputHandler} value={employeeTask.taskExpiryDate} />
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
                            <input type="text" className='input-group form-control my-1'  name='status' defaultValue={employeeTask.status} readOnly/>
                        </div>

                        <div className="form-group" id="content">
                            <label htmlFor="comment">Comment : </label>
                            <textarea name="comment" className='input-group form-control' id="comment" cols="50" rows="6" onChange={taskInputHandler} value={employeeTask.comment} ></textarea>
                        </div>
                        
                    </div>
                </div>
                <div className="btns mx-auto text-center">
                    <button className='btn btn-success mx-2' onClick={()=>updateTaskField} >Update</button>
                </div>
            </div>        
        </div>
        </React.Fragment>
    )
}
export default Task
