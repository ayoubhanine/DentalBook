import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { register as registerUser, reset } from "../../features/auth/authSlice";

function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");

  const onSubmit = (data) => {
    const userData = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      password: data.password,
    };

    dispatch(registerUser(userData));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message || "Registration failed");
    }

    if (isSuccess) {
      toast.success("Account created successfully");

      navigate("/login");
    }

    dispatch(reset());
  }, [isError, isSuccess, message, navigate, dispatch]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">
        
        <div className="p-8 sm:p-12">
          <div className="max-w-md mx-auto">

          
            <Link to="/" className="inline-block mb-8">
              <span className="text-2xl font-bold text-blue-700">
                DentalBook
              </span>
            </Link>

          
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-900">
                Create your account
              </h1>

              <p className="mt-2 text-slate-500">
                Join DentalBook and manage your dental appointments easily.
              </p>
            </div>

           
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >
             
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
              
                <div>
                  <label
                    htmlFor="firstName"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    First name
                  </label>

                  <input
                    id="firstName"
                    type="text"
                    placeholder="John"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.firstName
                        ? "border-red-500"
                        : "border-slate-200"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    {...register("firstName", {
                      required: "First name is required",
                    })}
                  />

                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

               
                <div>
                  <label
                    htmlFor="lastName"
                    className="block text-sm font-medium text-slate-700 mb-2"
                  >
                    Last name
                  </label>

                  <input
                    id="lastName"
                    type="text"
                    placeholder="Doe"
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.lastName
                        ? "border-red-500"
                        : "border-slate-200"
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                    {...register("lastName", {
                      required: "Last name is required",
                    })}
                  />

                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

          
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
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: "Please enter a valid email",
                    },
                  })}
                />

                {errors.email && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.email.message}
                  </p>
                )}
              </div>

              
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Phone
                </label>

                <input
                  id="phone"
                  type="tel"
                  placeholder="+212 6 12 34 56 78"
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.phone
                      ? "border-red-500"
                      : "border-slate-200"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                />

                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.phone.message}
                  </p>
                )}
              </div>

              
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Password
                </label>

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
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                />

                {errors.password && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

           
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-slate-700 mb-2"
                >
                  Confirm password
                </label>

                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  className={`w-full px-4 py-3 rounded-xl border ${
                    errors.confirmPassword
                      ? "border-red-500"
                      : "border-slate-200"
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === password || "Passwords do not match",
                  })}
                />

                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

             
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isLoading ? "Creating account..." : "Create Account"}
              </button>
            </form>

           
            <p className="mt-8 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-blue-600 hover:text-blue-700"
              >
                Sign in
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
              Start your journey to a healthier smile.
            </h2>

            <p className="mt-5 text-blue-100 text-lg leading-relaxed">
              Create your DentalBook account and book your dental
              appointments quickly and easily.
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

export default Register;