export default function About() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">About Us</h1>
        <div className="space-y-6">
          <p>
            Welcome to ShippingCo, your trusted partner in logistics and package delivery. 
            Founded in 2010, we've grown from a small local courier to a nationwide 
            shipping solution provider.
          </p>
          <p>
            Our mission is to deliver your packages safely, quickly, and affordably. 
            With our state-of-the-art tracking system and dedicated team, you can 
            always trust us with your important shipments.
          </p>
          <h2 className="text-2xl font-semibold mt-8">Our Values</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Reliability - We deliver on our promises</li>
            <li>Transparency - Real-time tracking for all shipments</li>
            <li>Customer Service - Available 24/7 to assist you</li>
            <li>Innovation - Constantly improving our services</li>
          </ul>
        </div>
      </div>
    </div>
  );
}