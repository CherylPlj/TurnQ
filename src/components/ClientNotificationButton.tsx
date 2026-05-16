import { Bell } from "lucide-react";

type ClientNotificationButtonProps = {
  className?: string;
};

export default function ClientNotificationButton({
  className = "rounded-xl border border-slate-300 bg-white p-2 text-slate-700 shadow transition hover:bg-slate-50",
}: ClientNotificationButtonProps) {
  return (
    <button type="button" className={className} aria-label="Notifications">
      <Bell className="h-6 w-6 stroke-[1.5]" aria-hidden />
    </button>
  );
}
