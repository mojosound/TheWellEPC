import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNav from '../components/AdminNav';
import AdminDataTable from '../components/AdminDataTable';
import AdminFormModal from '../components/AdminFormModal';

function AdminPrayerRequests() {
  const [prayerRequests, setPrayerRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRequest, setEditingRequest] = useState(null);
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

    loadPrayerRequests();
  }, [navigate]);

  useEffect(() => {
    // Filter prayer requests based on current filters
    let filtered = prayerRequests;

    if (typeFilter !== 'all') {
      filtered = filtered.filter(request => request.request_type === typeFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(request => request.status === statusFilter);
    }

    if (searchTerm) {
      filtered = filtered.filter(request =>
        request.requester_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.request_text.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredRequests(filtered);
  }, [prayerRequests, typeFilter, statusFilter, searchTerm]);

  const loadPrayerRequests = async () => {
    try {
      // Mock data - in production, fetch from your API
      const mockRequests = [
        {
          id: 1,
          requester_name: 'John Smith',
          requester_email: 'john.smith@email.com',
          request_type: 'personal',
          request_text: 'Please pray for my upcoming job interview and for wisdom in making the right decision.',
          is_public: false,
          is_urgent: false,
          status: 'active',
          submitted_at: '2025-09-05T10:30:00Z'
        },
        {
          id: 2,
          requester_name: 'Anonymous',
          request_type: 'family',
          request_text: 'Please pray for healing for my mother who is in the hospital. She had surgery yesterday.',
          is_public: true,
          is_urgent: true,
          status: 'active',
          submitted_at: '2025-09-04T14:15:00Z'
        },
        {
          id: 3,
          requester_name: 'Mary Johnson',
          requester_email: 'mary.johnson@email.com',
          request_type: 'community',
          request_text: 'Prayers needed for our community as we recover from recent flooding. Many families have lost homes.',
          is_public: true,
          is_urgent: false,
          status: 'active',
          submitted_at: '2025-09-03T09:45:00Z'
        },
        {
          id: 4,
          requester_name: 'David Wilson',
          requester_email: 'david.wilson@email.com',
          request_type: 'personal',
          request_text: 'Thank you for praying for my recovery. I\'m doing much better now and back home from the hospital.',
          is_public: false,
          is_urgent: false,
          status: 'answered',
          submitted_at: '2025-08-20T16:20:00Z'
        }
      ];
      setPrayerRequests(mockRequests);
    } catch (error) {
      console.error('Error loading prayer requests:', error);
    }
  };

  const handleAddRequest = () => {
    setEditingRequest(null);
    setIsModalOpen(true);
  };

  const handleEditRequest = (request) => {
    setEditingRequest(request);
    setIsModalOpen(true);
  };

  const handleDeleteRequest = async (request) => {
    if (window.confirm(`Are you sure you want to delete this prayer request?`)) {
      try {
        // In production, make API call to delete
        setPrayerRequests(prayerRequests.filter(r => r.id !== request.id));
        alert('Prayer request deleted successfully!');
      } catch (error) {
        console.error('Error deleting prayer request:', error);
        alert('Error deleting prayer request. Please try again.');
      }
    }
  };

  const handleDuplicateRequest = (request) => {
    const duplicatedRequest = {
      ...request,
      id: Date.now(),
      submitted_at: new Date().toISOString()
    };
    setPrayerRequests([...prayerRequests, duplicatedRequest]);
    alert('Prayer request duplicated successfully!');
  };

  const handleSaveRequest = async (requestData) => {
    try {
      if (editingRequest) {
        // Update existing request
        setPrayerRequests(prayerRequests.map(r => r.id === editingRequest.id ? { ...requestData, id: editingRequest.id } : r));
        alert('Prayer request updated successfully!');
      } else {
        // Add new request
        const newRequest = {
          ...requestData,
          id: Date.now(),
          submitted_at: new Date().toISOString()
        };
        setPrayerRequests([...prayerRequests, newRequest]);
        alert('Prayer request added successfully!');
      }
      setIsModalOpen(false);
      setEditingRequest(null);
    } catch (error) {
      console.error('Error saving prayer request:', error);
      alert('Error saving prayer request. Please try again.');
    }
  };

  const getRequestStats = () => {
    const total = prayerRequests.length;
    const active = prayerRequests.filter(r => r.status === 'active').length;
    const urgent = prayerRequests.filter(r => r.is_urgent).length;
    const publicRequests = prayerRequests.filter(r => r.is_public).length;

    return { total, active, urgent, publicRequests };
  };

  const stats = getRequestStats();

  const requestFields = [
    { name: 'requester_name', label: 'Requester Name', type: 'text' },
    { name: 'requester_email', label: 'Requester Email', type: 'email' },
    {
      name: 'request_type',
      label: 'Request Type',
      type: 'select',
      options: [
        { value: 'personal', label: 'Personal' },
        { value: 'family', label: 'Family' },
        { value: 'community', label: 'Community' },
        { value: 'other', label: 'Other' }
      ],
      required: true
    },
    { name: 'request_text', label: 'Prayer Request', type: 'textarea', rows: 4, required: true },
    { name: 'is_public', label: 'Public Request', type: 'checkbox' },
    { name: 'is_urgent', label: 'Urgent', type: 'checkbox' },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { value: 'active', label: 'Active' },
        { value: 'answered', label: 'Answered' },
        { value: 'closed', label: 'Closed' }
      ]
    }
  ];

  const tableColumns = [
    { key: 'requester_name', label: 'Requester', type: 'text' },
    { key: 'request_type', label: 'Type', type: 'text' },
    { key: 'request_text', label: 'Request', type: 'text' },
    { key: 'is_public', label: 'Public', type: 'boolean' },
    { key: 'is_urgent', label: 'Urgent', type: 'boolean' },
    { key: 'status', label: 'Status', type: 'text' }
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
              <div className="text-3xl mr-4 text-blue-600">🙏</div>
              <div>
                <p className="text-sm text-secondary-500">Total Requests</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="text-3xl mr-4 text-green-600">📝</div>
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
              <div className="text-3xl mr-4 text-purple-600">🌍</div>
              <div>
                <p className="text-sm text-secondary-500">Public</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.publicRequests}</p>
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
                <option value="personal">Personal</option>
                <option value="family">Family</option>
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
                <option value="answered">Answered</option>
                <option value="closed">Closed</option>
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
                placeholder="Search requests..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <AdminDataTable
          title="Prayer Requests"
          columns={tableColumns}
          data={filteredRequests}
          onEdit={handleEditRequest}
          onDelete={handleDeleteRequest}
          onDuplicate={handleDuplicateRequest}
          onAdd={handleAddRequest}
          addButtonText="Add Prayer Request"
        />
      </main>

      {/* Form Modal */}
      <AdminFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingRequest ? 'Edit Prayer Request' : 'Add New Prayer Request'}
        fields={requestFields}
        initialData={editingRequest || {}}
        onSubmit={handleSaveRequest}
      />
    </div>
  );
}

export default AdminPrayerRequests;
