import React from "react";

export function PBar({ pct, color, width }: { pct: number; color?: string; width?: number | string }) {
  return (
    <div style={{ width: width || "100%", height: 6, background: "#e3e3e3", borderRadius: 3, overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, height: "100%", background: color || "#0a0a0a", borderRadius: 3, transition: "width 0.15s ease" }} />
    </div>
  );
}

interface BtnProps {
  t: any;
  children: React.ReactNode;
  pri?: boolean;
  sm?: boolean;
  xs?: boolean;
  dng?: boolean;
  ghost?: boolean;
  hi?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  style?: React.CSSProperties;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset";
}

export function Btn({ t, children, pri, sm, xs, dng, ghost, hi, onClick, disabled, style: s = {}, fullWidth, type }: BtnProps) {
  const base: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: 5,
    padding: xs ? "2px 7px" : sm ? "3px 10px" : "5px 12px",
    borderRadius: 5, fontSize: xs ? 10 : sm ? 11 : 12, fontWeight: 500,
    cursor: disabled ? "default" : "pointer", border: "1px solid",
    transition: "all 0.1s", whiteSpace: "nowrap", opacity: disabled ? 0.45 : 1,
    width: fullWidth ? "100%" : undefined,
    justifyContent: fullWidth ? "center" : undefined,
    borderColor: pri ? t.tx : dng ? t.re : ghost ? "transparent" : hi ? t.hi : t.bd,
    background: pri ? t.tx : ghost ? "transparent" : hi ? t.hi : t.surf,
    color: pri ? t.surf : dng ? t.re : ghost ? t.sub : hi ? "#fff" : t.tx,
    fontFamily: "inherit",
    ...s,
  };
  return <button type={type} style={base} onClick={onClick} disabled={disabled}>{children}</button>;
}

interface BadgeProps {
  t: any;
  label: string;
  color?: "green" | "amber" | "red" | "blue" | "gray" | "black";
}

export function Badge({ t, label, color = "gray" }: BadgeProps) {
  const map = {
    green:  { bg: t.gl,  tx: t.gt  },
    amber:  { bg: t.aml, tx: t.amt },
    red:    { bg: t.rl,  tx: t.rt  },
    blue:   { bg: t.hil, tx: t.hit },
    gray:   { bg: t.al,  tx: t.sub, border: `1px solid ${t.bd}` },
    black:  { bg: t.tx,  tx: t.surf },
  };
  const c = map[color] || map.gray;
  return (
    <span style={{
      display: "inline-block", fontSize: 10, fontWeight: 600,
      padding: "2px 7px", borderRadius: 3, whiteSpace: "nowrap",
      background: c.bg, color: c.tx, border: (c as any).border || "none",
    }}>{label}</span>
  );
}

interface TopbarProps {
  t: any;
  title: string;
  sub?: string;
  children?: React.ReactNode;
  onBack?: () => void;
  backLabel?: string;
  role?: "business" | "engineer";
  setRole?: (r: "business" | "engineer") => void;
  currentScreen?: string;
  go?: (s: string) => void;
}

export function Topbar({ t, title, sub, children, onBack, backLabel, role, setRole, currentScreen, go }: TopbarProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", height: 44, background: t.surf, borderBottom: `1px solid ${t.bd}`, flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {onBack && (
          <Btn t={t} sm ghost onClick={onBack}>
            <i className="ti ti-arrow-left" style={{ fontSize: 12 }} /> {backLabel || "Back"}
          </Btn>
        )}
        <span style={{ fontWeight: 600, fontSize: 14, color: t.tx }}>{title}</span>
        {sub && <span style={{ color: t.mu, fontSize: 12 }}>/ {sub}</span>}
      </div>

      {/* Dual Pill Track Switcher */}
      {role && setRole && (
        <div style={{
          display: "flex",
          background: t.al,
          borderRadius: 20,
          padding: 2,
          border: `1px solid ${t.bd}`,
          height: 28,
          alignItems: "center"
        }}>
          <button
            onClick={() => {
              setRole("business");
              if (go) {
                if (currentScreen === "eng-dashboard") {
                  go("dashboard");
                }
              }
            }}
            title="Switch workspace to Business track"
            style={{
              border: "none",
              background: role === "business" ? t.surf : "transparent",
              color: role === "business" ? t.tx : t.mu,
              padding: "4px 12px",
              borderRadius: 16,
              fontSize: 10,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
              transition: "all 0.15s ease",
              boxShadow: role === "business" ? "0 1px 3px rgba(0,0,0,0.12)" : "none"
            }}
          >
            <i className="ti ti-briefcase" style={{ fontSize: 11 }} />
            Business Track
          </button>
          <button
            onClick={() => {
              setRole("engineer");
              if (go) {
                if (currentScreen === "dashboard") {
                  go("eng-dashboard");
                }
              }
            }}
            title="Switch workspace to Engineering track"
            style={{
              border: "none",
              background: role === "engineer" ? t.surf : "transparent",
              color: role === "engineer" ? t.tx : t.mu,
              padding: "4px 12px",
              borderRadius: 16,
              fontSize: 10,
              fontWeight: 700,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 4,
              transition: "all 0.15s ease",
              boxShadow: role === "engineer" ? "0 1px 3px rgba(0,0,0,0.12)" : "none"
            }}
          >
            <i className="ti ti-code" style={{ fontSize: 11 }} />
            Engineering Track
          </button>
        </div>
      )}

      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>{children}</div>
    </div>
  );
}

