// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [city, setCity] = useState('');
  const [days, setDays] = useState(1);
  const [temperatures, setTemperatures] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://api.weather.gov/points/${city}`);

        // Extract the forecast URL from the response
        const forecastURL = response.data.properties.forecast;

        // Fetch the forecast data using the obtained URL
        const forecastResponse = await axios.get(forecastURL);

        // Extract temperatures from the forecast response based on selected days
        const temps = forecastResponse.data.properties.periods
          .slice(0, days)
          .map((period) => period.temperature);

        setTemperatures(temps);
      } catch (error) {
        console.error('Error fetching data:', error.response || error.message || error);
      } finally {
        setLoading(false);
      }
    };

    if (city && days) {
      fetchData();
    }
  }, [city, days]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Select City:
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option value="">Select a city</option>
            <option value="43.165556,-77.611389">Rochester, NY</option>
            <option value="43.214167,-77.939444">Brockport, NY</option>
            <option value="39.745833,-75.546667">Wilmington, DE</option>
            <option value="34.02,-118.7421">Los Angeles, CA</option>
            <option value="32.715,-117.1625">San Diego, CA</option>
          </select>
        </label>
        <label>
          Select Days:
          <select value={days} onChange={(e) => setDays(e.target.value)}>
            <option value="1">1 day</option>
            <option value="2">2 days</option>
            <option value="3">3 days</option>
            <option value="4">4 days</option>
            <option value="5">5 days</option>
            <option value="6">6 days</option>
            <option value="7">7 days</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>

      {loading ? (
        <p>Loading...</p>
      ) : (
        temperatures.length > 0 && (
          <div>
            <p>{`Temperature in ${city} for the next ${days} day(s):`}</p>
            <ul>
              {temperatures.map((temp, index) => (
                <li key={index}>{`${index + 1} day: ${temp}°F`}</li>
              ))}
            </ul>
          </div>
        )
      )}

      {/* Display date and time */}
      <p>{`Current Date and Time: ${new Date().toLocaleString()}`}</p>
    </div>
  );
}

export default App;
