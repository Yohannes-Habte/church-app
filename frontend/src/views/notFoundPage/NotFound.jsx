import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    let navigate = useNavigate();
  return (
    <div>
    <h1>  Page Not Found! </h1>
    <button onClick={ () => navigate("/")}> Please go back to Home </button>
      
    </div>
  )
}

export default NotFound;
