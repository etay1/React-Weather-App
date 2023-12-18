import React from "react";

const DateTimeDisplay = () => (
  <p>{`Current Date and Time: ${new Date().toLocaleString()}`}</p>
);

export default DateTimeDisplay;
