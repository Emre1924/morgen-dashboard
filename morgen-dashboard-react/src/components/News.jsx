import React from 'react';

function News() {
  const fakten = [
    "Wasser kurbelt den Stoffwechsel an: Schon ein großes Glas direkt nach dem Aufstehen aktiviert deine Verdauung. 💧",
    "Ballaststoffe aus Vollkornprodukten und Hülsenfrüchten halten deinen Blutzuckerspiegel stabil und verhindern Heißhunger. 🌾",
    "Gesunde Fette sind Treibstoff fürs Gehirn: Nüsse, Avocados und Olivenöl schützen deine Zellen und fördern die Konzentration. 🥑",
    "Proteine sättigen am längsten und unterstützen dich perfekt bei der Regeneration nach dem Training. 🥚",
    "Farbenfroh essen: Je bunter dein Teller (Gemüse & Obst), desto breiter ist das Spektrum an Vitaminen, das du aufnimmst. 🌈",
    "Sekundäre Pflanzenstoffe in Beeren und grünem Gemüse wirken im Körper wie ein Schutzschild gegen Entzündungen. 🫐",
    "Langsam kauen hilft beim Abnehmen: Das natürliche Sättigungsgefühl setzt im Gehirn erst nach etwa 20 Minuten ein. 🧠",
    "Ingwer und Kurkuma sind echte Booster: Sie stärken deine Immunabwehr und fördern aktiv die Durchblutung. 🫚",
    "Zucker versteckt sich oft: Fertigprodukte enthalten massenhaft Zucker unter Decknamen wie Maltodextrin oder Glukosesirup. 🔍",
    "Magnesium gegen Muskelkater: Bananen, Haferflocken und Kürbiskerne sind hervorragende, natürliche Quellen. 🍌",
    "Der Körper braucht Fett, um die Vitamine A, D, E und K überhaupt erst richtig aufnehmen zu können. 🥕"
  ];

  const heute = new Date().getDate();
  const faktDesTages = fakten[heute % fakten.length];

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box' }}>
      <h3 style={{ color: '#ff7b00', margin: '0 0 20px 0', textAlign: 'left' }}>Ernährungs-Fakt des Tages</h3>
      
      <div 
        className="fact-bubble"
        style={{
          background: 'var(--item-bg)',
          color: 'var(--item-text)',
          padding: '30px 25px', // Etwas mehr Innenabstand für wuchtigeren Look
          borderRadius: '12px',
          fontSize: '1.3rem', // Deutlich größere Schrift!
          lineHeight: '1.5',
          fontWeight: '600', // Etwas kräftigerer Text
          boxShadow: '0 4px 6px var(--shadow)',
          border: '1px solid var(--border)',
          transition: 'all 0.2s ease-in-out',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
        }}
      >
        <p style={{ margin: 0, textAlign: 'center' }}>{faktDesTages}</p>
      </div>

      <div style={{ fontSize: '0.8rem', opacity: 0.5, textAlign: 'right', fontStyle: 'italic', marginTop: '15px' }}>
        Wechselt automatisch jeden Tag ✨
      </div>

      <style>{`
        .fact-bubble:hover {
          border-color: #ff7b00 !important;
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}

export default News;