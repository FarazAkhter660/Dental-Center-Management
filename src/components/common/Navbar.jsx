import { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
// import CalendarView from '../../pages/CalendarView';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user || user.role !== 'Admin') return null;

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold">Dental Dashboard</div>
        <button
          className="sm:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16m-7 6h7'}
            />
          </svg>
        </button>
        <div className={`sm:flex sm:space-x-4 ${isOpen ? 'block' : 'hidden'} sm:block mt-4 sm:mt-0`}>
          <NavLink
            to="/dashboard/patients"
            className={({ isActive }) =>
              isActive
                ? 'block py-2 px-4 bg-blue-700 rounded-lg font-semibold'
                : 'block py-2 px-4 hover:bg-blue-700 rounded-lg transition duration-200'
            }
          >
            Patients
          </NavLink>
          <NavLink
            to="/dashboard/appointments"
            className={({ isActive }) =>
              isActive
                ? 'block py-2 px-4 bg-blue-700 rounded-lg font-semibold'
                : 'block py-2 px-4 hover:bg-blue-700 rounded-lg transition duration-200'
            }
          >
            Appointments
          </NavLink>
          <NavLink
            to = "/dashboard/calendar"
            className={({ isActive }) =>
              isActive
                ? 'block py-2 px-4 bg-blue-700 rounded-lg font-semibold'
                : 'block py-2 px-4 hover:bg-blue-700 rounded-lg transition duration-200'
            }
          >
            Calendar
          </NavLink>
          <button
            onClick={handleLogout}
            className="btn-danger mt-2 sm:mt-0 w-full sm:w-auto"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;