interface StepbarProps {
  t: any;
  active: number;
  go: (s: string) => void;
}

export function Stepbar({ t, active, go }: StepbarProps) {
  const steps = [["discover", "Discover"], ["scorecard", "Scorecard"], ["blueprint", "Playbook Specs"]];
  return (
    <div style={{ display: "flex", height: 36, padding: "0 20px", background: t.surf, borderBottom: `1px solid ${t.bd}`, flexShrink: 0, alignItems: "center" }}>
      {steps.map(([id, label], i) => {
        const on = i === active, done = i < active;
        return (
          <span key={id} style={{ display: "inline-flex", alignItems: "center" }}>
            <button onClick={() => go(id)} style={{
              display: "flex", alignItems: "center", gap: 5, padding: "0 10px", height: 36,
              border: "none", background: "transparent", cursor: "pointer", fontSize: 12,
              color: on ? t.tx : done ? t.sub : t.mu, fontWeight: on ? 600 : 400,
              borderBottom: `2px solid ${on ? t.tx : "transparent"}`, fontFamily: "inherit",
            }}>
              <span style={{
                width: 16, height: 16, borderRadius: "50%", fontSize: 9, fontWeight: 700,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: on || done ? t.tx : t.al, color: on || done ? t.surf : t.mu,
                border: `1px solid ${on || done ? t.tx : t.bd}`,
              }}>
                {done ? <i className="ti ti-check" style={{ fontSize: 9 }} /> : i + 1}
              </span>
              {label}
            </button>
            {i < 2 && <i className="ti ti-chevron-right" style={{ fontSize: 10, color: t.mu, padding: "0 2px" }} />}
          </span>
        );
      })}
    </div>
  );
}

interface FilterbarProps {
  t: any;
  selects?: [string, string[]][];
  searchPlaceholder?: string;
}

export function Filterbar({ t, selects = [], searchPlaceholder = "Search…" }: FilterbarProps) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 20px", background: t.surf, borderBottom: `1px solid ${t.bd}`, flexShrink: 0, flexWrap: "wrap" }}>
      {selects.map(([label, opts]) => (
        <div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontSize: 11, color: t.mu, fontWeight: 500 }}>{label}</span>
          <select style={{ fontSize: 12, border: `1px solid ${t.bd}`, borderRadius: 4, padding: "3px 7px", background: t.surf, color: t.tx, outline: "none", fontFamily: "inherit" }}>
            {opts.map(o => <option key={o}>{o}</option>)}
          </select>
        </div>
      ))}
      <div style={{ width: 1, height: 16, background: t.bd, margin: "0 2px" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 5, border: `1px solid ${t.bd}`, borderRadius: 5, padding: "3px 9px", background: t.surf, marginLeft: "auto" }}>
        <i className="ti ti-search" style={{ fontSize: 12, color: t.mu }} />
        <input placeholder={searchPlaceholder} style={{ border: "none", outline: "none", fontSize: 12, color: t.tx, background: "transparent", width: 140, fontFamily: "inherit" }} />
      </div>
    </div>
  );
}

interface CardProps {
  t: any;
  children: React.ReactNode;
  style?: React.CSSProperties;
  key?: any;
}

export function Card({ t, children, style: s = {} }: CardProps) {
  return (
    <div style={{ background: t.surf, border: `1px solid ${t.bd}`, borderRadius: 6, overflow: "hidden", ...s }}>
      {children}
    </div>
  );
}

export function CardHeader({ t, children, color }: { t: any; children: React.ReactNode; color?: string }) {
  return (
    <div style={{ padding: "8px 14px", background: t.al, borderBottom: `1px solid ${t.bd}`, fontSize: 10, fontWeight: 700, color: color || t.sub, letterSpacing: "0.06em", textTransform: "uppercase" }}>
      {children}
    </div>
  );
}

