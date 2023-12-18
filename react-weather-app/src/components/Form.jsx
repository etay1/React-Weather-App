import React, { useState } from "react";

const Form = ({
  city,
  setCity,
  days,
  setDays,
  handleSubmit,
  cityCoordinates,
}) => {
  const [error, setError] = useState(null);

  const handleFormSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior.

    if (!city) {
      setError("Please select a city before submitting.");
      return;
    }

    setError(null);

    try {
      await handleSubmit(e); // Pass the event object to handleSubmit.
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <form className="form" onSubmit={handleFormSubmit}>
      <label>
        Select City:
        <select value={city} onChange={(e) => setCity(e.target.value)}>
          <option value="">Select a city</option>
          {Object.keys(cityCoordinates).map((cityName) => (
            <option key={cityName} value={cityName}>
              {cityName}
            </option>
          ))}
        </select>
      </label>
      <label>
        Select Days:
        <select value={days} onChange={(e) => setDays(e.target.value)}>
          {[1, 2, 3, 4, 5, 6, 7].map((num) => (
            <option key={num} value={num}>
              {`${num} day(s)`}
            </option>
          ))}
        </select>
      </label>
      <button className="button" type="submit">
        Submit
      </button>
      {error && <div className="error-message">{error}</div>}
    </form>
  );
};

export default Form;
