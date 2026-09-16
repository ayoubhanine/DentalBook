import {
  FaCalendarCheck,
  FaClock,
  FaCheckCircle,
  FaCalendarPlus,
} from "react-icons/fa";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { getMyAppointments } from "../../features/appointments/appointmentSlice";

function Dashboard() {
  const dispatch = useDispatch();

  const { appointments, isLoading, isError, message } =
    useSelector((state) => state.appointments);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(getMyAppointments());
  }, [dispatch]);

  const pendingAppointments = appointments.filter(
    (appointment) => appointment.status === "pending"
  ).length;

  const confirmedAppointments = appointments.filter(
    (appointment) => appointment.status === "confirmed"
  ).length;

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "completed"
  ).length;

  const upcomingAppointment = appointments
    .filter(
      (appointment) =>
        new Date(appointment.appointmentDate) > new Date() &&
        appointment.status !== "cancelled"
    )
    .sort(
      (a, b) =>
        new Date(a.appointmentDate) -
        new Date(b.appointmentDate)
    )[0];

  return (
    <div className="space-y-6 sm:space-y-8">
     
      <div>
        <p className="text-sm font-medium text-blue-600">
          Patient Dashboard
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
          Welcome back, {user?.user?.firstName || "Patient"} 👋
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
          Manage your appointments and dental care.
        </p>
      </div>

     
      <div className="rounded-2xl bg-blue-600 p-5 text-white shadow-sm sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-lg font-semibold sm:text-xl">
              Need a dental appointment?
            </h2>

            <p className="mt-1 text-sm text-blue-100">
              Book your next appointment quickly and easily.
            </p>
          </div>

          <Link
            to="/patient/book"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            <FaCalendarPlus />
            Book Appointment
          </Link>
        </div>
      </div>

    
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Total Appointments
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {appointments.length}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FaCalendarCheck />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Pending
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {pendingAppointments}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <FaClock />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Confirmed
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {confirmedAppointments}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <FaCalendarCheck />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-500">
                Completed
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {completedAppointments}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <FaCheckCircle />
            </div>
          </div>
        </div>
      </div>

      
      <div className="rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Upcoming Appointment
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Your next scheduled dental appointment
          </p>
        </div>

        {isLoading && (
          <div className="p-6 text-sm text-slate-500">
            Loading appointment...
          </div>
        )}

        {isError && !isLoading && (
          <div className="m-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
            {message}
          </div>
        )}

        {!isLoading &&
          !isError &&
          !upcomingAppointment && (
            <div className="p-8 text-center">
              <p className="font-medium text-slate-700">
                No upcoming appointments
              </p>

              <p className="mt-1 text-sm text-slate-500">
                You can book a new appointment whenever you need.
              </p>

              <Link
                to="/patient/book"
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                <FaCalendarPlus />
                Book Appointment
              </Link>
            </div>
          )}

        {!isLoading &&
          !isError &&
          upcomingAppointment && (
            <div className="p-5 sm:p-6">
              <div className="rounded-xl border border-blue-100 bg-blue-50 p-4 sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-blue-500">
                      Service
                    </p>

                    <h3 className="mt-1 text-lg font-semibold text-slate-900">
                      {upcomingAppointment.serviceId?.name ||
                        "Dental Service"}
                    </h3>
                  </div>

                  <span className="w-fit rounded-full bg-amber-100 px-3 py-1 text-xs font-medium capitalize text-amber-700">
                    {upcomingAppointment.status}
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 border-t border-blue-100 pt-4 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-slate-500">
                      Date
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-800">
                      {new Date(
                        upcomingAppointment.appointmentDate
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Time
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-800">
                      {new Date(
                        upcomingAppointment.appointmentDate
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}

export default Dashboard;