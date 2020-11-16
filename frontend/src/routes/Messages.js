import React from "react";
import PageHeader from "./components/PageHeader";
import "../css/Messages.css"
const Messages = () => {
  return (
    <div>
      <PageHeader />
      <div className = "messagesBox"></div>
    </div>
  );
};

export default Messages;
