import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FaEnvelope,
  FaPhone,
  FaUser,
  FaEdit,
  FaSave,
  FaTimes,
  FaUserCircle,
} from "react-icons/fa";

import {
  fetchMe,
  updateProfile,
} from "../../features/patients/patientSlice";

function Profile() {
  const dispatch = useDispatch();

  const {
    currentUser,
    isLoading,
    isUpdating,
    error,
  } = useSelector((state) => state.patients);

  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
  });

  useEffect(() => {
    dispatch(fetchMe());
  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        phone: currentUser.phone || "",
      });
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCancel = () => {
    setFormData({
      firstName: currentUser?.firstName || "",
      lastName: currentUser?.lastName || "",
      phone: currentUser?.phone || "",
    });

    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await dispatch(updateProfile(formData));

    if (updateProfile.fulfilled.match(result)) {
      setIsEditing(false);
    }
  };

  if (isLoading && !currentUser) {
    return (
      <div className="flex min-h-100 items-center justify-center">
        <p className="text-sm text-slate-500">
          Loading your profile...
        </p>
      </div>
    );
  }

  if (error && !currentUser) {
    return (
      <div className="rounded-2xl bg-red-50 p-5 text-sm font-medium text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div>
     
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900">
          My Profile
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage your personal information.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
      
        <div className="border-b border-slate-100 bg-linear-to-r from-blue-50 to-white p-6 sm:p-8">
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-blue-600">
              <FaUserCircle className="text-6xl" />
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-slate-900">
                {currentUser?.firstName} {currentUser?.lastName}
              </h2>

              <p className="mt-1 text-sm capitalize text-slate-500">
                {currentUser?.role || "Patient"}
              </p>
            </div>
          </div>
        </div>

   
        <form onSubmit={handleSubmit} className="p-6 sm:p-8">
          <div className="grid gap-6 sm:grid-cols-2">
           
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                First Name
              </label>

              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                  className={`w-full rounded-xl border py-3 pl-11 pr-4 text-sm outline-none transition ${
                    isEditing
                      ? "border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      : "border-slate-100 bg-slate-50 text-slate-600"
                  }`}
                />
              </div>
            </div>

           
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Last Name
              </label>

              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                  className={`w-full rounded-xl border py-3 pl-11 pr-4 text-sm outline-none transition ${
                    isEditing
                      ? "border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      : "border-slate-100 bg-slate-50 text-slate-600"
                  }`}
                />
              </div>
            </div>

           
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email
              </label>

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="email"
                  value={currentUser?.email || ""}
                  disabled
                  className="w-full rounded-xl border border-slate-100 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-500 outline-none"
                />
              </div>

              <p className="mt-1 text-xs text-slate-400">
                Email cannot be changed.
              </p>
            </div>

          
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Phone
              </label>

              <div className="relative">
                <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                  required
                  className={`w-full rounded-xl border py-3 pl-11 pr-4 text-sm outline-none transition ${
                    isEditing
                      ? "border-slate-200 bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                      : "border-slate-100 bg-slate-50 text-slate-600"
                  }`}
                />
              </div>
            </div>
          </div>

      
          {error && (
            <div className="mt-6 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-600">
              {error}
            </div>
          )}

          
          <div className="mt-8 flex flex-col justify-end gap-3 border-t border-slate-100 pt-6 sm:flex-row">
            {!isEditing ? (
              <button
                type="button"
                onClick={handleEdit}
                className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                <FaEdit />
                Edit Profile
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={handleCancel}
                  disabled={isUpdating}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  <FaTimes />
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isUpdating}
                  className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <FaSave />

                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;