import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaCalendarAlt,
  FaSearch,
  FaTrash,
  FaEdit,
  FaEye,
} from "react-icons/fa";
import {
  deleteAppointment,
  getAppointments,
  updateAppointment,
} from "../../features/appointments/appointmentSlice";
import AppointmentDetailsModal from "../../components/admin/AppointmentDetailsModal";
import EditAppointmentModal from "../../components/admin/EditAppointmentModal";
import { toast } from "react-toastify";

function Appointments() {
  const dispatch = useDispatch();

  const {
    appointments,
    isLoading,
    isUpdating,
    isDeleting,
    isError,
    message,
  } = useSelector((state) => state.appointments);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [editingAppointment, setEditingAppointment] = useState(null);

  useEffect(() => {
    dispatch(getAppointments());
  }, [dispatch]);

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const patientName =
        `${appointment.userId?.firstName || ""} ${
          appointment.userId?.lastName || ""
        }`.toLowerCase();

      const serviceName =
        appointment.serviceId?.name?.toLowerCase() || "";

      const searchValue = search.toLowerCase();

      const matchesSearch =
        patientName.includes(searchValue) ||
        serviceName.includes(searchValue);

      const matchesStatus =
        statusFilter === "all" ||
        appointment.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [appointments, search, statusFilter]);

const handleStatusChange = async (id, status) => {
  const result = await dispatch(
    updateAppointment({
      id,
      appointmentData: {
        status,
      },
    })
  );

  if (updateAppointment.fulfilled.match(result)) {
    toast.success("Appointment status updated successfully");
  } else {
    toast.error(result.payload || "Failed to update appointment");
  }
};

const handleDelete = async (id) => {
  const confirmed = window.confirm(
    "Are you sure you want to delete this appointment?"
  );

  if (!confirmed) return;

  const result = await dispatch(deleteAppointment(id));

  if (deleteAppointment.fulfilled.match(result)) {
    toast.success("Appointment deleted successfully");
  } else {
    toast.error(result.payload || "Failed to delete appointment");
  }
};

  const statusStyles = {
    pending: "bg-amber-50 text-amber-700",
    confirmed: "bg-green-50 text-green-700",
    completed: "bg-blue-50 text-blue-700",
    cancelled: "bg-red-50 text-red-700",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Appointments
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage all patient appointments
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-3 text-blue-600">
          <FaCalendarAlt />

          <span className="text-sm font-semibold">
            {appointments.length} appointments
          </span>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search patient or service..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500 focus:bg-white"
            />
          </div>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500"
          >
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Error */}
      {isError && (
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
          {message}
        </div>
      )}

      {/* Loading */}
      {isLoading && (
        <div className="rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-sm">
          <p className="text-sm text-slate-500">
            Loading appointments...
          </p>
        </div>
      )}

     
      {!isLoading && filteredAppointments.length === 0 && (
        <div className="rounded-2xl border border-slate-100 bg-white p-10 text-center shadow-sm">
          <p className="text-sm font-medium text-slate-700">
            No appointments found
          </p>

          <p className="mt-1 text-sm text-slate-500">
            Try changing your search or filter.
          </p>
        </div>
      )}

      {/* Desktop table */}
      {!isLoading && filteredAppointments.length > 0 && (
        <div className="hidden overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm lg:block">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-slate-100 bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Patient
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Service
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Date
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Time
                  </th>

                  <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Status
                  </th>

                  <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredAppointments.map((appointment) => {
                  const date = new Date(
                    appointment.appointmentDate
                  );

                  return (
                    <tr
                      key={appointment._id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <p className="font-medium text-slate-900">
                          {appointment.userId?.firstName}{" "}
                          {appointment.userId?.lastName}
                        </p>

                        <p className="text-xs text-slate-500">
                          {appointment.userId?.email}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-700">
                        {appointment.serviceId?.name}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-700">
                        {date.toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-700">
                        {date.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>

                      <td className="px-6 py-4">
                        <select
                          value={appointment.status}
                          disabled={isUpdating}
                          onChange={(e) =>
                            handleStatusChange(
                              appointment._id,
                              e.target.value
                            )
                          }
                          className={`rounded-full border-0 px-3 py-1.5 text-xs font-semibold outline-none ${
                            statusStyles[appointment.status]
                          }`}
                        >
                          <option value="pending">
                            Pending
                          </option>

                          <option value="confirmed">
                            Confirmed
                          </option>

                          <option value="completed">
                            Completed
                          </option>

                          <option value="cancelled">
                            Cancelled
                          </option>
                        </select>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() =>
                                    setSelectedAppointmentId(appointment._id)
                                                                }

                            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                            title="View"
                          >
                            <FaEye />
                          </button>

                          <button
                             onClick={() => setEditingAppointment(appointment)}
                            className="rounded-lg p-2 text-blue-500 hover:bg-blue-50"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(appointment._id)
                            }
                            disabled={isDeleting}
                            className="rounded-lg p-2 text-red-500 hover:bg-red-50 disabled:opacity-50"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Mobile / Tablet cards */}
      {!isLoading && filteredAppointments.length > 0 && (
        <div className="grid gap-4 lg:hidden">
          {filteredAppointments.map((appointment) => {
            const date = new Date(
              appointment.appointmentDate
            );

            return (
              <div
                key={appointment._id}
                className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {appointment.userId?.firstName}{" "}
                      {appointment.userId?.lastName}
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      {appointment.serviceId?.name}
                    </p>
                  </div>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      statusStyles[appointment.status]
                    }`}
                  >
                    {appointment.status}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                  <div>
                    <p className="text-xs text-slate-400">
                      Date
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {date.toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Time
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {date.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                <div className="mt-4">
                  <label className="mb-2 block text-xs font-medium text-slate-500">
                    Change status
                  </label>

                  <select
                    value={appointment.status}
                    disabled={isUpdating}
                    onChange={(e) =>
                      handleStatusChange(
                        appointment._id,
                        e.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none focus:border-blue-500"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="mt-4 flex justify-end gap-2">
                  <button
                  onClick={() =>
                            setSelectedAppointmentId(appointment._id)
                                                }
                    className="rounded-xl p-3 text-slate-500 hover:bg-slate-100"
                    title="View"
                  >
                    <FaEye />
                  </button>

                  <button
                     onClick={() => setEditingAppointment(appointment)}
                    className="rounded-xl p-3 text-blue-500 hover:bg-blue-50"
                    title="Edit"
                  >
                    <FaEdit />
                  </button>

                  <button
                    onClick={() =>
                      handleDelete(appointment._id)
                    }
                    disabled={isDeleting}
                    className="rounded-xl p-3 text-red-500 hover:bg-red-50 disabled:opacity-50"
                    title="Delete"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      {selectedAppointmentId && (
  <AppointmentDetailsModal
    appointmentId={selectedAppointmentId}
    onClose={() => setSelectedAppointmentId(null)}
  />
)}
{editingAppointment && (
  <EditAppointmentModal
    appointment={editingAppointment}
    onClose={() => setEditingAppointment(null)}
  />
)}
    </div>
  );
  
}

export default Appointments;