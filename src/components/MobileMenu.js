import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-secondary-800 hover:text-cyan-600 transition-colors duration-300"
          aria-label="Toggle mobile menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile menu panel */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-4">
          <div className="flex justify-between items-center mb-8">
            <img
              src="/logo-color-final-001-transparent.png"
              alt="The Well EPC Logo"
              className="h-12 w-auto"
            />
            <button
              onClick={closeMenu}
              className="text-secondary-800 hover:text-cyan-600"
              aria-label="Close mobile menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="space-y-4">
            <Link
              to="/"
              onClick={closeMenu}
              className="block py-3 px-4 text-secondary-800 hover:bg-cyan-50 hover:text-cyan-600 rounded-lg transition-colors duration-300 font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={closeMenu}
              className="block py-3 px-4 text-secondary-800 hover:bg-cyan-50 hover:text-cyan-600 rounded-lg transition-colors duration-300 font-medium"
            >
              About
            </Link>
            <Link
              to="/services"
              onClick={closeMenu}
              className="block py-3 px-4 text-secondary-800 hover:bg-cyan-50 hover:text-cyan-600 rounded-lg transition-colors duration-300 font-medium"
            >
              Services
            </Link>
            <Link
              to="/ministries"
              onClick={closeMenu}
              className="block py-3 px-4 text-secondary-800 hover:bg-cyan-50 hover:text-cyan-600 rounded-lg transition-colors duration-300 font-medium"
            >
              Ministries
            </Link>
            <Link
              to="/events"
              onClick={closeMenu}
              className="block py-3 px-4 text-secondary-800 hover:bg-cyan-50 hover:text-cyan-600 rounded-lg transition-colors duration-300 font-medium"
            >
              Events
            </Link>
            <Link
              to="/community"
              onClick={closeMenu}
              className="block py-3 px-4 text-secondary-800 hover:bg-cyan-50 hover:text-cyan-600 rounded-lg transition-colors duration-300 font-medium"
            >
              Community
            </Link>
            <Link
              to="/prayer-requests"
              onClick={closeMenu}
              className="block py-3 px-4 text-secondary-800 hover:bg-cyan-50 hover:text-cyan-600 rounded-lg transition-colors duration-300 font-medium"
            >
              Prayer Requests
            </Link>
            <Link
              to="/contact"
              onClick={closeMenu}
              className="block py-3 px-4 text-secondary-800 hover:bg-cyan-50 hover:text-cyan-600 rounded-lg transition-colors duration-300 font-medium"
            >
              Contact
            </Link>
          </nav>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="text-sm text-secondary-600">
              <p className="font-medium mb-2">Service Times</p>
              <p>Sunday: 9:30 AM</p>
              <p className="mt-4 font-medium">Contact</p>
              <p>8 Canal St, Big Flats, NY</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileMenu;
