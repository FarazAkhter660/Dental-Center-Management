import { useEffect, useState } from 'react';
import IncidentForm from '../components/admin/IncidentForm';
import { getIncidents, saveIncidents, getPatients } from '../utils/localStorage';

const AppointmentManagement = () => {
  const [incidents, setIncidents] = useState([]);
  const [editingIncident, setEditingIncident] = useState(null);
  const patients = getPatients();

  useEffect(() => {
    setIncidents(getIncidents());
  }, []);

  const handleAddIncident = (incident) => {
    const updatedIncidents = [...incidents, { ...incident, id: `i${incidents.length + 1}` }];
    setIncidents(updatedIncidents);
    saveIncidents(updatedIncidents);
  };

  const handleUpdateIncident = (updatedIncident) => {
    const updatedIncidents = incidents.map((i) =>
      i.id === updatedIncident.id ? updatedIncident : i
    );
    setIncidents(updatedIncidents);
    saveIncidents(updatedIncidents);
    setEditingIncident(null);
  };

  const handleDeleteIncident = (id) => {
    const updatedIncidents = incidents.filter((i) => i.id !== id);
    setIncidents(updatedIncidents);
    saveIncidents(updatedIncidents);
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Appointments</h2>
        <IncidentForm
          onSubmit={editingIncident ? handleUpdateIncident : handleAddIncident}
          initialData={editingIncident}
          onCancel={() => setEditingIncident(null)}
        />
        <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Appointment List</h3>
          {incidents.length === 0 ? (
            <p className="text-gray-600">No appointments found.</p>
          ) : (
            <div className="grid gap-4">
              {incidents.map((incident) => {
                const patient = patients.find((p) => p.id === incident.patientId);
                return (
                  <div key={incident.id} className="border-l-4 border-blue-600 p-4 bg-gray-50 rounded-lg flex justify-between items-start">
                    <div>
                      <p className="text-gray-700"><span className="font-medium">Patient:</span> {patient ? patient.name : 'Unknown'}</p>
                      <p className="text-gray-700"><span className="font-medium">Title:</span> {incident.title}</p>
                      <p className="text-gray-700"><span className="font-medium">Date:</span> {new Date(incident.appointmentDate).toLocaleString()}</p>
                      <p className="text-gray-700"><span className="font-medium">Status:</span> {incident.status}</p>
                      {incident.files.length > 0 && (
                        <p className="text-gray-700"><span className="font-medium">Files:</span> {incident.files.map((file) => file.name).join(', ')}</p>
                      )}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingIncident(incident)}
                        className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteIncident(incident.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentManagement;