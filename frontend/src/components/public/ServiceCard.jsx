import {
  FaTooth,
  FaClock,
  FaMoneyBillWave,
  FaArrowRight,
} from "react-icons/fa";

function ServiceCard({ service }) {
  return (
    <article className="group relative overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-2 hover:border-blue-100 hover:shadow-2xl hover:shadow-blue-900/10">

      {/* Top accent */}
      <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-blue-600 to-cyan-400 opacity-0 transition group-hover:opacity-100" />

      {/* Icon */}
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-xl text-blue-600 transition duration-300 group-hover:bg-blue-600 group-hover:text-white">
        <FaTooth />
      </div>

      {/* Content */}
      <div className="mt-6">
        <h3 className="text-xl font-bold text-slate-900">
          {service.name}
        </h3>

        <p className="mt-3 min-h-[48px] text-sm leading-6 text-slate-500">
          {service.description}
        </p>
      </div>

      {/* Details */}
      <div className="mt-6 space-y-3 border-t border-slate-100 pt-5">

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <FaClock className="text-blue-500" />
            Durée
          </div>

          <span className="text-sm font-semibold text-slate-800">
            {service.duration} min
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <FaMoneyBillWave className="text-emerald-500" />
            Prix
          </div>

          <span className="text-lg font-bold text-slate-900">
            {service.price} DH
          </span>
        </div>
      </div>

      {/* Bottom */}
      <div className="mt-6 flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
          Service dentaire
        </span>

        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition group-hover:bg-blue-600 group-hover:text-white">
          <FaArrowRight className="text-xs" />
        </span>
      </div>
    </article>
  );
}

export default ServiceCard;