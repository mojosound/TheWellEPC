import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNav from '../components/AdminNav';
import AdminDataTable from '../components/AdminDataTable';
import AdminFormModal from '../components/AdminFormModal';

function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
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

  const handleSaveEvent = async (eventData) => {
    try {
      if (editingEvent) {
        // Update existing event
        setEvents(events.map(e => e.id === editingEvent.id ? { ...eventData, id: editingEvent.id } : e));
        alert('Event updated successfully!');
      } else {
        // Add new event
        const newEvent = { ...eventData, id: Date.now() };
        setEvents([...events, newEvent]);
        alert('Event created successfully!');
      }
    } catch (error) {
      console.error('Error saving event:', error);
      alert('Error saving event. Please try again.');
    }
  };

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
        <AdminDataTable
          title="Church Events"
          columns={tableColumns}
          data={events}
          onEdit={handleEditEvent}
          onDelete={handleDeleteEvent}
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
