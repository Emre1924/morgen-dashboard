import React, { useState, useEffect } from 'react';

function ThemeToggle() {
  // 1. Zustand für Dark Mode definieren. Wir prüfen direkt, ob im localStorage schon was gespeichert war.
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme === 'dark';
  });

  // 2. useEffect sorgt dafür, dass sich die Klasse am body ändert, sobald sich "isDarkMode" ändert
  useEffect(() => {
    const body = document.body;
    if (isDarkMode) {
      body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // 3. Funktion zum Umschalten
  const toggleTheme = () => {
    setIsDarkMode(prevMode => !prevMode);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <button 
        onClick={toggleTheme} 
        id="theme-toggle"
        style={{
          padding: '10px 20px',
          fontSize: '1rem',
          cursor: 'pointer',
          borderRadius: '20px',
          border: '1px solid #ccc',
          backgroundColor: isDarkMode ? '#333' : '#fff',
          color: isDarkMode ? '#fff' : '#000',
          transition: 'all 0.3s ease'
        }}
      >
        {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
    </div>
  );
}

export default ThemeToggle;