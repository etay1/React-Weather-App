import React from "react";

const SuccessMessage = ({ successMessage }) => (
  <>{successMessage && <p>{successMessage}</p>}</>
);

export default SuccessMessage;
