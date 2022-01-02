import './App.css'
import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import TimeSheet from './components/TimeSheet';
import Sheet from './components/Sheet';
import EmpTask from './components/EmpTask'
import Operations from './components/Operations'
import Account from './components/Account';
import Task from './components/Task';

function App() {
  //const managerLoggedIn = JSON.parse(localStorage.getItem('ManagerCredentials'))
  //const employeeLoggedIn = JSON.parse(localStorage.getItem('EmployeeCredentials'))


  const Error = () =>{
    return <h2>Page Not Found</h2>
  }

  return (
    <React.Fragment>
    
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/operations" element={<Operations />} />
        <Route path="/login/operations/:slug" element={<Account />} />
        <Route path="/login/operations/:slug/:slug1" element={<Sheet />} />
        <Route path="/login/operations/:slug/:slug1/:slug2" element={<Task />} />
        <Route path="/login/:slug/:slug1" element={<TimeSheet />} />
        <Route path="/login/:slug/:slug1/:slug2" element={<EmpTask />} />   
        
        <Route path="*" element={<Error />} />
                   
      </Routes> 
       
    </React.Fragment>
  );
}

export default App;
