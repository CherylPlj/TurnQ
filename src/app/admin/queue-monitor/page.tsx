const counters = [
  { name: "Counter 1", nowServing: "A - 042", next: "A - 043" },
  { name: "Counter 2", nowServing: "B - 014", next: "A - 015" },
  { name: "Counter 3", nowServing: "C - 008", next: "C - 009" },
  { name: "Counter 4", nowServing: "P - 005", next: "P - 004" },
  { name: "Counter 5", nowServing: "S - 012", next: "S - 013" },
];

const waitingTimes = [
  { service: "Business Permit", average: "18 mins" },
  { service: "Payment", average: "15 mins" },
  { service: "Information", average: "11 mins" },
  { service: "Document Request", average: "20 mins" },
];

const summaryCards = [
  { label: "Total in Queue", value: "42", color: "border-[#5B4FD7]" },
  { label: "Being Served", value: "5", color: "border-[#10B981]" },
  { label: "On Hold", value: "2", color: "border-[#D89A11]" },
  { label: "Completed Today", value: "128", color: "border-[#29C6D7]" },
];

function RefreshIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M20 11a8 8 0 10-2.34 5.66L20 19" />
      <path d="M20 11h-6" />
    </svg>
  );
}

export default function QueueMonitorPage() {
  return (
    <section className="space-y-4">
      <header className="sticky top-0 z-20 -mx-8 border-b border-slate-200 bg-white/95 px-8 py-4 backdrop-blur">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-black tracking-tight text-slate-800">
            Queue Monitor
          </h1>
          <div className="text-right">
            <p className="text-sm text-slate-400">Apr 30, 2026</p>
            <p className="text-2xl font-bold text-slate-700">10:00 AM</p>
          </div>
        </div>
      </header>

      <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <h2 className="text-2xl font-bold text-slate-800">Live Queue Status Board</h2>
        <div className="mt-3 grid gap-4 xl:grid-cols-5">
          {counters.map((counter) => (
            <article
              key={counter.name}
              className="overflow-hidden rounded-2xl border-2 border-[#6d48d7] bg-white"
            >
              <div className="px-4 py-3 text-center">
                <p className="text-xl font-bold text-slate-800">{counter.name}</p>
                <p className="mt-1 text-sm text-slate-500">Now serving</p>
                <p className="mt-2 text-4xl font-black tracking-wide text-slate-800">
                  {counter.nowServing}
                </p>
                <p className="mt-3 text-sm text-slate-600">Service: Business Permit</p>
              </div>
              <div className="border-t border-slate-200 px-4 py-2 text-center">
                <p className="text-sm text-slate-500">Next</p>
                <p className="text-3xl font-black tracking-wide text-slate-800">
                  {counter.next}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_2fr]">
        <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <h3 className="text-2xl font-bold text-slate-800">Estimated Waiting Time</h3>
          <div className="mt-3 overflow-hidden rounded-xl border border-slate-200">
            <header className="grid grid-cols-2 bg-[#f7f7fb] px-4 py-2 text-sm font-semibold text-slate-600">
              <p>Service</p>
              <p className="text-right">Average Waiting Time</p>
            </header>
            <div className="divide-y divide-slate-100">
              {waitingTimes.map((item) => (
                <div
                  key={`${item.service}-${item.average}`}
                  className="grid grid-cols-2 px-4 py-2.5 text-sm text-slate-700"
                >
                  <p>{item.service}</p>
                  <p className="text-right">{item.average}</p>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <h3 className="text-2xl font-bold text-slate-800">Queue Summary</h3>
          <div className="mt-4 grid gap-3 xl:grid-cols-4">
            {summaryCards.map((card) => (
              <div
                key={card.label}
                className={`rounded-2xl border-2 bg-white px-4 py-5 text-center ${card.color}`}
              >
                <p className="text-sm font-medium text-slate-600">{card.label}</p>
                <p className="mt-1 text-5xl font-black text-slate-800">{card.value}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      <footer className="flex items-center justify-center gap-2 text-slate-500">
        <p className="text-lg">Last updated 10:20:45 AM</p>
        <RefreshIcon />
      </footer>
    </section>
  );
}
