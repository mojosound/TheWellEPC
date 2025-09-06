import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';

// Admin imports
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminEvents from './admin/pages/AdminEvents';
import AdminSermons from './admin/pages/AdminSermons';
import AdminAnnouncements from './admin/pages/AdminAnnouncements';
import AdminMinistries from './admin/pages/AdminMinistries';
import AdminPrayerRequests from './admin/pages/AdminPrayerRequests';
import AdminContactMessages from './admin/pages/AdminContactMessages';
import AdminNewsletter from './admin/pages/AdminNewsletter';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* Placeholder routes for future pages */}
        <Route path="/services" element={<Home />} />
        <Route path="/ministries" element={<Home />} />
        <Route path="/events" element={<Home />} />
        <Route path="/community" element={<Home />} />
        <Route path="/contact" element={<Home />} />

        {/* Admin routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/events" element={<AdminEvents />} />
        <Route path="/admin/sermons" element={<AdminSermons />} />
        <Route path="/admin/announcements" element={<AdminAnnouncements />} />
        <Route path="/admin/ministries" element={<AdminMinistries />} />
        <Route path="/admin/prayer-requests" element={<AdminPrayerRequests />} />
        <Route path="/admin/contact-messages" element={<AdminContactMessages />} />
        <Route path="/admin/newsletter" element={<AdminNewsletter />} />
      </Routes>
    </Router>
  );
}

export default App;
