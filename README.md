🦷 DentalBook

DentalBook is a full-stack web application for managing a dental clinic and its appointments.

The platform provides two dedicated experiences:

👨‍💼 Admin — manage appointments, patients, services and schedules.

👤 Patient — browse services, book appointments, view appointments and manage profile.

The project was developed using the MERN Stack with a modern responsive interface and a secure REST API.

📋 Table of Contents

Project Overview

Main Objectives

Features

Technologies

Project Architecture

Project Structure

Authentication & Security

Backend

Frontend

Appointment Management

Admin Features

Patient Features

API Endpoints

Validation & Business Rules

Responsive Design

Notifications & Error Handling

Testing

Git Workflow

Installation

Running the Project

Project Status

📌 Project Overview

DentalBook is a digital solution designed to simplify the management of a dental clinic.

The application allows patients to book appointments according to available services and schedules while providing administrators with a complete management dashboard.

The application handles:

Authentication

Patients

Services

Schedules

Appointments

User profiles

Role-based access

Validation

Appointment conflict prevention

🎯 Main Objectives

The main objectives of DentalBook are:

Digitalize the management of a dental clinic.

Simplify appointment booking.

Centralize patient information.

Manage dental services.

Manage clinic schedules.

Prevent appointment conflicts.

Provide secure authentication.

Separate Admin and Patient permissions.

Provide a modern and responsive user experience.

✨ Features

🔐 Authentication

User registration

User login

JWT authentication

Password hashing with bcrypt

Protected routes

Role-based authorization

Admin / Patient roles

👨‍💼 Admin

The administrator can manage:

Dashboard

Appointment statistics

Pending appointments

Confirmed appointments

Completed appointments

Recent appointments

Appointments

View appointments

Search by patient

Search by service

Filter by status

View appointment details

Update appointment

Delete appointment

Pagination

Patients

View patients

Search by name

Search by email

Search by phone

View patient details

Pagination

Services

Create service

Update service

Delete service

Search services

Manage service status

Pagination

Schedules

Create schedule

Update schedule

Delete schedule

Search by day

Sort by weekday

Activate / deactivate schedule

👤 Patient

Patients have access to a dedicated interface.

Patient Dashboard

Overview of appointments

Upcoming appointments

Previous appointments

Appointment status

Book Appointment

Patients can:

Select a service.

Select a date and time.

Select an available schedule.

Add optional notes.

Submit the appointment.

The appointment is initially created with the status:

Pending

My Appointments

Patients can:

View their appointments.

View service information.

View date and time.

View appointment status.

View notes.

Cancel appointments when allowed.

Profile

Patients can update:

First name

Last name

Phone number

The email is displayed as read-only.

🛠 Technologies

Frontend

React

Vite

JavaScript

React Router

Redux Toolkit

React Redux

Axios

React Hook Form

React Icons

React Toastify

Tailwind CSS

Chart.js

React Chart.js 2

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT

bcrypt

Zod

REST API

Development Tools

Git

GitHub

Postman

VS Code

MongoDB

🏗 Project Architecture

The project follows a client-server architecture.

                    ┌──────────────────┐
                    │     Patient      │
                    │     / Admin      │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ React Frontend   │
                    │      + Vite      │
                    └────────┬─────────┘
                             │
                       Axios / REST
                             │
                             ▼
                    ┌──────────────────┐
                    │ Express Backend  │
                    │    Node.js       │
                    └────────┬─────────┘
                             │
                       Mongoose
                             │
                             ▼
                    ┌──────────────────┐
                    │     MongoDB      │
                    └──────────────────┘

Redux Toolkit is used in the frontend to manage global application state.

# 📁 Project Structure

