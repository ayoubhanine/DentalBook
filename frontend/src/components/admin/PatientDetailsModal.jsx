function PatientDetailsModal({
  isOpen,
  onClose,
  patient,
}) {
  if (!isOpen || !patient) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
      
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Patient Details
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Patient account information
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-slate-500 transition hover:bg-slate-100"
          >
            ✕
          </button>
        </div>

       
        <div className="mb-6 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100 text-lg font-bold text-blue-600">
            {patient.firstName?.charAt(0)}
            {patient.lastName?.charAt(0)}
          </div>

          <div>
            <h3 className="font-semibold text-slate-900">
              {patient.firstName} {patient.lastName}
            </h3>

            <p className="text-sm text-slate-500">
              Patient
            </p>
          </div>
        </div>

      
        <div className="space-y-4">
          <div>
            <p className="text-xs font-medium uppercase text-slate-400">
              First Name
            </p>

            <p className="mt-1 text-sm text-slate-800">
              {patient.firstName}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase text-slate-400">
              Last Name
            </p>

            <p className="mt-1 text-sm text-slate-800">
              {patient.lastName}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase text-slate-400">
              Email
            </p>

            <p className="mt-1 break-all text-sm text-slate-800">
              {patient.email}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase text-slate-400">
              Phone
            </p>

            <p className="mt-1 text-sm text-slate-800">
              {patient.phone}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase text-slate-400">
              Joined
            </p>

            <p className="mt-1 text-sm text-slate-800">
              {new Date(patient.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

     
        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default PatientDetailsModal;
