import React, { useState } from 'react';

function NewsletterSignup({ compact = false }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage('');

    try {
      const response = await fetch('/api/newsletter.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          name: name,
          preferences: ['general']
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Thank you for subscribing to our newsletter!');
        setEmail('');
        setName('');
      } else {
        setMessage(data.error || 'Sorry, there was an error subscribing. Please try again.');
      }
    } catch (error) {
      console.error('Error subscribing to newsletter:', error);
      setMessage('Sorry, there was an error subscribing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (compact) {
    return (
      <div className="bg-cyan-50 p-6 rounded-lg">
        <h3 className="text-lg font-semibold text-secondary-900 mb-2">Stay Connected</h3>
        <p className="text-secondary-600 text-sm mb-4">Subscribe to our newsletter for updates and announcements.</p>

        {message && (
          <div className={`mb-4 p-3 rounded text-sm ${message.includes('error') || message.includes('Sorry') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition-colors duration-300 text-sm font-medium disabled:opacity-50"
          >
            {isSubmitting ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-cyan-600">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">Stay Connected</h2>
        <p className="text-xl text-cyan-100 mb-8 max-w-2xl mx-auto">
          Subscribe to our newsletter to receive updates about services, events, and community news.
        </p>

        {message && (
          <div className={`mb-6 p-4 rounded-lg max-w-md mx-auto ${message.includes('error') || message.includes('Sorry') ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name (optional)"
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:ring-opacity-50 text-secondary-900"
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-white focus:ring-opacity-50 text-secondary-900"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-cyan-600 px-8 py-3 rounded-lg hover:bg-gray-100 transition-colors duration-300 font-medium disabled:opacity-50 whitespace-nowrap"
            >
              {isSubmitting ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
        </form>

        <p className="text-cyan-200 text-sm mt-4">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  );
}

export default NewsletterSignup;
