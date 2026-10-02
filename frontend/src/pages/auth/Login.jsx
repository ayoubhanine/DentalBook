// import { useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
// import { login, reset } from "../../features/auth/authSlice";

// function Login() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { user, isLoading, isError, isSuccess, message } = useSelector(
//     (state) => state.auth
//   );

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     dispatch(login(data));
//   };

//   useEffect(() => {
//     if (isError) {
//       toast.error(message);
//     }

//     if (isSuccess && user) {
//       toast.success("Connexion réussie");

//       if (user.role === "admin") {
//         navigate("/admin/dashboard");
//       } else {
//         navigate("/patient/dashboard");
//       }
//     }

//     dispatch(reset());
//   }, [isError, isSuccess, user, message, navigate, dispatch]);

//   return (
//     <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">
//       <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">
        
        
//         <div className="p-8 sm:p-12">
//           <div className="max-w-md mx-auto">
            

//             <Link to="/" className="inline-block mb-10">
//               <span className="text-2xl font-bold text-blue-700">
//                 DentalBook
//               </span>
//             </Link>

//             <div className="mb-8">
//               <h1 className="text-3xl font-bold text-slate-900">
//                 Welcome back
//               </h1>

//               <p className="mt-2 text-slate-500">
//                 Sign in to manage your dental appointments.
//               </p>
//             </div>

//             <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-slate-700 mb-2"
//                 >
//                   Email
//                 </label>

//                 <input
//                   id="email"
//                   type="email"
//                   placeholder="you@example.com"
//                   className={`w-full px-4 py-3 rounded-xl border ${
//                     errors.email
//                       ? "border-red-500"
//                       : "border-slate-200"
//                   } focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                   {...register("email", {
//                     required: "Email is required",
//                   })}
//                 />

//                 {errors.email && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.email.message}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <div className="flex items-center justify-between mb-2">
//                   <label
//                     htmlFor="password"
//                     className="block text-sm font-medium text-slate-700"
//                   >
//                     Password
//                   </label>

//                   <button
//                     type="button"
//                     className="text-sm font-medium text-blue-600 hover:text-blue-700"
//                   >
//                     Forgot password?
//                   </button>
//                 </div>

//                 <input
//                   id="password"
//                   type="password"
//                   placeholder="••••••••"
//                   className={`w-full px-4 py-3 rounded-xl border ${
//                     errors.password
//                       ? "border-red-500"
//                       : "border-slate-200"
//                   } focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                   {...register("password", {
//                     required: "Password is required",
//                   })}
//                 />

//                 {errors.password && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.password.message}
//                   </p>
//                 )}
//               </div>

              
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
//               >
//                 {isLoading ? "Signing in..." : "Login"}
//               </button>
//             </form>

            
//             <p className="mt-8 text-center text-sm text-slate-500">
//               Don't have an account?{" "}
//               <Link
//                 to="/register"
//                 className="font-semibold text-blue-600 hover:text-blue-700"
//               >
//                 Create account
//               </Link>
//             </p>
//           </div>
//         </div>

//         <div className="hidden md:flex bg-blue-700 p-12 text-white items-center justify-center">
//           <div className="max-w-sm">
//             <div className="mb-8 text-7xl">
//               🦷
//             </div>

//             <h2 className="text-4xl font-bold leading-tight">
//               Your smile deserves the best care.
//             </h2>

//             <p className="mt-5 text-blue-100 text-lg leading-relaxed">
//               Book your dental appointment easily and manage your visits
//               from one simple platform.
//             </p>

