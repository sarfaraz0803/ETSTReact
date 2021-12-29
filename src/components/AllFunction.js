import React from 'react'
import Service from './Service'

const AllFunction = () => {

    function addAccount(){
        const account =  {_id:113,username:"salman@gmail.com",password:"salman113",employee:{name:"",address:"",age:0,email:"",mobile:"",gender:"",department:"",socialCategory:"",
        physicallyChallenged:"",religion:"",dateOfBirth:"",maritalStatus:"",profileStatus:"",fatherName:""}}
        Service.addNewAccount(account)
        .then(res=>{
            if(res.data.msg === "Account already exists by this Id"){
                alert('Account already exists by this Id')
            }else{console.log(res.data)}})
        .catch(err=>{console.log(err)})        
    }

    function getAccounts(){
        Service.getAllAccounts()
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }

    function getAccountById(){
        const id = 113
        Service.getAccountById(id)
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }
    
    function updateAccountById(){
        const account =  {_id:113,username:"salman@gmail.com",password:"salman113",employee:{name:"salmankhan",address:"bijnor",age:24,email:"salman@gmail.com",mobile:"1236547890",gender:"male",department:"computer",socialCategory:"general",
        physicallyChallenged:"false",religion:"Islam",dateOfBirth:"1997-08-29",maritalStatus:"unmarried",profileStatus:"active",fatherName:"father"}}
        Service.updateAccountById(account._id,account)
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }

    function deleteAccount(){
        const id = 113
        Service.deleteAccount(id)
        .then(res=>{
            if(res.data.msg === 'No Account for this Id to delete'){
                alert('Id Not Exist')
            }else if(res.data.msg === 'Deleted'){
                alert('Deleted')
            }else{console.log(res)}})
        .catch(err=>console.log(err))
    }

    function assignTask(){
        const empCreDet = {id:111,date:"2021-12-28",task:{taskId:"3",taskName:"task3",description:"this is task3",durationOfTask:4,taskExpiryDate:"2021-12-30",comment:"assigned",status:"",consumedHours:0.0,remainingHours:0.0,progress:0} }
        Service.assignTask(empCreDet)
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err))
    }

    function getAllTimeSheets(){
        const id = 112
        Service.getAllTimeSheetById(id)
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err))
    }

    function getOneTimeSheet(){
        const empDetail = {id:111,date:"2021-12-28"}
        Service.getOneSheet(empDetail)
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err))
    }

    function updateTask(){
        const taskDetail = {empId:111,date:"2021-12-28",taskId:"111202112283",empTask:{taskId:"111202112283",taskName:"task3",description:"this is updates task3",durationOfTask:4,taskExpiryDate:"2021-12-31",comment:"updated",status:"",consumedHours:0.0,remainingHours:0.0,progress:0}}
        Service.updateTask(taskDetail)
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err))
    }

    function deleteTask(){
        const taskDetail = {empId:111,date:"2021-12-28",taskId:"111202112283"}
        Service.deleteTask(taskDetail)
        .then(res=>console.log(res.data))
        .catch(err=>console.log(err))
    }

    return (
        <div className='p-4 border border-dark'>
            <button className='btn btn-primary m-1' onClick={addAccount}>Add Account</button>
            <button className='btn btn-primary m-1' onClick={getAccounts}>Get All Accounts</button>
            <button className='btn btn-primary m-1' onClick={getAccountById}>Get Account By Id</button>
            <button className='btn btn-primary m-1' onClick={updateAccountById}>Update Account By Id</button>
            <button className='btn btn-primary m-1' onClick={deleteAccount}>Delete Account By Id</button>
            <button className='btn btn-primary m-1' onClick={assignTask}>Assign Task</button>
            <button className='btn btn-primary m-1' onClick={getAllTimeSheets}>AllTimeSheets</button>
            <button className='btn btn-primary m-1' onClick={getOneTimeSheet}>GetOneSheet</button>
            <button className='btn btn-primary m-1' onClick={updateTask}>UpdateTask</button>
            <button className='btn btn-primary m-1' onClick={deleteTask}>Delete Task</button>
        </div>
    )
}

export default AllFunction