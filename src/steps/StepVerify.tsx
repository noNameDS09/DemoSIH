import { useState } from "react";
import ProvenanceTag from "../components/ProvenanceTag";

interface Props { onBack: () => void; onDone?: () => void }

type BadgeStatus = "green" | "amber" | "red";

const BADGE_COLOR: Record<BadgeStatus, string> = {
  green: "#4CAF50",
  amber: "#FF9800",
  red: "#f44336",
};

const SCHEMES = [
  { name: "PM Vishwakarma", status: "green" as BadgeStatus, since: "March 2024", id: "PMV-UP-2024-009a3b" },
  { name: "ODOP — Nizamabad Pottery", status: "green" as BadgeStatus, since: "Jan 2023", id: "ODOP-UP-NZB-0041" },
  { name: "MUDRA Shishu", status: "amber" as BadgeStatus, since: "Pending sync", id: "—" },
];

const PROVENANCE_EVENTS = [
  { ts: "14:23:07", source: "custom-segmentation-v2.1", label: "Photo enhanced", conf: 0.94 },
  { ts: "14:24:02", source: "bhashini-asr-v3.2", label: "ASR transcript", conf: 0.91 },
  { ts: "14:24:05", source: "bhashini-nmt-v2.1", label: "NMT translation", conf: 0.88 },
  { ts: "14:24:12", source: "gemma-2b-finetuned-v1", label: "Slot fill", conf: 0.87 },
  { ts: "14:24:31", source: "cost-plus-engine-v1.0", label: "Floor price", conf: 0.96 },
  { ts: "14:24:35", source: "comparables-index-v2.3", label: "Recommended price", conf: 0.82 },
  { ts: "14:24:38", source: "gi-premium-engine-v1.0", label: "Aspirational price", conf: 0.79 },
  { ts: "14:25:02", source: "adi-signer-v1.0", label: "ADI signature", conf: 1.0 },
  { ts: "14:25:04", source: "pehchan-registry-v2", label: "Gov badge lookup", conf: 0.97 },
];

