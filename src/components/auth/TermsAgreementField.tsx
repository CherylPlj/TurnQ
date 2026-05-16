"use client";

import { useState } from "react";
import TermsAndConditionsModal from "@/src/components/auth/TermsAndConditionsModal";

type TermsAgreementFieldProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  checkboxId?: string;
};

export default function TermsAgreementField({
  checked,
  onCheckedChange,
  checkboxId = "terms-agreement",
}: TermsAgreementFieldProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <label htmlFor={checkboxId} className="flex items-start gap-3 text-sm text-slate-600">
        <input
          id={checkboxId}
          type="checkbox"
          checked={checked}
          onChange={(event) => onCheckedChange(event.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-slate-300 text-[#4f46e5] focus:ring-[#4f46e5]"
        />
        <span>
          I agree with the{" "}
          <button
            type="button"
            onClick={(event) => {
              event.preventDefault();
              setIsModalOpen(true);
            }}
            className="font-semibold text-[#4f46e5] underline-offset-2 hover:text-[#4338ca] hover:underline"
          >
            terms and conditions
          </button>
          .
        </span>
      </label>

      <TermsAndConditionsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
