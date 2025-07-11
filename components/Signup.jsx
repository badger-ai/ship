'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { setUser } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email: email.trim(), password }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Signup failed');
      }
      localStorage.setItem('token', data.token);
      setUser(data.user);
      setTimeout(() => router.push('/'), 2000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <section className="section">
        <div className="section-title">
          <h1>Sign Up</h1>
        </div>
        <form onSubmit={handleSubmit} className="form-container">
          {error && <div className="alert alert-error">{error}</div>}
          <div className="form-group">
            <label htmlFor="name" className="form-label">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
            />
          </div>
          <div className="form-actions">
            <button type="submit" className="btn btn-primary btn-lg">Sign Up</button>
          </div>
        </form>
      </section>
    </main>
  );
}