import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaCalendarAlt,
  FaClock,
  FaStethoscope,
  FaNotesMedical,
} from "react-icons/fa";

import { getMyAppointments } from "../../features/appointments/appointmentSlice";

function Appointments() {
  const dispatch = useDispatch();

  const {
    appointments,
    isLoading,
    isError,
    message,
  } = useSelector((state) => state.appointments);

  const [currentPage, setCurrentPage] = useState(1);

  const appointmentsPerPage = 2;

  useEffect(() => {
    dispatch(getMyAppointments());
  }, [dispatch]);

  // Pagination
  const totalPages = Math.ceil(
    appointments.length / appointmentsPerPage
  );

  const startIndex =
    (currentPage - 1) * appointmentsPerPage;

  const currentAppointments = appointments.slice(
    startIndex,
    startIndex + appointmentsPerPage
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-green-50 text-green-600";

      case "completed":
        return "bg-blue-50 text-blue-600";

      case "cancelled":
        return "bg-red-50 text-red-600";

      default:
        return "bg-yellow-50 text-yellow-600";
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            My Appointments
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            View and track your dental appointments.
          </p>
        </div>

        <a
          href="/patient/book"
          className="rounded-xl bg-blue-600 px-5 py-3 text-center text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Book Appointment
        </a>
      </div>

     
      {isLoading && (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <p className="text-sm text-slate-500">
            Loading your appointments...
          </p>
        </div>
      )}

     
      {isError && !isLoading && (
        <div className="rounded-2xl bg-red-50 p-5 text-sm font-medium text-red-600">
          {message}
        </div>
      )}

      {!isLoading &&
        !isError &&
        appointments.length === 0 && (
          <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <FaCalendarAlt className="text-xl" />
            </div>

            <h2 className="text-lg font-semibold text-slate-900">
              No appointments yet
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              You don't have any appointments at the moment.
            </p>

            <a
              href="/patient/book"
              className="mt-5 inline-block rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Book Your First Appointment
            </a>
          </div>
        )}

      {!isLoading &&
        !isError &&
        currentAppointments.length > 0 && (
          <>
            <div className="space-y-4">
              {currentAppointments.map((appointment) => (
                <div
                  key={appointment._id}
                  className="rounded-2xl bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
                >
                  {/* Top */}
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                    <div>
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                          <FaStethoscope />
                        </div>

                        <div>
                          <h2 className="font-semibold text-slate-900">
                            {appointment.serviceId?.name ||
                              "Dental Service"}
                          </h2>

                          <p className="text-sm text-slate-500">
                            {appointment.serviceId?.price
                              ? `${appointment.serviceId.price} MAD`
                              : ""}
                          </p>
                        </div>
                      </div>
                    </div>

                    <span
                      className={`w-fit rounded-full px-3 py-1 text-xs font-semibold capitalize ${getStatusStyle(
                        appointment.status
                      )}`}
                    >
                      {appointment.status}
                    </span>
                  </div>

                 
                  <div className="mt-5 grid gap-4 border-t border-slate-100 pt-5 sm:grid-cols-2">
                    <div className="flex items-center gap-3">
                      <FaCalendarAlt className="text-blue-600" />

                      <div>
                        <p className="text-xs text-slate-400">
                          Date
                        </p>

                        <p className="text-sm font-medium text-slate-700">
                          {formatDate(
                            appointment.appointmentDate
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FaClock className="text-blue-600" />

                      <div>
                        <p className="text-xs text-slate-400">
                          Time
                        </p>

                        <p className="text-sm font-medium text-slate-700">
                          {formatTime(
                            appointment.appointmentDate
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <FaStethoscope className="text-blue-600" />

                      <div>
                        <p className="text-xs text-slate-400">
                          Schedule
                        </p>

                        <p className="text-sm font-medium text-slate-700">
                          {appointment.scheduleId?.day}{" "}
                          {appointment.scheduleId?.startTime} -{" "}
                          {appointment.scheduleId?.endTime}
                        </p>
                      </div>
                    </div>

                    {appointment.notes && (
                      <div className="flex items-start gap-3">
                        <FaNotesMedical className="mt-1 text-blue-600" />

                        <div>
                          <p className="text-xs text-slate-400">
                            Notes
                          </p>

                          <p className="text-sm text-slate-700">
                            {appointment.notes}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

          
            {totalPages > 1 && (
              <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm sm:flex-row">
                <p className="text-sm text-slate-500">
                  Page {currentPage} of {totalPages}
                </p>

                <div className="flex items-center gap-2">
                 
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
          </>
        )}
    </div>
  );
}

export default Appointments;