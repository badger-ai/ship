export default function About() {
  return (
    <main className="min-h-screen bg-white" role="main">
      <section className="section about-content">
        <h1 className="section-title">About Oma Air Flight ✈️</h1>
        <div className="space-y-6">
          <p style={{ '--animation-order': 1 }}>
            Welcome to Oma Air Flight, your trusted partner in logistics and package delivery.
            Founded in 2010, we've grown from a small local courier to a nationwide
            shipping solution provider.
          </p>
          <p style={{ '--animation-order': 2 }}>
            We are a fast, reliable, and globally connected air logistics company committed to
            delivering packages with speed, precision, and care. Whether you’re sending documents
            across borders, shipping goods for your business, or receiving items from abroad, we
            make air cargo feel effortless.
          </p>
          <p style={{ '--animation-order': 3 }}>
            Our mission is simple: to make international delivery as fast and easy as sending a text.
            With smart tracking systems, strategic airline partnerships, and 24/7 support,
            we’ve built a logistics experience that’s transparent, affordable, and world-class.
          </p>
          <p style={{ '--animation-order': 4 }}>
            We proudly serve individuals, businesses, and e-commerce brands with express air shipping,
            global delivery, cargo handling, customs support, and last-mile tracking — all powered
            by our commitment to excellence.
          </p>
          <p style={{ '--animation-order': 5 }}>
            Because at Oma Air Flight, we don’t just move packages —
            we connect lives, dreams, and opportunities across continents.
          </p>
          <h2 style={{ '--animation-order': 6 }} className="section-title">
            Our Values
          </h2>
          <ul style={{ '--animation-order': 7 }} className="list-disc pl-6 space-y-2">
            <li>Reliability - We deliver on our promises</li>
            <li>Transparency - Real-time tracking for all shipments</li>
            <li>Customer Service - Available 24/7 to assist you</li>
            <li>Innovation - Constantly improving our services</li>
          </ul>
        </div>
      </section>
    </main>
  );
}