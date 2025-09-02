import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
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
              <Link to="/contact" className="text-secondary-800 hover:text-cyan-600 font-medium transition-colors duration-300">Contact</Link>
            </nav>
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button className="text-secondary-800 hover:text-cyan-600">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-screen bg-cover bg-center bg-no-repeat pt-20" style={{backgroundImage: `url('/church.jpg')`}}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 flex items-center justify-center h-full px-4 sm:px-6 lg:px-8">
          <div className="text-center text-white max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Welcome to The Well!
            </h1>
            <p className="text-xl sm:text-2xl mb-8 text-gray-200">
              A Local Congregation of the EPC
            </p>
          </div>
        </div>
      </section>

      {/* About The Well */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              About <span className="gold-accent">The Well</span>
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              The Well is a vibrant community where faith comes alive through outreach, worship, discipleship, and service to our neighbors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* A Place of Worship */}
            <div className="bg-gradient-to-br from-white to-amber-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 accent-border">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">🙏</div>
                <h3 className="text-2xl font-bold text-cyan-600 mb-2">A Place of Worship</h3>
                <div className="w-16 h-1 bg-accent-gold mx-auto rounded-full"></div>
              </div>
              <ul className="space-y-3 text-secondary-700">
                <li className="flex items-start">
                  <span className="text-accent-gold mr-2">•</span>
                  <span>Sunday Worship Service at 9:30 AM</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-gold mr-2">•</span>
                  <span>Traditional and Contemporary Worship</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-gold mr-2">•</span>
                  <span>Scripture-based Teaching and Preaching</span>
                </li>
              </ul>
            </div>

            {/* A Place of Fellowship */}
            <div className="bg-gradient-to-br from-white to-amber-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 accent-border">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-2xl font-bold text-cyan-600 mb-2">A Place of Fellowship</h3>
                <div className="w-16 h-1 bg-accent-gold mx-auto rounded-full"></div>
              </div>
              <ul className="space-y-3 text-secondary-700">
                <li className="flex items-start">
                  <span className="text-accent-gold mr-2">•</span>
                  <span>Small Groups and Bible Studies for community and care</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-gold mr-2">•</span>
                  <span>Fellowship meals and social gatherings</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-gold mr-2">•</span>
                  <span>Youth and children's programs</span>
                </li>
              </ul>
            </div>

            {/* A Place of Receiving */}
            <div className="bg-gradient-to-br from-white to-amber-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 accent-border">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">🤝</div>
                <h3 className="text-2xl font-bold text-cyan-600 mb-2">A Place of Receiving</h3>
                <div className="w-16 h-1 bg-accent-gold mx-auto rounded-full"></div>
              </div>
              <ul className="space-y-3 text-secondary-700">
                <li className="flex items-start">
                  <span className="text-accent-gold mr-2">•</span>
                  <span><strong className="text-cyan-600">Outreach and Evangelism</strong></span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-gold mr-2">•</span>
                  <span>Making the building available for community needs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-gold mr-2">•</span>
                  <span>Engaging the community through additional needs-based ministries</span>
                </li>
              </ul>
            </div>

            {/* A Place of Community */}
            <div className="bg-gradient-to-br from-white to-amber-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 accent-border">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">🙏</div>
                <h3 className="text-2xl font-bold text-cyan-600 mb-2">A Place of Community</h3>
                <div className="w-16 h-1 bg-accent-gold mx-auto rounded-full"></div>
              </div>
              <ul className="space-y-3 text-secondary-700">
                <li className="flex items-start">
                  <span className="text-accent-gold mr-2">•</span>
                  <span><strong className="text-cyan-600">Worship</strong> - Gathering together in praise and adoration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-gold mr-2">•</span>
                  <span>Fellowship through meals, service, and fun activities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-gold mr-2">•</span>
                  <span>Collaboration with other area churches</span>
                </li>
              </ul>
            </div>

            {/* A Place of Discipleship */}
            <div className="bg-gradient-to-br from-white to-amber-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 accent-border">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">📖</div>
                <h3 className="text-2xl font-bold text-cyan-600 mb-2">A Place of Discipleship</h3>
                <div className="w-16 h-1 bg-accent-gold mx-auto rounded-full"></div>
              </div>
              <ul className="space-y-3 text-secondary-700">
                <li className="flex items-start">
                  <span className="text-accent-gold mr-2">•</span>
                  <span><strong className="text-cyan-600">Discipleship And Education</strong> - Growing together in faith and knowledge</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-gold mr-2">•</span>
                  <span>Prayer and faithful teaching of Scripture</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-gold mr-2">•</span>
                  <span>Small Groups and Bible Studies for community and care</span>
                </li>
              </ul>
            </div>

            {/* A Place of Sending */}
            <div className="bg-gradient-to-br from-white to-amber-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 accent-border">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold text-cyan-600 mb-2">A Place of Sending</h3>
                <div className="w-16 h-1 bg-accent-gold mx-auto rounded-full"></div>
              </div>
              <ul className="space-y-3 text-secondary-700">
                <li className="flex items-start">
                  <span className="text-accent-gold mr-2">•</span>
                  <span><strong className="text-cyan-600">Missions</strong> - Supporting cross-cultural ministry</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-gold mr-2">•</span>
                  <span>Developing and sending ministers into various forms of service</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-gold mr-2">•</span>
                  <span>Inviting others to experience Christ and the church</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center">
            <Link to="/about" className="btn-primary">
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Our <span className="gold-accent">Services</span>
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Join us for worship and fellowship at our regularly scheduled services
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white to-amber-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100" style={{borderLeft: '4px solid var(--accent-teal)'}}>
              <h3 className="text-xl font-semibold text-primary-600 mb-4">
                <span className="teal-accent">Sunday Worship Service</span>
              </h3>
              <p className="text-secondary-600 mb-2">Every Sunday at 9:30 AM</p>
              <p className="text-secondary-500 mb-6">Traditional worship with contemporary elements</p>
              <button className="btn-primary">
                Learn More
              </button>
            </div>

            <div className="bg-gradient-to-br from-white to-amber-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100" style={{borderLeft: '4px solid var(--accent-teal)'}}>
              <h3 className="text-xl font-semibold text-primary-600 mb-4">
                <span className="teal-accent">Sunday School</span>
              </h3>
              <p className="text-secondary-600 mb-2">Every Sunday at 11:00 AM</p>
              <p className="text-secondary-500 mb-6">Bible study and fellowship for all ages</p>
              <button className="btn-primary">
                Learn More
              </button>
            </div>

            <div className="bg-gradient-to-br from-white to-amber-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100" style={{borderLeft: '4px solid var(--accent-teal)'}}>
              <h3 className="text-xl font-semibold text-primary-600 mb-4">
                <span className="teal-accent">Midweek Prayer & Bible Study</span>
              </h3>
              <p className="text-secondary-600 mb-2">Every Wednesday at 7:00 PM</p>
              <p className="text-secondary-500 mb-6">Community prayer and Bible study</p>
              <button className="btn-primary">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Ministries Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary-900 mb-4">
              Our <span className="gold-accent">Ministries</span>
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              Discover the various ways you can get involved and serve in our community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-white to-amber-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100" style={{borderLeft: '4px solid var(--accent-teal)'}}>
              <h3 className="text-xl font-semibold text-primary-600 mb-4">
                <span className="teal-accent">Children's Ministry</span>
              </h3>
              <p className="text-secondary-600 mb-2">Ages 3-12</p>
              <p className="text-secondary-500 mb-6">Fun, faith-based activities for our youngest members</p>
              <button className="btn-primary">
                Learn More
              </button>
            </div>

            <div className="bg-gradient-to-br from-white to-amber-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100" style={{borderLeft: '4px solid var(--accent-teal)'}}>
              <h3 className="text-xl font-semibold text-primary-600 mb-4">
                <span className="teal-accent">Youth Ministry</span>
              </h3>
              <p className="text-secondary-600 mb-2">Grades 7-12</p>
              <p className="text-secondary-500 mb-6">Building faith and friendships for teenagers</p>
              <button className="btn-primary">
                Learn More
              </button>
            </div>

            <div className="bg-gradient-to-br from-white to-amber-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100" style={{borderLeft: '4px solid var(--accent-teal)'}}>
              <h3 className="text-xl font-semibold text-primary-600 mb-4">
                <span className="teal-accent">Men and Women's Bible Studies</span>
              </h3>
              <p className="text-secondary-600 mb-2">Every Thursday, 7:00 PM</p>
              <p className="text-secondary-500 mb-6">Fellowship and Bible Study</p>
              <button className="btn-primary">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Sermon */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6">📖</div>
          <h3 className="text-3xl font-bold text-secondary-900 mb-4">
            <span className="gold-accent">Latest Sermon</span>
          </h3>
          <h4 className="text-2xl font-semibold text-primary-600 mb-2 italic">
            "<span className="rust-accent">Brotherly Advice: Boasting About Nothing</span>"
          </h4>
          <p className="text-lg text-secondary-600 mb-8">
            Pastor Adam Hungerford
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <a href="https://youtu.be/a1xRcrHx1zE" target="_blank" rel="noopener noreferrer" className="btn-coral">
              Watch Now
            </a>
            <a href="https://www.youtube.com/@ttepc3376" target="_blank" rel="noopener noreferrer" className="btn-accent">
              View All Sermons
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-secondary-800 to-secondary-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">The Well EPC</h3>
              <p className="text-gray-300">8 Canal St, Big Flats, NY</p>
              <p className="text-gray-300">Pastor: Adam Hungerford</p>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/TwinTiersEvangelicalPresbyterianChurch" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-accent-gold transition-colors duration-300">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Stay Connected</h4>
              <form action="mailto:ctaylor@ttepc.org" method="post" enctype="text/plain">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-2 bg-white bg-opacity-10 border border-white border-opacity-20 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent"
                    required
                  />
                  <input type="hidden" name="subject" value="Newsletter Subscription Request" />
                  <input type="hidden" name="body" value="Please add me to the newsletter subscription list." />
                  <button type="submit" className="bg-primary-500 hover:bg-primary-600 text-white font-medium py-2 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center">
            <p className="text-gray-400">&copy; 2025 The Well EPC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
