import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import logo from "../../images/Logo.png";
import "../../styles/navbar/Navigation.css";
import DropdownService from './DropdownService';
import { MyContext } from '../../App';
import Logout from '../Logout';


const Navigation = () => {
  const { isUserLoggedIn, sacramentAdmin, financeAdmin } = useContext(MyContext);
    // State variables
    console.log("Login data", isUserLoggedIn)
    const [click, setClick] = useState(false);
    const [dropdownService, setDropdownService] = useState(false);

    // Toggle the dropdown menu for the service page
    const onMouseEnterService = () => {
    if(window.innerWidth < 960) {
      setDropdownService(false)
    } else {
      setDropdownService(true)
    }
  };

  const onMouseLeaveService = () => {
    if(window.innerWidth < 960) {
      setDropdownService(false)
    } else {
      setDropdownService(false)
    }
  };

  // Jsx is provided below 
  if(isUserLoggedIn) {
    return (
      <section className="header-container">
      <nav className="navigation-bar">

        <div className="logo-container">
            <div> <NavLink to="/"><img className="logo" src={logo} alt="Logo of  Eritrean Holy Saviour Catholic Church in Hamburg" /> </NavLink></div>
            <div> <NavLink to="/" className="logo-text"> Eritrean Holy Saviour <br/> Catholic Church Hamburg</NavLink></div>
        </div>

        <ul className={click ? "nav-menu active" : "nav-menu"}>

            <li className="nav-item">
                <NavLink to="/" className="nav-links" style={({ isActive }) => ({
                    color: isActive && "red", textDecoration: isActive && "underline", background: isActive && "#aee6fa", borderRadius: isActive && "0.3rem",pointerEvents: isActive && "none"})}> Community </NavLink>
            </li>

            <li className="nav-item service" onMouseEnter={onMouseEnterService} onMouseLeave={onMouseLeaveService}>
                <NavLink to="/service" className="nav-links" style={({ isActive }) => ({
                    color: isActive && "red", textDecoration: isActive && "underline", background: isActive && "#aee6fa", borderRadius: isActive && "0.3rem", pointerEvents: isActive && "none"})}> Service <i className="fas fa-caret-down"/>   </NavLink>
                  {dropdownService && <DropdownService />}
            </li>


            <li className="nav-item">
                <NavLink to="/choir" className="nav-links" style={({ isActive }) => ({
                    color: isActive && "red", textDecoration: isActive && "underline", background: isActive && "#aee6fa", borderRadius: isActive && "0.3rem", pointerEvents: isActive && "none"})}> Choir  </NavLink>
            </li>

            <li className="nav-item">
                <NavLink to="/children" className="nav-links" style={({ isActive }) => ({
                    color: isActive && "red", textDecoration: isActive && "underline", background: isActive && "#aee6fa", borderRadius: isActive && "0.3rem", pointerEvents: isActive && "none"})}> Children  </NavLink>
            </li>

            <li className="nav-item">
                <NavLink to="/report" className="nav-links" style={({ isActive }) => ({
                    color: isActive && "red", textDecoration: isActive && "underline", background: isActive && "#aee6fa", borderRadius: isActive && "0.3rem", pointerEvents: isActive && "none"})}> Report  </NavLink>
            </li>

            <li className="nav-item">
                <NavLink to="/contact" className="nav-links" style={({ isActive }) => ({
                    color: isActive && "red", textDecoration: isActive && "underline", background: isActive && "#aee6fa", borderRadius: isActive && "0.3rem", pointerEvents: isActive && "none"})}> Contact </NavLink>
            </li>

        </ul>
        
        
        <div className="login-register-container">

          <button className='login'>
            <NavLink to="/login" className="login-link" style={({ isActive }) => ({
                    color: isActive && "red", textDecoration: isActive && "underline", background: isActive && "#aee6fa", borderRadius: isActive && "0.3rem", pointerEvents: isActive && "none"})}> Login </NavLink>
          </button> |

          <button className='register'> 
            <NavLink to="/register" className="register-link" style={({ isActive }) => ({
                    color: isActive && "red", textDecoration: isActive && "underline", background: isActive && "#aee6fa", borderRadius: isActive && "0.3rem", pointerEvents: isActive && "none"})}> Register </NavLink> 
          </button>|

          <select name="language" className='language'>
            <option value=""> Language </option>
            <option value=""> Tigrigna </option>
            <option value=""> English </option>
            <option value=""> Deutsch </option>
          </select> 
          
        </div>
        <Logout />
  
      </nav>
    
    </section>
    )
  } else if( isUserLoggedIn && sacramentAdmin) {
    return(
      <section className="header-container">
      <nav className="navigation-bar">

        <div className="logo-container">
            <div> <NavLink to="/"><img className="logo" src={logo} alt="Logo of  Eritrean Holy Saviour Catholic Church in Hamburg" /> </NavLink></div>
            <div> <NavLink to="/" className="logo-text"> Eritrean Holy Saviour <br/> Catholic Church Hamburg</NavLink></div>
        </div>

        <ul className={click ? "nav-menu active" : "nav-menu"}>

            <li className="nav-item">
                <NavLink to="/" className="nav-links" style={({ isActive }) => ({
                    color: isActive && "red", textDecoration: isActive && "underline", background: isActive && "#aee6fa", borderRadius: isActive && "0.3rem",pointerEvents: isActive && "none"})}> Community </NavLink>
            </li>

            <li className="nav-item service" onMouseEnter={onMouseEnterService} onMouseLeave={onMouseLeaveService}>
                <NavLink to="/service" className="nav-links" style={({ isActive }) => ({
                    color: isActive && "red", textDecoration: isActive && "underline", background: isActive && "#aee6fa", borderRadius: isActive && "0.3rem", pointerEvents: isActive && "none"})}> Service <i className="fas fa-caret-down"/>   </NavLink>
                  {dropdownService && <DropdownService />}
            </li>


            <li className="nav-item">
                <NavLink to="/choir" className="nav-links" style={({ isActive }) => ({
                    color: isActive && "red", textDecoration: isActive && "underline", background: isActive && "#aee6fa", borderRadius: isActive && "0.3rem", pointerEvents: isActive && "none"})}> Choir  </NavLink>
            </li>

            <li className="nav-item">
                <NavLink to="/children" className="nav-links" style={({ isActive }) => ({
                    color: isActive && "red", textDecoration: isActive && "underline", background: isActive && "#aee6fa", borderRadius: isActive && "0.3rem", pointerEvents: isActive && "none"})}> Children  </NavLink>
            </li>

            <li className="nav-item">
                <NavLink to="/report" className="nav-links" style={({ isActive }) => ({
                    color: isActive && "red", textDecoration: isActive && "underline", background: isActive && "#aee6fa", borderRadius: isActive && "0.3rem", pointerEvents: isActive && "none"})}> Report  </NavLink>
            </li>

            <li className="nav-item">
                <NavLink to="/report" className="nav-links" style={({ isActive }) => ({
                  color: isActive && "red", textDecoration: isActive && "underline", background: isActive && "#aee6fa", borderRadius: isActive && "0.3rem", pointerEvents: isActive && "none"})}> Sacrament  </NavLink>
            </li>

            <li className="nav-item">
                <NavLink to="/contact" className="nav-links" style={({ isActive }) => ({
                    color: isActive && "red", textDecoration: isActive && "underline", background: isActive && "#aee6fa", borderRadius: isActive && "0.3rem", pointerEvents: isActive && "none"})}> Contact </NavLink>
            </li>

        </ul>
        
        
        <div className="login-register-container">

          <button className='login'>
            <NavLink to="/login" className="login-link" style={({ isActive }) => ({
                    color: isActive && "red", textDecoration: isActive && "underline", background: isActive && "#aee6fa", borderRadius: isActive && "0.3rem", pointerEvents: isActive && "none"})}> Login </NavLink>
          </button> |

          <button className='register'> 
            <NavLink to="/register" className="register-link" style={({ isActive }) => ({
                    color: isActive && "red", textDecoration: isActive && "underline", background: isActive && "#aee6fa", borderRadius: isActive && "0.3rem", pointerEvents: isActive && "none"})}> Register </NavLink> 
          </button>|

          <select name="language" className='language'>
            <option value=""> Language </option>
            <option value=""> Tigrigna </option>
            <option value=""> English </option>
            <option value=""> Deutsch </option>
          </select> 
          
        </div>
  
      </nav>
    
    </section>
    )
  } else if(isUserLoggedIn && financeAdmin) {
    return(
      <section className="header-container">
      <nav className="navigation-bar">

        <div className="logo-container">
            <div> <NavLink to="/"><img className="logo" src={logo} alt="Logo of  Eritrean Holy Saviour Catholic Church in Hamburg" /> </NavLink></div>
            <div> <NavLink to="/" className="logo-text"> Eritrean Holy Saviour <br/> Catholic Church Hamburg</NavLink></div>
        </div>

        <ul className={click ? "nav-menu active" : "nav-menu"}>

            <li className="nav-item">
                <NavLink to="/" className="nav-links" style={({ isActive }) => ({
                    color: isActive && "red", textDecoration: isActive && "underline", background: isActive && "#aee6fa", borderRadius: isActive && "0.3rem",pointerEvents: isActive && "none"})}> Community </NavLink>
            </li>

            <li className="nav-item service" onMouseEnter={onMouseEnterService} onMouseLeave={onMouseLeaveService}>
                <NavLink to="/service" className="nav-links" style={({ isActive }) => ({
                    color: isActive && "red", textDecoration: isActive && "underline", background: isActive && "#aee6fa", borderRadius: isActive && "0.3rem", pointerEvents: isActive && "none"})}> Service <i className="fas fa-caret-down"/>   </NavLink>
                  {dropdownService && <DropdownService />}
            </li>


            <li className="nav-item">
                <NavLink to="/choir" className="nav-links" style={({ isActive }) => ({
                    color: isActive && "red", textDecoration: isActive && "underline", background: isActive && "#aee6fa", borderRadius: isActive && "0.3rem", pointerEvents: isActive && "none"})}> Choir  </NavLink>
            </li>

            <li className="nav-item">
                <NavLink to="/children" className="nav-links" style={({ isActive }) => ({
                    color: isActive && "red", textDecoration: isActive && "underline", background: isActive && "#aee6fa", borderRadius: isActive && "0.3rem", pointerEvents: isActive && "none"})}> Children  </NavLink>
            </li>

            <li className="nav-item">
                <NavLink to="/report" className="nav-links" style={({ isActive }) => ({
                    color: isActive && "red", textDecoration: isActive && "underline", background: isActive && "#aee6fa", borderRadius: isActive && "0.3rem", pointerEvents: isActive && "none"})}> Report  </NavLink>
            </li>

            <li className="nav-item">
                <NavLink to="/report" className="nav-links" style={({ isActive }) => ({
                    color: isActive && "red", textDecoration: isActive && "underline", background: isActive && "#aee6fa", borderRadius: isActive && "0.3rem", pointerEvents: isActive && "none"})}> Report  </NavLink>
            </li>

            <li className="nav-item">
                <NavLink to="/contact" className="nav-links" style={({ isActive }) => ({
                    color: isActive && "red", textDecoration: isActive && "underline", background: isActive && "#aee6fa", borderRadius: isActive && "0.3rem", pointerEvents: isActive && "none"})}> Contact </NavLink>
            </li>

        </ul>
        
        
        <div className="login-register-container">

          <button className='login'>
            <NavLink to="/login" className="login-link" style={({ isActive }) => ({
                    color: isActive && "red", textDecoration: isActive && "underline", background: isActive && "#aee6fa", borderRadius: isActive && "0.3rem", pointerEvents: isActive && "none"})}> Login </NavLink>
          </button> |

          <button className='register'> 
            <NavLink to="/register" className="register-link" style={({ isActive }) => ({
                    color: isActive && "red", textDecoration: isActive && "underline", background: isActive && "#aee6fa", borderRadius: isActive && "0.3rem", pointerEvents: isActive && "none"})}> Register </NavLink> 
          </button>|

          <select name="language" className='language'>
            <option value=""> Language </option>
            <option value=""> Tigrigna </option>
            <option value=""> English </option>
            <option value=""> Deutsch </option>
          </select> 
          
        </div>
  
      </nav>
    
    </section>
    )
  } else {
    return(
      <section className="header-container">
      <nav className="navigation-bar">

        <div className="logo-container">
            <div> <NavLink to="/"><img className="logo" src={logo} alt="Logo of  Eritrean Holy Saviour Catholic Church in Hamburg" /> </NavLink></div>
            <div> <NavLink to="/" className="logo-text"> Eritrean Holy Saviour <br/> Catholic Church Hamburg</NavLink></div>
        </div>

        <ul className={click ? "nav-menu active" : "nav-menu"}>

            <li className="nav-item">
                <NavLink to="/" className="nav-links" style={({ isActive }) => ({
                    color: isActive && "red", textDecoration: isActive && "underline", background: isActive && "#aee6fa", borderRadius: isActive && "0.3rem",pointerEvents: isActive && "none"})}> Community </NavLink>
            </li>

            <li className="nav-item service" onMouseEnter={onMouseEnterService} onMouseLeave={onMouseLeaveService}>
                <NavLink to="/service" className="nav-links" style={({ isActive }) => ({
                    color: isActive && "red", textDecoration: isActive && "underline", background: isActive && "#aee6fa", borderRadius: isActive && "0.3rem", pointerEvents: isActive && "none"})}> Service <i className="fas fa-caret-down"/>   </NavLink>
                  {dropdownService && <DropdownService />}
            </li>


            <li className="nav-item">
                <NavLink to="/choir" className="nav-links" style={({ isActive }) => ({
                    color: isActive && "red", textDecoration: isActive && "underline", background: isActive && "#aee6fa", borderRadius: isActive && "0.3rem", pointerEvents: isActive && "none"})}> Choir  </NavLink>
            </li>

            <li className="nav-item">
                <NavLink to="/children" className="nav-links" style={({ isActive }) => ({
                    color: isActive && "red", textDecoration: isActive && "underline", background: isActive && "#aee6fa", borderRadius: isActive && "0.3rem", pointerEvents: isActive && "none"})}> Children  </NavLink>
            </li>

            <li className="nav-item">
                <NavLink to="/contact" className="nav-links" style={({ isActive }) => ({
                    color: isActive && "red", textDecoration: isActive && "underline", background: isActive && "#aee6fa", borderRadius: isActive && "0.3rem", pointerEvents: isActive && "none"})}> Contact </NavLink>
            </li>

        </ul>
        
        
        <div className="login-register-container">

          <button className='login'>
            <NavLink to="/login" className="login-link" style={({ isActive }) => ({
                    color: isActive && "red", textDecoration: isActive && "underline", background: isActive && "#aee6fa", borderRadius: isActive && "0.3rem", pointerEvents: isActive && "none"})}> Login </NavLink>
          </button> |

          <button className='register'> 
            <NavLink to="/register" className="register-link" style={({ isActive }) => ({
                    color: isActive && "red", textDecoration: isActive && "underline", background: isActive && "#aee6fa", borderRadius: isActive && "0.3rem", pointerEvents: isActive && "none"})}> Register </NavLink> 
          </button>|

          <select name="language" className='language'>
            <option value=""> Language </option>
            <option value=""> Tigrigna </option>
            <option value=""> English </option>
            <option value=""> Deutsch </option>
          </select> 
          
        </div>
  
      </nav>
    
    </section>
    )
  }
}

export default Navigation;