import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaEdit,
  FaPlus,
  FaSearch,
  FaTrash,
  FaToggleOn,
  FaToggleOff,
} from "react-icons/fa";
import { toast } from "react-toastify";

import {
  deleteSchedule,
  getSchedules,
  updateSchedule,
  createSchedule,
} from "../../features/schedules/scheduleSlice";
import ScheduleModal from "../../components/admin/ScheduleModal";

const dayOrder = {
  Monday: 1,
  Tuesday: 2,
  Wednesday: 3,
  Thursday: 4,
  Friday: 5,
  Saturday: 6,
  Sunday: 7,
};

function Schedules() {
  const dispatch = useDispatch();

  const {
    schedules,
    isLoading,
    isUpdating,
    isDeleting,
    isError,
    message,
  } = useSelector((state) => state.schedules);

  const [search, setSearch] = useState("");
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getSchedules());
  }, [dispatch]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);

  
  const filteredSchedules = [...schedules]
    .sort((a, b) => dayOrder[a.day] - dayOrder[b.day])
    .filter((schedule) =>
      schedule.day
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this schedule?"
    );

    if (!confirmed) return;

    const result = await dispatch(deleteSchedule(id));

    if (deleteSchedule.fulfilled.match(result)) {
      toast.success("Schedule deleted successfully");
    } else {
      toast.error(
        result.payload || "Failed to delete schedule"
      );
    }
  };

  const handleToggleStatus = async (schedule) => {
    const result = await dispatch(
      updateSchedule({
        id: schedule._id,
        scheduleData: {
          isAvailable: !schedule.isAvailable,
        },
      })
    );

    if (updateSchedule.fulfilled.match(result)) {
      toast.success(
        `Schedule ${
          !schedule.isAvailable
            ? "activated"
            : "deactivated"
        } successfully`
      );
    } else {
      toast.error(
        result.payload || "Failed to update schedule"
      );
    }
  };

  const handleEdit = (schedule) => {
    setSelectedSchedule(schedule);
    setIsModalOpen(true);
  };

  const handleSubmit = async (data) => {
    let result;

    if (selectedSchedule) {
      result = await dispatch(
        updateSchedule({
          id: selectedSchedule._id,
          scheduleData: data,
        })
      );
    } else {
      result = await dispatch(createSchedule(data));
    }

    if (
      createSchedule.fulfilled.match(result) ||
      updateSchedule.fulfilled.match(result)
    ) {
      toast.success(
        selectedSchedule
          ? "Schedule updated"
          : "Schedule created"
      );

      setIsModalOpen(false);
      setSelectedSchedule(null);
    } else {
      toast.error(
        result.payload || "Operation failed"
      );
    }
  };

  return (
    <div className="space-y-6">
     
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Schedules
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage the clinic's working hours.
          </p>
        </div>

        <button
          onClick={() => {
            setSelectedSchedule(null);
            setIsModalOpen(true);
          }}
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <FaPlus />
          Add Schedule
        </button>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative max-w-md">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search by day..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

     
      {isLoading ? (
        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-sm text-slate-500">
            Loading schedules...
          </p>
        </div>
      ) : filteredSchedules.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-sm text-slate-500">
            No schedules found.
          </p>
        </div>
      ) : (
        <>
         
          <div className="hidden overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm lg:block">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Day
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Start Time
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      End Time
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
                  {filteredSchedules.map((schedule) => (
                    <tr
                      key={schedule._id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-4 font-semibold text-slate-900">
                        {schedule.day}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {schedule.startTime}
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {schedule.endTime}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                            schedule.isAvailable
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {schedule.isAvailable
                            ? "Available"
                            : "Unavailable"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                         
                          <button
                            type="button"
                            onClick={() =>
                              handleToggleStatus(schedule)
                            }
                            disabled={isUpdating}
                            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-blue-600 disabled:opacity-50"
                            title={
                              schedule.isAvailable
                                ? "Make unavailable"
                                : "Make available"
                            }
                          >
                            {schedule.isAvailable ? (
                              <FaToggleOn className="text-lg" />
                            ) : (
                              <FaToggleOff className="text-lg" />
                            )}
                          </button>

                         
                          <button
                            type="button"
                            onClick={() =>
                              handleEdit(schedule)
                            }
                            className="rounded-lg p-2 text-slate-500 hover:bg-blue-50 hover:text-blue-600"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>

                         
                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(schedule._id)
                            }
                            disabled={isDeleting}
                            className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
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

         
          <div className="grid gap-4 lg:hidden">
            {filteredSchedules.map((schedule) => (
              <div
                key={schedule._id}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-semibold text-slate-900">
                      {schedule.day}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {schedule.startTime} -{" "}
                      {schedule.endTime}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                      schedule.isAvailable
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {schedule.isAvailable
                      ? "Available"
                      : "Unavailable"}
                  </span>
                </div>

                <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4">
           
                  <button
                    type="button"
                    onClick={() =>
                      handleToggleStatus(schedule)
                    }
                    disabled={isUpdating}
                    className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                  >
                    {schedule.isAvailable
                      ? "Make Unavailable"
                      : "Make Available"}
                  </button>

                
                  <button
                    type="button"
                    onClick={() => handleEdit(schedule)}
                    className="rounded-lg border border-blue-100 px-3 py-2 text-blue-600 hover:bg-blue-50"
                  >
                    <FaEdit />
                  </button>

                 
                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(schedule._id)
                    }
                    disabled={isDeleting}
                    className="rounded-lg border border-red-100 px-3 py-2 text-red-600 hover:bg-red-50 disabled:opacity-50"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

     
      <ScheduleModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSchedule(null);
        }}
        onSubmit={handleSubmit}
        schedule={selectedSchedule}
        isLoading={isUpdating}
      />
    </div>
  );
}

export default Schedules;