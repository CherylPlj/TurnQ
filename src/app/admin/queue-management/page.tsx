const queueRows = [
  { id: "PR-A046", service: "Business Permit", category: "Regular", status: "Waiting", wait: "12 mins" },
  { id: "PR-A046", service: "Business Permit", category: "Regular", status: "Waiting", wait: "12 mins" },
  { id: "PR-A046", service: "Business Permit", category: "Priority", status: "Serving", wait: "12 mins" },
  { id: "PR-A046", service: "Business Permit", category: "Regular", status: "Rejected", wait: "12 mins" },
  { id: "PR-A046", service: "Business Permit", category: "Regular", status: "Waiting", wait: "12 mins" },
  { id: "PR-A046", service: "Business Permit", category: "Priority", status: "Serving", wait: "12 mins" },
  { id: "PR-A046", service: "Business Permit", category: "Priority", status: "Serving", wait: "12 mins" },
  { id: "PR-A046", service: "Business Permit", category: "Regular", status: "Waiting", wait: "12 mins" },
  { id: "PR-A046", service: "Business Permit", category: "Regular", status: "Rejected", wait: "12 mins" },
  { id: "PR-A046", service: "Business Permit", category: "Regular", status: "Waiting", wait: "12 mins" },
  { id: "PR-A046", service: "Business Permit", category: "Priority", status: "Serving", wait: "12 mins" },
  { id: "PR-A046", service: "Business Permit", category: "Regular", status: "Waiting", wait: "12 mins" },
  { id: "PR-A046", service: "Business Permit", category: "Regular", status: "Waiting", wait: "12 mins" },
];

function categoryPill(category: string) {
  return category === "Priority"
    ? "bg-amber-100 text-amber-700"
    : "bg-fuchsia-100 text-fuchsia-700";
}

function statusPill(status: string) {
  if (status === "Serving") {
    return "bg-emerald-100 text-emerald-700";
  }
  if (status === "Rejected") {
    return "bg-orange-100 text-orange-700";
  }
  return "bg-blue-100 text-blue-700";
}

function ActionIcon({ type }: { type: "next" | "skip" | "hold" | "cancel" | "served" }) {
  if (type === "next") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 12h11" />
        <path d="M12 5l7 7-7 7" />
      </svg>
    );
  }
  if (type === "skip") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M5 5l10 7-10 7V5z" />
        <path d="M19 5v14" />
      </svg>
    );
  }
  if (type === "hold") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M8 5v14" />
        <path d="M16 5v14" />
      </svg>
    );
  }
  if (type === "cancel") {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M9 9l6 6M15 9l-6 6" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 21H4" />
      <path d="M12 4a4 4 0 014 4v2H8V8a4 4 0 014-4z" />
      <path d="M8 10l-1 8h10l-1-8" />
    </svg>
  );
}

export default function QueueManagementPage() {
  return (
    <section className="space-y-4">
      <header className="sticky top-0 z-20 -mx-8 border-b border-slate-200 bg-white/95 px-8 py-4 backdrop-blur">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-black tracking-tight text-slate-800">
            Queue Management
          </h1>
          <div className="text-right">
            <p className="text-sm text-slate-400">Apr 30, 2026</p>
            <p className="text-2xl font-bold text-slate-700">10:00 AM</p>
          </div>
        </div>
      </header>

      <section className="grid gap-4 xl:grid-cols-[2.2fr_0.86fr]">
        <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="mb-3 flex flex-wrap justify-end gap-2">
            {["Services", "Counter", "Costumer Type"].map((filter) => (
              <button
                key={filter}
                type="button"
                className="rounded-lg border border-[#7460d8] bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <header className="grid grid-cols-6 rounded-t-2xl bg-gradient-to-r from-[#5B4FD7] to-[#8C4AEF] px-4 py-3 text-xs font-bold uppercase tracking-wide text-white">
              <p>Queue ID</p>
              <p>Service Type</p>
              <p>Category</p>
              <p>Status</p>
              <p>Waiting Time</p>
              <p className="text-right">Action</p>
            </header>
            <div className="max-h-[560px] divide-y divide-slate-100 overflow-y-auto">
              {queueRows.map((row, index) => (
                <div
                  key={`${row.id}-${index}`}
                  className="grid grid-cols-6 items-center px-4 py-3 text-sm text-slate-700"
                >
                  <p>{row.id}</p>
                  <p>{row.service}</p>
                  <span
                    className={`w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${categoryPill(row.category)}`}
                  >
                    {row.category}
                  </span>
                  <span
                    className={`w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${statusPill(row.status)}`}
                  >
                    {row.status}
                  </span>
                  <p>{row.wait}</p>
                  <div className="flex justify-end">
                    <button
                      type="button"
                      className="rounded-full bg-[#6d48d7] px-4 py-1.5 text-xs font-semibold text-white hover:bg-[#5f3ec2]"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>

        <aside className="space-y-4">
          <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-bold text-slate-800">Add To Queue</h2>
            <div className="mt-3 space-y-3">
              <input
                type="text"
                placeholder="Name"
                className="w-full rounded-lg border border-[#7460d8] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7c4dff]/25"
              />
              <select className="w-full rounded-lg border border-[#7460d8] px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#7c4dff]/25">
                <option>Category</option>
                <option>Regular</option>
                <option>Priority</option>
              </select>
              <button
                type="button"
                className="w-full rounded-lg bg-gradient-to-r from-[#6d48d7] to-[#8748ea] px-4 py-2.5 font-semibold text-white"
              >
                Add To Queue
              </button>
            </div>
          </article>

          <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-bold text-slate-800">Currently Serving</h2>
            <div className="mt-3 grid grid-cols-[1.4fr_1fr] gap-2">
              <div className="rounded-xl border-2 border-[#6d48d7] bg-gradient-to-r from-[#6d48d7] to-[#8748ea] px-3 py-2 text-white">
                <p className="text-xs">Counter1</p>
                <p className="text-5xl font-black tracking-wide">A - 042</p>
                <p className="text-xs">Service: Business Permit</p>
              </div>
              <div className="rounded-xl border-2 border-[#6d48d7] px-3 py-2 text-center">
                <p className="text-xs text-slate-500">Elapsed Time</p>
                <p className="mt-2 text-4xl font-black text-slate-800">00:12:34</p>
              </div>
            </div>
          </article>

          <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-lg font-bold text-slate-800">Queue Action</h2>
            <div className="mt-3 grid grid-cols-2 gap-2">
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg border border-[#7460d8] px-3 py-2 font-medium text-slate-800"
              >
                <ActionIcon type="next" />
                Call Next
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg border border-[#7460d8] px-3 py-2 font-medium text-slate-800"
              >
                <ActionIcon type="skip" />
                Skip
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg border border-[#7460d8] px-3 py-2 font-medium text-slate-800"
              >
                <ActionIcon type="hold" />
                Hold
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg border border-[#7460d8] px-3 py-2 font-medium text-slate-800"
              >
                <ActionIcon type="cancel" />
                Cancel
              </button>
              <button
                type="button"
                className="col-span-2 flex items-center justify-center gap-2 rounded-lg border border-[#7460d8] px-3 py-2 font-medium text-slate-800"
              >
                <ActionIcon type="served" />
                Mark as Served
              </button>
            </div>
          </article>
        </aside>
      </section>
    </section>
  );
}