export function Metric({ t, label, value, sub, delta, last }: { t: any; label: string; value: string; sub?: React.ReactNode; delta?: string; last?: boolean }) {
  return (
    <div style={{ background: t.surf, padding: "13px 20px", borderRight: last ? "none" : `1px solid ${t.bd}` }}>
      <div style={{ fontSize: 10, color: t.mu, marginBottom: 3, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1, letterSpacing: "-0.03em", color: t.tx }}>{value}</div>
      {sub && <div style={{ fontSize: 11, color: t.mu, marginTop: 3 }}>{sub}</div>}
      {delta && <div style={{ fontSize: 11, color: t.gr, marginTop: 2, fontWeight: 500 }}>{delta}</div>}
    </div>
  );
}

interface ContextPanelProps {
  t: any;
  wctx: any[];
  onToggle: (id: string) => void;
  idea?: string;
  role?: "business" | "engineer";
}

export function ContextPanel({ t, wctx, onToggle, idea, role = "business" }: ContextPanelProps) {
  const isEng = role === "engineer";
  
  // Engineers only see finalised context items, whereas business track sees both draft and finalized
  const filteredWctx = isEng ? wctx.filter(i => i.status === "finalized") : wctx;
  const finalized = wctx.filter(i => i.status === "finalized").length;
  const pct = Math.round((finalized / wctx.length) * 100);

  return (
    <div style={{ width: 228, background: t.surf, borderLeft: `1px solid ${t.bd}`, display: "flex", flexDirection: "column", overflow: "hidden", flexShrink: 0 }}>
      <div style={{ padding: "10px 12px 6px", fontSize: 10, fontWeight: 700, color: t.mu, letterSpacing: "0.07em", textTransform: "uppercase", borderBottom: `1px solid ${t.bd}`, flexShrink: 0, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span>Workspace context</span>
        {isEng && <span style={{ fontSize: 9, color: t.gr, fontWeight: 800, padding: "1px 5px", background: t.gl, borderRadius: 4 }}>READ-ONLY</span>}
      </div>
      {idea && (
        <div style={{ padding: "9px 12px", borderBottom: `1px solid ${t.bd}`, fontSize: 11, color: t.tx, fontWeight: 600 }}>
          {idea}
          <div style={{ fontSize: 10, color: t.mu, marginTop: 2, fontWeight: 400 }}>Active project</div>
        </div>
      )}
      <div style={{ padding: "8px 12px", borderBottom: `1px solid ${t.bd}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
          <span style={{ fontSize: 10, color: t.mu }}>Agreed items</span>
          <span style={{ fontSize: 10, fontWeight: 700, color: t.tx }}>{finalized}/{wctx.length}</span>
        </div>
        <PBar pct={pct} color={t.gr} width="100%" />
      </div>
      <div style={{ flex: 1, overflowY: "auto" }}>
        {filteredWctx.length === 0 ? (
          <div style={{ padding: 20, textAlign: "center", color: t.mu, fontSize: 11 }}>
            <i className="ti ti-lock" style={{ fontSize: 24, display: "block", marginBottom: 8, color: t.bd }} />
            No finalized decisions yet. Switch to Business Track to finalize scope items.
          </div>
        ) : (
          filteredWctx.map(item => (
            <div key={item.id} style={{ padding: "8px 12px", borderBottom: `1px solid ${t.bd}`, display: "flex", alignItems: "flex-start", gap: 8, background: item.status === "finalized" ? "transparent" : `${t.al}44` }}>
              {isEng ? (
                // Engineers get read-only finalized badges instead of interactive checkboxes
                <div
                  title="Finalized spec decision"
                  style={{
                    width: 16, height: 16, borderRadius: "50%", flexShrink: 0, marginTop: 1,
                    background: t.gl, color: t.gr, display: "flex", alignItems: "center", justifyContent: "center"
                  }}
                >
                  <i className="ti ti-lock" style={{ fontSize: 9 }} />
                </div>
              ) : (
                // Business track gets interactive toggle checkboxes
                <button
                  onClick={() => onToggle(item.id)}
                  title={item.status === "finalized" ? "Agreed — click to unmark" : "Click to mark as agreed"}
                  style={{
                    width: 16, height: 16, borderRadius: 3, flexShrink: 0, marginTop: 1,
                    border: `1.5px solid ${item.status === "finalized" ? t.tx : t.bd}`,
                    background: item.status === "finalized" ? t.tx : "transparent",
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  {item.status === "finalized" && <i className="ti ti-check" style={{ fontSize: 9, color: t.surf }} />}
                </button>
              )}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: t.mu, marginBottom: 2 }}>{item.label}</div>
                <div style={{ fontSize: 11, color: item.status === "finalized" ? t.tx : t.sub, lineHeight: 1.4 }}>{item.value}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
