import { FaBell, FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

function AdminHeader() {
  const { user } = useSelector((state) => state.auth);

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div>
          <p className="text-sm text-slate-500">
            Welcome back
          </p>

          <h2 className="text-lg font-semibold text-slate-900">
            {user?.firstName || "Admin"}
          </h2>
        </div>

        <div className="flex items-center gap-5">
          <button className="relative text-slate-500 hover:text-blue-600">
            <FaBell size={18} />

            <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500" />
          </button>

          <div className="flex items-center gap-3">
            <FaUserCircle className="text-3xl text-slate-300" />

            <div className="hidden sm:block">
              <p className="text-sm font-medium text-slate-800">
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