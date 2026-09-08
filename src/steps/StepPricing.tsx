import { useState } from "react";
import ProvenanceTag from "../components/ProvenanceTag";

interface Props { onNext: () => void; onBack: () => void }

const FLOOR = 5800;
const REC = 9200;
const ASPIRATIONAL = 14500;

const BREAKDOWN = {
  floor: [
    { label: "Red clay (12 kg × ₹18/kg)", value: "₹216" },
    { label: "Natural pigments & finish", value: "₹180" },
    { label: "Labour (3 days × ₹40/hr × 8hr)", value: "₹960" },
    { label: "Kiln firing (shared cost)", value: "₹140" },
    { label: "Raw total", value: "₹1,496", bold: true },
    { label: "Floor price (60% of cost + overhead)", value: "₹5,800", bold: true },
  ],
  rec: [
    { label: "Comparables found", value: "73 listings" },
    { label: "25th percentile", value: "₹7,200" },
    { label: "75th percentile", value: "₹12,400" },
    { label: "Floor × 1.4 = ₹8,120 → clamped to band", value: "₹8,120" },
    { label: "GI premium (+12%)", value: "+₹974" },
    { label: "Recommended", value: "₹9,200", bold: true },
  ],
  asp: [
    { label: "Band high", value: "₹12,400" },
    { label: "GI premium (13%)", value: "+₹1,612" },
    { label: "Scarcity premium (4% · 73 comparables)", value: "+₹496" },
    { label: "Aspirational", value: "₹14,500", bold: true },
  ],
};

type Tier = "floor" | "rec" | "asp";

