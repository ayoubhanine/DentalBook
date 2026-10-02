import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaArrowRight, FaCheckCircle,FaTooth } from "react-icons/fa";

import { getServices } from "../features/services/serviceSlice";

import Navbar from "../components/public/Navbar";
import Hero from "../components/public/Hero";
import ServiceCard from "../components/public/ServiceCard";

function Home() {
  const dispatch = useDispatch();

  const {
    services,
    isLoading,
    isError,
    message,
  } = useSelector((state) => state.services);

  useEffect(() => {
    dispatch(getServices());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      <Navbar />

      <main>
        <Hero />

        {/* Services */}
        <section
          id="services"
          className="scroll-mt-28 bg-white py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            {/* Section heading */}
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                Nos prestations
              </span>

              <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                Des soins pour chaque sourire.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-500">
                Découvrez notre sélection de services dentaires conçus
                pour répondre à vos besoins.
              </p>
            </div>

            {/* Loading */}
            {isLoading && (
              <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-80 animate-pulse rounded-3xl bg-slate-100"
                  />
                ))}
              </div>
            )}

            {/* Error */}
            {isError && (
              <div className="mx-auto mt-12 max-w-md rounded-2xl border border-red-100 bg-red-50 p-5 text-center text-sm text-red-600">
                {message}
              </div>
            )}

            {/* Services */}
            {!isLoading && !isError && (
              <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((service) => (
                  <ServiceCard
                    key={service._id}
                    service={service}
                  />
                ))}
              </div>
            )}

            {/* Empty state */}
            {!isLoading &&
              !isError &&
              services.length === 0 && (
                <div className="mt-16 text-center">
                  <p className="text-slate-500">
                    Aucun service disponible pour le moment.
                  </p>
                </div>
              )}
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="bg-slate-50 py-24"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <div className="grid items-center gap-14 lg:grid-cols-2">

              <div>
                <span className="text-sm font-bold uppercase tracking-[0.2em] text-blue-600">
                  Pourquoi DentalBook ?
                </span>

                <h2 className="mt-4 text-4xl font-black tracking-tight text-slate-950 sm:text-5xl">
                  Une expérience pensée autour de vous.
                </h2>

                <p className="mt-6 max-w-xl text-lg leading-8 text-slate-500">
                  DentalBook simplifie votre parcours, de la découverte
                  des services jusqu'à la gestion de vos rendez-vous.
                </p>

                <div className="mt-8 space-y-4">

                  <div className="flex items-start gap-4">
                    <FaCheckCircle className="mt-1 shrink-0 text-emerald-500" />

                    <div>
                      <h3 className="font-bold text-slate-900">
                        Rendez-vous simplifié
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Réservez votre rendez-vous sans démarches compliquées.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <FaCheckCircle className="mt-1 shrink-0 text-emerald-500" />

                    <div>
                      <h3 className="font-bold text-slate-900">
                        Suivi personnalisé
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Retrouvez facilement vos rendez-vous et votre profil.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <FaCheckCircle className="mt-1 shrink-0 text-emerald-500" />

                    <div>
                      <h3 className="font-bold text-slate-900">
                        Services transparents
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        Consultez les prestations, leurs durées et leurs tarifs.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* Stats card */}
              <div className="relative">
                <div className="rounded-[2rem] bg-slate-950 p-8 shadow-2xl">
                  <div className="grid grid-cols-2 gap-4">

                    <div className="rounded-2xl bg-white/5 p-6">
                      <p className="text-4xl font-black text-white">
                        {services.length}+
                      </p>

                      <p className="mt-2 text-sm text-slate-400">
                        Services disponibles
                      </p>
                    </div>

                    <div className="rounded-2xl bg-blue-600 p-6">
                      <p className="text-4xl font-black text-white">
                        24/7
                      </p>

                      <p className="mt-2 text-sm text-blue-100">
                        Accès à la plateforme
                      </p>
                    </div>

                    <div className="col-span-2 rounded-2xl border border-white/10 bg-white/5 p-6">
                      <p className="text-sm font-medium text-slate-400">
                        Votre prochaine étape
                      </p>

                      <div className="mt-3 flex items-center justify-between gap-4">
                        <p className="font-bold text-white">
                          Prenez soin de votre sourire.
                        </p>

                        <FaArrowRight className="text-blue-400" />
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-white py-24">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">

            <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-16 text-center shadow-2xl shadow-blue-600/20 sm:px-12">

              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border-[30px] border-white/10" />

              <div className="relative">
                <h2 className="text-3xl font-black text-white sm:text-4xl">
                  Prêt à prendre soin de votre sourire ?
                </h2>

                <p className="mx-auto mt-4 max-w-xl text-blue-100">
                  Créez votre compte et commencez à gérer vos rendez-vous
                  simplement avec DentalBook.
                </p>

                <a
                  href="/register"
                  className="mt-8 inline-flex items-center gap-3 rounded-2xl bg-white px-7 py-4 font-bold text-blue-600 shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
                >
                  Commencer maintenant
                  <FaArrowRight />
                </a>
              </div>
            </div>

          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-slate-950 py-10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">

          <div className="flex items-center gap-2 text-white">
            <FaTooth className="text-blue-500" />

            <span className="font-bold">
              Dental<span className="text-blue-500">Book</span>
            </span>
          </div>

          <p className="text-sm text-slate-500">
            © 2026 DentalBook. Tous droits réservés.
          </p>

        </div>
      </footer>

    </div>
  );
}

export default Home;