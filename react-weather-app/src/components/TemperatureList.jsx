import React from "react";

const TemperatureList = ({ temperatures }) => (
  <>
    {temperatures.length > 0 && (
      <div>
        <ul>
          {temperatures.map((temp, index) => (
            <li key={index}>{`Day ${index + 1}: ${temp}°F`}</li>
          ))}
        </ul>
      </div>
    )}
  </>
);

export default TemperatureList;
