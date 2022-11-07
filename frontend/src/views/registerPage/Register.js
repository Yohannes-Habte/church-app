import React, { useState, useContext } from "react";
import { MyContext } from "../../App";
import { NavLink } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "../../styles/registerPage/Register.css";

const Register = () => {
  // useNavigate that is a hook that allows us to navigate to login page
  const navigate = useNavigate();

  // state variables for the registration form
  const {setUser, setConsent, token} = useContext(MyContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    telephone: "",
    email: "",
    password: "",
    confirmPassword: "",
    street: "",
    houseNumber: "",
    zipCode: "",
    city: "",
    province: "",
    country: "",
  });

  const {firstName, lastName, gender, telephone, email, password, confirmPassword, street, houseNumber, zipCode, city, province, country} = userInfo;

  // function that is used to update the state variables of the registration form
  const onChange = (event) => {
    setUserInfo({...userInfo, [event.target.name]: event.target.value});
  };

   // Function to show/hide password
 const PasswordVisibility = () => {
  setShowPassword(prevState => !prevState);
 }

  // Function to show/hide  confirm password 
  const confirmPasswordVisibility = () => {
    setShowConfirmPassword(prevState => !prevState);
  }

   // Function to reset all the state variables
  const resetAllEnteredData = () => {
    setUserInfo("");
    setConsent(false);
  }

  
  // Function to register the user
  const SubmitRegisteredUser = async (event) => {
    event.preventDefault();
  
    const settings = {
      method: "POST",
      body: JSON.stringify(userInfo),
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
      },
    };

    const response = await fetch("http://localhost:5000/register", settings);
    const data = await response.json();

    try {
      if (response.ok) {

         // Dealing with token expiry 
         const now = new Date();
         const tokenExpiry = new Date(now.getTime() + 1000 * 60 * 60); 
         localStorage.setItem("data", JSON.stringify({token: data.token, id: data.id, expiry: tokenExpiry.toISOString()}));

         // if the response is okay, send data to backend
         setUser(data.token, data.id);

        // Navigate to login page
        navigate("/login");

        // reset the state variables
        resetAllEnteredData();
        
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      //setError(err.message)
      alert(err.message);
    }
  };

  return (
    <section className="register-form-container">
      <fieldset className="register-form-fieldset">
        <legend className="register-legend"> Create an Account </legend>
        <form className="registration-form" onSubmit={SubmitRegisteredUser}>
          {/* Full name container*/}
          <div className="full-name-container">
            <div className="firstName-container">
              <div className="firstName-label">
                <label htmlFor="firstName"> First Name </label>{" "}
              </div>
              <div className="firstName-input">
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={firstName}
                  onChange={onChange}
                  placeholder="Enter First Name"
                />
              </div>
            </div>

            <div className="lastName-container">
              <div className="lastName-label">
                <label htmlFor="lastName"> Last Name </label>{" "}
              </div>
              <div className="lastName-input">
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={lastName}
                  onChange={onChange}
                  placeholder="Enter Last Name"
                />
              </div>
            </div>
          </div>

          {/* Date of birth container*/}
          <div className="telephone-gender-container">
            <div className="telephone-container">
              <div className="telephone-label">
                <label htmlFor="telephone"> Telephone </label>{" "}
              </div>
              <div className="telephone-input">
                <input
                  type="tel"
                  id="telephone"
                  name="telephone"
                  value={telephone}
                  onChange={onChange}
                  placeholder="Enter Telephone Number"
                />
              </div>
            </div>

            <div className="gender-container">
              <div className="gender-label">
                <label htmlFor="gender">Gender </label>{" "}
              </div>
              <div className="gender-input">
                <select id="gender" name="gender" value={gender} onChange={onChange}>
                  <option value="default"> Select Gender</option>
                  <option value="female">Female</option>
                  <option value="male">Male</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Email container*/}
          <div className="email-address-container">
            <div className="email-label">
              <label htmlFor="email"> Email Address </label>{" "}
            </div>
            <div className="email-input">
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={onChange}
                placeholder="Enter Email"
              />
            </div>
          </div>

          {/* Password container*/}
          <div className="password-confirm-password-container">
            <div className="password-container">
              <div className="password-label">
                <label htmlFor="password"> Password </label>{" "}
              </div>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={password}
                  onChange={onChange}
                  placeholder="Enter Password"
                  className="icons"
                />

                <span onClick={PasswordVisibility} className="password-display">
                  {showPassword ? (<AiOutlineEyeInvisible />) : (<AiOutlineEye />)}
                </span>
              </div>
            </div>

            <div className="confirm-password-container">
              <div className="confirm-password-label">
                <label htmlFor="confirmPassword"> Confirm Password </label>{" "}
              </div>
              <div className="confirm-password-input">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={onChange}
                  placeholder="Confirm Password"
                />
                <span onClick={confirmPasswordVisibility} className="password-display" >
                  {showConfirmPassword ? ( <AiOutlineEyeInvisible /> ) : (<AiOutlineEye />)}
                </span>
              </div>
            </div>
          </div>

          {/* residence address container*/}
          <div className="residence-address-container">
            <div className="label">
              <label htmlFor="street"> Residence Address </label>{" "}
            </div>
            <div className="residence-address-inputs-container">
              <div className="street-input">
                <input
                  type="text"
                  id="street"
                  name="street"
                  value={street}
                  onChange={onChange}
                  placeholder="Enter Street Name"
                />
              </div>

              <div className="house-number">
                <input
                  type="number"
                  name="houseNumber"
                  value={houseNumber}
                  onChange={onChange}
                  placeholder="Enter House Number"
                />
              </div>

              <div className="zipCode">
                <input
                  type="number"
                  name="zipCode"
                  value={zipCode}
                  onChange={onChange}
                  placeholder="Enter Zip Code"
                />
              </div>

              <div className="city">
                <input
                  type="text"
                  name="city"
                  value={city}
                  onChange={onChange}
                  placeholder="Enter City"
                />
              </div>

              <div className="province">
                <input
                  type="text"
                  name="province"
                  value={province}
                  onChange={onChange}
                  placeholder="Enter Province"
                />
              </div>

              <div className="country">
                <input
                  type="text"
                  name="country"
                  value={country}
                  onChange={onChange}
                  placeholder="Enter Country"
                />
              </div>
            </div>
          </div>

          {/* Consent checkbox container*/}
          <div className="checkbox-reset-container">
            <div className="checkbox-container">
              <input
                type="checkbox"
                id="agree"
                name="agree"
              />
            </div>

            <div className="agree-statement">
              <label htmlFor="agree">
                I agree with the defined <span>terms</span> and{" "}
                <span>conditions</span>
              </label>
            </div>

            <div className="reset-container">
              <input type="reset" onClick={resetAllEnteredData} />
            </div>
          </div>
        </form>

        {/* submit button and login button*/}

        <div className="registration-buttons-container">
          <div>
            <button className="register-button" onClick={SubmitRegisteredUser}>
              Register
            </button>
          </div>

          <div className="swap-to-login">
            if already registered?
            <NavLink to="/login" className="login-button">
              Login
            </NavLink>
          </div>
        </div>
      </fieldset>
    </section>
  );
};

export default Register;
