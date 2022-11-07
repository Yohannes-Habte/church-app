import React, { useState, useContext, useEffect } from "react";
import { MyContext} from "../../App";
import "../../styles/reportPage/Report.css";
import Logout from "../../components/Logout";

const Report = () => {
  // useState is a hook that allows us to create a state variable and set it to a value
  //const { finances, setFinances, sacraments, setSacraments } = useContext(MyContext);
  // state variables for financial data
 
  const [offer, setOffer] = useState();
  const [donation, setDonation] = useState();
  const [priestExpense, setPriestExpense] = useState();
  const [choirExpense, setChoirExpense] = useState();
  const [generalExpense, setGeneralExpense] = useState();
  const [date, setDate] = useState(null);
  // State variables report for sacrament data
  const [baptism, setBaptism] = useState("");
  const [firstCommunion, setFirstCommunion] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [covenant, setCovenant] = useState("");
  const [other, setOther] = useState("");
  const [sacramentDate, setSacramentDate] = useState("");
  // // State variables of arrays report
  const [finances, setFinances] = useState([]);
  const [sacraments, setSacraments] = useState([]);

  

  //===========================================================================================
  // useEffect is a hook that allows us to run financial reports when the page is loaded
  //===========================================================================================
  useEffect(() => {
    const fetchFinancialReport = async () => {
      try {
        const response = await fetch("http://localhost:5000/finances");
        const data = await response.json();
        setFinances(data.finances);
      } catch (error) {
        console.log(error);
      }
    };
    fetchFinancialReport();
  }, []);

  //===========================================================================================
  // useEffect is a hook that allows us to run sacrament reports when the page is loaded
  //===========================================================================================
  useEffect(() => {
    const fetchSacramentReport = async () => {
      try {
        const response = await fetch("http://localhost:5000/sacraments");
        const data = await response.json();
        setSacraments(data.sacraments);
      } catch (error) {
        console.log(error);
      }
    };
    fetchSacramentReport();
  } , []);

  
//===========================================================================================
  // Function to handle changes for the finance input fields
//===========================================================================================
  const onChangeFinance = (event) => {
    switch (event.target.name) {
      case "offer":
        setOffer(event.target.value);
        break;
      case "donation":
        setDonation(event.target.value);
        break;
      case "priestExpense":
        setPriestExpense(event.target.value);
        break;
      case "choirExpense":
        setChoirExpense(event.target.value);
        break;
      case "generalExpense":
        setGeneralExpense(event.target.value);
        break;
      case "date":
        setDate(event.target.value);
        break;
      default:
        break;
    }
  };

  //===========================================================================================
  // Function to handle changes for the sacrament input fields
  //===========================================================================================
  const onChangeSacraments = (event) => {
    switch (event.target.name) {
      case "baptism":
        setBaptism(event.target.value);
        break;
      case "firstCommunion":
        setFirstCommunion(event.target.value);
        break;
      case "confirmation":
        setConfirmation(event.target.value);
        break;
      case "covenant":
        setCovenant(event.target.value);
        break;
      case "other":
        setOther(event.target.value);
        break;
      case "sacramentDate":
        setSacramentDate(event.target.value);
        break;
      default:
        break;
    }
  };

  //===========================================================================================
  // Function to handle the submit button for the financial report
  //===========================================================================================
  const onSubmitFinance = async (event) => {
    event.preventDefault();
    
    const newFinanceReport = {
      offer,
      donation,
      priestExpense,
      choirExpense,
      generalExpense,
      date,
    };

    // POST request to add a new report to the database
    const settings = {
      method: "POST",
      body: JSON.stringify(newFinanceReport),
      headers: {
        "Content-Type": "application/json",
      }
    };

    const response = await fetch("http://localhost:5000/finances", settings);
    const data = await response.json();

    try{
      if(response.ok){
        setFinances([...finances, data.finances]);

        // Reset the input fields
        setOffer("");
        setDonation("");
        setPriestExpense("");
        setChoirExpense("");
        setGeneralExpense("");
        setDate("");

      } else {
        throw new Error(data.message);
      }
    }catch(error){
      alert(error.message);
    };

  };

  //===========================================================================================
  // Function to handle the submit button for the sacrament report
  //===========================================================================================
  const onSubmitSacrament = async (event) => {
    event.preventDefault();

    const newSacramentReport = {
      baptism,
      firstCommunion,
      confirmation,
      covenant,
      other,
      sacramentDate,
    };

    // POST request to add a new report to the database
    const settings = {
      method: "POST",
      body: JSON.stringify(newSacramentReport),
      headers: {
        "Content-Type": "application/json"
      }
    };

    const response = await fetch("http://localhost:5000/sacraments", settings);
    const data = await response.json();

    try{
      if(response.ok){
        setSacraments([...sacraments, data.sacraments]);

        // Reset the input fields
        setBaptism("");
        setFirstCommunion("");
        setConfirmation("");
        setCovenant("");
        setOther("");
        setSacramentDate("");
      } else {
        throw new Error(data.message);
      }
    }catch(error){
      alert(error.message);
    };
  };

  return (
    <div>
    { <Logout />}
      <section className="report-container">
        {/* Report Title  */}
        <div className="report-title">
          <h1> Reports of Eritrean Roman Catholic Church in Hamburg </h1>
        </div>

        {/* Financial Report Form */}
        <section className="finance-form-container">
          <h2 className="form-title"> Financial Report Form </h2>
          <form action="" className="finance-form">
            <div className="offer-container">
              <label htmlFor="offer"> Offer on the Mass Service </label>
              <input
                type="number"
                name="offer"
                id="offer"
                onChange={onChangeFinance}
                value={offer}
                placeholder="Offer"
              />
            </div>

            <div className="members-donation-container">
              <label htmlFor="donation"> Monthly Members Donation </label>
              <input
                type="number"
                name="donation"
                id="donation"
                onChange={onChangeFinance}
                value={donation}
                placeholder="Members payment"
              />
            </div>

            <div className="priest-expense-container">
              <label htmlFor="priestExpense"> Mass Service Payment </label>
              <input
                type="number"
                name="priestExpense"
                id="priestExpense"
                onChange={onChangeFinance}
                value={priestExpense}
                placeholder="Mass Service Payment"
              />
            </div>

            <div className="choir-container">
              <label htmlFor="choirExpense"> Choir Expenses </label>
              <input
                type="number"
                name="choirExpense"
                id="choirExpense"
                onChange={onChangeFinance}
                value={choirExpense}
                placeholder="Choir Expenses"
              />
            </div>

            <div className="general-container">
              <label htmlFor="generalExpense"> General Expenses </label>
              <input
                type="number"
                name="generalExpense"
                id="generalExpense"
                onChange={onChangeFinance}
                value={generalExpense}
                placeholder="General Expenses"
              />
            </div>

            <div>
              <label htmlFor="date"> Service Date </label>
              <input
                type="date"
                name="date"
                id="date"
                onChange={onChangeFinance}
                value={date}
                placeholder="Service Date"
              />
            </div>
          </form>

          <button onClick={onSubmitFinance}> Submit </button>
        </section>

        {/*  Sacrament Report Form */}
        <section className="sacrament-form-container">
          <h2 className="form-title"> Sacrament Report Form </h2>
          <form action="" className="sacrament-form">
            <div>
              <label htmlFor="baptism"> Baptism </label>
              <input
                type="text"
                name="baptism"
                id="baptism"
                onChange={onChangeSacraments}
                value={baptism}
                placeholder="Baptism"
              />
            </div>

            <div>
              <label htmlFor="firstCommunion"> First Communion </label>
              <input
                type="text"
                name="firstCommunion"
                id="firstCommunion"
                onChange={onChangeSacraments}
                value={firstCommunion}
                placeholder="First Communion"
              />
            </div>

            <div>
              <label htmlFor="confirmation"> Confirmation </label>
              <input
                type="text"
                name="confirmation"
                id="confirmation"
                onChange={onChangeSacraments}
                value={confirmation}
                placeholder=" Confirmation Service"
              />
            </div>

            <div>
              <label htmlFor="covenant"> Covenant Service</label>
              <input
                type="text"
                name="covenant"
                id="covenant"
                onChange={onChangeSacraments}
                value={covenant}
                placeholder="Covenant Service"
              />
            </div>

            <div>
              <label htmlFor="other"> Other Services </label>
              <input
                type="text"
                name="other"
                id="other"
                onChange={onChangeSacraments}
                value={other}
                placeholder=" Other Sacrament Service"
              />
            </div>

            <div>
              <label htmlFor="sacramentDate"> Service Date </label>
              <input
                type="date"
                name="sacramentDate"
                id="sacramentDate"
                onChange={onChangeSacraments}
                value={sacramentDate}
                placeholder="Service Date"
              />
            </div>
          </form>
          <button onClick={onSubmitSacrament}> Submit </button>
        </section>
      </section>

      {/*  Finance and Sacrament Services Report  */}
      <div className="finance-sacrament-report-container">

        {/*  Finance Report  */}
        <section className="financial-report-container">
          <h2> Annual Financial Report </h2>
          <hr />
          <div className="financial-title-report-container">
            <p>Date</p>
            <p>Offer</p>
            <p>Members Donation</p>
            <p>Mass Service Payment</p>
            <p>Choir Expenses</p>
            <p>General Expenses</p>
            <p>Total</p>
          </div>
          <hr />

          {finances.map((report, index) => {
            return (
              <div key={index} className="financial-report">
                <p> {report.date} </p>
                <p> {report.offer} </p>
                <p> {report.donation} </p>
                <p> {report.priestExpense} </p>
                <p> {report.choirExpense} </p>
                <p> {report.generalExpense} </p>
                <p> {report.total} </p>
              </div>
            );
          })}
          <hr/>
          <div className="surplus-container">
            <h3>Surplus</h3>
          </div>
          <hr />
        </section>

        {/*  Sacrament Report  */}
        <div className="sacrament-report-container">
          <section className="sacrament-report-container">
            <h2> Annual Sacrament Services Report </h2>
            <hr />
            <div className="sacrament-title-report-container">
              <p>Date</p>
              <p>Baptism</p>
              <p>First Communion</p>
              <p>Confirmation</p>
              <p>Covenant</p>
              <p>Other Services</p>
            </div>
            <hr />
            {sacraments.map((report, index) => {
              return (
                <div key={index} className="sacrament-report">
                  <p> {report.sacramentDate} </p>
                  <p> {report.baptism} </p>
                  <p> {report.firstCommunion} </p>
                  <p> {report.confirmation} </p>
                  <p> {report.covenant} </p>
                  <p> {report.other} </p>
                </div>
              );
            })}
            <hr/>
            <div className="surplus-container">
              <h3> Summary </h3>
            </div>
            <hr />
          </section>
        </div>
      </div>
    </div>
  );
};

export default Report;
