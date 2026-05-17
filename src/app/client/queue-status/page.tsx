"use client";

import { useSearchParams } from "next/navigation";
import ClientNotificationButton from "../../../components/ClientNotificationButton";
import ClientSidebar from "../../../components/ClientSidebar";

export default function QueueStatusPage() {
  const searchParams = useSearchParams();
  const queueNumber = searchParams.get("queue") ?? "A - 042";
  const linePosition = Number(searchParams.get("position") ?? "7");
  const serviceName = searchParams.get("service") ?? "Business Permit";

  const progress = Math.min(100, Math.max(0, (12 - linePosition) * 8));

  return (
    <div className="min-h-screen bg-[#f1f1f4] text-slate-900">
      <ClientSidebar activeLabel="Queue Status" />

      <main className="px-4 pb-10 pt-20 md:ml-20 md:px-8 md:pt-8">
        <div className="mx-auto max-w-3xl space-y-5 rounded-3xl bg-white p-6 shadow">
          <div className="mb-3 flex items-center justify-between">
            <button className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-2xl shadow md:hidden">
              ☰
            </button>
            <h1 className="text-4xl font-black">Queue Status</h1>
            <ClientNotificationButton />
          </div>

          <section className="rounded-3xl border-4 border-[#7c4be9] px-5 py-6 text-center">
            <p className="text-4xl text-slate-700">Your Queue Number</p>
            <p className="mt-2 text-7xl font-black tracking-wide">{queueNumber}</p>
          </section>

          <section className="flex justify-center pt-2">
            <div
              className="relative h-64 w-64 rounded-full"
              style={{
                background: `conic-gradient(#10b981 ${progress}%, #e6d5fb ${progress}% 100%)`,
              }}
            >
              <div className="absolute inset-5 flex flex-col items-center justify-center rounded-full bg-white text-center">
                <p className="text-2xl text-slate-700">You&apos;re no. {linePosition} in line</p>
                <p className="text-7xl font-black">{linePosition}</p>
              </div>
            </div>
          </section>

          <section className="rounded-3xl bg-white p-5 shadow ring-1 ring-slate-200">
            <h2 className="text-3xl font-bold">Service Detail</h2>
            <div className="mt-4 space-y-3 text-lg">
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-600">Service</span>
                <span className="font-semibold">{serviceName}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-600">Date Joined</span>
                <span className="font-semibold">April 14, 2025 &nbsp; 10:00 AM</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-slate-600">Branch</span>
                <span className="font-semibold">City Hall</span>
              </div>
            </div>
          </section>

          <button className="w-full rounded-2xl bg-[#7c4be9] px-6 py-4 text-3xl font-semibold text-white shadow transition hover:bg-[#6b3fcd]">
            Enable Notification
          </button>

          <button className="w-full rounded-2xl bg-[#db0000] px-6 py-4 text-3xl font-semibold text-white shadow transition hover:bg-[#c00000]">
            Cancel Queue
          </button>
        </div>
      </main>
    </div>
  );
}
