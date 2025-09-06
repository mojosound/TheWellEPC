import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        {/* Placeholder routes for future pages */}
        <Route path="/services" element={<Home />} />
        <Route path="/ministries" element={<Home />} />
        <Route path="/events" element={<Home />} />
        <Route path="/community" element={<Home />} />
        <Route path="/contact" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
