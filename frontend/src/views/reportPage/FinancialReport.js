import React, { useState, useContext } from "react";
//import { myContext } from "../../App";
import "../../styles/reportPage/Report.css";

const FinancialReport = () => {
  //const { finances, setFinances } = useContext(myContext);
  const [offer, setOffer] = useState();
  const [donation, setDonation] = useState();
  const [priestExpense, setPriestExpense] = useState();
  const [choirExpense, setChoirExpense] = useState();
  const [generalExpense, setGeneralExpense] = useState();
  const [date, setDate] = useState(null);
  const [ finances, setFinances ] = useContext([]);

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
      },
    };

    const response = await fetch("http://localhost:5000/finances", settings);
    const data = await response.json();

    try {
      if (response.ok) {
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
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
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

      {/* Display the financial report table */}
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
    </div>
  );
};

export default FinancialReport;
