import React from 'react'

const Hero: React.FC = () => {
  return (
    <section style={{ padding: '64px 16px', textAlign: 'center', background: 'linear-gradient(135deg,#dbeafe,#fef3c7)' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <h1 style={{ fontSize: 48, margin: '0 0 16px' }}>Welcome to Landzo</h1>
        <p style={{ fontSize: 18, margin: '0 0 24px', color: '#374151' }}>
          Modern solutions to launch your product with a beautiful landing experience.
        </p>
        <img
          src="/hero-land.jpg"
          alt="Hero"
          style={{ width: '100%', maxWidth: 960, borderRadius: 12, boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}
        />
      </div>
    </section>
  )
}

export default Hero
