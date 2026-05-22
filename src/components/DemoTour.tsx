import React, { useState } from "react";
import { Btn, Badge } from "./CoreUI";

interface DemoTourProps {
  t: any;
  screen: string;
  go: (s: string) => void;
  role: "business" | "engineer";
  setRole: React.Dispatch<React.SetStateAction<"business" | "engineer">>;
  wctx: any[];
  setWctx: any;
}

export function DemoTour({ t, screen, go, role, setRole, wctx, setWctx }: DemoTourProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "The Enterprise Disconnect",
      desc: "In massive enterprises, product owners learn crucial requirements inside customer calls (e.g. 'SSO is required by corporate IT' or 'missed shipments cost $10k per trip'). But developers never hear about it, causing weeks of wrong assumptions and failed audits.",
      highlight: "Let's demonstrate how Groundwork aligns both teams instantly without slow meetings.",
      action: "Next Step to begin",
      btnText: "Start Walkthrough ➔",
      actionFn: () => setStep(1),
    },
    {
      title: "Step 1: Ingest Customer Transcript",
      desc: "Go to the Knowledge Intake tab. Select the pre-loaded interview with Alex Chen from LogiTech, and see how simple client transcripts are analyzed.",
      hint: "Click the 'Go to Knowledge Intake' button below, select the Alex Chen preset, then click 'Align & Extract Variables' to let the Synapse AI map raw conversations to structured constraints.",
      btnText: "Go to Knowledge Intake ➔",
      actionFn: () => {
        go("transcripts");
        setStep(2);
      }
    },
    {
      title: "Step 2: Sync to Living Context",
      desc: "Once the AI extracts the $2k-$10k delay cost and SSO requirements, click 'Deploy & Sync to Live Development Context' on that page.",
      hint: "This binds these fields immutably as active developer requirements, syncing them instantly to both business and engineering dashboards.",
      btnText: "Check Project Context ➔",
      actionFn: () => {
        go("pcontext");
        setStep(3);
      }
    },
    {
      title: "Step 3: Engineering Track",
      desc: "Now, see the developer's workspace. Switch role to 'Engineering' using the track-switcher in the sidebar or click below. Developers now see the exact same specifications on Day 0.",
      hint: "Notice how the system aligns developers perfectly, showing them the SSO and SLA constraints before they write a single line of code.",
      btnText: "Switch Track & View Developer Specs ➔",
      actionFn: () => {
        setRole("engineer");
        go("pcontext");
        setStep(4);
      }
    },
    {
      title: "Step 4: Real-time Developer Chat",
      desc: "Open the AI Copilot Chat. Developers can ask anything about the system guidelines, and the AI answers strictly grounded in the extracted business specifications.",
      hint: "Go to 'AI Chat' to query your real-time grounded backend. Ask 'What are the security constraints?' to see it explain the SSO requirement perfectly.",
      btnText: "Open AI Synapse Chat ➔",
      actionFn: () => {
        go("context-chat");
      }
    }
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: "fixed",
          right: 20,
          bottom: 20,
          background: t.hi,
          color: "white",
          border: "none",
          borderRadius: "30px",
          padding: "10px 18px",
          display: "flex",
          alignItems: "center",
          gap: 8,
          fontSize: 12,
          fontWeight: 700,
          cursor: "pointer",
          boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
          zIndex: 99999,
          fontFamily: "inherit"
        }}
      >
        <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "#4ade80" }} className="animate-pulse" />
        Showcase & Demo Guide
      </button>
    );
  }

  const cur = steps[step];

  return (
    <div
      style={{
        position: "fixed",
        right: 20,
        bottom: 20,
        width: 380,
        background: t.surf,
        border: `2px solid ${t.tx}`,
        borderRadius: 12,
        padding: 16,
        boxShadow: "0 12px 36px rgba(0,0,0,0.3)",
        zIndex: 99999,
        fontFamily: "inherit",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        transition: "all 0.2s ease"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <Badge t={t} label={`DEMO GUIDE // STEP ${step + 1} of 5`} color="green" />
        </div>
        <button
          onClick={() => setIsOpen(false)}
          style={{ background: "transparent", border: "none", cursor: "pointer", color: t.mu, fontSize: 13 }}
        >
          ✕ Minimize
        </button>
      </div>

      <div>
        <h4 style={{ fontSize: 13, fontWeight: 900, marginBottom: 4, letterSpacing: "-0.01em", color: t.tx }}>
          {cur.title}
        </h4>
        <p style={{ fontSize: 11, color: t.sub, lineHeight: 1.5, margin: 0 }}>
          {cur.desc}
        </p>
        {cur.hint && (
          <div style={{ marginTop: 8, background: t.hi + "10", borderRadius: 6, padding: "8px 10px", borderLeft: `3px solid ${t.hi}`, fontSize: 10, color: t.sub, lineHeight: 1.4 }}>
            <strong>Action: </strong> {cur.hint}
          </div>
        )}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", pt: 4, borderTop: `1px solid ${t.bd}` }}>
        <div style={{ display: "flex", gap: 4 }}>
          {step > 0 && (
            <Btn t={t} xs onClick={() => setStep(prev => prev - 1)}>
              ◀ Back
            </Btn>
          )}
          {step < steps.length - 1 && (
            <Btn t={t} xs onClick={() => setStep(prev => prev + 1)}>
              Skip
            </Btn>
          )}
        </div>
        <Btn t={t} sm pri onClick={cur.actionFn}>
          {cur.btnText}
        </Btn>
      </div>

      <div style={{ display: "flex", gap: 3, justifyContent: "center", marginTop: 2 }}>
        {steps.map((_, i) => (
          <div
            key={i}
            onClick={() => setStep(i)}
            style={{
              width: 14,
              height: 4,
              borderRadius: 2,
              background: i === step ? t.hi : t.bd,
              cursor: "pointer"
            }}
          />
        ))}
      </div>
    </div>
  );
}
