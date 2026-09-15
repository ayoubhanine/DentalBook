import { useEffect, useMemo, useState } from "react";
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
  deleteService,
  getServices,
  updateService,
} from "../../features/services/serviceSlice";

function Services() {
  const dispatch = useDispatch();

  const {
    services,
    isLoading,
    isUpdating,
    isDeleting,
    isError,
    message,
  } = useSelector((state) => state.services);

  const [search, setSearch] = useState("");
  const [selectedService, setSelectedService] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);

  const filteredServices = useMemo(() => {
    const searchValue = search.toLowerCase();

    return services.filter((service) => {
      return (
        service.name?.toLowerCase().includes(searchValue) ||
        service.description?.toLowerCase().includes(searchValue)
      );
    });
  }, [services, search]);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this service?"
    );

    if (!confirmed) return;

    const result = await dispatch(deleteService(id));

    if (deleteService.fulfilled.match(result)) {
      toast.success("Service deleted successfully");
    } else {
      toast.error(result.payload || "Failed to delete service");
    }
  };

  const handleToggleStatus = async (service) => {
    const result = await dispatch(
      updateService({
        id: service._id,
        serviceData: {
          isActive: !service.isActive,
        },
      })
    );

    if (updateService.fulfilled.match(result)) {
      toast.success(
        `Service ${!service.isActive ? "activated" : "deactivated"} successfully`
      );
    } else {
      toast.error(result.payload || "Failed to update service");
    }
  };

  const handleEdit = (service) => {
    setSelectedService(service);
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-6">
    
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Services
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage dental services offered by the clinic.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          <FaPlus />
          Add Service
        </button>
      </div>

   
      <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="relative max-w-md">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

      
      {isLoading ? (
        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-sm text-slate-500">
            Loading services...
          </p>
        </div>
      ) : filteredServices.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-sm text-slate-500">
            No services found.
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
                      Service
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Duration
                    </th>

                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Price
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
                  {filteredServices.map((service) => (
                    <tr
                      key={service._id}
                      className="transition hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-slate-900">
                            {service.name}
                          </p>

                          <p className="mt-1 max-w-md truncate text-sm text-slate-500">
                            {service.description}
                          </p>
                        </div>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {service.duration} min
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-slate-900">
                        {service.price} MAD
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                            service.isActive
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {service.isActive
                            ? "Active"
                            : "Inactive"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              handleToggleStatus(service)
                            }
                            disabled={isUpdating}
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-blue-600 disabled:opacity-50"
                            title={
                              service.isActive
                                ? "Deactivate"
                                : "Activate"
                            }
                          >
                            {service.isActive ? (
                              <FaToggleOn className="text-lg" />
                            ) : (
                              <FaToggleOff className="text-lg" />
                            )}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleEdit(service)}
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                            title="Edit"
                          >
                            <FaEdit />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(service._id)
                            }
                            disabled={isDeleting}
                            className="rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
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
            {filteredServices.map((service) => (
              <div
                key={service._id}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-semibold text-slate-900">
                      {service.name}
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      {service.description}
                    </p>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-medium ${
                      service.isActive
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-slate-100 text-slate-500"
                    }`}
                  >
                    {service.isActive
                      ? "Active"
                      : "Inactive"}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                  <div>
                    <p className="text-xs text-slate-400">
                      Duration
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {service.duration} min
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Price
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {service.price} MAD
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex gap-2 border-t border-slate-100 pt-4">
                  <button
                    type="button"
                    onClick={() => handleToggleStatus(service)}
                    disabled={isUpdating}
                    className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                  >
                    {service.isActive
                      ? "Deactivate"
                      : "Activate"}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleEdit(service)}
                    className="rounded-lg border border-blue-100 px-3 py-2 text-blue-600 hover:bg-blue-50"
                  >
                    <FaEdit />
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(service._id)
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

     
      {isEditModalOpen && selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-bold text-slate-900">
              Edit Service
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              {selectedService.name}
            </p>

            <button
              type="button"
              onClick={() => {
                setIsEditModalOpen(false);
                setSelectedService(null);
              }}
              className="mt-5 rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Services;