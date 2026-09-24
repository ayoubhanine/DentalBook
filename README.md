# 🦷 DentalBook

## 📐 Diagrammes UML

### Diagramme de classes

![Class Diagram](diagrammes/ClassDiagram.png)

### Diagramme de cas d'utilisation

![Diagramme de cas d'utilisation](diagrammes/UseCaseDiagram.png)

DentalBook is a full-stack web application designed to digitalize and simplify dental clinic management and appointment scheduling.

The platform provides two dedicated experiences:

- 👨‍💼 **Admin** — manage patients, appointments, dental services and clinic schedules.
- 👤 **Patient** — browse available services, book appointments, manage appointments and update their profile.

DentalBook is built using the **MERN Stack** and follows a client-server architecture with a secure REST API, JWT authentication, role-based authorization and a responsive user interface.

---

## 📋 Table of Contents

- [Project Overview](#-project-overview)
- [Main Objectives](#-main-objectives)
- [Features](#-features)
- [Technologies](#️-technologies)
- [Project Architecture](#-project-architecture)
- [Project Structure](#-project-structure)
- [Authentication & Security](#-authentication--security)
- [Backend](#️-backend)
- [Frontend](#-frontend)
- [Appointment Management](#-appointment-management)
- [Admin Features](#-admin-features)
- [Patient Features](#-patient-features)
- [API Endpoints](#-api-endpoints)
- [Validation & Business Rules](#-validation--business-rules)
- [Responsive Design](#-responsive-design)
- [Notifications & Error Handling](#-notifications--error-handling)
- [Testing](#-testing)
- [Git Workflow](#-git-workflow)
- [Installation](#-installation)
- [Running the Project](#-running-the-project)
- [Project Status](#-project-status)

---

## 📌 Project Overview

DentalBook provides a centralized platform for managing the main operations of a dental clinic.

The application connects patients with the clinic through an appointment booking system while giving administrators the tools required to manage daily clinic activities.

The platform covers:

- 🔐 Authentication and authorization
- 👥 Patient management
- 🦷 Dental service management
- 📅 Clinic schedule management
- 📋 Appointment management
- 👤 User profile management
- 🛡️ Role-based access control
- ✅ Data and input validation
- ⚠️ Appointment conflict prevention

---

## 🎯 Main Objectives

The main objectives of DentalBook are to:

- Digitalize dental clinic management.
- Simplify the appointment booking process.
- Centralize patient information.
- Manage dental services and their availability.
- Manage clinic schedules.
- Prevent appointment conflicts and invalid bookings.
- Provide secure authentication and authorization.
- Separate Admin and Patient permissions.
- Provide a modern, responsive and user-friendly interface.
- Apply a clear and scalable Full Stack architecture.

---

## ✨ Features

### 🔐 Authentication

- User registration
- User login
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes
- Role-based authorization
- Admin and Patient roles

### 👨‍💼 Admin

The Admin interface provides centralized management of the clinic.

#### Dashboard

- Appointment statistics
- Pending appointments
- Confirmed appointments
- Completed appointments
- Recent appointments

#### Appointments

- View appointments
- Search by patient
- Search by service
- Filter by status
- View appointment details
- Update appointment status
- Delete appointments
- Pagination

#### Patients

- View patients
- Search by name
- Search by email
- Search by phone
- View patient details
- Pagination

#### Services

- Create services
- Update services
- Delete services
- Search services
- Manage service availability
- Pagination

#### Schedules

- Create schedules
- Update schedules
- Delete schedules
- Search by day
- Sort by weekday
- Activate or deactivate schedules

### 👤 Patient

Patients have access to a dedicated interface.

#### Patient Dashboard

- Overview of appointments
- Upcoming appointments
- Previous appointments
- Appointment statuses

#### Book Appointment

Patients can:

1. Select a dental service.
2. Select an appointment date.
3. Select an available schedule.
4. Add optional notes.
5. Submit the appointment request.

New appointments are created with the `pending` status.

#### My Appointments

- View personal appointments
- View service information
- View appointment date and time
- View appointment status
- View notes
- Cancel appointments when allowed

#### Profile

- Update first name
- Update last name
- Update phone number
- Email displayed as read-only

---

## 🛠️ Technologies

### Frontend

- React
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
- Chart.js
- React Chart.js 2

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Joi
- REST API

### Development Tools

- Git
- GitHub
- Postman
- VS Code
- MongoDB

---

## 🏗️ Project Architecture

DentalBook follows a **client-server architecture** where the React frontend communicates with the Express backend through a REST API.

```text
                         ┌──────────────────────┐
                         │   Patient / Admin    │
                         └──────────┬───────────┘
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │    React Frontend    │
                         │       + Vite         │
                         │                      │
                         │  React Router        │
                         │  Redux Toolkit       │
                         │  React Hook Form     │
                         │  Axios               │
                         │  Tailwind CSS        │
                         └──────────┬───────────┘
                                    │
                              HTTP / REST
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │   Express Backend    │
                         │      Node.js         │
                         │                      │
                         │  Routes              │
                         │  Controllers         │
                         │  Services            │
                         │  Middleware          │
                         │  Validators          │
                         └──────────┬───────────┘
                                    │
                               Mongoose
                                    │
                                    ▼
                         ┌──────────────────────┐
                         │       MongoDB        │
                         │                      │
                         │ Users                │
                         │ Services             │
                         │ Schedules            │
                         │ Appointments         │
                         └──────────────────────┘
```

### Frontend Architecture

The frontend is responsible for:

- User interface
- Routing
- Form management
- Global state management
- API communication
- Authentication state
- Admin and Patient experiences

**Redux Toolkit** manages global application state, while **Axios** handles communication with the backend REST API.

### Backend Architecture

The backend is organized into separate layers:

```text
Routes
   ↓
Controllers
   ↓
Services
   ↓
Models
   ↓
MongoDB
```

Additional middleware is used for:

- Authentication
- Role-based authorization
- Request validation
- Error handling

This separation keeps the application modular, maintainable and easier to test.

### Data Flow

A typical request follows this flow:

```text
User Action
    ↓
React Component
    ↓
Redux / Service
    ↓
Axios
    ↓
REST API
    ↓
Express Route
    ↓
Middleware
    ↓
Controller
    ↓
Service Layer
    ↓
Mongoose
    ↓
MongoDB
    ↓
Response
    ↓
Redux State
    ↓
UI Update
```

---

## 📁 Project Structure

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
```

---

## 🔐 Authentication & Security

DentalBook uses JWT-based authentication.

### Authentication Flow

```text
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
```

Protected requests use:

```http
Authorization: Bearer <token>
```

### Role-Based Access

There are two roles:

- `admin`
- `patient`

Admin-only routes are protected using role authorization middleware.

Example:

```javascript
authorize("admin")
```

Patients can only access their own protected resources.

---

## ⚙️ Backend

The backend is built using:

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Joi
- REST API

The backend follows a modular architecture with:

- Models
- Controllers
- Routes
- Services
- Middleware
- Validators

### 🗄️ Main Data Models

#### User

Main fields:

- `firstName`
- `lastName`
- `email`
- `password`
- `phone`
- `role`

Roles:

- `admin`
- `patient`

#### Service

- `name`
- `description`
- `duration`
- `price`
- `isActive`

#### Schedule

- `day`
- `startTime`
- `endTime`
- `isAvailable`

Available days:

- Monday
- Tuesday
- Wednesday
- Thursday
- Friday
- Saturday
- Sunday

#### Appointment

- `userId`
- `serviceId`
- `appointmentDate`
- `status`
- `notes`
- `scheduleId`

Appointment statuses:

- `pending`
- `confirmed`
- `cancelled`
- `completed`

---

## 📅 Appointment Management

Appointment management is one of the main features of DentalBook.

When a patient creates an appointment, the backend verifies:

- The appointment date is in the future.
- The selected schedule matches the selected day.
- The service exists and is available.
- The service duration fits inside the schedule.
- There is no conflicting appointment.
- The same patient does not have an overlapping appointment.

This business logic helps maintain a consistent clinic schedule.

---

## 🌐 API Endpoints

### Authentication

```http
POST /api/auth/register
POST /api/auth/login
```

### Users

```http
GET   /api/users/me
PATCH /api/users/me
```

### Admin Users / Patients

```http
GET /api/users/patients
GET /api/users/patients/:id
```

### Services

```http
GET    /api/services
GET    /api/services/:id
POST   /api/services
PATCH  /api/services/:id
DELETE /api/services/:id
```

### Schedules

```http
GET    /api/schedules
GET    /api/schedules/:id
POST   /api/schedules
PATCH  /api/schedules/:id
DELETE /api/schedules/:id
```

### Appointments

```http
POST   /api/appointments
GET    /api/appointments
GET    /api/appointments/my
GET    /api/appointments/:id
PATCH  /api/appointments/:id
DELETE /api/appointments/:id
```

Admin-only operations are protected using role authorization.

---

## 🧠 Validation & Business Rules

DentalBook uses multiple levels of validation.

### Frontend

- Required fields
- Input validation
- React Hook Form
- Correct input types
- User-friendly error messages

### Backend

- Joi validation
- Mongoose validation
- Authentication validation
- Authorization
- Business rules

### Appointment Rules

```text
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
```

---

## 🎨 Frontend

The frontend is built with React and uses Redux Toolkit for global state management.

Main frontend areas:

- Authentication
- Appointments
- Services
- Schedules
- Patients
- Admin Dashboard
- Patient Dashboard
- Profile

### 🔄 Redux Architecture

The application uses Redux Toolkit.

General flow:

```text
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
```

Redux manages states such as:

- Loading
- Success
- Error
- Data
- Updating
- Deleting

---

## 📱 Responsive Design

DentalBook is responsive and designed for:

- Desktop
- Tablet
- Mobile

### Desktop

- Tables are used for data-heavy pages.
- Sidebar navigation is available.

### Mobile

- Data is displayed using cards.
- Layouts adapt to smaller screens.
- Buttons and forms remain accessible.

Tailwind CSS is used to build the responsive interface.

---

## 🔎 Search, Filters & Pagination

Several Admin pages provide search and filtering.

### Appointments

- Search by patient
- Search by service
- Filter by status
- Pagination

### Patients

- Search by name
- Search by email
- Search by phone
- Pagination

### Services

- Search by name
- Search by description
- Pagination

### Schedules

- Search by day
- Sort by weekday

Schedules do not require pagination because there are only seven possible weekdays.

---

## 🔔 Notifications & Error Handling

DentalBook uses React Toastify to provide feedback after actions.

Examples:

- Service created successfully
- Service updated successfully
- Schedule deleted successfully
- Appointment updated successfully
- Profile updated successfully

The application also handles:

- Loading states
- Empty states
- API errors
- Validation errors
- Failed requests

---

## 🧪 Testing

The backend contains unit and integration tests.

Tests cover important parts of the application such as:

- Authentication
- Services
- Schedules
- Appointments
- API endpoints
- Authorization
- Validation
- Business logic

Integration tests verify that multiple backend components work correctly together.

Run tests with:

```bash
npm test
```

---

## 🌿 Git Workflow

The project uses Git and GitHub with feature branches.

Main workflow:

```text
main
  │
  ▼
develop
  │
  ├── feature/backend
  │
  └── feature/frontend
```

Features are developed separately and integrated into the development branch.

Examples:

```text
feature/authentication
feature/backend
feature/frontend
```

Commits are created regularly after completing each feature.

Example:

```bash
git add .
git commit -m "feat: add appointment management"
git push
```

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd DentalBook
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm run dev
```

The API will run on:

```text
http://localhost:5000
```

### 3. Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
```

Start the frontend:

```bash
npm run dev
```

The frontend will run on the Vite development URL.

---

## 📊 Application Flow

### Patient Flow

```text
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
```

### Admin Flow

```text
Login
  ↓
Admin Dashboard
  ↓
Appointments
  ↓
Patients
  ↓
Services
  ↓
Schedules
  ↓
Clinic Management
```

---

## 🎯 Project Benefits

DentalBook provides:

- Centralized clinic management
- Easier appointment booking
- Better schedule organization
- Prevention of appointment conflicts
- Secure authentication
- Role-based access
- Modern responsive interface
- REST API architecture
- Scalable project structure

---

## 📌 Project Status

### Backend

- Authentication
- JWT Authorization
- Users / Patients
- Services CRUD
- Schedules CRUD
- Appointments CRUD
- Appointment validation
- Business rules
- Unit tests
- Integration tests

### Frontend

- Authentication
- Admin Dashboard
- Admin Appointments
- Admin Patients
- Admin Services
- Admin Schedules
- Patient Dashboard
- Book Appointment
- My Appointments
- Patient Profile
- Search & Filters
- Pagination
- Responsive Design
- Toast Notifications

---

## 🏁 Conclusion

DentalBook is a complete Full Stack MERN application designed to digitalize dental clinic management.

The project combines:

```text
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
```

The final solution provides dedicated experiences for both Administrators and Patients, with secure authentication, appointment management, schedule management, service management and a responsive modern interface.

---

## 👨‍💻 DentalBook

**Dental Clinic Management Platform**

**Full Stack MERN Application**
