"use client";

type ClientChatbotModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const quickQuestions = [
  "How to join a queue?",
  "When is my turn?",
  "Mahal pa ba niya ako?",
  "How to scan a QR Code?",
];

export default function ClientChatbotModal({
  isOpen,
  onClose,
}: ClientChatbotModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/35 p-3">
      <div className="relative h-[38rem] w-full max-w-md rounded-[2.25rem] border-2 border-[#6b4ef0] bg-[#f6f6fa] p-5 shadow-xl">
        <div className="mb-6 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl border-2 border-[#6b4ef0] p-1 text-xl text-[#6b4ef0]">
              Q
            </div>
            <h2 className="text-4xl font-extrabold text-slate-900">
              <span className="text-[#6b4ef0]">TurnQ</span> Chatbot
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-2 py-1 text-4xl leading-none text-slate-800 hover:bg-slate-200"
            aria-label="Close chatbot"
          >
            ×
          </button>
        </div>

        <div className="absolute bottom-28 left-5 right-5 rounded-2xl border border-[#8f76ff] bg-white px-4 py-3 shadow">
          <ul className="space-y-3">
            {quickQuestions.map((question) => (
              <li key={question}>
                <button
                  type="button"
                  className="flex w-full items-center justify-between text-left text-lg text-slate-900 hover:text-[#6b4ef0]"
                >
                  <span>{question}</span>
                  <span className="text-2xl text-[#6b4ef0]">›</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="absolute bottom-5 left-5 right-5 flex items-center gap-3">
          <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#3f4ce6] to-[#8b48f4]" />
          <input
            type="text"
            placeholder="Type question here..."
            className="flex-1 rounded-xl border-2 border-[#6b4ef0] bg-white px-4 py-3 text-base outline-none ring-indigo-200 focus:ring-2"
          />
          <button
            type="button"
            className="rounded-lg px-2 text-4xl text-slate-800 transition hover:text-[#6b4ef0]"
            aria-label="Send message"
          >
            ⌲
          </button>
        </div>
      </div>
    </div>
  );
}
