'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';

export default function SendPackage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    sender: {
      name: user?.name || '',
      address: '',
      email: user?.email || '',
      phone: '',
    },
    receiver: {
      name: '',
      address: '',
      email: '',
      phone: '',
    },
    package: {
      description: '',
      weight: '',
      dimensions: { length: '', width: '', height: '' },
      value: '',
    },
  });

  useEffect(() => {
    if (!loading && !user) {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token, redirecting to login');
        setError('Please log in to send a package');
        router.push('/login');
        return;
      }
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => res.json())
        .then((data) => {
          if (!data.success) {
            console.error('Invalid token, redirecting to login:', data.error);
            localStorage.removeItem('token');
            setError('Session expired. Please log in again.');
            router.push('/login');
          }
        })
        .catch((err) => {
          console.error('Error validating token:', err);
          localStorage.removeItem('token');
          setError('Session error. Please log in again.');
          router.push('/login');
        });
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        sender: {
          ...prev.sender,
          name: user.name || prev.sender.name,
          email: user.email || prev.sender.email,
        },
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue =
      name.startsWith('dimensions.') || name === 'package.weight' || name === 'package.value'
        ? value === '' ? '' : parseFloat(value) || ''
        : value;

    setFormData((prev) => {
      if (name.startsWith('sender.') || name.startsWith('receiver.')) {
        const [parent, child] = name.split('.');
        return {
          ...prev,
          [parent]: {
            ...prev[parent],
            [child]: parsedValue,
          },
        };
      } else if (name.startsWith('package.')) {
        const [, child] = name.split('.');
        return {
          ...prev,
          package: {
            ...prev.package,
            [child]: parsedValue,
          },
        };
      } else if (name.startsWith('dimensions.')) {
        const dim = name.split('.')[1];
        return {
          ...prev,
          package: {
            ...prev.package,
            dimensions: {
              ...prev.package.dimensions,
              [dim]: parsedValue,
            },
          },
        };
      }
      return prev;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found. Please log in.');
      }
      const res = await fetch('/api/shipments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create shipment');
      }

      router.push(`/tracking/${data.trackingNumber}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-white">Loading...</div>;
  }

  if (!user) {
    return null; // Redirecting to /login
  }

  return (
    <section className="section">
      <div className="container">
        <div className="card form-container">
          <div className="card-header">
            <h1>Send a Package</h1>
          </div>
          <div className="card-body">
            {error && <div className="alert alert-error">{error}</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-section">
                <h2>Sender Information</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="sender-name">Full Name</label>
                    <input
                      type="text"
                      id="sender-name"
                      name="sender.name"
                      value={formData.sender.name}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="sender-address">Address</label>
                    <input
                      type="text"
                      id="sender-address"
                      name="sender.address"
                      value={formData.sender.address}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="sender-email">Email</label>
                    <input
                      type="email"
                      id="sender-email"
                      name="sender.email"
                      value={formData.sender.email}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="sender-phone">Phone</label>
                    <input
                      type="tel"
                      id="sender-phone"
                      name="sender.phone"
                      value={formData.sender.phone}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="form-section">
                <h2>Receiver Information</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="receiver-name">Full Name</label>
                    <input
                      type="text"
                      id="receiver-name"
                      name="receiver.name"
                      value={formData.receiver.name}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="receiver-address">Address</label>
                    <input
                      type="text"
                      id="receiver-address"
                      name="receiver.address"
                      value={formData.receiver.address}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="receiver-email">Email</label>
                    <input
                      type="email"
                      id="receiver-email"
                      name="receiver.email"
                      value={formData.receiver.email}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="receiver-phone">Phone</label>
                    <input
                      type="tel"
                      id="receiver-phone"
                      name="receiver.phone"
                      value={formData.receiver.phone}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="form-section">
                <h2>Package Details</h2>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label" htmlFor="package-description">Description</label>
                    <input
                      type="text"
                      id="package-description"
                      name="package.description"
                      value={formData.package.description}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="package-weight">Weight (kg)</label>
                    <input
                      type="number"
                      id="package-weight"
                      name="package.weight"
                      value={formData.package.weight}
                      onChange={handleChange}
                      className="form-input"
                      min="0"
                      step="0.1"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="dimensions-length">Dimensions (cm)</label>
                    <div className="dimensions-grid">
                      <input
                        type="number"
                        id="dimensions-length"
                        placeholder="Length"
                        name="dimensions.length"
                        value={formData.package.dimensions.length}
                        onChange={handleChange}
                        className="form-input"
                        min="0"
                        step="0.1"
                        required
                      />
                      <input
                        type="number"
                        id="dimensions-width"
                        placeholder="Width"
                        name="dimensions.width"
                        value={formData.package.dimensions.width}
                        onChange={handleChange}
                        className="form-input"
                        min="0"
                        step="0.1"
                        required
                      />
                      <input
                        type="number"
                        id="dimensions-height"
                        placeholder="Height"
                        name="dimensions.height"
                        value={formData.package.dimensions.height}
                        onChange={handleChange}
                        className="form-input"
                        min="0"
                        step="0.1"
                        required
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label" htmlFor="package-value">Declared Value ($)</label>
                    <input
                      type="number"
                      id="package-value"
                      name="package.value"
                      value={formData.package.value}
                      onChange={handleChange}
                      className="form-input"
                      min="0"
                      step="0.1"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="form-actions">
                <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
                  {isSubmitting ? 'Processing...' : 'Ship Package'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}