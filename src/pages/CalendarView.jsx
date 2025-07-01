import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { getIncidents, getPatients } from '../utils/localStorage';

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const patients = getPatients();

  useEffect(() => {
    const incidents = getIncidents();
    const calendarEvents = incidents.map((incident) => ({
      title: `${incident.title} (${patients.find((p) => p.id === incident.patientId)?.name || 'Unknown'})`,
      start: new Date(incident.appointmentDate),
      end: new Date(incident.appointmentDate),
      allDay: false,
    }));
    setEvents(calendarEvents);
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Appointment Calendar</h2>
      <div className="bg-white shadow rounded-lg p-4">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          className="bg-white"
        />
      </div>
    </div>
  );
};

export default CalendarView;