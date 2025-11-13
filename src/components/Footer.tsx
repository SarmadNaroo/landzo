import React from 'react'

const Footer: React.FC = () => (
  <footer style={{ background: '#111827', color: '#fff', padding: '24px 16px', marginTop: 32 }}>
    <div style={{ maxWidth: 960, margin: '0 auto', textAlign: 'center' }}>
      <p style={{ margin: 0 }}>© {new Date().getFullYear()} Landzo. All rights reserved.</p>
    </div>
  </footer>
)

export default Footer
