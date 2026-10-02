import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaTooth,
  FaBars,
  FaTimes,
  FaArrowRight,
} from "react-icons/fa";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto mt-4 max-w-7xl px-4 sm:px-6 lg:px-8">
        <nav className="rounded-2xl border border-white/60 bg-white/80 px-5 py-3 shadow-lg shadow-slate-200/30 backdrop-blur-xl">
          <div className="flex items-center justify-between">

            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-900"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                <FaTooth />
              </span>

              <span>
                Dental<span className="text-blue-600">Book</span>
              </span>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden items-center gap-8 md:flex">
              <a
                href="#home"
                className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
              >
                Accueil
              </a>

              <a
                href="#services"
                className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
              >
                Services
              </a>

              <a
                href="#about"
                className="text-sm font-medium text-slate-600 transition hover:text-blue-600"
              >
                À propos
              </a>
            </div>

            {/* Desktop actions */}
            <div className="hidden items-center gap-3 md:flex">
              <Link
                to="/login"
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
              >
                Connexion
              </Link>

              <Link
                to="/register"
                className="group flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600"
              >
                Inscription
                <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            {/* Mobile button */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-xl p-2 text-slate-700 md:hidden"
            >
              {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
            </button>
          </div>

          {/* Mobile menu */}
          {isOpen && (
            <div className="mt-4 border-t border-slate-200 pt-4 md:hidden">
              <div className="flex flex-col gap-2">
                <a
                  href="#home"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Accueil
                </a>

                <a
                  href="#services"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  Services
                </a>

                <a
                  href="#about"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50"
                >
                  À propos
                </a>

                <div className="mt-2 flex gap-2">
                  <Link
                    to="/login"
                    className="flex-1 rounded-xl border border-slate-200 px-4 py-3 text-center text-sm font-semibold text-slate-700"
                  >
                    Connexion
                  </Link>

                  <Link
                    to="/register"
                    className="flex-1 rounded-xl bg-blue-600 px-4 py-3 text-center text-sm font-semibold text-white"
                  >
                    Inscription
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Navbar;