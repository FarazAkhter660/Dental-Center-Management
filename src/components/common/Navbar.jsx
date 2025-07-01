import { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user || user.role !== 'Admin') return null;

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center">
        <div className="text-xl font-bold mb-2 sm:mb-0">Dental Dashboard</div>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <NavLink
            to="/dashboard/patients"
            className={({ isActive }) =>
              isActive ? 'underline font-semibold' : 'hover:underline'
            }
          >
            Patients
          </NavLink>
          <NavLink
            to="/dashboard/appointments"
            className={({ isActive }) =>
              isActive ? 'underline font-semibold' : 'hover:underline'
            }
          >
            Appointments
          </NavLink>
          <NavLink
            to="/dashboard/calendar"
            className={({ isActive }) =>
              isActive ? 'underline font-semibold' : 'hover:underline'
            }
          >
            Calendar
          </NavLink>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;