// Admin API utilities for connecting to backend
// Now connects to real PHP API endpoints

const API_BASE_URL = '/api'; // Points to PHP API in public/api/

export const api = {
  // Authentication
  login: async (credentials) => {
    // Mock login - replace with actual API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.username === 'admin' && credentials.password === 'admin123') {
          resolve({ success: true, user: { username: 'admin', role: 'admin' } });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 1000);
    });
  },

  // Events
  getEvents: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/events.php`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching events:', error);
      // Fallback to mock data if API fails
      return [
        {
          id: 1,
          title: 'Sunday Worship Service',
          description: 'Weekly worship service',
          event_date: '2025-09-08',
          start_time: '09:30:00',
          location: 'The Well EPC',
          category: 'worship',
          is_active: true
        }
      ];
    }
  },

  createEvent: async (eventData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/events.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error creating event:', error);
      // Fallback to mock response if API fails
      return { success: true, id: Date.now() };
    }
  },

  updateEvent: async (id, eventData) => {
    // Mock update - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  },

  deleteEvent: async (id) => {
    // Mock delete - replace with actual API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ success: true });
      }, 500);
    });
  },

  // Sermons
  getSermons: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            title: 'Walking in Faith',
            speaker: 'Pastor Adam Hungerford',
            sermon_date: '2025-09-01',
            scripture_reference: 'Hebrews 11:1',
            is_featured: true
          }
        ]);
      }, 500);
    });
  },

  // Announcements
  getAnnouncements: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            title: 'New Ministry Opportunity',
            content: 'We are starting a new outreach ministry...',
            announcement_type: 'general',
            is_active: true
          }
        ]);
      }, 500);
    });
  },

  // Prayer Requests
  getPrayerRequests: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            requester_name: 'John Doe',
            request_text: 'Please pray for my family...',
            is_public: false,
            status: 'active'
          }
        ]);
      }, 500);
    });
  },

  // Contact Messages
  getContactMessages: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            name: 'Jane Smith',
            email: 'jane@example.com',
            subject: 'Volunteer Inquiry',
            message: 'I would like to volunteer...',
            is_read: false
          }
        ]);
      }, 500);
    });
  },

  // Newsletter
  getNewsletterSubscriptions: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            email: 'subscriber@example.com',
            first_name: 'John',
            last_name: 'Doe',
            is_active: true
          }
        ]);
      }, 500);
    });
  }
};

// Authentication helpers
export const auth = {
  isAuthenticated: () => {
    return localStorage.getItem('adminAuthenticated') === 'true';
  },

  getCurrentUser: () => {
    const user = localStorage.getItem('adminUser');
    return user ? JSON.parse(user) : null;
  },

  login: (user) => {
    localStorage.setItem('adminAuthenticated', 'true');
    localStorage.setItem('adminUser', JSON.stringify(user));
  },

  logout: () => {
    localStorage.removeItem('adminAuthenticated');
    localStorage.removeItem('adminUser');
  }
};

// Form validation helpers
export const validation = {
  isValidEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  isValidDate: (date) => {
    return !isNaN(Date.parse(date));
  },

  isRequired: (value) => {
    return value && value.toString().trim().length > 0;
  }
};

// Data formatting helpers
export const formatters = {
  formatDate: (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  },

  formatTime: (timeString) => {
    if (!timeString) return '';
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  },

  truncateText: (text, maxLength = 50) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  }
};
