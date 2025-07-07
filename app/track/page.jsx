'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function TrackPackage() {
  const [trackingNumber, setTrackingNumber] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number')
      return
    }
    router.push(`/tracking/${trackingNumber}`)
  }

  return (
    <section className="section">
      <div className="container">
        <div className="card track-form">
          <div className="card-header">
            <h1>Track Your Package</h1>
          </div>
          <div className="card-body">
            {error && <div className="alert alert-error">{error}</div>}
            
            <form onSubmit={handleSubmit} className="form-group">
              <label className="form-label" htmlFor="trackingNumber">Tracking Number</label>
              <input
                type="text"
                id="trackingNumber"
                value={trackingNumber}
                onChange={(e) => {
                  setTrackingNumber(e.target.value)
                  setError('')
                }}
                placeholder="Enter your tracking number"
                className="form-input"
                required
              />
              <div className="form-actions">
                <button type="submit" className="btn btn-primary btn-block">Track Package</button>
              </div>
            </form>
            
            <div className="track-help">
              <p>Don't have a tracking number?</p>
              <Link href="/contact" className="btn btn-secondary">Contact Customer Support</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}