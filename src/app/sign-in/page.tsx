import Image from "next/image";
import AuthSuccessBanner from "@/src/components/auth/AuthSuccessBanner";
import ClientSignInForm from "@/src/components/auth/ClientSignInForm";

type SignInPageProps = {
  searchParams: Promise<{ next?: string }>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const params = await searchParams;
  const nextParam = params.next ?? "";
  const nextPath =
    nextParam.startsWith("/client") || nextParam.startsWith("/admin")
      ? nextParam
      : "/client";

  return (
    <main className="min-h-screen bg-[#f3f3f6] p-3 sm:p-6">
      <section className="mx-auto grid min-h-[calc(100vh-1.5rem)] w-full max-w-7xl overflow-hidden rounded-2xl bg-white shadow-lg md:min-h-[680px] md:grid-cols-2">
        <div className="relative hidden flex-col justify-center overflow-hidden bg-gradient-to-br from-[#3b4be2] via-[#5c44f0] to-[#7e49f4] p-10 text-white md:flex">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-14 -top-16 h-40 w-40 rounded-full bg-white/20" />
            <div className="absolute right-12 top-8 h-28 w-28 rounded-full bg-white/15" />
            <div className="absolute right-6 bottom-8 h-24 w-24 rounded-full bg-white/20" />
            <div className="absolute left-6 bottom-12 h-40 w-40 rounded-full bg-white/15" />
          </div>
          <div className="relative z-10 max-w-md space-y-5">
            <p className="text-2xl font-semibold tracking-wide">TurnQ</p>
            <h1 className="text-6xl font-extrabold leading-[1.05]">
              Hello and
              <br />
              Welcome back!
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
              <Image
                src="/kardesia.png"
                alt="Kardesia Solutions, Inc."
                width={120}
                height={48}
                className="h-12 w-auto max-w-[140px] object-contain object-right"
              />
            </div>

            <div className="space-y-2">
              <h2 className="text-5xl font-extrabold text-slate-900">Log In</h2>
              <p className="text-lg text-slate-600">Log in to your account</p>
            </div>

            <AuthSuccessBanner />

            <ClientSignInForm idPrefix="sign-in-page" nextPath={nextPath} />
          </div>
        </div>
      </section>
    </main>
  );
}
