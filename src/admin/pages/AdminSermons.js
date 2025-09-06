import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminNav from '../components/AdminNav';
import AdminDataTable from '../components/AdminDataTable';
import AdminFormModal from '../components/AdminFormModal';

function AdminSermons() {
  const [sermons, setSermons] = useState([]);
  const [filteredSermons, setFilteredSermons] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSermon, setEditingSermon] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }

    loadSermons();
  }, [navigate]);

  useEffect(() => {
    // Filter sermons based on search term
    let filtered = sermons;

    if (searchTerm) {
      filtered = filtered.filter(sermon =>
        sermon.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sermon.speaker.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sermon.series_name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredSermons(filtered);
  }, [sermons, searchTerm]);

  const loadSermons = async () => {
    try {
      // Mock data - in production, fetch from your API
      const mockSermons = [
        {
          id: 1,
          title: 'Walking in Faith',
          speaker: 'Pastor Adam Hungerford',
          sermon_date: '2025-09-01',
          scripture_reference: 'Hebrews 11:1-12',
          description: 'An exploration of what it means to walk by faith and not by sight',
          series_name: 'Faith Journey',
          tags: 'faith, trust, Hebrews',
          audio_url: 'https://example.com/sermons/walking-in-faith.mp3',
          video_url: 'https://example.com/sermons/walking-in-faith.mp4',
          is_featured: true,
          created_at: '2025-09-01T10:00:00Z'
        },
        {
          id: 2,
          title: 'The Power of Prayer',
          speaker: 'Pastor Adam Hungerford',
          sermon_date: '2025-08-25',
          scripture_reference: 'Matthew 6:5-15',
          description: 'Understanding the importance and practice of prayer in the Christian life',
          series_name: 'Spiritual Disciplines',
          tags: 'prayer, Matthew, spiritual growth',
          audio_url: 'https://example.com/sermons/power-of-prayer.mp3',
          video_url: 'https://example.com/sermons/power-of-prayer.mp4',
          is_featured: false,
          created_at: '2025-08-25T10:00:00Z'
        },
        {
          id: 3,
          title: 'Love Your Neighbor',
          speaker: 'Guest Speaker - Sarah Williams',
          sermon_date: '2025-08-18',
          scripture_reference: 'Luke 10:25-37',
          description: 'The parable of the Good Samaritan and what it teaches us about loving our neighbors',
          series_name: 'Kingdom Living',
          tags: 'love, neighbor, Luke, parable',
          audio_url: 'https://example.com/sermons/love-your-neighbor.mp3',
          video_url: 'https://example.com/sermons/love-your-neighbor.mp4',
          is_featured: true,
          created_at: '2025-08-18T10:00:00Z'
        }
      ];
      setSermons(mockSermons);
    } catch (error) {
      console.error('Error loading sermons:', error);
    }
  };

  const handleAddSermon = () => {
    setEditingSermon(null);
    setIsModalOpen(true);
  };

  const handleEditSermon = (sermon) => {
    setEditingSermon(sermon);
    setIsModalOpen(true);
  };

  const handleDeleteSermon = async (sermon) => {
    if (window.confirm(`Are you sure you want to delete "${sermon.title}"?`)) {
      try {
        // In production, make API call to delete
        setSermons(sermons.filter(s => s.id !== sermon.id));
        alert('Sermon deleted successfully!');
      } catch (error) {
        console.error('Error deleting sermon:', error);
        alert('Error deleting sermon. Please try again.');
      }
    }
  };

  const handleDuplicateSermon = (sermon) => {
    const duplicatedSermon = {
      ...sermon,
      id: Date.now(),
      title: `${sermon.title} (Copy)`,
      sermon_date: new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString()
    };
    setSermons([...sermons, duplicatedSermon]);
    alert('Sermon duplicated successfully!');
  };

  const handleSaveSermon = async (sermonData) => {
    try {
      if (editingSermon) {
        // Update existing sermon
        setSermons(sermons.map(s => s.id === editingSermon.id ? { ...sermonData, id: editingSermon.id } : s));
        alert('Sermon updated successfully!');
      } else {
        // Add new sermon
        const newSermon = {
          ...sermonData,
          id: Date.now(),
          created_at: new Date().toISOString()
        };
        setSermons([...sermons, newSermon]);
        alert('Sermon added successfully!');
      }
      setIsModalOpen(false);
      setEditingSermon(null);
    } catch (error) {
      console.error('Error saving sermon:', error);
      alert('Error saving sermon. Please try again.');
    }
  };

  const getSermonStats = () => {
    const total = sermons.length;
    const featured = sermons.filter(s => s.is_featured).length;
    const thisMonth = sermons.filter(s => {
      const sermonDate = new Date(s.sermon_date);
      const now = new Date();
      return sermonDate.getMonth() === now.getMonth() && sermonDate.getFullYear() === now.getFullYear();
    }).length;

    return { total, featured, thisMonth };
  };

  const stats = getSermonStats();

  const sermonFields = [
    { name: 'title', label: 'Sermon Title', type: 'text', required: true },
    { name: 'speaker', label: 'Speaker', type: 'text', required: true },
    { name: 'sermon_date', label: 'Sermon Date', type: 'date', required: true },
    { name: 'scripture_reference', label: 'Scripture Reference', type: 'text' },
    { name: 'description', label: 'Description', type: 'textarea', rows: 3 },
    { name: 'series_name', label: 'Series Name', type: 'text' },
    { name: 'tags', label: 'Tags', type: 'text' },
    { name: 'audio_url', label: 'Audio URL', type: 'url' },
    { name: 'video_url', label: 'Video URL', type: 'url' },
    { name: 'is_featured', label: 'Featured Sermon', type: 'checkbox' }
  ];

  const tableColumns = [
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'speaker', label: 'Speaker', type: 'text' },
    { key: 'sermon_date', label: 'Date', type: 'date' },
    { key: 'series_name', label: 'Series', type: 'text' },
    { key: 'is_featured', label: 'Featured', type: 'boolean' }
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
              <div className="text-3xl mr-4 text-blue-600">📚</div>
              <div>
                <p className="text-sm text-secondary-500">Total Sermons</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.total}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="text-3xl mr-4 text-green-600">⭐</div>
              <div>
                <p className="text-sm text-secondary-500">Featured</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.featured}</p>
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

        {/* Search */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Search Sermons
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, speaker, or series..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <AdminDataTable
          title="Church Sermons"
          columns={tableColumns}
          data={filteredSermons}
          onEdit={handleEditSermon}
          onDelete={handleDeleteSermon}
          onDuplicate={handleDuplicateSermon}
          onAdd={handleAddSermon}
          addButtonText="Add Sermon"
        />
      </main>

      {/* Form Modal */}
      <AdminFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSermon ? 'Edit Sermon' : 'Add New Sermon'}
        fields={sermonFields}
        initialData={editingSermon || {}}
        onSubmit={handleSaveSermon}
      />
    </div>
  );
}

export default AdminSermons;
