import { useState } from "react";
import ProvenanceTag from "../components/ProvenanceTag";

const ORIGINAL_URL = "/before.png";
const STUDIO_URL = "/after.jpeg";

interface Props { onNext: () => void }

export default function StepCapture({ onNext }: Props) {
  const [captured, setCaptured] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [selected, setSelected] = useState<"studio" | "original">("studio");
  const [bg, setBg] = useState<"white" | "linen" | "beige">("white");

  const simulate = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setCaptured(true);
    }, 2200);
  };

  const bgOverlay: Record<string, string> = {
    white: "rgba(255,255,255,0)",
    linen: "rgba(240,228,196,0.18)",
    beige: "rgba(210,190,150,0.22)",
  };

  return (
    <div>
      <SectionHeader
        step="01"
        title="Photo → Studio Image"
        desc="The artisan takes a photo on their phone. The system returns a studio-quality version with a clean background, balanced light — same product, better light."
      />

      {!captured && !processing && (
        <div className="mt-8 flex flex-col items-center gap-6">
          {/* Mock camera frame */}
          <div
            className="relative w-full max-w-sm rounded-xl overflow-hidden"
            style={{
              aspectRatio: "3/4",
              background: "#1a1410",
              border: "2px solid var(--border)",
            }}
          >
            <img
              src={ORIGINAL_URL}
              alt="Product photo preview"
              className="w-full h-full object-cover opacity-90"
              style={{ filter: "brightness(0.85)" }}
            />
            {/* Frame guide */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-48 h-56 rounded-lg"
                style={{
                  border: "2px dashed rgba(255,255,255,0.5)",
                }}
              />
            </div>
            <div
              className="absolute bottom-3 left-0 right-0 flex justify-center"
              style={{ color: "rgba(255,255,255,0.7)", fontSize: 11, fontFamily: "var(--font-outfit)" }}
            >
              Frame your product · Tap to capture
            </div>
          </div>

          <button
            onClick={simulate}
            className="px-8 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            📷 Capture Photo
          </button>
        </div>
      )}

      {processing && (
        <div className="mt-12 flex flex-col items-center gap-4">
          <div
            className="w-16 h-16 rounded-full border-4 animate-spin"
            style={{ borderColor: "var(--border)", borderTopColor: "var(--primary)" }}
          />
          <p style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-outfit)" }}>
            Removing background · Balancing light…
          </p>
          <p
            className="text-xs"
            style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-dm-mono)" }}
          >
            POST /v1/images/enhance · custom-segmentation-v2.1
          </p>
        </div>
      )}

      {captured && (
        <div className="mt-6">
          {/* Side by side */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { key: "original" as const, label: "Original", tag: "as shot" },
              { key: "studio" as const, label: "Studio", tag: "enhanced" },
            ].map(({ key, label, tag }) => (
              <button
                key={key}
                onClick={() => setSelected(key)}
                className="relative rounded-xl overflow-hidden transition-all"
                style={{
                  border:
                    selected === key
                      ? "2px solid var(--accent)"
                      : "2px solid var(--border)",
                  boxShadow: selected === key ? "0 0 0 3px rgba(196,150,14,0.15)" : "none",
                }}
              >
                <div className="relative" style={{ aspectRatio: "3/4" }}>
                  <img
                    src={key === "studio" ? STUDIO_URL : ORIGINAL_URL}
                    alt={label}
                    className="w-full h-full object-cover"
                    style={{
                      filter:
                        key === "studio"
                          ? "brightness(1.05) contrast(1.02)"
                          : "brightness(0.82)",
                    }}
                  />
                  {key === "studio" && (
                    <div
                      className="absolute inset-0"
                      style={{ background: bgOverlay[bg] }}
                    />
                  )}
                </div>
                <div
                  className="absolute top-2 left-2 flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium"
                  style={{
                    background: "rgba(255,255,255,0.9)",
                    color: "var(--foreground)",
                    fontFamily: "var(--font-outfit)",
                  }}
                >
                  {label}
                  <span
                    className="px-1.5 py-0.5 rounded text-xs"
                    style={{
                      background: key === "studio" ? "var(--secondary)" : "var(--muted)",
                      color: key === "studio" ? "#fff" : "var(--muted-foreground)",
                      fontFamily: "var(--font-dm-mono)",
                      fontSize: 9,
                    }}
                  >
                    {tag}
                  </span>
                </div>
                {selected === key && (
                  <div
                    className="absolute bottom-2 right-2 w-7 h-7 rounded-full flex items-center justify-center text-sm"
                    style={{ background: "var(--accent)", color: "#fff" }}
                  >
                    ✓
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Background picker */}
          <div className="mt-4 flex items-center gap-3">
            <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>
              Background:
            </span>
            {(["white", "linen", "beige"] as const).map((b) => (
              <button
                key={b}
                onClick={() => setBg(b)}
                className="px-3 py-1 rounded-full text-xs font-medium transition-all capitalize"
                style={{
                  background:
                    bg === b ? "var(--primary)" : "var(--muted)",
                  color: bg === b ? "var(--primary-foreground)" : "var(--muted-foreground)",
                }}
              >
                {b}
              </button>
            ))}
          </div>

          {/* True-colour note */}
          <div
            className="mt-4 flex items-start gap-2 rounded-lg p-3 text-sm"
            style={{ background: "var(--muted)", border: "1px solid var(--border)" }}
          >
            <span>🎨</span>
            <div>
              <span className="font-medium" style={{ color: "var(--foreground)" }}>
                True-colour guarantee
              </span>
              <span style={{ color: "var(--muted-foreground)" }}>
                {" "}— hue is never shifted. Only exposure and white balance are corrected.
                The terracotta pot stays terracotta.
              </span>
            </div>
          </div>

          {/* Provenance */}
          <div className="mt-4">
            <ProvenanceTag
              source="custom-segmentation-v2.1"
              confidence={0.94}
              ts="Today · 14:23:07"
            />
          </div>

          <div className="mt-6 flex gap-3 justify-end">
            <button
              onClick={onNext}
              className="px-6 py-2.5 rounded-full font-semibold text-sm transition-all hover:scale-105"
              style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
            >
              Use this photo →
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
