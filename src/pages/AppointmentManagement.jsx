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
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Appointments</h2>
      <IncidentForm
        onSubmit={editingIncident ? handleUpdateIncident : handleAddIncident}
        initialData={editingIncident}
        onCancel={() => setEditingIncident(null)}
      />
      <div className="bg-white shadow rounded-lg p-4 mt-4">
        {incidents.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {incidents.map((incident) => {
              const patient = patients.find((p) => p.id === incident.patientId);
              return (
                <li key={incident.id} className="py-2 flex justify-between items-center">
                  <div>
                    <p>
                      <span className="font-medium">Patient:</span>{' '}
                      {patient ? patient.name : 'Unknown'}
                    </p>
                    <p>
                      <span className="font-medium">Title:</span> {incident.title}
                    </p>
                    <p>
                      <span className="font-medium">Date:</span>{' '}
                      {new Date(incident.appointmentDate).toLocaleString()}
                    </p>
                    <p>
                      <span className="font-medium">Status:</span> {incident.status}
                    </p>
                    {incident.files.length > 0 && (
                      <p>
                        <span className="font-medium">Files:</span>{' '}
                        {incident.files.map((file) => file.name).join(', ')}
                      </p>
                    )}
                  </div>
                  <div>
                    <button
                      onClick={() => setEditingIncident(incident)}
                      className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteIncident(incident.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AppointmentManagement;