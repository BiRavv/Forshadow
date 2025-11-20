import React, { useEffect, useState } from "react";
import "./App.css";
import Search from "./components/Search";
import ForecastCard from "./components/ForecastCard";
import Compass from "./components/Compass";
import AUTH from "./components/Secret";

export interface Weather {
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
    is_day: number; //1 if day 0 if night
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
  };
  forecast: {
    forecastday: {
      date: string;
      date_epoch: number;
      astro: {
        sunrise: string;
        sunset: string;
        moon_phase: string;
      };
      hour: {
        temp_c: number;
        chance_of_rain: number;
        time_epoch: number;
        time: Date;
      }[];
      day: {
        maxtemp_c: number;
        maxtemp_f: number;
        mintemp_c: number;
        mintemp_f: number;
        avgtemp_c: number;
        avgtemp_f: number;
        daily_chance_of_rain: number;
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
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setWeather(data);
        console.log(data);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("UNKNOWN ERROR");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [location]);

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
    <div>
      <Search
        key="search-bar"
        initialLocation={weather?.location}
        onSelect={(x) => setLocation("id:" + x.id)}
      />
      <div className="general">
        <div className="today panel">
          <div>
            <img src={weather?.current.condition.icon} alt="" />
            <h2>{weather?.current.condition.text} </h2>
            <h2>{weather?.current.cloud}% cloudy</h2>
          </div>
          <div>
            <h1>{weather?.current.temp_c}°c</h1>
            <h2>Feels like {weather?.current.feelslike_c}°c</h2>
            <h1>
              🌧 {weather?.forecast.forecastday[0]?.day.daily_chance_of_rain}%
            </h1>
          </div>
        </div>

        <div className="forecasts">
          {weather?.forecast.forecastday.map((day) => (
            <ForecastCard
              key={"forecast-day-" + day.date_epoch}
              forecastday={day}
            />
          ))}
        </div>
      </div>

      <div className="devided-holder">
        <div className="devided panel">
          <div className="data-cols">
            {weather?.forecast.forecastday[0]?.hour.map((h) => (
              <div
                style={{
                  height: `${(h.temp_c + 30) * 5}px`,
                  backgroundColor:
                    new Date(h.time.toString()).getHours() ===
                    new Date().getHours()
                      ? "var(--dependent-color)"
                      : "white",
                }}
                key={h.time_epoch}
                className="data-col"
              >
                <div>{h.temp_c}</div>
              </div>
            ))}
          </div>
          <div className="data-nums">
            {weather?.forecast.forecastday[0]?.hour.map((h) => {
              const hour = new Date(h.time.toString()).getHours();

              const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;

              return (
                <p className="data-num" key={"" + h.time_epoch + h.time}>
                  {formattedHour}
                </p>
              );
            })}
          </div>
        </div>
      </div>

      <div className="sub-data">
        <div className="panel astro">TODO</div>
        <div className="panel wind">
          <div className="compass-holder">
            <div className="middle"></div>
            <Compass weather={weather}></Compass>
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
      </div>
    </div>
  );
};

export default App;
