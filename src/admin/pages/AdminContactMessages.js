import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNav from '../components/AdminNav';
import AdminDataTable from '../components/AdminDataTable';
import AdminFormModal from '../components/AdminFormModal';

function AdminContactMessages() {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMessage, setEditingMessage] = useState(null);
  const [typeFilter, setTypeFilter] = useState('all');
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

    loadMessages();
  }, [navigate]);

  useEffect(() => {
    // Filter messages based on current filters
    let filtered = messages;

    if (typeFilter !== 'all') {
      filtered = filtered.filter(message => message.message_type === typeFilter);
    }

    if (statusFilter !== 'all') {
      if (statusFilter === 'read') {
        filtered = filtered.filter(message => message.is_read);
      } else if (statusFilter === 'unread') {
        filtered = filtered.filter(message => !message.is_read);
      } else if (statusFilter === 'responded') {
        filtered = filtered.filter(message => message.responded_at);
      }
    }

    if (searchTerm) {
      filtered = filtered.filter(message =>
        message.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.message.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMessages(filtered);
  }, [messages, typeFilter, statusFilter, searchTerm]);

  const loadMessages = async () => {
    try {
      // Mock data - in production, fetch from your API
      const mockMessages = [
        {
          id: 1,
          name: 'Sarah Johnson',
          email: 'sarah.johnson@email.com',
          phone: '(607) 555-0123',
          subject: 'Question about youth ministry',
          message: 'Hi, I\'m interested in learning more about the youth ministry program. Could you please provide information about meeting times and what activities are available for teenagers?',
          message_type: 'general',
          is_read: true,
          responded_at: '2025-09-05T11:30:00Z',
          created_at: '2025-09-04T14:20:00Z'
        },
        {
          id: 2,
          name: 'Michael Davis',
          email: 'michael.davis@email.com',
          phone: '(607) 555-0124',
          subject: 'Prayer request for my family',
          message: 'Hello Pastor, I would like to submit a prayer request for my wife who is going through a difficult time with her health. Thank you for your ministry.',
          message_type: 'prayer',
          is_read: false,
          responded_at: null,
          created_at: '2025-09-05T09:15:00Z'
        },
        {
          id: 3,
          name: 'Jennifer Wilson',
          email: 'jennifer.wilson@email.com',
          subject: 'Volunteer opportunity inquiry',
          message: 'I saw that you\'re looking for volunteers for the community outreach program. I\'m very interested in helping. What opportunities are available?',
          message_type: 'volunteer',
          is_read: true,
          responded_at: '2025-09-04T16:45:00Z',
          created_at: '2025-09-03T10:30:00Z'
        },
        {
          id: 4,
          name: 'Robert Brown',
          email: 'robert.brown@email.com',
          phone: '(607) 555-0125',
          subject: 'Question about upcoming event',
          message: 'I\'m planning to attend the community potluck this Sunday but I\'m not sure what time it starts. Could you please confirm the details?',
          message_type: 'event',
          is_read: false,
          responded_at: null,
          created_at: '2025-09-05T13:45:00Z'
        }
      ];
      setMessages(mockMessages);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const handleEditMessage = (message) => {
    setEditingMessage(message);
    setIsModalOpen(true);
  };

  const handleDeleteMessage = async (message) => {
    if (window.confirm(`Are you sure you want to delete this message from ${message.name}?`)) {
      try {
        // In production, make API call to delete
        setMessages(messages.filter(m => m.id !== message.id));
        alert('Message deleted successfully!');
      } catch (error) {
        console.error('Error deleting message:', error);
        alert('Error deleting message. Please try again.');
      }
    }
  };

  const handleMarkAsRead = async (message) => {
    try {
      // In production, make API call to update
      setMessages(messages.map(m =>
        m.id === message.id
          ? { ...m, is_read: true, responded_at: m.responded_at || new Date().toISOString() }
          : m
      ));
      alert('Message marked as read!');
    } catch (error) {
      console.error('Error updating message:', error);
      alert('Error updating message. Please try again.');
    }
  };

  const handleSaveMessage = async (messageData) => {
    try {
      if (editingMessage) {
        // Update existing message
        setMessages(messages.map(m => m.id === editingMessage.id ? { ...messageData, id: editingMessage.id } : m));
        alert('Message updated successfully!');
      }
      setIsModalOpen(false);
      setEditingMessage(null);
    } catch (error) {
      console.error('Error saving message:', error);
      alert('Error saving message. Please try again.');
    }
  };

  const getMessageStats = () => {
    const total = messages.length;
    const unread = messages.filter(m => !m.is_read).length;
    const responded = messages.filter(m => m.responded_at).length;
    const thisWeek = messages.filter(m => {
      const messageDate = new Date(m.created_at);
      const now = new Date();
      const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
      return messageDate >= weekAgo;
    }).length;

    return { total, unread, responded, thisWeek };
  };

  const stats = getMessageStats();

  const messageFields = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'phone', label: 'Phone', type: 'tel' },
    { name: 'subject', label: 'Subject', type: 'text', required: true },
    { name: 'message', label: 'Message', type: 'textarea', rows: 4, required: true },
    {
      name: 'message_type',
      label: 'Type',
      type: 'select',
      options: [
        { value: 'general', label: 'General' },
        { value: 'prayer', label: 'Prayer' },
        { value: 'volunteer', label: 'Volunteer' },
        { value: 'event', label: 'Event' },
        { value: 'other', label: 'Other' }
      ]
    },
    { name: 'is_read', label: 'Mark as Read', type: 'checkbox' }
  ];

  const tableColumns = [
    { key: 'name', label: 'Name', type: 'text' },
    { key: 'email', label: 'Email', type: 'text' },
    { key: 'subject', label: 'Subject', type: 'text' },
    { key: 'message_type', label: 'Type', type: 'text' },
    { key: 'is_read', label: 'Read', type: 'boolean' },
    { key: 'created_at', label: 'Received', type: 'date' }
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
              <div className="text-3xl mr-4 text-blue-600">💬</div>
              <div>
                <p className="text-sm text-secondary-500">Total Messages</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="text-3xl mr-4 text-red-600">📧</div>
              <div>
                <p className="text-sm text-secondary-500">Unread</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.unread}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="text-3xl mr-4 text-green-600">✅</div>
              <div>
                <p className="text-sm text-secondary-500">Responded</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.responded}</p>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <option value="prayer">Prayer</option>
                <option value="volunteer">Volunteer</option>
                <option value="event">Event</option>
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
                <option value="unread">Unread</option>
                <option value="read">Read</option>
                <option value="responded">Responded</option>
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
                placeholder="Search messages..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <AdminDataTable
          title="Contact Messages"
          columns={tableColumns}
          data={filteredMessages}
          onEdit={handleEditMessage}
          onDelete={handleDeleteMessage}
          onDuplicate={null}
          onAdd={null}
          addButtonText=""
        />

        {/* Quick Actions */}
        <div className="mt-6 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-medium text-secondary-900 mb-4">Quick Actions</h3>
          <div className="flex flex-wrap gap-4">
            {filteredMessages.filter(m => !m.is_read).map(message => (
              <button
                key={message.id}
                onClick={() => handleMarkAsRead(message)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Mark as Read: {message.name}
              </button>
            ))}
          </div>
          {filteredMessages.filter(m => !m.is_read).length === 0 && (
            <p className="text-secondary-500">No unread messages to mark as read.</p>
          )}
        </div>
      </main>

      {/* Form Modal */}
      <AdminFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="View/Edit Message"
        fields={messageFields}
        initialData={editingMessage || {}}
        onSubmit={handleSaveMessage}
      />
    </div>
  );
}

export default AdminContactMessages;
