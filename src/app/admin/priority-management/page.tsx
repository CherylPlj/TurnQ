const classifications = [
  { code: "PWD", label: "Person with Disability", icon: "♿" },
  { code: "PWD", label: "60 years & above", icon: "🧍" },
  { code: "Pregnant", label: "Expecting Mother", icon: "🤰" },
];

const previewRows = [
  { id: "PR-A046", customer: "Juan Dela Cruz", service: "Business Permit", type: "PWD", status: "Waiting", time: "12 mins" },
  { id: "PR-A046", customer: "Leah Garcia", service: "Business Permit", type: "Pregnant", status: "Waiting", time: "12 mins" },
  { id: "PR-A046", customer: "Luz Santos", service: "Business Permit", type: "Senior", status: "Waiting", time: "12 mins" },
  { id: "PR-A046", customer: "Mariah Santos", service: "Business Permit", type: "Senior", status: "Waiting", time: "12 mins" },
  { id: "PR-A046", customer: "Maya Reyes", service: "Business Permit", type: "Pregnant", status: "Waiting", time: "12 mins" },
  { id: "PR-A046", customer: "Pedro Cruz", service: "Business Permit", type: "PWD", status: "Waiting", time: "12 mins" },
];

const rules = [
  { rule: "PWD First", description: "Person with disability goes first", order: "1" },
  { rule: "Senior Citizen Next", description: "Senior citizens are prioritized second", order: "2" },
  { rule: "Pregnant Woman Next", description: "Pregnant woman is prioritized third", order: "3" },
  { rule: "Regular Queue", description: "All other customers follows", order: "4" },
];

function priorityPill(type: string) {
  if (type === "PWD") {
    return "bg-rose-100 text-rose-700";
  }
  if (type === "Senior") {
    return "bg-amber-100 text-amber-700";
  }
  return "bg-yellow-100 text-yellow-700";
}

function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  );
}

