import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNav from '../components/AdminNav';
import AdminDataTable from '../components/AdminDataTable';
import AdminFormModal from '../components/AdminFormModal';

function AdminNewsletter() {
  const [subscribers, setSubscribers] = useState([]);
  const [filteredSubscribers, setFilteredSubscribers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubscriber, setEditingSubscriber] = useState(null);
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

    loadSubscribers();
  }, [navigate]);

  useEffect(() => {
    // Filter subscribers based on current filters
    let filtered = subscribers;

    if (statusFilter !== 'all') {
      filtered = filtered.filter(subscriber => subscriber.is_active === (statusFilter === 'active'));
    }

    if (searchTerm) {
      filtered = filtered.filter(subscriber =>
        subscriber.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subscriber.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        subscriber.last_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredSubscribers(filtered);
  }, [subscribers, statusFilter, searchTerm]);

  const loadSubscribers = async () => {
    try {
      // Mock data - in production, fetch from your API
      const mockSubscribers = [
        {
          id: 1,
          email: 'john.doe@email.com',
          first_name: 'John',
          last_name: 'Doe',
          subscription_date: '2025-01-15T10:30:00Z',
          is_active: true,
          unsubscribed_at: null,
          preferences: '{"sermons": true, "events": true, "announcements": false}'
        },
        {
          id: 2,
          email: 'sarah.smith@email.com',
          first_name: 'Sarah',
          last_name: 'Smith',
          subscription_date: '2025-02-20T14:15:00Z',
          is_active: true,
          unsubscribed_at: null,
          preferences: '{"sermons": true, "events": false, "announcements": true}'
        },
        {
          id: 3,
          email: 'mike.johnson@email.com',
          first_name: 'Mike',
          last_name: 'Johnson',
          subscription_date: '2025-03-10T09:45:00Z',
          is_active: false,
          unsubscribed_at: '2025-08-15T11:20:00Z',
          preferences: '{"sermons": true, "events": true, "announcements": true}'
        },
        {
          id: 4,
          email: 'lisa.brown@email.com',
          first_name: 'Lisa',
          last_name: 'Brown',
          subscription_date: '2025-04-05T16:30:00Z',
          is_active: true,
          unsubscribed_at: null,
          preferences: '{"sermons": false, "events": true, "announcements": true}'
        },
        {
          id: 5,
          email: 'david.wilson@email.com',
          first_name: 'David',
          last_name: 'Wilson',
          subscription_date: '2025-05-12T13:15:00Z',
          is_active: true,
          unsubscribed_at: null,
          preferences: '{"sermons": true, "events": true, "announcements": false}'
        }
      ];
      setSubscribers(mockSubscribers);
    } catch (error) {
      console.error('Error loading subscribers:', error);
    }
  };

  const handleAddSubscriber = () => {
    setEditingSubscriber(null);
    setIsModalOpen(true);
  };

  const handleEditSubscriber = (subscriber) => {
    setEditingSubscriber(subscriber);
    setIsModalOpen(true);
  };

  const handleDeleteSubscriber = async (subscriber) => {
    if (window.confirm(`Are you sure you want to unsubscribe ${subscriber.email}?`)) {
      try {
        // In production, make API call to delete
        setSubscribers(subscribers.filter(s => s.id !== subscriber.id));
        alert('Subscriber removed successfully!');
      } catch (error) {
        console.error('Error removing subscriber:', error);
        alert('Error removing subscriber. Please try again.');
      }
    }
  };

  const handleSaveSubscriber = async (subscriberData) => {
    try {
      if (editingSubscriber) {
        // Update existing subscriber
        setSubscribers(subscribers.map(s => s.id === editingSubscriber.id ? { ...subscriberData, id: editingSubscriber.id } : s));
        alert('Subscriber updated successfully!');
      } else {
        // Add new subscriber
        const newSubscriber = {
          ...subscriberData,
          id: Date.now(),
          subscription_date: new Date().toISOString(),
          is_active: true,
          unsubscribed_at: null
        };
        setSubscribers([...subscribers, newSubscriber]);
        alert('Subscriber added successfully!');
      }
      setIsModalOpen(false);
      setEditingSubscriber(null);
    } catch (error) {
      console.error('Error saving subscriber:', error);
      alert('Error saving subscriber. Please try again.');
    }
  };

  const handleExportSubscribers = () => {
    const activeSubscribers = subscribers.filter(s => s.is_active);
    const csvContent = [
      ['Email', 'First Name', 'Last Name', 'Subscription Date'],
      ...activeSubscribers.map(s => [s.email, s.first_name || '', s.last_name || '', s.subscription_date])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'newsletter-subscribers.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const getSubscriberStats = () => {
    const total = subscribers.length;
    const active = subscribers.filter(s => s.is_active).length;
    const inactive = subscribers.filter(s => !s.is_active).length;
    const thisMonth = subscribers.filter(s => {
      const subDate = new Date(s.subscription_date);
      const now = new Date();
      return subDate.getMonth() === now.getMonth() && subDate.getFullYear() === now.getFullYear();
    }).length;

    return { total, active, inactive, thisMonth };
  };

  const stats = getSubscriberStats();

  const subscriberFields = [
    { name: 'email', label: 'Email Address', type: 'email', required: true },
    { name: 'first_name', label: 'First Name', type: 'text' },
    { name: 'last_name', label: 'Last Name', type: 'text' },
    { name: 'is_active', label: 'Active Subscription', type: 'checkbox' }
  ];

  const tableColumns = [
    { key: 'email', label: 'Email', type: 'text' },
    { key: 'first_name', label: 'First Name', type: 'text' },
    { key: 'last_name', label: 'Last Name', type: 'text' },
    { key: 'subscription_date', label: 'Subscribed', type: 'date' },
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
              <div className="text-3xl mr-4 text-blue-600">📧</div>
              <div>
                <p className="text-sm text-secondary-500">Total Subscribers</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="text-3xl mr-4 text-green-600">✅</div>
              <div>
                <p className="text-sm text-secondary-500">Active</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.active}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="text-3xl mr-4 text-red-600">🚫</div>
              <div>
                <p className="text-sm text-secondary-500">Inactive</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.inactive}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="text-3xl mr-4 text-purple-600">📅</div>
              <div>
                <p className="text-sm text-secondary-500">This Month</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.thisMonth}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Status
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="all">All Subscribers</option>
                <option value="active">Active Only</option>
                <option value="inactive">Inactive Only</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Search
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search subscribers..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={handleExportSubscribers}
                className="w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Export Active Subscribers
              </button>
            </div>
          </div>
        </div>

        <AdminDataTable
          title="Newsletter Subscribers"
          columns={tableColumns}
          data={filteredSubscribers}
          onEdit={handleEditSubscriber}
          onDelete={handleDeleteSubscriber}
          onDuplicate={null}
          onAdd={handleAddSubscriber}
          addButtonText="Add Subscriber"
        />

        {/* Newsletter Actions */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-secondary-900 mb-4">Newsletter Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={() => alert('Send newsletter feature coming soon!')}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              📧 Send Newsletter
            </button>
            <button
              onClick={() => alert('Create newsletter feature coming soon!')}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
            >
              ✏️ Create Newsletter
            </button>
            <button
              onClick={() => alert('Newsletter templates feature coming soon!')}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              📋 Manage Templates
            </button>
          </div>
        </div>
      </main>

      {/* Form Modal */}
      <AdminFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSubscriber ? 'Edit Subscriber' : 'Add New Subscriber'}
        fields={subscriberFields}
        initialData={editingSubscriber || {}}
        onSubmit={handleSaveSubscriber}
      />
    </div>
  );
}

export default AdminNewsletter;
