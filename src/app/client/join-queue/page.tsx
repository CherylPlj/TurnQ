"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import ClientSidebar from "../../../components/ClientSidebar";

type BarcodeDetectorWithDetect = {
  detect: (source: ImageBitmapSource) => Promise<Array<{ rawValue?: string }>>;
};

declare global {
  interface Window {
    BarcodeDetector?: new (options?: { formats?: string[] }) => BarcodeDetectorWithDetect;
  }
}

export default function JoinQueuePage() {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const frameRef = useRef<number | null>(null);
  const detectorRef = useRef<BarcodeDetectorWithDetect | null>(null);

  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [queueNumber, setQueueNumber] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
    setScanResult(null);
    setQueueNumber(null);

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

  const handleGetQueueNumber = () => {
    if (!scanResult) {
      setError("Please scan a QR code first.");
      return;
    }

    const nextNumber = Math.floor(10 + Math.random() * 89);
    const generatedQueueNumber = `A - ${nextNumber}`;
    setQueueNumber(generatedQueueNumber);
    setError(null);
    router.push(
      `/client/queue-status?queue=${encodeURIComponent(generatedQueueNumber)}&position=7&service=${encodeURIComponent("Business Permit")}`,
    );
  };

  useEffect(() => {
    return () => stopScan();
  }, []);

  return (
    <div className="min-h-screen bg-[#f1f1f4] text-slate-900">
      <ClientSidebar activeLabel="Join Queue" />

      <main className="px-4 pb-10 pt-20 md:ml-20 md:px-8 md:pt-8">
        <div className="mx-auto max-w-4xl rounded-3xl bg-white p-6 shadow">
          <div className="mb-8 flex items-center justify-between">
            <button className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-2xl shadow md:hidden">
              ☰
            </button>
            <h1 className="text-4xl font-black">Join Queue</h1>
            <button className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-2xl shadow">
              🔔
            </button>
          </div>

          <section className="mb-10">
            <div className="relative mb-2 grid grid-cols-3 items-center text-center">
              <div className="absolute left-[16.66%] right-[16.66%] top-5 h-1 -translate-y-1/2 rounded-full bg-[#7c4be9]" />
              {[
                { step: 1, label: "Select Service" },
                { step: 2, label: "Scan QR" },
                { step: 3, label: "Get Queue No." },
              ].map((item) => (
                <div key={item.step} className="relative z-10">
                  <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#7c4be9] text-base font-bold text-white">
                    {item.step}
                  </div>
                  <p className="text-sm font-medium text-slate-700">{item.label}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <div>
              <h2 className="text-4xl font-bold">Scanning QR Code</h2>
              <p className="mt-2 text-xl leading-8 text-slate-700">
                Click the &quot;Scan Now&quot; button, aim your camera at the QR code,
                and scan.
              </p>
            </div>

            <div className="relative flex h-72 items-center justify-center rounded-3xl bg-[#f8f5ff] p-5 sm:h-80">
              {isScanning ? (
                <video
                  ref={videoRef}
                  className="h-full w-full rounded-2xl object-cover"
                  playsInline
                  muted
                />
              ) : (
                <div className="relative h-full w-full">
                  <div className="absolute left-10 top-8 h-16 w-16 rounded-tl-3xl border-l-8 border-t-8 border-[#7c4be9]" />
                  <div className="absolute right-10 top-8 h-16 w-16 rounded-tr-3xl border-r-8 border-t-8 border-[#7c4be9]" />
                  <div className="absolute bottom-8 left-10 h-16 w-16 rounded-bl-3xl border-b-8 border-l-8 border-[#7c4be9]" />
                  <div className="absolute bottom-8 right-10 h-16 w-16 rounded-br-3xl border-b-8 border-r-8 border-[#7c4be9]" />
                  <div className="absolute left-1/2 top-1/2 h-3 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7c4be9]" />
                </div>
              )}
            </div>

            {scanResult ? (
              <div className="rounded-2xl border border-[#7c4be9] bg-[#f4efff] px-4 py-3 text-base text-[#4f2bb7]">
                QR Scanned: <span className="font-semibold">{scanResult}</span>
              </div>
            ) : null}

            {queueNumber ? (
              <div className="rounded-2xl border border-emerald-300 bg-emerald-50 px-4 py-3 text-emerald-700">
                Queue number generated: <span className="font-bold">{queueNumber}</span>
              </div>
            ) : null}

            {error ? (
              <div className="rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-red-700">
                {error}
              </div>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row">
              {!isScanning ? (
                <button
                  onClick={startScan}
                  className="rounded-full bg-[#7c4be9] px-10 py-3 text-xl font-semibold text-white transition hover:bg-[#6b3fcd]"
                >
                  Scan Now
                </button>
              ) : (
                <button
                  onClick={stopScan}
                  className="rounded-full bg-slate-700 px-10 py-3 text-xl font-semibold text-white transition hover:bg-slate-800"
                >
                  Stop Scan
                </button>
              )}

              <button
                onClick={handleGetQueueNumber}
                className="rounded-full border-2 border-[#7c4be9] px-10 py-3 text-xl font-semibold text-[#7c4be9] transition hover:bg-[#f4efff]"
              >
                Get Queue No.
              </button>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
