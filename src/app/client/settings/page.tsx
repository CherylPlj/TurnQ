"use client";

import { useState } from "react";
import ClientSidebar from "../../../components/ClientSidebar";

export default function ClientSettingsPage() {
  const [turnAlert, setTurnAlert] = useState(true);
  const [queueUpdates, setQueueUpdates] = useState(true);

  return (
    <div className="min-h-screen bg-[#f1f1f4] text-slate-900">
      <ClientSidebar activeLabel="Settings" />

      <main className="px-4 pb-10 pt-20 md:ml-20 md:px-8 md:pt-8">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-5 shadow sm:p-7">
          <div className="mb-6 flex items-center justify-between">
            <button className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-2xl shadow md:hidden">
              ☰
            </button>
            <h1 className="text-4xl font-black">Settings</h1>
            <button className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-2xl shadow">
              🔔
            </button>
          </div>

          <section className="space-y-5">
            <article className="rounded-3xl bg-white p-5 shadow ring-1 ring-slate-200">
              <h2 className="text-4xl font-bold">Account</h2>
              <div className="mt-4 space-y-3">
                <button className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-left transition hover:bg-[#f7f3ff]">
                  <span className="text-2xl font-medium">◉ Profile Information</span>
                  <span className="text-3xl text-[#7c4be9]">›</span>
                </button>
                <button className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-left transition hover:bg-[#f7f3ff]">
                  <span className="text-2xl font-medium">⛨ Change Password</span>
                  <span className="text-3xl text-[#7c4be9]">›</span>
                </button>
              </div>
            </article>

            <article className="rounded-3xl bg-white p-5 shadow ring-1 ring-slate-200">
              <h2 className="text-4xl font-bold">Notification</h2>
              <div className="mt-4 space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-2xl font-medium">🏠 Turn In New Alert</p>
                    <p className="text-xl text-slate-600">Get notified when its about your turn.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setTurnAlert((prev) => !prev)}
                    className={`relative h-7 w-14 rounded-full transition ${
                      turnAlert ? "bg-[#4f46e5]" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                        turnAlert ? "left-8" : "left-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-2xl font-medium">📄 Queue Updates</p>
                    <p className="text-xl text-slate-600">Receive updates about your queue status</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setQueueUpdates((prev) => !prev)}
                    className={`relative h-7 w-14 rounded-full transition ${
                      queueUpdates ? "bg-[#4f46e5]" : "bg-slate-300"
                    }`}
                  >
                    <span
                      className={`absolute top-1 h-5 w-5 rounded-full bg-white transition ${
                        queueUpdates ? "left-8" : "left-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </article>

            <article className="rounded-3xl bg-white p-5 shadow ring-1 ring-slate-200">
              <h2 className="text-4xl font-bold">Other</h2>
              <div className="mt-4 space-y-3">
                <button className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-left transition hover:bg-[#f7f3ff]">
                  <span className="text-2xl font-medium">◉ Language</span>
                  <span className="flex items-center gap-3 text-2xl">
                    <span className="text-slate-700">English</span>
                    <span className="text-[#7c4be9]">›</span>
                  </span>
                </button>
                <button className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-left transition hover:bg-[#f7f3ff]">
                  <span className="text-2xl font-medium">⛨ Help & FAQ</span>
                  <span className="text-3xl text-[#7c4be9]">›</span>
                </button>
                <button className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-left transition hover:bg-[#f7f3ff]">
                  <span className="text-2xl font-medium">⛨ About TurnQ</span>
                  <span className="text-3xl text-[#7c4be9]">›</span>
                </button>
              </div>
            </article>
          </section>
        </div>
      </main>
    </div>
  );
}
