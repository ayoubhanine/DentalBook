import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  fetchPatients,
  fetchPatientById,
  clearSelectedPatient,
} from "../../features/patients/patientSlice";

import PatientDetailsModal from "../../components/admin/PatientDetailsModal";

function Patients() {
  const dispatch = useDispatch();

  const {
    patients,
    selectedPatient,
    isLoading,
    error,
  } = useSelector((state) => state.patients);

  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  const filteredPatients = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) return patients;

    return patients.filter((patient) => {
      const fullName =
        `${patient.firstName} ${patient.lastName}`.toLowerCase();

      return (
        fullName.includes(value) ||
        patient.email.toLowerCase().includes(value) ||
        patient.phone.includes(value)
      );
    });
  }, [patients, search]);

  const handleViewPatient = async (id) => {
    const result = await dispatch(fetchPatientById(id));

    if (fetchPatientById.fulfilled.match(result)) {
      setIsModalOpen(true);
    } else {
      toast.error(result.payload || "Failed to load patient");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    dispatch(clearSelectedPatient());
  };

  return (
    <div className="space-y-5 sm:space-y-6">
    
      <div>
        <h1 className="text-xl font-bold text-slate-900 sm:text-2xl">
          Patients
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage and view all registered patients
        </p>
      </div>

     
      <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-sm sm:p-4">
        <div className="relative w-full sm:max-w-md">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search patients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </div>

    
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      
      <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-slate-200 bg-slate-50">
              <tr>
                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 lg:px-6">
                  Patient
                </th>

                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 lg:px-6">
                  Email
                </th>

                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 lg:px-6">
                  Phone
                </th>

                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 lg:px-6">
                  Joined
                </th>

                <th className="px-4 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 lg:px-6">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-sm text-slate-500"
                  >
                    Loading patients...
                  </td>
                </tr>
              ) : filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <p className="font-medium text-slate-700">
                      No patients found
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Try another search.
                    </p>
                  </td>
                </tr>
              ) : (
                filteredPatients.map((patient) => (
                  <tr
                    key={patient._id}
                    className="transition hover:bg-slate-50"
                  >
                    
                    <td className="px-4 py-4 lg:px-6">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                          {patient.firstName?.charAt(0)}
                          {patient.lastName?.charAt(0)}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate font-medium text-slate-900">
                            {patient.firstName} {patient.lastName}
                          </p>

                          <p className="text-xs text-slate-500">
                            Patient
                          </p>
                        </div>
                      </div>
                    </td>

                   
                    <td className="max-w-55 truncate px-4 py-4 text-sm text-slate-600 lg:px-6">
                      {patient.email}
                    </td>

                    <td className="px-4 py-4 text-sm text-slate-600 lg:px-6">
                      {patient.phone}
                    </td>

                   
                    <td className="px-4 py-4 text-sm text-slate-600 lg:px-6">
                      {new Date(
                        patient.createdAt
                      ).toLocaleDateString()}
                    </td>

                  
                    <td className="px-4 py-4 text-right lg:px-6">
                      <button
                        type="button"
                        onClick={() =>
                          handleViewPatient(patient._id)
                        }
                        className="rounded-lg px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

     
      <div className="space-y-3 md:hidden">
        {isLoading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-sm">
            Loading patients...
          </div>
        ) : filteredPatients.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
            <p className="font-medium text-slate-700">
              No patients found
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Try another search.
            </p>
          </div>
        ) : (
          filteredPatients.map((patient) => (
            <div
              key={patient._id}
              className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
            >
             
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-600">
                    {patient.firstName?.charAt(0)}
                    {patient.lastName?.charAt(0)}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-semibold text-slate-900">
                      {patient.firstName} {patient.lastName}
                    </p>

                    <p className="text-xs text-slate-500">
                      Patient
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleViewPatient(patient._id)
                  }
                  className="shrink-0 rounded-lg bg-blue-50 px-3 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100"
                >
                  View
                </button>
              </div>

             
              <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Email
                  </p>

                  <p className="mt-1 break-all text-sm text-slate-700">
                    {patient.email}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Phone
                  </p>

                  <p className="mt-1 text-sm text-slate-700">
                    {patient.phone}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                    Joined
                  </p>

                  <p className="mt-1 text-sm text-slate-700">
                    {new Date(
                      patient.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

     
      <PatientDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        patient={selectedPatient}
      />
    </div>
  );
}

export default Patients;
