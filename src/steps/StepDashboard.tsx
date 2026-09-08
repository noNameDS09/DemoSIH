import { useState } from "react";
import ProvenanceTag from "../components/ProvenanceTag";

interface Props {
  onNewListing: () => void;
}

const LISTINGS = [
  {
    id: "LST-2025-VNS-009a3b",
    title: "Traditional Terracotta Water Pot — Hand-Thrown",
    titleHi: "पारंपरिक टेराकोटा मटका — हाथ से बनाया गया",
    price: 9200,
    status: "live" as const,
    channels: ["ONDC", "GeM", "WhatsApp"],
    confidence: 0.89,
    img: "/after.jpeg",
    ts: "Today · 14:25",
    gi: true,
  },
  {
    id: "LST-2025-VNS-007c1a",
    title: "Banarasi Brocade Dupatta — Meenakari",
    titleHi: "बनारसी ब्रोकेड दुपट्टा — मीनाकारी",
    price: 4800,
    status: "live" as const,
    channels: ["ONDC", "IndiaHandmade"],
    confidence: 0.92,
    img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=200&h=240&fit=crop&auto=format",
    ts: "Yesterday · 11:10",
    gi: true,
  },
  {
    id: "LST-2025-VNS-005e9f",
    title: "Silk Tanchoi Saree — Floral Motif",
    titleHi: "सिल्क तनचोई साड़ी — पुष्प डिज़ाइन",
    price: 7600,
    status: "pending" as const,
    channels: ["GeM"],
    confidence: 0.85,
    img: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=200&h=240&fit=crop&auto=format",
    ts: "2 days ago",
    gi: false,
  },
];

const SCHEMES = [
  { name: "PM Vishwakarma", status: "green" as const, id: "PMV-UP-2024-009a3b", next: "Oct 2025 disbursement" },
  { name: "ODOP — Nizamabad Pottery", status: "green" as const, id: "ODOP-UP-NZB-0041", next: "Active" },
  { name: "MUDRA Shishu", status: "amber" as const, id: "—", next: "Pending sync" },
];

const CHANNELS = [
  { name: "ONDC", status: "synced" as const, count: 2, icon: "🛒" },
  { name: "GeM", status: "synced" as const, count: 2, icon: "🏛️" },
  { name: "IndiaHandmade", status: "synced" as const, count: 1, icon: "🧵" },
  { name: "WhatsApp", status: "pending" as const, count: 1, icon: "💬" },
];

const AUDIT_FEED = [
  { ts: "14:25:04", label: "Gov badge lookup", source: "pehchan-registry-v2", conf: 0.97 },
  { ts: "14:25:02", label: "ADI signature", source: "adi-signer-v1.0", conf: 1.0 },
  { ts: "14:24:38", label: "Aspirational price", source: "gi-premium-engine-v1.0", conf: 0.79 },
  { ts: "14:24:35", label: "Recommended price", source: "comparables-index-v2.3", conf: 0.82 },
  { ts: "14:24:31", label: "Floor price", source: "cost-plus-engine-v1.0", conf: 0.96 },
  { ts: "14:24:12", label: "Slot fill", source: "gemma-2b-finetuned-v1", conf: 0.87 },
  { ts: "14:24:05", label: "NMT translation", source: "bhashini-nmt-v2.1", conf: 0.88 },
  { ts: "14:24:02", label: "ASR transcript", source: "bhashini-asr-v3.2", conf: 0.91 },
  { ts: "14:23:07", label: "Photo enhanced", source: "custom-segmentation-v2.1", conf: 0.94 },
];

const STATUS_COLOR: Record<string, string> = {
  green: "#4CAF50",
  amber: "#FF9800",
  red: "#f44336",
};

const confColor = (c: number) =>
  c >= 0.8 ? "#4CAF50" : c >= 0.7 ? "#FF9800" : "#f44336";

