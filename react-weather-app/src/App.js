import React, { useState } from "react";
import FormComponent from "./components/Form";
import LoadingIndicator from "./components/LoadingIndicator";
import SuccessMessage from "./components/SuccessMessage";
import TemperatureList from "./components/TemperatureList";
import DateTimeDisplay from "./components/DateTimeDisplay";

const cityCoordinates = {
  "Buffalo, NY": "42.8864,-78.8784",
  "Rochester, NY": "43.165556,-77.611389",
  "Brockport, NY": "43.214167,-77.939444",
  "Wilmington, DE": "39.745833,-75.546667",
  "Los Angeles, CA": "34.02,-118.7421",
  "San Diego, CA": "32.715,-117.1625",
  "Eau Claire, WI": "44.8114,-91.4985",
};

const App = () => {
  const [city, setCity] = useState("");
  const [days, setDays] = useState(1);
  const [temperatures, setTemperatures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const fetchData = async () => {
    setLoading(true);

    try {
      const coordinates = cityCoordinates[city];

      if (!coordinates) {
        console.error("Invalid city selection");
        return;
      }

      const response = await fetch(`https://api.weather.gov/points/${coordinates}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch coordinates: ${response.statusText}`);
      }

      const responseData = await response.json();
      const forecastURL = responseData.properties.forecast;

      const forecastResponse = await fetch(forecastURL);

      if (!forecastResponse.ok) {
        throw new Error(`Failed to fetch forecast data: ${forecastResponse.statusText}`);
      }

      const forecastData = await forecastResponse.json();

      const temps = forecastData.properties.periods
        .slice(0, days)
        .map((period) => period.temperature);

      setTemperatures(temps);
      console.log("Temperatures:", temps);
      setSuccessMessage(`Temperature in ${city} for the next ${days} day(s):`);
    } catch (error) {
      console.error("Error fetching data:", error.message || error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (city && days) {
      await fetchData();
    }
  };

  return (
    <div className="page">
      <div className="container">
        <h1 className="title">Weather App</h1>

        <FormComponent
          city={city}
          setCity={setCity}
          days={days}
          setDays={setDays}
          handleSubmit={handleSubmit}
          cityCoordinates={cityCoordinates}
        />

        <LoadingIndicator loading={loading} />
        <SuccessMessage successMessage={successMessage} />
        <TemperatureList temperatures={temperatures} />
        <DateTimeDisplay />
      </div>
    </div>
  );
};

export default App;
