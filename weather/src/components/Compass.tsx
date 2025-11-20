import React from "react";
import type { Weather } from "../App";

interface CompassProps {
  weather: Weather | null;
}

const Compass: React.FC<CompassProps> = ({ weather }) => {
  if (!weather) return null;

  const windDeg = weather.current.wind_degree;

  return (
    <div className="compass">
      <div
        className="arrow"
        style={{ transform: `translate(0, -50%) rotate(${windDeg}deg)` }}
      >
        <div className="dial"></div>
      </div>
    </div>
  );
};

export default Compass;
