import React from 'react';
import { Link } from 'react-router-dom';
import MobileMenu from './components/MobileMenu';

function Community() {
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

      {/* Community Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6">
            Community <span className="gold-accent">Outreach</span>
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Serving our neighbors and making a difference in our community through
            compassion, action, and partnership. Together, we can create positive change.
          </p>
        </div>
      </section>

      {/* Current Initiatives */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Current Initiatives</h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Discover the ways we're actively serving and supporting our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6">
                <div className="bg-white bg-opacity-20 p-3 rounded-full w-fit">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">Food Pantry Support</h3>
                <p className="text-secondary-600 mb-4">
                  Partnering with local food banks to provide nutritious meals and groceries
                  to families in need throughout Big Flats and surrounding communities.
                </p>
                <div className="space-y-2 text-sm text-secondary-500">
                  <p><strong>Impact:</strong> Served 200+ families monthly</p>
                  <p><strong>Next Collection:</strong> Every 2nd Saturday</p>
                </div>
                <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300">
                  Learn More
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-6">
                <div className="bg-white bg-opacity-20 p-3 rounded-full w-fit">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">Senior Care Ministry</h3>
                <p className="text-secondary-600 mb-4">
                  Providing companionship, transportation, and support services to elderly
                  members of our community who may feel isolated or need assistance.
                </p>
                <div className="space-y-2 text-sm text-secondary-500">
                  <p><strong>Services:</strong> Transportation, visits, errands</p>
                  <p><strong>Volunteers:</strong> 15 active caregivers</p>
                </div>
                <button className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-300">
                  Get Involved
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6">
                <div className="bg-white bg-opacity-20 p-3 rounded-full w-fit">
                  <svg className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-secondary-900 mb-3">Youth Mentorship</h3>
                <p className="text-secondary-600 mb-4">
                  Connecting caring adults with young people to provide guidance, support,
                  and positive role models in their journey toward adulthood.
                </p>
                <div className="space-y-2 text-sm text-secondary-500">
                  <p><strong>Age Groups:</strong> Elementary through high school</p>
                  <p><strong>Mentor Pairs:</strong> 25 active relationships</p>
                </div>
                <button className="mt-4 w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-300">
                  Become a Mentor
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Impact Stories</h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Real stories of transformation and hope from the lives we've touched
              through our community outreach efforts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-cyan-100 p-2 rounded-full">
                  <svg className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold text-secondary-900">Maria Rodriguez</h3>
                  <p className="text-sm text-secondary-600">Food Pantry Recipient</p>
                </div>
              </div>
              <blockquote className="text-secondary-700 italic mb-4">
                "When I lost my job, I didn't know how I'd feed my children. The church's food pantry
                didn't just give us groceries—they gave us hope and connected us with resources
                that helped us get back on our feet. This community truly cares."
              </blockquote>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="bg-cyan-100 p-2 rounded-full">
                  <svg className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="font-semibold text-secondary-900">Robert Chen</h3>
                  <p className="text-sm text-secondary-600">Youth Mentor</p>
                </div>
              </div>
              <blockquote className="text-secondary-700 italic mb-4">
                "Being a mentor has been one of the most rewarding experiences of my life.
                Watching my mentee grow in confidence and discover their potential has reminded
                me why community and relationships matter so much."
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Opportunities */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Partnership Opportunities</h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              We believe in the power of collaboration. Join us in making a difference
              through strategic partnerships with local organizations and businesses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg className="h-8 w-8 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">Local Schools</h3>
              <p className="text-secondary-600">
                Partner with schools for tutoring programs, after-school activities,
                and student mentorship opportunities.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">Healthcare Partners</h3>
              <p className="text-secondary-600">
                Collaborate with local healthcare providers to support wellness
                programs and health education initiatives.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-3">Business Community</h3>
              <p className="text-secondary-600">
                Work with local businesses to create job training programs,
                financial literacy workshops, and community development projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-amber-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-secondary-900 mb-6">Join Our Mission</h2>
          <p className="text-xl text-secondary-600 mb-8">
            Your time, talents, and resources can make a real difference in our community.
            Discover how you can be part of creating positive change.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-cyan-600 text-white px-8 py-4 rounded-lg hover:bg-cyan-700 transition-colors duration-300 font-medium"
            >
              Get Involved Today
            </Link>
            <Link
              to="/ministries"
              className="border-2 border-cyan-600 text-cyan-600 px-8 py-4 rounded-lg hover:bg-cyan-50 transition-colors duration-300 font-medium"
            >
              Explore Opportunities
            </Link>
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

export default Community;
