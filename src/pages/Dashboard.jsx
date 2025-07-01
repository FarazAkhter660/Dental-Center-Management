import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import PatientForm from '../components/admin/PatientForm';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [patients, setPatients] = useState([]);
  const [editingPatient, setEditingPatient] = useState(null);

  useEffect(() => {
    const storedPatients = JSON.parse(localStorage.getItem('patients')) || [];
    setPatients(storedPatients);
  }, []);

  const handleAddPatient = (patient) => {
    const updatedPatients = [...patients, { ...patient, id: `p${patients.length + 1}` }];
    setPatients(updatedPatients);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
  };

  const handleUpdatePatient = (updatedPatient) => {
    const updatedPatients = patients.map((p) =>
      p.id === updatedPatient.id ? updatedPatient : p
    );
    setPatients(updatedPatients);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
    setEditingPatient(null);
  };

  const handleDeletePatient = (id) => {
    const updatedPatients = patients.filter((p) => p.id !== id);
    setPatients(updatedPatients);
    localStorage.setItem('patients', JSON.stringify(updatedPatients));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
      <h2 className="text-2xl font-semibold mb-4">Patients</h2>
      <PatientForm
        onSubmit={editingPatient ? handleUpdatePatient : handleAddPatient}
        initialData={editingPatient}
        onCancel={() => setEditingPatient(null)}
      />
      <div className="bg-white shadow rounded-lg p-4 mt-4">
        {patients.length === 0 ? (
          <p>No patients found.</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {patients.map((patient) => (
              <li key={patient.id} className="py-2 flex justify-between items-center">
                <div>
                  <p>
                    <span className="font-medium">Name:</span> {patient.name}
                  </p>
                  <p>
                    <span className="font-medium">DOB:</span> {patient.dob}
                  </p>
                  <p>
                    <span className="font-medium">Contact:</span> {patient.contact}
                  </p>
                  <p>
                    <span className="font-medium">Health Info:</span> {patient.healthInfo}
                  </p>
                </div>
                <div>
                  <button
                    onClick={() => setEditingPatient(patient)}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeletePatient(patient.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;