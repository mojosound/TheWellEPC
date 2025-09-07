import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MobileMenu from './components/MobileMenu';

function Ministries() {
  const [ministries, setMinistries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadMinistries();
  }, []);

  const loadMinistries = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/ministries.php');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      // Filter only active ministries
      const activeMinistries = data.filter(ministry => ministry.is_active);

      setMinistries(activeMinistries);
      setError(null);
    } catch (err) {
      console.error('Error loading ministries:', err);
      setError('Failed to load ministries. Please try again later.');
      // Fallback to empty array if API fails
      setMinistries([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <img src="/logo-color-final-001-transparent.png" alt="The Well EPC Logo" className="h-20 w-auto cursor-pointer hover:scale-105 transition-transform duration-300" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} />
            <nav className="hidden md:flex space-x-8">
              <Link to="/" className="text-secondary-800 hover:text-cyan-600 font-medium transition-colors duration-300">Home</Link>
              <Link to="/about" className="text-secondary-800 hover:text-cyan-600 font-medium transition-colors duration-300">About</Link>
              <Link to="/services" className="text-secondary-800 hover:text-cyan-600 font-medium transition-colors duration-300">Services</Link>
              <Link to="/ministries" className="text-secondary-800 hover:text-cyan-600 font-medium transition-colors duration-300">Ministries</Link>
              <Link to="/events" className="text-secondary-800 hover:text-cyan-600 font-medium transition-colors duration-300">Events</Link>
              <Link to="/community" className="text-secondary-800 hover:text-cyan-600 font-medium transition-colors duration-300">Community</Link>
              <Link to="/prayer-requests" className="text-secondary-800 hover:text-cyan-600 font-medium transition-colors duration-300">Prayer</Link>
              <Link to="/contact" className="text-secondary-800 hover:text-cyan-600 font-medium transition-colors duration-300">Contact</Link>
            </nav>
            <MobileMenu />
          </div>
        </div>
      </header>

      {/* Ministries Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6">
            Our <span className="gold-accent">Ministries</span>
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Discover the many ways you can grow in faith, serve others, and build community
            through our diverse ministries and programs.
          </p>
        </div>
      </section>

      {/* Ministries Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
              <p className="mt-4 text-secondary-600">Loading ministries...</p>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="text-red-600 mb-4">
                <svg className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={loadMinistries}
                className="bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors duration-300"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {ministries.map((ministry) => (
                <div key={ministry.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                  <div className="p-6">
                    <div className="bg-cyan-100 p-3 rounded-full w-fit mb-4">
                      <svg className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-secondary-900 mb-3">{ministry.name}</h3>
                    <p className="text-secondary-600 mb-4 line-clamp-3">{ministry.description}</p>

                    <div className="space-y-2 text-sm text-secondary-500 mb-4">
                      <p><strong>Leader:</strong> {ministry.leader_name}</p>
                      <p><strong>Meeting:</strong> {ministry.meeting_schedule}</p>
                      <p><strong>Location:</strong> {ministry.meeting_location}</p>
                    </div>

                    <div className="flex flex-col space-y-2">
                      <button className="w-full bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors duration-300 text-sm">
                        Learn More
                      </button>
                      <button className="w-full border-2 border-cyan-600 text-cyan-600 px-4 py-2 rounded-lg hover:bg-cyan-50 transition-colors duration-300 text-sm">
                        Get Involved
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-amber-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-secondary-900 mb-6">Find Your Place to Serve</h2>
          <p className="text-xl text-secondary-600 mb-8">
            Every member of our congregation has unique gifts and talents.
            Discover how you can use yours to serve God and build His kingdom.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-cyan-600 text-white px-8 py-4 rounded-lg hover:bg-cyan-700 transition-colors duration-300 font-medium">
              Take Spiritual Gifts Assessment
            </button>
            <button className="border-2 border-cyan-600 text-cyan-600 px-8 py-4 rounded-lg hover:bg-cyan-50 transition-colors duration-300 font-medium">
              Contact Ministry Leaders
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <img src="/logo-color-final-001-transparent.png" alt="The Well EPC Logo" className="h-16 w-auto mb-4" />
              <p className="text-secondary-300">
                A welcoming community where faith comes alive through worship, fellowship, and service.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Service Times</h3>
              <p className="text-secondary-300">
                Sunday Worship: 9:30 AM<br />
                Small Groups: Following service
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
              <p className="text-secondary-300">
                8 Canal St, Big Flats, NY<br />
                Pastor Adam Hungerford
              </p>
            </div>
          </div>
          <div className="border-t border-secondary-700 mt-8 pt-8 text-center">
            <p className="text-secondary-400">
              © 2025 The Well EPC. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Ministries;
