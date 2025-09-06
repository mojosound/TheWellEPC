import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNav from '../components/AdminNav';
import AdminDataTable from '../components/AdminDataTable';
import AdminFormModal from '../components/AdminFormModal';

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }

    loadEvents();
  }, [navigate]);

  useEffect(() => {
    // Filter events based on current filters
    let filtered = events;

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(event => event.category === categoryFilter);
    }

    if (statusFilter !== 'all') {
      const isActive = statusFilter === 'active';
      filtered = filtered.filter(event => event.is_active === isActive);
    }

    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredEvents(filtered);
  }, [events, categoryFilter, statusFilter, searchTerm]);

  const loadEvents = async () => {
    try {
      // Mock data - in production, fetch from your API
      const mockEvents = [
        {
          id: 1,
          title: 'Sunday Worship Service',
          description: 'Weekly worship service with contemporary music and traditional elements',
          event_date: '2025-09-08',
          start_time: '09:30:00',
          end_time: '11:00:00',
          location: 'The Well EPC, 8 Canal St, Big Flats, NY',
          category: 'worship',
          max_attendees: 150,
          current_attendees: 87,
          contact_person: 'Pastor Adam Hungerford',
          contact_email: 'pastor@thewellepc.org',
          is_active: true,
          created_at: '2025-09-01T10:00:00Z'
        },
        {
          id: 2,
          title: 'Community Potluck Dinner',
          description: 'Join us for fellowship and food after the service',
          event_date: '2025-09-08',
          start_time: '11:30:00',
          end_time: '13:00:00',
          location: 'Fellowship Hall',
          category: 'fellowship',
          max_attendees: 80,
          current_attendees: 45,
          contact_person: 'Mary Johnson',
          contact_email: 'mary@thewellepc.org',
          is_active: true,
          created_at: '2025-09-03T14:00:00Z'
        },
        {
          id: 3,
          title: 'Youth Group Meeting',
          description: 'Weekly youth group meeting with games, worship, and Bible study',
          event_date: '2025-09-10',
          start_time: '18:30:00',
          end_time: '20:30:00',
          location: 'Youth Room',
          category: 'ministry',
          max_attendees: 25,
          current_attendees: 18,
          contact_person: 'Sarah Williams',
          contact_email: 'youth@thewellepc.org',
          is_active: true,
          created_at: '2025-09-02T09:00:00Z'
        },
        {
          id: 4,
          title: 'Community Outreach - Food Drive',
          description: 'Help us collect non-perishable food items for local families in need',
          event_date: '2025-09-15',
          start_time: '10:00:00',
          end_time: '14:00:00',
          location: 'Church Parking Lot',
          category: 'outreach',
          max_attendees: 50,
          current_attendees: 12,
          contact_person: 'John Smith',
          contact_email: 'outreach@thewellepc.org',
          is_active: true,
          created_at: '2025-09-04T11:00:00Z'
        },
        {
          id: 5,
          title: 'Bible Study - Book of Romans',
          description: 'In-depth study of the Book of Romans with Pastor Adam',
          event_date: '2025-09-12',
          start_time: '19:00:00',
          end_time: '20:30:00',
          location: 'Fellowship Hall',
          category: 'ministry',
          max_attendees: 30,
          current_attendees: 22,
          contact_person: 'Pastor Adam Hungerford',
          contact_email: 'pastor@thewellepc.org',
          is_active: true,
          created_at: '2025-09-01T16:00:00Z'
        }
      ];
      setEvents(mockEvents);
    } catch (error) {
      console.error('Error loading events:', error);
    }
  };

  const handleAddEvent = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleEditEvent = (event) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleDeleteEvent = async (event) => {
    if (window.confirm(`Are you sure you want to delete "${event.title}"?`)) {
      try {
        // In production, make API call to delete
        setEvents(events.filter(e => e.id !== event.id));
        alert('Event deleted successfully!');
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Error deleting event. Please try again.');
      }
    }
  };

  const handleDuplicateEvent = (event) => {
    const duplicatedEvent = {
      ...event,
      id: Date.now(),
      title: `${event.title} (Copy)`,
      current_attendees: 0,
      created_at: new Date().toISOString()
    };
    setEvents([...events, duplicatedEvent]);
    alert('Event duplicated successfully!');
  };

  const handleSaveEvent = async (eventData) => {
    try {
      if (editingEvent) {
        // Update existing event
        setEvents(events.map(e => e.id === editingEvent.id ? { ...eventData, id: editingEvent.id } : e));
        alert('Event updated successfully!');
      } else {
        // Add new event
        const newEvent = {
          ...eventData,
          id: Date.now(),
          current_attendees: 0,
          created_at: new Date().toISOString()
        };
        setEvents([...events, newEvent]);
        alert('Event added successfully!');
      }
      setIsModalOpen(false);
      setEditingEvent(null);
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Error saving event. Please try again.');
    }
  };

  const getEventStats = () => {
    const total = events.length;
    const active = events.filter(e => e.is_active).length;
    const upcoming = events.filter(e => new Date(e.event_date) > new Date()).length;
    const thisMonth = events.filter(e => {
      const eventDate = new Date(e.event_date);
      const now = new Date();
      return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear();
    }).length;

    return { total, active, upcoming, thisMonth };
  };

  const stats = getEventStats();

  const eventFields = [
    { name: 'title', label: 'Event Title', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', rows: 3 },
    { name: 'event_date', label: 'Event Date', type: 'date', required: true },
    { name: 'start_time', label: 'Start Time', type: 'time', required: true },
    { name: 'end_time', label: 'End Time', type: 'time' },
    { name: 'location', label: 'Location', type: 'text' },
    {
      name: 'category',
      label: 'Category',
      type: 'select',
      options: [
        { value: 'worship', label: 'Worship' },
        { value: 'fellowship', label: 'Fellowship' },
        { value: 'outreach', label: 'Outreach' },
        { value: 'ministry', label: 'Ministry' },
        { value: 'community', label: 'Community' },
        { value: 'other', label: 'Other' }
      ]
    },
    { name: 'max_attendees', label: 'Max Attendees', type: 'number' },
    { name: 'contact_person', label: 'Contact Person', type: 'text' },
    { name: 'contact_email', label: 'Contact Email', type: 'email' },
    { name: 'is_active', label: 'Active', type: 'checkbox' }
  ];

  const tableColumns = [
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'event_date', label: 'Date', type: 'date' },
    { key: 'start_time', label: 'Time', type: 'text' },
    { key: 'location', label: 'Location', type: 'text' },
    { key: 'category', label: 'Category', type: 'text' },
    { key: 'current_attendees', label: 'Attendees', type: 'number' },
    { key: 'is_active', label: 'Active', type: 'boolean' }
  ];

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Admin Navigation */}
      <AdminNav />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="text-3xl mr-4 text-blue-600">📅</div>
              <div>
                <p className="text-sm text-secondary-500">Total Events</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="text-3xl mr-4 text-green-600">✅</div>
              <div>
                <p className="text-sm text-secondary-500">Active Events</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.active}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="text-3xl mr-4 text-orange-600">🔮</div>
              <div>
                <p className="text-sm text-secondary-500">Upcoming</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.upcoming}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="text-3xl mr-4 text-purple-600">📊</div>
              <div>
                <p className="text-sm text-secondary-500">This Month</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.thisMonth}</p>
              </div>
            </div>
          </div>
        </div>
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Category
              </label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="worship">Worship</option>
                <option value="fellowship">Fellowship</option>
                <option value="outreach">Outreach</option>
                <option value="ministry">Ministry</option>
                <option value="community">Community</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Search
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search events..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <AdminDataTable
          title="Church Events"
          columns={tableColumns}
          data={filteredEvents}
          onEdit={handleEditEvent}
          onDelete={handleDeleteEvent}
          onDuplicate={handleDuplicateEvent}
          onAdd={handleAddEvent}
          addButtonText="Add Event"
        />
      </main>

      {/* Form Modal */}
      <AdminFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingEvent ? 'Edit Event' : 'Add New Event'}
        fields={eventFields}
        initialData={editingEvent || {}}
        onSubmit={handleSaveEvent}
      />
    </div>
  );
}

export default AdminEvents;
