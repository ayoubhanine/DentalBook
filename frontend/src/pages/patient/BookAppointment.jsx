import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClock,
  FaStethoscope,
  FaNotesMedical,
} from "react-icons/fa";

import { getServices } from "../../features/services/serviceSlice";
import { getSchedules } from "../../features/schedules/scheduleSlice";
import {
  createAppointment,
  resetAppointmentStatus,
} from "../../features/appointments/appointmentSlice";

function BookAppointment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { services, isLoading: servicesLoading } = useSelector(
    (state) => state.services
  );

  const { schedules, isLoading: schedulesLoading } = useSelector(
    (state) => state.schedules
  );

  const {
    isCreating,
    isError,
    isSuccess,
    message,
  } = useSelector((state) => state.appointments);

  const [formData, setFormData] = useState({
    serviceId: "",
    appointmentDate: "",
    scheduleId: "",
    notes: "",
  });

  useEffect(() => {
    dispatch(getServices());
    dispatch(getSchedules());

    return () => {
      dispatch(resetAppointmentStatus());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess) {
      setFormData({
        serviceId: "",
        appointmentDate: "",
        scheduleId: "",
        notes: "",
      });

      setTimeout(() => {
        dispatch(resetAppointmentStatus());
        navigate("/patient/appointments");
      }, 1000);
    }
  }, [isSuccess, dispatch, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createAppointment(formData));
  };

  return (
    <div className="mx-auto max-w-3xl">
      
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          Book an Appointment
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Schedule your dental appointment with us.
        </p>
      </div>

   
      <div className="rounded-2xl bg-white p-6 shadow-sm sm:p-8">
       
        {isSuccess && (
          <div className="mb-6 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            Appointment booked successfully! Redirecting...
          </div>
        )}

     
        {isError && (
          <div className="mb-6 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
         
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <FaStethoscope className="text-blue-600" />
              Dental Service
            </label>

            <select
              name="serviceId"
              value={formData.serviceId}
              onChange={handleChange}
              required
              disabled={servicesLoading}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">
                {servicesLoading
                  ? "Loading services..."
                  : "Select a service"}
              </option>

              {services.map((service) => (
                <option key={service._id} value={service._id}>
                  {service.name}
                  {service.price ? ` - ${service.price} MAD` : ""}
                </option>
              ))}
            </select>
          </div>

         
          <div>
  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
    <FaCalendarAlt className="text-blue-600" />
    Appointment Date & Time
  </label>

  <input
    type="datetime-local"
    name="appointmentDate"
    value={formData.appointmentDate}
    onChange={handleChange}
    required
    min={new Date().toISOString().slice(0, 16)}
    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
  />

  <p className="mt-1 text-xs text-slate-400">
    Choose a date and time between 09:00 and 18:00.
  </p>
</div>

         
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <FaClock className="text-blue-600" />
              Schedule
            </label>

            <select
              name="scheduleId"
              value={formData.scheduleId}
              onChange={handleChange}
              required
              disabled={schedulesLoading}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              <option value="">
                {schedulesLoading
                  ? "Loading schedules..."
                  : "Select a schedule"}
              </option>

              {schedules.map((schedule) => (
                <option key={schedule._id} value={schedule._id}>
                  {schedule.day} - {schedule.startTime} to{" "}
                  {schedule.endTime}
                </option>
              ))}
            </select>
          </div>

         
          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700">
              <FaNotesMedical className="text-blue-600" />
              Notes
            </label>

            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              maxLength={500}
              rows={4}
              placeholder="Add any notes or information for the dentist..."
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />

            <p className="mt-1 text-right text-xs text-slate-400">
              {formData.notes.length}/500
            </p>
          </div>

         
          <button
            type="submit"
            disabled={isCreating}
            className="w-full rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isCreating ? "Booking..." : "Book Appointment"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BookAppointment;