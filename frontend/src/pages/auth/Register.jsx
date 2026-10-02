// import { useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
// import { register as registerUser, reset } from "../../features/auth/authSlice";

// function Register() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { user, isLoading, isError, isSuccess, message } = useSelector(
//     (state) => state.auth
//   );

//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm();

//   const password = watch("password");

//   const onSubmit = (data) => {
//     const userData = {
//       firstName: data.firstName,
//       lastName: data.lastName,
//       email: data.email,
//       phone: data.phone,
//       password: data.password,
//     };

//     dispatch(registerUser(userData));
//   };

//   useEffect(() => {
//     if (isError) {
//       toast.error(message || "Registration failed");
//     }

//     if (isSuccess) {
//       toast.success("Account created successfully");

//       navigate("/login");
//     }

//     dispatch(reset());
//   }, [isError, isSuccess, message, navigate, dispatch]);

//   return (
//     <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">
//       <div className="w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">
        
//         <div className="p-8 sm:p-12">
//           <div className="max-w-md mx-auto">

          
//             <Link to="/" className="inline-block mb-8">
//               <span className="text-2xl font-bold text-blue-700">
//                 DentalBook
//               </span>
//             </Link>

          
//             <div className="mb-8">
//               <h1 className="text-3xl font-bold text-slate-900">
//                 Create your account
//               </h1>

//               <p className="mt-2 text-slate-500">
//                 Join DentalBook and manage your dental appointments easily.
//               </p>
//             </div>

           
//             <form
//               onSubmit={handleSubmit(onSubmit)}
//               className="space-y-5"
//             >
             
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
              
//                 <div>
//                   <label
//                     htmlFor="firstName"
//                     className="block text-sm font-medium text-slate-700 mb-2"
//                   >
//                     First name
//                   </label>

//                   <input
//                     id="firstName"
//                     type="text"
//                     placeholder="John"
//                     className={`w-full px-4 py-3 rounded-xl border ${
//                       errors.firstName
//                         ? "border-red-500"
//                         : "border-slate-200"
//                     } focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                     {...register("firstName", {
//                       required: "First name is required",
//                     })}
//                   />

//                   {errors.firstName && (
//                     <p className="mt-1 text-sm text-red-500">
//                       {errors.firstName.message}
//                     </p>
//                   )}
//                 </div>

               
//                 <div>
//                   <label
//                     htmlFor="lastName"
//                     className="block text-sm font-medium text-slate-700 mb-2"
//                   >
//                     Last name
//                   </label>

//                   <input
//                     id="lastName"
//                     type="text"
//                     placeholder="Doe"
//                     className={`w-full px-4 py-3 rounded-xl border ${
//                       errors.lastName
//                         ? "border-red-500"
//                         : "border-slate-200"
//                     } focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                     {...register("lastName", {
//                       required: "Last name is required",
//                     })}
//                   />

//                   {errors.lastName && (
//                     <p className="mt-1 text-sm text-red-500">
//                       {errors.lastName.message}
//                     </p>
//                   )}
//                 </div>
//               </div>

          
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
//                     pattern: {
//                       value: /^\S+@\S+\.\S+$/,
//                       message: "Please enter a valid email",
//                     },
//                   })}
//                 />

//                 {errors.email && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.email.message}
//                   </p>
//                 )}
//               </div>

              
//               <div>
//                 <label
//                   htmlFor="phone"
//                   className="block text-sm font-medium text-slate-700 mb-2"
//                 >
//                   Phone
//                 </label>

//                 <input
//                   id="phone"
//                   type="tel"
//                   placeholder="+212 6 12 34 56 78"
//                   className={`w-full px-4 py-3 rounded-xl border ${
//                     errors.phone
//                       ? "border-red-500"
//                       : "border-slate-200"
//                   } focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                   {...register("phone", {
//                     required: "Phone number is required",
//                   })}
//                 />

