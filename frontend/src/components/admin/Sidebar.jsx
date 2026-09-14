import { NavLink, useNavigate } from "react-router-dom";
import {
  FaCalendarAlt,
  FaClipboardList,
  FaClock,
  FaCog,
  FaSignOutAlt,
  FaStethoscope,
  FaTachometerAlt,
  FaUsers,
} from "react-icons/fa";

import { useDispatch } from "react-redux";
import { logout } from "../../features/auth/authSlice";

function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const links = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      name: "Appointments",
      path: "/admin/appointments",
      icon: <FaCalendarAlt />,
    },
    {
      name: "Services",
      path: "/admin/services",
      icon: <FaStethoscope />,
    },
    {
      name: "Schedules",
      path: "/admin/schedules",
      icon: <FaClock />,
    },
    {
      name: "Patients",
      path: "/admin/patients",
      icon: <FaUsers />,
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: <FaCog />,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 border-r border-slate-200 bg-white md:block">
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-20 items-center border-b border-slate-100 px-6">
          <h1 className="text-2xl font-bold text-blue-700">
            DentalBook
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 p-4">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-blue-700"
                }`
              }
            >
              <span className="text-base">{link.icon}</span>
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t border-slate-100 p-4">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;