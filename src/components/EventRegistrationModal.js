import React, { useState } from 'react';

function EventRegistrationModal({ event, isOpen, onClose, onRegister }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: 0,
    special_requests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/event-registrations.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event_id: event.id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          guests: parseInt(formData.guests),
          special_requests: formData.special_requests
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Successfully registered for the event!');
        setFormData({
          name: '',
          email: '',
          phone: '',
          guests: 0,
          special_requests: ''
        });
        // Close modal after successful registration
        setTimeout(() => {
          onClose();
          onRegister();
        }, 2000);
      } else {
        setMessage(data.error || 'Sorry, there was an error registering for the event. Please try again.');
      }
    } catch (error) {
      console.error('Error registering for event:', error);
      setMessage('Sorry, there was an error registering for the event. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-secondary-900">Register for Event</h2>
            <button
              onClick={onClose}
              className="text-secondary-400 hover:text-secondary-600"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Event Details */}
          <div className="bg-amber-50 p-4 rounded-lg mb-6">
            <h3 className="font-semibold text-secondary-900 mb-2">{event.title}</h3>
            <div className="text-sm text-secondary-600 space-y-1">
              <p><strong>Date:</strong> {new Date(event.event_date).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</p>
              <p><strong>Time:</strong> {new Date(`1970-01-01T${event.start_time}`).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              })}
              {event.end_time && ` - ${new Date(`1970-01-01T${event.end_time}`).toLocaleTimeString('en-US', {
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              })}`}</p>
              <p><strong>Location:</strong> {event.location}</p>
            </div>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-lg ${message.includes('error') || message.includes('Sorry') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-secondary-700 mb-2">
                Phone Number
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
              <label htmlFor="guests" className="block text-sm font-medium text-secondary-700 mb-2">
                Number of Additional Guests
              </label>
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value={0}>Just me</option>
                <option value={1}>1 additional guest</option>
                <option value={2}>2 additional guests</option>
                <option value={3}>3 additional guests</option>
                <option value={4}>4 additional guests</option>
              </select>
            </div>

            <div>
              <label htmlFor="special_requests" className="block text-sm font-medium text-secondary-700 mb-2">
                Special Requests or Dietary Notes
              </label>
              <textarea
                id="special_requests"
                name="special_requests"
                value={formData.special_requests}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-vertical"
                placeholder="Any special accommodations, dietary restrictions, or other notes..."
              />
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 border-2 border-gray-300 text-secondary-700 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-cyan-600 text-white px-4 py-3 rounded-lg hover:bg-cyan-700 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Registering...
                  </span>
                ) : (
                  'Register'
                )}
              </button>
            </div>
          </form>

          <p className="text-xs text-secondary-500 mt-4">
            * Required fields. Your information will be used only for event registration and communication.
          </p>
        </div>
      </div>
    </div>
  );
}

export default EventRegistrationModal;
