import { useState } from "react";
import StepCapture from "./steps/StepCapture";
import StepVoice from "./steps/StepVoice";
import StepPricing from "./steps/StepPricing";
import StepSign from "./steps/StepSign";
import StepVerify from "./steps/StepVerify";

const STEPS = [
  { id: 1, label: "Photo", sublabel: "Studio Image" },
  { id: 2, label: "Voice", sublabel: "Bilingual Listing" },
  { id: 3, label: "Pricing", sublabel: "Net Calculator" },
  { id: 4, label: "Sign", sublabel: "QR + ADI" },
  { id: 5, label: "Verify", sublabel: "Gov Badge" },
];

export default function App() {
  const [step, setStep] = useState(1);

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length));
  const prev = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="min-h-full flex flex-col" style={{ fontFamily: "var(--font-outfit)" }}>
      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{ background: "var(--background)", borderColor: "var(--border)" }}
      >
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold"
              style={{ background: "var(--primary)", color: "var(--primary-foreground)", fontFamily: "var(--font-lora)" }}
            >
              क
            </div>
            <div>
              <span
                className="text-xl font-semibold tracking-tight"
                style={{ fontFamily: "var(--font-lora)", color: "var(--foreground)" }}
              >
                KalaSetu
              </span>
              <span
                className="ml-2 text-xs px-2 py-0.5 rounded-full font-mono-data"
                style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}
              >
                Demo · Varanasi Silk
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm" style={{ color: "var(--muted-foreground)" }}>
            <span className="hidden sm:inline">Artisan:</span>
            <span style={{ color: "var(--foreground)", fontWeight: 500 }}>Sunita Devi</span>
            <span
              className="ml-1 w-2 h-2 rounded-full inline-block"
              style={{ background: "#4CAF50" }}
              title="ADI-verified"
            />
          </div>
        </div>
      </header>

      {/* Step nav */}
      <nav
        className="border-b"
        style={{ background: "var(--card)", borderColor: "var(--border)" }}
      >
        <div className="max-w-5xl mx-auto px-6 py-0 flex">
          {STEPS.map((s, i) => {
            const active = step === s.id;
            const done = step > s.id;
            return (
              <button
                key={s.id}
                onClick={() => setStep(s.id)}
                className="flex flex-col items-center gap-0.5 py-3 px-4 relative transition-all text-left"
                style={{
                  color: active ? "var(--primary)" : done ? "var(--secondary)" : "var(--muted-foreground)",
                  borderBottom: active ? "2px solid var(--primary)" : "2px solid transparent",
                  fontFamily: "var(--font-outfit)",
                }}
              >
                <span className="flex items-center gap-2">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-semibold"
                    style={{
                      background: active ? "var(--primary)" : done ? "var(--secondary)" : "var(--muted)",
                      color: active || done ? "#fff" : "var(--muted-foreground)",
                    }}
                  >
                    {done ? "✓" : s.id}
                  </span>
                  <span className="text-sm font-medium hidden sm:inline">{s.label}</span>
                </span>
                <span className="text-xs hidden md:inline" style={{ color: "var(--muted-foreground)", marginLeft: 28 }}>
                  {s.sublabel}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Step content */}
      <main className="flex-1">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
          {step === 1 && <StepCapture onNext={next} />}
          {step === 2 && <StepVoice onNext={next} onBack={prev} />}
          {step === 3 && <StepPricing onNext={next} onBack={prev} />}
          {step === 4 && <StepSign onNext={next} onBack={prev} />}
          {step === 5 && <StepVerify onBack={prev} />}
        </div>
      </main>

      {/* Footer */}
      <footer
        className="border-t py-4 text-center text-xs"
        style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}
      >
        KalaSetu · Provenance-first artisan infrastructure · All AI outputs carry{" "}
        <span className="font-mono-data">&#123;source, confidence, ts&#125;</span>
      </footer>
    </div>
  );
}
