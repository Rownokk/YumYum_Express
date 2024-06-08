import React, { useState } from 'react'
import './LoginPopup.css'
const LoginPopup = () => {

    const [currState,setCurrState]=useState("Sign Up")
  return (
    <div className='login-popup'>
        <form className='login-popup-container'>
           <div className="login-popup-title">
            <h2>{currState}</h2>
            </div> 
        </form>
    </div>
  )
}

export default LoginPopup