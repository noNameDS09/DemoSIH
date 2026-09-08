import { useState } from "react";
import ProvenanceTag from "../components/ProvenanceTag";

interface Props { onNext: () => void; onBack: () => void }

const LISTING_ID = "LST-2025-VNS-009a3b";
const SIGNATURE = "hmac.sha256.4f9a2c...b7e1";
const QR_URL = `https://kalasetu.in/v/${LISTING_ID}?sig=${SIGNATURE}`;

function QRCode() {
  // SVG QR-like pattern — deterministic visual placeholder
  const cells: boolean[][] = [];
  const seed = [
    [1,1,1,1,1,1,1,0,1,0,0,1,0,0,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,1,0,0,1,1,0,1,0,1,0,0,0,0,0,1],
    [1,0,1,1,1,0,1,0,1,0,1,0,0,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,0,0,1,1,0,0,1,0,1,1,1,0,1],
    [1,0,1,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,1,0,1],
    [1,0,0,0,0,0,1,0,0,1,0,0,1,0,1,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,0,1,0,1,0,1,0,1,1,1,1,1,1,1],
    [0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0],
    [1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0,1,1,0],
    [0,1,1,0,0,1,0,0,1,0,1,1,0,0,1,0,1,1,0,0,1],
    [1,0,1,1,0,0,1,0,0,1,0,1,1,0,0,1,0,1,0,1,0],
    [0,0,1,0,1,0,0,1,1,0,1,0,0,1,1,0,1,0,1,0,0],
    [1,1,0,1,0,1,1,0,1,1,0,1,0,1,0,1,1,0,0,1,1],
    [0,0,0,0,0,0,0,0,0,1,1,0,1,0,0,0,0,1,0,1,0],
    [1,1,1,1,1,1,1,0,1,0,0,1,0,1,1,0,1,0,1,1,0],
    [1,0,0,0,0,0,1,0,0,1,1,0,1,0,0,1,0,1,0,1,1],
    [1,0,1,1,1,0,1,0,1,1,0,1,0,1,1,0,1,0,1,0,1],
    [1,0,1,1,1,0,1,0,0,0,1,0,1,1,0,1,0,1,0,1,0],
    [1,0,1,1,1,0,1,0,1,0,0,1,1,0,1,0,1,0,1,0,1],
    [1,0,0,0,0,0,1,0,0,1,0,0,0,1,0,1,0,1,1,0,0],
    [1,1,1,1,1,1,1,0,1,0,1,1,0,0,1,0,1,1,0,1,0],
  ];

  return (
    <svg viewBox="0 0 21 21" width="160" height="160" style={{ imageRendering: "pixelated" }}>
      {seed.map((row, r) =>
        row.map((cell, c) =>
          cell ? (
            <rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} fill="#1C1410" />
          ) : null
        )
      )}
    </svg>
  );
}

