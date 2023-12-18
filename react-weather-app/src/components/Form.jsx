import React from "react";

const Form = ({ city, setCity, days, setDays, handleSubmit, cityCoordinates }) => (
  <form className="form" onSubmit={handleSubmit}>
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
  </form>
);

export default Form;
