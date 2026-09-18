# DentalBook - Frontend

DentalBook is a modern dental clinic appointment management platform built with React.js.

The frontend provides two main experiences:

- 👨‍⚕️ Admin dashboard for clinic management
- 🧑‍💼 Patient interface for appointments and profile management

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Technologies](#-technologies)
- [Project Structure](#-project-structure)
- [Backend Integration](#-backend-integration)
- [Authentication](#-authentication)
- [Admin Features](#-admin-features)
- [Patient Features](#-patient-features)
- [Appointment Management](#-appointment-management)
- [Services Management](#-services-management)
- [Schedules Management](#-schedules-management)
- [Patient Management](#-patient-management)
- [Profile Management](#-profile-management)
- [Search & Filtering](#-search--filtering)
- [Frontend Pagination](#-frontend-pagination)
- [Responsive Design](#-responsive-design)
- [Notifications](#-notifications)
- [API Configuration](#-api-configuration)
- [Installation](#-installation)
- [Running the Project](#-running-the-project)
- [Git Workflow](#-git-workflow)

---

## 📌 Project Overview

DentalBook is a full-stack web application designed to simplify dental clinic appointment management.

The frontend allows:

### Admin

Administrators can:

- Manage appointments
- Manage dental services
- Manage schedules
- Manage patients
- Update appointment statuses
- View appointment details
- Edit appointments
- Delete appointments
- Activate/deactivate services
- View dashboard statistics
- Search and filter data
- Use pagination for large lists

### Patient

Patients can:

- Access their dashboard
- Browse available dental services
- Book appointments
- View their appointments
- View upcoming and past appointments
- Manage their profile
- Update personal information
- Cancel/manage appointments according to the available backend rules

---

# 🛠 Technologies

The frontend is built with:

- React.js
- Vite
- JavaScript
- React Router
- Redux Toolkit
- React Redux
- Axios
- React Hook Form
- React Icons
- React Toastify
- Tailwind CSS
- JWT Authentication

---

# 📁 Project Structure

```text
frontend/
│
├── public/
│
├── src/
│   │
│   ├── api/
│   │   └── axios.js
│   │
│   ├── components/
│   │   ├── admin/
│   │   │   ├── AddServiceModal.jsx
│   │   │   ├── EditServiceModal.jsx
│   │   │   ├── ScheduleModal.jsx
│   │   │   ├── PatientDetailsModal.jsx
│   │   │   ├── AppointmentDetailsModal.jsx
│   │   │   ├── EditAppointmentModal.jsx
│   │   │   └── StatCard.jsx
│   │   │
│   │   └── patient/
│   │
│   ├── features/
│   │   ├── appointments/
│   │   │   ├── appointmentService.js
│   │   │   └── appointmentSlice.js
│   │   │
│   │   ├── services/
│   │   │   ├── serviceService.js
│   │   │   └── serviceSlice.js
│   │   │
│   │   ├── schedules/
│   │   │   ├── scheduleService.js
│   │   │   └── scheduleSlice.js
│   │   │
│   │   └── patients/
│   │       ├── patientService.js
│   │       └── patientSlice.js
│   │
│   ├── layouts/
│   │   ├── AdminLayout.jsx
│   │   └── PatientLayout.jsx
│   │
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Appointments.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Schedules.jsx
│   │   │   └── Patients.jsx
│   │   │
│   │   └── patient/
│   │       ├── Dashboard.jsx
│   │       ├── Appointments.jsx
│   │       ├── BookAppointment.jsx
│   │       └── Profile.jsx
│   │
│   ├── store/
│   │   └── store.js
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── package.json
└── README.md