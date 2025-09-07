import React from 'react';
import { Link } from 'react-router-dom';
import MobileMenu from './components/MobileMenu';

function Services() {
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

      {/* Services Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6">
            Worship <span className="gold-accent">Services</span>
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Join us for meaningful worship, fellowship, and spiritual growth every Sunday morning.
          </p>
        </div>
      </section>

      {/* Main Service Information */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-secondary-900 mb-6">Sunday Worship Service</h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="bg-cyan-100 p-3 rounded-full">
                    <svg className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900">Service Time</h3>
                    <p className="text-secondary-600">9:30 AM every Sunday</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="bg-cyan-100 p-3 rounded-full">
                    <svg className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900">Location</h3>
                    <p className="text-secondary-600">8 Canal St, Big Flats, NY</p>
                  </div>
                </div>
              </div>
              <div className="bg-amber-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-secondary-900 mb-3">What to Expect</h3>
                <ul className="space-y-2 text-secondary-600">
                  <li>• Contemporary worship with traditional hymns</li>
                  <li>• Inspiring message from Pastor Adam Hungerford</li>
                  <li>• Warm welcome for visitors and newcomers</li>
                  <li>• Nursery and children's programs available</li>
                  <li>• Fellowship time following the service</li>
                </ul>
              </div>
            </div>
            <div className="relative">
              <img
                src="/church.jpg"
                alt="The Well EPC Sanctuary"
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Small Groups Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Small Groups</h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Following our Sunday service, we gather in small groups for deeper fellowship,
              Bible study, and community building.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-cyan-100 p-3 rounded-full w-fit mb-4">
                <svg className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">Community & Fellowship</h3>
              <p className="text-secondary-600 mb-4">
                Connect with others in meaningful relationships and grow together in faith.
              </p>
              <p className="text-sm text-secondary-500">
                Meets immediately following the service in various locations around the church.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-cyan-100 p-3 rounded-full w-fit mb-4">
                <svg className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">Bible Study</h3>
              <p className="text-secondary-600 mb-4">
                Dive deeper into God's Word through guided study and discussion.
              </p>
              <p className="text-sm text-secondary-500">
                Various Bible study groups available for different ages and interests.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="bg-cyan-100 p-3 rounded-full w-fit mb-4">
                <svg className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">Prayer & Support</h3>
              <p className="text-secondary-600 mb-4">
                Share prayer requests and support one another through life's challenges.
              </p>
              <p className="text-sm text-secondary-500">
                A safe space for sharing burdens and celebrating joys together.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Online Giving Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-secondary-900 mb-6">Support Our Ministry</h2>
          <p className="text-xl text-secondary-600 mb-8">
            Your generous giving helps us continue our mission to share God's love
            and serve our community.
          </p>
          <div className="bg-amber-50 p-8 rounded-lg">
            <h3 className="text-xl font-semibold text-secondary-900 mb-4">Online Giving</h3>
            <p className="text-secondary-600 mb-6">
              Secure online giving options will be available soon. In the meantime,
              you can give during our Sunday services or contact the church office.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors duration-300">
                Give Online (Coming Soon)
              </button>
              <button className="border-2 border-cyan-600 text-cyan-600 px-6 py-3 rounded-lg hover:bg-cyan-50 transition-colors duration-300">
                Contact Office
              </button>
            </div>
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

export default Services;
