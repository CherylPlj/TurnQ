"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ClientNotificationButton from "../../../components/ClientNotificationButton";
import ClientSidebar from "../../../components/ClientSidebar";

type BarcodeDetectorWithDetect = {
  detect: (source: ImageBitmapSource) => Promise<Array<{ rawValue?: string }>>;
};

declare global {
  interface Window {
    BarcodeDetector?: new (options?: { formats?: string[] }) => BarcodeDetectorWithDetect;
  }
}

const SERVICES = ["Business Permit", "Document Request", "Payment"];

const TIME_SLOTS = [
  "8:00 AM",
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "1:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

type Step = "join" | "book";

export default function JoinQueuePage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const frameRef = useRef<number | null>(null);
  const detectorRef = useRef<BarcodeDetectorWithDetect | null>(null);

  const [step, setStep] = useState<Step>("join");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [manualCode, setManualCode] = useState("");
  const [queueCode, setQueueCode] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [selectedService, setSelectedService] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");

  const stopScan = () => {
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    setIsScanning(false);
  };

  const detectCode = async () => {
    if (!videoRef.current || !detectorRef.current || videoRef.current.readyState < 2) {
      frameRef.current = requestAnimationFrame(detectCode);
      return;
    }

    try {
      const barcodes = await detectorRef.current.detect(videoRef.current);
      if (barcodes.length > 0 && barcodes[0].rawValue) {
        setScanResult(barcodes[0].rawValue);
        setManualCode("");
        setError(null);
        stopScan();
        return;
      }
    } catch {
      setError("Unable to read QR in this frame. Try moving the camera closer.");
    }

    frameRef.current = requestAnimationFrame(detectCode);
  };

  const startScan = async () => {
    setError(null);

    if (!window.BarcodeDetector) {
      setError("QR scanning is not supported in this browser. Please use Chrome/Edge mobile.");
      return;
    }

    try {
      detectorRef.current = new window.BarcodeDetector({ formats: ["qr_code"] });

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" } },
      });
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }

      setIsScanning(true);
      frameRef.current = requestAnimationFrame(detectCode);
    } catch {
      setError("Camera access was denied or unavailable. Please allow camera permission.");
      stopScan();
    }
  };

  const handleJoinSubmit = () => {
    const code = scanResult ?? manualCode.trim();
    if (!code) {
      setError("Please scan a QR code or enter a queue code.");
      return;
    }

    setQueueCode(code);
    setError(null);
    stopScan();
    setStep("book");
  };

  const handleBookCancel = () => {
    setSelectedService("");
    setSelectedDate("");
    setSelectedTime("");
    setError(null);
    setStep("join");
  };

  const handleBookSubmit = () => {
    if (!selectedService) {
      setError("Please choose a service.");
      return;
    }
    if (!selectedDate) {
      setError("Please select a date.");
      return;
    }
    if (!selectedTime) {
      setError("Please select a time slot.");
      return;
    }

    const nextNumber = Math.floor(10 + Math.random() * 89);
    const generatedQueueNumber = `A - ${nextNumber}`;

    router.push(
      `/client/queue-status?queue=${encodeURIComponent(generatedQueueNumber)}&position=7&service=${encodeURIComponent(selectedService)}`,
    );
  };

  useEffect(() => {
    return () => stopScan();
  }, []);

  useEffect(() => {
    if (step === "book") {
      stopScan();
    }
  }, [step]);

  const resolvedCode = scanResult ?? (manualCode.trim() || null);

  return (
    <div className="min-h-screen bg-[#f1f1f4] text-slate-900">
      <ClientSidebar activeLabel="Join Queue" />

      <main className="px-4 pb-10 pt-20 md:ml-20 md:px-8 md:pt-8">
        <div className="mx-auto max-w-lg rounded-3xl bg-white p-6 shadow">
          <div className="mb-6 flex items-center justify-between">
            <button
              type="button"
              className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-2xl shadow md:hidden"
              aria-hidden
            >
              ☰
            </button>
            <h1 className="flex-1 text-center text-2xl font-black">
              {step === "join" ? "Join Appointment" : "Book Appointment"}
            </h1>
            <ClientNotificationButton />
          </div>

          {error ? (
            <div className="mb-4 rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          {step === "join" ? (
            <>
              <section className="space-y-4">
                <h2 className="text-lg font-bold">Scanning QR Code</h2>

                <div className="relative flex h-56 items-center justify-center rounded-2xl bg-[#f8f5ff] p-4">
                  {isScanning ? (
                    <video
                      ref={videoRef}
                      className="h-full w-full rounded-xl object-cover"
                      playsInline
                      muted
                    />
                  ) : (
                    <div className="relative h-full w-full">
                      <div className="absolute left-6 top-4 h-12 w-12 rounded-tl-2xl border-l-4 border-t-4 border-[#7c4be9]" />
                      <div className="absolute right-6 top-4 h-12 w-12 rounded-tr-2xl border-r-4 border-t-4 border-[#7c4be9]" />
                      <div className="absolute bottom-4 left-6 h-12 w-12 rounded-bl-2xl border-b-4 border-l-4 border-[#7c4be9]" />
                      <div className="absolute bottom-4 right-6 h-12 w-12 rounded-br-2xl border-b-4 border-r-4 border-[#7c4be9]" />
                      <div className="absolute left-1/2 top-1/2 h-1 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7c4be9]" />
                    </div>
                  )}
                </div>

                {scanResult ? (
                  <p className="text-center text-sm text-[#4f2bb7]">
                    Scanned: <span className="font-semibold">{scanResult}</span>
                  </p>
                ) : null}

                {!isScanning ? (
                  <button
                    type="button"
                    onClick={startScan}
                    className="w-full rounded-full bg-[#7c4be9] px-8 py-3 text-lg font-semibold text-white transition hover:bg-[#6b3fcd]"
                  >
                    Scan Now
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={stopScan}
                    className="w-full rounded-full bg-slate-700 px-8 py-3 text-lg font-semibold text-white transition hover:bg-slate-800"
                  >
                    Stop Scan
                  </button>
                )}
              </section>

              <div className="my-8 flex items-center gap-3">
                <div className="h-px flex-1 bg-slate-300" />
                <span className="text-sm text-slate-500">or with</span>
                <div className="h-px flex-1 bg-slate-300" />
              </div>

              <section className="space-y-4">
                <h2 className="text-lg font-bold">Enter Code</h2>
                <input
                  type="text"
                  value={manualCode}
                  onChange={(e) => {
                    setManualCode(e.target.value);
                    if (e.target.value.trim()) {
                      setScanResult(null);
                    }
                    setError(null);
                  }}
                  placeholder="Enter Queue Code"
                  className="w-full rounded-2xl border border-slate-200 bg-[#f1f1f4] px-4 py-3 text-base text-slate-900 outline-none ring-[#7c4be9]/30 transition placeholder:text-slate-400 focus:ring-2"
                />
                <button
                  type="button"
                  onClick={handleJoinSubmit}
                  disabled={!resolvedCode}
                  className="w-full rounded-full bg-[#7c4be9] px-8 py-3 text-lg font-semibold text-white transition hover:bg-[#6b3fcd] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Submit
                </button>
              </section>
            </>
          ) : (
            <section className="space-y-6">
              {queueCode ? (
                <p className="rounded-2xl border border-[#7c4be9]/30 bg-[#f4efff] px-4 py-2 text-center text-sm text-[#4f2bb7]">
                  Queue code: <span className="font-semibold">{queueCode}</span>
                </p>
              ) : null}

              <div className="space-y-2">
                <label htmlFor="service" className="text-base font-bold">
                  Select Service
                </label>
                <div className="relative">
                  <select
                    id="service"
                    value={selectedService}
                    onChange={(e) => {
                      setSelectedService(e.target.value);
                      setError(null);
                    }}
                    className="w-full appearance-none rounded-2xl border-2 border-[#7c4be9] bg-white px-4 py-3 pr-10 text-base text-slate-900 outline-none"
                  >
                    <option value="">Choose a Service</option>
                    {SERVICES.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-500">
                    ▾
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="date" className="text-base font-bold">
                  Select a Date
                </label>
                <div className="relative">
                  <input
                    id="date"
                    type="date"
                    value={selectedDate}
                    onChange={(e) => {
                      setSelectedDate(e.target.value);
                      setError(null);
                    }}
                    className="w-full rounded-2xl border-2 border-[#7c4be9] bg-white px-4 py-3 pr-10 text-base text-slate-900 outline-none [color-scheme:light]"
                  />
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-lg">
                    📅
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-base font-bold">Select a Time Slot</p>
                <div className="grid grid-cols-3 gap-2">
                  {TIME_SLOTS.map((slot) => {
                    const isSelected = selectedTime === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => {
                          setSelectedTime(slot);
                          setError(null);
                        }}
                        className={`rounded-xl border-2 px-2 py-2.5 text-sm font-medium transition ${
                          isSelected
                            ? "border-[#7c4be9] bg-[#f4efff] text-[#4f2bb7]"
                            : "border-[#7c4be9] bg-white text-slate-800 hover:bg-[#f8f5ff]"
                        }`}
                      >
                        {slot}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex flex-col gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleBookSubmit}
                  className="w-full rounded-full bg-[#7c4be9] px-8 py-3 text-lg font-semibold text-white transition hover:bg-[#6b3fcd]"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={handleBookCancel}
                  className="w-full rounded-full border-2 border-[#7c4be9] bg-white px-8 py-3 text-lg font-semibold text-[#7c4be9] transition hover:bg-[#f4efff]"
                >
                  Cancel
                </button>
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}
