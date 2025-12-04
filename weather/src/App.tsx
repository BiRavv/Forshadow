import React, { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search/Search";
import ForecastCard from "./components/ForcastCard/ForecastCard";
import Wind from "./components/Wind/Wind";
import AUTH from "./components/Secret"; // Authentication key for https://www.weatherapi.com account
import type Weather from "./Weather";
import Astro from "./components/Astro/Astro";
import Devided from "./components/Devided/Devided";
import Today from "./components/Today/Today";
import Impostor from "./components/Impostor/Impostor";

const App = () => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>("auto:ip");

  useEffect(() => {
    if (weather) {
      const isNight = weather.current.is_day === 0;

      document.documentElement.style.setProperty(
        "--background",
        isNight ? "url(background-night.png)" : "url(background-day.png)"
      );

      document.documentElement.style.setProperty(
        "--dependent-color",
        isNight ? "#02467d" : "#FFF002"
      );
    }
  }, [weather]);

  useEffect(() => {
    const apiKey = AUTH;
    const url =
      location != null && location != ""
        ? `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`
        : `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=auto:ip&days=3`;

    const fetchWeather = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("UNKNOWN ERROR");
      } finally {
        setLoading(false)
      }
    };

    fetchWeather();
  }, [location]);

  useEffect(() => {
      if (weather != null) setFavicon(weather?.current.condition.icon)
    }, [weather]);

    const setFavicon = (iconUrl: string) => {
    let link = document.querySelector("link[rel='icon']") as HTMLLinkElement;
    
    if (!link) {
      link = document.createElement("link") as HTMLLinkElement;
    }

    link.type = "image/x-icon";
    link.rel = "icon";
    link.href = iconUrl;
    document.head.appendChild(link);
  };


  return (
    <div id="app">
      <Impostor value ={loading} ></Impostor>

      <Search
        key="search-bar"
        initialLocation={weather?.location}
        onSelect={(x) => setLocation("id:" + x.id)}
      />
      <div className="general">
        <Today weather={weather}></Today>
        <div className="forecasts">
          {weather?.forecast.forecastday.map((day) => (
            <ForecastCard
              key={"forecast-day-" + day.date_epoch}
              forecastday={day}
            />
          ))}
        </div>
      </div>

      <Devided weather={weather}></Devided>

      <div className="sub-data">
        <Astro weather={weather}></Astro>
        <Wind weather={weather}></Wind>
      </div>

      <p id = "owners-text">@2025 <br />This webpage was created by Biró Péter (aka BiRaw) <br /> 
      Thanks for weatherapi.com providing the weather data! <br />
      Trust us with your weather!
      </p>
    </div>
  );
};

export default App;