//                 {errors.phone && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.phone.message}
//                   </p>
//                 )}
//               </div>

              
//               <div>
//                 <label
//                   htmlFor="password"
//                   className="block text-sm font-medium text-slate-700 mb-2"
//                 >
//                   Password
//                 </label>

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
//                     minLength: {
//                       value: 6,
//                       message: "Password must be at least 6 characters",
//                     },
//                   })}
//                 />

//                 {errors.password && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.password.message}
//                   </p>
//                 )}
//               </div>

           
//               <div>
//                 <label
//                   htmlFor="confirmPassword"
//                   className="block text-sm font-medium text-slate-700 mb-2"
//                 >
//                   Confirm password
//                 </label>

//                 <input
//                   id="confirmPassword"
//                   type="password"
//                   placeholder="••••••••"
//                   className={`w-full px-4 py-3 rounded-xl border ${
//                     errors.confirmPassword
//                       ? "border-red-500"
//                       : "border-slate-200"
//                   } focus:outline-none focus:ring-2 focus:ring-blue-500`}
//                   {...register("confirmPassword", {
//                     required: "Please confirm your password",
//                     validate: (value) =>
//                       value === password || "Passwords do not match",
//                   })}
//                 />

//                 {errors.confirmPassword && (
//                   <p className="mt-1 text-sm text-red-500">
//                     {errors.confirmPassword.message}
//                   </p>
//                 )}
//               </div>

             
//               <button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
//               >
//                 {isLoading ? "Creating account..." : "Create Account"}
//               </button>
//             </form>

           
//             <p className="mt-8 text-center text-sm text-slate-500">
//               Already have an account?{" "}
//               <Link
//                 to="/login"
//                 className="font-semibold text-blue-600 hover:text-blue-700"
//               >
//                 Sign in
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
//               Start your journey to a healthier smile.
//             </h2>

//             <p className="mt-5 text-blue-100 text-lg leading-relaxed">
//               Create your DentalBook account and book your dental
//               appointments quickly and easily.
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

// export default Register;

import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  FaTooth,
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaShieldAlt,
  FaArrowRight,
} from "react-icons/fa";

