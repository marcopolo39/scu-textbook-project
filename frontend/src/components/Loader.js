import React from "react";
import { Spinner } from "reactstrap";

const Loader = () => {
  return (
    <div
      style={{ height: "500px" }}
      className="d-flex justify-content-center align-items-center"
    >
      <Spinner color="secondary" />
    </div>
  );
};

export default Loader;
