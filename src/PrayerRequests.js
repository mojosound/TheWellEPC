import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import MobileMenu from './components/MobileMenu';

function PrayerRequests() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    request: '',
    isPublic: false,
    isUrgent: false,
    category: 'general'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      const response = await fetch('/api/prayer-requests.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          request: formData.request,
          is_public: formData.isPublic ? 1 : 0,
          is_urgent: formData.isUrgent ? 1 : 0,
          category: formData.category
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage('Thank you for sharing your prayer request. We will pray for you and keep your request confidential unless you chose to make it public.');
        setFormData({
          name: '',
          email: '',
          phone: '',
          request: '',
          isPublic: false,
          isUrgent: false,
          category: 'general'
        });
      } else {
        setSubmitMessage(data.error || 'Sorry, there was an error submitting your prayer request. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting prayer request:', error);
      setSubmitMessage('Sorry, there was an error submitting your prayer request. Please try again.');
    } finally {
      setIsSubmitting(false);
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
              <Link to="/contact" className="text-secondary-800 hover:text-cyan-600 font-medium transition-colors duration-300">Contact</Link>
            </nav>
            <MobileMenu />
          </div>
        </div>
      </header>

      {/* Prayer Requests Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6">
            Prayer <span className="gold-accent">Requests</span>
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto mb-8">
            Share your prayer requests with our community. We believe in the power of prayer
            and would be honored to lift you up in prayer during this time.
          </p>
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 max-w-2xl mx-auto">
            <p className="text-secondary-700 italic">
              "Therefore confess your sins to each other and pray for each other so that you may be healed.
              The prayer of a righteous person is powerful and effective." - James 5:16
            </p>
          </div>
        </div>
      </section>

      {/* Prayer Request Form */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Information Sidebar */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">How It Works</h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-cyan-100 p-2 rounded-lg">
                    <svg className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">Confidential</h3>
                    <p className="text-secondary-600 text-sm">Your prayer requests are kept confidential unless you choose to make them public.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-cyan-100 p-2 rounded-lg">
                    <svg className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">Community Support</h3>
                    <p className="text-secondary-600 text-sm">Our prayer team and congregation will pray for your requests regularly.</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-cyan-100 p-2 rounded-lg">
                    <svg className="h-6 w-6 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-secondary-900 mb-2">Follow Up</h3>
                    <p className="text-secondary-600 text-sm">We'll follow up with you if you provide contact information and permission.</p>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mt-8 p-6 bg-amber-50 rounded-lg">
                <h3 className="text-lg font-semibold text-secondary-900 mb-4">Need Immediate Help?</h3>
                <p className="text-secondary-600 text-sm mb-4">
                  If you're in crisis or need immediate spiritual guidance, please don't hesitate to reach out.
                </p>
                <div className="space-y-2 text-sm">
                  <p><strong>Pastor Adam Hungerford:</strong> (607) 555-0123</p>
                  <p><strong>Emergency:</strong> Call 911 for immediate help</p>
                  <p><strong>Crisis Hotline:</strong> 988 (Suicide & Crisis Lifeline)</p>
                </div>
              </div>
            </div>

            {/* Prayer Request Form */}
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-bold text-secondary-900 mb-8">Share Your Prayer Request</h2>

              {submitMessage && (
                <div className={`mb-6 p-4 rounded-lg ${submitMessage.includes('error') || submitMessage.includes('Sorry') ? 'bg-red-50 text-red-700 border border-red-200' : 'bg-green-50 text-green-700 border border-green-200'}`}>
                  {submitMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-secondary-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-secondary-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 mb-2">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                    placeholder="(607) 555-0123"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-secondary-700 mb-2">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                  >
                    <option value="general">General Prayer</option>
                    <option value="healing">Healing</option>
                    <option value="family">Family</option>
                    <option value="work">Work/Career</option>
                    <option value="relationships">Relationships</option>
                    <option value="spiritual">Spiritual Growth</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="request" className="block text-sm font-medium text-secondary-700 mb-2">
                    Prayer Request *
                  </label>
                  <textarea
                    id="request"
                    name="request"
                    value={formData.request}
                    onChange={handleInputChange}
                    required
                    rows={8}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-vertical"
                    placeholder="Please share your prayer request. Be as specific as you'd like. We want to pray effectively for you..."
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isPublic"
                      name="isPublic"
                      checked={formData.isPublic}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isPublic" className="ml-2 block text-sm text-secondary-700">
                      Make this prayer request public (others can see and pray for it)
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isUrgent"
                      name="isUrgent"
                      checked={formData.isUrgent}
                      onChange={handleInputChange}
                      className="h-4 w-4 text-cyan-600 focus:ring-cyan-500 border-gray-300 rounded"
                    />
                    <label htmlFor="isUrgent" className="ml-2 block text-sm text-secondary-700">
                      This is an urgent prayer request
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-cyan-600 text-white px-8 py-4 rounded-lg hover:bg-cyan-700 transition-colors duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting Prayer Request...
                    </span>
                  ) : (
                    'Submit Prayer Request'
                  )}
                </button>
              </form>

              <p className="text-sm text-secondary-500 mt-4">
                * Required fields. Your privacy is important to us. Prayer requests are handled with care and confidentiality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-secondary-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <img src="/logo-color-final-001-transparent.png" alt="The Well EPC Logo" className="h-16 w-auto mx-auto mb-6" />
          <p className="text-secondary-300 mb-4">The Well Evangelical Presbyterian Church</p>
          <p className="text-secondary-400 text-sm">8 Canal St, Big Flats, NY 14814 • (607) 555-0123</p>
          <div className="mt-6 pt-6 border-t border-secondary-700">
            <p className="text-secondary-400 text-sm">© 2025 The Well EPC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PrayerRequests;
