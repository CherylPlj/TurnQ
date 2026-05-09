"use client";

import ClientSidebar from "../../../components/ClientSidebar";

export default function ClientFormPage() {
  return (
    <div className="min-h-screen bg-[#f1f1f4] text-slate-900">
      <ClientSidebar activeLabel="Join Queue" />

      <main className="px-4 pb-10 pt-20 md:ml-20 md:px-8 md:pt-8">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-6 shadow sm:p-10">
          <h1 className="text-5xl font-black leading-tight">
            Enter your details to
            <br />
            continue.
          </h1>

          <form className="mt-8 space-y-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-3xl font-medium text-slate-800">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="Juan"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-xl text-slate-900 outline-none ring-[#7c4be9]/30 transition focus:ring-2"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="middle-name" className="text-3xl font-medium text-slate-800">
                Middle Name
              </label>
              <input
                id="middle-name"
                type="text"
                placeholder="Masipag"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-xl text-slate-900 outline-none ring-[#7c4be9]/30 transition focus:ring-2"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="surname" className="text-3xl font-medium text-slate-800">
                Surname <span className="text-red-500">*</span>
              </label>
              <input
                id="surname"
                type="text"
                placeholder="Dela Cruz"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-xl text-slate-900 outline-none ring-[#7c4be9]/30 transition focus:ring-2"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="contact" className="text-3xl font-medium text-slate-800">
                Contact Number
              </label>
              <input
                id="contact"
                type="text"
                placeholder="09997191171"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-xl text-slate-900 outline-none ring-[#7c4be9]/30 transition focus:ring-2"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-3xl font-medium text-slate-800">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="juandelacruz@gmail.com"
                className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-xl text-slate-900 outline-none ring-[#7c4be9]/30 transition focus:ring-2"
              />
            </div>

            <button
              type="submit"
              className="mt-5 w-full rounded-full bg-[#7c4be9] px-8 py-3 text-2xl font-semibold text-white transition hover:bg-[#6d41d0] sm:w-auto sm:min-w-72"
            >
              Submit
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
