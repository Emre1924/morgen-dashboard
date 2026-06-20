import React, { useState, useEffect } from 'react';
import Clock from './components/Clock';
import ThemeToggle from './components/ThemeToggle';
import Weather from './components/Weather';
import TodoList from './components/TodoList';
import QuickLinks from './components/QuickLinks';
import News from './components/News';

function App() {
  const [backgroundGradient, setBackgroundGradient] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const checkInitialTheme = () => {
      const hasDark = document.documentElement.classList.contains('dark-mode') || document.body.classList.contains('dark-mode');
      setIsDarkMode(hasDark);
    };
    checkInitialTheme();

    const updateBackground = () => {
      const stunde = new Date().getHours();
      if (stunde >= 6 && stunde < 11) {
        setBackgroundGradient('linear-gradient(135deg, #e0c3fc 0%, #fbc2eb 100%)');
      } else if (stunde >= 11 && stunde < 18) {
        // HIER JETZT DAS NEUE BLASSERE HIMMELSBLAU FÜR DEN TAG
        setBackgroundGradient('linear-gradient(135deg, #e0f2fe 0%, #bae6fd 100%)');
      } else if (stunde >= 18 && stunde < 22) {
        setBackgroundGradient('linear-gradient(135deg, #f6d365 0%, #fda085 100%)');
      } else {
        setBackgroundGradient('linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)');
      }
    };

    updateBackground();
    const interval = setInterval(updateBackground, 60000);

    const observer = new MutationObserver(() => {
      const hasDark = document.documentElement.classList.contains('dark-mode') || document.body.classList.contains('dark-mode');
      setIsDarkMode(hasDark);
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  const aktuellerHintergrund = isDarkMode ? '#1a1a1a' : backgroundGradient;

  return (
    <div className="app-wrapper" style={{ background: aktuellerHintergrund }}>
      <div className="app-container" style={{ padding: '30px 20px', maxWidth: '1400px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
          <ThemeToggle />
        </div>

        <Clock />
        <QuickLinks />

        <div className="dashboard-grid">
          <div className="dashboard-card"><Weather /></div>
          <div className="dashboard-card"><TodoList /></div>
          <div className="dashboard-card"><News /></div>
        </div>
      </div>

      <style>{`
        html, body {
          margin: 0 !important;
          padding: 0 !important;
          width: 100% !important;
          min-height: 100vh !important;
          background: #1a1a1a !important;
        }

        .app-wrapper {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          overflow-y: auto;
          transition: background 0.3s ease-in-out;
        }

        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 30px;
          margin-top: 40px;
          align-items: stretch;
        }

        :root {
          --card-bg: #ffffff;
          --card-text: #222222;
          --input-bg: #f8f9fa;
          --input-text: #000000;
          --item-bg: rgba(0, 0, 0, 0.04);
          --item-text: #333333;
          --shadow: rgba(0, 0, 0, 0.05);
          --border: rgba(0, 0, 0, 0.08);
        }

        .dark-mode {
          --card-bg: #2a2a2a;
          --card-text: #ffffff;
          --input-bg: #3a3a3a;
          --input-text: #ffffff;
          --item-bg: rgba(255, 255, 255, 0.08);
          --item-text: #ffffff;
          --shadow: rgba(0, 0, 0, 0.4);
          --border: rgba(255, 255, 255, 0.1);
        }

        .dashboard-card {
          padding: 25px;
          border-radius: 15px;
          background: var(--card-bg) !important;
          color: var(--card-text) !important;
          box-shadow: 0 10px 30px var(--shadow);
          border: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          min-height: 380px;
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
}

export default App;