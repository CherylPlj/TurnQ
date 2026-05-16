"use client";

import { useState } from "react";
import { useAdminSystemSettings } from "@/src/contexts/AdminSystemSettingsContext";
import {
  DATE_FORMAT_OPTIONS,
  TIME_FORMAT_OPTIONS,
  TIMEZONE_OPTIONS,
  type AdminSystemSettings,
  type DateFormat,
  type TimeFormat,
} from "@/src/lib/admin-system-settings";

const maintenanceItems = [
  {
    title: "Database Backup",
    description: "Last Backup: May 14, 2025 02:00 AM",
    action: "Backup Now",
  },
  {
    title: "System Logs",
    description: "View and download system logs.",
    action: "View Logs",
  },
  {
    title: "Clear Cache",
    description: "Clear system cache to improve performance.",
    action: "Clear Cache",
  },
  {
    title: "System Update",
    description: "Update to improve system performance.",
    action: "System Update",
  },
];

const systemInfo = [
  { label: "Version", value: "v1.0.0" },
  { label: "System Status", value: "Online", isOnline: true },
  { label: "Last Updated", value: "May 14, 2025 10:30 AM" },
];

export default function SystemSettingsPage() {
  const { settings, saveSettings } = useAdminSystemSettings();
  const [draft, setDraft] = useState<AdminSystemSettings | null>(null);
  const [savedMessage, setSavedMessage] = useState("");
  const form = draft ?? settings;

  const updateForm = (updates: Partial<AdminSystemSettings>) => {
    setDraft({ ...form, ...updates });
  };

  const handleSave = () => {
    saveSettings(form);
    setDraft(null);
    setSavedMessage("Settings saved. Header clock updated.");
    window.setTimeout(() => setSavedMessage(""), 3000);
  };

  return (
    <section className="space-y-4">
      {savedMessage ? (
        <p className="rounded-lg bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
          {savedMessage}
        </p>
      ) : null}

      <section className="grid gap-4 xl:grid-cols-[1.4fr_1fr]">
        <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
          <h2 className="text-2xl font-bold text-slate-800">General Setting</h2>
          <form
            className="mt-4 space-y-4"
            onSubmit={(event) => {
              event.preventDefault();
              handleSave();
            }}
          >
            <label className="block">
              <span className="text-sm font-medium text-slate-700">System Name</span>
              <input
                type="text"
                defaultValue="TurnQ Queue Management System"
                className="mt-1 w-full rounded-lg border border-[#7460d8] px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#7c4dff]/25"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Organization Name</span>
              <input
                type="text"
                defaultValue="City Government Office"
                className="mt-1 w-full rounded-lg border border-[#7460d8] px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#7c4dff]/25"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Time Zone</span>
              <select
                value={form.timezone}
                onChange={(event) => updateForm({ timezone: event.target.value })}
                className="mt-1 w-full rounded-lg border border-[#7460d8] px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#7c4dff]/25"
              >
                {TIMEZONE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Date Format</span>
              <select
                value={form.dateFormat}
                onChange={(event) =>
                  updateForm({ dateFormat: event.target.value as DateFormat })
                }
                className="mt-1 w-full rounded-lg border border-[#7460d8] px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#7c4dff]/25"
              >
                {DATE_FORMAT_OPTIONS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Time Format</span>
              <select
                value={form.timeFormat}
                onChange={(event) =>
                  updateForm({ timeFormat: event.target.value as TimeFormat })
                }
                className="mt-1 w-full rounded-lg border border-[#7460d8] px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#7c4dff]/25"
              >
                {TIME_FORMAT_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-slate-700">Language</span>
              <select className="mt-1 w-full rounded-lg border border-[#7460d8] px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#7c4dff]/25">
                <option>English</option>
                <option>Filipino</option>
              </select>
            </label>
            <button
              type="submit"
              className="rounded-lg bg-gradient-to-r from-[#6d48d7] to-[#8748ea] px-6 py-2.5 font-semibold text-white"
            >
              Save Changes
            </button>
          </form>
        </article>

        <aside className="space-y-4">
          <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-2xl font-bold text-slate-800">Maintenances</h2>
            <div className="mt-4 divide-y divide-slate-200">
              {maintenanceItems.map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <div>
                    <p className="font-semibold text-slate-800">{item.title}</p>
                    <p className="text-sm text-slate-600">{item.description}</p>
                  </div>
                  <button
                    type="button"
                    className="shrink-0 rounded-lg bg-gradient-to-r from-[#6d48d7] to-[#8748ea] px-4 py-2 text-sm font-semibold text-white"
                  >
                    {item.action}
                  </button>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <h2 className="text-2xl font-bold text-slate-800">System Information</h2>
            <dl className="mt-4 space-y-3">
              {systemInfo.map((item) => (
                <div key={item.label} className="flex items-center justify-between">
                  <dt className="text-sm font-medium text-slate-600">{item.label}</dt>
                  <dd className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                    {item.isOnline ? (
                      <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    ) : null}
                    {item.value}
                  </dd>
                </div>
              ))}
            </dl>
          </article>
        </aside>
      </section>
    </section>
  );
}
