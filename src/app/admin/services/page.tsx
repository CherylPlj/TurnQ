const services = [
  {
    name: "Business Permit",
    description: "Processing of business permit",
    time: "20 Minutes",
    status: "Active",
  },
  {
    name: "Document Request",
    description: "Processing of document requests",
    time: "15 Minutes",
    status: "Active",
  },
  {
    name: "Payment",
    description: "Cashier and payment processing",
    time: "10 Minutes",
    status: "Active",
  },
  {
    name: "Information",
    description: "Public assistance and information desk",
    time: "8 Minutes",
    status: "Active",
  },
];

const serviceHours = [
  {
    operatingDay: "Monday - Friday",
    operatingTime: "8:00 AM - 5:00 PM",
    queueingDay: "Monday - Friday",
    queueingTime: "8:00 AM - 5:00 PM",
  },
  {
    operatingDay: "Saturday",
    operatingTime: "8:00 AM - 12:00 PM",
    queueingDay: "Saturday",
    queueingTime: "8:00 AM - 11:30 AM",
  },
  {
    operatingDay: "Sunday",
    operatingTime: "Closed",
    queueingDay: "Sunday",
    queueingTime: "Closed",
  },
];

function ViewIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 3v12" />
      <path d="M7 10l5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

export default function ServicesPage() {
  return (
    <section className="space-y-4">
      <header className="sticky top-0 z-20 -mx-8 border-b border-slate-200 bg-white/95 px-8 py-4 backdrop-blur">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-black tracking-tight text-slate-800">Services</h1>
          <div className="text-right">
            <p className="text-sm text-slate-400">Apr 30, 2026</p>
            <p className="text-2xl font-bold text-slate-700">10:00 AM</p>
          </div>
        </div>
      </header>

      <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">Services Offered</h2>
          <button
            type="button"
            className="rounded-lg bg-gradient-to-r from-[#6d48d7] to-[#8748ea] px-4 py-2 text-sm font-semibold text-white"
          >
            + Add New Service
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200">
          <header className="grid grid-cols-[1.1fr_1.7fr_1fr_0.7fr_0.6fr] bg-[#f7f7fb] px-4 py-2 text-sm font-semibold text-slate-700">
            <p>Service Name</p>
            <p>Description</p>
            <p>Estimated Time</p>
            <p>Status</p>
            <p>Action</p>
          </header>
          <div className="divide-y divide-slate-100">
            {services.map((service) => (
              <div
                key={service.name}
                className="grid grid-cols-[1.1fr_1.7fr_1fr_0.7fr_0.6fr] items-center px-4 py-3 text-sm text-slate-700"
              >
                <p>{service.name}</p>
                <p>{service.description}</p>
                <p>{service.time}</p>
                <p>{service.status}</p>
                <div className="flex items-center gap-2">
                  <button type="button" className="text-slate-700">
                    <ViewIcon />
                  </button>
                  <button type="button" className="text-slate-700">
                    <EditIcon />
                  </button>
                  <button type="button" className="text-rose-400">
                    <TrashIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>

      <section className="grid gap-4 xl:grid-cols-[1.7fr_1fr]">
        <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800">Service Hours</h2>
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-[#6d48d7] to-[#8748ea] px-4 py-2 text-sm font-semibold text-white"
            >
              <ClockIcon />
              Edit Hours
            </button>
          </div>
          <div className="overflow-hidden rounded-xl border border-slate-200">
            <header className="grid grid-cols-4 bg-[#f7f7fb] px-4 py-2 text-sm font-semibold text-slate-700">
              <p>Operating Hours</p>
              <p></p>
              <p>Queueing Hours</p>
              <p></p>
            </header>
            <div className="divide-y divide-slate-100">
              {serviceHours.map((item, index) => (
                <div key={index} className="grid grid-cols-4 px-4 py-3 text-sm text-slate-700">
                  <p>{item.operatingDay}</p>
                  <p>{item.operatingTime}</p>
                  <p>{item.queueingDay}</p>
                  <p>{item.queueingTime}</p>
                </div>
              ))}
            </div>
          </div>
        </article>

        <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-slate-800">Generate New QR Code</h2>
            <button
              type="button"
              className="flex items-center gap-2 rounded-lg border border-[#7460d8] px-3 py-1.5 text-sm font-medium text-slate-700"
            >
              <DownloadIcon />
              Download
            </button>
          </div>

          <div className="grid grid-cols-[auto_1fr] items-center gap-4">
            <div className="h-32 w-32 rounded-xl border-2 border-[#6d48d7] bg-[linear-gradient(45deg,#111_25%,transparent_25%,transparent_75%,#111_75%,#111),linear-gradient(45deg,#111_25%,#fff_25%,#fff_75%,#111_75%,#111)] bg-[length:20px_20px] bg-[position:0_0,10px_10px]" />
            <div className="space-y-3">
              <p className="text-slate-700">
                <span className="font-semibold">Service:</span> Business Permit
              </p>
              <p className="text-slate-700">
                <span className="font-semibold">Date:</span> April 14, 2026
              </p>
              <button
                type="button"
                className="rounded-lg bg-gradient-to-r from-[#6d48d7] to-[#8748ea] px-5 py-2 font-semibold text-white"
              >
                Generate QR Code
              </button>
            </div>
          </div>
        </article>
      </section>
    </section>
  );
}
