import React, { useState } from 'react';
import { ServicesMenuItems } from '../../data/menuItems';
import { NavLink } from 'react-router-dom';


const DropdownService = () => {
    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);
    
    return (
      <div>
        <ul onClick={handleClick} className={click ? "dropdown-menu-service clicked" : "dropdown-menu-service"}>
          {
            ServicesMenuItems.map((item, index) => {
            return (
              <li key={index}>
                <NavLink 
                  to={item.path} 
                  onClick={() => setClick(false)} 
                  className={item.cName}
                  style={({ isActive }) => ({
                    color: isActive && "red", textDecoration: isActive && "underline", background: isActive && "#aee6fa", borderRadius: isActive && "0.3rem",pointerEvents: isActive && "none"})}
                > 
                  {item.title}
                </NavLink>
              </li>
            )
          })
        }
        </ul>
      </div>
    )
}

export default DropdownService;