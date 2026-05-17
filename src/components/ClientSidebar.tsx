"use client";

import type { LucideIcon } from "lucide-react";
import {
  ChevronLeft,
  FolderClock,
  Hourglass,
  House,
  LogOut,
  Menu,
  ScanLine,
  Settings,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type SidebarItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const sidebarItems: SidebarItem[] = [
  { label: "Home", href: "/client", icon: House },
  { label: "Join Queue", href: "/client/join-queue", icon: ScanLine },
  { label: "Queue Status", href: "/client/queue-status", icon: Hourglass },
  { label: "History", href: "/client/history", icon: FolderClock },
  { label: "Settings", href: "/client/settings", icon: Settings },
];

const iconClassName = "h-5 w-5 shrink-0";

type ClientSidebarProps = {
  activeLabel?: string;
};

function SidebarLogo({ compact }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="flex justify-center">
        <Image
          src="/turnqLogo.png"
          alt="TurnQ logo"
          width={44}
          height={44}
          className="h-11 w-11 object-contain"
          priority
        />
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <Image
        src="/turnqLogo.png"
        alt="TurnQ logo"
        width={72}
        height={72}
        className="h-14 w-14 object-contain sm:h-[72px] sm:w-[72px]"
        priority
      />
      <p className="mt-2 text-2xl font-bold tracking-tight">TurnQ</p>
    </div>
  );
}

function NavLinks({
  activeLabel,
  showLabels,
  onNavigate,
}: {
  activeLabel: string;
  showLabels: boolean;
  onNavigate?: () => void;
}) {
  return (
    <>
      {sidebarItems.map((item) => {
        const Icon = item.icon;
        const isActive = item.label === activeLabel;

        return (
          <Link
            key={item.label}
            href={item.href}
            title={!showLabels ? item.label : undefined}
            onClick={onNavigate}
            className={`group relative flex items-center rounded-xl py-3 text-sm font-semibold transition ${
              showLabels ? "gap-3 px-3" : "justify-center px-2"
            } ${isActive ? "bg-white/20 text-white" : "text-white/90 hover:bg-white/15"}`}
          >
            <Icon className={iconClassName} aria-hidden />
            <span
              className={`whitespace-nowrap ${
                showLabels ? "opacity-100" : "sr-only"
              }`}
            >
              {item.label}
            </span>
            {!showLabels ? (
              <span className="pointer-events-none absolute left-full z-50 ml-2 rounded-md bg-slate-900 px-2 py-1 text-xs text-white opacity-0 shadow transition group-hover:opacity-100">
                {item.label}
              </span>
            ) : null}
          </Link>
        );
      })}
    </>
  );
}

function LogOutButton({ showLabels }: { showLabels: boolean }) {
  return (
    <button
      type="button"
      title={!showLabels ? "Log Out" : undefined}
      className={`flex w-full items-center rounded-xl border border-white/30 py-3 text-sm font-semibold text-white transition hover:bg-white/15 ${
        showLabels ? "gap-3 px-3" : "justify-center px-2"
      }`}
    >
      <LogOut className={iconClassName} aria-hidden />
      <span className={`whitespace-nowrap ${showLabels ? "opacity-100" : "sr-only"}`}>
        Log Out
      </span>
    </button>
  );
}

export default function ClientSidebar({ activeLabel = "Home" }: ClientSidebarProps) {
  const [desktopOpen, setDesktopOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label="Open sidebar menu"
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-40 rounded-xl border border-slate-300 bg-white p-2 text-slate-700 shadow md:hidden"
      >
        <Menu className="h-5 w-5" aria-hidden />
      </button>

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-72 flex-col bg-gradient-to-b from-[#3f4ce6] via-[#6942ef] to-[#8b48f4] text-white shadow-2xl transition-transform duration-300 md:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="relative border-b border-white/20 px-4 pb-4 pt-4">
          <button
            type="button"
            aria-label="Close sidebar menu"
            onClick={() => setMobileOpen(false)}
            className="absolute right-3 top-3 rounded-lg p-1.5 text-white/90 transition hover:bg-white/15"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <SidebarLogo />
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          <NavLinks
            activeLabel={activeLabel}
            showLabels
            onNavigate={() => setMobileOpen(false)}
          />
        </nav>

        <div className="p-3">
          <LogOutButton showLabels />
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
        className={`fixed inset-y-0 left-0 z-30 hidden flex-col bg-gradient-to-b from-[#3f4ce6] via-[#6942ef] to-[#8b48f4] text-white transition-all duration-300 md:flex ${
          desktopOpen ? "w-72" : "w-20"
        }`}
      >
        <div className="relative px-3 pb-4 pt-3">
          <button
            type="button"
            aria-label={desktopOpen ? "Collapse sidebar" : "Expand sidebar"}
            onClick={() => setDesktopOpen((prev) => !prev)}
            className={`absolute top-3 rounded-lg p-1.5 text-white/90 transition hover:bg-white/15 ${
              desktopOpen ? "right-2" : "right-1"
            }`}
          >
            <ChevronLeft
              className={`h-5 w-5 transition-transform ${desktopOpen ? "" : "rotate-180"}`}
              aria-hidden
            />
          </button>

          <div className={`${desktopOpen ? "pt-6" : "pt-8"}`}>
            <SidebarLogo compact={!desktopOpen} />
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-2">
          <NavLinks activeLabel={activeLabel} showLabels={desktopOpen} />
        </nav>

        <div className="p-3">
          <LogOutButton showLabels={desktopOpen} />
        </div>
      </aside>
    </>
  );
}
