import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { user } = useContext(AuthContext);
  if (!user || (role && user.role !== role)) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;