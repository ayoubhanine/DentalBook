import {
  FaCalendarCheck,
  FaClock,
  FaCheckCircle,
  FaClipboardList,
} from "react-icons/fa";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAppointments } from "../../features/appointments/appointmentSlice";

import StatCard from "../../components/admin/StatCard";

function Dashboard() {
    
 const dispatch = useDispatch();

const { appointments, isLoading, isError, message } = useSelector(
  (state) => state.appointments
);

useEffect(() => {
  dispatch(getAppointments());
}, [dispatch]);
const totalAppointments = appointments.length;

const pendingAppointments = appointments.filter(
  (appointment) => appointment.status === "pending"
).length;

const confirmedAppointments = appointments.filter(
  (appointment) => appointment.status === "confirmed"
).length;

const completedAppointments = appointments.filter(
  (appointment) => appointment.status === "completed"
).length;

const statusStyles = {
  pending: "bg-amber-50 text-amber-700",
  confirmed: "bg-green-50 text-green-700",
  completed: "bg-blue-50 text-blue-700",
  cancelled: "bg-red-50 text-red-700",
};

  return (
    <div className="space-y-8">
     
      <div>
        <p className="text-sm font-medium text-blue-600">
          Dashboard
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          Cabinet Overview
        </h1>

        <p className="mt-2 text-slate-500">
          Monitor your dental clinic activity and appointments.
        </p>
      </div>

      
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Appointments"
          value={totalAppointments}
          description="All appointments"
          icon={<FaCalendarCheck />}
        />

        <StatCard
          title="Pending Appointments"
          value={pendingAppointments}
          description="Waiting for confirmation"
          icon={<FaClock />}
        />

        <StatCard
          title="Confirmed"
          value={confirmedAppointments}
          description="Confirmed appointments"
          icon={<FaCheckCircle />}
        />

        <StatCard
          title="Completed"
          value={completedAppointments}
          description="Completed appointments"
          icon={<FaClipboardList />}
        />
      </div>

    
      <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Appointment Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Recent clinic appointments
            </p>
          </div>

          <button className="text-sm font-semibold text-blue-600 hover:text-blue-700">
            View all
          </button>
        </div>
                {isLoading && (
            <div className="flex justify-center py-10">
                <p className="text-slate-500">Loading appointments...</p>
            </div>
            )}

            {isError && (
            <div className="rounded-xl bg-red-50 p-4 text-red-600">
                {message}
            </div>
            )}
       
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-400">
                <th className="px-6 py-4 font-medium">Patient</th>
                <th className="px-6 py-4 font-medium">Service</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Time</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Action</th>
              </tr>
            </thead>

        <tbody>
  {appointments.map((appointment) => {
    const appointmentDate = new Date(appointment.appointmentDate);

    return (
      <tr
        key={appointment._id}
        className="border-b border-slate-50 last:border-none"
      >
        <td className="px-6 py-4 text-sm font-medium text-slate-800">
          {appointment.userId.firstName} {appointment.userId.lastName}
        </td>

        <td className="px-6 py-4 text-sm text-slate-600">
          {appointment.serviceId.name}
        </td>

        <td className="px-6 py-4 text-sm text-slate-600">
          {appointmentDate.toLocaleDateString()}
        </td>

        <td className="px-6 py-4 text-sm text-slate-600">
          {appointmentDate.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </td>

        <td className="px-6 py-4">
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              statusStyles[appointment.status]
            }`}
          >
            {appointment.status}
          </span>
        </td>

        <td className="px-6 py-4">
          <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
            View
          </button>
        </td>
      </tr>
    );
  })}
</tbody>
          </table>
        </div>

        <div className="space-y-4 p-4 md:hidden">
          {appointments.map((appointment) => (
            <div
              key={`${appointment.userId.firstName}-${appointment.userId.lastName}-${appointment.time}-mobile`}
              className="rounded-xl border border-slate-100 p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-slate-800">
                    {appointment.userId.firstName} {appointment.userId.lastName}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                   {appointment.serviceId.name}
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    statusStyles[appointment.status]
                  }`}
                >
                  {appointment.status}
                </span>
              </div>

              <div className="mt-4 flex justify-between text-sm text-slate-500">
                <span>{appointment.date}</span>
                <span>{appointment.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;