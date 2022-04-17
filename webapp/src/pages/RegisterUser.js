import React from "react";
import { useState, useEffect } from "react";
import { AlertMessage, FormInput } from "../components";
import { useContextApp } from "../context/contextApp";

const State = {
  userName: "",
  userEmail: "",
  userPassword: "",
  isaMember: true,
  //displayAlertMsg: false,
};

const RegisterUser = () => {
  const [values, setValues] = useState(State);

  const { isLoading, displayAlertMsg } = useContextApp();
  //console.log(state);

  const toggleRegister = () => {
    setValues({ ...values, isaMember: !values.isaMember });
  };

  //Function to change after user changes his input
  const handleChange = (e) => {
    console.log(e.target);
  };

  //Function to perform action after user clicks on submit button
  const fnSubmit = (e) => {
    e.preventDefault();
    console.log(e.target);
  };
  return (
    <div>
      {/*Form HTML element for user Login or Registration */}
      <form className="form" onSubmit={fnSubmit}>
        <h3>{values.isaMember ? "Log-in" : "Register Now"}</h3>
        {displayAlertMsg && <AlertMessage></AlertMessage>}
        {/* Form Name input field HTML elements displayed only for non members */}
        {!values.isaMember && (
          <FormInput
            type="text"
            name="Username"
            value={values.userName}
            handleChange={handleChange}
          />
        )}

        {/* Form Email input field HTML elements */}
        <FormInput
          type="email"
          name="Registered email"
          value={values.userEmail}
          handleChange={handleChange}
        />
        {/* Form Password input field HTML elements */}
        <FormInput
          type="password"
          name="password"
          value={values.userPassword}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block">
          Login
        </button>
        {/* Adding a register button and calling the toggle function between registered user login and new user login*/}
        <p>
          {values.isaMember ? "Not a member?" : "Already a member?"}
          <button type="button" onClick={toggleRegister} className="member-btn">
            {values.isaMember ? "Register Now" : "Log-in"}
          </button>
        </p>
      </form>
    </div>
  );
};

export default RegisterUser;
