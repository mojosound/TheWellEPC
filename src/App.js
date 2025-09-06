import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';

// Admin imports
import AdminLogin from './admin/pages/AdminLogin';
import AdminDashboard from './admin/pages/AdminDashboard';
import AdminEvents from './admin/pages/AdminEvents';

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
        {/* Placeholder admin routes */}
        <Route path="/admin/sermons" element={<AdminDashboard />} />
        <Route path="/admin/announcements" element={<AdminDashboard />} />
        <Route path="/admin/ministries" element={<AdminDashboard />} />
        <Route path="/admin/prayer-requests" element={<AdminDashboard />} />
        <Route path="/admin/contact-messages" element={<AdminDashboard />} />
        <Route path="/admin/newsletter" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
