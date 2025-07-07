'use client'
import { useState } from 'react'
import Link from 'next/link'
import { FaShippingFast } from 'react-icons/fa'
import { useAuth } from '@/components/AuthProvider'

export default function Navbar() {
  const { user, logout } = useAuth()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <nav className="navbar shadow-soft">
      <div className="container nav-container">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="nav-brand">
              <FaShippingFast className="h-8 w-8 text-primary mr-2" />
              <span className="gradient-text">SwiftShip</span>
            </Link>
          </div>
          {/* Desktop Menu */}
          <div className="desktop-nav hidden md:flex items-center space-x-8">
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/track" className="nav-link">Track</Link>
            <Link href="/send" className="nav-link">Send</Link>
            <Link href="/blog" className="nav-link">Blog</Link>
            <Link href="/contact" className="nav-link">Contact</Link>
            {user ? (
              <>
                <span className="text-gray-700 font-lora font-semibold text-base">Welcome, {user.name}</span>
                <button onClick={logout} className="nav-link">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="nav-link">Login</Link>
                <Link href="/signup" className="nav-link">Signup</Link>
              </>
            )}
            <Link href="/quote" className="btn-primary">
              Get Quote
            </Link>
          </div>
          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className={`nav-toggle ${isMenuOpen ? 'active' : ''}`}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        <div className={`nav-links md:hidden ${isMenuOpen ? 'mobile-active' : ''}`}>
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/track" className="nav-link">Track</Link>
          <Link href="/send" className="nav-link">Send</Link>
          <Link href="/blog" className="nav-link">Blog</Link>
          <Link href="/contact" className="nav-link">Contact</Link>
          {user ? (
            <>
              <span className="user-greeting">Welcome, {user.name}</span>
              <button onClick={logout} className="nav-link">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="nav-link">Login</Link>
              <Link href="/signup" className="nav-link">Signup</Link>
            </>
          )}
          <Link href="/quote" className="btn-primary">
            Get Quote
          </Link>
        </div>
      </div>
    </nav>
  )
}