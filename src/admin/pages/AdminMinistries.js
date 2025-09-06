import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNav from '../components/AdminNav';
import AdminDataTable from '../components/AdminDataTable';
import AdminFormModal from '../components/AdminFormModal';

function AdminMinistries() {
  const [ministries, setMinistries] = useState([]);
  const [filteredMinistries, setFilteredMinistries] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMinistry, setEditingMinistry] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }

    loadMinistries();
  }, [navigate]);

  useEffect(() => {
    // Filter ministries based on search term
    let filtered = ministries;

    if (searchTerm) {
      filtered = filtered.filter(ministry =>
        ministry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ministry.leader_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ministry.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMinistries(filtered);
  }, [ministries, searchTerm]);

  const loadMinistries = async () => {
    try {
      // Mock data - in production, fetch from your API
      const mockMinistries = [
        {
          id: 1,
          name: 'Youth Ministry',
          description: 'Reaching and discipling young people ages 12-18 through weekly meetings, events, and mentorship.',
          leader_name: 'Sarah Williams',
          leader_email: 'youth@thewellepc.org',
          leader_phone: '(607) 555-0123',
          meeting_schedule: 'Every Wednesday, 7:00 PM - 9:00 PM',
          meeting_location: 'Youth Room',
          volunteer_needs: 'Small group leaders, event coordinators, musicians',
          is_active: true,
          created_at: '2025-01-15T10:00:00Z'
        },
        {
          id: 2,
          name: 'Worship Ministry',
          description: 'Leading congregational worship through music, creating an atmosphere for spiritual connection and praise.',
          leader_name: 'Michael Johnson',
          leader_email: 'worship@thewellepc.org',
          leader_phone: '(607) 555-0124',
          meeting_schedule: 'Every Tuesday, 7:00 PM - 9:00 PM',
          meeting_location: 'Sanctuary',
          volunteer_needs: 'Vocalists, instrumentalists, sound technicians, worship leaders',
          is_active: true,
          created_at: '2025-01-10T10:00:00Z'
        },
        {
          id: 3,
          name: 'Community Outreach',
          description: 'Serving our local community through various outreach programs, food drives, and service projects.',
          leader_name: 'Jennifer Davis',
          leader_email: 'outreach@thewellepc.org',
          leader_phone: '(607) 555-0125',
          meeting_schedule: 'Second Saturday of each month, 9:00 AM - 12:00 PM',
          meeting_location: 'Fellowship Hall',
          volunteer_needs: 'Event coordinators, drivers, food preparation volunteers',
          is_active: true,
          created_at: '2025-02-01T10:00:00Z'
        },
        {
          id: 4,
          name: 'Children\'s Ministry',
          description: 'Nurturing faith in children ages 3-11 through Sunday school, special events, and family programs.',
          leader_name: 'Emily Chen',
          leader_email: 'children@thewellepc.org',
          leader_phone: '(607) 555-0126',
          meeting_schedule: 'Every Sunday, 9:30 AM - 10:30 AM',
          meeting_location: 'Children\'s Wing',
          volunteer_needs: 'Sunday school teachers, nursery workers, event helpers',
          is_active: true,
          created_at: '2025-01-20T10:00:00Z'
        }
      ];
      setMinistries(mockMinistries);
    } catch (error) {
      console.error('Error loading ministries:', error);
    }
  };

  const handleAddMinistry = () => {
    setEditingMinistry(null);
    setIsModalOpen(true);
  };

  const handleEditMinistry = (ministry) => {
    setEditingMinistry(ministry);
    setIsModalOpen(true);
  };

  const handleDeleteMinistry = async (ministry) => {
    if (window.confirm(`Are you sure you want to delete "${ministry.name}"?`)) {
      try {
        // In production, make API call to delete
        setMinistries(ministries.filter(m => m.id !== ministry.id));
        alert('Ministry deleted successfully!');
      } catch (error) {
        console.error('Error deleting ministry:', error);
        alert('Error deleting ministry. Please try again.');
      }
    }
  };

  const handleDuplicateMinistry = (ministry) => {
    const duplicatedMinistry = {
      ...ministry,
      id: Date.now(),
      name: `${ministry.name} (Copy)`,
      created_at: new Date().toISOString()
    };
    setMinistries([...ministries, duplicatedMinistry]);
    alert('Ministry duplicated successfully!');
  };

  const handleSaveMinistry = async (ministryData) => {
    try {
      if (editingMinistry) {
        // Update existing ministry
        setMinistries(ministries.map(m => m.id === editingMinistry.id ? { ...ministryData, id: editingMinistry.id } : m));
        alert('Ministry updated successfully!');
      } else {
        // Add new ministry
        const newMinistry = {
          ...ministryData,
          id: Date.now(),
          created_at: new Date().toISOString()
        };
        setMinistries([...ministries, newMinistry]);
        alert('Ministry added successfully!');
      }
      setIsModalOpen(false);
      setEditingMinistry(null);
    } catch (error) {
      console.error('Error saving ministry:', error);
      alert('Error saving ministry. Please try again.');
    }
  };

  const getMinistryStats = () => {
    const total = ministries.length;
    const active = ministries.filter(m => m.is_active).length;
    const withVolunteers = ministries.filter(m => m.volunteer_needs && m.volunteer_needs.trim() !== '').length;

    return { total, active, withVolunteers };
  };

  const stats = getMinistryStats();

  const ministryFields = [
    { name: 'name', label: 'Ministry Name', type: 'text', required: true },
    { name: 'description', label: 'Description', type: 'textarea', rows: 3 },
    { name: 'leader_name', label: 'Leader Name', type: 'text' },
    { name: 'leader_email', label: 'Leader Email', type: 'email' },
    { name: 'leader_phone', label: 'Leader Phone', type: 'tel' },
    { name: 'meeting_schedule', label: 'Meeting Schedule', type: 'text' },
    { name: 'meeting_location', label: 'Meeting Location', type: 'text' },
    { name: 'volunteer_needs', label: 'Volunteer Needs', type: 'textarea', rows: 2 },
    { name: 'is_active', label: 'Active', type: 'checkbox' }
  ];

  const tableColumns = [
    { key: 'name', label: 'Ministry Name', type: 'text' },
    { key: 'leader_name', label: 'Leader', type: 'text' },
    { key: 'meeting_schedule', label: 'Schedule', type: 'text' },
    { key: 'meeting_location', label: 'Location', type: 'text' },
    { key: 'is_active', label: 'Active', type: 'boolean' }
  ];

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Admin Navigation */}
      <AdminNav />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="text-3xl mr-4 text-blue-600">⛪</div>
              <div>
                <p className="text-sm text-secondary-500">Total Ministries</p>
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
              <div className="text-3xl mr-4 text-purple-600">🤝</div>
              <div>
                <p className="text-sm text-secondary-500">Need Volunteers</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.withVolunteers}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Search Ministries
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, leader, or description..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <AdminDataTable
          title="Church Ministries"
          columns={tableColumns}
          data={filteredMinistries}
          onEdit={handleEditMinistry}
          onDelete={handleDeleteMinistry}
          onDuplicate={handleDuplicateMinistry}
          onAdd={handleAddMinistry}
          addButtonText="Add Ministry"
        />
      </main>

      {/* Form Modal */}
      <AdminFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingMinistry ? 'Edit Ministry' : 'Add New Ministry'}
        fields={ministryFields}
        initialData={editingMinistry || {}}
        onSubmit={handleSaveMinistry}
      />
    </div>
  );
}

export default AdminMinistries;
