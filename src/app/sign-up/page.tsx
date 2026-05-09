import Link from "next/link";

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-[#f3f3f6] p-3 sm:p-6">
      <section className="mx-auto grid min-h-[calc(100vh-1.5rem)] w-full max-w-7xl overflow-hidden rounded-2xl bg-white shadow-lg md:min-h-[680px] md:grid-cols-2">
        <div className="relative hidden flex-col justify-center overflow-hidden bg-gradient-to-br from-[#3b4be2] via-[#5c44f0] to-[#7e49f4] p-10 text-white md:flex">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-14 -top-16 h-40 w-40 rounded-full bg-white/20" />
            <div className="absolute right-12 top-8 h-28 w-28 rounded-full bg-white/15" />
            <div className="absolute right-10 bottom-14 h-24 w-24 rounded-full bg-white/20" />
            <div className="absolute left-6 bottom-6 h-44 w-44 rounded-full bg-white/15" />
          </div>
          <div className="relative z-10 max-w-md space-y-5">
            <p className="text-2xl font-semibold tracking-wide">TurnQ</p>
            <h1 className="text-6xl font-extrabold leading-[1.05]">
              Welcome to
              <br />
              TurnQ!
            </h1>
            <p className="text-4xl text-white/95">Your turn. Your way.</p>
          </div>
        </div>

        <div className="flex items-center justify-center bg-[#f8f8ff] px-5 py-10 sm:px-8">
          <div className="w-full max-w-xl space-y-6">
            <div className="flex items-start justify-between">
              <p className="text-5xl font-black text-[#4f46e5]">
                Turn<span className="text-cyan-400">Q</span>
              </p>
              <span className="text-xs font-semibold uppercase tracking-widest text-slate-400">
                Tultechi
              </span>
            </div>

            <div className="space-y-2">
              <h2 className="text-5xl font-extrabold text-slate-900">Sign Up</h2>
              <p className="text-lg text-slate-600">Create an account</p>
            </div>

            <form className="space-y-5">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-slate-700"
                >
                  Enter email *
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="sam@gmail.com"
                  className="w-full rounded-full border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none ring-indigo-200 transition focus:ring-2"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-semibold text-slate-700"
                >
                  Enter password *
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="********"
                  className="w-full rounded-full border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none ring-indigo-200 transition focus:ring-2"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirm-password"
                  className="text-sm font-semibold text-slate-700"
                >
                  Confirm password *
                </label>
                <input
                  id="confirm-password"
                  type="password"
                  placeholder="********"
                  className="w-full rounded-full border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none ring-indigo-200 transition focus:ring-2"
                />
              </div>

              <label className="flex items-center gap-3 text-sm text-slate-600">
                <input type="checkbox" className="h-4 w-4 rounded border-slate-300" />
                I agree with the terms and conditions.
              </label>

              <button
                type="submit"
                className="w-full rounded-full bg-[#4f46e5] py-3 text-base font-semibold text-white transition hover:bg-[#4338ca]"
              >
                Sign Up
              </button>
            </form>

            <p className="text-center text-base text-slate-600">
              Already have an account?{" "}
              <Link
                href="/sign-in"
                className="font-bold text-[#4f46e5] hover:text-[#4338ca]"
              >
                Log In.
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
