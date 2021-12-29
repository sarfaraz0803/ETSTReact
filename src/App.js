import './App.css'
import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import TimeSheet from './components/TimeSheet';
import EmpTask from './components/EmpTask'
import AllFunction from './components/AllFunction'

function App() {

  const Error = () =>{
    return <h2>Page Not Found</h2>
  }

  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/:slug" element={<TimeSheet />} />
        <Route path="/login/:slug/:slug1/" element={<EmpTask />} />        
        <Route path="*" element={<Error />} />
      </Routes>
    </React.Fragment>
  );
}

export default App;
