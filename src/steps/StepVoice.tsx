import { useState, useEffect } from "react";
import ProvenanceTag from "../components/ProvenanceTag";

interface Props { onNext: () => void; onBack: () => void }

const SLOT_FILL = {
  title_hi: "बनारसी सिल्क साड़ी — कढुआ तकनीक",
  title_en: "Banarasi Silk Saree — Kadhua Weave",
  description_hi:
    "काशी की खड्डी पर बुनी यह साड़ी शुद्ध रेशम और असली जरी से तैयार की गई है। कढुआ तकनीक में हर बूटी को अलग से बुना जाता है, जिसमें तीन सप्ताह का समय लगता है।",
  description_en:
    "Woven on a handloom in Kashi, this saree is crafted from pure mulberry silk with real zari. Each motif in the kadhua technique is woven individually — three weeks of continuous work by one weaver.",
  attributes: {
    Material: "Pure mulberry silk + real zari",
    Technique: "Kadhua hand-weaving",
    Cluster: "Varanasi Silk, UP",
    Dimensions: "6.3 m × 1.1 m",
    Colour: "Wheat, gold, brown",
    Occasion: "Wedding / formal",
    "Time to make": "21 days",
    "GI tag": "Yes — Banarasi Brocades GI",
    "Craft family": "Woven textile",
  },
};

type RecordState = "idle" | "recording" | "processing" | "done";

