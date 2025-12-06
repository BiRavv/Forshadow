export default interface Weather {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  current: {
    last_updated_epoch: number;
    last_updated: string;
    temp_c: number;
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
        mintemp_c: number;
        avgtemp_c: number;
        daily_chance_of_rain: number;
        condition: {
          text: string;
          icon: string;
        };
      };
    }[];
  };
}
