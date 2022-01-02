import React from 'react'
import { NavLink } from 'react-router-dom'
import '../style/Home.css'
import NavBar from './NavBar'


const Home = () => {

    return (
       <React.Fragment>
       <NavBar />
        <div className='home_page'>        
            <div className='homepage_content'>
                <h1>Employee Time Sheet Tracker</h1>   
                <p>This is tag line for employee time sheet tracker</p>
                <NavLink className='nav-link link mx-auto' to='/login'>Login</NavLink>
            </div>                   
        </div>
        </React.Fragment>
    )
}

export default Home
