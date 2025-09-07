import React from 'react';
import { Link } from 'react-router-dom';
import MobileMenu from './components/MobileMenu';

function About() {
  return (
    <div className="min-h-screen bg-amber-50">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <img src="/logo-color-final-001-transparent.png" alt="The Well EPC Logo" className="h-20 w-auto cursor-pointer hover:scale-105 transition-transform duration-300" />
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

      {/* About Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6">
            About <span className="gold-accent">The Well</span>
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            A welcoming community where faith comes alive through worship, fellowship, and service to our neighbors.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-secondary-900 mb-6">Our Mission</h2>
                <p className="text-2xl text-cyan-600 font-semibold italic text-center leading-relaxed">
                  "Called by Christ. Called to Worship. Called to Serve."
                </p>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-secondary-900 mb-6">Our Vision</h2>
                <p className="text-lg text-secondary-600 leading-relaxed">
                  As a church we desire to know the Lord through prayer, scripture, education and
                  worship and to show His love through ministry, service, and fellowship. We will show
                  His love to Big Flats and surrounding communities. We will continue to support our
                  mission partners in our area and throughout the world.
                </p>
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-secondary-900 mb-6">Core Values</h2>
                <ul className="space-y-6">
                  <li className="flex items-start">
                    <span className="text-accent-gold mr-3 text-xl">•</span>
                    <div>
                      <strong className="text-cyan-600">"The Essentials" of the Evangelical Presbyterian Church (EPC)</strong>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-accent-gold mr-3 text-xl">•</span>
                    <div>
                      <strong className="text-cyan-600">"In Essentials: Unity; In Non-Essentials: Liberty; In All Things: Charity."</strong>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">Our Leadership</h2>
            <p className="text-lg text-secondary-600">Meet the dedicated team serving our congregation</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <div className="text-6xl mb-4">👨‍⚖️</div>
              <h3 className="text-xl font-bold text-secondary-900 mb-2">Pastor Adam Hungerford</h3>
              <p className="text-cyan-600 font-medium mb-4">Senior Pastor</p>
              <p className="text-secondary-600">Leading our congregation with wisdom, compassion, and dedication to God's Word.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <div className="text-6xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-secondary-900 mb-2">Church Elders</h3>
              <p className="text-cyan-600 font-medium mb-4">Leadership Team</p>
              <p className="text-secondary-600">Guiding our church with spiritual wisdom and pastoral care for our community.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <div className="text-6xl mb-4">🤝</div>
              <h3 className="text-xl font-bold text-secondary-900 mb-2">Ministry Leaders</h3>
              <p className="text-cyan-600 font-medium mb-4">Volunteer Team</p>
              <p className="text-secondary-600">Dedicated volunteers serving in various ministries throughout our church.</p>
            </div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-secondary-900 mb-6">Our History</h2>
              <div className="space-y-4 text-secondary-600 leading-relaxed">
                <p>
                  The Well Evangelical Presbyterian Church was founded with a vision to create a welcoming
                  community where people could grow in their faith and serve others. Located in the heart
                  of Big Flats, NY, we've been serving our community for years.
                </p>
                <p>
                  Our congregation is part of the Evangelical Presbyterian Church denomination, committed
                  to biblical teaching, authentic worship, and meaningful outreach. We believe in creating
                  a place where everyone feels valued and can discover their purpose in God's plan.
                </p>
                <p>
                  From our humble beginnings, we've grown into a vibrant community that impacts lives
                  through worship, fellowship, and service. Our commitment to our community and our faith
                  continues to guide us as we move forward together.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/church.jpg"
                alt="The Well EPC Church Building"
                className="rounded-xl shadow-lg w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary-500 to-primary-700 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-6">Join Our Community</h2>
          <p className="text-xl text-gray-200 mb-8">
            Discover what it means to be part of The Well family. We'd love to welcome you!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/services" className="bg-white text-primary-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
              Our Services
            </Link>
            <Link to="/contact" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105">
              Get In Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
