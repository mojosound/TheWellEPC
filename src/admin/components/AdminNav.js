import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function AdminNav() {
  const location = useLocation();

  const navItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/events', label: 'Events', icon: '📅' },
    { path: '/admin/sermons', label: 'Sermons', icon: '📖' },
    { path: '/admin/announcements', label: 'Announcements', icon: '📢' },
    { path: '/admin/ministries', label: 'Ministries', icon: '🤝' },
    { path: '/admin/prayer-requests', label: 'Prayer Requests', icon: '🙏' },
    { path: '/admin/contact-messages', label: 'Messages', icon: '💬' },
    { path: '/admin/newsletter', label: 'Newsletter', icon: '📧' },
    { path: '/admin/users', label: 'Users', icon: '👥' }
  ];

  return (
    <nav className="bg-secondary-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/admin/dashboard" className="text-xl font-bold">
                Admin Panel
              </Link>
            </div>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 flex items-center ${
                      location.pathname === item.path
                        ? 'bg-secondary-700 text-white'
                        : 'text-secondary-300 hover:bg-secondary-700 hover:text-white'
                    }`}
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <Link
              to="/"
              target="_blank"
              className="text-secondary-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              View Site
            </Link>
            <button
              onClick={() => {
                localStorage.removeItem('adminAuthenticated');
                localStorage.removeItem('adminUser');
                window.location.href = '/admin/login';
              }}
              className="ml-4 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  location.pathname === item.path
                    ? 'bg-secondary-700 text-white'
                    : 'text-secondary-300 hover:bg-secondary-700 hover:text-white'
                }`}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default AdminNav;