export default function StepVerify({ onBack, onDone }: Props) {
  const [buyerView, setBuyerView] = useState(false);
  const [auditOpen, setAuditOpen] = useState(false);

  return (
    <div>
      <SectionHeader
        step="05"
        title="Gov Verification Badge + Public View"
        desc="The Pehchan registry confirms the artisan's ADI. Scheme memberships are cross-checked. The public verification page is what a buyer sees when they scan the QR code."
      />

      <div className="mt-6 flex gap-3 items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setBuyerView(false)}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all"
            style={{
              background: !buyerView ? "var(--primary)" : "var(--muted)",
              color: !buyerView ? "var(--primary-foreground)" : "var(--muted-foreground)",
            }}
          >
            Artisan view
          </button>
          <button
            onClick={() => setBuyerView(true)}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all"
            style={{
              background: buyerView ? "var(--secondary)" : "var(--muted)",
              color: buyerView ? "#fff" : "var(--muted-foreground)",
            }}
          >
            Buyer view (QR scan)
          </button>
        </div>
      </div>

      {!buyerView && (
        <div className="mt-6 space-y-4">
          {/* Gov Badge */}
          <div
            className="rounded-xl p-5"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{ background: BADGE_COLOR.green }}
                  />
                  <h3
                    className="text-base font-semibold"
                    style={{ fontFamily: "var(--font-lora)", color: "var(--foreground)" }}
                  >
                    Pehchan-verified Artisan
                  </h3>
                </div>
                <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
                   ADI-9a3b · Cluster: Nizamabad Pottery, UP
                </p>
                <p
                  className="text-xs mt-1"
                  style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-dm-mono)" }}
                >
                  Verified: Today at 14:25:04 · Expires: 7 days · pehchan-registry-v2
                </p>
              </div>
              <div
                className="px-4 py-2 rounded-xl text-sm font-semibold flex items-center gap-2"
                style={{ background: "rgba(76,175,80,0.12)", color: BADGE_COLOR.green, border: "1.5px solid rgba(76,175,80,0.3)" }}
              >
                <span>✓</span> Verified
              </div>
            </div>

            <div className="mt-4">
              <ProvenanceTag
                source="pehchan-registry-v2 + pmv-registry-v1"
                confidence={0.97}
                ts="Today · 14:25:04"
              />
            </div>
          </div>

          {/* Scheme badges */}
          <div
            className="rounded-xl p-5"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <h3 className="text-sm font-semibold mb-3" style={{ color: "var(--foreground)" }}>
              Scheme Memberships
            </h3>
            <div className="space-y-3">
              {SCHEMES.map((s) => (
                <div key={s.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ background: BADGE_COLOR[s.status] }}
                    />
                    <div>
                      <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                        {s.name}
                      </p>
                      <p
                        className="text-xs"
                        style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-dm-mono)" }}
                      >
                        {s.id !== "—" ? s.id : "pending"} · since {s.since}
                      </p>
                    </div>
                  </div>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{
                      background: BADGE_COLOR[s.status] + "22",
                      color: BADGE_COLOR[s.status],
                    }}
                  >
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Full provenance audit */}
          <div
            className="rounded-xl overflow-hidden"
            style={{ border: "1px solid var(--border)" }}
          >
            <button
              onClick={() => setAuditOpen((o) => !o)}
              className="w-full flex items-center justify-between px-5 py-4 text-sm font-medium"
              style={{ background: "var(--card)", color: "var(--foreground)" }}
            >
              <span>Full provenance audit trail ({PROVENANCE_EVENTS.length} events)</span>
              <span style={{ color: "var(--muted-foreground)" }}>{auditOpen ? "▲" : "▼"}</span>
            </button>
            {auditOpen && (
              <div style={{ background: "var(--background)" }}>
                {PROVENANCE_EVENTS.map((ev, i) => (
                  <div
                    key={i}
                    className="px-5 py-3 flex items-center gap-3 text-xs"
                    style={{
                      borderTop: "1px solid var(--border)",
                      fontFamily: "var(--font-dm-mono)",
                    }}
                  >
                    <span style={{ color: "var(--muted-foreground)", minWidth: 52 }}>
                      {ev.ts}
                    </span>
                    <span
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{
                        background:
                          ev.conf >= 0.8 ? "#4CAF50" : ev.conf >= 0.7 ? "#FF9800" : "#f44336",
                      }}
                    />
                    <span style={{ color: "var(--foreground)", flex: 1 }}>{ev.label}</span>
                    <span style={{ color: "var(--muted-foreground)" }}>{ev.source}</span>
                    <span
                      style={{
                        color: ev.conf >= 0.8 ? "#4CAF50" : ev.conf >= 0.7 ? "#FF9800" : "#f44336",
                        minWidth: 36,
                        textAlign: "right",
                      }}
                    >
                      {Math.round(ev.conf * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {buyerView && (
        <div className="mt-6">
          {/* Simulate a phone/public verification page */}
          <div
            className="max-w-sm mx-auto rounded-2xl overflow-hidden"
            style={{
              border: "2px solid var(--border)",
              background: "var(--background)",
              boxShadow: "0 8px 32px rgba(28,20,16,0.12)",
            }}
          >
            {/* Top bar */}
            <div
              className="px-4 py-3 text-xs flex items-center gap-2"
              style={{ background: "var(--card)", borderBottom: "1px solid var(--border)", color: "var(--muted-foreground)", fontFamily: "var(--font-dm-mono)" }}
            >
              <span style={{ color: "#4CAF50" }}>🔒</span>
              kalasetu.in/v/LST-2025-VNS-009a3b
            </div>

            <div className="p-5">
              <img
                src="/after.jpeg"
                alt="Terracotta water pot"
                className="w-full h-40 object-cover rounded-xl mb-4"
                style={{ filter: "saturate(0.95) brightness(1.1)" }}
              />

              <h2
                className="text-lg font-semibold"
                style={{ fontFamily: "var(--font-lora)", color: "var(--foreground)" }}
              >
                Traditional Terracotta Water Pot — Hand-Thrown
              </h2>
              <p className="text-sm mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                पारंपरिक टेराकोटा मटका · Ramesh Kumar
              </p>

              <div
                className="mt-3 text-2xl font-bold"
                style={{ fontFamily: "var(--font-lora)", color: "var(--secondary)" }}
              >
                ₹1,800
              </div>

              {/* Badges */}
              <div className="mt-3 space-y-2">
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
                  style={{ background: "rgba(76,175,80,0.1)", border: "1px solid rgba(76,175,80,0.25)" }}
                >
                  <span style={{ color: "#4CAF50", fontWeight: 600 }}>✓</span>
                  <span style={{ color: "var(--foreground)" }}>
                     Pehchan-verified · ADI-9a3b · Member of PM Vishwakarma
                  </span>
                </div>
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
                  style={{ background: "rgba(196,150,14,0.1)", border: "1px solid rgba(196,150,14,0.25)" }}
                >
                  <span>🏺</span>
                  <span style={{ color: "var(--foreground)" }}>
                    Nizamabad Black Pottery — GI-registered product
                  </span>
                </div>
                <div
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs"
                  style={{ background: "var(--muted)", border: "1px solid var(--border)" }}
                >
                  <span>🔏</span>
                  <span style={{ color: "var(--foreground)" }}>
                    Signed by ADI-9a3b · Today at 14:25:02
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <ProvenanceTag
                  source="cost-plus-engine-v1.0"
                  confidence={0.85}
                  ts="Today · 14:24:35"
                />
              </div>

              <button
                className="mt-4 w-full py-2.5 rounded-full text-sm font-medium transition-all hover:opacity-90"
                style={{ background: "var(--muted)", color: "var(--muted-foreground)", border: "1px solid var(--border)" }}
              >
                ⚑ Report a problem
              </button>
            </div>

            <div
              className="px-5 py-3 text-xs text-center"
              style={{ borderTop: "1px solid var(--border)", color: "var(--muted-foreground)", background: "var(--card)" }}
            >
              Verified by KalaSetu · Provenance-tagged · No PII stored
            </div>
          </div>
        </div>
      )}

      {/* Story */}
      <div
        className="mt-6 rounded-xl p-5"
        style={{
          background: "var(--secondary)",
          color: "#fff",
        }}
      >
        <h3
          className="text-base font-semibold mb-2"
          style={{ fontFamily: "var(--font-lora)" }}
        >
          What this means for Ramesh Kumar
        </h3>
        <p className="text-sm leading-relaxed opacity-85">
           A 38-year-old Nizamabad potter from Uttar Pradesh. Currently sells through a middleman who pays ₹280 for a
           water pot that retails at ₹1,800. His son wants to study engineering. With KalaSetu: the same pot, the same skill,
           a verified listing, a fair price — and the buyer sees exactly why the pot is worth it.
           Middleman path: ₹280. KalaSetu path: ₹1,350.{" "}
           <strong>The platform removed 30 seconds of friction.</strong>
        </p>
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
          onClick={onDone}
          className="px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105"
          style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
        >
          ↩ Back to Dashboard
        </button>
      </div>
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
