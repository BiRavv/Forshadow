import { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search/Search";
import ForecastCard from "./components/ForcastCard/ForecastCard";
import Wind from "./components/Wind/Wind";
import type Weather from "./Weather";
import Astro from "./components/Astro/Astro";
import Devided from "./components/Devided/Devided";
import Today from "./components/Today/Today";
import Impostor from "./components/Impostor/Impostor";

const App = () => {
  const [weather, setWeather] = useState<Weather | null>(null);
  const [loading, setLoading] = useState(true);
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
    const url =
      location && location !== ""
        ? `/api/weather?q=${location}`
        : `/api/weather`;

    const fetchWeather = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setWeather(data);
        setLoading(false);
      } catch (err) {}
    };

    fetchWeather();
  }, [location]);

  useEffect(() => {
    if (weather != null) setFavicon(weather?.current.condition.icon);
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
      <Impostor value={loading}></Impostor>

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

      <p id="owners-text">
        @2025 <br />
        This webpage was created by Biró Péter (aka BiRaw) <br />
        Thanks for weatherapi.com providing the weather data! <br />
        Trust us with your weather!
      </p>
    </div>
  );
};

export default App;
