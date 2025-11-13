import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const navStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '12px 16px',
  maxWidth: 960,
  margin: '0 auto',
}

const Navbar: React.FC = () => (
  <header style={{ background: '#ffffff', borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 10 }}>
    <nav style={navStyle}>
      <Link to="/" style={{ fontWeight: 700, textDecoration: 'none', color: '#111827' }}>Landzo</Link>
      <div style={{ display: 'flex', gap: 12 }}>
        <NavLink to="/" style={({ isActive }) => ({ color: isActive ? '#111827' : '#6b7280', textDecoration: 'none' })}>Home</NavLink>
        <NavLink to="/register" style={({ isActive }) => ({ color: isActive ? '#111827' : '#6b7280', textDecoration: 'none' })}>Register</NavLink>
      </div>
    </nav>
  </header>
)

export default Navbar
