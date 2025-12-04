import type Weather from "../../Weather"; 
import React from "react";
import "./Devided.css"
import { useEffect } from "react";

interface DevidedProps {
  weather: Weather | null;
}

const Devided: React.FC<DevidedProps> = ({ weather })=>
{

    useEffect(() => {
        handleResize()
    
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [weather]);

    const handleResize = ()=>{
        if (weather == null) return
        
        const container = document.querySelector('.devided');
        const hourElements = document.querySelectorAll('.data-col');
    
        if (container == null || hourElements == null) return;
    
        const currentTime = new Date(weather.location.localtime).getHours();
        const hourWidth = 50; 
        let scrollPosition = currentTime * hourWidth;
        scrollPosition -= container.clientWidth/2
        scrollPosition += 40
        // DO NOT FUCKING ASK it works ok?
    
        container.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
    }

    const temps = weather?.forecast.forecastday[0].hour.map(h => h.temp_c) ?? [];
    const maxTemp: number = temps.length > 0 ? Math.max(...temps) : 0;
    const minTemp: number = temps.length > 0 ? Math.min(...temps) : 0;

    const difference_in_px = 200/(maxTemp-minTemp)

    function getCols(){
        return(
            weather?.forecast.forecastday[0]?.hour.map((h) => (
              <div
                style={{
                  height: `${50 + (h.temp_c - minTemp) * difference_in_px}px`,
                  backgroundColor:
                    new Date(h.time.toString()).getHours() ===
                    new Date(weather?.location.localtime).getHours()
                      ? "var(--dependent-color)"
                      : "white",
                }}
                key={h.time_epoch}
                className="data-col"
              >
                <div>{h.temp_c}</div>
              </div>
            ))
        )
    }

    function getNums(){
        return(
            weather?.forecast.forecastday[0]?.hour.map((h) => {
              const hour = new Date(h.time.toString()).getHours();

              const formattedHour = hour < 10 ? `0${hour}` : `${hour}`;

              return (
                <p className="data-num" key={"" + h.time_epoch + h.time}>
                  {formattedHour}
                </p>
              );
            })
        )
    }

    return(
        <div className="devided-holder">
        <div className="devided panel">
          <div className="data-cols">
            {getCols()}
          </div>
          <div className="data-nums">
            {getNums()}
          </div>
        </div>
      </div>

    )
}

export default Devided