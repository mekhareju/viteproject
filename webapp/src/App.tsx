import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Home from './Home';
import About from './About';
import Login from './Login';
import SignUp from './SignUp';
import UserProfile from './UserProfile';
import AdminPage from './AdminPage';
import Marketplace from './Marketplace';
import ProtectedRoute from './ProtectedRoute';
import { AbilityProvider, defineAbilityFor } from './casl/AbilityContext';

const App: React.FC = () => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const userRole = localStorage.getItem('userRole') || 'guest';
    setRole(userRole);
  }, []);

  const ability = defineAbilityFor(role || 'guest');

  return (
    <AbilityProvider ability={ability}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/marketplace" element={<Marketplace />} />

          {/* Protected Routes */}
          <Route
            path="/profile/:id"
            element={
              <ProtectedRoute
                allowedRoles={['user', 'admin']}
                action="read"
                subject="UserProfile"
              >
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute
                allowedRoles={['admin']}
                action="read"
                subject="AdminPage"
              >
                <AdminPage />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </Router>
    </AbilityProvider>
  );
};

export default App;
