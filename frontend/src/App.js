import React, { useState, useEffect } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/navbar/Navigation";
import Choir from "./views/choirPage/Choir";
import ChurchService from "./views/churchServicePage/ChurchService";
import Community from "./views/communityPage/Community";
import Contact from "./views/contactPage/Contact";
import Login from "./views/loginPage/Login";
import Register from "./views/registerPage/Register";
import Children from "./views/childrenPage/Children";
import NotFound from "./views/notFoundPage/NotFound";
import Report from "./views/reportPage/Report";


export const MyContext = React.createContext();

function App() {
  const userData = JSON.parse(localStorage.getItem("data")) || null;
  const [user, setUser] = useState(userData);
  const [messages, setMessages] = useState([]);
  const [songs, setSongs] = useState([]);
  const [finance, setFinance] = useState([]);
  const [sacraments, setSacraments] = useState([]);
  const [ isUserLoggedIn, setIsUserLoggedIn ] = useState(false);
  const [consent, setConsent] = useState(false);
  const [ token, setToken ] = useState(false);
  const [ sacramentAdmin, setSacramentAdmin] = useState(false);
  const [ financeAdmin, setFinanceAdmin] = useState(false);
  const [ topAdmin, setTopAdmin] = useState(false);

  //======================================================================
  // UseEffect used to handle user function
  //======================================================================
  useEffect( () => {
    //===============================
    // Function to fetch user data
    //==============================
    const fetchUserData = async () => {
      const data = JSON.parse( localStorage.getItem( "data" ) );
      if ( data ) {
        const settings = {
          method: "POST",
          headers: {
            "token": data.token
          }
        }

        const response = await fetch( process.env.REACT_APP_SERVER_URL + "/users/verifyToken", settings);
        const result = await response.json();
        try{
          if(response.ok) {
            const now = new Date();
            const tokenExpiry = new Date(now.getTime() + 1000 * 60 * 60);
            setIsUserLoggedIn(true);
            setUser({id:result.data._id, info:result.data, expiry: tokenExpiry.toISOString(), token:result.token  })
            setToken( data.token );
            //setSacramentAdmin(data.info.sacramentAdmin);
            setFinanceAdmin(data.info.financeAdmin);
            setTopAdmin(data.info.topAdmin);
          } else {
            throw new Error(result.message)
          }
        }catch(err){
          alert(err.message)
        }
      }
    }
    fetchUserData();
    
  }, [] );



  //======================================================================
  // UseEffect used to fetch finance data
  //======================================================================
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(process.env.REACT_APP_SERVER_URL + "/finances");
      const data = await response.json();

      try{
        if(response.ok) {
          setFinance(data);
        } else {
          throw new Error("Something went wrong");
        }
      }catch(err){
        console.log(err);
      }
    }
    fetchData();
  }, []);

  // The useEffect on the sacraments mount to run the sacraments report
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(process.env.REACT_APP_SERVER_URL + "/sacraments");;
      const data = await response.json();

      try{
        if(response.ok) {
          setSacraments(data);
        } else {
          throw new Error("Something went wrong");
        }
      }catch(err){
        console.log(err);
      }
    }
    fetchData();
  }, []);

  
 return (
    <MyContext.Provider value={{ user, setUser, messages, setMessages, songs, setSongs, finance, setFinance, sacraments, setSacraments, isUserLoggedIn, setIsUserLoggedIn, token, setToken, consent, setConsent, sacramentAdmin, setSacramentAdmin, financeAdmin, setFinanceAdmin, topAdmin, setTopAdmin}}>
      <div className='App'>
        <Router>
          <header>
            <Navigation />
          </header>
          <main>
            <Routes>
              <Route path="/" element={<Community/>} />
              <Route path="/service" element={<ChurchService />} />
              <Route path="/choir" element={<Choir />} />
              <Route path="/children" element={<Children/>} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/report" element={<Report/>} />
              <Route path="*" element={<NotFound/>} />
            </Routes>
          </main>
          <footer></footer>
        </Router>
      </div>
    </MyContext.Provider>
  );
}
export default App;
