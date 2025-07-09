'use client'
import { useEffect, useState } from 'react'
import { useAuth } from '@/components/AuthProvider'
import { useRouter } from 'next/navigation'

export default function AdminDashboard() {
  const { user } = useAuth()
  const router = useRouter()
  const [shipments, setShipments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user?.role !== 'admin') {
      router.push('/')
      return
    }
    
    const fetchShipments = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await fetch('/api/admin/shipments', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const data = await res.json()
        
        if (!res.ok) {
          throw new Error(data.error || 'Failed to fetch shipments')
        }
        
        setShipments(data.shipments)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    
    fetchShipments()
  }, [user, router])

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`/api/admin/shipments/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          status,
          location: 'Distribution Center',
          description: `Status updated to ${status}`
        })
      })
      
      const data = await res.json()
      
      if (!res.ok) {
        throw new Error(data.error || 'Failed to update status')
      }
      
      setShipments(prev => prev.map(shipment => 
        shipment._id === id ? data.shipment : shipment
      ))
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <div>Loading dashboard...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div className="admin-dashboard">
      <div className="container">
        <h1>Admin Dashboard</h1>
        
        <div className="stats">
          <div className="stat-card">
            <h3>Total Shipments</h3>
            <p>{shipments.length}</p>
          </div>
          <div className="stat-card">
            <h3>Pending</h3>
            <p>{shipments.filter(s => s.status === 'pending').length}</p>
          </div>
          <div className="stat-card">
            <h3>In Transit</h3>
            <p>{shipments.filter(s => s.status === 'in-transit').length}</p>
          </div>
          <div className="stat-card">
            <h3>Delivered</h3>
            <p>{shipments.filter(s => s.status === 'delivered').length}</p>
          </div>
        </div>
        
        <div className="shipments-table">
          <table>
            <thead>
              <tr>
                <th>Tracking #</th>
                <th>Sender</th>
                <th>Receiver</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map(shipment => (
                <tr key={shipment._id}>
                  <td>{shipment.trackingNumber}</td>
                  <td>{shipment.sender.name}</td>
                  <td>{shipment.receiver.name}</td>
                  <td>
                    <span className={`status-badge ${shipment.status}`}>
                      {shipment.status}
                    </span>
                  </td>
                  <td>
                    <select 
                      value={shipment.status}
                      onChange={(e) => updateStatus(shipment._id, e.target.value)}
                    >
                      <option value="pending">Pending</option>
                      <option value="processing">Processing</option>
                      <option value="in-transit">In Transit</option>
                      <option value="delivered">Delivered</option>
                    </select>
                    <button 
                      onClick={() => router.push(`/tracking/${shipment.trackingNumber}`)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}