import React, { useState, useEffect } from 'react'
import Service from './Service'
import '../style/Login.css'
import ManagerComp from './ManagerComp'
import EmpProfile from './EmpProfile'
import NavBar from './NavBar'

const Login = () => {
    const [login,setLogin]= useState({username:"",password:"",role:"",loggedIn:false})
    const [manResponseData, setManResponseData] = useState({userId:"",username:"",name:"",email:"",password:"",token:""}) 
    const [empResponseData, setEmpResponseData] = useState({account:{},token:""})       

    useEffect(()=>storeCollector(),[])
    const handleInput = (e)=>{
        const { name, value } = e.target

        setLogin((preValue)=>{
            return {...preValue, [name]:value}
        })

    }

    const storeCollector = ()=>{
        let store = JSON.parse(localStorage.getItem('ManagerCredentials'))
        if( store !== null && store.token !== ''){
            setLogin((preValue)=>{return {...preValue, role:"Manager", loggedIn:true}})
            setManResponseData((preValue)=>{return {userId:store.userId, username:store.username, name:store.name, email:store.email, password:store.password, token:store.token}})
        }
        let empStore = JSON.parse(localStorage.getItem('EmployeeCredentials'))
        if(empStore !== null){
            setLogin((preValue)=>{return {...preValue, role:"Employee", loggedIn:true}})
            setEmpResponseData((preValue)=>{return {account:empStore.account, token:empStore.token}})
            
        }
    }
    const logout = ()=>{
        if(login.role === "Manager"){
            Service.managerLogout()
            .then(res=>{alert(res.data)})
            .catch(err=>{console.log(err)})
            setLogin((preValue)=>{return {...preValue, username:"",password:"",role:"",loggedIn:false}})
            localStorage.removeItem('ManagerCredentials')
        }else if(login.role === "Employee"){
            Service.employeeLogout()
            .then(res=>{alert(res.data)})
            setLogin((preValue)=>{return {...preValue, username:"",password:"",role:"",loggedIn:false}})
            localStorage.removeItem('EmployeeCredentials')
            localStorage.removeItem('EmpCre')
        }
        
    }
    
    const handleSubmit=(e)=>{
        e.preventDefault()
        let loginDetail = {username:login.username, password: login.password}
        if(login.username === "" || login.password === "" || login.role === ""){
            alert('Please Fill All fields')
        }else if(login.role === "Manager"){
            Service.managerLogin(loginDetail)
            .then((response)=>{
                if(response.data === 'Profile Not Exist.'){
                    alert('Profile Not Exist.')
                }else if(response.data === 'Invalid Password'){
                    alert('Invalid Password')
                }else{
                    localStorage.setItem('ManagerCredentials',JSON.stringify(response.data))
                    storeCollector()
                }                
            })
            .catch(err=>{alert(err)})
        }else if(login.role === "Employee"){
            Service.employeeLogin(loginDetail)
            .then((response)=>{
                if(response.data === 'Profile Not Exist'){
                    alert('Profile Not Exist.')
                }else if(response.data === 'Invalid Password'){
                    alert('Invalid Password')
                }else{
                    console.log(response.data)
                    localStorage.setItem('EmployeeCredentials',JSON.stringify(response.data))
                    localStorage.setItem('EmpCre',JSON.stringify(login))
                    storeCollector()
                }                
            })
            .catch(err=>{console.log(err)})
        }
        
    }
    return (
        <React.Fragment>
        { 
            login.loggedIn === false?
            <React.Fragment>
            <NavBar flag={false} />
            <div className="login_main">
                <div className="login form-group text-center" >
                <h3>Login</h3>
                <form onSubmit={handleSubmit} className='mx-auto mt-3'>
                    <input type="text" name='username' className='form-control my-2' placeholder='Enter Username' value={login.username} onChange={handleInput}/>
                    <input type="password" name='password' className='form-control my-2' placeholder='Enter Password' value={login.password} onChange={handleInput}/>
                    <select name="role" id="role" className='form-control' onChange={handleInput}>
                    <option value="">Please Select Role</option>
                    <option value="Manager">Manager</option>
                    <option value="Employee">Employee</option>
                    </select>
                    <br /><button className='btn btn-success' type='submit'>Login</button>
                </form>
                </div> 
            </div> 
            </React.Fragment>          
            : login.role === "Manager"?
                 <ManagerComp man_data={manResponseData} logout_func={logout} />
                 : <EmpProfile empCre={login} empData={empResponseData.account} flag={true} logout_func={logout} />
            
        }
        </React.Fragment>   
    )
}

export default Login
