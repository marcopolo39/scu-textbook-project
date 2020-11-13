import React from "react";
import PageHeader from "./components/PageHeader.js"
import "../css/CreateAccount.css";

const CreateAccount = () => {
  return (
      <div>
        <PageHeader />
        <div className = "createAccountBlock">
            <h1>Create An Account</h1>
            <input className = "emailEntryField" type="text" name="" placeholder="Email"/>
            <input className = "passwordEntryField" type="text" name="userPass" placeholder="Password"/>
            <input className = "usernameEntryField" type = "submit" placeholder = "Username" />
            <input className = "nameEntryField" type = "submit" placeholder = "Name" />
            <input className = "schoolEntryField" type="text" name="userID" placeholder="School"/>
            <input className = "locationEntryField" type="text" name="userPass" placeholder="Location"/>

        </div>
      </div>
  );
};



export default CreateAccount;
