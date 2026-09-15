import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaCalendarAlt,
  FaClock,
  FaTimes,
} from "react-icons/fa";
import { updateAppointment } from "../../features/appointments/appointmentSlice";

function EditAppointmentModal({ appointment, onClose }) {
  const dispatch = useDispatch();

  const { isUpdating } = useSelector(
    (state) => state.appointments
  );

  const [formData, setFormData] = useState({
    appointmentDate: "",
    status: "pending",
    notes: "",
    scheduleId: "",
  });

  useEffect(() => {
    if (!appointment) return;

    const date = new Date(appointment.appointmentDate);

    const formattedDate = date.toISOString().slice(0, 16);

    setFormData({
      appointmentDate: formattedDate,
      status: appointment.status || "pending",
      notes: appointment.notes || "",
      scheduleId: appointment.scheduleId?._id || "",
    });
  }, [appointment]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(
      updateAppointment({
        id: appointment._id,
        appointmentData: {
          appointmentDate: formData.appointmentDate,
          status: formData.status,
          notes: formData.notes,
          ...(formData.scheduleId && {
            scheduleId: formData.scheduleId,
          }),
        },
      })
    );

    if (updateAppointment.fulfilled.match(result)) {
      onClose();
    }
  };

  if (!appointment) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div className="w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl">
      
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Edit Appointment
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Update appointment information
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isUpdating}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
          >
            <FaTimes />
          </button>
        </div>

  
        <form onSubmit={handleSubmit}>
          <div className="max-h-[70vh] space-y-5 overflow-y-auto p-5 sm:p-6">
          
            <div className="rounded-xl bg-slate-50 p-4">
              <p className="text-xs text-slate-500">
                Patient
              </p>

              <p className="mt-1 font-semibold text-slate-900">
                {appointment.userId?.firstName}{" "}
                {appointment.userId?.lastName}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {appointment.serviceId?.name}
              </p>
            </div>

          
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Appointment date
              </label>

              <div className="relative">
                <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="datetime-local"
                  name="appointmentDate"
                  value={formData.appointmentDate}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500"
                />
              </div>
            </div>

          
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
              >
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

           
            <div>
              {/* <label className="mb-2 block text-sm font-medium text-slate-700">
                Schedule ID
              </label>

              <div className="relative">
                <FaClock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  name="scheduleId"
                  value={formData.scheduleId}
                  onChange={handleChange}
                  placeholder="Schedule ID"
                  className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-blue-500"
                />
              </div> */}

              {/* <p className="mt-1 text-xs text-slate-400">
                Leave empty if no schedule is assigned.
              </p> */}
            </div>

          
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700">
                  Notes
                </label>

                <span className="text-xs text-slate-400">
                  {formData.notes.length}/500
                </span>
              </div>

              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                maxLength={500}
                rows={4}
                placeholder="Add notes..."
                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-blue-500"
              />
            </div>
          </div>

         
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isUpdating}
              className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isUpdating}
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isUpdating ? "Saving..." : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditAppointmentModal;