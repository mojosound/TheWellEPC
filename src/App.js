import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Services from './Services';
import Ministries from './Ministries';
import Events from './Events';
import Community from './Community';
import Contact from './Contact';
import PrayerRequests from './PrayerRequests';

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
        <Route path="/services" element={<Services />} />
        <Route path="/ministries" element={<Ministries />} />
        <Route path="/events" element={<Events />} />
        <Route path="/community" element={<Community />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/prayer-requests" element={<PrayerRequests />} />

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
