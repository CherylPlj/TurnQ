"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ClientSidebar from "../../../components/ClientSidebar";

export default function PriorityVerificationPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handlePickImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) {
      return;
    }

    setFileName(selectedFile.name);
    router.push("/client/join-queue");
  };

  return (
    <div className="min-h-screen bg-[#f1f1f4] text-slate-900">
      <ClientSidebar activeLabel="Join Queue" />

      <main className="px-4 pb-10 pt-20 md:ml-20 md:px-8 md:pt-8">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-6 shadow sm:p-10">
          <h1 className="text-5xl font-black leading-tight">
            Please take a photo of ONE of the following:
          </h1>

          <ul className="mt-8 space-y-4 text-3xl leading-10 text-slate-900">
            <li className="flex gap-3">
              <span className="text-[#7c4be9]">ⓘ</span>
              <span>PWD ID (if you are a PWD)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#7c4be9]">ⓘ</span>
              <span>Senior Citizen ID (if you are a Senior Citizen)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-[#7c4be9]">ⓘ</span>
              <span>Proof of pregnancy (prenatal record / ultrasound / medical certificate)</span>
            </li>
          </ul>

          <p className="mt-10 text-2xl leading-9 text-slate-800">
            Make sure the photo is complete, clear, and readable.
            <br />
            If the photo is blurry, please resubmit.
          </p>

          <div className="mt-10 flex flex-col items-center gap-5">
            <button
              type="button"
              onClick={handlePickImage}
              className="flex h-36 w-52 items-center justify-center rounded-3xl border-4 border-[#7c4be9] text-7xl text-[#7c4be9] transition hover:bg-[#f5efff]"
              aria-label="Take priority verification photo"
            >
              📷
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              capture="environment"
              className="hidden"
              onChange={handleImageChange}
            />

            <button
              type="button"
              onClick={handlePickImage}
              className="w-full max-w-sm rounded-full bg-[#7c4be9] px-8 py-3 text-2xl font-semibold text-white transition hover:bg-[#6d41d0]"
            >
              Take Picture Now
            </button>

            {fileName ? (
              <p className="text-lg text-[#6d41d0]">Selected file: {fileName}</p>
            ) : null}
          </div>

          <p className="mt-12 text-xl leading-8 text-slate-700">
            This photo is for confirmation only and will be used to verify your
            priority status.
          </p>
        </div>
      </main>
    </div>
  );
}
