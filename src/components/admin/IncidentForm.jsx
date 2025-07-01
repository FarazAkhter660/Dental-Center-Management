import { useState, useEffect } from 'react';
import { getPatients } from '../../utils/localStorage'

const IncidentForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    id: '',
    patientId: '',
    title: '',
    description: '',
    comments: '',
    appointmentDate: '',
    cost: '',
    treatment: '',
    status: 'Pending',
    nextDate: '',
    files: [],
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const patients = getPatients();

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const fileReaders = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve({ name: file.name, url: reader.result });
        reader.readAsDataURL(file);
      });
    });

    Promise.all(fileReaders).then((newFiles) => {
      setSelectedFiles([...selectedFiles, ...newFiles]);
    });
  };

  const handleRemoveFile = (index) => {
    setSelectedFiles(selectedFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.patientId || !formData.title || !formData.appointmentDate) {
      alert('Please fill in all required fields.');
      return;
    }
    onSubmit({ ...formData, files: [...formData.files, ...selectedFiles] });
    setFormData({
      id: '',
      patientId: '',
      title: '',
      description: '',
      comments: '',
      appointmentDate: '',
      cost: '',
      treatment: '',
      status: 'Pending',
      nextDate: '',
      files: [],
    });
    setSelectedFiles([]);
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold mb-4">
        {initialData ? 'Edit Appointment' : 'Add Appointment'}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="patientId">
            Patient *
          </label>
          <select
            id="patientId"
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Patient</option>
            {patients.map((patient) => (
              <option key={patient.id} value={patient.id}>
                {patient.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="title">
            Title *
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="comments">
            Comments
          </label>
          <textarea
            id="comments"
            name="comments"
            value={formData.comments}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="appointmentDate">
            Appointment Date *
          </label>
          <input
            id="appointmentDate"
            name="appointmentDate"
            type="datetime-local"
            value={formData.appointmentDate}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="cost">
            Cost
          </label>
          <input
            id="cost"
            name="cost"
            type="number"
            value={formData.cost}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="treatment">
            Treatment
          </label>
          <input
            id="treatment"
            name="treatment"
            type="text"
            value={formData.treatment}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="nextDate">
            Next Appointment Date
          </label>
          <input
            id="nextDate"
            name="nextDate"
            type="datetime-local"
            value={formData.nextDate}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="files">
            Upload Files
          </label>
          <input
            id="files"
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full p-2 border rounded"
          />
          {selectedFiles.length > 0 && (
            <div className="mt-2">
              <p className="font-medium">Selected Files:</p>
              <ul className="list-disc pl-5">
                {selectedFiles.map((file, index) => (
                  <li key={index} className="flex items-center">
                    <span>{file.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="flex justify-end">
          {initialData && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded mr-2 hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            {initialData ? 'Update' : 'Add'} Appointment
          </button>
        </div>
      </form>
    </div>
  );
};

export default IncidentForm;