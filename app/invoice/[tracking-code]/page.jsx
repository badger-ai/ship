import { notFound } from 'next/navigation';

export default function InvoicePage({ params }) {
  const trackingNumber = params['tracking-code'];
  
  // Mock data - in a real app this would come from your database
  const invoiceData = {
    trackingNumber,
    invoiceNumber: `INV-${trackingNumber.slice(0, 6)}`,
    date: new Date().toLocaleDateString(),
    sender: {
      name: 'John Smith',
      address: '123 Main St, New York, NY 10001',
      phone: '+1 555 123 4567'
    },
    receiver: {
      name: 'Sarah Johnson',
      address: '456 Oak Ave, Los Angeles, CA 90001',
      phone: '+1 555 987 6543'
    },
    packageDetails: {
      description: 'Electronics',
      weight: '2.5 kg',
      dimensions: '30x20x15 cm',
      value: '$250'
    },
    charges: [
      { description: 'Shipping Fee', amount: 15.00 },
      { description: 'Insurance', amount: 5.00 },
      { description: 'Fuel Surcharge', amount: 2.50 }
    ],
    paymentMethod: 'Credit Card',
    paymentStatus: 'Paid'
  };

  if (!invoiceData) {
    return notFound();
  }

  const subtotal = invoiceData.charges.reduce((sum, charge) => sum + charge.amount, 0);
  const tax = subtotal * 0.1; // 10% tax for example
  const total = subtotal + tax;

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-bold">Shipping Invoice</h1>
            <p className="text-gray-600">Invoice #: {invoiceData.invoiceNumber}</p>
          </div>
          <div className="text-right">
            <p className="font-medium">Tracking Number</p>
            <p className="text-blue-500 font-bold">{invoiceData.trackingNumber}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h2 className="text-lg font-semibold mb-2">Sender</h2>
            <p>{invoiceData.sender.name}</p>
            <p className="text-gray-600">{invoiceData.sender.address}</p>
            <p className="text-gray-600">{invoiceData.sender.phone}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Receiver</h2>
            <p>{invoiceData.receiver.name}</p>
            <p className="text-gray-600">{invoiceData.receiver.address}</p>
            <p className="text-gray-600">{invoiceData.receiver.phone}</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-2">Package Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-gray-600">Description</p>
              <p>{invoiceData.packageDetails.description}</p>
            </div>
            <div>
              <p className="text-gray-600">Weight</p>
              <p>{invoiceData.packageDetails.weight}</p>
            </div>
            <div>
              <p className="text-gray-600">Dimensions</p>
              <p>{invoiceData.packageDetails.dimensions}</p>
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold mb-4">Charges</h2>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left pb-2">Description</th>
                <th className="text-right pb-2">Amount</th>
              </tr>
            </thead>
            <tbody>
              {invoiceData.charges.map((charge, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3">{charge.description}</td>
                  <td className="text-right py-3">${charge.amount.toFixed(2)}</td>
                </tr>
              ))}
              <tr className="border-b">
                <td className="py-3 font-medium">Subtotal</td>
                <td className="text-right py-3">${subtotal.toFixed(2)}</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 font-medium">Tax (10%)</td>
                <td className="text-right py-3">${tax.toFixed(2)}</td>
              </tr>
              <tr className="font-bold text-lg">
                <td className="pt-3">Total</td>
                <td className="text-right pt-3">${total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-semibold mb-2">Payment Method</h2>
            <p>{invoiceData.paymentMethod}</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Payment Status</h2>
            <p className={`font-medium ${invoiceData.paymentStatus === 'Paid' ? 'text-green-500' : 'text-red-500'}`}>
              {invoiceData.paymentStatus}
            </p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-200 text-center">
          <p className="text-gray-600">Thank you for using our shipping services!</p>
          <button 
            onClick={() => window.print()}
            className="mt-4 bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
          >
            Print Invoice
          </button>
        </div>
      </div>
    </div>
  );
}