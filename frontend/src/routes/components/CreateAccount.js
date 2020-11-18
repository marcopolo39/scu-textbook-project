import React from "react";
import "../../css/CreateAccount.css"


const CreateAccount = () => {
return (
    <div>
        <h1>Create An Account</h1>
        <input type="text" placeholder = "Email" className = "emailInputField"></input>
        <input type="text" placeholder = "Password" className = "passwordInputField"></input>
        <input type="text" placeholder = "Username" className = "usernameInputField"></input>
        <input type="text" placeholder = "Name" className = "nameInputField"></input>
        <input type="text" placeholder = "School" className = "schoolInputField"></input>
        <input type="text" placeholder = "Location" className = "locationInputField"></input>
        <button className = "continueBtn">Continue</button>
    </div>
);
};

export default CreateAccount;