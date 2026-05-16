"use client";

import { useEffect } from "react";

type TermsAndConditionsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    body: "By creating a TurnQ account, you agree to these Terms and Conditions and our use of your information as described below. If you do not agree, do not register or use the service.",
  },
  {
    title: "2. Service Description",
    body: "TurnQ is a digital queue management platform that lets you join queues, track your position, receive notifications, and complete transactions at participating establishments.",
  },
  {
    title: "3. Account Responsibilities",
    body: "You are responsible for keeping your login credentials secure and for all activity under your account. You must provide accurate information and notify us promptly of any unauthorized use.",
  },
  {
    title: "4. Acceptable Use",
    body: "You may not misuse TurnQ by attempting to disrupt queues, impersonate others, submit false priority claims, scrape data, or use the service for unlawful purposes.",
  },
  {
    title: "5. Queue Participation",
    body: "Queue positions, wait times, and notifications are estimates and may change based on operational needs, including priority rules for eligible groups. Missing your turn may result in removal from the queue.",
  },
  {
    title: "6. Privacy",
    body: "We collect account and queue-related information to operate the service, send notifications, and improve reliability. Contact your establishment or TurnQ support for privacy-related requests.",
  },
  {
    title: "7. Limitation of Liability",
    body: 'TurnQ is provided on an "as is" basis. To the fullest extent permitted by law, Kardesia Solutions, Inc. is not liable for indirect, incidental, or consequential damages arising from use of the platform.',
  },
  {
    title: "8. Changes and Contact",
    body: "We may update these terms from time to time. Continued use after changes constitutes acceptance. For questions, contact Kardesia Solutions, Inc. through your participating establishment or official TurnQ support channels.",
  },
];

export default function TermsAndConditionsModal({
  isOpen,
  onClose,
}: TermsAndConditionsModalProps) {
  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="terms-modal-title"
    >
      <button
        type="button"
        className="absolute inset-0 cursor-default"
        aria-label="Close terms and conditions"
        onClick={onClose}
      />

      <div
        role="document"
        className="relative z-10 flex max-h-[min(85vh,720px)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl ring-1 ring-slate-200"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="shrink-0 border-b border-slate-200 bg-gradient-to-r from-[#4f46e5] to-[#7c3aed] px-6 py-5 text-white">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-indigo-100">TurnQ</p>
              <h2 id="terms-modal-title" className="text-2xl font-bold tracking-tight">
                Terms and Conditions
              </h2>
              <p className="mt-1 text-sm text-indigo-100">Last updated: May 16, 2026</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="rounded-full px-2 py-1 text-3xl leading-none text-white/90 transition hover:bg-white/15"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="space-y-5 text-sm leading-relaxed text-slate-700">
            {sections.map((section) => (
              <section key={section.title}>
                <h3 className="mb-1.5 font-semibold text-slate-900">{section.title}</h3>
                <p>{section.body}</p>
              </section>
            ))}
          </div>
        </div>

        <footer className="shrink-0 border-t border-slate-200 bg-slate-50 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="w-full rounded-full bg-[#4f46e5] py-3 text-sm font-semibold text-white transition hover:bg-[#4338ca]"
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}
