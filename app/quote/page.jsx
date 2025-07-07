'use client';
import { useState } from 'react';

export default function Quote() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [weight, setWeight] = useState('');
  const [dimensions, setDimensions] = useState({ length: '', width: '', height: '' });
  const [quote, setQuote] = useState(null);

  const calculateQuote = (e) => {
    e.preventDefault();
    const basePrice = 10;
    const weightPrice = weight * 0.5;
    const distancePrice = 5;
    const total = basePrice + weightPrice + distancePrice;
    
    setQuote({
      from,
      to,
      weight,
      dimensions,
      price: total.toFixed(2),
      estimatedDelivery: '3-5 business days'
    });
  };

  return (
    <div className="section">
      <div className="container">
        <h1 className="section-title">Get a Shipping Quote</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="card">
            <div className="card-header">Enter Shipping Details</div>
            <form onSubmit={calculateQuote} className="card-body space-y-4">
              <div className="form-group">
                <label htmlFor="from" className="form-label">From (Zip/City)</label>
                <input 
                  type="text" 
                  id="from" 
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  className="form-input" 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="to" className="form-label">To (Zip/City)</label>
                <input 
                  type="text" 
                  id="to" 
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  className="form-input" 
                  required 
                />
              </div>
              <div className="form-group">
                <label htmlFor="weight" className="form-label">Weight (kg)</label>
                <input 
                  type="number" 
                  id="weight" 
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="form-input" 
                  required 
                />
              </div>
              <div className="form-group">
                <label className="form-label">Dimensions (cm)</label>
                <div className="grid grid-cols-3 gap-2">
                  <input 
                    type="number" 
                    placeholder="Length" 
                    value={dimensions.length}
                    onChange={(e) => setDimensions({...dimensions, length: e.target.value})}
                    className="form-input" 
                  />
                  <input 
                    type="number" 
                    placeholder="Width" 
                    value={dimensions.width}
                    onChange={(e) => setDimensions({...dimensions, width: e.target.value})}
                    className="form-input" 
                  />
                  <input 
                    type="number" 
                    placeholder="Height" 
                    value={dimensions.height}
                    onChange={(e) => setDimensions({...dimensions, height: e.target.value})}
                    className="form-input" 
                  />
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Calculate Quote
              </button>
            </form>
          </div>

          {quote && (
            <div className="card">
              <div className="card-header">Your Quote</div>
              <div className="card-body">
                <div className="space-y-3">
                  <p><span className="font-medium text-gray-700">From:</span> <span className="text-gray-600">{quote.from}</span></p>
                  <p><span className="font-medium text-gray-700">To:</span> <span className="text-gray-600">{quote.to}</span></p>
                  <p><span className="font-medium text-gray-700">Weight:</span> <span className="text-gray-600">{quote.weight} kg</span></p>
                  <p><span className="font-medium text-gray-700">Dimensions:</span> <span className="text-gray-600">{quote.dimensions.length}x{quote.dimensions.width}x{quote.dimensions.height} cm</span></p>
                  <div className="border-t pt-3 mt-3 border-gray-200">
                    <p className="text-lg"><span className="font-medium text-gray-700">Estimated Price:</span> <span className="text-gray-600">${quote.price}</span></p>
                    <p><span className="font-medium text-gray-700">Estimated Delivery:</span> <span className="text-gray-600">{quote.estimatedDelivery}</span></p>
                  </div>
                </div>
                <button className="btn btn-success mt-4">
                  Proceed to Ship
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}