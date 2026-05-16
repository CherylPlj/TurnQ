export type DateFormat = "MM/DD/YYYY" | "DD/MM/YYYY" | "YYYY-MM-DD";
export type TimeFormat = "12" | "24";

export type AdminSystemSettings = {
  timezone: string;
  dateFormat: DateFormat;
  timeFormat: TimeFormat;
};

export const ADMIN_SYSTEM_SETTINGS_STORAGE_KEY = "turnq-admin-system-settings";

export const DEFAULT_ADMIN_SYSTEM_SETTINGS: AdminSystemSettings = {
  timezone: "Asia/Manila",
  dateFormat: "MM/DD/YYYY",
  timeFormat: "12",
};

export const TIMEZONE_OPTIONS = [
  { label: "(GMT+8) Asia, Manila", value: "Asia/Manila" },
  { label: "(GMT+0) UTC", value: "UTC" },
  { label: "(GMT-5) America, New York", value: "America/New_York" },
] as const;

export const DATE_FORMAT_OPTIONS: DateFormat[] = [
  "MM/DD/YYYY",
  "DD/MM/YYYY",
  "YYYY-MM-DD",
];

export const TIME_FORMAT_OPTIONS = [
  { label: "12 Hours (AM/PM)", value: "12" as const },
  { label: "24 Hours", value: "24" as const },
];

function dateLocale(dateFormat: DateFormat) {
  if (dateFormat === "DD/MM/YYYY") {
    return "en-GB";
  }
  if (dateFormat === "YYYY-MM-DD") {
    return "sv-SE";
  }
  return "en-US";
}

export function formatAdminDate(
  date: Date,
  settings: AdminSystemSettings,
): string {
  return new Intl.DateTimeFormat(dateLocale(settings.dateFormat), {
    timeZone: settings.timezone,
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export function formatAdminTime(
  date: Date,
  settings: AdminSystemSettings,
): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: settings.timezone,
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: settings.timeFormat === "12",
  }).format(date);
}

let cachedSettings: AdminSystemSettings = DEFAULT_ADMIN_SYSTEM_SETTINGS;
let cachedRaw: string | null = null;

function parseStoredSettings(raw: string): AdminSystemSettings {
  const parsed = JSON.parse(raw) as Partial<AdminSystemSettings>;
  return {
    ...DEFAULT_ADMIN_SYSTEM_SETTINGS,
    ...parsed,
  };
}

function settingsAreEqual(a: AdminSystemSettings, b: AdminSystemSettings) {
  return (
    a.timezone === b.timezone &&
    a.dateFormat === b.dateFormat &&
    a.timeFormat === b.timeFormat
  );
}

export function loadAdminSystemSettings(): AdminSystemSettings {
  if (typeof window === "undefined") {
    return DEFAULT_ADMIN_SYSTEM_SETTINGS;
  }

  try {
    const stored = localStorage.getItem(ADMIN_SYSTEM_SETTINGS_STORAGE_KEY);

    if (stored === cachedRaw) {
      return cachedSettings;
    }

    if (!stored) {
      cachedRaw = null;
      cachedSettings = DEFAULT_ADMIN_SYSTEM_SETTINGS;
      return cachedSettings;
    }

    const next = parseStoredSettings(stored);
    cachedRaw = stored;

    if (settingsAreEqual(next, cachedSettings)) {
      return cachedSettings;
    }

    cachedSettings = next;
    return cachedSettings;
  } catch {
    cachedRaw = null;
    cachedSettings = DEFAULT_ADMIN_SYSTEM_SETTINGS;
    return cachedSettings;
  }
}

export function saveAdminSystemSettings(settings: AdminSystemSettings) {
  const serialized = JSON.stringify(settings);

  localStorage.setItem(ADMIN_SYSTEM_SETTINGS_STORAGE_KEY, serialized);
  cachedRaw = serialized;
  cachedSettings = settings;

  window.dispatchEvent(new CustomEvent("turnq-admin-settings-updated"));
}
