import Link from "next/link";

const navItems = [
  { id: "home", label: "Home" },
  { id: "how-it-works", label: "How it Works" },
  { id: "about", label: "About Us" },
  { id: "why-choose-us", label: "Why Choose Us" },
];

const howItWorks = [
  {
    title: "Scan to Check-in",
    description:
      "Skip the manual logbook. Simply scan the TurnQ QR code at the establishment to join the digital queue instantly from your smartphone.",
    badge: "01",
  },
  {
    title: "Live ETA & Prioritization",
    description:
      "Track your progress in real-time through your personalized Live Queue Dashboard. Our system automatically applies smart prioritization for vulnerable groups and provides an Estimated Waiting Time so you can manage your schedule.",
    badge: "02",
  },
  {
    title: "Get Notified & Proceed",
    description:
      "Relax until it is your turn. You will receive automated notifications via SMS, email, or in-app alerts when you are next. Just head to the counter when prompted by the voice alert to complete your transaction.",
    badge: "03",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f5f5f8] text-slate-900">
      <header className="sticky top-0 z-30 border-b border-[#e5e7eb] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <a href="#home" className="text-3xl font-black text-[#4f46e5]">
            TurnQ
          </a>
          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-base font-semibold text-slate-700 transition hover:text-[#4f46e5]"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <Link
            href="/sign-in"
            className="rounded-full bg-[#4f46e5] px-7 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-[#4338ca]"
          >
            Log In
          </Link>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-24 px-6 py-16">
        <section
          id="home"
          className="grid scroll-mt-24 gap-10 md:grid-cols-2 md:items-center"
        >
          <div className="space-y-8">
            <h1 className="text-5xl font-black leading-tight text-slate-900">
              WELCOME TO <span className="text-[#4f46e5]">TurnQ</span>:<br />
              REDEFINING THE WAIT
            </h1>
            <p className="max-w-xl text-lg leading-8 text-slate-700">
              At Tultechi, we believe your time is valuable. TurnQ is a smart
              queue management system designed to replace outdated, manual lines
              with a transparent and efficient digital solution. Whether you are
              visiting a government office, a school, or a local clinic, we
              ensure you spend less time standing in line and more time on what
              matters most.
            </p>
            <button className="rounded-full bg-[#4f46e5] px-12 py-4 text-lg font-semibold text-white shadow-md transition hover:bg-[#4338ca]">
              Get Started
            </button>
          </div>
          <div className="h-[440px] rounded-[2rem] bg-gradient-to-br from-[#2f2f35] to-[#9a6b38] p-6 shadow-lg">
            <div className="flex h-full items-center justify-center rounded-[1.5rem] border border-white/20 bg-black/20 text-center text-white/90">
              Smart Queue Check-In Preview
            </div>
          </div>
        </section>

        <section id="how-it-works" className="scroll-mt-24 space-y-12 py-6">
          <div className="space-y-3 text-center">
            <h2 className="text-5xl font-bold">How It Works</h2>
            <p className="text-lg text-slate-700">
              Experience a smarter way to wait in just three simple steps.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {howItWorks.map((step) => (
              <article
                key={step.badge}
                className="rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-slate-200"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#4f46e5] text-lg font-bold text-white">
                  {step.badge}
                </div>
                <h3 className="mb-3 text-2xl font-bold text-[#4f46e5]">
                  {step.title}
                </h3>
                <p className="text-base leading-7 text-slate-700">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="about"
          className="grid scroll-mt-24 gap-8 py-6 md:grid-cols-2 md:items-center"
        >
          <div className="flex h-96 items-center justify-center rounded-3xl border border-dashed border-[#4f46e5] bg-white p-8 text-center text-2xl font-bold text-[#4f46e5]">
            TULTECHI LOGO
          </div>
          <div className="space-y-7">
            <h2 className="text-5xl font-bold">About Us</h2>
            <p className="text-lg leading-8 text-slate-700">
              <span className="font-semibold text-[#4f46e5]">Tultechi</span> is
              a tech startup founded by 4th-year IT students from the
              Polytechnic University of the Philippines - Quezon City (PUPQC).
            </p>
            <p className="text-lg leading-8 text-slate-700">
              We specialize in creating innovative solutions that address
              real-world urban challenges through technology. Our team brings
              proven analytical and problem-solving skills, honed through
              numerous app developments.
            </p>
            <p className="text-lg leading-8 text-slate-700">
              At Tultechi, we value{" "}
              <span className="text-[#4f46e5]">
                collaboration, resilience, and a shared commitment
              </span>{" "}
              to building products that improve everyday life for communities.
            </p>
          </div>
        </section>

        <section id="why-choose-us" className="scroll-mt-24 space-y-8 py-6">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="h-52 rounded-2xl bg-gradient-to-r from-[#d8dbe8] to-[#f0f2f8] shadow-sm" />
            <div className="h-52 rounded-2xl bg-gradient-to-r from-[#d9ecff] to-[#e7f2ff] shadow-sm" />
          </div>
          <div className="space-y-4 text-center">
            <h2 className="text-5xl font-bold">Why Choose Us</h2>
            <p className="mx-auto max-w-4xl text-2xl text-slate-700">
              Tultechi delivers innovative, reliable, and user-focused tech
              solutions that solve real-world problems efficiently.
            </p>
          </div>
        </section>

        <section className="grid gap-10 rounded-3xl bg-white p-10 shadow-sm ring-1 ring-slate-200 md:grid-cols-2">
          <div className="flex h-96 items-center justify-center rounded-2xl border border-dashed border-[#4f46e5] bg-[#f8f8ff] text-center text-2xl font-bold text-[#4f46e5]">
            TULTECHI BRAND IMAGE
          </div>
          <div className="space-y-8">
            <div>
              <h3 className="mb-2 text-3xl font-bold text-[#4f46e5]">
                Customer Support
              </h3>
              <p className="text-lg leading-8 text-slate-700">
                Email: tultechi@gmail.com
                <br />
                Phone: 0910-101-0101
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-3xl font-bold text-[#4f46e5]">
                Best Price Guaranteed
              </h3>
              <p className="text-lg leading-8 text-slate-700">
                Affordable and Negotiable Prices
              </p>
            </div>
            <div>
              <h3 className="mb-2 text-3xl font-bold text-[#4f46e5]">
                Location
              </h3>
              <p className="text-lg leading-8 text-slate-700">
                Commonwealth, Quezon City, Metro Manila, NCR, Philippines
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#4f46e5] px-6 py-14 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          <div className="space-y-4">
            <p className="text-2xl font-black">TULTECHI</p>
            <p className="max-w-xs text-base text-indigo-100">
              Innovative solutions for faster, fairer queueing experiences.
            </p>
          </div>
          <div className="space-y-4">
            <h4 className="text-2xl font-bold">Quick Links</h4>
            <div className="grid grid-cols-2 gap-3 text-base text-indigo-100">
              <a href="#home" className="hover:text-white">
                Home
              </a>
              <a href="#why-choose-us" className="hover:text-white">
                Why Choose Us
              </a>
              <a href="#how-it-works" className="hover:text-white">
                How It Works
              </a>
              <a href="#about" className="hover:text-white">
                About Us
              </a>
              <a href="#home" className="hover:text-white">
                Privacy & Policy
              </a>
              <a href="#home" className="hover:text-white">
                Terms & Condition
              </a>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-2xl font-bold">Contact Us</h4>
            <input
              type="email"
              placeholder="Your email address"
              className="w-full rounded-2xl border border-white/40 bg-white px-4 py-3 text-slate-800 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
            <textarea
              placeholder="Your message"
              rows={4}
              className="w-full rounded-2xl border border-white/40 bg-white px-4 py-3 text-slate-800 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
            />
            <button className="rounded-full bg-[#312e81] px-10 py-3 text-base font-semibold">
              Send
            </button>
          </div>
        </div>
        <p className="mx-auto mt-12 max-w-6xl border-t border-white/25 pt-4 text-center text-sm text-indigo-100">
          2026 TULTECHI. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
