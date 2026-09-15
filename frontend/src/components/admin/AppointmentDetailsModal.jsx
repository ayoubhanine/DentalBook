import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaCalendarAlt,
  FaClock,
  FaEnvelope,
  FaPhone,
  FaTimes,
  FaUser,
} from "react-icons/fa";
import {
  clearSelectedAppointment,
  getAppointmentById,
} from "../../features/appointments/appointmentSlice";

function AppointmentDetailsModal({ appointmentId, onClose }) {
  const dispatch = useDispatch();

  const { selectedAppointment, isLoading, isError, message } =
    useSelector((state) => state.appointments);

  useEffect(() => {
    if (appointmentId) {
      dispatch(getAppointmentById(appointmentId));
    }

    return () => {
      dispatch(clearSelectedAppointment());
    };
  }, [appointmentId, dispatch]);

  if (!appointmentId) {
    return null;
  }

  const statusStyles = {
    pending: "bg-amber-50 text-amber-700",
    confirmed: "bg-green-50 text-green-700",
    completed: "bg-blue-50 text-blue-700",
    cancelled: "bg-red-50 text-red-700",
  };

  const appointmentDate = selectedAppointment
    ? new Date(selectedAppointment.appointmentDate)
    : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
    
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Appointment Details
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              View appointment information
            </p>
          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
            aria-label="Close"
          >
            <FaTimes />
          </button>
        </div>

       
        <div className="max-h-[75vh] overflow-y-auto p-5 sm:p-6">
          {isLoading && (
            <div className="py-10 text-center">
              <p className="text-sm text-slate-500">
                Loading appointment...
              </p>
            </div>
          )}

          {isError && (
            <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
              {message}
            </div>
          )}

          {!isLoading && !isError && selectedAppointment && (
            <div className="space-y-6">
              {/* Patient */}
              <div className="rounded-2xl bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    <FaUser />
                  </div>

                  <div>
                    <p className="text-xs text-slate-500">
                      Patient
                    </p>

                    <h3 className="font-semibold text-slate-900">
                      {selectedAppointment.userId?.firstName}{" "}
                      {selectedAppointment.userId?.lastName}
                    </h3>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <FaEnvelope className="text-slate-400" />
                    {selectedAppointment.userId?.email}
                  </div>

                  <div className="flex items-center gap-3 text-sm text-slate-600">
                    <FaPhone className="text-slate-400" />
                    {selectedAppointment.userId?.phone || "N/A"}
                  </div>
                </div>
              </div>

              
              <div>
                <h3 className="mb-3 text-sm font-semibold text-slate-900">
                  Appointment Information
                </h3>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-slate-100 p-4">
                    <p className="text-xs text-slate-400">
                      Service
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-800">
                      {selectedAppointment.serviceId?.name || "N/A"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-100 p-4">
                    <p className="text-xs text-slate-400">
                      Price
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-800">
                      {selectedAppointment.serviceId?.price ?? "N/A"} MAD
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-100 p-4">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <FaCalendarAlt />
                      Date
                    </div>

                    <p className="mt-1 text-sm font-medium text-slate-800">
                      {appointmentDate?.toLocaleDateString() || "N/A"}
                    </p>
                  </div>

                  <div className="rounded-xl border border-slate-100 p-4">
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <FaClock />
                      Time
                    </div>

                    <p className="mt-1 text-sm font-medium text-slate-800">
                      {appointmentDate?.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      }) || "N/A"}
                    </p>
                  </div>
                </div>
              </div>

              
              <div>
                <p className="mb-2 text-sm font-semibold text-slate-900">
                  Status
                </p>

                <span
                  className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${
                    statusStyles[selectedAppointment.status]
                  }`}
                >
                  {selectedAppointment.status}
                </span>
              </div>

              
              <div>
                <p className="mb-2 text-sm font-semibold text-slate-900">
                  Notes
                </p>

                <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                  {selectedAppointment.notes || "No notes"}
                </div>
              </div>
            </div>
          )}
        </div>

       
        <div className="border-t border-slate-100 px-5 py-4 sm:px-6">
          <button
            onClick={onClose}
            className="w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default AppointmentDetailsModal;