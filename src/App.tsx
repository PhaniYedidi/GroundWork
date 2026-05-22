import React, { useState, useEffect } from "react";
import { L, D, INIT_WCTX } from "./data";
import { Sidebar } from "./components/Sidebar";
import { Landing as LandingPage, Onboarding } from "./components/AuthScreens";
import { Dashboard as BusinessDashboard, EngineerDashboard, Roadmap as ProjectRoadmap } from "./components/DashboardScreens";
import { DomainContext as DomesticDomainContext, ProjectContext, Transcripts } from "./components/ContextScreens";
import { Discover, ContextChat, Scorecard, Playbook } from "./components/AIWorkflows";
import { Integrations, Export, Team, Notifications, Settings } from "./components/SettingsAndTeam";
import { DemoTour } from "./components/DemoTour";
import { PitchDeck } from "./components/PitchDeck";

export default function App() {
  // Styles & Theme
  const [dark, setDark] = useState<boolean>(() => {
    return localStorage.getItem("groundwork_theme") === "dark";
  });
  const t = dark ? D : L;

  const toggleDark = () => {
    setDark(d => {
      localStorage.setItem("groundwork_theme", !d ? "dark" : "light");
      return !d;
    });
  };

  // Environment Settings — Apply high-contrast safe CSS styles
  useEffect(() => {
    document.body.style.background = t.bg;
    document.body.style.color = t.tx;
    document.body.style.transition = "background-color 0.15s, color 0.15s";
  }, [t]);

  // Routing with URL Deep-Linking and Hash Support
  const [screen, setScreen] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    const screenParam = params.get("screen");
    if (screenParam) return screenParam;

    const hash = window.location.hash.replace("#", "");
    if (hash) return hash;

    return "landing";
  });

  // Keep hash location in sync dynamically
  useEffect(() => {
    const handleHashChange = () => {
      const nextHash = window.location.hash.replace("#", "");
      if (nextHash) {
        setScreen(nextHash);
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Role: business view vs. engineering context view
  const [role, setRole] = useState<"business" | "engineer">("business");

  // Project List State Store with detailed specs for each initiative
  const [projects, setProjects] = useState<any[]>(() => [
    {
      id: "GW-0001",
      n: "Real-time shipment tracker",
      d: "Today",
      sc: 6.8,
      p: 66,
      st: "Scorecard done",
      bc: "blue",
      domain_id: "US-LOGISTICS",
      idea: "Real-time shipment tracker for regional logistics ops with multi-carrier API integration, predictive delays, and instant Slack notifications",
      evalResult: {
        overall: 6.8,
        summary: "High potential for cost savings but relies heavily on legacy carrier EDI interfaces. Recommending early schema-validation sandbox for third-party endpoints.",
        aspects: [
          { name: "Technical Feasibility", score: 6.0, fill: "#3b82f6" },
          { name: "Market Alignment", score: 7.5, fill: "#16a34a" },
          { name: "Security & Scale", score: 7.0, fill: "#3b82f6" },
          { name: "SLA Adherence", score: 6.5, fill: "#3b82f6" }
        ]
      },
      wctx: INIT_WCTX,
      flows: null
    },
    {
      id: "GW-0002",
      n: "Logistics visibility SaaS",
      d: "May 12",
      sc: 8.2,
      p: 100,
      st: "Flows done",
      bc: "green",
      domain_id: "US-LOGISTICS",
      idea: "High-throughput logistics visibility SaaS offering sub-minute container coordinate updates, automated custom clearance checklists, and direct broker dispatch channels",
      evalResult: {
        overall: 8.2,
        summary: "Extremely strong market demand for real-time visibility in maritime channels. Cloud-native architecture matches exact volume expectations. Perfect technical fit.",
        aspects: [
          { name: "Technical Feasibility", score: 8.0, fill: "#16a34a" },
          { name: "Market Alignment", score: 9.0, fill: "#16a34a" },
          { name: "Security & Scale", score: 8.0, fill: "#16a34a" },
          { name: "SLA Adherence", score: 8.0, fill: "#16a34a" }
        ]
      },
      wctx: [
        { id: "la1", label: "Target Sector",   value: "Maritime global freight",          status: "finalized" },
        { id: "la2", label: "Data Source",     value: "AIS GPS satellite feeds",           status: "finalized" },
        { id: "la3", label: "Update SLA",      value: "<3 minute ingestion lag",         status: "finalized" },
        { id: "la4", label: "Database",        value: "TimescaleDB + Redis cache",         status: "finalized" },
        { id: "la5", label: "Key Regulation",  value: "SOLAS container weight verify",    status: "finalized" },
      ],
      flows: [
        { p: 0, n: "Verify container weight", steps: [
          { id:"v1", label:"Receive tare wt",   type:"trigger",  next:"v2" },
          { id:"v2", label:"Match manifest PO", type:"action",   next:"v3" },
          { id:"v3", label:"Weight limit OK?",  type:"decision", yes:"v4", no:"v5" },
          { id:"v4", label:"Seal cargo door",  type:"action",   next:"v6" },
          { id:"v5", label:"Flag discrepancy", type:"action",   next:"v6" },
          { id:"v6", label:"Send manifest",    type:"end" },
        ]}
      ]
    },
    {
      id: "GW-0003",
      n: "AI onboarding assistant",
      d: "May 8",
      sc: 7.5,
      p: 66,
      st: "Scorecard done",
      bc: "blue",
      domain_id: "GLOBAL-HEALTHCARE",
      idea: "AI-powered voice and chat onboarding assistant for rapid integration of third-party contract drivers without manual paperwork",
      evalResult: {
        overall: 7.5,
        summary: "Transforms driver onboarding times from 4 days to 15 minutes. Heavy dependence on OCR reliability and identity verification SDKs.",
        aspects: [
          { name: "Technical Feasibility", score: 7.0, fill: "#3b82f6" },
          { name: "Market Alignment", score: 8.0, fill: "#3b82f6" },
          { name: "Security & Scale", score: 7.5, fill: "#3b82f6" },
          { name: "SLA Adherence", score: 8.0, fill: "#16a34a" }
        ]
      },
      wctx: [
        { id: "ai1", label: "Onboard SLA",     value: "Completed under 15 minutes",       status: "finalized" },
        { id: "ai2", label: "AI Engines",      value: "Gemini 2.5 Flash + Whisper OCR",   status: "finalized" },
        { id: "ai3", label: "ID Verification", value: "Plid / Stripe Identity service",   status: "finalized" },
        { id: "ai4", label: "State Sync",      value: "Redis state lock for voice channel",status: "draft" },
      ],
      flows: null
    },
    {
      id: "GW-0004",
      n: "Supplier portal v2",
      d: "May 1",
      sc: null,
      p: 33,
      st: "In discovery",
      bc: "amber",
      domain_id: "APAC-FINTECH",
      idea: "Supplier collaboration portal v2 with dynamic order acknowledgment schedules, PDF invoice parsing, and multi-tenant billing ledgers",
      evalResult: null,
      wctx: [
        { id: "sp1", label: "Max suppliers",   value: "250 concurrent connections",       status: "draft" },
        { id: "sp2", label: "Auth scheme",     value: "OAuth2 with partner SSO",          status: "draft" },
      ],
      flows: null
    },
    {
      id: "GW-0005",
      n: "Carrier API marketplace",
      d: "Apr 28",
      sc: null,
      p: 10,
      st: "Draft",
      bc: "gray",
      domain_id: "APAC-FINTECH",
      idea: "Consolidated developer platform and API marketplace compiling regional and national carrier logistics contracts under one unified SDK",
      evalResult: null,
      wctx: [
        { id: "cm1", label: "Auth model",      value: "API tokens with rate limiting",    status: "draft" },
      ],
      flows: null
    }
  ]);

  const [activeProjId, setActiveProjId] = useState<string>("GW-0001");
  const [activeDomainId, setActiveDomainId] = useState<string>("US-LOGISTICS");

  // Project Spec Context Data
  const [ctx, setCtx] = useState<any>({
    id: "GW-0001",
    idea: "Real-time shipment tracker for regional logistics ops with multi-carrier API integration, predictive delays, and instant Slack notifications",
    evalResult: {
      overall: 6.8,
      summary: "High potential for cost savings but relies heavily on legacy carrier EDI interfaces. Recommending early schema-validation sandbox for third-party endpoints.",
      aspects: [
        { name: "Technical Feasibility", score: 6.0, fill: "#3b82f6" },
        { name: "Market Alignment", score: 7.5, fill: "#16a34a" },
        { name: "Security & Scale", score: 7.0, fill: "#3b82f6" },
        { name: "SLA Adherence", score: 6.5, fill: "#3b82f6" }
      ]
    },
    domain: "",
    flows: null,
    domain_id: "US-LOGISTICS",
  });

  const upCtx = (fields: any) => setCtx((prev: any) => ({ ...prev, ...fields }));

  const [wctx, setWctx] = useState<any[]>(INIT_WCTX);

  // Synchronize changes made to active context back to projects array dynamically
  useEffect(() => {
    setProjects(prev => prev.map(p => {
      if (p.id === activeProjId) {
        return {
          ...p,
          idea: ctx.idea,
          evalResult: ctx.evalResult,
          flows: ctx.flows,
          wctx: wctx,
          domain_id: ctx.domain_id || p.domain_id
        };
      }
      return p;
    }));
    if (ctx.domain_id) {
      setActiveDomainId(ctx.domain_id);
    }
  }, [ctx.idea, ctx.evalResult, ctx.flows, wctx, activeProjId, ctx.domain_id]);

  // Project Switcher Method
  const handleSelectProject = (projectId: string) => {
    const nextProj = projects.find(p => p.id === projectId);
    if (!nextProj) return;

    setActiveProjId(projectId);
    setCtx({
      id: nextProj.id,
      idea: nextProj.idea,
      evalResult: nextProj.evalResult,
      flows: nextProj.flows,
      domain: nextProj.domain || "",
      domain_id: nextProj.domain_id || "US-LOGISTICS",
    });
    setWctx(nextProj.wctx);
    setActiveDomainId(nextProj.domain_id || "US-LOGISTICS");
  };

  const onToggleWctx = (index: number) => {
    setWctx(prev => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        status: next[index].status === "finalized" ? "draft" : "finalized"
      };
      return next;
    });
  };

  // Integrations state
  const [ints, setInts] = useState<Record<string, boolean>>({
    notion: true,
    clickup: false,
    linear: false,
    jira: false,
  });

  const go = (s: string) => {
    if (s === "dashboard") setRole("business");
    else if (s === "eng-dashboard") setRole("engineer");
    setScreen(s);
    window.location.hash = s;
  };

  // Sub-screens router helper
  const renderScreen = () => {
    switch (screen) {
      // Auth & Onboarding Flow
      case "landing":
        return <LandingPage t={t} go={go} />;
      case "onboarding":
        return <Onboarding t={t} go={go} upCtx={upCtx} />;
      case "dashboard":
        return (
          <BusinessDashboard
            t={t}
            go={go}
            ctx={ctx}
            upCtx={upCtx}
            wctx={wctx}
            role={role}
            setRole={setRole}
            projects={projects}
            onSelectProject={handleSelectProject}
          />
        );
      case "eng-dashboard":
        return (
          <EngineerDashboard
            t={t}
            go={go}
            ctx={ctx}
            upCtx={upCtx}
            wctx={wctx}
            role={role}
            setRole={setRole}
            projects={projects}
            onSelectProject={handleSelectProject}
            activeDomainId={activeDomainId}
            setActiveDomainId={setActiveDomainId}
          />
        );

      // Project Context Screens
      case "context":
        return <DomesticDomainContext t={t} go={go} activeDomainId={activeDomainId} setActiveDomainId={setActiveDomainId} />;
      case "pcontext":
        return <ProjectContext t={t} go={go} wctx={wctx} onToggle={onToggleWctx} idea={ctx.idea} role={role} setRole={setRole} />;
      case "transcripts":
        return <Transcripts t={t} go={go} wctx={wctx} setWctx={setWctx} idea={ctx.idea} />;
      case "roadmap":
        return <ProjectRoadmap t={t} go={go} />;

      // AI Interactive Views
      case "discover":
        return <Discover t={t} go={go} ctx={ctx} upCtx={upCtx} wctx={wctx} onToggle={onToggleWctx} role={role} setRole={setRole} />;
      case "scorecard":
        return <Scorecard t={t} go={go} ctx={ctx} upCtx={upCtx} wctx={wctx} role={role} setRole={setRole} />;
      case "playbook":
        return <Playbook t={t} go={go} ctx={ctx} upCtx={upCtx} isBlueprint={false} role={role} setRole={setRole} />;
      case "blueprint":
        return <Playbook t={t} go={go} ctx={ctx} upCtx={upCtx} isBlueprint={true} role={role} setRole={setRole} />;
      case "context-chat":
        return (
          <ContextChat
            t={t}
            go={go}
            ctx={ctx}
            wctx={wctx}
            onToggle={onToggleWctx}
            role={role}
            setRole={setRole}
            activeDomainId={activeDomainId}
            setActiveDomainId={setActiveDomainId}
            projects={projects}
            onSelectProject={handleSelectProject}
          />
        );

      // Settings and Management Tools
      case "integrations":
        return <Integrations t={t} go={go} ints={ints} setInts={setInts} />;
      case "export":
        return <Export t={t} go={go} ctx={ctx} ints={ints} />;
      case "team":
        return <Team t={t} go={go} />;
      case "notifications":
        return <Notifications t={t} go={go} />;
      case "settings":
        return <Settings t={t} go={go} dark={dark} toggleDark={toggleDark} />;
      case "pitchdeck":
        return <PitchDeck t={t} go={go} />;

      default:
        return <LandingPage t={t} go={go} />;
    }
  };

  // Full-app immersive screen layout shell
  const hasSidebar = !["landing", "onboarding", "pitchdeck"].includes(screen);

  return (
    <div
      id="app-container"
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        background: t.bg,
        color: t.tx,
        overflow: "hidden",
        fontFamily: "Inter, sans-serif"
      }}
    >
      {hasSidebar && (
        <Sidebar
          t={t}
          screen={screen}
          go={go}
          dark={dark}
          toggleDark={toggleDark}
          role={role}
          setRole={setRole}
          ctx={ctx}
        />
      )}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {renderScreen()}
      </div>
      {hasSidebar && (
        <DemoTour
          t={t}
          screen={screen}
          go={go}
          role={role}
          setRole={setRole}
          wctx={wctx}
          setWctx={setWctx}
        />
      )}
    </div>
  );
}
