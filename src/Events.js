import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MobileMenu from './components/MobileMenu';
import EventRegistrationModal from './components/EventRegistrationModal';

function Events() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMonth, setSelectedMonth] = useState('all');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    loadEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, selectedCategory, selectedMonth]);

  const loadEvents = async () => {
    try {
      setLoading(true);
      // In production, this would fetch from the API
      // For now, using mock data until API is fully connected
      const mockEvents = [
        {
          id: 1,
          title: 'Sunday Worship Service',
          description: 'Join us for our weekly worship service featuring inspiring music, meaningful fellowship, and a message from Pastor Adam Hungerford.',
          event_date: '2025-09-08',
          start_time: '09:30:00',
          end_time: '11:00:00',
          location: 'The Well EPC Sanctuary',
          category: 'worship',
          max_attendees: null,
          is_active: true
        },
        {
          id: 2,
          title: 'Community Potluck Dinner',
          description: 'A wonderful opportunity to connect with fellow church members over delicious food and fellowship. Bring your favorite dish to share!',
          event_date: '2025-09-14',
          start_time: '17:00:00',
          end_time: '19:00:00',
          location: 'Church Fellowship Hall',
          category: 'fellowship',
          max_attendees: 80,
          is_active: true
        },
        {
          id: 3,
          title: 'Youth Group Meeting',
          description: 'Fun activities, games, and Bible study for teenagers ages 13-18. Join us for an evening of faith and friendship.',
          event_date: '2025-09-18',
          start_time: '18:30:00',
          end_time: '20:30:00',
          location: 'Youth Room',
          category: 'ministry',
          max_attendees: 25,
          is_active: true
        },
        {
          id: 4,
          title: 'Food Drive for Local Shelter',
          description: 'Help us collect non-perishable food items for our local homeless shelter. Every contribution makes a difference in our community.',
          event_date: '2025-09-21',
          start_time: '10:00:00',
          end_time: '14:00:00',
          location: 'Church Parking Lot',
          category: 'outreach',
          max_attendees: null,
          is_active: true
        },
        {
          id: 5,
          title: 'Bible Study: Romans',
          description: 'Deep dive into the Book of Romans with Pastor Adam. Open to all adults interested in studying God\'s Word together.',
          event_date: '2025-09-25',
          start_time: '19:00:00',
          end_time: '20:30:00',
          location: 'Library',
          category: 'ministry',
          max_attendees: 20,
          is_active: true
        },
        {
          id: 6,
          title: 'Fall Festival',
          description: 'Family-friendly event with games, food, and fun for the whole community. Great opportunity to invite friends and neighbors!',
          event_date: '2025-10-05',
          start_time: '16:00:00',
          end_time: '20:00:00',
          location: 'Church Grounds',
          category: 'community',
          max_attendees: 150,
          is_active: true
        }
      ];

      setEvents(mockEvents);
      setError(null);
    } catch (err) {
      setError('Failed to load events. Please try again later.');
      console.error('Error loading events:', err);
    } finally {
      setLoading(false);
    }
  };

  const filterEvents = () => {
    let filtered = events;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(event => event.category === selectedCategory);
    }

    if (selectedMonth !== 'all') {
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.event_date);
        const eventMonth = eventDate.getMonth() + 1; // getMonth() returns 0-11
        return eventMonth.toString() === selectedMonth;
      });
    }

    // Sort by date
    filtered.sort((a, b) => new Date(a.event_date) - new Date(b.event_date));

    setFilteredEvents(filtered);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const time = new Date();
    time.setHours(parseInt(hours), parseInt(minutes));
    return time.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getCategoryColor = (category) => {
    const colors = {
      worship: 'bg-blue-100 text-blue-800',
      fellowship: 'bg-green-100 text-green-800',
      ministry: 'bg-purple-100 text-purple-800',
      outreach: 'bg-orange-100 text-orange-800',
      community: 'bg-pink-100 text-pink-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors.other;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      worship: '⛪',
      fellowship: '👥',
      ministry: '📖',
      outreach: '🤝',
      community: '🌟',
      other: '📅'
    };
    return icons[category] || icons.other;
  };

  const handleRSVP = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleRegistrationSuccess = () => {
    // Could add logic here to update the event's registration count
    // or show a success message
    console.log('Registration successful');
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

      {/* Events Hero Section */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-secondary-900 mb-6">
            Church <span className="gold-accent">Events</span>
          </h1>
          <p className="text-xl text-secondary-600 max-w-3xl mx-auto">
            Stay connected with our community through worship services, fellowship gatherings,
            and outreach opportunities. Join us as we grow together in faith.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <div className="flex flex-col">
              <label htmlFor="category-filter" className="text-sm font-medium text-secondary-700 mb-2">
                Filter by Category
              </label>
              <select
                id="category-filter"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="worship">Worship</option>
                <option value="fellowship">Fellowship</option>
                <option value="ministry">Ministry</option>
                <option value="outreach">Outreach</option>
                <option value="community">Community</option>
              </select>
            </div>

            <div className="flex flex-col">
              <label htmlFor="month-filter" className="text-sm font-medium text-secondary-700 mb-2">
                Filter by Month
              </label>
              <select
                id="month-filter"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="all">All Months</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
              <p className="mt-4 text-secondary-600">Loading events...</p>
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
                onClick={loadEvents}
                className="bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors duration-300"
              >
                Try Again
              </button>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-secondary-400 mb-4">
                <svg className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-secondary-900 mb-2">No Events Found</h3>
              <p className="text-secondary-600">Try adjusting your filters to see more events.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEvents.map((event) => (
                <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-200">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(event.category)}`}>
                        <span className="mr-1">{getCategoryIcon(event.category)}</span>
                        {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                      </span>
                      <span className="text-sm text-secondary-500">
                        {formatDate(event.event_date)}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold text-secondary-900 mb-3 line-clamp-2">
                      {event.title}
                    </h3>

                    <p className="text-secondary-600 mb-4 line-clamp-3">
                      {event.description}
                    </p>

                    <div className="space-y-2 text-sm text-secondary-500 mb-4">
                      <div className="flex items-center">
                        <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {formatTime(event.start_time)}
                        {event.end_time && ` - ${formatTime(event.end_time)}`}
                      </div>
                      <div className="flex items-center">
                        <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.location}
                      </div>
                      {event.max_attendees && (
                        <div className="flex items-center">
                          <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                          </svg>
                          Up to {event.max_attendees} attendees
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <button className="flex-1 bg-cyan-600 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition-colors duration-300 text-sm font-medium">
                        Learn More
                      </button>
                      <button
                        onClick={() => handleRSVP(event)}
                        className="flex-1 border-2 border-cyan-600 text-cyan-600 px-4 py-2 rounded-lg hover:bg-cyan-50 transition-colors duration-300 text-sm font-medium"
                      >
                        RSVP
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
          <h2 className="text-3xl font-bold text-secondary-900 mb-6">Get Involved in Our Community</h2>
          <p className="text-xl text-secondary-600 mb-8">
            Whether you're looking to worship, serve, or simply connect with others,
            there's a place for you in our church community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-cyan-600 text-white px-8 py-4 rounded-lg hover:bg-cyan-700 transition-colors duration-300 font-medium"
            >
              Contact Us
            </Link>
            <Link
              to="/ministries"
              className="border-2 border-cyan-600 text-cyan-600 px-8 py-4 rounded-lg hover:bg-cyan-50 transition-colors duration-300 font-medium"
            >
              Explore Ministries
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

      {/* Event Registration Modal */}
      <EventRegistrationModal
        event={selectedEvent}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onRegister={handleRegistrationSuccess}
      />
    </div>
  );
}

export default Events;
