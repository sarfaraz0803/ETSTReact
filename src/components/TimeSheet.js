import React from 'react'
import { useParams, Link } from 'react-router-dom'
import '../style/TimeSheet.css'

const TimeSheet = () => {
    const { slug } = useParams()
    const empAcc = JSON.parse(localStorage.getItem('EmployeeCredentials'))
    const timeSheetList = empAcc.account.timeSheet

    const getSheet = timeSheetList.filter( val => val.sheetId === slug )
    const finalSheet = getSheet[0]
    


    return (
        <React.Fragment>
        <div className="sheetClass">
            <h2 className='mt-1'>Time Sheet</h2>
            <div className='row sheet_header mx-auto'>
                <div className="col-lg-4 col-md-4 column1">
                <table className='header_table table table-striped'>
                    <tbody className='table_body'>
                        <tr><td>SheetId : </td><td>{finalSheet.sheetId}</td></tr>
                        <tr><td>EmployeeId : </td><td>{finalSheet.employeeId}</td></tr>
                    </tbody>
                </table>
                </div>
                <div className="col-lg-4 col-md-4 column2">
                <table className='header_table table table-striped'>
                    <tbody className='table_body'>
                        <tr><td>SheetDate : </td><td>{finalSheet.sheetDate}</td></tr>
                        <tr><td>CreationDate : </td><td>{finalSheet.sheetCreatedAt}</td></tr>
                    </tbody>
                </table>
                </div>
                <div className="col-lg-4 col-md-4 column3">
                <table className='header_table table table-striped'>
                    <tbody className='table_body'>
                        <tr><td>LastLogin : </td><td>{finalSheet.lastLogInTime}</td></tr>
                        <tr><td>LastLogout : </td><td>{finalSheet.lastLogOutTime}</td></tr>
                    </tbody>
                </table>
                </div>
            </div>  
            <hr />
            <div className="sheet_body">
                <h2>Tasks List</h2>
                <hr />
                <div className='listoftask'>
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
                                            <td><Link to={`/login/${slug}/${val.taskId}`}>view</Link></td>
                                            </tr>
                                        )
                                    })
                                }
                        </tbody>
                    </table>
                </div>
            </div>      
        </div>
        </React.Fragment>
    )
}

export default TimeSheet
