import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import NavBar from './NavBar'
import '../style/TimeSheet.css'

const TimeSheet = () => {
    const { slug, slug1 } = useParams()
    const [finalSheet, setFinalSheet] = useState({sheetId:"",employeeId:"",sheetDate: "",sheetCreatedAt: "",lastLogInTime: "", lastLogOutTime: "",empTask: []})

    useEffect(()=>{
        const empAcc = JSON.parse(localStorage.getItem('EmployeeCredentials'))        
        const timeSheetList = empAcc.account.timeSheet
        const oneSheet = timeSheetList.filter(val=> val.sheetDate === slug1)
        const tymSheet = oneSheet[0]
        setFinalSheet((preValue)=>{return {...preValue, sheetId:tymSheet.sheetId,employeeId:tymSheet.employeeId,sheetDate:tymSheet.sheetDate,sheetCreatedAt:tymSheet.sheetCreatedAt,lastLogInTime:tymSheet.lastLogInTime,
        lastLogOutTime:tymSheet.lastLogOutTime,empTask:tymSheet.empTask}})        
    },[slug1])

    

    return (
        <React.Fragment>
        <NavBar flag={false} role={'Employee'}/>

        <section className="whole_section">
            <header className="ScriptHeader">
            <div className="rt-container">
                <div className="col-rt-12">
                    <div className="rt-heading text-center">
                        <h1>Time Sheet</h1>
                    </div>
                </div>
            </div>
            </header>

            <section className='account_section'>
            <div className="rt-container">
            <div className="col-rt-12">
            <div className="Scriptcontent">
            <div className="student-profile py-4">
            <div className="container">

            <div className='row mx-auto first_row'>
                <div className="col-lg-12">
                    <div className="card shadow-sm sheetDetail">
                    <div className="card-header bg-transparent border-0">
                        <h3 className="my-3 text-center"><i className="far fa-clone pr-1"></i>Sheet Detail</h3>
                    </div>
                    <div className="card-body pt-0">
                        <div className="row mx-auto">
                            <div className='col-lg-6'>
                                <table className="table table-bordered">
                            <tbody>
                            <tr><th width="30%">EmployeeId	</th><td width="2%">:</td><td>{finalSheet.employeeId}</td></tr>
                            <tr><th width="30%">SheetId</th><td width="2%">:</td><td>{finalSheet.sheetId}</td></tr>
                            <tr><th width="30%">SheetDate</th><td width="2%">:</td><td>{finalSheet.sheetDate}</td></tr>
                            </tbody>
                            </table>
                            </div>
                            <div className='col-lg-6'>
                            <table className="table table-bordered">
                            <tbody>
                                <tr><th width="30%">Sheet Created At</th><td width="2%">:</td><td>{finalSheet.sheetCreatedAt}</td></tr>
                                <tr><th width="30%">Last Login</th><td width="2%">:</td><td>{finalSheet.lastLogInTime}</td></tr>
                                <tr><th width="30%">Last Logout</th><td width="2%">:</td><td>{finalSheet.lastLogOutTime}</td></tr>
                                </tbody>
                            </table>
                            </div>
                        </div>                            
                    </div>
                    </div>
                </div> 
                </div>

            <div className="row mx-auto second_row">
                <div className="card shadow-sm my-1">
                <div className="card-header bg-transparent border-0 text-center">
                    <h2 className="mb-0"><i className="far fa-clone pr-1"></i>List of Tasks</h2>
                </div>
                <hr />
                <div className='card-body pt-0'>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>Task Id</th>
                                <th>Task Name</th>
                                <th>Task Duration(in hrs)</th>
                                <th>ExpiryDate</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                                {
                                   finalSheet.empTask.map((val,ind)=>{
                                        return(
                                            <tr key={val.taskId}>
                                            <td>{val.taskId}</td>
                                            <td>{val.taskName}</td>
                                            <td>{val.durationOfTask}</td>
                                            <td>{val.taskExpiryDate}</td>
                                            <td><Link to={`/login/${slug}/${slug1}/${val.taskId}`}>view</Link></td>
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

export default TimeSheet
