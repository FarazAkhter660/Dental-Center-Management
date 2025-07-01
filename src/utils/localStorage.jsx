export const initializeData = () => {
  const initialUsers = [
    { id: '1', role: 'Admin', email: 'admin@entnt.in', password: 'admin123' },
    { id: '2', role: 'Patient', email: 'john@entnt.in', password: 'patient123', patientId: 'p1' },
  ];
  const initialPatients = [
    {
      id: 'p1',
      name: 'John Doe',
      dob: '1990-05-10',
      contact: '1234567890',
      healthInfo: 'No allergies',
    },
  ];
  const initialIncidents = [
    {
      id: 'i1',
      patientId: 'p1',
      title: 'Toothache',
      description: 'Upper molar pain',
      comments: 'Sensitive to cold',
      appointmentDate: '2025-07-01T10:00:00',
      cost: 80,
      treatment: 'Filling',
      status: 'Completed',
      nextDate: '',
      files: [],
    },
  ];

  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(initialUsers));
  }
  if (!localStorage.getItem('patients')) {
    localStorage.setItem('patients', JSON.stringify(initialPatients));
  }
  if (!localStorage.getItem('incidents')) {
    localStorage.setItem('incidents', JSON.stringify(initialIncidents));
  }
};

export const getPatients = () => {
  return JSON.parse(localStorage.getItem('patients')) || [];
};

export const savePatients = (patients) => {
  localStorage.setItem('patients', JSON.stringify(patients));
};

export const getIncidents = () => {
  return JSON.parse(localStorage.getItem('incidents')) || [];
};

export const saveIncidents = (incidents) => {
  localStorage.setItem('incidents', JSON.stringify(incidents));
};