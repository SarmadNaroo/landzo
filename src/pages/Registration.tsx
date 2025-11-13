import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { updateAccount, updateClient, reset } from '../features/registration/registrationSlice'

const inputStyle: React.CSSProperties = { padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: 8, width: '100%' }
const labelStyle: React.CSSProperties = { fontWeight: 600, fontSize: 14 }
const groupStyle: React.CSSProperties = { display: 'grid', gap: 8 }

const Registration: React.FC = () => {
  const [step, setStep] = useState(1)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const data = useAppSelector((s) => s.registration)

  const next = () => setStep(2)
  const back = () => setStep(1)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert(`Registered: ${JSON.stringify(data, null, 2)}`)
    dispatch(reset())
    navigate('/')
  }

  return (
    <main style={{ maxWidth: 720, margin: '24px auto', padding: '0 16px' }}>
      <h1 style={{ marginBottom: 16 }}>Registration</h1>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 16, background: '#fff', padding: 16, borderRadius: 12, boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        {step === 1 && (
          <section style={{ display: 'grid', gap: 12 }}>
            <h2 style={{ margin: 0 }}>Account Info</h2>
            <div style={groupStyle}>
              <label style={labelStyle} htmlFor="name">Name</label>
              <input id="name" value={data.account.name} onChange={(e) => dispatch(updateAccount({ name: e.target.value }))} style={inputStyle} required />
            </div>
            <div style={groupStyle}>
              <label style={labelStyle} htmlFor="email">Email</label>
              <input id="email" type="email" value={data.account.email} onChange={(e) => dispatch(updateAccount({ email: e.target.value }))} style={inputStyle} required />
            </div>
            <div style={groupStyle}>
              <label style={labelStyle} htmlFor="password">Password</label>
              <input id="password" type="password" value={data.account.password} onChange={(e) => dispatch(updateAccount({ password: e.target.value }))} style={inputStyle} required />
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
              <button type="button" onClick={next} style={{ background: '#111827', color: '#fff', border: 0, padding: '10px 14px', borderRadius: 8 }}>Next</button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section style={{ display: 'grid', gap: 12 }}>
            <h2 style={{ margin: 0 }}>Client Details</h2>
            <div style={groupStyle}>
              <label style={labelStyle} htmlFor="company">Company</label>
              <input id="company" value={data.client.company} onChange={(e) => dispatch(updateClient({ company: e.target.value }))} style={inputStyle} required />
            </div>
            <div style={groupStyle}>
              <label style={labelStyle} htmlFor="phone">Phone</label>
              <input id="phone" value={data.client.phone} onChange={(e) => dispatch(updateClient({ phone: e.target.value }))} style={inputStyle} required />
            </div>
            <div style={groupStyle}>
              <label style={labelStyle} htmlFor="address">Address</label>
              <input id="address" value={data.client.address} onChange={(e) => dispatch(updateClient({ address: e.target.value }))} style={inputStyle} required />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
              <button type="button" onClick={back} style={{ background: '#e5e7eb', color: '#111827', border: 0, padding: '10px 14px', borderRadius: 8 }}>Back</button>
              <button type="submit" style={{ background: '#111827', color: '#fff', border: 0, padding: '10px 14px', borderRadius: 8 }}>Submit</button>
            </div>
          </section>
        )}
      </form>
    </main>
  )
}

export default Registration
