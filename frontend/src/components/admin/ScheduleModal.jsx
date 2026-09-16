import { useEffect, useState } from "react";

function ScheduleModal({
  isOpen,
  onClose,
  onSubmit,
  schedule = null,
  isLoading,
}) {
  const [formData, setFormData] = useState({
    day: "",
    startTime: "",
    endTime: "",
    isAvailable: true,
  });

  useEffect(() => {
    if (schedule) {
      setFormData({
        day: schedule.day,
        startTime: schedule.startTime,
        endTime: schedule.endTime,
        isAvailable: schedule.isAvailable,
      });
    } else {
      setFormData({
        day: "",
        startTime: "",
        endTime: "",
        isAvailable: true,
      });
    }
  }, [schedule]);

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6">
        <h2 className="mb-5 text-xl font-bold">
          {schedule
            ? "Edit Schedule"
            : "Add Schedule"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <select
            name="day"
            value={formData.day}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          >
            <option value="">Select Day</option>

            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
            <option>Sunday</option>
          </select>

          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          />

          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            className="w-full rounded-lg border p-3"
            required
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isAvailable"
              checked={formData.isAvailable}
              onChange={handleChange}
            />

            Available
          </label>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border px-4 py-2"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="rounded-lg bg-blue-600 px-4 py-2 text-white"
            >
              {isLoading
                ? "Saving..."
                : schedule
                ? "Update"
                : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ScheduleModal;