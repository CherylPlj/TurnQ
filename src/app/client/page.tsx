"use client";

import { useState } from "react";
import ClientChatbotModal from "../../components/ClientChatbotModal";
import ClientNotificationButton from "../../components/ClientNotificationButton";
import ClientSidebar from "../../components/ClientSidebar";

export default function ClientHomePage() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const services = ["Business Permit", "Document Request", "Payment"];

  return (
    <div className="min-h-screen bg-[#f1f1f4] text-slate-900">
      <ClientSidebar activeLabel="Home" />
      <ClientChatbotModal isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      <main className="px-4 pb-10 pt-20 md:ml-20 md:px-6 md:pt-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex items-center justify-end">
            <ClientNotificationButton />
          </div>

          <header className="space-y-2">
            <h1 className="text-5xl font-black">Welcome, Juan!</h1>
            <p className="text-2xl text-slate-700">We are here to serve you better.</p>
          </header>

          <section className="h-36 rounded-2xl bg-[#b3caf1] p-3 shadow sm:h-48">
            <div className="flex h-full items-end justify-between overflow-hidden rounded-xl bg-gradient-to-r from-[#c5dbfa] to-[#96c7f7] px-4 pb-2">
              <span className="text-lg font-semibold text-slate-700">Queue Preview</span>
              <span className="rounded-md bg-white px-2 py-1 text-xs font-semibold">
                033
              </span>
            </div>
          </section>

          <section className="grid gap-5 xl:grid-cols-[1fr_1.2fr_0.9fr]">
            <div className="space-y-5">
              <article className="rounded-3xl bg-white p-5 shadow">
                <h2 className="text-4xl font-bold">What is TurnQ?</h2>
                <p className="mt-2 text-xl leading-8 text-slate-700">
                  TurnQ is a smart queue management system that helps you save time
                  and avoid long lines.
                </p>
                <button className="mt-4 rounded-full bg-[#6b4ef0] px-6 py-2 text-white transition hover:bg-[#5a3ee2]">
                  Learn More
                </button>
              </article>

              <article className="rounded-3xl bg-white p-5 shadow">
                <h2 className="text-4xl font-bold">Need Help?</h2>
                <p className="mt-2 text-xl leading-8 text-slate-700">
                  Ask our AI assistant anything about our service.
                </p>
                <button
                  onClick={() => setIsChatOpen(true)}
                  className="mt-4 w-full rounded-2xl border-2 border-[#6b4ef0] px-6 py-3 text-xl font-medium text-[#6b4ef0] transition hover:bg-[#f7f3ff]"
                >
                  ⚚ Chat with AI
                </button>
              </article>
            </div>

            <article className="rounded-3xl bg-white p-5 shadow">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-4xl font-bold">Services Available</h2>
                <button type="button" className="text-lg text-slate-600 hover:text-[#6b4ef0]">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {services.map((service) => (
                  <button
                    key={service}
                    type="button"
                    className="flex w-full items-center justify-between rounded-xl px-1 py-1 text-left transition hover:bg-[#f7f3ff]"
                  >
                    <div>
                      <p className="text-3xl font-semibold">{service}</p>
                      <p className="text-lg text-slate-500">Short Description</p>
                    </div>
                    <span className="text-3xl text-[#6b4ef0]">›</span>
                  </button>
                ))}
              </div>
            </article>

            <article className="rounded-3xl border-2 border-[#6b4ef0]/70 bg-white p-5 shadow xl:block">
              <h2 className="text-center text-3xl font-bold">Current Queue Status</h2>
              <div className="mt-4 rounded-2xl border-2 border-[#6b4ef0] p-4 text-center">
                <p className="text-base text-slate-500">Your Queue Number</p>
                <p className="text-6xl font-extrabold">A - 042</p>
                <p className="text-base text-slate-600">Service: Business Permit</p>
              </div>
              <div className="mt-4 text-center">
                <span className="rounded-full bg-[#eee7ff] px-4 py-1 text-base font-medium text-[#6b4ef0]">
                  Waiting
                </span>
                <p className="mt-5 text-base text-slate-600">Estimated Waiting Time</p>
                <p className="text-6xl font-bold">18 mins</p>
              </div>
            </article>
          </section>
        </div>
      </main>
    </div>
  );
}