export default function StepSign({ onNext, onBack }: Props) {
  const [signed, setSigned] = useState(false);
  const [signing, setSigning] = useState(false);

  const sign = () => {
    setSigning(true);
    setTimeout(() => {
      setSigning(false);
      setSigned(true);
    }, 1800);
  };

  return (
    <div>
      <SectionHeader
        step="04"
        title="Sign + QR + ADI"
        desc="The listing is signed by the artisan's ADI (HMAC-SHA256). A QR code is generated that encodes a public verification URL. The signature travels with the listing to every outbound channel."
      />

      {!signed && !signing && (
        <div className="mt-8 flex flex-col items-center gap-4">
          {/* Preview card */}
          <div
            className="w-full max-w-sm rounded-xl overflow-hidden"
            style={{ border: "1px solid var(--border)", background: "var(--card)" }}
          >
            <div className="flex gap-3 p-4" style={{ borderBottom: "1px solid var(--border)" }}>
              <img
                src="/after.jpeg"
                alt="Terracotta water pot"
                className="w-16 h-20 object-cover rounded-lg flex-shrink-0"
                style={{ filter: "saturate(0.95) brightness(1.1)" }}
              />
              <div>
                <h3
                  className="text-sm font-semibold leading-snug"
                  style={{ fontFamily: "var(--font-lora)", color: "var(--foreground)" }}
                >
                  Traditional Terracotta Water Pot — Hand-Thrown
                </h3>
                <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
                  Ramesh Kumar · Nizamabad Pottery Cluster
                </p>
                <p
                  className="text-lg font-bold mt-2"
                  style={{ fontFamily: "var(--font-lora)", color: "var(--secondary)" }}
                >
                  ₹9,200
                </p>
              </div>
            </div>
            <div
              className="px-4 py-3 flex items-center gap-2 text-xs"
              style={{ color: "var(--muted-foreground)", borderBottom: "1px solid var(--border)" }}
            >
              <span
                className="px-2 py-0.5 rounded-full text-xs font-medium"
                style={{ background: "var(--muted)", color: "var(--accent)" }}
              >
                🏺 GI-tagged
              </span>
              <span
                className="px-2 py-0.5 rounded-full text-xs font-medium"
                style={{ background: "var(--muted)", color: "var(--secondary)" }}
              >
                Pehchan pending
              </span>
            </div>
            <div className="px-4 py-3 text-xs" style={{ color: "var(--muted-foreground)" }}>
              Unsigned · Draft state
            </div>
          </div>

          <button
            onClick={sign}
            className="px-8 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            ✍ Generate Listing Card + Sign
          </button>
        </div>
      )}

      {signing && (
        <div className="mt-12 flex flex-col items-center gap-3">
          <div
            className="w-16 h-16 rounded-full border-4 animate-spin"
            style={{ borderColor: "var(--border)", borderTopColor: "var(--primary)" }}
          />
          <p style={{ color: "var(--muted-foreground)" }}>Signing with ADI key · Generating QR…</p>
          <p
            className="text-xs"
            style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-dm-mono)" }}
          >
            POST /v1/listings/{LISTING_ID}/sign · HMAC-SHA256
          </p>
        </div>
      )}

      {signed && (
        <div className="mt-6 space-y-4">
          {/* Signed listing card */}
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: "2px solid var(--accent)", background: "var(--card)" }}
          >
            {/* Top band */}
            <div
              className="px-5 py-3 flex items-center justify-between"
              style={{ background: "var(--accent)", color: "var(--accent-foreground)" }}
            >
              <span className="text-sm font-semibold" style={{ fontFamily: "var(--font-lora)" }}>
                Verified Listing Card
              </span>
              <span className="text-xs font-mono-data opacity-80">{LISTING_ID}</span>
            </div>

            <div className="p-5 flex gap-5 flex-col sm:flex-row">
              {/* Product info */}
              <div className="flex-1">
                <div className="flex gap-4">
                  <img
                    src="/after.jpeg"
                    alt="Traditional Terracotta Water Pot"
                    className="w-20 h-24 object-cover rounded-lg flex-shrink-0"
                    style={{ filter: "saturate(0.95) brightness(1.1)" }}
                  />
                  <div>
                    <h3
                      className="text-base font-semibold"
                      style={{ fontFamily: "var(--font-lora)", color: "var(--foreground)" }}
                    >
                      Traditional Terracotta Water Pot — Hand-Thrown
                    </h3>
                    <p className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
                      पारंपरिक टेराकोटा मटका — हाथ से बनाया गया
                    </p>
                    <div
                      className="mt-2 text-2xl font-bold"
                      style={{ fontFamily: "var(--font-lora)", color: "var(--secondary)" }}
                    >
                      ₹9,200
                    </div>
                    <div className="flex gap-2 mt-2 flex-wrap">
                      <Badge color="var(--accent)" text="🏺 GI-tagged" />
                      <Badge color="var(--primary)" text="Wheel pottery" />
                      <Badge color="var(--secondary)" text="21 days" />
                    </div>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  <ProvenanceTag
                    source="cost-plus-engine-v1.0 + comparables-index-v2.3"
                    confidence={0.85}
                    ts="Today · 14:24:31"
                  />
                  <div
                    className="flex items-center gap-2 text-xs px-3 py-2 rounded-lg"
                    style={{ background: "rgba(76,175,80,0.1)", border: "1px solid rgba(76,175,80,0.3)" }}
                  >
                    <span style={{ color: "#4CAF50" }}>✓</span>
                    <span style={{ color: "var(--foreground)" }}>
                      Signed by ADI-9a3b · Today at 14:25:02 · HMAC-SHA256
                    </span>
                  </div>
                </div>
              </div>

              {/* QR */}
              <div className="flex flex-col items-center gap-3 flex-shrink-0">
                <div
                  className="p-3 rounded-xl"
                  style={{ background: "#fff", border: "1px solid var(--border)" }}
                >
                  <QRCode />
                </div>
                <p className="text-xs text-center" style={{ color: "var(--muted-foreground)" }}>
                  Ramesh Kumar · ADI-9a3b
                </p>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1.5 rounded-full text-xs font-medium"
                    style={{ background: "var(--muted)", color: "var(--foreground)" }}
                  >
                    🖨 Print
                  </button>
                  <button
                    className="px-3 py-1.5 rounded-full text-xs font-medium"
                    style={{ background: "var(--muted)", color: "var(--foreground)" }}
                  >
                    📲 WhatsApp
                  </button>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div
              className="px-5 py-3 text-xs flex items-center gap-2"
              style={{ background: "var(--muted)", borderTop: "1px solid var(--border)", color: "var(--muted-foreground)" }}
            >
              <span>Verified by KalaSetu · Pehchan-linked · Provenance-tagged · Scan to verify</span>
              <span className="ml-auto font-mono-data opacity-60 truncate hidden sm:inline">
                kalasetu.in/v/{LISTING_ID}
              </span>
            </div>
          </div>

          {/* Outbound */}
          <div
            className="rounded-xl p-4"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <p className="text-sm font-medium mb-3" style={{ color: "var(--foreground)" }}>
              Push to outbound channels — one tap
            </p>
            <div className="flex flex-wrap gap-2">
              {["ONDC", "GeM", "IndiaHandmade", "WhatsApp"].map((ch) => (
                <button
                  key={ch}
                  className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:opacity-80"
                  style={{ background: "var(--muted)", color: "var(--foreground)", border: "1px solid var(--border)" }}
                >
                  {ch}
                </button>
              ))}
            </div>
          </div>

          <div className="flex gap-3 justify-between">
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
              Verify artisan →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function Badge({ color, text }: { color: string; text: string }) {
  return (
    <span
      className="px-2 py-0.5 rounded-full text-xs font-medium"
      style={{ background: color + "22", color: color, border: `1px solid ${color}44` }}
    >
      {text}
    </span>
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
