import React, { useState, useContext } from "react";
import { myContext } from "../../App";
import "../../styles/reportPage/Report.css";

const SacramentsReport = () => {
 // const { sacraments, setSacraments } = useContext(myContext);
  // State variables report for sacrament data
  const [baptism, setBaptism] = useState("");
  const [firstCommunion, setFirstCommunion] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [covenant, setCovenant] = useState("");
  const [other, setOther] = useState("");
  const [sacramentDate, setSacramentDate] = useState("");
  const [sacraments, setSacraments] = useContext([]);

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
        "Content-Type": "application/json",
      },
    };

    const response = await fetch("http://localhost:5000/sacraments", settings);
    const data = await response.json();

    try {
      if (response.ok) {
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
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
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
          <hr />
          <div className="surplus-container">
            <h3>Total</h3>
          </div>
          <hr />
        </section>
      </div>
    </div>
  );
};

export default SacramentsReport;
