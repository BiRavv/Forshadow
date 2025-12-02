import type Weather from "../../Weather"
import React from "react";
import { useEffect } from "react";
import "./Astro.css"

interface AstroProps {
  weather: Weather | null;
}

const Astro: React.FC<AstroProps> = ({ weather })=>{

    useEffect(() => {
      handleResize()
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, [weather]);

    const handleResize = () => {
        if (weather == null) return;
    
        function parseTimeToday(timeStr : string) {
            const today = new Date();
            const [time, period] = timeStr.split(' ');
            let [hours, minutes] = time.split(':').map(Number);
    
            if (period === 'PM' && hours !== 12) hours += 12;
            if (period === 'AM' && hours === 12) hours = 0;
    
            today.setHours(hours, minutes, 0, 0);
            return today;
        }
    
        let sunrise = parseTimeToday(weather?.forecast.forecastday[0].astro.sunrise);
        let sunset = parseTimeToday(weather?.forecast.forecastday[0].astro.sunset);
        let now = new Date(weather.location.localtime);
    
        let totalDuration = sunset.getTime() - sunrise.getTime();
        let elapsed = now.getTime() - sunrise.getTime();
        let degree = (elapsed / totalDuration) * 180;
    
        degree = 180 - degree
        degree = Math.min(180, Math.max(0, degree))
    
    
        updateDialPosition(degree);
      };

    function updateDialPosition(angleInDegrees: number): void {
        const sunPath = document.querySelector<HTMLElement>('.sun-path');
        const sunDial = document.querySelector<HTMLElement>('.sun-dial');
    
        if (sunPath === null || sunDial === null) {
          console.error("Could not find required elements '.sun-path' or '.sun-dial'.");
        } else {
          const a: number = sunPath.offsetWidth / 2; 
          const b: number = sunPath.offsetHeight / 2;
    
          const angleInRadians: number = angleInDegrees * (Math.PI / 180);
          const x: number = a * Math.cos(angleInRadians);
          const y: number = b * Math.sin(angleInRadians);
    
          if (sunDial == null) return;
    
          sunDial.style.left = (a + x) + 'px';
          sunDial.style.top = (b - y) + 'px';
      }
    }

    return(
        <div className="panel astro">
            <div className="sun-path">
              <div className="sun-dial"></div>
              <div className="time">{weather?.forecast.forecastday[0].astro.sunrise}</div>
              <div className="time moon-phase">{weather?.current.is_day == 0 ? weather?.forecast.forecastday[0].astro.moon_phase : ""}</div>
              <div className="time">{weather?.forecast.forecastday[0].astro.sunset}</div>
            </div>

        </div>
    )
}
export default Astro