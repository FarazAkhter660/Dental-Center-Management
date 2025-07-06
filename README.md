Dental Center Management Dashboard
A modern web application for managing dental center operations, including patient records, appointments, and a calendar view. Built with React, Tailwind CSS, and react-big-calendar, this dashboard provides an intuitive interface for admins and patients.
Features

Admin Dashboard: Manage patients and appointments with CRUD operations.
Patient Dashboard: View personal appointment details.
Calendar View: Visualize appointments with navigable Month, Week, Day, and Agenda views.
Authentication: Secure login for admins (admin@entnt.in / admin123) and patients (john@entnt.in / patient123).
File Uploads: Attach files to appointments.
Responsive Design: Optimized for desktop and mobile devices.

Live Demo
Check out the deployed version at: https://dental-center-management-woad.vercel.app
Prerequisites

Node.js (v14.x or later)
npm (v6.x or later)

Installation

Clone the Repository:
git clone https://github.com/FarazAkhter660/Dental-Center-Management.git
cd dental-dashboard


Install Dependencies:
npm install


Set Up Local Storage (Optional):

Initialize sample users and data by running the app and logging in/out to populate localStorage.


Start the Development Server:
npm start


Open http://localhost:3000 in your browser.



Usage

Login:
Admin: admin@entnt.in / admin123 (accesses /dashboard).
Patient: john@entnt.in / patient123 (accesses /patient).


Navigation:
Use the navbar to switch between Patients, Appointments, and Calendar views.
Calendar supports Month, Week, Day, Agenda, Today, Back, and Next controls.


Management:
Add, edit, or delete patients and appointments via respective forms.
View appointment details by clicking events on the calendar.

Technologies

Frontend: React, Tailwind CSS
Calendar: react-big-calendar, Moment.js
State Management: React Context
Storage: LocalStorage
Deployment: Vercel

Troubleshooting

Styling Issues: Ensure index.css is imported in index.js and Tailwind is configured in tailwind.config.js.
Calendar Navigation: Verify dependencies (react-big-calendar, moment) are installed and the toolbar is enabled in CalendarView.jsx.
Deployment Issues: If the live site (https://dental-center-management-woad.vercel.app) shows errors, check the Vercel logs for build failures or missing environment variables. Ensure localStorage data persists by testing with sample logins.
OneDrive Sync: Move the project out of OneDrive if files don’t load during development:mv "C:\Users\faraz akhter\OneDrive\Desktop\dental\dental-dashboard" "C:\Users\faraz akhter\Desktop\dental-projects\dental-dashboard"
cd "C:\Users\faraz akhter\Desktop\dental-projects\dental-dashboard"
npm install
npm start