import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaSignOutAlt,
  FaStethoscope,
  FaTachometerAlt,
  FaUser,
  FaTimes,
  FaPlus,
} from "react-icons/fa";

import { logout } from "../../features/auth/authSlice";

function PatientSidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const links = [
    {
      name: "Dashboard",
      path: "/patient/dashboard",
      icon: FaTachometerAlt,
    },
    {
      name: "My Appointments",
      path: "/patient/appointments",
      icon: FaCalendarAlt,
    },
    {
      name: "Book Appointment",
      path: "/patient/book",
      icon: FaPlus,
    },
    {
      name: "My Profile",
      path: "/patient/profile",
      icon: FaUser,
    },
  ];

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <>
    
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 md:hidden"
          onClick={onClose}
        />
      )}

      
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:shadow-none`}
      >
      
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
              <FaStethoscope />
            </div>

            <span className="text-xl font-bold text-slate-900">
              Dental<span className="text-blue-600">Book</span>
            </span>
          </div>

         
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 md:hidden"
            aria-label="Close menu"
          >
            <FaTimes />
          </button>
        </div>

     
        <nav className="space-y-1 px-4 py-6">
          {links.map((link) => {
            const Icon = link.icon;

            return (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`
                }
              >
                <Icon className="text-base" />
                {link.name}
              </NavLink>
            );
          })}
        </nav>

       
        <div className="absolute bottom-0 w-full border-t border-slate-100 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-red-500 transition hover:bg-red-50"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default PatientSidebar;