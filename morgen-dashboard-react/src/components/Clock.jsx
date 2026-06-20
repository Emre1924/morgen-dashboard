import React, { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Funktion für die dynamische Begrüßung
 const getGreeting = () => {
    const hours = time.getHours();
    // Wenn es zwischen 00:00 und 04:59 Uhr ist, gilt es noch als Abend/Nacht
    if (hours >= 0 && hours < 5) return "Guten Abend, Emre! 🌙";
    if (hours < 11) return "Guten Morgen, Emre! 🌅";
    if (hours < 18) return "Guten Tag, Emre! ☀️";
    return "Guten Abend, Emre! 🌙";
  };
  
  const formatTime = (val) => String(val).padStart(2, '0');

  return (
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
      {/* Die dynamische Begrüßung von deinem Screenshot */}
      <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', fontWeight: 'bold' }}>
        {getGreeting()}
      </h1>
      
      {/* Die große orangefarbene Live-Uhr */}
      <div style={{ fontSize: '3.5rem', fontWeight: 'bold', color: '#ff7b00', letterSpacing: '2px' }}>
        {formatTime(time.getHours())}:{formatTime(time.getMinutes())}:{formatTime(time.getSeconds())}
      </div>
      
      <div style={{ fontSize: '1.2rem', opacity: 0.7, marginTop: '5px' }}>
        {time.toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}
      </div>
    </div>
  );
}

export default Clock;