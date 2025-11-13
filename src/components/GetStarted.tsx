import React from 'react'
import { Link } from 'react-router-dom'

const GetStarted: React.FC = () => (
  <section style={{ padding: '56px 16px', background: '#ffffff' }}>
    <div style={{ maxWidth: 960, margin: '0 auto', textAlign: 'center' }}>
      <h2 style={{ fontSize: 32, marginBottom: 12 }}>Get Started</h2>
      <p style={{ color: '#4b5563', marginBottom: 16 }}>Create an account to register your interest and client details.</p>
      <Link to="/register" style={{ background: '#111827', color: '#fff', padding: '12px 18px', borderRadius: 8, textDecoration: 'none' }}>
        Register Now
      </Link>
    </div>
  </section>
)

export default GetStarted
