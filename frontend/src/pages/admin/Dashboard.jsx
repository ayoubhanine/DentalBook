import {
  FaCalendarCheck,
  FaClock,
  FaCheckCircle,
  FaClipboardList,
} from "react-icons/fa";

import StatCard from "../../components/admin/StatCard";

function Dashboard() {
  const appointments = [
    {
      patient: "John Doe",
      service: "Dental Cleaning",
      date: "14 Sep 2026",
      time: "09:00",
      status: "Confirmed",
    },
    {
      patient: "Sarah Smith",
      service: "Teeth Whitening",
      date: "14 Sep 2026",
      time: "10:30",
      status: "Pending",
    },
    {
      patient: "Michael Brown",
      service: "Dental Examination",
      date: "14 Sep 2026",
      time: "13:00",
      status: "Completed",
    },
  ];

  const statusStyles = {
    Confirmed: "bg-green-50 text-green-700",
    Pending: "bg-amber-50 text-amber-700",
    Completed: "bg-blue-50 text-blue-700",
    Cancelled: "bg-red-50 text-red-700",
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <p className="text-sm font-medium text-blue-600">
          Dashboard
        </p>

        <h1 className="mt-1 text-3xl font-bold text-slate-900">
          Clinic Overview
        </h1>

        <p className="mt-2 text-slate-500">
          Monitor your dental clinic activity and appointments.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Appointments"
          value="248"
          description="All appointments"
          icon={<FaCalendarCheck />}
        />

        <StatCard
          title="Pending Appointments"
          value="24"
          description="Waiting for confirmation"
          icon={<FaClock />}
        />

        <StatCard
          title="Confirmed"
          value="156"
          description="Confirmed appointments"
          icon={<FaCheckCircle />}
        />

        <StatCard
          title="Completed"
          value="68"
          description="Completed appointments"
          icon={<FaClipboardList />}
        />
      </div>

      {/* Appointment Overview */}
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

        {/* Desktop table */}
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
              {appointments.map((appointment) => (
                <tr
                  key={`${appointment.patient}-${appointment.time}`}
                  className="border-b border-slate-50 last:border-none"
                >
                  <td className="px-6 py-4 text-sm font-medium text-slate-800">
                    {appointment.patient}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {appointment.service}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {appointment.date}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-600">
                    {appointment.time}
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
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="space-y-4 p-4 md:hidden">
          {appointments.map((appointment) => (
            <div
              key={`${appointment.patient}-${appointment.time}-mobile`}
              className="rounded-xl border border-slate-100 p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-slate-800">
                    {appointment.patient}
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    {appointment.service}
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