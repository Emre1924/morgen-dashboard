import React from 'react';

function QuickLinks() {
  const links = [
    { name: "Google", url: "https://www.google.com", icon: "🔍" },
    { name: "GitHub", url: "https://github.com", icon: "💻" },
    { name: "YouTube", url: "https://www.youtube.com", icon: "📺" },
    { name: "Gemini", url: "https://gemini.google.com", icon: "✨" }
  ];

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', padding: '5px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
        {links.map((link, index) => (
          <a 
            key={index}
            href={link.url}
            target="_blank" 
            rel="noopener noreferrer"
            className="quick-link-tile"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              padding: '12px',
              textDecoration: 'none',
              borderRadius: '10px',
              fontWeight: '500',
              transition: 'all 0.2s ease',
              background: 'var(--item-bg)',
              color: 'var(--item-text)',
              border: '1px solid var(--border)'
            }}
          >
            <span>{link.icon}</span>
            <span>{link.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}

export default QuickLinks;