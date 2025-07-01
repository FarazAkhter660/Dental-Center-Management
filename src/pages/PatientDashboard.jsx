import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { getIncidents } from '../utils/localStorage';

const PatientDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [incidents, setIncidents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const allIncidents = getIncidents();
    const patientIncidents = allIncidents.filter((i) => i.patientId === user.patientId);
    setIncidents(patientIncidents);
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">Patient Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
        <h2 className="text-2xl font-semibold mb-4">Your Appointments</h2>
        <div className="bg-white shadow rounded-lg p-4">
          {incidents.length === 0 ? (
            <p>No appointments found.</p>
          ) : (
            <ul className="divide-y divide-gray-200">
              {incidents.map((incident) => (
                <li key={incident.id} className="py-2">
                  <p>
                    <span className="font-medium">Title:</span> {incident.title}
                  </p>
                  <p>
                    <span className="font-medium">Date:</span>{' '}
                    {new Date(incident.appointmentDate).toLocaleString()}
                  </p>
                  <p>
                    <span className="font-medium">Status擦
                    Status:</span> {incident.status}
                  </p>
                  <p>
                    <span className="font-medium">Cost:</span> ${incident.cost || 'N/A'}
                  </p>
                  <p>
                    <span className="font-medium">Treatment:</span> {incident.treatment || 'N/A'}
                  </p>
                  {incident.files.length > 0 && (
                    <p>
                      <span className="font-medium">Files:</span>{' '}
                      {incident.files.map((file, index) => (
                        <a
                          key={index}
                          href={file.url}
                          download={file.name}
                          className="text-blue-500 hover:underline"
                        >
                          {file.name}
                        </a>
                      )).reduce((prev, curr) => [prev, ', ', curr])}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;