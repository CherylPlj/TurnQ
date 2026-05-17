"use client";

import ClientNotificationButton from "../../../components/ClientNotificationButton";
import ClientSidebar from "../../../components/ClientSidebar";

const historyItems = Array.from({ length: 4 }, (_, index) => ({
  id: index + 1,
  queueNumber: "A-038",
  service: "Business Permit",
  date: "April 14, 2025",
  time: "10:00 AM",
  duration: "12 mins",
  status: "Completed",
}));

export default function ClientHistoryPage() {
  return (
    <div className="min-h-screen bg-[#f1f1f4] text-slate-900">
      <ClientSidebar activeLabel="History" />

      <main className="px-4 pb-10 pt-20 md:ml-20 md:px-8 md:pt-8">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-5 shadow sm:p-7">
          <div className="mb-6 flex items-center justify-between">
            <button className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-2xl shadow md:hidden">
              ☰
            </button>
            <h1 className="text-4xl font-black">History</h1>
            <ClientNotificationButton />
          </div>

          <div className="mb-6 grid grid-cols-2 border-b-2 border-[#8e59ff] text-center">
            <button className="border-b-4 border-[#8e59ff] px-3 py-2 text-2xl font-semibold text-slate-900">
              Past Queues
            </button>
            <button className="px-3 py-2 text-2xl font-medium text-slate-700 transition hover:text-[#7c4be9]">
              Cancelled
            </button>
          </div>

          <section className="space-y-5">
            {historyItems.map((item) => (
              <article
                key={item.id}
                className="rounded-3xl bg-white p-4 shadow ring-1 ring-slate-200 sm:p-5"
              >
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-6xl font-black tracking-wide text-slate-800">
                      {item.queueNumber}
                    </p>
                    <p className="mt-1 text-2xl text-slate-700">{item.service}</p>
                  </div>
                  <span className="rounded-full bg-emerald-500 px-5 py-1 text-lg font-medium text-white">
                    {item.status}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-lg text-slate-700">
                  <span>🗓 {item.date}</span>
                  <span>{item.time}</span>
                  <span>◷ {item.duration}</span>
                  <button className="ml-auto text-3xl text-[#7c4be9] transition hover:text-[#6539cf]">
                    ›
                  </button>
                </div>
              </article>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