export default function StepVoice({ onNext, onBack }: Props) {
  const [state, setState] = useState<RecordState>("idle");
  const [seconds, setSeconds] = useState(0);
  const [confirmPlayed, setConfirmPlayed] = useState(false);
  const [editSlot, setEditSlot] = useState<string | null>(null);

  useEffect(() => {
    if (state !== "recording") { setSeconds(0); return; }
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [state]);

  const startRecord = () => setState("recording");
  const stopRecord = () => {
    setState("processing");
    setTimeout(() => setState("done"), 2400);
  };

  return (
    <div>
      <SectionHeader
        step="02"
        title="Voice → Multilingual Listing"
        desc="The artisan speaks in Hindi for 15–30 seconds. Bhashini transcribes, translates, and a small LLM fills the listing spec sheet. The artisan listens back — no reading, no form."
      />

      {/* Mic area */}
      <div className="mt-8 flex flex-col items-center gap-4">
        {state === "idle" && (
          <>
            <p
              className="text-sm text-center max-w-xs leading-relaxed"
              style={{ color: "var(--muted-foreground)" }}
            >
              Hold the button and describe your product in your own language.
              Hindi · Tamil · Bengali · and 19 others.
            </p>
            <button
              onMouseDown={startRecord}
              onTouchStart={startRecord}
              className="w-24 h-24 rounded-full flex items-center justify-center text-3xl transition-all hover:scale-110 active:scale-95"
              style={{ background: "var(--primary)", color: "#fff", boxShadow: "0 4px 24px rgba(196,99,58,0.35)" }}
            >
              🎙
            </button>
            <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
              Hold to record
            </span>
          </>
        )}

        {state === "recording" && (
          <>
            <div
              className="w-24 h-24 rounded-full flex flex-col items-center justify-center gap-1 cursor-pointer animate-pulse"
              style={{ background: "var(--primary)", color: "#fff" }}
              onClick={stopRecord}
            >
              <span className="text-2xl">⏹</span>
              <span className="text-xs">{seconds}s</span>
            </div>
            {/* Waveform mock */}
            <div className="flex items-center gap-0.5 h-8">
              {Array.from({ length: 32 }).map((_, i) => (
                <div
                  key={i}
                  className="w-1 rounded-full"
                  style={{
                    height: `${12 + Math.sin(i * 0.7 + seconds) * 10 + Math.random() * 8}px`,
                    background: "var(--primary)",
                    opacity: 0.6 + Math.random() * 0.4,
                    transition: "height 0.15s",
                  }}
                />
              ))}
            </div>
            <p className="text-xs" style={{ color: "var(--primary)", fontFamily: "var(--font-dm-mono)" }}>
              Recording… tap ⏹ to stop
            </p>
          </>
        )}

        {state === "processing" && (
          <div className="flex flex-col items-center gap-3">
            <div
              className="w-16 h-16 rounded-full border-4 animate-spin"
              style={{ borderColor: "var(--border)", borderTopColor: "var(--primary)" }}
            />
            <div className="text-sm text-center" style={{ color: "var(--muted-foreground)" }}>
              <p>Bhashini ASR → transcript</p>
              <p>Bhashini NMT → English</p>
              <p>Gemma-2B → slot fill</p>
            </div>
          </div>
        )}
      </div>

      {/* Demo seed: bypass recording */}
      {state === "idle" && (
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setState("done")}
            className="text-xs underline"
            style={{ color: "var(--muted-foreground)" }}
          >
            Demo: skip to result →
          </button>
        </div>
      )}

      {/* Result card */}
      {state === "done" && (
        <div className="mt-6">
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid var(--border)", background: "var(--card)" }}
          >
            {/* Card header */}
            <div
              className="px-5 py-4 flex items-start gap-4"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <img
                src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=120&h=140&fit=crop&auto=format"
                alt="Banarasi silk saree"
                className="w-20 h-24 object-cover rounded-lg flex-shrink-0"
                style={{ filter: "saturate(0.95) brightness(1.1)" }}
              />
              <div>
                <p
                  className="text-xs mb-1"
                  style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-dm-mono)" }}
                >
                  हिन्दी
                </p>
                <h3
                  className="text-lg font-semibold leading-snug"
                  style={{ fontFamily: "var(--font-lora)", color: "var(--foreground)" }}
                >
                  {SLOT_FILL.title_hi}
                </h3>
                <p className="mt-1 text-xs" style={{ color: "var(--muted-foreground)" }}>
                  {SLOT_FILL.description_hi}
                </p>
                <div className="mt-2">
                  <ProvenanceTag
                    source="bhashini-asr-v3.2"
                    confidence={0.91}
                    ts="Today · 14:24:02"
                    inline
                  />
                </div>
              </div>
            </div>

            {/* English */}
            <div
              className="px-5 py-4"
              style={{ borderBottom: "1px solid var(--border)" }}
            >
              <p
                className="text-xs mb-1"
                style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-dm-mono)" }}
              >
                English
              </p>
              <h3
                className="text-base font-semibold"
                style={{ fontFamily: "var(--font-lora)", color: "var(--foreground)" }}
              >
                {SLOT_FILL.title_en}
              </h3>
              <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
                {SLOT_FILL.description_en}
              </p>
              <div className="mt-2">
                <ProvenanceTag
                  source="bhashini-nmt-v2.1"
                  confidence={0.88}
                  ts="Today · 14:24:05"
                  inline
                />
              </div>
            </div>

            {/* Attributes */}
            <div className="px-5 py-4">
              <div
                className="text-xs mb-3 font-medium"
                style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-dm-mono)" }}
              >
                Slot-fill · gemma-2b-finetuned-v1 · confidence 0.87
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-2">
                {Object.entries(SLOT_FILL.attributes).map(([k, v]) => (
                  <div key={k} className="flex gap-2 text-sm">
                    <span style={{ color: "var(--muted-foreground)", minWidth: 100 }}>{k}</span>
                    <button
                      className="font-medium text-left"
                      style={{
                        color: editSlot === k ? "var(--primary)" : "var(--foreground)",
                        textDecoration: editSlot === k ? "underline" : "none",
                      }}
                      onClick={() => setEditSlot(editSlot === k ? null : k)}
                      title="Tap to correct this field"
                    >
                      {v}
                    </button>
                  </div>
                ))}
              </div>
              {editSlot && (
                <div
                  className="mt-3 flex items-center gap-2 px-3 py-2 rounded-lg text-sm"
                  style={{ background: "var(--muted)", border: "1px solid var(--border)" }}
                >
                  <span style={{ color: "var(--muted-foreground)" }}>Correcting:</span>
                  <span className="font-medium" style={{ color: "var(--primary)" }}>{editSlot}</span>
                  <button
                    className="ml-auto text-xs"
                    style={{ color: "var(--muted-foreground)" }}
                    onClick={() => setEditSlot(null)}
                  >
                    ✕ cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Confirm by ear */}
          <div
            className="mt-4 flex items-center justify-between rounded-xl px-5 py-4"
            style={{ background: "var(--secondary)", color: "#fff" }}
          >
            <div>
              <p className="font-semibold text-sm">Confirm-by-ear</p>
              <p className="text-xs opacity-75 mt-0.5">
                {confirmPlayed
                  ? "Played back in Hindi · Sunita's voice profile"
                  : "Listen to the listing in your own language"}
              </p>
            </div>
            <button
              onClick={() => setConfirmPlayed(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all hover:opacity-90"
              style={{
                background: confirmPlayed ? "rgba(255,255,255,0.15)" : "#fff",
                color: confirmPlayed ? "#fff" : "var(--secondary)",
              }}
            >
              {confirmPlayed ? "✓ Played" : "▶ Listen"}
            </button>
          </div>

          <div className="mt-6 flex gap-3 justify-between">
            <button
              onClick={onBack}
              className="px-5 py-2.5 rounded-full text-sm"
              style={{ border: "1px solid var(--border)", color: "var(--muted-foreground)" }}
            >
              ← Back
            </button>
            <button
              onClick={onNext}
              className="px-6 py-2.5 rounded-full font-semibold text-sm transition-all hover:scale-105"
              style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
            >
              Looks good →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function SectionHeader({ step, title, desc }: { step: string; title: string; desc: string }) {
  return (
    <div className="flex gap-4 items-start">
      <div
        className="text-4xl font-bold leading-none flex-shrink-0 hidden sm:block"
        style={{ color: "var(--border)", fontFamily: "var(--font-dm-mono)" }}
      >
        {step}
      </div>
      <div>
        <h2
          className="text-2xl font-semibold"
          style={{ fontFamily: "var(--font-lora)", color: "var(--foreground)" }}
        >
          {title}
        </h2>
        <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>
          {desc}
        </p>
      </div>
    </div>
  );
}
