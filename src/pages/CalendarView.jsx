import { useEffect, useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import { getIncidents, getPatients } from "../utils/localStorage";

const localizer = momentLocalizer(moment);

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const patients = getPatients();

  useEffect(() => {
    const incidents = getIncidents();
    const calendarEvents = incidents.map((incident) => ({
      id: incident.id,
      title: `${incident.title} (${
        patients.find((p) => p.id === incident.patientId)?.name || "Unknown"
      })`,
      start: new Date(incident.appointmentDate),
      end: new Date(incident.appointmentDate),
      allDay: false,
      incident: incident,
    }));
    setEvents(calendarEvents);
    console.log("Events loaded:", calendarEvents);
  }, []);

  const handleSelectEvent = (event) => {
    alert(`
      Title: ${event.title}
      Date: ${moment(event.start).format("MMMM Do YYYY, h:mm a")}
      Status: ${event.incident.status}
      Cost: $${event.incident.cost || "N/A"}
      Treatment: ${event.incident.treatment || "N/A"}
    `);
  };

  return (
    <div className="py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Appointment Calendar
        </h2>
        <div className="bg-white shadow-lg rounded-lg p-6">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
            defaultView={Views.MONTH}
            toolbar={true}
            onSelectEvent={handleSelectEvent}
            components={{
              toolbar: (toolbarProps) => (
                <div className="rbc-toolbar">
                  <span className="rbc-btn-group">
                    <button
                      type="button"
                      onClick={() => toolbarProps.onView(Views.MONTH)}
                      className="rbc-btn"
                    >
                      Month
                    </button>
                    <button
                      type="button"
                      onClick={() => toolbarProps.onView(Views.WEEK)}
                      className="rbc-btn"
                    >
                      Week
                    </button>
                    <button
                      type="button"
                      onClick={() => toolbarProps.onView(Views.DAY)}
                      className="rbc-btn"
                    >
                      Day
                    </button>
                    <button
                      type="button"
                      onClick={() => toolbarProps.onView(Views.AGENDA)}
                      className="rbc-btn"
                    >
                      Agenda
                    </button>
                  </span>
                  <span className="rbc-toolbar-label">
                    {toolbarProps.label}
                  </span>
                  <span className="rbc-btn-group">
                    <button
                      type="button"
                      onClick={toolbarProps.onNavigate("TODAY")}
                      className="rbc-btn"
                    >
                      Today
                    </button>
                    <button
                      type="button"
                      onClick={toolbarProps.onNavigate("PREV")}
                      className="rbc-btn"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={toolbarProps.onNavigate("NEXT")}
                      className="rbc-btn"
                    >
                      Next
                    </button>
                  </span>
                </div>
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CalendarView;