//             <div className="mt-8 flex gap-3">
//               <div className="w-2 h-2 rounded-full bg-white" />
//               <div className="w-2 h-2 rounded-full bg-blue-300" />
//               <div className="w-2 h-2 rounded-full bg-blue-300" />
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Login;
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  FaTooth,
  FaArrowLeft,
  FaEnvelope,
  FaLock,
  FaArrowRight,
  FaShieldAlt,
} from "react-icons/fa";

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
    <div className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* ================= LEFT SIDE ================= */}
        <div className="relative hidden overflow-hidden bg-[#071A33] lg:flex">

          {/* Decorative background */}
          <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

          <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">

            {/* Logo */}
            <Link
              to="/"
              className="flex w-fit items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400 text-[#071A33] shadow-lg shadow-cyan-400/20">
                <FaTooth size={20} />
              </div>

              <span className="text-xl font-bold tracking-tight text-white">
                Dental<span className="text-cyan-400">Book</span>
              </span>
            </Link>

            {/* Main content */}
            <div className="max-w-xl">

              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 backdrop-blur">
                <FaShieldAlt className="text-cyan-400" />
                Votre espace sécurisé
              </div>

              <h1 className="text-4xl font-bold leading-tight text-white xl:text-5xl">
                Prenez soin de votre
                <span className="block text-cyan-400">
                  sourire.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-8 text-slate-400">
                Connectez-vous à votre espace DentalBook pour
                gérer vos rendez-vous et suivre vos soins
                dentaires simplement.
              </p>

              {/* Info card */}
              <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-md">

                <div className="flex items-center gap-4">

                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-cyan-400/10 text-cyan-400">
                    <FaTooth size={24} />
                  </div>

                  <div>
                    <p className="font-semibold text-white">
                      DentalBook
                    </p>

                    <p className="mt-1 text-sm leading-relaxed text-slate-400">
                      Des soins plus simples, des rendez-vous
                      mieux organisés.
                    </p>
                  </div>

                </div>

              </div>
            </div>

            {/* Footer */}
            <p className="text-sm text-slate-500">
              © 2026 DentalBook
            </p>

          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-16 xl:px-24">

          <div className="w-full max-w-md">

            {/* Back to home */}
            <Link
              to="/"
              className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
            >
              <FaArrowLeft size={13} />
              Retour à l'accueil
            </Link>

            {/* Mobile logo */}
            <div className="mb-10 flex items-center gap-3 lg:hidden">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#071A33] text-cyan-400">
                <FaTooth size={20} />
              </div>

              <span className="text-xl font-bold text-[#071A33]">
                Dental<span className="text-cyan-500">Book</span>
              </span>

            </div>

            {/* Heading */}
            <div className="mb-8">

              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-cyan-600">
                Bienvenue
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Connectez-vous à votre espace
              </h2>

              <p className="mt-3 text-slate-500">
                Entrez vos informations pour accéder à votre compte.
              </p>

            </div>

            {/* Error */}
            {isError && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {message || "Email ou mot de passe incorrect."}
              </div>
            )}

            {/* ================= FORM ================= */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >

              {/* Email */}
              <div>

                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Adresse email
                </label>

                <div className="relative">

                  <FaEnvelope
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={15}
                  />

                  <input
                    id="email"
                    type="email"
                    placeholder="exemple@email.com"
                    className={`w-full rounded-xl border bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                      errors.email
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                        : "border-slate-200 focus:border-cyan-500 focus:ring-cyan-100"
                    }`}
                    {...register("email", {
                      required: "L'email est obligatoire",
                    })}
                  />

                </div>

                {errors.email && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}

              </div>

              {/* Password */}
              <div>

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="block text-sm font-semibold text-slate-700"
                  >
                    Mot de passe
                  </label>

                  <button
                    type="button"
                    className="text-sm font-medium text-cyan-600 transition hover:text-cyan-700"
                  >
                    Mot de passe oublié ?
                  </button>

                </div>

                <div className="relative">

                  <FaLock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={15}
                  />

                  <input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className={`w-full rounded-xl border bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                      errors.password
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                        : "border-slate-200 focus:border-cyan-500 focus:ring-cyan-100"
                    }`}
                    {...register("password", {
                      required: "Le mot de passe est obligatoire",
                    })}
                  />

                </div>

                {errors.password && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}

              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-[#071A33] px-5 py-3.5 font-semibold text-white shadow-lg shadow-[#071A33]/10 transition hover:-translate-y-0.5 hover:bg-[#0b274a] disabled:cursor-not-allowed disabled:opacity-60"
              >

                {isLoading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Connexion...
                  </>
                ) : (
                  <>
                    Se connecter

                    <FaArrowRight
                      className="transition-transform group-hover:translate-x-1"
                      size={14}
                    />
                  </>
                )}

              </button>

            </form>

            {/* Register */}
            <div className="mt-8 text-center text-sm text-slate-500">

              Vous n'avez pas encore de compte ?{" "}

              <Link
                to="/register"
                className="font-semibold text-cyan-600 transition hover:text-cyan-700"
              >
                Créer un compte
              </Link>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Login;