import { useEffect, useState } from 'react';
import PatientForm from '../components/admin/PatientForm';
import { getPatients, savePatients } from '../utils/localStorage';

const PatientManagement = () => {
  const [patients, setPatients] = useState([]);
  const [editingPatient, setEditingPatient] = useState(null);

  useEffect(() => {
    setPatients(getPatients());
  }, []);

  const handleAddPatient = (patient) => {
    const updatedPatients = [...patients, { ...patient, id: `p${patients.length + 1}` }];
    setPatients(updatedPatients);
    savePatients(updatedPatients);
  };

  const handleUpdatePatient = (updatedPatient) => {
    const updatedPatients = patients.map((p) =>
      p.id === updatedPatient.id ? updatedPatient : p
    );
    setPatients(updatedPatients);
    savePatients(updatedPatients);
    setEditingPatient(null);
  };

  const handleDeletePatient = (id) => {
    const updatedPatients = patients.filter((p) => p.id !== id);
    setPatients(updatedPatients);
    savePatients(updatedPatients);
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Patients</h2>
        <PatientForm
          onSubmit={editingPatient ? handleUpdatePatient : handleAddPatient}
          initialData={editingPatient}
          onCancel={() => setEditingPatient(null)}
        />
        <div className="bg-white shadow-lg rounded-lg p-6 mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Patient List</h3>
          {patients.length === 0 ? (
            <p className="text-gray-600">No patients found.</p>
          ) : (
            <div className="grid gap-4">
              {patients.map((patient) => (
                <div key={patient.id} className="border-l-4 border-blue-600 p-4 bg-gray-50 rounded-lg flex justify-between items-start">
                  <div>
                    <p className="text-gray-700"><span className="font-medium">Name:</span> {patient.name}</p>
                    <p className="text-gray-700"><span className="font-medium">DOB:</span> {patient.dob}</p>
                    <p className="text-gray-700"><span className="font-medium">Contact:</span> {patient.contact}</p>
                    <p className="text-gray-700"><span className="font-medium">Health Info:</span> {patient.healthInfo}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setEditingPatient(patient)}
                      className="bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeletePatient(patient.id)}
                      className="bg-red-600 text-white px-3 py-1 rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PatientManagement;