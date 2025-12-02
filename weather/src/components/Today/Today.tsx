import "./Today.css"
import type Weather from "../../Weather"
import React from "react";

interface ToadyProps {
  weather: Weather | null;
}

const Today: React.FC<ToadyProps> = ( weather)=>{
    return(
        <div className="today panel">
          <div>
            <img src={weather.weather?.current.condition.icon} alt="" />
            <h2>{weather.weather?.current.condition.text} </h2>
            <h2>{weather.weather?.current.cloud}% cloudy</h2>
          </div>
          <div>
            <h1>{weather.weather?.current.temp_c}°c</h1>
            <h2>Feels like {weather.weather?.current.feelslike_c}°c</h2>
            <h1>
              🌧 {weather.weather?.forecast.forecastday[0]?.day.daily_chance_of_rain}%
            </h1>
          </div>
        </div>
    )
}

export default Today