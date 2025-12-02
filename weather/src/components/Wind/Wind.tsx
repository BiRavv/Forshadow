import React from "react";
import type Weather from "../../Weather";
import "./Wind.css"

interface WindProps {
  weather: Weather | null;
}

const Compass: React.FC<WindProps> = ({ weather }) => {
  if (!weather) return null;

  const windDeg = weather.current.wind_degree;

  function getWindDescription(kph: number): string {
    if (kph < 5) {
      return "Calm";
    } else if (kph < 20) {
      return "Light breeze";
    } else if (kph < 40) {
      return "Moderate wind";
    } else if (kph < 60) {
      return "Strong wind";
    } else if (kph < 85) {
      return "Gale";
    } else {
      return "Storm";
    }
  }

  return (
    <div className="panel wind">
          <div className="compass-holder">
            <div className="middle"></div>
             <div className="compass">
              <div
                className="arrow"
                style={{ transform: `translate(0, -50%) rotate(${windDeg}deg)` }}
              >
                <div className="dial"></div>
              </div>
            </div>
          </div>
          <div className="wind-details">
            <h2>
              Wind is blowing with <br /> {weather?.current.wind_kph} KM/H
            </h2>
            <h1>
              {weather?.current.wind_kph != null
                ? getWindDescription(weather.current.wind_kph)
                : "Loading wind…"}
            </h1>
          </div>
        </div>
  );
};

export default Compass;
