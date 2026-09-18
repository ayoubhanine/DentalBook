import {
  FaCalendarCheck,
  FaClock,
  FaCheckCircle,
  FaClipboardList,
} from "react-icons/fa";
import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAppointments } from "../../features/appointments/appointmentSlice";
import StatCard from "../../components/admin/StatCard";

function Dashboard() {
  const dispatch = useDispatch();

  const {
    appointments,
    isLoading,
    isError,
    message,
  } = useSelector((state) => state.appointments);
  const [currentPage, setCurrentPage] = useState(1);
const appointmentsPerPage = 4;
const totalPages=Math.ceil(
  appointments.length/appointmentsPerPage);
  const startIndex =
  (currentPage - 1) * appointmentsPerPage;

const currentAppointments = appointments.slice(
  startIndex,
  startIndex + appointmentsPerPage
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
    <div className="space-y-6 sm:space-y-8">
      
      <div>
        <p className="text-sm font-medium text-blue-600">
          Dashboard
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
          Cabinet Overview
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500 sm:text-base">
          Monitor your dental clinic activity and appointments.
        </p>
      </div>

     
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
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
    
        <div className="border-b border-slate-100 p-4 sm:p-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 sm:text-xl">
              Appointment Overview
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Recent clinic appointments
            </p>
          </div>
        </div>

      
        {isLoading && (
          <div className="flex items-center justify-center px-4 py-12">
            <p className="text-sm text-slate-500">
              Loading appointments...
            </p>
          </div>
        )}

    
        {isError && !isLoading && (
          <div className="m-4 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 sm:m-6">
            {message}
          </div>
        )}

        
        {!isLoading &&
          !isError &&
          appointments.length === 0 && (
            <div className="px-4 py-12 text-center sm:px-6">
              <p className="font-medium text-slate-700">
                No appointments found
              </p>

              <p className="mt-1 text-sm text-slate-500">
                There are currently no appointments.
              </p>
            </div>
          )}

        {!isLoading &&
          !isError &&
          currentAppointments.length > 0 && (
            <>
              <div className="hidden overflow-x-auto md:block">
                <table className="w-full min-w-175">
                  <thead>
                    <tr className="border-b border-slate-100 text-left text-xs uppercase tracking-wide text-slate-400">
                      <th className="px-4 py-4 font-medium lg:px-6">
                        Patient
                      </th>

                      <th className="px-4 py-4 font-medium lg:px-6">
                        Service
                      </th>

                      <th className="px-4 py-4 font-medium lg:px-6">
                        Date
                      </th>

                      <th className="px-4 py-4 font-medium lg:px-6">
                        Time
                      </th>

                      <th className="px-4 py-4 font-medium lg:px-6">
                        Status
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {currentAppointments.map((appointment) => {
                      const appointmentDate = new Date(
                        appointment.appointmentDate
                      );

                      return (
                        <tr
                          key={appointment._id}
                          className="border-b border-slate-50 transition last:border-none hover:bg-slate-50"
                        >
                         
                          <td className="px-4 py-4 text-sm font-medium text-slate-800 lg:px-6">
                            {appointment.userId?.firstName}{" "}
                            {appointment.userId?.lastName}
                          </td>

                          <td className="px-4 py-4 text-sm text-slate-600 lg:px-6">
                            {appointment.serviceId?.name}
                          </td>

                        
                          <td className="px-4 py-4 text-sm text-slate-600 lg:px-6">
                            {appointmentDate.toLocaleDateString()}
                          </td>

                          <td className="px-4 py-4 text-sm text-slate-600 lg:px-6">
                            {appointmentDate.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </td>

                          
                          <td className="px-4 py-4 lg:px-6">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                                statusStyles[appointment.status] ||
                                "bg-slate-100 text-slate-600"
                              }`}
                            >
                              {appointment.status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

            
              <div className="space-y-3 p-4 md:hidden">
                {currentAppointments.map((appointment) => {
                  const appointmentDate = new Date(
                    appointment.appointmentDate
                  );

                  return (
                    <div
                      key={appointment._id}
                      className="rounded-xl border border-slate-100 p-4 transition hover:bg-slate-50"
                    >
                     
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="truncate font-semibold text-slate-800">
                            {appointment.userId?.firstName}{" "}
                            {appointment.userId?.lastName}
                          </h3>

                          <p className="mt-1 truncate text-sm text-slate-500">
                            {appointment.serviceId?.name}
                          </p>
                        </div>

                        <span
                          className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                            statusStyles[appointment.status] ||
                            "bg-slate-100 text-slate-600"
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </div>

                     
                      <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
                        <span>
                          {appointmentDate.toLocaleDateString()}
                        </span>

                        <span>
                          {appointmentDate.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
      </div>
             {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm sm:flex-row">
                <p className="text-sm text-slate-500">
                  Page {currentPage} of {totalPages}
                </p>

                <div className="flex items-center gap-2">
                  {/* Previous */}
                  <button
                    type="button"
                    disabled={currentPage === 1}
                    onClick={() =>
                      setCurrentPage((prev) => prev - 1)
                    }
                    className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Previous
                  </button>

                  {/* Pages */}
                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((page) => (
                    <button
                      key={page}
                      type="button"
                      onClick={() => setCurrentPage(page)}
                      className={`h-9 w-9 rounded-lg text-sm font-medium transition ${
                        currentPage === page
                          ? "bg-blue-600 text-white"
                          : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}

             
                  <button
                    type="button"
                    disabled={currentPage === totalPages}
                    onClick={() =>
                      setCurrentPage((prev) => prev + 1)
                    }
                    className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
    </div>
  );
}

export default Dashboard;
