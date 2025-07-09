import Link from 'next/link'
import Image from 'next/image'

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Fast & Reliable Shipping Solutions</h1>
          <p className="hero-subtitle">Track, send, and manage your packages with our state-of-the-art shipping platform</p>
          <div className="hero-buttons">
            <Link href="/send" className="btn btn-primary">Send a Package</Link>
            <Link href="/track" className="btn btn-secondary">Track Your Order</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2>Why Choose Oma-Airflight?</h2>
            <p>We provide the best shipping experience with our innovative solutions</p>
          </div>
          
          <div className="features-grid">
            {[
              {
                icon: '🚚',
                title: 'Fast Delivery',
                description: 'Guaranteed on-time shipments with our optimized delivery network'
              },
              {
                icon: '📍',
                title: 'Real-Time Tracking',
                description: 'Know exactly where your package is at all times with live updates'
              },
              {
                icon: '💰',
                title: 'Affordable Prices',
                description: 'Competitive rates without compromising on service quality'
              }
            ].map((feature, index) => (
              <div key={index} className="card feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <div className="section-title">
            <h2>Ready to Ship?</h2>
            <p>Get an instant quote and see how much you can save with Oma-Airflight</p>
            <Link href="/quote" className="btn btn-primary btn-lg">Get a Free Quote</Link>
          </div>
        </div>
      </section>
    </>
  )
}