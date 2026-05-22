import React, { useState } from "react";
import { BUSINESS_NAV, ENGINEER_NAV } from "../data";

interface SidebarProps {
  t: any;
  screen: string;
  go: (s: string) => void;
  dark: boolean;
  toggleDark: () => void;
  role: "business" | "engineer";
  setRole: React.Dispatch<React.SetStateAction<"business" | "engineer">>;
  ctx?: any;
}

export function Sidebar({ t, screen, go, dark, toggleDark, role, setRole, ctx }: SidebarProps) {
  const [hovered, setHovered] = useState(false);
  const nav = role === "engineer" ? ENGINEER_NAV : BUSINESS_NAV;

  // Dynamically resolve labels based on the active project and specified tracks
  const getDynamicLabel = (id: string, originalLabel: string) => {
    return originalLabel;
  };

  const NavBtn = ({ id, icon, label }: { id: string; icon: string; label: string; key?: string }) => {
    const isActive = screen === id;
    const computedLabel = getDynamicLabel(id, label);
    return (
      <button
        title={computedLabel}
        onClick={() => go(id)}
        style={{
          width: hovered ? "100%" : 40,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: hovered ? "flex-start" : "center",
          padding: hovered ? "0 12px" : 0,
          borderRadius: 8,
          border: "none",
          cursor: "pointer",
          fontSize: 18,
          background: isActive ? t.al : "transparent",
          color: isActive ? t.tx : t.mu,
          transition: "all 0.15s ease",
          position: "relative",
          gap: hovered ? 12 : 0,
          textAlign: "left",
        }}
        onMouseEnter={(e) => {
          if (!isActive) e.currentTarget.style.color = t.tx;
        }}
        onMouseLeave={(e) => {
          if (!isActive) e.currentTarget.style.color = t.mu;
        }}
      >
        {/* Left vertical active indicator strip */}
        {isActive && (
          <div style={{
            position: "absolute",
            left: hovered ? 1 : -6,
            top: 11,
            width: 3,
            height: 18,
            background: t.tx,
            borderRadius: "0 4px 4px 0"
          }} />
        )}
        <i className={`ti ${icon}`} style={{ fontSize: 16, width: 20, textAlign: "center", flexShrink: 0 }} />
        {hovered && (
          <span style={{
            fontSize: 11.5,
            fontWeight: isActive ? 700 : 500,
            color: isActive ? t.tx : t.sub,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}>
            {computedLabel}
          </span>
        )}
      </button>
    );
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: hovered ? 220 : 56,
        background: t.surf,
        borderRight: `1px solid ${t.bd}`,
        display: "flex",
        flexDirection: "column",
        alignItems: hovered ? "stretch" : "center",
        padding: "12px 8px",
        gap: 4,
        flexShrink: 0,
        transition: "width 0.18s cubic-bezier(0.4, 0, 0.2, 1)",
        overflow: "hidden",
        zIndex: 50,
      }}
    >
      {/* Logo — always goes home */}
      <div
        onClick={() => go(role === "engineer" ? "eng-dashboard" : "dashboard")}
        style={{
          width: hovered ? "calc(100% - 8px)" : 32,
          height: 32,
          background: t.tx,
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: hovered ? "flex-start" : "center",
          paddingLeft: hovered ? 12 : 0,
          color: t.surf,
          fontSize: 13,
          fontWeight: 900,
          cursor: "pointer",
          marginBottom: 12,
          letterSpacing: "-0.5px",
          flexShrink: 0,
          gap: 10,
          margin: hovered ? "0 4px 12px" : "0 0 12px",
          transition: "all 0.15s ease",
          alignSelf: "center"
        }}
      >
        <span>G</span>
        {hovered && (
          <span style={{ fontSize: 10.5, fontWeight: 800, letterSpacing: "0.05em", color: t.surf }}>
            GROUNDWORK
          </span>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 4, width: "100%", alignItems: hovered ? "stretch" : "center", overflowY: "auto", flex: 1, paddingRight: hovered ? 2 : 0 }} className="no-scrollbar">
        {nav.map(n => <NavBtn key={n.id} id={n.id} icon={n.icon} label={n.label} />)}
      </div>

      <div style={{ height: 1, background: t.bd, width: "100%", margin: "8px 0", flexShrink: 0 }} />

      {/* Role toggle */}
      <button
        onClick={() => {
          const nextRole = role === "business" ? "engineer" : "business";
          setRole(nextRole);
          go(nextRole === "engineer" ? "eng-dashboard" : "dashboard");
        }}
        title={`Switch to ${role === "business" ? "Engineer" : "Business"} track`}
        style={{
          width: hovered ? "100%" : 40,
          height: 40,
          border: "none",
          background: "transparent",
          cursor: "pointer",
          color: t.mu,
          fontSize: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: hovered ? "flex-start" : "center",
          padding: hovered ? "0 12px" : 0,
          gap: hovered ? 12 : 0,
          borderRadius: 8,
          transition: "all 0.15s ease",
          alignSelf: "center",
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = t.tx}
        onMouseLeave={(e) => e.currentTarget.style.color = t.mu}
      >
        <i className={`ti ${role === "business" ? "ti-code" : "ti-briefcase"}`} style={{ fontSize: 16, width: 20, textAlign: "center", flexShrink: 0 }} />
        {hovered && (
          <span style={{ fontSize: 11, fontWeight: 600, color: t.sub }}>
            {role === "business" ? "Engineering Track" : "Business Track"}
          </span>
        )}
      </button>

      {/* Theme */}
      <button
        onClick={toggleDark}
        title={dark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        style={{
          width: hovered ? "100%" : 40,
          height: 40,
          border: "none",
          background: "transparent",
          cursor: "pointer",
          color: t.mu,
          fontSize: 18,
          display: "flex",
          alignItems: "center",
          justifyContent: hovered ? "flex-start" : "center",
          padding: hovered ? "0 12px" : 0,
          gap: hovered ? 12 : 0,
          borderRadius: 8,
          transition: "all 0.15s ease",
          alignSelf: "center"
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = t.tx}
        onMouseLeave={(e) => e.currentTarget.style.color = t.mu}
      >
        <i className={`ti ${dark ? "ti-sun" : "ti-moon"}`} style={{ fontSize: 16, width: 20, textAlign: "center", flexShrink: 0 }} />
        {hovered && (
          <span style={{ fontSize: 11, fontWeight: 600, color: t.sub }}>
            {dark ? "Light Canvas" : "Midnight Canvas"}
          </span>
        )}
      </button>

      {/* Settings */}
      <NavBtn id="settings" icon="ti-settings" label="Settings" />

      {/* Showcase Deck */}
      <NavBtn id="pitchdeck" icon="ti-presentation" label="Showcase Deck" />

      {/* Avatar */}
      <div
        onClick={() => go("settings")}
        style={{
          width: 28,
          height: 28,
          borderRadius: "50%",
          background: t.tx,
          color: t.surf,
          fontSize: 10,
          fontWeight: 700,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          marginTop: 4,
          border: `2px solid ${t.tx}`,
          flexShrink: 0,
          alignSelf: "center"
        }}
      >
        A
      </div>
    </div>
  );
}
