import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Registration from './components/Registration';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default AppRouter; 