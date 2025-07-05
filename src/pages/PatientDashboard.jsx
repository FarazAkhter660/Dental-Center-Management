import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { getIncidents } from "../utils/localStorage";

const PatientDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [incidents, setIncidents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const allIncidents = getIncidents();
    const patientIncidents = allIncidents.filter(
      (i) => i.patientId === user.patientId
    );
    setIncidents(patientIncidents);
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Patient Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
          >
            Logout
          </button>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Your Appointments
          </h2>
          {incidents.length === 0 ? (
            <p className="text-gray-600">No appointments found.</p>
          ) : (
            <div className="grid gap-4">
              {incidents.map((incident) => (
                <div
                  key={incident.id}
                  className="border-l-4 border-blue-600 p-4 bg-gray-50 rounded-lg"
                >
                  <p className="text-gray-700">
                    <span className="font-medium">Title:</span> {incident.title}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Date:</span>{" "}
                    {new Date(incident.appointmentDate).toLocaleString()}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Status:</span>{" "}
                    {incident.status}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Cost:</span> $
                    {incident.cost || "N/A"}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-medium">Treatment:</span>{" "}
                    {incident.treatment || "N/A"}
                  </p>
                  {incident.files.length > 0 && (
                    <p className="text-gray-700">
                      <span className="font-medium">Files:</span>{" "}
                      {incident.files
                        .map((file, index) => (
                          <a
                            key={index}
                            href={file.url}
                            download={file.name}
                            className="text-blue-600 hover:underline"
                          >
                            {file.name}
                          </a>
                        ))
                        .reduce((prev, curr) => [prev, ", ", curr])}
                    </p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;
