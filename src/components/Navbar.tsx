'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="text-xl font-bold bg-gradient-to-r from-purple-600 to-orange-500 bg-clip-text text-transparent">
              QuantumForms
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#features" className="text-gray-600 hover:text-blue-600">
              Features
            </Link>
            <Link href="#how-it-works" className="text-gray-600 hover:text-blue-600">
              How It Works
            </Link>
            <Link href="#faq" className="text-gray-600 hover:text-blue-600">
              FAQ
            </Link>
            <button className="bg-gradient-to-r from-purple-500 to-orange-500 text-white px-6 py-2 rounded-full hover:from-purple-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg">
              Join Waitlist
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Menu icon */}
              {!isMenuOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-b border-gray-200">
          <Link
            href="#features"
            className="block px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50"
          >
            Features
          </Link>
          <Link
            href="#how-it-works"
            className="block px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50"
          >
            How It Works
          </Link>
          <Link
            href="#faq"
            className="block px-3 py-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-50"
          >
            FAQ
          </Link>
          <button className="w-full mt-2 bg-gradient-to-r from-purple-500 to-orange-500 text-white px-4 py-2 rounded-full hover:from-purple-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg">
            Join Waitlist
          </button>
        </div>
      </div>
    </nav>
  );
}
