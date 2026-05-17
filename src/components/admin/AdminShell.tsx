"use client";

import type { LucideIcon } from "lucide-react";
import {
  Accessibility,
  ChartNoAxesCombined,
  HeartHandshake,
  LayoutDashboard,
  LogOutIcon,
  MonitorCog,
  Settings,
  SquareKanban,
  UserRoundCog,
} from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AdminTopHeader from "@/src/components/admin/AdminTopHeader";
import { useAdminAuth } from "@/src/contexts/AdminAuthContext";
import { useMediaQuery } from "@/src/hooks/use-media-query";

type NavItem = {
  label: string;
  href: string;
  icon: LucideIcon;
};

const navItems: NavItem[] = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Queue Management", href: "/admin/queue-management", icon: SquareKanban },
  { label: "Queue Monitor", href: "/admin/queue-monitor", icon: MonitorCog },
  { label: "Priority Management", href: "/admin/priority-management", icon: Accessibility },
  { label: "Analytics & Reports", href: "/admin/analytics", icon: ChartNoAxesCombined },
  { label: "Services", href: "/admin/services", icon: HeartHandshake },
  { label: "User Management", href: "/admin/users", icon: UserRoundCog },
  { label: "System Settings", href: "/admin/settings", icon: Settings },
];

const iconClassName = "h-5 w-5 shrink-0";
const COLLAPSED_WIDTH = 72;
const EXPANDED_WIDTH = 280;

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

export default function AdminShell({ children }: { children: ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { logout } = useAdminAuth();

  const pageTitle =
    navItems.find((item) => item.href === pathname)?.label ?? "Admin";

  const sidebarWidth = useMemo(
    () => (isDesktop ? (isExpanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH) : EXPANDED_WIDTH),
    [isDesktop, isExpanded],
  );

  const showLabels = isDesktop ? isExpanded : true;

  useEffect(() => {
    if (isDesktop) {
      return;
    }

    document.body.style.overflow = isMobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDesktop, isMobileOpen]);

  return (
    <div className="min-h-screen bg-[#ececec] text-slate-900">
      {!isDesktop && isMobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          aria-label="Close navigation menu"
          onClick={() => setIsMobileOpen(false)}
        />
      ) : null}

      <aside
        className={`fixed left-0 top-0 z-50 h-screen overflow-hidden border-r border-white/20 bg-gradient-to-b from-[#4f46e5] to-[#7c3aed] text-white shadow-xl transition-transform duration-300 lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ width: sidebarWidth }}
      >
        <div className="flex h-full flex-col">
          <div className="relative px-3 pb-4 pt-3">
            <button
              type="button"
              onClick={() => {
                if (isDesktop) {
                  setIsExpanded((prev) => !prev);
                } else {
                  setIsMobileOpen(false);
                }
              }}
              className={`absolute top-3 rounded-lg p-1.5 text-indigo-100 transition hover:bg-white/15 ${
                showLabels ? "right-2" : "right-1"
              }`}
              aria-label={
                isDesktop
                  ? isExpanded
                    ? "Collapse sidebar"
                    : "Expand sidebar"
                  : "Close navigation menu"
              }
            >
              <ChevronIcon isOpen={isDesktop ? isExpanded : isMobileOpen} />
            </button>

            {showLabels ? (
              <div className="flex flex-col items-center pt-6">
                <Image
                  src="/turnqLogo.png"
                  alt="TurnQ logo"
                  width={72}
                  height={72}
                  className="h-14 w-14 object-contain sm:h-[72px] sm:w-[72px]"
                  priority
                />
                <p className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                  TurnQ
                </p>
              </div>
            ) : (
              <div className="flex justify-center pt-8">
                <Image
                  src="/turnqLogo.png"
                  alt="TurnQ logo"
                  width={44}
                  height={44}
                  className="h-11 w-11 object-contain"
                  priority
                />
              </div>
            )}
          </div>

          <nav className="mt-3 flex-1 space-y-1 overflow-y-auto px-2">
            {navItems.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.label}
                  href={item.href}
                  title={!showLabels ? item.label : undefined}
                  onClick={() => {
                    if (!isDesktop) {
                      setIsMobileOpen(false);
                    }
                  }}
                  className={`flex items-center rounded-xl py-3 text-sm font-semibold transition ${
                    showLabels ? "gap-3 px-3" : "justify-center px-2"
                  } ${
                    pathname === item.href
                      ? "bg-white/20 text-white"
                      : "text-indigo-50 hover:bg-white/15"
                  }`}
                >
                  <Icon className={iconClassName} aria-hidden />
                  <span
                    className={`${
                      showLabels ? "opacity-100" : "sr-only"
                    } whitespace-nowrap transition-opacity duration-150`}
                  >
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="p-3">
            <button
              type="button"
              title={!showLabels ? "Log Out" : undefined}
              onClick={() => {
                logout();
                if (!isDesktop) {
                  setIsMobileOpen(false);
                }
              }}
              className={`flex w-full items-center rounded-xl py-3 text-sm font-semibold text-indigo-50 transition hover:bg-white/15 ${
                showLabels ? "gap-3 px-3" : "justify-center px-2"
              }`}
            >
              <LogOutIcon className={iconClassName} aria-hidden />
              <span
                className={`${
                  showLabels ? "opacity-100" : "sr-only"
                } whitespace-nowrap transition-opacity duration-150`}
              >
                Log Out
              </span>
            </button>
          </div>
          </div>
      </aside>

      <div
        className="flex min-h-screen flex-col transition-[margin-left] duration-300 lg:min-h-0 lg:h-screen"
        style={{ marginLeft: isDesktop ? sidebarWidth : 0 }}
      >
        <AdminTopHeader
          title={pageTitle}
          onMenuClick={() => setIsMobileOpen(true)}
        />
        <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[1600px] min-w-0">{children}</div>
        </main>
      </div>
    </div>
  );
}
