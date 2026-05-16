const stats = [
  {
    label: "Total people in queue",
    value: "48",
    note: "Live now",
    color: "border-[#5B4FD7]",
  },
  {
    label: "Average waiting time",
    value: "18 mins",
    note: "Today",
    color: "border-[#7C4DFF]",
  },
  {
    label: "Served today",
    value: "128",
    note: "Completed",
    color: "border-[#29C6D7]",
  },
  {
    label: "Missed/ Cancelled",
    value: "8",
    note: "Today",
    color: "border-[#D89A11]",
  },
  {
    label: "System Alert",
    value: "2",
    note: "Requires attention",
    color: "border-[#E45050]",
  },
];

const queueRows = [
  { id: "PR-A046", category: "Regular", status: "Waiting", time: "12 mins" },
  { id: "PR-A046", category: "Priority", status: "Rejected", time: "12 mins" },
  { id: "PR-A046", category: "Priority", status: "Regular", time: "12 mins" },
  { id: "PR-A046", category: "Regular", status: "Serving", time: "12 mins" },
  { id: "PR-A046", category: "Regular", status: "Regular", time: "12 mins" },
];

const upcoming = [
  "PR-A046 - Business Permit",
  "PR-A046 - Business Permit",
  "PR-A046 - Payment",
  "PR-A046 - Information",
  "PR-A046 - Document Request",
  "PR-A046 - Document Request",
];

const notifications = [
  "Estimated wait time increased to 15 minutes due to higher intake.",
  "New customer joined the queue. Current position: #27.",
  "Call failed: Customer number A-104 could not be reached.",
];

const linePath = "M0,80 C40,75 70,78 95,70 C120,62 140,45 165,56 C190,66 220,50 245,60 C280,74 310,66 340,70 C370,73 395,69 420,72";

function statusPill(status: string) {
  if (status === "Serving") {
    return "bg-emerald-100 text-emerald-700";
  }

  if (status === "Rejected") {
    return "bg-amber-100 text-amber-700";
  }

  if (status === "Waiting") {
    return "bg-blue-100 text-blue-700";
  }

  return "bg-fuchsia-100 text-fuchsia-700";
}

export default function AdminDashboardPage() {
  return (
    <section className="space-y-5">
      <header className="sticky top-0 z-20 -mx-8 border-b border-slate-200 bg-white/95 px-8 py-4 backdrop-blur">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-4xl font-black tracking-tight text-slate-800">
            Dashboard
          </h1>
          <div className="text-right">
            <p className="text-sm text-slate-400">Apr 30, 2026</p>
            <p className="text-2xl font-bold text-slate-700">10:00 AM</p>
          </div>
        </div>
      </header>

      <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <h2 className="px-2 text-4xl font-extrabold uppercase tracking-tight text-slate-800">
          Company Name Natin (Sample)
        </h2>

        <div className="mt-6 grid gap-3 xl:grid-cols-5">
          {stats.map((item) => (
            <article
              key={item.label}
              className={`rounded-2xl border-2 bg-white px-4 py-3 ${item.color}`}
            >
              <p className="text-xs font-medium text-slate-600">{item.label}</p>
              <p className="mt-1 text-4xl font-bold text-slate-800">{item.value}</p>
              <p className="text-xs text-slate-500">{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[2.1fr_1fr_1.3fr]">
        <article className="rounded-2xl bg-white shadow-sm ring-1 ring-slate-200">
          <header className="grid grid-cols-5 rounded-t-2xl bg-gradient-to-r from-[#5B4FD7] to-[#8C4AEF] px-4 py-3 text-xs font-bold uppercase tracking-wide text-white">
            <p>Queue ID</p>
            <p>Category</p>
            <p>Status</p>
            <p>Waiting Time</p>
            <p className="text-right">Action</p>
          </header>
          <div className="divide-y divide-slate-100">
            {queueRows.map((row, index) => (
              <div
                key={`${row.id}-${index}`}
                className="grid grid-cols-5 items-center px-4 py-3 text-sm text-slate-700"
              >
                <p>{row.id}</p>
                <span className="w-fit rounded-full bg-[#f8f3ff] px-2.5 py-1 text-xs font-semibold text-[#7c4dff]">
                  {row.category}
                </span>
                <span
                  className={`w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${statusPill(row.status)}`}
                >
                  {row.status}
                </span>
                <p>{row.time}</p>
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
        </article>

        <article className="space-y-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <h3 className="text-xl font-bold text-slate-800">Next to be Called</h3>
          <div className="rounded-2xl border-2 border-[#6d48d7] px-4 py-5 text-center">
            <p className="text-sm text-slate-500">Now Serving</p>
            <p className="my-2 text-5xl font-black tracking-wide text-slate-800">
              A - 042
            </p>
            <p className="text-sm text-slate-600">Service: Business Permit</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500">Upcoming</p>
            <div className="mt-2 space-y-2">
              {upcoming.map((item, index) => (
                <p key={`${item}-${index}`} className="text-sm text-slate-700">
                  {item}
                </p>
              ))}
            </div>
          </div>
        </article>

        <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <h3 className="text-xl font-bold text-slate-800">Queue by Service</h3>
          <div className="mt-4 flex items-center gap-6">
            <div className="relative h-40 w-40 rounded-full bg-[conic-gradient(#6d48d7_0_70%,#cdb9ff_70%_90%,#8f67ff_90%_97%,#af95ff_97%_100%)]">
              <div className="absolute inset-[22%] flex items-center justify-center rounded-full bg-white text-center">
                <div>
                  <p className="text-3xl font-black text-slate-800">Today</p>
                </div>
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2 text-slate-700">
                <span className="h-2.5 w-2.5 rounded-full bg-[#6d48d7]" />
                Business Permit <span className="ml-auto font-semibold">70%</span>
              </p>
              <p className="flex items-center gap-2 text-slate-700">
                <span className="h-2.5 w-2.5 rounded-full bg-[#cdb9ff]" />
                Payment <span className="ml-auto font-semibold">20%</span>
              </p>
              <p className="flex items-center gap-2 text-slate-700">
                <span className="h-2.5 w-2.5 rounded-full bg-[#8f67ff]" />
                Information <span className="ml-auto font-semibold">7%</span>
              </p>
              <p className="flex items-center gap-2 text-slate-700">
                <span className="h-2.5 w-2.5 rounded-full bg-[#af95ff]" />
                Others <span className="ml-auto font-semibold">3%</span>
              </p>
            </div>
          </div>
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-[2.2fr_1fr]">
        <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-2xl font-bold text-slate-800">Queue Overview Today</h3>
            <p className="text-5xl font-black text-slate-800">176</p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-[#fcfbff] p-3">
            <svg viewBox="0 0 430 110" className="h-32 w-full">
              <path d={linePath} fill="none" stroke="#7c4dff" strokeWidth="3" />
              <circle cx="165" cy="56" r="6" fill="#7c4dff" />
            </svg>
            <div className="mt-1 flex justify-between text-xs text-slate-500">
              <span>10:00</span>
              <span>12:00</span>
              <span>14:00</span>
              <span>16:00</span>
              <span>18:00</span>
            </div>
          </div>
        </article>

        <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <h3 className="text-xl font-bold text-slate-800">Recent Notifications</h3>
          <div className="mt-3 space-y-3">
            {notifications.map((item) => (
              <div key={item} className="rounded-xl border border-slate-200 px-3 py-2">
                <p className="text-sm text-slate-700">{item}</p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </section>
  );
}
