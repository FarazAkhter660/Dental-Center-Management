import { useState, useEffect } from 'react';

const PatientForm = ({ onSubmit, initialData, onCancel }) => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    dob: '',
    contact: '',
    healthInfo: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.dob || !formData.contact) {
      alert('Please fill in all required fields.');
      return;
    }
    onSubmit(formData);
    setFormData({ id: '', name: '', dob: '', contact: '', healthInfo: '' });
  };

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <h3 className="text-lg font-semibold mb-4">
        {initialData ? 'Edit Patient' : 'Add Patient'}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="name">
            Name *
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="dob">
            Date of Birth *
          </label>
          <input
            id="dob"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="contact">
            Contact *
          </label>
          <input
            id="contact"
            name="contact"
            type="text"
            value={formData.contact}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="healthInfo">
            Health Info
          </label>
          <textarea
            id="healthInfo"
            name="healthInfo"
            value={formData.healthInfo}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
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
            {initialData ? 'Update' : 'Add'} Patient
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;