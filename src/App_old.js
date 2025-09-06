import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* Placeholder routes for future pages */}
        <Route path="/services" element={<Home />} />
        <Route path="/ministries" element={<Home />} />
        <Route path="/events" element={<Home />} />
        <Route path="/community" element={<Home />} />
        <Route path="/contact" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
      {/* Header */}
      <header className="fixed top-0 w-full bg-white shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <img src="/logo-color-final-001-transparent.png" alt="The Well EPC Logo" className="h-20 w-auto cursor-pointer hover:scale-105 transition-transform duration-300" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} />
            <nav className="hidden md:flex space-x-8">
              <a href="#home" className="text-secondary-800 hover:text-cyan-600 font-medium transition-colors duration-300">Home</a>
              <a href="#about" className="text-secondary-800 hover:text-cyan-600 font-medium transition-colors duration-300">About</a>
              <a href="#services" className="text-secondary-800 hover:text-cyan-600 font-medium transition-colors duration-300">Services</a>
              <a href="#ministries" className="text-secondary-800 hover:text-cyan-600 font-medium transition-colors duration-300">Ministries</a>
              <a href="#events" className="text-secondary-800 hover:text-cyan-600 font-medium transition-colors duration-300">Events</a>
              <a href="#community" className="text-secondary-800 hover:text-cyan-600 font-medium transition-colors duration-300">Community</a>
              <a href="#contact" className="text-secondary-800 hover:text-cyan-600 font-medium transition-colors duration-300">Contact</a>
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
            <h2 className="text-4xl sm:text-5xl font-bold text-secondary-900 mb-6">
              <span className="gold-accent">About The Well</span>
            </h2>
            <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
              The Well is a vibrant community where faith comes alive through outreach, worship, discipleship, and service to our neighbors.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
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
            <div className="bg-gradient-to-br from-white to-amber-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100" style={{borderLeft: '4px solid var(--accent-teal)'}}>
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">🙏</div>
                <h3 className="text-2xl font-bold text-cyan-600 mb-2">A Place of Community</h3>
                <div className="w-16 h-1 bg-accent-teal mx-auto rounded-full"></div>
              </div>
              <ul className="space-y-3 text-secondary-700">
                <li className="flex items-start">
                  <span className="text-accent-teal mr-2">•</span>
                  <span><strong className="text-cyan-600">Worship</strong> - Gathering together in praise and adoration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-teal mr-2">•</span>
                  <span>Fellowship through meals, service, and fun activities</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-teal mr-2">•</span>
                  <span>Collaboration with other area churches</span>
                </li>
              </ul>
            </div>

            {/* A Place of Discipleship */}
            <div className="bg-gradient-to-br from-white to-amber-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100" style={{borderLeft: '4px solid var(--accent-coral)'}}>
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">📖</div>
                <h3 className="text-2xl font-bold text-cyan-600 mb-2">A Place of Discipleship</h3>
                <div className="w-16 h-1 bg-accent-coral mx-auto rounded-full"></div>
              </div>
              <ul className="space-y-3 text-secondary-700">
                <li className="flex items-start">
                  <span className="text-accent-coral mr-2">•</span>
                  <span><strong className="text-cyan-600">Discipleship And Education</strong> - Growing together in faith and knowledge</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-coral mr-2">•</span>
                  <span>Prayer and faithful teaching of Scripture</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-coral mr-2">•</span>
                  <span>Small Groups and Bible Studies for community and care</span>
                </li>
              </ul>
            </div>

            {/* A Place of Preparation */}
            <div className="bg-gradient-to-br from-white to-amber-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 accent-border">
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">🌱</div>
                <h3 className="text-2xl font-bold text-cyan-600 mb-2">A Place of Preparation</h3>
                <div className="w-16 h-1 bg-accent-gold mx-auto rounded-full"></div>
              </div>
              <ul className="space-y-3 text-secondary-700">
                <li className="flex items-start">
                  <span className="text-accent-gold mr-2">•</span>
                  <span>Encouraging and developing God-given gifts of service</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-gold mr-2">•</span>
                  <span>Responding to passions and calling of believers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-gold mr-2">•</span>
                  <span>Equipping believers for contextual ministry</span>
                </li>
              </ul>
            </div>

            {/* A Place of Sending */}
            <div className="bg-gradient-to-br from-white to-amber-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100" style={{borderLeft: '4px solid var(--accent-teal)'}}>
              <div className="text-center mb-6">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-2xl font-bold text-cyan-600 mb-2">A Place of Sending</h3>
                <div className="w-16 h-1 bg-accent-teal mx-auto rounded-full"></div>
              </div>
              <ul className="space-y-3 text-secondary-700">
                <li className="flex items-start">
                  <span className="text-accent-teal mr-2">•</span>
                  <span><strong className="text-cyan-600">Missions</strong> - Supporting cross-cultural ministry</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-teal mr-2">•</span>
                  <span>Developing and sending ministers into various forms of service</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent-teal mr-2">•</span>
                  <span>Inviting others to experience Christ and the church</span>
                </li>
              </ul>
            </div>

            {/* Call to Action Card */}
            <div className="bg-gradient-to-br from-accent-gold to-yellow-400 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-accent-gold">
              <div className="text-center">
                <div className="text-4xl mb-4">❤️</div>
                <h3 className="text-2xl font-bold text-white mb-4">Join Our Community</h3>
                <p className="text-white mb-6">
                  Experience the love, fellowship, and spiritual growth that happens at The Well.
                </p>
                <button className="bg-white text-accent-gold hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
                  Get Connected
                </button>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-2xl p-8 text-white">
              <h3 className="text-3xl font-bold mb-4">Ready to Be Part of Something Special?</h3>
              <p className="text-xl mb-6 text-blue-100">
                Join us this Sunday at 9:30 AM for worship and discover your place in God's story.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="btn-coral">
                  Plan Your Visit
                </button>
                <button className="bg-white text-cyan-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-lg transition-all duration-300">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Times */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-secondary-900 mb-8">
            <span className="gold-accent">Service Times</span>
          </h2>
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-md mx-auto accent-border">
            <h3 className="text-2xl font-semibold text-cyan-600 mb-4">
              Sunday Worship: <span className="teal-accent">9:30 AM</span>
            </h3>
            <p className="text-secondary-600 mb-6">
              Followed by Small Groups
            </p>
            <button className="btn-accent">
              View Full Schedule
            </button>
          </div>
        </div>
      </section>

      {/* Featured Announcements */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-amber-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-secondary-900 mb-12">
            <span className="rust-accent">Upcoming Events</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-white to-amber-50 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 accent-border">
              <h3 className="text-xl font-semibold text-primary-600 mb-4">
                <span className="gold-accent">Dish To Pass Lunch</span>
              </h3>
              <p className="text-secondary-600 mb-2">September 14, 2025 after the service</p>
              <p className="text-secondary-500 mb-6">Join us for fellowship and food</p>
              <button className="btn-accent">
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
              <p className="text-gray-300">180 Hibbard Rd, Big Flats, NY</p>
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

export default App;
