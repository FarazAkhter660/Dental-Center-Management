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
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-4">
        {initialData ? 'Edit Patient' : 'Add Patient'}
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Name *</label>
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
          />
        </div>
        <div>
          <label htmlFor="dob" className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
          <input
            id="dob"
            name="dob"
            type="date"
            value={formData.dob}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
          />
        </div>
        <div>
          <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-2">Contact *</label>
          <input
            id="contact"
            name="contact"
            type="text"
            value={formData.contact}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
          />
        </div>
        <div>
          <label htmlFor="healthInfo" className="block text-sm font-medium text-gray-700 mb-2">Health Info</label>
          <textarea
            id="healthInfo"
            name="healthInfo"
            value={formData.healthInfo}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-200"
          />
        </div>
        <div className="flex justify-end space-x-2">
          {initialData && (
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          >
            {initialData ? 'Update' : 'Add'} Patient
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;