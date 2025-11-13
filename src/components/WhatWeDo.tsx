import React from 'react'

const WhatWeDo: React.FC = () => (
  <section style={{ padding: '56px 16px', background: '#f9fafb' }}>
    <div style={{ maxWidth: 960, margin: '0 auto' }}>
      <h2 style={{ fontSize: 32, marginBottom: 12 }}>What We Do</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 16 }}>
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ background: '#ffffff', borderRadius: 12, padding: 16, boxShadow: '0 4px 14px rgba(0,0,0,0.06)' }}>
            <img src={`https://picsum.photos/seed/landzo-${i}/1200/800`} alt={`Card ${i}`} style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 8, marginBottom: 12 }} />
            <h3 style={{ margin: '0 0 8px' }}>Feature {i}</h3>
            <p style={{ margin: 0, color: '#6b7280' }}>Brief description about the feature and its value.</p>
          </div>
        ))}
      </div>
    </div>
  </section>
)

export default WhatWeDo
