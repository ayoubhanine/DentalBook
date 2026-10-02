import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCheckCircle,
  FaTooth,
  FaCalendarCheck,
} from "react-icons/fa";

function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-slate-50 pt-32"
    >
      {/* Background decoration */}
      <div className="absolute -left-32 top-32 h-96 w-96 rounded-full bg-blue-200/40 blur-3xl" />

      <div className="absolute -right-32 top-40 h-96 w-96 rounded-full bg-cyan-200/40 blur-3xl" />

      <div className="absolute right-1/3 top-1/4 h-32 w-32 rounded-full border border-blue-200/60" />

      <div className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left */}
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 text-sm font-medium text-blue-600 shadow-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Votre sourire, notre priorité
            </div>

            <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight text-slate-950 sm:text-6xl lg:text-7xl">
              Des soins dentaires
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                pensés pour vous.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
              Découvrez nos services dentaires et prenez rendez-vous
              facilement avec une expérience simple, moderne et personnalisée.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/register"
                className="group flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-7 py-4 font-semibold text-white shadow-xl shadow-blue-600/20 transition duration-300 hover:-translate-y-1 hover:bg-blue-700"
              >
                Prendre rendez-vous
                <FaArrowRight className="transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href="#services"
                className="flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-7 py-4 font-semibold text-slate-700 shadow-sm transition hover:border-blue-200 hover:text-blue-600"
              >
                Découvrir nos services
              </a>
            </div>

            {/* Trust points */}
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <FaCheckCircle className="text-emerald-500" />
                Rendez-vous simple
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-600">
                <FaCheckCircle className="text-emerald-500" />
                Suivi personnalisé
              </div>
            </div>
          </div>

          {/* Right visual */}
          <div className="relative mx-auto w-full max-w-xl lg:ml-auto">

            {/* Main card */}
            <div className="relative overflow-hidden rounded-[2.5rem] border border-white bg-gradient-to-br from-blue-600 via-blue-700 to-slate-900 p-8 shadow-2xl shadow-blue-900/20">

              {/* Decorative circles */}
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[30px] border-white/5" />

              <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-cyan-400/10 blur-2xl" />

              <div className="relative">

                {/* Icon */}
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-3xl text-white backdrop-blur-md">
                  <FaTooth />
                </div>

                <p className="mt-12 text-sm font-medium uppercase tracking-[0.2em] text-blue-200">
                  DentalBook
                </p>

                <h2 className="mt-3 max-w-sm text-3xl font-bold leading-tight text-white sm:text-4xl">
                  Une nouvelle façon de prendre soin de votre sourire.
                </h2>

                <p className="mt-5 max-w-sm leading-7 text-blue-100">
                  Consultez nos prestations et trouvez le soin adapté à vos
                  besoins.
                </p>

                {/* Appointment mini card */}
                <div className="mt-10 rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-md">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white text-blue-600">
                      <FaCalendarCheck />
                    </div>

                    <div>
                      <p className="text-sm font-semibold text-white">
                        Rendez-vous en quelques clics
                      </p>

                      <p className="mt-1 text-xs text-blue-200">
                        Simple · Rapide · Moderne
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -left-5 hidden rounded-2xl border border-slate-100 bg-white p-4 shadow-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-500">
                  <FaCheckCircle />
                </div>

                <div>
                  <p className="text-sm font-bold text-slate-900">
                    Soins adaptés
                  </p>
                  <p className="text-xs text-slate-500">
                    À vos besoins
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;