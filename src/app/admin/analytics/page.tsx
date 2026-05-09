const metrics = [
  { label: "Total Queue Volume", value: "176", color: "border-[#5B4FD7]" },
  { label: "Completed", value: "128", color: "border-[#10B981]" },
  { label: "Missed/Cancelled", value: "8", color: "border-[#E45050]" },
  { label: "Average Waiting Time", value: "16 mins", color: "border-[#29C6D7]" },
];

const serviceLegend = [
  { label: "Business Permit", color: "#4F46E5" },
  { label: "Document Request", color: "#3B82F6" },
  { label: "Payment", color: "#8BA2EB" },
  { label: "Information", color: "#BAC7F2" },
  { label: "Others", color: "#DFE5FA" },
];

const linePath =
  "M20,190 C60,175 80,165 120,160 C150,160 170,145 200,132 C220,122 240,95 260,80 C275,68 295,65 315,88 C335,110 348,128 362,170 C376,205 395,128 420,126 C440,126 456,150 470,188 C485,220 506,210 525,205 C540,203 555,200 570,230";

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

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M12 3v12" />
      <path d="M7 10l5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

export default function AnalyticsReportsPage() {
  return (
    <section className="space-y-4">
      <header className="sticky top-0 z-20 -mx-8 border-b border-slate-200 bg-white/95 px-8 py-4 backdrop-blur">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-black tracking-tight text-slate-800">
            Analytics & Reports
          </h1>
          <div className="text-right">
            <p className="text-sm text-slate-400">Apr 30, 2026</p>
            <p className="text-2xl font-bold text-slate-700">10:00 AM</p>
          </div>
        </div>
      </header>

      <section className="space-y-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <div className="flex flex-wrap items-center justify-end gap-2">
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-[#7460d8] px-4 py-2 text-sm font-medium text-slate-700"
          >
            Apr 14, 2026 - Apr 16, 2026
            <CalendarIcon />
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-[#7460d8] px-4 py-2 text-sm font-medium text-slate-700"
          >
            <DownloadIcon />
            Export
          </button>
        </div>

        <div className="grid gap-3 xl:grid-cols-[repeat(4,minmax(0,1fr))_1fr_1fr]">
          {metrics.map((metric) => (
            <article
              key={metric.label}
              className={`rounded-2xl border-2 px-4 py-3 text-center ${metric.color}`}
            >
              <p className="text-sm font-medium text-slate-600">{metric.label}</p>
              <p className="mt-1 text-5xl font-black text-slate-800">{metric.value}</p>
            </article>
          ))}

          <article className="rounded-2xl bg-gradient-to-r from-[#4F46E5] to-[#5E3DEA] px-4 py-3 text-center text-white">
            <p className="text-sm font-semibold">Peak Hours</p>
            <p className="mt-1 text-3xl font-black">11:00 AM - 1:00 PM</p>
            <p className="text-xs text-indigo-100">(Highest Queue Volume)</p>
          </article>

          <article className="rounded-2xl bg-gradient-to-r from-[#4F46E5] to-[#5E3DEA] px-4 py-3 text-center text-white">
            <p className="text-sm font-semibold">Average Waiting Time (Today)</p>
            <p className="mt-1 text-4xl font-black">16 min</p>
            <p className="text-xs text-indigo-100">Overall Average</p>
          </article>
        </div>
      </section>

      <section className="grid gap-4 xl:grid-cols-[1fr_1fr]">
        <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-3xl font-bold text-slate-800">Queue Volume Over Time</h2>
          <div className="mt-4 rounded-xl border border-slate-100 bg-[#fcfbff] p-3">
            <svg viewBox="0 0 600 260" className="h-[240px] w-full">
              <g stroke="#e5e7eb" strokeWidth="1">
                <line x1="20" y1="30" x2="580" y2="30" />
                <line x1="20" y1="70" x2="580" y2="70" />
                <line x1="20" y1="110" x2="580" y2="110" />
                <line x1="20" y1="150" x2="580" y2="150" />
                <line x1="20" y1="190" x2="580" y2="190" />
                <line x1="20" y1="230" x2="580" y2="230" />
              </g>
              <path d={linePath} fill="none" stroke="#4F46E5" strokeWidth="3" />
              <circle cx="315" cy="88" r="6" fill="#4F46E5" />
              <rect x="286" y="36" width="58" height="34" rx="12" fill="#1e293b" />
              <text
                x="315"
                y="58"
                fill="#ffffff"
                textAnchor="middle"
                fontSize="13"
                fontWeight="700"
              >
                95
              </text>
            </svg>
            <div className="mt-1 flex justify-between px-2 text-xs text-slate-500">
              <span>12 AM</span>
              <span>4 AM</span>
              <span>8 AM</span>
              <span>12 PM</span>
              <span>4 PM</span>
              <span>8 PM</span>
              <span>12 PM</span>
            </div>
          </div>
        </article>

        <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-3xl font-bold text-slate-800">Queue By Service</h2>
          <div className="mt-4 flex items-center justify-center gap-8">
            <div className="h-64 w-64 rounded-full bg-[conic-gradient(#4F46E5_0_38%,#3B82F6_38%_63%,#8BA2EB_63%_83%,#BAC7F2_83%_95%,#DFE5FA_95%_100%)]" />
            <div className="space-y-3 text-2xl">
              {serviceLegend.map((item) => (
                <p key={item.label} className="flex items-center gap-3 text-slate-700">
                  <span
                    className="h-4 w-4 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  {item.label}
                </p>
              ))}
            </div>
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
