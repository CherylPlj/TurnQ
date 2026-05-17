import type { LucideIcon } from "lucide-react";
import { ShieldUser, User, UserStar } from "lucide-react";

const adminAccounts = [
  { name: "Admin User", email: "admin.turnq@email.com", role: "Super Admin", status: "Active" },
  { name: "Manager 1", email: "manager.turnq@email.com", role: "Administration", status: "Active" },
  { name: "Staff One", email: "staff.one@email.com", role: "Staff", status: "Active" },
  { name: "Staff Two", email: "staff.two@email.com", role: "Staff", status: "Active" },
];

const roles: {
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Super Admin",
    description: "Full access to all modules and settings.",
    icon: ShieldUser,
  },
  {
    title: "Administrator",
    description: "Manage queue, users, services and reports",
    icon: UserStar,
  },
  {
    title: "Staff",
    description: "Operate queue and view basic reports",
    icon: User,
  },
];

function EditIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 6h18" />
      <path d="M8 6V4h8v2" />
      <path d="M19 6l-1 14H6L5 6" />
    </svg>
  );
}

export default function UserManagementPage() {
  return (
    <section className="space-y-4">
      <header className="sticky top-0 z-20 -mx-8 border-b border-slate-200 bg-white/95 px-8 py-4 backdrop-blur">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-black tracking-tight text-slate-800">
            User Management
          </h1>
          <div className="text-right">
            <p className="text-sm text-slate-400">Apr 30, 2026</p>
            <p className="text-2xl font-bold text-slate-700">10:00 AM</p>
          </div>
        </div>
      </header>

      <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">Admin Accounts</h2>
          <button
            type="button"
            className="rounded-lg bg-gradient-to-r from-[#6d48d7] to-[#8748ea] px-4 py-2 text-sm font-semibold text-white"
          >
            + Add New User
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200">
          <header className="grid grid-cols-[1fr_1.3fr_0.85fr_0.55fr_0.4fr] bg-[#f7f7fb] px-4 py-2 text-sm font-semibold text-slate-700">
            <p>Name</p>
            <p>Email</p>
            <p>Role</p>
            <p>Status</p>
            <p>Action</p>
          </header>
          <div className="divide-y divide-slate-100">
            {adminAccounts.map((account) => (
              <div
                key={account.email}
                className="grid grid-cols-[1fr_1.3fr_0.85fr_0.55fr_0.4fr] items-center px-4 py-3 text-sm text-slate-700"
              >
                <p>{account.name}</p>
                <p>{account.email}</p>
                <p>{account.role}</p>
                <p>{account.status}</p>
                <div className="flex items-center gap-2">
                  <button type="button" className="text-slate-700">
                    <EditIcon />
                  </button>
                  <button type="button" className="text-rose-400">
                    <TrashIcon />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>

      <article className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200 xl:max-w-[64%]">
        <h2 className="text-2xl font-bold text-slate-800">Roles & Permissions</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {roles.map((role) => {
            const Icon = role.icon;

            return (
              <div
                key={role.title}
                className="rounded-2xl border-2 border-[#5B4FD7] px-4 py-4 shadow-[0_3px_0_0_rgba(91,79,215,0.2)]"
              >
                <div className="flex items-start gap-3">
                  <Icon className="h-8 w-8 shrink-0 text-[#5B4FD7]" aria-hidden />
                  <div>
                    <p className="text-xl font-bold text-slate-800">{role.title}</p>
                    <p className="mt-1 text-sm text-slate-600">{role.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </article>
    </section>
  );
}
