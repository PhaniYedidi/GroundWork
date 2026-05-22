import React, { useState, useEffect, useRef } from "react";
import { Btn, Badge, Topbar, Filterbar, Metric, Card, CardHeader, PBar } from "./CoreUI";
import { ROADMAP_DATA, scol, pcol, DOMAINS_DATA, FILES_DEMO, callOpenAI } from "../data";

interface DashboardProps {
  t: any;
  go: (s: string) => void;
  ints?: any;
  ctx?: any;
  upCtx?: any;
  wctx?: any[];
  role?: "business" | "engineer";
  setRole?: (r: "business" | "engineer") => void;
  projects?: any[];
  onSelectProject?: (projectId: string) => void;
}

export function Dashboard({ t, go, ints = { notion: true }, ctx, upCtx, wctx, role, setRole, projects = [], onSelectProject }: DashboardProps) {
  const connCount = Object.values(ints).filter(Boolean).length;
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Topbar t={t} title="Dashboard" role={role} setRole={setRole} currentScreen="dashboard" go={go}>
        <Btn t={t} sm ghost><i className="ti ti-filter" style={{ fontSize: 12 }} /></Btn>
        <Btn t={t} sm ghost onClick={() => go("integrations")}><i className="ti ti-plug" style={{ fontSize: 12 }} /> {connCount} integrations</Btn>
        <Btn t={t} sm pri onClick={() => go("discover")}><i className="ti ti-plus" style={{ fontSize: 12 }} /> New project</Btn>
      </Topbar>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", borderBottom: `1px solid ${t.bd}` }}>
        <Metric t={t} label="Projects"       value={String(projects.length)}   sub="Active workspace" delta="↑ 2 this month" />
        <Metric t={t} label="Flows done"     value={String(projects.filter(p => p.flows || p.p === 100).length)}   sub="Engineering-ready" />
        <Metric t={t} label="Avg scorecard"  value="7.5" sub="Out of 10" />
        <Metric t={t} label="Product Domains" value="3" sub="Core knowledge bases" />
        <Metric t={t} label="Integrations"   value={String(connCount)} sub={<span style={{ cursor: "pointer", textDecoration: "underline" }} onClick={() => go("integrations")}>Manage</span>} last />
      </div>

      {/* Living Brain Active Sync Callout */}
      <div style={{ background: t.al, borderBottom: `1px solid ${t.bd}`, padding: "10px 18px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 9, fontWeight: 800, color: t.hi, background: t.hi + "15", padding: "2px 8px", borderRadius: 4, textTransform: "uppercase" }}>Continuous Intake</span>
          <span style={{ fontSize: 11.5, color: t.sub }}>
            💡 <strong>Discovery is done but engineering is guessing?</strong> Stop requirements drift. Import customer call transcripts or legal drafts to the continuous graph immediately.
          </span>
        </div>
        <Btn t={t} xs pri onClick={() => go("transcripts")} style={{ whiteSpace: "nowrap" }}>
          <i className="ti ti-upload" /> Open Knowledge Intake Hub
        </Btn>
      </div>

      <Filterbar t={t} selects={[["Status",["All","In discovery","Scorecard done","Flows done","Draft"]],["Updated",["Today","This week","Month"]],["Sort",["Last updated","Score ↓","Status"]]]} />
      <div style={{ flex: 1, overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ background: t.al, position: "sticky", top: 0, zIndex: 2 }}>
              <th style={{ width: 32, padding: "7px 14px", textAlign: "left", borderBottom: `1px solid ${t.bd}`, color: t.sub, fontWeight: 500, fontSize: 11 }} />
              {["Project ID | Date","Project name","Progress","Scorecard","Status",""].map(h => (
                <th key={h} style={{ textAlign: "left", padding: "7px 14px", color: t.sub, fontWeight: 500, fontSize: 11, borderBottom: `1px solid ${t.bd}`, whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {projects.map(p => {
              const isSelected = p.id === ctx?.id;
              return (
                <tr key={p.id} onClick={() => { onSelectProject?.(p.id); go("discover"); }} style={{ cursor: "pointer", borderBottom: `1px solid ${t.bd}`, background: isSelected ? t.al : "transparent" }}>
                  <td style={{ padding: "9px 14px" }}><input type="checkbox" onClick={e => e.stopPropagation()} checked={isSelected} readOnly /></td>
                  <td style={{ padding: "9px 14px" }}>
                    <div style={{ fontWeight: 600, fontSize: 12, textDecoration: "underline", textUnderlineOffset: 2 }}>{p.id}</div>
                    <div style={{ color: t.mu, fontSize: 11, marginTop: 1 }}>{p.d}</div>
                  </td>
                  <td style={{ padding: "9px 14px", fontWeight: 500 }}>{p.n}</td>
                  <td style={{ padding: "9px 14px" }}>
                    <div style={{ fontSize: 11, color: t.mu, marginBottom: 3 }}>{p.p}%</div>
                    <PBar pct={p.p} color={pcol(p.p)} width={72} />
                  </td>
                  <td style={{ padding: "9px 14px" }}>
                    {p.sc ? <><span style={{ fontWeight: 700, color: scol(p.sc) }}>{p.sc}</span><span style={{ color: t.mu, fontSize: 11 }}>/10</span></> : <span style={{ color: t.mu }}>—</span>}
                  </td>
                  <td style={{ padding: "9px 14px" }}><Badge t={t} label={p.st} color={p.bc} /></td>
                  <td style={{ padding: "9px 14px" }}><i className="ti ti-dots" style={{ color: t.mu }} /></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

interface EngineerDashboardProps {
  t: any;
  go: (s: string) => void;
  ctx: any;
  wctx: any[];
  upCtx?: any;
  role?: "business" | "engineer";
  setRole?: (r: "business" | "engineer") => void;
  projects?: any[];
  onSelectProject?: (projectId: string) => void;
  activeDomainId: string;
  setActiveDomainId: (id: string) => void;
}

export function EngineerDashboard({
  t,
  go,
  ctx,
  wctx,
  upCtx,
  role,
  setRole,
  projects = [],
  onSelectProject,
  activeDomainId,
  setActiveDomainId
}: EngineerDashboardProps) {

  // Resolve current active Domain object
  const dObj = DOMAINS_DATA.find(d => d.id === activeDomainId) || DOMAINS_DATA[0];

  // Projects belonging strictly to this domain
  const domainProjects = projects.filter(p => p.domain_id === activeDomainId);

  // Fallback / Auto-sync project selection: if current selected project is not in this domain, auto-select first project of active domain
  useEffect(() => {
    if (ctx && ctx.domain_id !== activeDomainId && domainProjects.length > 0) {
      onSelectProject?.(domainProjects[0].id);
    }
  }, [activeDomainId, ctx?.domain_id, domainProjects.length]);

  // General Domain Guidelines for details panel
  const sections = dObj.sections;

  // Finalized Decisions local state & input handlers
  const [decisions, setDecisions] = useState<any[]>([]);
  const [newLabel, setNewLabel] = useState("");
  const [newValue, setNewValue] = useState("");

  // Sync finalized items of current active project
  useEffect(() => {
    const defaultDecisions = wctx.filter(item => item.status === "finalized");
    setDecisions(defaultDecisions);
  }, [wctx, ctx?.id]);

  const handleAddDecision = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLabel.trim() || !newValue.trim()) return;
    const item = {
      id: "custom-" + Date.now(),
      label: newLabel.trim(),
      value: newValue.trim(),
      status: "finalized"
    };
    setDecisions(prev => [...prev, item]);
    setNewLabel("");
    setNewValue("");
  };

  // Local File Uploader State
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [mockFileName, setMockFileName] = useState("");
  const [mockFileType, setMockFileType] = useState("API Reference");

  // Sync default mock files matching current selected project based on FILES_DEMO
  useEffect(() => {
    if (ctx?.id) {
      const matched = FILES_DEMO.filter(f => f.proj === ctx.id || f.proj === "All");
      setUploadedFiles(matched);
    }
  }, [ctx?.id]);

  const handleMockUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mockFileName.trim()) return;
    const ext = mockFileType === "API Reference" ? ".yaml" : mockFileType === "SDK Documentation" ? ".md" : ".txt";
    const file = {
      name: mockFileName.trim().replace(/\s+/g, "_") + ext,
      type: mockFileType,
      proj: ctx?.id || "GW-0001",
      size: `${Math.floor(Math.random() * 80) + 10} KB`,
      date: "Today",
      status: "Processed",
      insights: Math.floor(Math.random() * 5) + 1,
      icon: mockFileType === "API Reference" ? "ti-code" : "ti-file-text"
    };
    setUploadedFiles(prev => [...prev, file]);
    setMockFileName("");
  };

  const handleRemoveFile = (fileName: string) => {
    setUploadedFiles(prev => prev.filter(f => f.name !== fileName));
  };

  // State for Chat console
  const [chatMsgs, setChatMsgs] = useState<any[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Sync Welcome Message when project, domain or file counts change
  useEffect(() => {
    if (ctx?.id) {
      setChatMsgs([
        {
          role: "assistant",
          content: `### 🧠 AI Brain Aligned & Ready

I have compiled the full technical context for **${ctx.id} (${ctx.n})** operating under **${dObj.n}** constraints.

**Context Resources Read by Brain:**
* **General Domain Information**: ${sections.length} product specification sections active.
* **Project Decisions Made**: ${decisions.length} finalized decisions synchronized.
* **Uploaded Files**: ${uploadedFiles.length} file streams indexed.

Ask me anything about drafting schemas, mocking API calls, or structuring the React code strictly within these boundaries!`
        }
      ]);
    }
  }, [ctx?.id, activeDomainId, decisions.length, uploadedFiles.length]);

  // Scroll chat to bottom
  useEffect(() => {
    if (chatBottomRef.current) {
      chatBottomRef.current.scrollTop = chatBottomRef.current.scrollHeight;
    }
  }, [chatMsgs, chatLoading]);

  const handleSendChatMsg = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const nextMsgs = [...chatMsgs, { role: "user", content: chatInput }];
    setChatMsgs(nextMsgs);
    setChatInput("");
    setChatLoading(true);

    // Build the complete localized knowledge system prompt
    const decisionsStr = decisions.map(d => `* ${d.label}: ${d.value}`).join("\n");
    const domainStr = sections.map(s => `* ${s.cat}:\n` + s.entries.map(e => `  - ${e.k}: ${e.v}`).join("\n")).join("\n");
    const uploadedStr = uploadedFiles.map(f => `* ${f.name} (${f.type})`).join("\n");

    const systemPrompt = `You are an expert engineer's context-aware Brain Assistant.
You have access to the absolute truth of technical decisions and rules for this workspace:

- Active Project ID: ${ctx?.id || "GW-0001"}
- Project Name: ${ctx?.n || "Real-time tracker"}
- Active Workspace Domain: ${dObj.n}

--- CORE ALIGNED DECISIONS ---
${decisionsStr || "No finalized decisions recorded yet."}

--- WORKSPACE CONSTRAINTS ---
${domainStr}

--- INDEXED DOCUMENTS & ATTACHMENTS ---
${uploadedStr || "No custom files uploaded."}

Provide crisp, production-grade technical code snippets, database schemas (SQL/TimescaleDB), API specs, or task decomposition. Never refer to unrequested PM discovery questionnaires or market evaluation reports. Keep content purely focused on backend, UI framework, or technical constraints.`;

    try {
      const reply = await callOpenAI(nextMsgs, systemPrompt);
      setChatMsgs(prev => [...prev, { role: "assistant", content: reply }]);
    } catch (err) {
      setChatMsgs(prev => [...prev, { role: "assistant", content: "Error communicating with AI Brain proxy. Please check connection." }]);
    } finally {
      setChatLoading(false);
    }
  };

  const domainTabs = [
    { id: "US-LOGISTICS", n: "US Logistics & Freight Ops", icon: "ti-truck" },
    { id: "GLOBAL-HEALTHCARE", n: "Subscription SaaS & Payments Hub", icon: "ti-credit-card" },
    { id: "APAC-FINTECH", n: "Real-time Collaboration & AI Canvas", icon: "ti-layers" }
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: t.bg }}>
      
      {/* Primary Navigation Topbar */}
      <Topbar t={t} title="Engineering Developer Workspace" role={role} setRole={setRole} currentScreen="eng-dashboard" go={go}>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn t={t} sm onClick={() => go("blueprint")}><i className="ti ti-git-branch" /> Open Blueprint</Btn>
          <Btn t={t} sm ghost onClick={() => go("export")}><i className="ti ti-download" /> Export Code</Btn>
        </div>
      </Topbar>

      {/* DOMAIN SELECTION - AT THE VERY TOP */}
      <div style={{ background: t.surf, borderBottom: `1px solid ${t.bd}`, padding: "12px 20px 0", flexShrink: 0 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: t.mu, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>
          1. Active Project Core Domain Context
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          {domainTabs.map(tab => {
            const isSel = tab.id === activeDomainId;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveDomainId(tab.id)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "10px 16px",
                  borderRadius: "8px 8px 0 0",
                  fontSize: 12,
                  fontWeight: isSel ? 700 : 500,
                  background: isSel ? t.bg : "transparent",
                  color: isSel ? t.tx : t.sub,
                  border: `1px solid ${isSel ? t.bd : "transparent"}`,
                  borderBottom: `1px solid ${isSel ? t.bg : "transparent"}`,
                  cursor: "pointer",
                  transition: "color 0.15s ease",
                  fontFamily: "inherit",
                  position: "relative",
                  top: 1
                }}
              >
                <i className={`ti ${tab.icon}`} style={{ fontSize: 15, color: isSel ? t.hi : t.mu }} />
                <span>{tab.n}</span>
                {isSel && (
                  <div style={{ position: "absolute", bottom: -1, left: 0, right: 0, height: 2, background: t.hi }} />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* PROJECTS SWITCHER ROW - NESTED UNDER DOMAIN */}
      <div style={{ background: t.surf, borderBottom: `1px solid ${t.bd}`, padding: "10px 20px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0 }}>
        <div style={{ fontSize: 10, fontWeight: 700, color: t.mu, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          2. Projects in {dObj.n}:
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", flex: 1 }}>
          {domainProjects.map(p => {
            const isSel = p.id === ctx?.id;
            return (
              <button
                key={p.id}
                onClick={() => onSelectProject?.(p.id)}
                style={{
                  padding: "5px 12px",
                  borderRadius: 16,
                  fontSize: 11,
                  fontWeight: isSel ? 700 : 500,
                  background: isSel ? t.tx : t.al,
                  color: isSel ? t.surf : t.sub,
                  border: `1px solid ${isSel ? t.tx : t.bd}`,
                  cursor: "pointer",
                  transition: "all 0.1s ease",
                  fontFamily: "inherit"
                }}
              >
                <strong>{p.id}</strong> · {p.n}
              </button>
            );
          })}
          {domainProjects.length === 0 && (
            <span style={{ fontSize: 11, color: t.mu, fontStyle: "italic" }}>No active projects recorded for this domain. Click Business Track to add.</span>
          )}
        </div>
      </div>

      {/* INTERACTIVE WORKSPACE VIEW (WHEN PORTFOLIO PROJECT SELECTED) */}
      {ctx?.id ? (
        <div style={{ flex: 1, display: "flex", padding: 18, gap: 16, overflow: "hidden" }} className="flex-col lg:flex-row">
          
          {/* LEFT PANEL: DECISIVE SCOPE CONTRAINTS (Decisions & Guidelines) */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14, overflowY: "auto", minWidth: 0 }}>
            
            {/* Project identity header */}
            <div style={{ background: t.surf, border: `1px solid ${t.bd}`, borderRadius: 8, padding: "14px 16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                <span style={{ fontSize: 10, fontWeight: 700, color: t.mu, textTransform: "uppercase", letterSpacing: "0.06em" }}>Project Scope Aligned</span>
                <Badge t={t} label={ctx.st} color={ctx.bc} />
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, lineHeight: 1.4, color: t.tx }}>{ctx.idea}</div>
            </div>

            {/* Decisions Made Panel */}
            <div style={{ background: t.surf, border: `1px solid ${t.bd}`, borderRadius: 8, padding: "14px 16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <i className="ti ti-checklist" style={{ fontSize: 16, color: t.gr }} />
                  <strong style={{ fontSize: 13, color: t.tx }}>Project Decisions & Specifications</strong>
                </div>
                <span style={{ fontSize: 11, color: t.mu, fontWeight: 500 }}>{decisions.length} Lockouts</span>
              </div>

              {/* Add Custom Decision quick interactive form */}
              <form onSubmit={handleAddDecision} style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <input
                  type="text"
                  placeholder="Decision point (e.g. Host SLA)"
                  value={newLabel}
                  onChange={e => setNewLabel(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "5px 8px",
                    fontSize: 11,
                    border: `1px solid ${t.bd}`,
                    background: t.bg,
                    color: t.tx,
                    borderRadius: 4,
                    outline: "none"
                  }}
                />
                <input
                  type="text"
                  placeholder="Value/Detail (e.g. 99.9% uptime)"
                  value={newValue}
                  onChange={e => setNewValue(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "5px 8px",
                    fontSize: 11,
                    border: `1px solid ${t.bd}`,
                    background: t.bg,
                    color: t.tx,
                    borderRadius: 4,
                    outline: "none"
                  }}
                />
                <Btn t={t} xs pri type="submit">Lock</Btn>
              </form>

              {/* Decisions listing */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {decisions.map(d => (
                  <div
                    key={d.id}
                    style={{
                      display: "flex",
                      alignItems: "start",
                      justifyContent: "space-between",
                      padding: "8px 12px",
                      background: t.al,
                      border: `1px solid ${t.bd}`,
                      borderRadius: 6,
                      fontSize: 11.5
                    }}
                  >
                    <div style={{ flex: 1, minWidth: 0, paddingRight: 10 }}>
                      <span style={{ fontWeight: 600, color: t.tx }}>{d.label}: </span>
                      <span style={{ color: t.sub }}>{d.value}</span>
                    </div>
                    <Badge t={t} label="Locked" color="black" />
                  </div>
                ))}
                {decisions.length === 0 && (
                  <div style={{ textStyle: "italic", fontSize: 11, color: t.mu, textAlign: "center", padding: "12px 0" }}>
                    No decisions have been marked as finalized yet.
                  </div>
                )}
              </div>
            </div>

            {/* General Domain level guidelines of this project */}
            <div style={{ background: t.surf, border: `1px solid ${t.bd}`, borderRadius: 8, padding: "14px 16px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <i className="ti ti-world" style={{ fontSize: 16, color: t.hi }} />
                <strong style={{ fontSize: 13, color: t.tx }}>{dObj.n} — General Domain Guidelines</strong>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {sections.map(sec => (
                  <div key={sec.cat} style={{ borderBottom: `1px solid ${t.bd}`, paddingBottom: 10, lastChild: { border: "none" } } as any}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: t.hi, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 6 }}>
                      {sec.cat}
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      {sec.entries.map(e => (
                        <div key={e.k} style={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: 10, fontSize: 11 }}>
                          <span style={{ fontWeight: 600, color: t.sub }}>{e.k}</span>
                          <span style={{ color: t.tx, lineHeight: 1.4 }}>{e.v} <span style={{ fontSize: 9, color: t.mu }}>({e.src})</span></span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT PANEL: COGNITIVE SERVICES (File Uploader & Context Chat) */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 14, minWidth: 0 }}>
            
            {/* FILE UPLOADER -> Feeds AI Context */}
            <div style={{ background: t.surf, border: `1px solid ${t.bd}`, borderRadius: 8, padding: "14px 16px", flexShrink: 0 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <i className="ti ti-upload-cloud" style={{ fontSize: 16, color: t.hi }} />
                  <strong style={{ fontSize: 13, color: t.tx }}>Brain Context Files Uploader</strong>
                </div>
                <Badge t={t} label={`🧠 Active: ${uploadedFiles.length} Docs`} color="green" />
              </div>

              {/* Upload Drag simulator */}
              <div
                style={{
                  border: `2px dashed ${t.bd2}`,
                  borderRadius: 6,
                  padding: "12px 14px",
                  textAlign: "center",
                  background: t.al,
                  marginBottom: 10,
                  cursor: "pointer"
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 2 }}>Drag API specs, logs or code files here</div>
                <div style={{ fontSize: 9, color: t.mu }}>Instant semantic indexing of payloads into AI Brain context</div>
              </div>

              {/* Mock upload controls */}
              <form onSubmit={handleMockUpload} style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                <input
                  type="text"
                  placeholder="Doc file name (e.g. telemetry_api_v2)"
                  value={mockFileName}
                  onChange={e => setMockFileName(e.target.value)}
                  style={{
                    flex: 1,
                    padding: "5px 8px",
                    fontSize: 11,
                    border: `1px solid ${t.bd}`,
                    background: t.bg,
                    color: t.tx,
                    borderRadius: 4,
                    outline: "none"
                  }}
                />
                <select
                  value={mockFileType}
                  onChange={e => setMockFileType(e.target.value)}
                  style={{
                    padding: "4px 8px",
                    fontSize: 11,
                    border: `1px solid ${t.bd}`,
                    background: t.bg,
                    color: t.tx,
                    borderRadius: 4,
                    outline: "none"
                  }}
                >
                  <option>API Reference</option>
                  <option>SDK Documentation</option>
                  <option>Server Logs</option>
                </select>
                <Btn t={t} xs pri type="submit">Index</Btn>
              </form>

              {/* List of uploaded files / files under current project */}
              <div style={{ maxHeight: 110, overflowY: "auto", display: "flex", flexDirection: "column", gap: 5 }}>
                {uploadedFiles.map(file => (
                  <div
                    key={file.name}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "4px 8px",
                      background: t.bg,
                      borderRadius: 4,
                      fontSize: 10.5,
                      border: `1px solid ${t.bd}`
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 6, minWidth: 0 }}>
                      <i className="ti ti-file" style={{ fontSize: 12, color: t.hi }} />
                      <span style={{ fontWeight: 600, color: t.tx, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {file.name}
                      </span>
                      <span style={{ color: t.mu, fontSize: 9 }}>({file.type} · {file.size})</span>
                    </div>
                    <button
                      onClick={() => handleRemoveFile(file.name)}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: t.re,
                        cursor: "pointer",
                        fontSize: 10,
                        padding: "2px 6px"
                      }}
                      title="Delete Context File"
                    >
                      Delete
                    </button>
                  </div>
                ))}
                {uploadedFiles.length === 0 && (
                  <div style={{ fontStyle: "italic", fontSize: 10, color: t.mu, textAlign: "center" }}>
                    No telemetry context loaded. Type a name above to parse a mock file.
                  </div>
                )}
              </div>
            </div>

            {/* INTEGRATED CONTEXT CHAT CONSOLE */}
            <div style={{ background: t.surf, border: `1px solid ${t.bd}`, borderRadius: 8, display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
              <div style={{ padding: "10px 14px", borderBottom: `1px solid ${t.bd}`, display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                <i className="ti ti-brain" style={{ fontSize: 16, color: t.hi }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: t.tx }}>Embedded Aligned Chat Console</span>
                <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 10, background: t.hi + "22", color: t.hi, marginLeft: "auto", fontWeight: 700 }}>
                  Active Context Aligned
                </span>
              </div>

              {/* Chat Thread */}
              <div
                ref={chatBottomRef}
                style={{
                  flex: 1,
                  padding: 12,
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  background: t.bg
                }}
              >
                {chatMsgs.map((m, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: m.role === "user" ? "flex-end" : "flex-start",
                      maxWidth: "100%"
                    }}
                  >
                    <div style={{ fontSize: 9, color: t.mu, marginBottom: 2, fontWeight: 600 }}>
                      {m.role === "user" ? "Developer" : `AI Brain (${ctx.id})`}
                    </div>
                    <div
                      style={{
                        padding: "8px 12px",
                        fontSize: 11.5,
                        lineHeight: 1.5,
                        borderRadius: m.role === "user" ? "8px 8px 0 8px" : "8px 8px 8px 0",
                        background: m.role === "user" ? t.tx : t.surf,
                        color: m.role === "user" ? t.surf : t.tx,
                        border: `1px solid ${t.bd}`,
                        whiteSpace: "pre-line",
                        maxWidth: "85%",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
                      }}
                    >
                      {/* Highlight bullet points for neat rendering */}
                      {m.content}
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div style={{ display: "flex", gap: 6, alignItems: "center", color: t.mu, fontSize: 11, padding: "6px" }}>
                    <i className="ti ti-loader" style={{ animation: "spin 1s linear infinite" }} />
                    <span>AI brain absorbing your query features...</span>
                  </div>
                )}
              </div>

              {/* Chat Input Bar */}
              <div style={{ padding: 8, background: t.surf, borderTop: `1px solid ${t.bd}`, display: "flex", gap: 6, flexShrink: 0 }}>
                <input
                  type="text"
                  placeholder={`Ask a dev question on ${ctx.id} under ${dObj.n}...`}
                  value={chatInput}
                  onChange={e => setChatInput(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") handleSendChatMsg(); }}
                  style={{
                    flex: 1,
                    padding: "6px 12px",
                    background: t.bg,
                    color: t.tx,
                    border: `1px solid ${t.bd}`,
                    borderRadius: 6,
                    fontSize: 11.5,
                    outline: "none"
                  }}
                />
                <Btn t={t} sm pri onClick={handleSendChatMsg} disabled={chatLoading}>
                  Send
                </Btn>
              </div>
            </div>

          </div>

        </div>
      ) : (
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: t.mu, fontSize: 13, textStyle: "italic" }}>
          Please select or register a sibling project for active development workspace.
        </div>
      )}

    </div>
  );
}

export function Roadmap({ t, go }: { t: any; go: (s: string) => void }) {
  const phaseColor = { Idea:"gray" as const, Discovery:"amber" as const, Scorecard:"blue" as const, Build:"black" as const, Shipped:"green" as const };
  const priColor   = { Critical: t.re, High: t.am, Medium: t.hi, Low: t.mu };
  const stColor    = { Active:"black" as const, Planned:"blue" as const, Backlog:"gray" as const };
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Topbar t={t} title="Roadmap" sub="5 initiatives">
        <Btn t={t} sm pri onClick={() => go("discover")}><i className="ti ti-plus" style={{ fontSize: 12 }} /> Add initiative</Btn>
      </Topbar>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", borderBottom: `1px solid ${t.bd}` }}>
        <Metric t={t} label="In discovery" value="2" />
        <Metric t={t} label="In scorecard" value="1" />
        <Metric t={t} label="In build"     value="1" />
        <Metric t={t} label="Backlog"      value="1" last />
      </div>
      <Filterbar t={t} selects={[["Phase",["All","Idea","Discovery","Scorecard","Build","Shipped"]],["Priority",["All","Critical","High","Medium","Low"]],["Quarter",["All","Q2 2026","Q3 2026","Q4 2026"]]]} />
      <div style={{ flex: 1, overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
          <thead>
            <tr style={{ background: t.al, position: "sticky", top: 0, zIndex: 2 }}>
              {["","ID | Owner","Initiative","Phase","Priority","Scorecard","Quarter","Status",""].map((h,i) => (
                <th key={i} style={{ textAlign: "left", padding: "7px 14px", color: t.sub, fontWeight: 500, fontSize: 11, borderBottom: `1px solid ${t.bd}`, whiteSpace: "nowrap" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROADMAP_DATA.map(p => (
              <tr key={p.id} onClick={() => go("discover")} style={{ cursor: "pointer", borderBottom: `1px solid ${t.bd}` }}>
                <td style={{ padding: "9px 14px", width: 32 }}><input type="checkbox" onClick={e => e.stopPropagation()} /></td>
                <td style={{ padding: "9px 14px" }}>
                  <div style={{ fontWeight: 600, fontSize: 12, textDecoration: "underline", textUnderlineOffset: 2 }}>{p.id}</div>
                  <div style={{ fontSize: 11, color: t.mu }}>{p.owner}</div>
                </td>
                <td style={{ padding: "9px 14px", fontWeight: 500 }}>{p.n}</td>
                <td style={{ padding: "9px 14px" }}><Badge t={t} label={p.phase} color={phaseColor[p.phase] || "gray"} /></td>
                <td style={{ padding: "9px 14px" }}><span style={{ fontSize: 12, fontWeight: 700, color: priColor[p.pri] || t.mu }}>{p.pri}</span></td>
                <td style={{ padding: "9px 14px" }}>
                  {p.sc ? <><span style={{ fontWeight: 700, color: scol(p.sc) }}>{p.sc}</span><span style={{ color: t.mu, fontSize: 11 }}>/10</span></> : <span style={{ color: t.mu }}>—</span>}
                </td>
                <td style={{ padding: "9px 14px", color: t.sub }}>{p.q}</td>
                <td style={{ padding: "9px 14px" }}><Badge t={t} label={p.st} color={stColor[p.st] || "gray"} /></td>
                <td style={{ padding: "9px 14px" }}><i className="ti ti-dots" style={{ color: t.mu }} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
export { pcol };
export { scol };
