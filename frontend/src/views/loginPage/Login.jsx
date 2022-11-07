import React, { useState, useRef, useContext } from "react";
import { MyContext } from "../../App";
import { NavLink } from "react-router-dom";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import "../../styles/loginPage/Login.css";

const Login = () => {
  // Navigate to report page
  const navigate = useNavigate();

  // State variables for the login form
  const {setUser, setIsUserLoggedIn, token} = useContext(MyContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Validation state variables for the login form
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  // useRef to store the email and password inputs
  const emailRef = useRef();
  const passwordRef = useRef();

  // Function to check if the email is valid
  const checkEmailFormat = () => {
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);
    if (emailRegex) {
        emailRef.current.className = "errorInvisible"
          //emailRef.current.style.display = "none"
    } else {
          passwordRef.current.className = "errorVisible"
          //passwordRef.current.style.display = "block"
    }
  };

  // Function to check if the password is valid
  const checkPasswordFormat = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    if (passwordRegex) {
        passwordRef.current.className = "errorInvisible"
          //passwordRef.current.style.display = "none"
    } else {
          passwordRef.current.className = "errorVisible"
          //passwordRef.current.style.display = "block"
    }
  }


  // Function to update login data
  const updateLoginData = (event) => {
    switch(event.target.name) {
      case "email":
        setEmail(event.target.value);
        setEmailError(true);
        break;
      case "password":
        setPassword(event.target.value);
        setPasswordError(true);
        break;
      case "showPassword":
        setShowPassword(false);
        break;
      default:
        break;
    }
  };

  // Reset all the state variables
  const resetLoginData = () => {
    setEmail("");
    setPassword("");
    setEmailError(false);
    setPasswordError(false);
  }

  // Function to show/hide password
 const displayPassword = () => {
  setShowPassword(prevState => !prevState);
 }


  // Function to handle the login form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Log in user
    const loginUser = {
      email: email,
      password: password
    }

    // Settings for the fetch call
    const settings = {
      method: "POST",
      body: JSON.stringify(loginUser),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      }
    };

    // Fetch call to login user
    const response = await fetch("http://localhost:5000/login", settings);
    const result = await response.json();

    try{
      if(response.ok) {

        const now = new Date();
        const tokenExpiry = new Date(now.getTime() + 1000 * 60 * 60); 
        //localStorage.setItem("data", JSON.stringify({token: data.token, id: data.id, expiry: tokenExpiry.toISOString()}));
        
        // if the response is okay, send data to backend
        setUser({token:result.token, id:result.data._id, info:result.data, expiry: tokenExpiry.toISOString() })
        setIsUserLoggedIn(true);
       
        // Reset the login form
        resetLoginData();
        // Navigate to the report page
        navigate("/report");
      } else {
        throw new Error(result.message);
      }
    }catch(err){
      alert(err.message);
    }
    
  }

  return (
    <section className="login-form-container">
      <fieldset className="login-fieldset">
        <legend className="login-legend"> Sign In </legend>
        <form className="login-form" onSubmit={handleSubmit}>

          <div>
            <input
              type="email"
              name="email"
              value={email}
              onChange={updateLoginData}
              onBlur={checkEmailFormat}
              placeholder="Enter Email"
              className="email-input"
            />
            <div className={email.trim().length === 0 && emailError ? "errorVisible" : "errorInvisible"} ref={emailRef}> Email is required</div>
            <div className="errorInvisible" ref={emailRef}> Incorrect email format! </div>
          </div>
          
          <div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={password}
              onChange={updateLoginData}
              onBlur={checkPasswordFormat}
              placeholder="Enter Password"
              className="password"
            />

            <span onClick={displayPassword} className="password-display"> {showPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>} </span>

            <div className={password.trim().length === 0 && passwordError ? "errorVisible" : "errorInvisible"} ref={passwordRef} > Password is required</div>
            <div className="errorInvisible" ref={passwordRef}> Password must be at least 12 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character</div>
          </div>

          <div className="keep-logged-in-container">
            <div className="remember-user">
              <input type="checkbox" />
              <label htmlFor="" className="remember-me-label">
                Remember Me
              </label>
            </div>

            <div className="forget-password">
              <span>Forgot Password?</span>
            </div>
          </div>

          <button className="login-button"> Submit </button>

          <p className="paragraph">
            If you don't have an account, login with
            <NavLink to="/register" className="sign-up-btn">
              Sign Up
            </NavLink>
          </p>
        </form>
      </fieldset>
    </section>
  );
};

export default Login;