export default function StepPricing({ onNext, onBack }: Props) {
  const [expanded, setExpanded] = useState<Tier | null>(null);
  const [offerStr, setOfferStr] = useState("13500");
  const [overrideStr, setOverrideStr] = useState("");
  const [overrideSet, setOverrideSet] = useState(false);

  const offer = parseInt(offerStr) || 0;
  const platformFee = 0;
  const netToArtisan = offer - platformFee;

  const finalPrice = overrideSet && parseInt(overrideStr) ? parseInt(overrideStr) : REC;

  const tiles = [
    {
      key: "floor" as Tier,
      label: "Floor",
      amount: FLOOR,
      color: "var(--accent)",
      textColor: "var(--accent-foreground)",
      desc: "Must-sell minimum",
      breakdown: BREAKDOWN.floor,
      prov: { source: "cost-plus-engine-v1.0", confidence: 0.96, ts: "Today · 14:24:31" },
    },
    {
      key: "rec" as Tier,
      label: "Recommended",
      amount: REC,
      color: "var(--secondary)",
      textColor: "#fff",
      desc: "Market sweet spot",
      breakdown: BREAKDOWN.rec,
      prov: { source: "comparables-index-v2.3", confidence: 0.82, ts: "Today · 14:24:35" },
      highlight: true,
    },
    {
      key: "asp" as Tier,
      label: "Aspirational",
      amount: ASPIRATIONAL,
      color: "var(--primary)",
      textColor: "#fff",
      desc: "Flagship piece",
      breakdown: BREAKDOWN.asp,
      prov: { source: "gi-premium-engine-v1.0", confidence: 0.79, ts: "Today · 14:24:38" },
    },
  ];

  return (
    <div>
      <SectionHeader
        step="03"
        title="Three-band Pricing + Net Calculator"
        desc="Every number is auditable. Cost-plus floor, market-band recommended, GI-premium aspirational. The artisan sees the math. Override is always honoured."
      />

      <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4">
        {tiles.map((t) => (
          <div key={t.key}>
            <button
              onClick={() => setExpanded(expanded === t.key ? null : t.key)}
              className="w-full rounded-xl p-4 text-left transition-all hover:scale-[1.02]"
              style={{
                background: t.color,
                color: t.textColor,
                boxShadow: t.highlight ? "0 4px 20px rgba(59,82,134,0.25)" : "none",
                border: t.highlight ? "2px solid rgba(255,255,255,0.2)" : "2px solid transparent",
              }}
            >
              <div
                className="text-xs font-medium opacity-80 mb-1"
                style={{ fontFamily: "var(--font-outfit)" }}
              >
                {t.label}
              </div>
              <div
                className="text-2xl sm:text-3xl font-bold"
                style={{ fontFamily: "var(--font-lora)" }}
              >
                ₹{t.amount.toLocaleString("en-IN")}
              </div>
              <div className="text-xs opacity-70 mt-1">{t.desc}</div>
              <div className="text-xs opacity-60 mt-2">▼ How we got here</div>
            </button>

            {expanded === t.key && (
              <div
                className="mt-2 rounded-xl p-4"
                style={{ background: "var(--card)", border: "1px solid var(--border)" }}
              >
                <table className="w-full text-xs" style={{ fontFamily: "var(--font-dm-mono)" }}>
                  <tbody>
                    {t.breakdown.map((row, i) => (
                      <tr key={i} className={row.bold ? "font-semibold" : ""}>
                        <td
                          className="py-0.5 pr-2"
                          style={{ color: "var(--muted-foreground)" }}
                        >
                          {row.label}
                        </td>
                        <td
                          className="text-right"
                          style={{ color: row.bold ? "var(--foreground)" : "var(--muted-foreground)" }}
                        >
                          {row.value}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-3">
                  <ProvenanceTag {...t.prov} />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Net calculator */}
      <div
        className="mt-6 rounded-xl p-5"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <h3
          className="text-base font-semibold mb-4"
          style={{ fontFamily: "var(--font-lora)", color: "var(--foreground)" }}
        >
          Net-to-Artisan Calculator
        </h3>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="text-xs mb-1 block" style={{ color: "var(--muted-foreground)" }}>
              Buyer offered (₹)
            </label>
            <input
              type="number"
              value={offerStr}
              onChange={(e) => setOfferStr(e.target.value)}
              className="w-full px-4 py-2.5 rounded-lg text-lg font-semibold"
              style={{
                background: "var(--background)",
                border: "1.5px solid var(--border)",
                color: "var(--foreground)",
                fontFamily: "var(--font-lora)",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
          </div>
          <div
            className="flex-1 rounded-lg px-4 py-2.5 flex flex-col justify-center"
            style={{ background: "var(--muted)" }}
          >
            <div className="text-xs mb-0.5" style={{ color: "var(--muted-foreground)" }}>
              Platform fee
            </div>
            <div
              className="text-base font-semibold"
              style={{ color: "var(--foreground)", fontFamily: "var(--font-dm-mono)" }}
            >
              ₹0 <span className="text-xs font-normal" style={{ color: "var(--muted-foreground)" }}>(0% commission)</span>
            </div>
          </div>
          <div
            className="flex-1 rounded-lg px-4 py-2.5 flex flex-col justify-center"
            style={{ background: "var(--secondary)", color: "#fff" }}
          >
            <div className="text-xs mb-0.5 opacity-75">Net to you</div>
            <div
              className="text-2xl font-bold"
              style={{ fontFamily: "var(--font-lora)" }}
            >
              ₹{netToArtisan.toLocaleString("en-IN")}
            </div>
          </div>
        </div>

        {/* Override */}
        <div
          className="mt-4 pt-4"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p className="text-xs mb-2" style={{ color: "var(--muted-foreground)" }}>
            Set your own price — override is always honoured. Engine learns from it.
          </p>
          <div className="flex gap-2 items-center">
            <span className="text-sm" style={{ color: "var(--muted-foreground)" }}>₹</span>
            <input
              type="number"
              placeholder={String(finalPrice)}
              value={overrideStr}
              onChange={(e) => setOverrideStr(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg text-sm"
              style={{
                background: "var(--background)",
                border: "1.5px solid var(--border)",
                color: "var(--foreground)",
                outline: "none",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
            <button
              onClick={() => setOverrideSet(!!overrideStr)}
              className="px-4 py-2 rounded-lg text-sm font-medium"
              style={{ background: "var(--muted)", color: "var(--foreground)" }}
            >
              Set
            </button>
          </div>
          {overrideSet && overrideStr && (
            <p
              className="mt-2 text-xs"
              style={{ color: "var(--accent)", fontFamily: "var(--font-dm-mono)" }}
            >
              ✓ Your price ₹{parseInt(overrideStr).toLocaleString("en-IN")} · logged · override_reason to be filled
            </p>
          )}
        </div>
      </div>

      {/* Explicit commitment */}
      <div
        className="mt-4 flex items-start gap-2 rounded-lg p-3 text-sm"
        style={{ background: "var(--muted)", border: "1px solid var(--border)" }}
      >
        <span>📌</span>
        <span style={{ color: "var(--muted-foreground)" }}>
          We never show a "neural-network price prediction". Every number is cost-plus + market-band + GI premium.
          All math is auditable. The final price is always the artisan's.
        </span>
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
          Confirm price →
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
