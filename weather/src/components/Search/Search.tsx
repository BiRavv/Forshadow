import React, { useEffect, useState } from "react";
import AUTH from "../Secret";
import "./Search.css"

interface LocationOption {
  id: number;
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

interface SearchProps {
  initialLocation?: {
    name: string;
    region: string;
    country: string;
    lat: number;
    lon: number;
    tz_id?: string;
    localtime?: string;
  };
  onSelect?: (location: LocationOption) => void;
}

const Search: React.FC<SearchProps> = ({ initialLocation, onSelect }) => {
  const [options, setOptions] = useState<LocationOption[] | null>(null);
  const [lookfor, setLookfor] = useState<string>(
    initialLocation ? initialLocation.name : "auto:ip"
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [debouncedLookfor, setDebouncedLookfor] = useState<string>(lookfor);

  // Debounce typing
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedLookfor(lookfor);
    }, 1000);
    return () => clearTimeout(handler);
  }, [lookfor]);

  // Fetch when debounced value changes
  useEffect(() => {
    if (debouncedLookfor == null || debouncedLookfor.length === 0) return;

    const apiKey = AUTH;
    const url = `https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${debouncedLookfor}`;

    const fetchWeather = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: LocationOption[] = await response.json();
        setOptions(data);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("UNKNOWN ERROR");
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [debouncedLookfor]);

  const handleSelect = (opt: LocationOption) => {
    (document.getElementById("search-bar-input") as HTMLInputElement).value =
      "";
    setLookfor("" + opt.id);
    setOptions(null);
    if (onSelect) onSelect(opt);
  };

  return (
    <div className="search-bar">
      <input
        id="search-bar-input"
        className="panel"
        type="text"
        placeholder={initialLocation?.name}
        onChange={(e) => setLookfor(e.target.value)}
      />

      {options && options.length > 0 && (
        <ul>
          {loading && <li className="panel">Loading...</li>}
          {error && <li className="panel">Error: {error}</li>}

          {options.map((opt) => (
            <li
              className="panel"
              key={opt.id}
              onClick={() => handleSelect(opt)}
            >
              {opt.name}, {opt.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Search;