import {
  register as registerUser,
  reset,
} from "../../features/auth/authSlice";

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
                Votre espace personnel
              </div>

              <h1 className="text-4xl font-bold leading-tight text-white xl:text-5xl">
                Commencez votre
                <span className="block text-cyan-400">
                  parcours santé.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-8 text-slate-400">
                Créez votre compte DentalBook et profitez d'une
                expérience simple pour gérer vos rendez-vous
                dentaires.
              </p>

              {/* Benefits */}
              <div className="mt-10 space-y-4">

                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                    <FaTooth size={17} />
                  </div>

                  <p className="text-sm text-slate-300">
                    Gérez facilement vos rendez-vous
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-400">
                    <FaShieldAlt size={17} />
                  </div>

                  <p className="text-sm text-slate-300">
                    Un espace personnel sécurisé
                  </p>
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

            {/* Back */}
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
            >
              <FaArrowLeft size={13} />
              Retour à l'accueil
            </Link>

            {/* Mobile logo */}
            <div className="mb-8 flex items-center gap-3 lg:hidden">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#071A33] text-cyan-400">
                <FaTooth size={20} />
              </div>

              <span className="text-xl font-bold text-[#071A33]">
                Dental<span className="text-cyan-500">Book</span>
              </span>

            </div>

            {/* Heading */}
            <div className="mb-7">

              <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-cyan-600">
                Rejoignez-nous
              </p>

              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Créez votre compte
              </h2>

              <p className="mt-3 text-slate-500">
                Inscrivez-vous pour gérer vos rendez-vous
                dentaires facilement.
              </p>

            </div>

            {/* Error */}
            {isError && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {message || "Une erreur est survenue lors de l'inscription."}
              </div>
            )}

            {/* ================= FORM ================= */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4"
            >

              {/* First name / Last name */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                {/* First name */}
                <div>

                  <label
                    htmlFor="firstName"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Prénom
                  </label>

                  <div className="relative">

                    <FaUser
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={14}
                    />

                    <input
                      id="firstName"
                      type="text"
                      placeholder="John"
                      className={`w-full rounded-xl border bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                        errors.firstName
                          ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                          : "border-slate-200 focus:border-cyan-500 focus:ring-cyan-100"
                      }`}
                      {...register("firstName", {
                        required: "Le prénom est obligatoire",
                      })}
                    />

                  </div>

                  {errors.firstName && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.firstName.message}
                    </p>
                  )}

                </div>

                {/* Last name */}
                <div>

                  <label
                    htmlFor="lastName"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Nom
                  </label>

                  <div className="relative">

                    <FaUser
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                      size={14}
                    />

                    <input
                      id="lastName"
                      type="text"
                      placeholder="Doe"
                      className={`w-full rounded-xl border bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                        errors.lastName
                          ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                          : "border-slate-200 focus:border-cyan-500 focus:ring-cyan-100"
                      }`}
                      {...register("lastName", {
                        required: "Le nom est obligatoire",
                      })}
                    />

                  </div>

                  {errors.lastName && (
                    <p className="mt-2 text-xs text-red-500">
                      {errors.lastName.message}
                    </p>
                  )}

                </div>

              </div>

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
                    size={14}
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
                      pattern: {
                        value: /^\S+@\S+\.\S+$/,
                        message: "Veuillez entrer un email valide",
                      },
                    })}
                  />

                </div>

                {errors.email && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.email.message}
                  </p>
                )}

              </div>

              {/* Phone */}
              <div>

                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Téléphone
                </label>

                <div className="relative">

                  <FaPhone
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={14}
                  />

                  <input
                    id="phone"
                    type="tel"
                    placeholder="+212 6 12 34 56 78"
                    className={`w-full rounded-xl border bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                      errors.phone
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                        : "border-slate-200 focus:border-cyan-500 focus:ring-cyan-100"
                    }`}
                    {...register("phone", {
                      required: "Le numéro de téléphone est obligatoire",
                    })}
                  />

                </div>

                {errors.phone && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.phone.message}
                  </p>
                )}

              </div>

              {/* Password */}
              <div>

                <label
                  htmlFor="password"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Mot de passe
                </label>

                <div className="relative">

                  <FaLock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={14}
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
                      minLength: {
                        value: 6,
                        message:
                          "Le mot de passe doit contenir au moins 6 caractères",
                      },
                    })}
                  />

                </div>

                {errors.password && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.password.message}
                  </p>
                )}

              </div>

              {/* Confirm password */}
              <div>

                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Confirmer le mot de passe
                </label>

                <div className="relative">

                  <FaLock
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={14}
                  />

                  <input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    className={`w-full rounded-xl border bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:ring-4 ${
                      errors.confirmPassword
                        ? "border-red-300 focus:border-red-400 focus:ring-red-100"
                        : "border-slate-200 focus:border-cyan-500 focus:ring-cyan-100"
                    }`}
                    {...register("confirmPassword", {
                      required: "Veuillez confirmer votre mot de passe",
                      validate: (value) =>
                        value === password ||
                        "Les mots de passe ne correspondent pas",
                    })}
                  />

                </div>

                {errors.confirmPassword && (
                  <p className="mt-2 text-xs text-red-500">
                    {errors.confirmPassword.message}
                  </p>
                )}

              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className="group mt-2 flex w-full items-center justify-center gap-3 rounded-xl bg-[#071A33] px-5 py-3.5 font-semibold text-white shadow-lg shadow-[#071A33]/10 transition hover:-translate-y-0.5 hover:bg-[#0b274a] disabled:cursor-not-allowed disabled:opacity-60"
              >

                {isLoading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Création du compte...
                  </>
                ) : (
                  <>
                    Créer mon compte

                    <FaArrowRight
                      className="transition-transform group-hover:translate-x-1"
                      size={14}
                    />
                  </>
                )}

              </button>

            </form>

            {/* Login */}
            <div className="mt-7 text-center text-sm text-slate-500">

              Vous avez déjà un compte ?{" "}

              <Link
                to="/login"
                className="font-semibold text-cyan-600 transition hover:text-cyan-700"
              >
                Se connecter
              </Link>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default Register;