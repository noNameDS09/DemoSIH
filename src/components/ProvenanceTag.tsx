import { useState } from "react";

interface ProvenanceTagProps {
  source: string;
  confidence: number;
  ts: string;
  inline?: boolean;
}

export default function ProvenanceTag({ source, confidence, ts, inline }: ProvenanceTagProps) {
  const [open, setOpen] = useState(false);

  const confidenceColor =
    confidence >= 0.8 ? "#4CAF50" : confidence >= 0.7 ? "#FF9800" : "#f44336";

  const bar = Math.round(confidence * 100);

  if (inline) {
    return (
      <div>
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex items-center gap-1.5 text-xs transition-opacity hover:opacity-80"
          style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-dm-mono)" }}
        >
          <span
            className="w-2 h-2 rounded-full flex-shrink-0"
            style={{ background: confidenceColor }}
          />
          <span style={{ color: "var(--muted-foreground)" }}>
            {source} · {bar}%
          </span>
          <span style={{ fontSize: 9, color: "var(--muted-foreground)" }}>
            {open ? "▲" : "▼"}
          </span>
        </button>
        {open && (
          <div
            className="mt-2 rounded p-3 text-xs"
            style={{
              background: "var(--muted)",
              border: "1px solid var(--border)",
              fontFamily: "var(--font-dm-mono)",
            }}
          >
            <div className="flex flex-col gap-1.5">
              <Row label="source" value={source} />
              <Row label="confidence" value={`${confidence} (${bar}%)`} />
              <Row label="ts" value={ts} />
              <Row label="signed" value="HMAC-SHA256 · ADI-9a3b" />
            </div>
            <div className="mt-2 flex items-center gap-1.5">
              <div className="flex-1 h-1 rounded-full" style={{ background: "var(--border)" }}>
                <div
                  className="h-1 rounded-full transition-all"
                  style={{ width: `${bar}%`, background: confidenceColor }}
                />
              </div>
              <span style={{ color: "var(--muted-foreground)" }}>{bar}% confidence</span>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="rounded p-3"
      style={{ background: "var(--muted)", border: "1px solid var(--border)" }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full"
      >
        <div
          className="flex items-center gap-2 text-xs"
          style={{ color: "var(--muted-foreground)", fontFamily: "var(--font-dm-mono)" }}
        >
          <span className="w-2 h-2 rounded-full" style={{ background: confidenceColor }} />
          <span>
            {source} · {ts}
          </span>
        </div>
        <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>
          {open ? "▲" : "▼"} Provenance
        </span>
      </button>
      {open && (
        <div
          className="mt-3 pt-3 text-xs flex flex-col gap-1.5"
          style={{
            borderTop: "1px solid var(--border)",
            fontFamily: "var(--font-dm-mono)",
          }}
        >
          <Row label="source" value={source} />
          <Row label="confidence" value={`${confidence} (${bar}%)`} />
          <Row label="ts" value={ts} />
          <Row label="signed" value="HMAC-SHA256 · ADI-9a3b · KalaSetu-v1" />
          <div className="mt-1 flex items-center gap-2">
            <div className="flex-1 h-1 rounded-full" style={{ background: "var(--border)" }}>
              <div
                className="h-1 rounded-full"
                style={{ width: `${bar}%`, background: confidenceColor }}
              />
            </div>
            <span style={{ color: "var(--muted-foreground)" }}>{bar}%</span>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <span style={{ color: "var(--muted-foreground)", minWidth: 80 }}>{label}</span>
      <span style={{ color: "var(--foreground)" }}>{value}</span>
    </div>
  );
}
