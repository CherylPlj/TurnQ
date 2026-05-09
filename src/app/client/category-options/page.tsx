"use client";

import { useRouter } from "next/navigation";
import ClientSidebar from "../../../components/ClientSidebar";

export default function CategoryOptionsPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f1f1f4] text-slate-900">
      <ClientSidebar activeLabel="Join Queue" />

      <main className="px-4 pb-10 pt-20 md:ml-20 md:px-8 md:pt-8">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-6 shadow sm:p-10">
          <h1 className="text-5xl font-black leading-tight">
            Select the lane that
            <br />
            applies to you.
          </h1>

          <section className="mt-8 space-y-9">
            <article>
              <button
                type="button"
                onClick={() => router.push("/client/join-queue")}
                className="grid w-full overflow-hidden rounded-2xl shadow sm:grid-cols-2"
              >
                <div className="flex items-center justify-center bg-[#d0ece7] px-5 py-6">
                  <span className="text-xl font-semibold text-slate-700">General Customers</span>
                </div>
                <div className="flex items-center justify-center bg-[#10b981] px-5 py-6">
                  <span className="text-6xl font-black text-white">Regular</span>
                </div>
              </button>
              <p className="mt-4 text-2xl leading-9 text-slate-700">
                Click &ldquo;Regular&rdquo; if you have no PWD / Senior Citizen ID and
                you are not pregnant.
              </p>
            </article>

            <article>
              <button
                type="button"
                onClick={() => router.push("/client/priority-verification")}
                className="grid w-full overflow-hidden rounded-2xl shadow sm:grid-cols-2"
              >
                <div className="flex items-center justify-center bg-[#fff2d6] px-5 py-6">
                  <span className="text-xl font-semibold text-slate-700">PWD / Seniors / Pregnant</span>
                </div>
                <div className="flex items-center justify-center bg-[#f59e0b] px-5 py-6">
                  <span className="text-6xl font-black text-white">Priority</span>
                </div>
              </button>
              <p className="mt-4 text-2xl leading-9 text-slate-700">
                Click &ldquo;Priority&rdquo; if you have a PWD ID, Senior Citizen ID, or
                you are pregnant.
              </p>
            </article>
          </section>
        </div>
      </main>
    </div>
  );
}