```text

DentalBook/
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js
│   │   │
│   │   ├── components/
│   │   │   ├── admin/
│   │   │   └── patient/
│   │   │
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── appointments/
│   │   │   ├── services/
│   │   │   ├── schedules/
│   │   │   └── patients/
│   │   │
│   │   ├── layouts/
│   │   │   ├── AdminLayout.jsx
│   │   │   └── PatientLayout.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── admin/
│   │   │   └── patient/
│   │   │
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── validators/
│   │   └── server.js
│   │
│   ├── tests/
│   │   ├── unit/
│   │   └── integration/
│   │
│   ├── package.json
│   └── ...
│
└── README.md

🔐 Authentication & Security

DentalBook uses JWT-based authentication.

Authentication Flow

Login
  ↓
Backend validates credentials
  ↓
Password verification with bcrypt
  ↓
JWT generated
  ↓
Token stored on frontend
  ↓
Axios sends Bearer Token
  ↓
Backend verifies token
  ↓
Access granted

Protected requests use:

Authorization: Bearer <token>

Role-Based Access

There are two roles:

admin
patient

Admin-only routes are protected using authorization middleware.

Example:

authorize("admin")

Patients can only access their own protected resources.

⚙️ Backend

The backend is built using:

Node.js
Express.js
MongoDB
Mongoose
JWT
bcrypt
Zod

The backend follows a modular architecture with:

Models

Controllers

Routes

Services

Middleware

Validators

🗄️ Main Data Models

User

Main fields:

firstName
lastName
email
password
phone
role

Roles:

admin
patient

Service

name
description
duration
price
isActive

Schedule

day
startTime
endTime
isAvailable

Available days:

Monday
Tuesday
Wednesday
Thursday
Friday
Saturday
Sunday

Appointment

userId
serviceId
appointmentDate
status
notes
scheduleId

Appointment statuses:

pending
confirmed
cancelled
completed

📅 Appointment Management

Appointment management is one of the main features of DentalBook.

When a patient creates an appointment, the backend verifies:

The appointment date is in the future.

The selected schedule matches the selected day.

The service exists and is available.

The service duration fits inside the schedule.

There is no conflicting appointment.

The same patient does not have an overlapping appointment.

This business logic helps maintain a consistent clinic schedule.

🌐 API Endpoints

Authentication

POST /api/auth/register
POST /api/auth/login

Users

GET   /api/users/me
PATCH /api/users/me

Admin:

GET /api/users/patients
GET /api/users/patients/:id

Services

GET    /api/services
GET    /api/services/:id
POST   /api/services
PATCH  /api/services/:id
DELETE /api/services/:id

Schedules

GET    /api/schedules
GET    /api/schedules/:id
POST   /api/schedules
PATCH  /api/schedules/:id
DELETE /api/schedules/:id

Appointments

POST   /api/appointments
GET    /api/appointments
GET    /api/appointments/my
GET    /api/appointments/:id
PATCH  /api/appointments/:id
DELETE /api/appointments/:id

Admin-only operations are protected using role authorization.

🧠 Validation & Business Rules

DentalBook uses multiple levels of validation.

Frontend

Required fields

Input validation

React Hook Form

Correct input types

User-friendly error messages

Backend

Zod validation

Mongoose validation

Authentication validation

Authorization

Business rules

Appointment Rules

Future date
     ↓
Valid service
     ↓
Valid schedule
     ↓
Correct weekday
     ↓
Service duration fits schedule
     ↓
No appointment conflict
     ↓
Appointment created

🎨 Frontend

The frontend is built with React and uses Redux Toolkit for global state management.

Main frontend areas:

Authentication
Appointments
Services
Schedules
Patients
Admin Dashboard
Patient Dashboard
Profile

🔄 Redux Architecture

The application uses Redux Toolkit.

General flow:

Component
    ↓
dispatch()
    ↓
Async Thunk
    ↓
API Request
    ↓
Backend
    ↓
Redux State
    ↓
UI Update

Redux manages states such as:

Loading

Success

Error

Data

Updating

Deleting

📱 Responsive Design

DentalBook is responsive and designed for:

Desktop

Tablet

Mobile

On desktop:

Tables are used for data-heavy pages.

Sidebar navigation is available.

On mobile:

Data is displayed using cards.

Layouts adapt to smaller screens.

Buttons and forms remain accessible.

Tailwind CSS is used to build the responsive interface.

🔎 Search, Filters & Pagination

Several Admin pages provide search and filtering.

Appointments

Search by patient.

Search by service.

Filter by status.

Pagination.

Patients

Search by name.

Search by email.

Search by phone.

Pagination.

Services

Search by name.

Search by description.

Pagination.

Schedules

Search by day.

Sort by weekday.

Schedules do not require pagination because there are only seven possible weekdays.

🔔 Notifications & Error Handling

DentalBook uses React Toastify to provide feedback after actions.

Examples:

Service created successfully
Service updated successfully
Schedule deleted successfully
Appointment updated successfully
Profile updated successfully

The application also handles:

Loading states

Empty states

API errors

Validation errors

Failed requests

🧪 Testing

The backend contains unit and integration tests.

Tests cover important parts of the application such as:

Authentication

Services

Schedules

Appointments

API endpoints

Authorization

Validation

Business logic

Integration tests verify that multiple backend components work correctly together.

🌿 Git Workflow

The project uses Git and GitHub with feature branches.

Main workflow:

main
  │
  ▼
develop
  │
  ├── feature/backend
  │
  └── feature/frontend

Features are developed separately and integrated into the development branch.

Examples:

feature/authentication
feature/backend
feature/frontend

Commits are created regularly after completing each feature.

Example:

git add .
git commit -m "feat: add appointment management"
git push

🚀 Installation

1. Clone the repository

git clone <repository-url>
cd DentalBook

🔧 Backend Setup

cd backend
npm install

Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

Start the backend:

npm run dev

The API will run on:

http://localhost:5000

💻 Frontend Setup

Open another terminal:

cd frontend
npm install

Start the frontend:

npm run dev

The frontend will run on the Vite development URL.

🧪 Testing

Run backend tests with:

npm test

For integration tests, use the project's integration test configuration.

📊 Application Flow

Patient Flow

Register / Login
       ↓
Patient Dashboard
       ↓
Browse Services
       ↓
Select Date
       ↓
Select Schedule
       ↓
Book Appointment
       ↓
Pending
       ↓
Appointment Management

Admin Flow

Login
  ↓
Admin Dashboard
  ↓
Appointments
Patients
Services
Schedules
  ↓
Clinic Management

🎯 Project Benefits

DentalBook provides:

Centralized clinic management.

Easier appointment booking.

Better schedule organization.

Prevention of appointment conflicts.

Secure authentication.

Role-based access.

Modern responsive interface.

REST API architecture.

Scalable project structure.

📌 Project Status

Backend

Authentication

JWT Authorization

Users / Patients

Services CRUD

Schedules CRUD

Appointments CRUD

Appointment validation

Business rules

Unit tests

Integration tests

Frontend

Authentication

Admin Dashboard

Admin Appointments

Admin Patients

Admin Services

Admin Schedules

Patient Dashboard

Book Appointment

My Appointments

Patient Profile

Search & Filters

Pagination

Responsive Design

Toast Notifications

🏁 Conclusion

DentalBook is a complete Full Stack MERN application designed to digitalize dental clinic management.

The project combines:

React
+
Redux Toolkit
+
Tailwind CSS
+
Node.js
+
Express.js
+
MongoDB
+
JWT

The final solution provides dedicated experiences for both Administrators and Patients, with secure authentication, appointment management, schedule management, service management and a responsive modern interface.

👨‍💻 DentalBook

Dental Clinic Management Platform

Full Stack MERN Application