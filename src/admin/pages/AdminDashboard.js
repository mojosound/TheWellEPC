import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminNav from '../components/AdminNav';

function AdminDashboard() {
  const [stats, setStats] = useState({
    events: 0,
    sermons: 0,
    announcements: 0,
    prayerRequests: 0,
    contactMessages: 0
  });
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication
    const isAuthenticated = localStorage.getItem('adminAuthenticated');
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }

    // Load dashboard stats (in production, this would fetch from API)
    loadDashboardStats();
  }, [navigate]);

  const loadDashboardStats = async () => {
    try {
      // Mock data - in production, fetch from your API
      setStats({
        events: 12,
        sermons: 45,
        announcements: 8,
        prayerRequests: 23,
        contactMessages: 15
      });
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
    }
  };

  const adminMenuItems = [
    {
      title: 'Events',
      description: 'Manage church events and activities',
      icon: '📅',
      path: '/admin/events',
      count: stats.events,
      color: 'bg-blue-500'
    },
    {
      title: 'Sermons',
      description: 'Manage sermon archives and media',
      icon: '📖',
      path: '/admin/sermons',
      count: stats.sermons,
      color: 'bg-green-500'
    },
    {
      title: 'Announcements',
      description: 'Create and manage church announcements',
      icon: '📢',
      path: '/admin/announcements',
      count: stats.announcements,
      color: 'bg-yellow-500'
    },
    {
      title: 'Ministries',
      description: 'Manage church ministries and volunteers',
      icon: '🤝',
      path: '/admin/ministries',
      count: 6,
      color: 'bg-purple-500'
    },
    {
      title: 'Prayer Requests',
      description: 'Review and manage prayer requests',
      icon: '🙏',
      path: '/admin/prayer-requests',
      count: stats.prayerRequests,
      color: 'bg-red-500'
    },
    {
      title: 'Contact Messages',
      description: 'View and respond to contact form submissions',
      icon: '💬',
      path: '/admin/contact-messages',
      count: stats.contactMessages,
      color: 'bg-indigo-500'
    },
    {
      title: 'Newsletter',
      description: 'Manage email subscriptions',
      icon: '📧',
      path: '/admin/newsletter',
      count: 156,
      color: 'bg-teal-500'
    },
    {
      title: 'Users',
      description: 'Manage user accounts and permissions',
      icon: '👥',
      path: '/admin/users',
      count: 89,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="min-h-screen bg-amber-50">
      {/* Admin Navigation */}
      <AdminNav />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-secondary-900 mb-2">Welcome to Admin Panel</h2>
          <p className="text-secondary-600">Manage your church website content and community engagement</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="text-3xl mr-4">📅</div>
              <div>
                <p className="text-sm text-secondary-500">Active Events</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.events}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="text-3xl mr-4">📖</div>
              <div>
                <p className="text-sm text-secondary-500">Sermons</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.sermons}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="text-3xl mr-4">🙏</div>
              <div>
                <p className="text-sm text-secondary-500">Prayer Requests</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.prayerRequests}</p>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center">
              <div className="text-3xl mr-4">💬</div>
              <div>
                <p className="text-sm text-secondary-500">Messages</p>
                <p className="text-2xl font-bold text-secondary-900">{stats.contactMessages}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Admin Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {adminMenuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-gray-200 hover:border-cyan-300"
            >
              <div className="flex items-center mb-4">
                <div className={`text-3xl mr-3 ${item.color} text-white p-2 rounded-lg`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-secondary-900">{item.title}</h3>
                  <span className="text-sm text-secondary-500">{item.count} items</span>
                </div>
              </div>
              <p className="text-secondary-600 text-sm">{item.description}</p>
            </Link>
          ))}
        </div>

        {/* Recent Activity */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-secondary-900 mb-6">Recent Activity</h3>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              <div className="flex items-center py-2 border-b border-gray-100">
                <div className="text-cyan-600 mr-4">📅</div>
                <div className="flex-1">
                  <p className="text-secondary-900">New event "Community Potluck" created</p>
                  <p className="text-sm text-secondary-500">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center py-2 border-b border-gray-100">
                <div className="text-green-600 mr-4">📖</div>
                <div className="flex-1">
                  <p className="text-secondary-900">Sermon "Walking in Faith" uploaded</p>
                  <p className="text-sm text-secondary-500">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center py-2">
                <div className="text-purple-600 mr-4">💬</div>
                <div className="flex-1">
                  <p className="text-secondary-900">5 new contact form submissions</p>
                  <p className="text-sm text-secondary-500">2 days ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;
