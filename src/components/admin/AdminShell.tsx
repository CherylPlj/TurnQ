"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAdminAuth } from "@/src/contexts/AdminAuthContext";

type NavItem = {
  label: string;
  href: string;
};

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/admin" },
  { label: "Queue Management", href: "/admin/queue-management" },
  { label: "Queue Monitor", href: "/admin/queue-monitor" },
  { label: "Priority Management", href: "/admin/priority-management" },
  { label: "Analytics & Reports", href: "/admin/analytics" },
  { label: "Services", href: "/admin/services" },
  { label: "User Management", href: "/admin/users" },
  { label: "System Settings", href: "/admin/settings" },
];

const COLLAPSED_WIDTH = 72;
const EXPANDED_WIDTH = 280;

function MenuIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 12h16M4 6h16M4 18h16" />
    </svg>
  );
}

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 transition-transform ${isOpen ? "" : "rotate-180"}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function DotIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </svg>
  );
}

export default function AdminShell({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(true);
  const pathname = usePathname();
  const { logout } = useAdminAuth();

  const sidebarWidth = useMemo(
    () => (isOpen ? EXPANDED_WIDTH : COLLAPSED_WIDTH),
    [isOpen],
  );

  return (
    <div className="min-h-screen bg-[#ececec] text-slate-900">
      <aside
        className="fixed left-0 top-0 z-40 h-screen overflow-hidden border-r border-white/20 bg-gradient-to-b from-[#4f46e5] to-[#7c3aed] text-white shadow-xl transition-[width] duration-300"
        style={{ width: sidebarWidth }}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-4 py-5">
            {isOpen ? (
              <p className="text-3xl font-black tracking-tight">TurnQ</p>
            ) : (
              <div className="mx-auto rounded-xl bg-white/10 p-2">
                <DotIcon />
              </div>
            )}
            <button
              type="button"
              onClick={() => setIsOpen((prev) => !prev)}
              className="rounded-lg p-1.5 text-indigo-100 transition hover:bg-white/15"
              aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              <ChevronIcon isOpen={isOpen} />
            </button>
          </div>

          <nav className="mt-3 flex-1 space-y-1 px-2">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold transition ${
                  pathname === item.href
                    ? "bg-white/20 text-white"
                    : "text-indigo-50 hover:bg-white/15"
                }`}
              >
                <MenuIcon />
                <span className={`${isOpen ? "opacity-100" : "opacity-0"} whitespace-nowrap transition-opacity duration-150`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>

          <div className="p-3">
            <button
              type="button"
              onClick={logout}
              className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-semibold text-indigo-50 transition hover:bg-white/15"
            >
              <MenuIcon />
              <span className={`${isOpen ? "opacity-100" : "opacity-0"} whitespace-nowrap transition-opacity duration-150`}>
                Log Out
              </span>
            </button>
          </div>
        </div>
      </aside>

      <div
        className="min-h-screen transition-[margin-left] duration-300"
        style={{ marginLeft: sidebarWidth }}
      >
        <main className="h-screen overflow-y-auto p-8">{children}</main>
      </div>
    </div>
  );
}
