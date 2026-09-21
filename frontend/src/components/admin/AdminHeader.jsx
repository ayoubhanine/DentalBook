import { FaBell, FaBars, FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

function AdminHeader({ onMenuClick }) {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-100 bg-white">
      <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
       
        <div className="flex items-center gap-3">
          
          <button
            onClick={onMenuClick}
            className="rounded-xl p-2.5 text-slate-600 hover:bg-slate-100 md:hidden"
            aria-label="Open menu"
          >
            <FaBars />
          </button>

          <div>
            <p className="hidden text-sm text-slate-500 sm:block">
              Welcome back
            </p>

            <h2 className="text-sm font-semibold text-slate-900 sm:text-base">
              {user?.firstName || "Admin"}
            </h2>
          </div>
        </div>

       
        <div className="flex items-center gap-3 sm:gap-5">
          {/* <button
            className="relative rounded-xl p-2.5 text-slate-500 hover:bg-slate-100"
            aria-label="Notifications"
          >
            <FaBell />

            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
          </button> */}

          <div className="hidden h-8 w-px bg-slate-200 sm:block" />

          <div className="flex items-center gap-2">
            <FaUserCircle className="text-2xl text-slate-400 sm:text-3xl" />

            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-800">
                {user?.firstName} {user?.lastName}
              </p>

              <p className="text-xs text-slate-500">
                Administrator
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;