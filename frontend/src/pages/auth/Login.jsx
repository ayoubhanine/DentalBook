import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { login, reset } from "../../features/auth/authSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess && user) {
      toast.success("Connexion réussie");

      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/patient/dashboard");
      }
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">
        
        {/* Left - Form */}
        <div className="p-8 sm:p-12">
          <div className="max-w-md mx-auto">
            
            {/* Logo */}
            <Link to="/" className="inline-block mb-10">
              <span className="text-2xl font-bold text-blue-700">
                DentalBook
              </span>
            </Link>

            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900">
                Welcome back
              </h1>

              <p className="mt-2 text-slate-500">
                Sign in to manage your dental appointments.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.email
                      ? "border-red-500"
                      : "border-slate-200"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  {...register("email", {
                    required: "Email is required",
                  })}
                />

                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Password
                  </label>

                  <button
                    type="button"
                    className="text-sm font-medium text-blue-600 hover:text-blue-700"
                  >
                    Forgot password?
                  </button>
                </div>

                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.password
                      ? "border-red-500"
                      : "border-slate-200"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  {...register("password", {
                    required: "Password is required",
                  })}
                />

                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing in..." : "Login"}
              </button>
            </form>

            {/* Register */}
            <p className="mt-8 text-center text-sm text-slate-500">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>

        <div className="hidden md:flex bg-blue-700 p-12 text-white items-center justify-center">
          <div className="max-w-sm">
            <div className="mb-8 text-7xl">
              🦷
            </div>

            <h2 className="text-4xl font-bold leading-tight">
              Your smile deserves the best care.
            </h2>

            <p className="mt-5 text-blue-100 text-lg leading-relaxed">
              Book your dental appointment easily and manage your visits
              from one simple platform.
            </p>

            <div className="mt-8 flex gap-3">
              <div className="w-2 h-2 rounded-full bg-white" />
              <div className="w-2 h-2 rounded-full bg-blue-300" />
              <div className="w-2 h-2 rounded-full bg-blue-300" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;