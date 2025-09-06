import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNav from '../components/AdminNav';
import AdminDataTable from '../components/AdminDataTable';
import AdminFormModal from '../components/AdminFormModal';

function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [typeFilter, setTypeFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }

    loadAnnouncements();
  }, [navigate]);

  useEffect(() => {
    // Filter announcements based on current filters
    let filtered = announcements;

    if (typeFilter !== 'all') {
      filtered = filtered.filter(announcement => announcement.announcement_type === typeFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(announcement =>
        announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        announcement.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredAnnouncements(filtered);
  }, [announcements, typeFilter, searchTerm]);

  const loadAnnouncements = async () => {
    try {
      // Mock data - in production, fetch from your API
      const mockAnnouncements = [
        {
          id: 1,
          title: 'Community Potluck This Sunday',
          content: 'Join us for our monthly community potluck after the worship service. Bring your favorite dish to share!',
          announcement_type: 'event',
          start_date: '2025-09-08',
          end_date: '2025-09-08',
          priority: 'medium',
          is_active: true,
          created_at: '2025-09-01T10:00:00Z'
        },
        {
          id: 2,
          title: 'Youth Group Meeting',
          content: 'Weekly youth group meeting every Wednesday at 7 PM. Games, worship, and Bible study for ages 12-18.',
          announcement_type: 'ministry',
          start_date: '2025-09-04',
          end_date: '2025-12-31',
          priority: 'low',
          is_active: true,
          created_at: '2025-09-02T14:00:00Z'
        },
        {
          id: 3,
          title: 'Urgent: Prayer Request for John Smith',
          content: 'Please keep John Smith in your prayers as he recovers from surgery. Your prayers are greatly appreciated.',
          announcement_type: 'urgent',
          start_date: '2025-09-05',
          end_date: '2025-09-15',
          priority: 'high',
          is_active: true,
          created_at: '2025-09-05T09:00:00Z'
        },
        {
          id: 4,
          title: 'New Member Welcome',
          content: 'Welcome to our newest members! We\'re excited to have you join our church family.',
          announcement_type: 'general',
          start_date: '2025-09-01',
          end_date: '2025-09-30',
          priority: 'low',
          is_active: true,
          created_at: '2025-09-01T16:00:00Z'
        }
      ];
      setAnnouncements(mockAnnouncements);
    } catch (error) {
      console.error('Error loading announcements:', error);
    }
  };

  const handleAddAnnouncement = () => {
    setEditingAnnouncement(null);
    setIsModalOpen(true);
  };

  const handleEditAnnouncement = (announcement) => {
    setEditingAnnouncement(announcement);
    setIsModalOpen(true);
  };

  const handleDeleteAnnouncement = async (announcement) => {
    if (window.confirm(`Are you sure you want to delete "${announcement.title}"?`)) {
      try {
        // In production, make API call to delete
        setAnnouncements(announcements.filter(a => a.id !== announcement.id));
        alert('Announcement deleted successfully!');
      } catch (error) {
        console.error('Error deleting announcement:', error);
        alert('Error deleting announcement. Please try again.');
      }
    }
  };

  const handleDuplicateAnnouncement = (announcement) => {
    const duplicatedAnnouncement = {
      ...announcement,
      id: Date.now(),
      title: `${announcement.title} (Copy)`,
      start_date: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString()
    };
    setAnnouncements([...announcements, duplicatedAnnouncement]);
    alert('Announcement duplicated successfully!');
  };

  const handleSaveAnnouncement = async (announcementData) => {
    try {
      if (editingAnnouncement) {
        // Update existing announcement
        setAnnouncements(announcements.map(a => a.id === editingAnnouncement.id ? { ...announcementData, id: editingAnnouncement.id } : a));
        alert('Announcement updated successfully!');
      } else {
        // Add new announcement
        const newAnnouncement = {
          ...announcementData,
          id: Date.now(),
          created_at: new Date().toISOString()
        };
        setAnnouncements([...announcements, newAnnouncement]);
        alert('Announcement added successfully!');
      }
      setIsModalOpen(false);
      setEditingAnnouncement(null);
    } catch (error) {
      console.error('Error saving announcement:', error);
      alert('Error saving announcement. Please try again.');
    }
  };

  const getAnnouncementStats = () => {
    const total = announcements.length;
    const active = announcements.filter(a => a.is_active).length;
    const urgent = announcements.filter(a => a.announcement_type === 'urgent').length;
    const thisWeek = announcements.filter(a => {
      const startDate = new Date(a.start_date);
      const now = new Date();
      const weekFromNow = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
      return startDate >= now && startDate <= weekFromNow;
    }).length;

    return { total, active, urgent, thisWeek };
  };

  const stats = getAnnouncementStats();

  const announcementFields = [
    { name: 'title', label: 'Announcement Title', type: 'text', required: true },
    { name: 'content', label: 'Content', type: 'textarea', rows: 4, required: true },
    {
      name: 'announcement_type',
      label: 'Type',
      type: 'select',
      options: [
        { value: 'general', label: 'General' },
        { value: 'urgent', label: 'Urgent' },
        { value: 'event', label: 'Event' },
        { value: 'ministry', label: 'Ministry' }
      ],
      required: true
    },
    { name: 'start_date', label: 'Start Date', type: 'date', required: true },
    { name: 'end_date', label: 'End Date', type: 'date' },
    {
      name: 'priority',
      label: 'Priority',
      type: 'select',
      options: [
        { value: 'low', label: 'Low' },
        { value: 'medium', label: 'Medium' },
        { value: 'high', label: 'High' }
      ]
    },
    { name: 'is_active', label: 'Active', type: 'checkbox' }
  ];

  const tableColumns = [
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'announcement_type', label: 'Type', type: 'text' },
    { key: 'start_date', label: 'Start Date', type: 'date' },
    { key: 'end_date', label: 'End Date', type: 'date' },
    { key: 'priority', label: 'Priority', type: 'text' },
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
              <div className="text-3xl mr-4 text-blue-600">📢</div>
              <div>
                <p className="text-sm text-secondary-500">Total Announcements</p>
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
              <div className="text-3xl mr-4 text-red-600">🚨</div>
              <div>
                <p className="text-sm text-secondary-500">Urgent</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.urgent}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="text-3xl mr-4 text-purple-600">📅</div>
              <div>
                <p className="text-sm text-secondary-500">This Week</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.thisWeek}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Type
              </label>
              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              >
                <option value="all">All Types</option>
                <option value="general">General</option>
                <option value="urgent">Urgent</option>
                <option value="event">Event</option>
                <option value="ministry">Ministry</option>
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
                placeholder="Search announcements..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <AdminDataTable
          title="Church Announcements"
          columns={tableColumns}
          data={filteredAnnouncements}
          onEdit={handleEditAnnouncement}
          onDelete={handleDeleteAnnouncement}
          onDuplicate={handleDuplicateAnnouncement}
          onAdd={handleAddAnnouncement}
          addButtonText="Add Announcement"
        />
      </main>

      {/* Form Modal */}
      <AdminFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingAnnouncement ? 'Edit Announcement' : 'Add New Announcement'}
        fields={announcementFields}
        initialData={editingAnnouncement || {}}
        onSubmit={handleSaveAnnouncement}
      />
    </div>
  );
}

export default AdminAnnouncements;
