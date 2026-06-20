import React, { useState, useEffect } from 'react';

function Weather() {
  const [stadt, setStadt] = useState('Dortmund'); // Startstadt Dortmund
  const [suchBegriff, setSuchBegriff] = useState(''); // Bleibt leer beim Start
  const [wetterDaten, setWetterDaten] = useState({ temp: 28, info: 'Sonnig', feucht: 51, wind: 13 });

  useEffect(() => {
    // Wenn das Feld komplett leergeraddelt wurde, direkt Dortmund laden und nicht die API fragen
    if (suchBegriff.trim() === '') {
      setStadt('Dortmund');
      ladeWetterFuerStadt('Dortmund');
      return;
    }

    // Debounce: Wir warten 500ms, nachdem der User aufgehört hat zu tippen, bevor wir die API fragen
    const timer = setTimeout(() => {
      ladeWetterFuerStadt(suchBegriff.trim());
    }, 500);

    return () => clearTimeout(timer); // Löscht den alten Timer, wenn der User weitertippt
  }, [suchBegriff]);

  // Zentrale Funktion, die das Wetter abruft
  const ladeWetterFuerStadt = async (stadtName) => {
    try {
      // 1. Geocoding: Koordinaten abrufen
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${stadtName}&count=1&language=de&format=json`);
      const geoData = await geoRes.json();
      
      if (geoData.results && geoData.results.length > 0) {
        const { latitude, longitude, name } = geoData.results[0];
        setStadt(name);

        // 2. Wetterdaten abrufen
        const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m`);
        const weatherData = await weatherRes.json();

        if (weatherData.current) {
          const code = weatherData.current.weather_code;
          let zustand = 'Sonnig';
          if (code > 0 && code <= 3) zustand = 'Leicht bewölkt';
          if (code >= 45 && code <= 48) zustand = 'Nebel';
          if (code >= 51 && code <= 67) zustand = 'Regen';
          if (code >= 71 && code <= 77) zustand = 'Schnee';
          if (code >= 80 && code <= 82) zustand = 'Regenschauer';
          if (code >= 95) zustand = 'Gewitter';

          setWetterDaten({
            temp: Math.round(weatherData.current.temperature_2m),
            info: zustand,
            feucht: weatherData.current.relative_humidity_2m,
            wind: Math.round(weatherData.current.wind_speed_10m)
          });
        }
      }
    } catch (error) {
      console.error("Fehler beim Laden des Wetters:", error);
    }
  };

  return (
    <div className="weather-container" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <h3 style={{ margin: '0 0 15px 0', color: 'var(--card-text)' }}>Wetter</h3>
      
      <div style={{ marginBottom: '20px', width: '100%' }}>
        <input 
          type="text" 
          placeholder="Stadt eingeben..." 
          value={suchBegriff}
          onChange={(e) => setSuchBegriff(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1px solid var(--border)',
            background: 'var(--input-bg)',
            color: 'var(--input-text)',
            boxSizing: 'border-box',
            fontSize: '14px'
          }}
        />
      </div>

      <div className="weather-info" style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ margin: '0 0 5px 0', fontSize: '24px' }}>{stadt}</h2>
          <div style={{ fontSize: '48px', fontWeight: 'bold', margin: '10px 0', color: '#ff7a00' }}>
            {wetterDaten.temp}°C
          </div>
          <p style={{ margin: '5px 0', display: 'flex', alignItems: 'center', gap: '5px' }}>
            {wetterDaten.info} {wetterDaten.info.includes('Regen') ? '🌧️' : wetterDaten.info.includes('wölkt') ? '⛅' : wetterDaten.info.includes('Gewitter') ? '⛈️' : '☀️'}
          </p>
        </div>
        
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          marginTop: '20px', 
          paddingTop: '15px', 
          borderTop: '1px solid var(--border)',
          fontSize: '14px',
          opacity: 0.8
        }}>
          <span>💧 {wetterDaten.feucht}% Luftf.</span>
          <span>💨 {wetterDaten.wind} km/h Wind</span>
        </div>
      </div>
    </div>
  );
}

export default Weather;