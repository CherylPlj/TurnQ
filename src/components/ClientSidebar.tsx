"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SidebarItem = {
  label: string;
  href: string;
  icon: string;
};

const sidebarItems: SidebarItem[] = [
  { label: "Home", href: "/client", icon: "⌂" },
  { label: "Join Queue", href: "/client/join-queue", icon: "◫" },
  { label: "Queue Status", href: "/client/queue-status", icon: "⌛" },
  { label: "History", href: "/client/history", icon: "◔" },
  { label: "Settings", href: "/client/settings", icon: "⚙" },
];

type ClientSidebarProps = {
  activeLabel?: string;
};

export default function ClientSidebar({ activeLabel = "Home" }: ClientSidebarProps) {
  const router = useRouter();
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleLogout() {
    setMobileOpen(false);
    router.push("/");
  }

  return (
    <>
      <button
        type="button"
        aria-label="Open sidebar menu"
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-40 rounded-xl border border-slate-300 bg-white px-3 py-2 text-lg shadow md:hidden"
      >
        ☰
      </button>

      <aside
        className={`fixed left-0 top-0 z-50 h-screen w-72 transform bg-gradient-to-b from-[#3f4ce6] via-[#6942ef] to-[#8b48f4] text-white shadow-2xl transition-transform duration-300 md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/20 p-5">
          <p className="text-4xl font-black">
            Turn<span className="text-cyan-300">Q</span>
          </p>
          <button
            type="button"
            aria-label="Close sidebar menu"
            onClick={() => setMobileOpen(false)}
            className="rounded-md px-3 py-1 text-2xl hover:bg-white/15"
          >
            ×
          </button>
        </div>

        <nav className="space-y-1 p-4">
          {sidebarItems.map((item) => {
            const isActive = item.label === activeLabel;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-base transition ${
                  isActive ? "bg-white/20 font-semibold" : "hover:bg-white/15"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                <span aria-hidden>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-4 right-4">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full rounded-xl border border-white/30 py-3 text-left text-base font-semibold transition hover:bg-white/15"
          >
            <span className="pl-4">Log Out</span>
          </button>
        </div>
      </aside>

      {mobileOpen ? (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          className="fixed inset-0 z-40 bg-black/45 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-30 hidden bg-gradient-to-b from-[#3f4ce6] via-[#6942ef] to-[#8b48f4] text-white transition-all duration-300 md:flex md:flex-col ${
          desktopOpen ? "w-72" : "w-20"
        }`}
      >
        <button
          type="button"
          aria-label={desktopOpen ? "Collapse sidebar" : "Expand sidebar"}
          onClick={() => setDesktopOpen((prev) => !prev)}
          className="mx-4 mt-4 rounded-lg px-2 py-1 text-2xl transition hover:bg-white/15"
        >
          {desktopOpen ? "‹" : "›"}
        </button>

        <div className="mx-4 mt-4 border-b border-white/20 pb-4">
          <p className={`text-4xl font-black ${desktopOpen ? "block" : "hidden"}`}>
            Turn<span className="text-cyan-300">Q</span>
          </p>
          <p className={`text-center text-3xl font-bold ${desktopOpen ? "hidden" : "block"}`}>
            Q
          </p>
        </div>

        <nav className="mt-4 flex-1 space-y-1 px-3">
          {sidebarItems.map((item) => {
            const isActive = item.label === activeLabel;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`group flex items-center rounded-xl px-3 py-3 transition ${
                  isActive ? "bg-white/20 font-semibold" : "hover:bg-white/15"
                }`}
              >
                <span className="min-w-7 text-lg" aria-hidden>
                  {item.icon}
                </span>
                <span
                  className={`overflow-hidden whitespace-nowrap transition-all duration-300 ${
                    desktopOpen ? "ml-2 w-full opacity-100" : "ml-0 w-0 opacity-0"
                  }`}
                >
                  {item.label}
                </span>
                {!desktopOpen ? (
                  <span className="pointer-events-none absolute left-20 z-50 ml-2 rounded-md bg-slate-900 px-2 py-1 text-xs text-white opacity-0 shadow transition group-hover:opacity-100">
                    {item.label}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="p-3">
          <button
            type="button"
            onClick={handleLogout}
            className={`w-full rounded-xl border border-white/30 py-3 text-left transition hover:bg-white/15 ${
              desktopOpen ? "px-4" : "px-0 text-center"
            }`}
          >
            {desktopOpen ? "Log Out" : "↪"}
          </button>
        </div>
      </aside>
    </>
  );
}
