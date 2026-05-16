"use client";

import { Bell, ChevronDown, CircleHelp, Menu } from "lucide-react";
import Image from "next/image";
import { useLiveDateTime } from "@/src/hooks/use-live-datetime";

type AdminTopHeaderProps = {
  title: string;
  onMenuClick?: () => void;
};

const iconButtonClassName =
  "rounded-full p-1.5 text-slate-700 transition hover:bg-slate-100";

export default function AdminTopHeader({ title, onMenuClick }: AdminTopHeaderProps) {
  const { date, time } = useLiveDateTime();

  return (
    <header className="shrink-0 border-b border-slate-200 bg-white px-4 py-3 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          {onMenuClick ? (
            <button
              type="button"
              onClick={onMenuClick}
              className="rounded-lg border border-slate-200 p-2 text-slate-700 transition hover:bg-slate-50 lg:hidden"
              aria-label="Open navigation menu"
            >
              <Menu className="h-5 w-5" aria-hidden />
            </button>
          ) : null}
          <h1 className="truncate text-xl font-bold tracking-tight text-slate-900 sm:text-2xl lg:text-3xl">
            {title}
          </h1>
        </div>

        <div className="flex shrink-0 items-center gap-3 sm:gap-5 lg:gap-6">
          <div className="text-right leading-tight" suppressHydrationWarning>
            <p className="text-[11px] text-slate-400 sm:text-xs">{date}</p>
            <p className="text-base font-bold text-slate-600 sm:text-lg lg:text-xl">
              {time}
            </p>
          </div>

          <button type="button" className={iconButtonClassName} aria-label="Help">
            <CircleHelp className="h-6 w-6 stroke-[1.5]" aria-hidden />
          </button>

          <button
            type="button"
            className={`relative ${iconButtonClassName}`}
            aria-label="Notifications"
          >
            <Bell className="h-6 w-6 stroke-[1.5]" aria-hidden />
            <span
              className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"
              aria-hidden
            />
          </button>

          <button
            type="button"
            className="flex items-center gap-2 rounded-xl py-1 pl-1 pr-1 transition hover:bg-slate-50 sm:gap-3 sm:pr-2"
            aria-label="Open account menu"
          >
            <Image
              src="/user.png"
              alt="QC Admin profile"
              width={44}
              height={44}
              className="h-10 w-10 shrink-0 rounded-full object-cover sm:h-11 sm:w-11"
            />
            <span className="hidden min-w-0 text-left md:block">
              <span className="block truncate text-sm font-bold text-slate-800">
                QC Admin
              </span>
              <span className="block truncate text-xs text-slate-400">
                qcadmin@gmail.com
              </span>
            </span>
            <ChevronDown
              className="hidden h-4 w-4 shrink-0 text-slate-500 sm:block"
              aria-hidden
            />
          </button>
        </div>
      </div>
    </header>
  );
}
