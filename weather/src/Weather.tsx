
export default interface Weather {
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