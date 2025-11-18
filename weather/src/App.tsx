// App.tsx
import React, { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search";
import ForecastCard from "./components/ForecastCard";

interface Weather {
  location: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id: string;
    localtime: string;
  };
  current: {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
    temp_f: number;
    is_day: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_mph: number;
    wind_kph: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
  };
  forecast: {
    forecastday: {
      date: string;
      date_epoch: number;
      day: {
        maxtemp_c: number;
        maxtemp_f: number;
        mintemp_c: number;
        mintemp_f: number;
        avgtemp_c: number;
        avgtemp_f: number;
        condition: {
          text: string;
          icon: string;
          code: number;
        };
      };
    }[];
  };
}


const App = () => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>("auto:ip");

  useEffect(() => {
    const apiKey = "e6c71dafd11e4866b1d70712251311";
    
    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=7`;

    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setWeather(data);
        console.log(data)
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("UNKNOWN ERROR");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

  return (
    <div>
      <div className="today">
        <Search initialLocation={weather?.location} onSelect={(x)=>setLocation("id:"+x.id)} />

        <p>{weather?.current.temp_c} °C</p>
        <p>{weather?.location.name}</p>
      </div>
      

      <div className="forecasts">
        {weather?.forecast.forecastday.map((day)=><ForecastCard forecastday={day} />)}
      </div>
      
    </div>
  );
};

export default App;
