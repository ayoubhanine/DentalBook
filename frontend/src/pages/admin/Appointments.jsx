import { useEffect, useState } from "react";
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


  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 4;

  useEffect(() => {
    dispatch(getAppointments());
  }, [dispatch]);


  const filteredAppointments = appointments.filter((appointment) => {
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

 
  const totalPages = Math.ceil(
    filteredAppointments.length / appointmentsPerPage
  );

  const startIndex =
    (currentPage - 1) * appointmentsPerPage;

  const currentAppointments = filteredAppointments.slice(
    startIndex,
    startIndex + appointmentsPerPage
  );

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
      toast.error(
        result.payload || "Failed to update appointment"
      );
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

      // If current page becomes empty after delete
      if (
        currentAppointments.length === 1 &&
        currentPage > 1
      ) {
        setCurrentPage((prev) => prev - 1);
      }
    } else {
      toast.error(
        result.payload || "Failed to delete appointment"
      );
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
   
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Appointments
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage and monitor patient appointments.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-3 text-blue-600">
          <FaCalendarAlt />
          <span className="text-sm font-medium">
            {filteredAppointments.length} appointment
            {filteredAppointments.length !== 1 ? "s" : ""}
          </span>
        </div>
      </div>

   
      <div className="rounded-2xl bg-white p-4 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row">
         
          <div className="relative flex-1">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              placeholder="Search by patient or service..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

    
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          >
            <option value="all">All statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

    
      {isError && (
        <div className="rounded-xl bg-red-50 p-4 text-sm text-red-600">
          {message}
        </div>
      )}

     
      {isLoading ? (
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <p className="text-sm text-slate-500">
            Loading appointments...
          </p>
        </div>
      ) : filteredAppointments.length === 0 ? (
       
        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
          <FaCalendarAlt className="mx-auto mb-4 text-4xl text-slate-300" />

          <h3 className="text-lg font-semibold text-slate-700">
            No appointments found
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Try changing your search or filter.
          </p>
        </div>
      ) : (
        <>
        
          <div className="hidden overflow-hidden rounded-2xl bg-white shadow-sm md:block">
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
                      Status
                    </th>

                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                  {currentAppointments.map((appointment) => (
                    <tr
                      key={appointment._id}
                      className="transition hover:bg-slate-50"
                    >
                  
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-slate-800">
                            {appointment.userId?.firstName}{" "}
                            {appointment.userId?.lastName}
                          </p>

                          <p className="text-xs text-slate-500">
                            {appointment.userId?.email}
                          </p>
                        </div>
                      </td>

                  
                      <td className="px-6 py-4">
                        <p className="text-sm font-medium text-slate-700">
                          {appointment.serviceId?.name}
                        </p>

                        <p className="text-xs text-slate-500">
                          {appointment.serviceId?.duration} min
                        </p>
                      </td>

                     
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-700">
                          {new Date(
                            appointment.appointmentDate
                          ).toLocaleDateString()}
                        </p>

                        <p className="text-xs text-slate-500">
                          {new Date(
                            appointment.appointmentDate
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
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
                            statusStyles[
                              appointment.status
                            ]
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
                            type="button"
                            onClick={() =>
                              setSelectedAppointmentId(
                                appointment._id
                              )
                            }
                            className="rounded-lg p-2 text-blue-600 transition hover:bg-blue-50"
                            title="View"
                          >
                            <FaEye />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              setEditingAppointment(
                                appointment
                              )
                            }
                            className="rounded-lg p-2 text-amber-600 transition hover:bg-amber-50"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>

                          <button
                            type="button"
                            disabled={isDeleting}
                            onClick={() =>
                              handleDelete(
                                appointment._id
                              )
                            }
                            className="rounded-lg p-2 text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

         
          <div className="space-y-4 md:hidden">
            {currentAppointments.map((appointment) => (
              <div
                key={appointment._id}
                className="rounded-2xl bg-white p-5 shadow-sm"
              >
             
                <div className="mb-4">
                  <p className="font-semibold text-slate-800">
                    {appointment.userId?.firstName}{" "}
                    {appointment.userId?.lastName}
                  </p>

                  <p className="text-xs text-slate-500">
                    {appointment.userId?.email}
                  </p>
                </div>

             
                <div className="mb-3">
                  <p className="text-xs font-medium uppercase text-slate-400">
                    Service
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {appointment.serviceId?.name}
                  </p>
                </div>

                
                <div className="mb-3">
                  <p className="text-xs font-medium uppercase text-slate-400">
                    Date
                  </p>

                  <p className="mt-1 text-sm text-slate-700">
                    {new Date(
                      appointment.appointmentDate
                    ).toLocaleDateString()}
                  </p>

                  <p className="text-xs text-slate-500">
                    {new Date(
                      appointment.appointmentDate
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                
                <div className="mb-4">
                  <p className="mb-2 text-xs font-medium uppercase text-slate-400">
                    Status
                  </p>

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
                </div>

               
                <div className="flex gap-2 border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedAppointmentId(
                        appointment._id
                      )
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100"
                  >
                    <FaEye />
                    View
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setEditingAppointment(appointment)
                    }
                    className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-sm font-medium text-amber-600 transition hover:bg-amber-100"
                  >
                    <FaEdit />
                    Edit
                  </button>

                  <button
                    type="button"
                    disabled={isDeleting}
                    onClick={() =>
                      handleDelete(appointment._id)
                    }
                    className="flex items-center justify-center rounded-lg bg-red-50 px-3 py-2 text-red-600 transition hover:bg-red-100 disabled:opacity-50"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

        
          {totalPages > 1 && (
            <div className="flex flex-col items-center justify-between gap-4 rounded-2xl bg-white p-4 shadow-sm sm:flex-row">
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

   
      {selectedAppointmentId && (
        <AppointmentDetailsModal
          appointmentId={selectedAppointmentId}
          onClose={() =>
            setSelectedAppointmentId(null)
          }
        />
      )}

      
      {editingAppointment && (
        <EditAppointmentModal
          appointment={editingAppointment}
          onClose={() =>
            setEditingAppointment(null)
          }
        />
      )}
    </div>
  );
}

export default Appointments;