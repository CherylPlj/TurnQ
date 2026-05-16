"use client";

import Image from "next/image";
import SignInPanel from "@/src/components/auth/SignInPanel";
import SignUpPanel from "@/src/components/auth/SignUpPanel";

type AuthView = "sign-in" | "sign-up";

type AuthPageShellProps = {
  view: AuthView;
};

function AuthHero({ view }: { view: AuthView }) {
  const isSignIn = view === "sign-in";

  return (
    <div className="relative hidden flex-col justify-center overflow-hidden bg-gradient-to-br from-[#3b4be2] via-[#5c44f0] to-[#7e49f4] p-10 text-white md:flex">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-14 -top-16 h-40 w-40 rounded-full bg-white/20" />
        <div className="absolute right-12 top-8 h-28 w-28 rounded-full bg-white/15" />
        <div className="absolute right-10 bottom-14 h-24 w-24 rounded-full bg-white/20" />
        <div className="absolute left-6 bottom-6 h-44 w-44 rounded-full bg-white/15" />
      </div>
      <div className="relative z-10 max-w-md space-y-5">
        <div className="flex flex-col items-start gap-3">
          <Image
            src="/turnqLogo.png"
            alt="TurnQ logo"
            width={80}
            height={80}
            className="h-16 w-16 object-contain sm:h-20 sm:w-20"
            priority
          />
          <p className="text-2xl font-semibold tracking-wide">TurnQ</p>
        </div>
        <h1 className="text-6xl font-extrabold leading-[1.05]">
          {isSignIn ? (
            <>
              Hello and
              <br />
              Welcome back!
            </>
          ) : (
            <>
              Welcome to
              <br />
              TurnQ!
            </>
          )}
        </h1>
        <p className="text-4xl text-white/95">Your turn. Your way.</p>
      </div>
    </div>
  );
}

export default function AuthPageShell({ view }: AuthPageShellProps) {
  return (
    <main className="min-h-screen bg-[#f3f3f6] p-3 sm:p-6">
      <section className="mx-auto grid min-h-[calc(100vh-1.5rem)] w-full max-w-7xl overflow-hidden rounded-2xl bg-white shadow-lg md:min-h-[680px] md:grid-cols-2">
        <AuthHero view={view} />
        <div className="flex items-center justify-center bg-[#f8f8ff] px-5 py-10 sm:px-8">
          {view === "sign-in" ? <SignInPanel /> : <SignUpPanel />}
        </div>
      </section>
    </main>
  );
}
