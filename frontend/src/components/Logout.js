import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../App';

const Logout = () => {
  const { setUser, setToken, setIsUserLoggedIn } = useContext(MyContext);
  const navigate = useNavigate();

  // FUNCTION TO LOGOUT 
  const logOut = () => {
    localStorage.clear();
    setUser(null);
    setIsUserLoggedIn(false);
    setToken(null);
    navigate("/");
  };
  return (
    <div>
      <button onClick={ logOut }> Log out </button>
    </div>
  )
}

export default Logout;