export default function StepDashboard({ onNewListing }: Props) {
  const [auditOpen, setAuditOpen] = useState(false);
  const [selectedListing, setSelectedListing] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* ── Hero: Artisan Profile ── */}
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, var(--secondary) 0%, #2a3d6e 100%)",
          color: "#fff",
        }}
      >
        {/* Top bar */}
        <div
          className="px-6 py-2 text-xs flex items-center gap-2"
          style={{
            background: "rgba(0,0,0,0.15)",
            fontFamily: "var(--font-dm-mono)",
          }}
        >
          <span style={{ color: "#4CAF50" }}>●</span>
          <span style={{ opacity: 0.7 }}>ADI-9a3b · pehchan-registry-v2 · verified Today 14:25</span>
        </div>

        <div className="px-6 py-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar */}
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold flex-shrink-0"
            style={{
              background: "rgba(255,255,255,0.15)",
              border: "2px solid rgba(255,255,255,0.3)",
              fontFamily: "var(--font-lora)",
            }}
          >
            सु
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <h2
                className="text-2xl font-semibold"
                style={{ fontFamily: "var(--font-lora)" }}
              >
                Ramesh Kumar
              </h2>
              <span
                className="text-xs px-2 py-0.5 rounded-full font-medium"
                style={{ background: "rgba(76,175,80,0.25)", color: "#81c784", border: "1px solid rgba(76,175,80,0.4)" }}
              >
                ✓ Pehchan-verified
              </span>
            </div>
            <p className="text-sm opacity-75" style={{ fontFamily: "var(--font-outfit)" }}>
              Nizamabad Pottery Cluster, Uttar Pradesh · Master potter · 15 years experience
            </p>
            {/* Scheme pills */}
            <div className="flex flex-wrap gap-2 mt-3">
              {SCHEMES.filter((s) => s.status === "green").map((s) => (
                <span
                  key={s.name}
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: "rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.85)" }}
                >
                  {s.name}
                </span>
              ))}
              <span
                className="text-xs px-2 py-0.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.55)" }}
              >
                🏺 GI — Nizamabad Black Pottery
              </span>
            </div>
          </div>

          {/* CTA */}
          <button
            onClick={onNewListing}
            className="flex-shrink-0 px-6 py-3 rounded-full font-semibold text-sm transition-all hover:scale-105 active:scale-95"
            style={{
              background: "var(--primary)",
              color: "#fff",
              boxShadow: "0 4px 16px rgba(196,99,58,0.45)",
              fontFamily: "var(--font-outfit)",
            }}
          >
            + New Listing
          </button>
        </div>
      </div>

      {/* ── KPI Row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Impact hero */}
        <div
          className="col-span-2 rounded-xl p-5 flex flex-col gap-1"
          style={{ background: "var(--card)", border: "1px solid var(--border)" }}
        >
          <span className="text-xs font-medium" style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-outfit)" }}>
            Earnings per water pot
          </span>
          <div className="flex items-end gap-3 mt-1">
            <div className="flex flex-col">
              <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>Old path</span>
              <span
                className="text-xl font-bold line-through"
                style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-lora)" }}
              >
                ₹2,800
              </span>
            </div>
            <span className="text-2xl mb-0.5" style={{ color: "var(--border)" }}>→</span>
            <div className="flex flex-col">
              <span className="text-xs" style={{ color: "#4CAF50" }}>KalaSetu</span>
              <span
                className="text-3xl font-bold"
                style={{ color: "var(--secondary)", fontFamily: "var(--font-lora)" }}
              >
                ₹13,500
              </span>
            </div>
            <span
              className="ml-auto text-sm font-semibold px-2 py-1 rounded-lg"
              style={{ background: "rgba(76,175,80,0.12)", color: "#4CAF50" }}
            >
              3.8×
            </span>
          </div>
          <div className="mt-2 w-full h-1.5 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
            <div
              className="h-full rounded-full"
              style={{ width: "78%", background: "linear-gradient(90deg, var(--accent), #4CAF50)" }}
            />
          </div>
          <span className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>
            ₹1,070 more per listing vs. middleman channel
          </span>
        </div>

        <KpiCard
          label="Active Listings"
          value="7"
          sub="3 live · 2 pending · 2 draft"
          icon="📦"
          color="var(--primary)"
        />
        <KpiCard
          label="Avg AI Confidence"
          value="89%"
          sub="across all provenance steps"
          icon="🧠"
          color="var(--secondary)"
        />
      </div>

      {/* ── Earnings strip ── */}
      <div className="grid grid-cols-3 gap-3">
        <KpiCard label="This Month" value="₹42,800" sub="net to artisan" icon="💰" color="var(--accent)" />
        <KpiCard label="Listings Signed" value="12" sub="HMAC-SHA256" icon="🔏" color="var(--primary)" />
        <KpiCard label="QR Scans" value="34" sub="buyer verifications" icon="📲" color="var(--secondary)" />
      </div>

      {/* ── Active Listings + Sidebar ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Listings */}
        <div className="lg:col-span-2 space-y-3">
          <h3
            className="text-base font-semibold"
            style={{ fontFamily: "var(--font-lora)", color: "var(--foreground)" }}
          >
            Active Listings
          </h3>
          {LISTINGS.map((listing) => (
            <div
              key={listing.id}
              onClick={() =>
                setSelectedListing(selectedListing === listing.id ? null : listing.id)
              }
              className="rounded-xl overflow-hidden cursor-pointer transition-all"
              style={{
                border:
                  selectedListing === listing.id
                    ? "1.5px solid var(--primary)"
                    : "1px solid var(--border)",
                background: "var(--card)",
                boxShadow:
                  selectedListing === listing.id
                    ? "0 0 0 3px rgba(196,99,58,0.1)"
                    : "none",
              }}
            >
              <div className="flex gap-4 p-4">
                {/* Thumbnail */}
                <img
                  src={listing.img}
                  alt={listing.title}
                  className="w-16 h-20 object-cover rounded-lg flex-shrink-0"
                  style={{ filter: "saturate(0.95) brightness(1.08)" }}
                />
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p
                        className="text-sm font-semibold leading-snug"
                        style={{ fontFamily: "var(--font-lora)", color: "var(--foreground)" }}
                      >
                        {listing.title}
                      </p>
                      <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>
                        {listing.titleHi}
                      </p>
                    </div>
                    <StatusChip status={listing.status} />
                  </div>

                  <div className="flex items-center gap-3 mt-2">
                    <span
                      className="text-lg font-bold"
                      style={{ fontFamily: "var(--font-lora)", color: "var(--secondary)" }}
                    >
                      ₹{listing.price.toLocaleString("en-IN")}
                    </span>
                    {listing.gi && (
                      <span
                        className="text-xs px-1.5 py-0.5 rounded-full"
                        style={{ background: "rgba(196,150,14,0.12)", color: "var(--accent)", border: "1px solid rgba(196,150,14,0.25)" }}
                      >
                        🏺 GI
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2 mt-2 flex-wrap">
                    {listing.channels.map((ch) => (
                      <span
                        key={ch}
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ background: "var(--muted)", color: "var(--muted-foreground)" }}
                      >
                        {ch}
                      </span>
                    ))}
                    <span className="ml-auto text-xs" style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-dm-mono)" }}>
                      {listing.ts}
                    </span>
                  </div>
                </div>
              </div>

              {/* Expanded provenance row */}
              {selectedListing === listing.id && (
                <div
                  className="px-4 pb-4"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  <div className="pt-3 flex items-center gap-3">
                    {/* Mini confidence bar */}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                          AI confidence
                        </span>
                        <span
                          className="text-xs font-semibold"
                          style={{ color: confColor(listing.confidence) }}
                        >
                          {Math.round(listing.confidence * 100)}%
                        </span>
                      </div>
                      <div className="h-1.5 rounded-full w-full" style={{ background: "var(--muted)" }}>
                        <div
                          className="h-full rounded-full transition-all"
                          style={{ width: `${listing.confidence * 100}%`, background: confColor(listing.confidence) }}
                        />
                      </div>
                    </div>
                    <span
                      className="text-xs px-2 py-1 rounded-lg"
                      style={{ background: "var(--muted)", color: "var(--muted-foreground)", fontFamily: "var(--font-dm-mono)" }}
                    >
                      {listing.id}
                    </span>
                  </div>
                  <div className="mt-3">
                    <ProvenanceTag
                      source="cost-plus-engine-v1.0 + adi-signer-v1.0"
                      confidence={listing.confidence}
                      ts="Today · 14:25"
                    />
                  </div>
                </div>
              )}
            </div>
          ))}

          <button
            onClick={onNewListing}
            className="w-full py-3 rounded-xl text-sm font-medium transition-all hover:opacity-80"
            style={{
              border: "2px dashed var(--border)",
              color: "var(--muted-foreground)",
              background: "transparent",
            }}
          >
            + Create new listing
          </button>
        </div>

        {/* Right sidebar */}
        <div className="space-y-4">
          {/* Channel Sync */}
          <div
            className="rounded-xl p-4"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <h3
              className="text-sm font-semibold mb-3"
              style={{ fontFamily: "var(--font-lora)", color: "var(--foreground)" }}
            >
              Channel Sync
            </h3>
            <div className="space-y-3">
              {CHANNELS.map((ch) => (
                <div key={ch.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{ch.icon}</span>
                    <div>
                      <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                        {ch.name}
                      </p>
                      <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>
                        {ch.count} listing{ch.count !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full font-medium"
                    style={{
                      background:
                        ch.status === "synced"
                          ? "rgba(76,175,80,0.12)"
                          : "rgba(255,152,0,0.12)",
                      color: ch.status === "synced" ? "#4CAF50" : "#FF9800",
                      border: `1px solid ${ch.status === "synced" ? "rgba(76,175,80,0.25)" : "rgba(255,152,0,0.25)"}`,
                    }}
                  >
                    {ch.status === "synced" ? "✓ Synced" : "⏳ Pending"}
                  </span>
                </div>
              ))}
            </div>
            <p
              className="text-xs mt-3 pt-3"
              style={{ color: "var(--muted-foreground)", borderTop: "1px solid var(--border)", fontFamily: "var(--font-dm-mono)" }}
            >
              Last sync: Today · 14:26:01
            </p>
          </div>

          {/* Scheme Tracker */}
          <div
            className="rounded-xl p-4"
            style={{ background: "var(--card)", border: "1px solid var(--border)" }}
          >
            <h3
              className="text-sm font-semibold mb-3"
              style={{ fontFamily: "var(--font-lora)", color: "var(--foreground)" }}
            >
              Scheme Memberships
            </h3>
            <div className="space-y-3">
              {SCHEMES.map((s) => (
                <div key={s.name} className="flex items-start gap-2.5">
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0 mt-1.5"
                    style={{ background: STATUS_COLOR[s.status] }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium leading-snug" style={{ color: "var(--foreground)" }}>
                      {s.name}
                    </p>
                    <p
                      className="text-xs mt-0.5 truncate"
                      style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-dm-mono)" }}
                    >
                      {s.id !== "—" ? s.id : "pending"} · {s.next}
                    </p>
                  </div>
                  <span
                    className="text-xs px-1.5 py-0.5 rounded-full flex-shrink-0"
                    style={{
                      background: STATUS_COLOR[s.status] + "22",
                      color: STATUS_COLOR[s.status],
                    }}
                  >
                    {s.status}
                  </span>
                </div>
              ))}
            </div>
            <button
              className="mt-3 w-full py-2 rounded-lg text-xs font-medium transition-all hover:opacity-80"
              style={{ background: "var(--muted)", color: "var(--muted-foreground)", border: "1px solid var(--border)" }}
            >
              + Apply for new scheme
            </button>
          </div>
        </div>
      </div>

      {/* ── Provenance Audit Feed ── */}
      <div
        className="rounded-xl overflow-hidden"
        style={{ border: "1px solid var(--border)" }}
      >
        <button
          onClick={() => setAuditOpen((o) => !o)}
          className="w-full flex items-center justify-between px-5 py-4 text-sm font-medium transition-colors"
          style={{ background: "var(--card)", color: "var(--foreground)" }}
        >
          <div className="flex items-center gap-3">
            <span>📜</span>
            <span>Provenance Audit Feed</span>
            <span
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: "var(--muted)", color: "var(--muted-foreground)", fontFamily: "var(--font-dm-mono)" }}
            >
              {AUDIT_FEED.length} events · LST-2025-VNS-009a3b
            </span>
          </div>
          <span style={{ color: "var(--muted-foreground)" }}>{auditOpen ? "▲" : "▼"}</span>
        </button>

        {auditOpen && (
          <div style={{ background: "var(--background)" }}>
            {AUDIT_FEED.map((ev, i) => (
              <div
                key={i}
                className="px-5 py-3 flex items-center gap-3 text-xs"
                style={{
                  borderTop: "1px solid var(--border)",
                  fontFamily: "var(--font-dm-mono)",
                }}
              >
                <span style={{ color: "var(--muted-foreground)", minWidth: 52 }}>{ev.ts}</span>
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: confColor(ev.conf) }}
                />
                <span style={{ color: "var(--foreground)", flex: 1 }}>{ev.label}</span>
                <span style={{ color: "var(--muted-foreground)" }}>{ev.source}</span>
                <span
                  style={{
                    color: confColor(ev.conf),
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

      {/* ── Impact story ── */}
      <div
        className="rounded-xl p-5"
        style={{ background: "var(--secondary)", color: "#fff" }}
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
    </div>
  );
}

/* ── Sub-components ── */

function KpiCard({
  label,
  value,
  sub,
  icon,
  color,
}: {
  label: string;
  value: string;
  sub: string;
  icon: string;
  color: string;
}) {
  return (
    <div
      className="rounded-xl p-4 flex flex-col gap-1"
      style={{ background: "var(--card)", border: "1px solid var(--border)" }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>
          {label}
        </span>
        <span className="text-base">{icon}</span>
      </div>
      <span
        className="text-2xl font-bold mt-1"
        style={{ fontFamily: "var(--font-lora)", color }}
      >
        {value}
      </span>
      <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
        {sub}
      </span>
    </div>
  );
}

function StatusChip({ status }: { status: "live" | "pending" | "draft" }) {
  const cfg = {
    live: { bg: "rgba(76,175,80,0.12)", color: "#4CAF50", label: "Live" },
    pending: { bg: "rgba(255,152,0,0.12)", color: "#FF9800", label: "Pending" },
    draft: { bg: "var(--muted)", color: "var(--muted-foreground)", label: "Draft" },
  }[status];
  return (
    <span
      className="text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0"
      style={{ background: cfg.bg, color: cfg.color }}
    >
      {cfg.label}
    </span>
  );
}
