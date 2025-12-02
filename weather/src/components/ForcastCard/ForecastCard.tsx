import App from "../../App";
import "./ForcastCard.css"

type Props = {
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
  };
};

const ForecastCard: React.FC<Props> = ({ forecastday }) => {
  function getOrdinalSuffix(day: number): string {
    if (day > 3 && day < 21) return day + "th";
    switch (day % 10) {
      case 1:
        return day + "st";
      case 2:
        return day + "nd";
      case 3:
        return day + "rd";
      default:
        return day + "th";
    }
  }

  return (
    <div className="forecast-card panel">
      <img src={forecastday.day.condition.icon} alt="" />
      <h2>
        {new Date(forecastday.date).toLocaleDateString("en-US", {
          weekday: "short",
        })}
      </h2>
      <p>{getOrdinalSuffix(new Date(forecastday.date).getDate())}</p>
      <hr />
      <h2>{forecastday.day.maxtemp_c}°c</h2>
      <p>{forecastday.day.avgtemp_c}°c</p>
      <h2>{forecastday.day.mintemp_c}°c</h2>
    </div>
  );
};
export default ForecastCard;
