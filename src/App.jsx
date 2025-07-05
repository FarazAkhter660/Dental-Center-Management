import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Login from '../src/pages/Login'
import Dashboard from './pages/Dashboard';
import PatientDashboard from './pages/PatientDashboard';
import PatientManagement from '../src/pages/PatientManagement';
import AppointmentManagement from './pages/AppointmentManagement';
import { initializeData } from './utils/localStorage';
import './index.css';
import CalendarView from './pages/CalendarView';

function App() {
  useEffect(() => {
    initializeData();
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute role="Admin">
                <Dashboard />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="patients" />} />
            <Route path="patients" element={<PatientManagement />} />
            <Route path="appointments" element={<AppointmentManagement />} />
            <Route path="calendar" element={<CalendarView />} />
          </Route>
          <Route
            path="/patient"
            element={
              <ProtectedRoute role="Patient">
                <PatientDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;