export default function PriorityManagementPage() {
  return (
    <section className="space-y-4">
      <header className="sticky top-0 z-20 -mx-8 border-b border-slate-200 bg-white/95 px-8 py-4 backdrop-blur">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-black tracking-tight text-slate-800">
            Priority Management
          </h1>
          <div className="text-right">
            <p className="text-sm text-slate-400">Apr 30, 2026</p>
            <p className="text-2xl font-bold text-slate-700">10:00 AM</p>
          </div>
        </div>
      </header>

      <section className="grid gap-4 xl:grid-cols-[1.1fr_1.4fr]">
        <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-2xl font-bold text-slate-800">Priority Classification</h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {classifications.map((item, index) => (
              <div
                key={`${item.code}-${index}`}
                className="rounded-2xl border-2 border-[#6d48d7] px-3 py-4 text-center"
              >
                <p className="text-5xl">{item.icon}</p>
                <p className="mt-2 text-sm font-semibold text-slate-800">{item.code}</p>
                <p className="text-sm text-slate-600">{item.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 border-t border-slate-200 pt-4">
            <h3 className="text-xl font-bold text-slate-800">Manual Tagging</h3>
            <p className="text-sm text-slate-500">
              Search for a queue number and tag with priority
            </p>
            <div className="mt-3 grid gap-2 md:grid-cols-[1fr_1.2fr_auto]">
              <input
                type="text"
                placeholder="Enter Queue Number"
                className="rounded-lg border border-[#7460d8] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7c4dff]/25"
              />
              <select className="rounded-lg border border-[#7460d8] px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#7c4dff]/25">
                <option>Select Priority Type</option>
                <option>PWD</option>
                <option>Senior</option>
                <option>Pregnant</option>
              </select>
              <button
                type="button"
                className="rounded-lg bg-gradient-to-r from-[#6d48d7] to-[#8748ea] px-6 py-2 font-semibold text-white"
              >
                Apply Tag
              </button>
            </div>
          </div>
        </article>

        <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-2xl font-bold text-slate-800">Priority Queue (Live Preview)</h2>
          <div className="mt-3 overflow-hidden rounded-xl border border-slate-200">
            <header className="grid grid-cols-6 bg-[#f7f7fb] px-4 py-2 text-sm font-semibold text-slate-600">
              <p>Queue ID</p>
              <p>Customer</p>
              <p>Service</p>
              <p>Priority Type</p>
              <p>Status</p>
              <p>Waiting Time</p>
            </header>
            <div className="max-h-[320px] divide-y divide-slate-100 overflow-y-auto">
              {previewRows.map((row, index) => (
                <div
                  key={`${row.id}-${row.customer}-${index}`}
                  className="grid grid-cols-6 items-center px-4 py-2.5 text-sm text-slate-700"
                >
                  <p>{row.id}</p>
                  <p>{row.customer}</p>
                  <p>{row.service}</p>
                  <span
                    className={`w-fit rounded-full px-2.5 py-1 text-xs font-semibold ${priorityPill(row.type)}`}
                  >
                    {row.type}
                  </span>
                  <span className="w-fit rounded-full bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-700">
                    {row.status}
                  </span>
                  <p>{row.time}</p>
                </div>
              ))}
            </div>
          </div>
        </article>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800">Priority Rules Engine</h2>
            <button
              type="button"
              className="rounded-lg bg-gradient-to-r from-[#6d48d7] to-[#8748ea] px-4 py-2 text-sm font-semibold text-white"
            >
              + Add New Rule
            </button>
          </div>
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <header className="grid grid-cols-[1fr_1.7fr_0.6fr_0.7fr_0.5fr] bg-[#f7f7fb] px-4 py-2 text-sm font-semibold text-slate-600">
              <p>Rule</p>
              <p>Description</p>
              <p>Order</p>
              <p>Status</p>
              <p>Action</p>
            </header>
            <div className="divide-y divide-slate-100">
              {rules.map((item) => (
                <div
                  key={item.rule}
                  className="grid grid-cols-[1fr_1.7fr_0.6fr_0.7fr_0.5fr] items-center px-4 py-2.5 text-sm text-slate-700"
                >
                  <p>{item.rule}</p>
                  <p>{item.description}</p>
                  <select className="w-fit rounded-md border border-slate-200 px-2 py-1 text-sm">
                    <option>{item.order}</option>
                  </select>
                  <button
                    type="button"
                    className="h-6 w-12 rounded-full bg-[#5B4FD7] p-1 text-left"
                    aria-label={`Toggle ${item.rule}`}
                  >
                    <span className="block h-4 w-4 rounded-full bg-white" />
                  </button>
                  <button type="button" className="text-slate-700">
                    <EditIcon />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-2xl font-bold text-slate-800">Override Priority Setting</h2>
          <div className="mt-3 space-y-3">
            <div className="grid gap-2 md:grid-cols-2">
              <input
                type="text"
                placeholder="Enter Queue Number"
                className="rounded-lg border border-[#7460d8] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7c4dff]/25"
              />
              <select className="rounded-lg border border-[#7460d8] px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-[#7c4dff]/25">
                <option>Select Priority Type</option>
                <option>PWD</option>
                <option>Senior</option>
                <option>Pregnant</option>
                <option>Regular</option>
              </select>
            </div>

            <div className="space-y-2 rounded-lg border border-slate-200 p-3">
              <label className="flex items-start gap-2 text-sm text-slate-700">
                <input type="radio" name="override-action" defaultChecked />
                <span>
                  Move to next position (Remove Priority)
                  <br />
                  <span className="text-xs text-slate-500">
                    Place this queue number to the next position
                  </span>
                </span>
              </label>
              <label className="flex items-start gap-2 text-sm text-slate-700">
                <input type="radio" name="override-action" />
                <span>
                  Move to last position
                  <br />
                  <span className="text-xs text-slate-500">
                    Place this queue number to the last position
                  </span>
                </span>
              </label>
              <label className="flex items-start gap-2 text-sm text-slate-700">
                <input type="radio" name="override-action" />
                <span>
                  Hold Priority
                  <br />
                  <span className="text-xs text-slate-500">
                    Keep current position but do not apply priority
                  </span>
                </span>
              </label>
            </div>

            <textarea
              rows={3}
              placeholder="Additional Note (Optional)"
              className="w-full rounded-lg border border-[#7460d8] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#7c4dff]/25"
            />

            <div className="flex justify-end">
              <button
                type="button"
                className="rounded-lg bg-gradient-to-r from-[#6d48d7] to-[#8748ea] px-5 py-2 font-semibold text-white"
              >
                Apply Override
              </button>
            </div>
          </div>
        </article>
      </section>
    </section>
  );
}
