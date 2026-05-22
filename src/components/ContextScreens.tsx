import React from "react";
import { Btn, Badge, Topbar, Filterbar, Card, CardHeader } from "./CoreUI";
import { FILES_DEMO, scol, DOMAINS_DATA } from "../data";

interface DomainContextProps {
  t: any;
  go: (s: string) => void;
  activeDomainId: string;
  setActiveDomainId: (id: string) => void;
}

export function DomainContext({ t, go, activeDomainId, setActiveDomainId }: DomainContextProps) {
  // Find current domain
  const dObj = DOMAINS_DATA.find(d => d.id === activeDomainId) || DOMAINS_DATA[0];
  const sections = dObj.sections;
  const [activeTab, setActiveTab] = React.useState<"product" | "engineering">("product");
  const [searchQuery, setSearchQuery] = React.useState("");

  // Simulated live playground query for Day-0 aligned team members
  const [simulationPrompt, setSimulationPrompt] = React.useState("");
  const [simulationAnswer, setSimulationAnswer] = React.useState("");
  const [simIsLoading, setSimIsLoading] = React.useState(false);

  React.useEffect(() => {
    // Pick a default generic question based on domain ID
    if (activeDomainId === "US-LOGISTICS") {
      setSimulationPrompt("What is the GPS transit polling refresh cycle we agreed on?");
      setSimulationAnswer("Active US Freight telemetry mandates GPS pull cycles restricted between 10-25 minutes. Developers are syncing this parameter under the logistics network tab, ensuring we don't spam carrier endpoints to prevent IP rate-limiting.");
    } else if (activeDomainId === "GLOBAL-HEALTHCARE") {
      setSimulationPrompt("How is the Stripe subscription webhook status mapped?");
      setSimulationAnswer("We sync webhook status on client ledger screens under a 250ms latency SLA, avoiding complex socket setups and using simple REST polling endpoints where appropriate for the first build.");
    } else {
      setSimulationPrompt("How do we handle WebSocket messaging transit failure delays?");
      setSimulationAnswer("Active collaboration browser events must execute within 80ms bounds. We enforce Postgres transactional row locks for entity schema state modifications. Teams starting on Day-0 see this baseline instantly.");
    }
  }, [activeDomainId]);

  const runSimulationQuery = () => {
    setSimIsLoading(true);
    setTimeout(() => {
      setSimIsLoading(false);
      if (simulationPrompt.toLowerCase().includes("api") || simulationPrompt.toLowerCase().includes("limit") || simulationPrompt.toLowerCase().includes("delay") || simulationPrompt.toLowerCase().includes("response")) {
        setSimulationAnswer(`[Synapse IQ Search]: Under the locked metadata parameters for ${dObj.n}, all outbound responses require a custom payload filter spec. This is hard-locked at source. No extra negotiation required.`);
      } else {
        setSimulationAnswer(`[Active Domain Synapse]: Resolved directly against ${dObj.n} baseline. Teams starting on Day-0 read this live knowledge schema instantly without waiting weeks for product handovers.`);
      }
    }, 450);
  };

  // Filter entries based on search
  const filteredSections = sections.map(sec => {
    const matchingEntries = sec.entries.filter(e => 
      e.k.toLowerCase().includes(searchQuery.toLowerCase()) || 
      e.v.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.src.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return { ...sec, entries: matchingEntries };
  }).filter(sec => sec.entries.length > 0);

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: t.bg }}>
      <Topbar t={t} title="Domain Context" sub="Zero-Friction Cross-Project Onboarding & Product Knowledge Graph">
        <Btn t={t} sm pri onClick={() => go("dashboard")}><i className="ti ti-arrow-left" style={{ fontSize: 12 }} /> Back to Dashboard</Btn>
      </Topbar>
      
      {/* Domain Switcher Menu */}
      <div style={{ background: t.surf, borderBottom: `1px solid ${t.bd}`, padding: "12px 20px", display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <i className="ti ti-arrows-left-right" style={{ fontSize: 13, color: t.hi }} />
          <span style={{ fontSize: 10, fontWeight: 800, color: t.mu, textTransform: "uppercase", letterSpacing: "0.08em" }}>Switch Active Project Domain:</span>
        </div>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {DOMAINS_DATA.map(d => {
            const isSel = d.id === activeDomainId;
            return (
              <button
                key={d.id}
                onClick={() => setActiveDomainId(d.id)}
                style={{
                  padding: "6px 14px",
                  borderRadius: 18,
                  fontSize: 11,
                  fontWeight: isSel ? 800 : 500,
                  background: isSel ? t.tx : t.al,
                  color: isSel ? t.surf : t.sub,
                  border: `1px solid ${isSel ? t.tx : t.bd}`,
                  cursor: "pointer",
                  transition: "all 0.1s ease",
                  fontFamily: "inherit",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 5
                }}
              >
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: isSel ? t.gr : t.mu }} />
                {d.n}
              </button>
            );
          })}
        </div>
      </div>

      {/* CORE VALUE BLOCK: RAMP TIME ACCELERATOR */}
      <div style={{ background: t.surf, borderBottom: `1px solid ${t.bd}`, padding: "20px 24px", display: "flex", flexWrap: "wrap", gap: 24, flexShrink: 0 }}>
        
        {/* Alignment Stats Slider */}
        <div style={{ flex: "1 1 300px", minWidth: 280, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 9, fontWeight: 800, color: t.hi, letterSpacing: "0.1em", textTransform: "uppercase" }}>THE DAY-0 SOLUTION</div>
          <h2 style={{ fontSize: 18, fontWeight: 800, letterSpacing: "-0.03em", color: t.tx, margin: 0, lineHeight: 1.25 }}>
            Accelerating Team Context Loading
          </h2>
          <p style={{ fontSize: 12, color: t.sub, lineHeight: 1.6, margin: 0 }}>
            Normally, switching a product designer or developer to a new project requires 2-3 weeks of slow meetings, handoffs, and reading obsolete wikis.
            Groundwork aligns both sides of the aisle to <strong>instant Day-0 understanding</strong> by wrapping the system brain directly around this active industry graph.
          </p>
          <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
            <Badge t={t} label="No Onboarding Drifts" color="green" />
            <Badge t={t} label="Zero Meeting Overflows" color="black" />
          </div>
        </div>

        {/* Visual Benchmark Card */}
        <div style={{ flex: "1 1 420px", minWidth: 320, background: t.al, borderRadius: 8, padding: 16, border: `1px solid ${t.bd}`, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontSize: 11, fontWeight: 800, color: t.tx }}>Ramp-Up Benchmark Comparison</span>
            <span style={{ fontSize: 10, color: t.gr, fontWeight: 700 }}><i className="ti ti-trending-down" /> -95% Friction Drop</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {/* Legacy Track */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, marginBottom: 3 }}>
                <span style={{ color: t.re, fontWeight: 600 }}>Legacy Dev/Biz Hand-off Workflow</span>
                <span style={{ color: t.re }}>~ 14 Days of Chaos</span>
              </div>
              <div style={{ height: 16, background: t.bd, borderRadius: 4, position: "relative", overflow: "hidden", display: "flex", alignItems: "center" }}>
                <div style={{ width: "90%", height: "100%", background: t.re + "35" }} />
                <span style={{ position: "absolute", left: 8, fontSize: 9, color: t.re, fontWeight: 700 }}>Reading obsolete documents, guessing API specifications & refactoring buggy code</span>
              </div>
            </div>

            {/* Groundwork Track */}
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10.5, marginBottom: 3 }}>
                <span style={{ color: t.gr, fontWeight: 700 }}>Groundwork Connected Synapse Track</span>
                <span style={{ color: t.gr, fontWeight: 700 }}>Day-0 Alignment (Instant)</span>
              </div>
              <div style={{ height: 16, background: t.gr + "20", borderRadius: 4, position: "relative", overflow: "hidden", display: "flex", alignItems: "center", border: `1px solid ${t.gr}40` }}>
                <div style={{ width: "5%", height: "100%", background: t.gr }} />
                <span style={{ position: "absolute", left: 8, fontSize: 9, color: t.gr, fontWeight: 700 }}>AI graph automatically enforces baseline requirements under locked schemas</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        
        {/* LEFT COLUMN: ACTIVE INTEGRATED ALIGNMENT DIRECTIVES */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", borderRight: `1px solid ${t.bd}`, overflow: "hidden" }}>
          <div style={{ padding: "10px 18px", background: t.surf, borderBottom: `1px solid ${t.bd}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <span style={{ fontSize: 11, fontWeight: 800 }}>Locked Baseline Knowledge Grid</span>
            <input 
              type="text" 
              placeholder="Filter context variables..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ padding: "4px 8px", fontSize: 11, border: `1px solid ${t.bd}`, borderRadius: 4, width: 170, outline: "none", background: t.bg, color: t.tx, fontFamily: "inherit" }}
            />
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: 18 }}>
            
            {/* Quick Status Bar */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
              <div style={{ background: t.surf, border: `1px solid ${t.bd}`, borderRadius: 6, padding: "10px 12px" }}>
                <div style={{ fontSize: 10, color: t.mu, fontWeight: 700, textTransform: "uppercase" }}>Context Health</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: t.gr, marginTop: 2 }}>{dObj.health} Fully Aligned</div>
              </div>
              <div style={{ background: t.surf, border: `1px solid ${t.bd}`, borderRadius: 6, padding: "10px 12px" }}>
                <div style={{ fontSize: 10, color: t.mu, fontWeight: 700, textTransform: "uppercase" }}>Industry Domain</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: t.tx, marginTop: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{dObj.n}</div>
              </div>
              <div style={{ background: t.surf, border: `1px solid ${t.bd}`, borderRadius: 6, padding: "10px 12px" }}>
                <div style={{ fontSize: 10, color: t.mu, fontWeight: 700, textTransform: "uppercase" }}>Day-00 Synced Projects</div>
                <div style={{ fontSize: 16, fontWeight: 800, color: t.hi, marginTop: 2 }}>3 Sibling Roots</div>
              </div>
            </div>

            {filteredSections.map(sec => (
              <div key={sec.cat} style={{ marginBottom: 16 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                  <i className={`ti ${sec.icon}`} style={{ fontSize: 13, color: t.hi }} />
                  <span style={{ fontWeight: 700, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.02em", color: t.tx }}>{sec.cat}</span>
                  <span style={{ fontSize: 10.5, color: t.mu }}>· {sec.entries.length} active directives</span>
                </div>
                <Card t={t}>
                  {sec.entries.map((e, index) => (
                    <div 
                      key={e.k} 
                      onClick={() => setSimulationPrompt(`Tell me more about the specifications for: ${e.k}`)}
                      style={{ 
                        padding: "10px 14px", 
                        display: "grid", 
                        gridTemplateColumns: "150px 1fr 110px", 
                        gap: 12, 
                        alignItems: "center", 
                        borderBottom: index < sec.entries.length - 1 ? `1px solid ${t.bd}` : "none",
                        cursor: "pointer",
                        transition: "all 0.1s ease"
                      }}
                      className="hover:bg-slate-50 dark:hover:bg-zinc-800"
                    >
                      <div style={{ fontWeight: 700, fontSize: 11.5, color: t.tx }}>{e.k}</div>
                      <div style={{ fontSize: 11.5, color: t.sub, lineHeight: 1.5 }}>{e.v}</div>
                      <div style={{ fontSize: 9.5, color: t.mu, textAlign: "right", fontStyle: "italic" }}>{e.src}</div>
                    </div>
                  ))}
                </Card>
              </div>
            ))}
            {filteredSections.length === 0 && (
              <div style={{ textAlign: "center", padding: "40px 20px", color: t.mu }}>
                <i className="ti ti-search" style={{ fontSize: 24, display: "block", marginBottom: 8 }} />
                <span style={{ fontSize: 12 }}>No specifications matched your query: "{searchQuery}"</span>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT COLUMN: REPLACING WEEKS OF TALK WITH LIVING GRAPH QUERIES */}
        <div style={{ width: 380, display: "flex", flexDirection: "column", overflow: "hidden" }} className="hidden lg:flex">
          
          {/* Synapse UI Panel Header */}
          <div style={{ padding: "14px 18px", background: t.surf, borderBottom: `1px solid ${t.bd}`, flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
              <i className="ti ti-brain" style={{ fontSize: 15, color: t.hi }} />
              <span style={{ fontWeight: 800, fontSize: 12, textTransform: "uppercase", letterSpacing: "0.05em" }}>Day-0 Continuous Synapse</span>
            </div>
            <p style={{ fontSize: 11, color: t.sub, margin: 0, lineHeight: 1.4 }}>
              Ditch slow meetings. Let developers or product leads test logic constraints on Day 0 against the active project knowledge graph.
            </p>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: 18, display: "flex", flexDirection: "column", gap: 14 }}>
            
            {/* Interactive Tab Switcher to show role context */}
            <div style={{ background: t.al, padding: 3, borderRadius: 6, display: "flex" }}>
              <button 
                onClick={() => setActiveTab("product")}
                style={{
                  flex: 1, border: "none", background: activeTab === "product" ? t.surf : "transparent",
                  color: activeTab === "product" ? t.tx : t.mu, borderRadius: 4, padding: "6px 0", fontSize: 11, fontWeight: 700, cursor: "pointer", transition: "all 0.1s ease"
                }}
              >
                <i className="ti ti-briefcase" /> Product Day-00
              </button>
              <button 
                onClick={() => setActiveTab("engineering")}
                style={{
                  flex: 1, border: "none", background: activeTab === "engineering" ? t.surf : "transparent",
                  color: activeTab === "engineering" ? t.tx : t.mu, borderRadius: 4, padding: "6px 0", fontSize: 11, fontWeight: 700, cursor: "pointer", transition: "all 0.1s ease"
                }}
              >
                <i className="ti ti-code" /> Engineering Day-0
              </button>
            </div>

            {/* Role Synapse Description card */}
            <div style={{ background: t.surf, border: `1px solid ${t.bd}`, borderRadius: 6, padding: "12px 14px" }}>
              {activeTab === "product" ? (
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: t.hi }} />
                    <strong style={{ fontSize: 11, textTransform: "uppercase" }}>Business Strategy Day-00 Fast-rack</strong>
                  </div>
                  <div style={{ fontSize: 11, color: t.sub, lineHeight: 1.5, display: "flex", flexDirection: "column", gap: 6 }}>
                    <p>Allows business owners to pre-lock parameters, avoiding developer code drift before writing line one.</p>
                    <p>✓ Validate market WTP limits instantly</p>
                    <p>✓ Avoid creating unrequested SDK integrations</p>
                    <p>✓ Enforce clear technical lock-outs upfront</p>
                  </div>
                </div>
              ) : (
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: t.gr }} />
                    <strong style={{ fontSize: 11, textTransform: "uppercase" }}>Engineering Team Day-0 Bootstrapping</strong>
                  </div>
                  <div style={{ fontSize: 11, color: t.sub, lineHeight: 1.5, display: "flex", flexDirection: "column", gap: 6 }}>
                    <p>Provides an immediate source of truth. Developers build correct integrations because the workspace actively aligns them on API limits and database shapes.</p>
                    <p>✓ Auto-generate compliant REST schemas</p>
                    <p>✓ Pull strict service SLA thresholds</p>
                    <p>✓ Direct flow mapping without guesswork</p>
                  </div>
                </div>
              )}
            </div>

            {/* Test Synapse Query Engine */}
            <div style={{ background: t.surf, border: `1px dashed ${t.bd2}`, borderRadius: 6, padding: 14 }}>
              <div style={{ fontSize: 10, fontWeight: 800, color: t.mu, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 6 }}>
                Query Active Knowledge Base
              </div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <textarea 
                  rows={2}
                  value={simulationPrompt}
                  onChange={e => setSimulationPrompt(e.target.value)}
                  style={{ width: "100%", padding: 6, fontSize: 11, border: `1px solid ${t.bd}`, borderRadius: 4, outline: "none", color: t.tx, background: t.al, fontFamily: "inherit", resize: "none" }}
                  placeholder="Ask any alignment question..."
                />
                <Btn t={t} sm pri onClick={runSimulationQuery} disabled={simIsLoading} style={{ justifyContent: "center" }}>
                  {simIsLoading ? "Aligning..." : "Query Continuous Graph"}
                </Btn>
              </div>

              {simulationAnswer && (
                <div style={{ marginTop: 12, padding: "8px 10px", background: t.al, borderRadius: 4, borderLeft: `2.5px solid ${t.hi}` }}>
                  <div style={{ fontSize: 9, fontWeight: 800, color: t.hi, marginBottom: 4, textTransform: "uppercase" }}>
                    Active Aligned Response
                  </div>
                  <p style={{ fontSize: 11, color: t.sub, margin: 0, lineHeight: 1.4 }}>
                    {simulationAnswer}
                  </p>
                </div>
              )}
            </div>

            {/* Preset alignment hooks */}
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: t.mu, textTransform: "uppercase" }}>Quick Alignment Questions</div>
              <div 
                onClick={() => {
                  setSimulationPrompt("What SLA responses are configured under this domain's microservices?");
                  setSimulationAnswer("[SLA Check]: Active microservices require standard round-trip constraints under 150ms-500ms depending on the regional payment gate or telemetry controller.");
                }}
                style={{ fontSize: 10.5, padding: "6px 10px", background: t.surf, border: `1px solid ${t.bd}`, borderRadius: 4, cursor: "pointer" }}
                className="hover:bg-slate-50 dark:hover:bg-zinc-800"
              >
                ❓ What microservice SLA responses are configured?
              </div>
              <div 
                onClick={() => {
                  setSimulationPrompt("What features are explicitly out-of-scope for the MVP?");
                  setSimulationAnswer("[Scope Alignment]: Voice channels and automated routing optimizations are out of scope. We only support static reactive text threads for our release.");
                }}
                style={{ fontSize: 10.5, padding: "6px 10px", background: t.surf, border: `1px solid ${t.bd}`, borderRadius: 4, cursor: "pointer" }}
                className="hover:bg-slate-50 dark:hover:bg-zinc-800"
              >
                ❓ What features are explicitly out-of-scope for the MVP?
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

interface ProjectContextProps {
  t: any;
  go: (s: string) => void;
  ctx?: any;
  wctx: any[];
  onToggle?: (index: any) => void;
  idea?: string;
  role?: "business" | "engineer";
  setRole?: (r: "business" | "engineer") => void;
}

export function ProjectContext({ t, go, wctx, onToggle, ctx, idea, role, setRole }: ProjectContextProps) {
  const projList = [
    { id: "GW-0001", n: "Shipment tracker", on: true  },
    { id: "GW-0002", n: "Logistics SaaS",  on: false },
    { id: "GW-0003", n: "AI onboarding",   on: false },
    { id: "GW-0004", n: "Supplier portal", on: false },
  ];
  const pSecs = [
    { title: "Stakeholders", icon: "ti-users", ok: true, items: [
      { l: "Primary stakeholder", v: "Arjun Reddy (CEO) — final call on scope and budget",         tag: "Confirmed" },
      { l: "Engineering lead",    v: "Priya Sharma — owns technical feasibility review",            tag: "Confirmed" },
      { l: "Customer champion",   v: "Alex Chen at LogiTech Inc. — referenceable beta customer",   tag: "Confirmed" },
    ]},
    { title: "Decisions Made", icon: "ti-check", ok: true, items: [
      { l: "Scope",         v: "MVP focuses on shipment visibility only — no route optimization in v1", tag: "Locked" },
      { l: "Tech approach", v: "Pull-based carrier API integration (not webhook) for v1 simplicity",   tag: "Locked" },
      { l: "Target segment",v: "Mid-market logistics: 10–100 shipments/day, not enterprise",           tag: "Locked" },
    ]},
    { title: "Ruled Out", icon: "ti-x", ok: true, items: [
      { l: "Route optimization", v: "Too much scope creep, different buyer persona",    tag: "Ruled out" },
      { l: "White-label",        v: "Distracts from core product, defer post-Series A",tag: "Ruled out" },
      { l: "Mobile app",         v: "Desktop-first, ops managers work at their desk",  tag: "Ruled out" },
    ]},
    { title: "Open Questions", icon: "ti-help-circle", ok: false, items: [
      { l: "Carrier APIs",       v: "Have not validated that top 8 carriers have usable APIs",     tag: "Open" },
      { l: "Pricing validation", v: "$49/user/mo not yet validated with 3 pilot customers",        tag: "Open" },
      { l: "Offline mode",       v: "Do drivers require offline caching modes for dead zones?",     tag: "Open" },
      { l: "Partnership",        v: "Should we partner with a TMS or stay standalone?",            tag: "Open" },
    ]},
    { title: "Meeting Notes", icon: "ti-notes", ok: true, items: [
      { l: "May 14 kickoff",         v: "Agreed on mid-market focus, ruled out enterprise. Priya flagged API reliability risk.", tag: "Meeting" },
      { l: "May 17 customer call",   v: "Alex Chen confirmed $2–10k pain per delay. Needs SSO for IT policy.",                  tag: "Meeting" },
      { l: "May 20 scorecard review",v: "Score: 7.3/10. Main risk = competitive density. Proceeding to flows.",                tag: "Meeting" },
    ]},
  ];
  const tagColor = { Locked:"black" as const, Confirmed:"green" as const, Open:"amber" as const, "Ruled out":"red" as const, Meeting:"gray" as const };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Topbar t={t} title="Project Context" sub="GW-0001 · Real-time shipment tracker" role={role} setRole={setRole} currentScreen="pcontext" go={go}>
        <Btn t={t} sm ghost>Switch project</Btn>
        <Btn t={t} sm pri><i className="ti ti-plus" style={{ fontSize: 12 }} /> Add entry</Btn>
      </Topbar>
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Project list panel */}
        <div style={{ width: 200, background: t.surf, borderRight: `1px solid ${t.bd}`, display: "flex", flexDirection: "column", overflow: "hidden", flexShrink: 0 }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: t.mu, padding: "9px 12px 6px", letterSpacing: "0.07em", textTransform: "uppercase", borderBottom: `1px solid ${t.bd}` }}>Projects</div>
          {projList.map(p => (
            <div key={p.id} style={{ padding: "8px 12px", cursor: "pointer", borderLeft: `2px solid ${p.on ? t.tx : "transparent"}`, background: p.on ? t.al : "transparent" }}>
              <div style={{ fontSize: 12, fontWeight: p.on ? 700 : 500 }}>{p.id}</div>
              <div style={{ fontSize: 11, color: t.mu, marginTop: 1 }}>{p.n}</div>
            </div>
          ))}
        </div>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Completeness bar */}
          <div style={{ padding: "9px 18px", background: t.surf, borderBottom: `1px solid ${t.bd}`, display: "flex", alignItems: "center", gap: 14, flexShrink: 0 }}>
            <div style={{ fontSize: 11, color: t.sub, fontWeight: 600 }}>Context completeness</div>
            <div style={{ flex: 1, height: 6, background: t.al, borderRadius: 3, overflow: "hidden" }}>
              <div style={{ width: "72%", height: "100%", background: t.tx, borderRadius: 3 }} />
            </div>
            <div style={{ fontSize: 11, fontWeight: 700 }}>72%</div>
            <div style={{ fontSize: 11, color: t.mu }}>4 areas missing</div>
          </div>
          {/* wctx quick view */}
          <div style={{ padding: "8px 18px", borderBottom: `1px solid ${t.bd}`, background: t.surf, display: "flex", gap: 8, flexWrap: "wrap", flexShrink: 0 }}>
            <span style={{ fontSize: 10, fontWeight: 700, color: t.mu, alignSelf: "center", textTransform: "uppercase", letterSpacing: "0.05em" }}>Workspace context</span>
            {wctx.filter(i => i.status === "finalized").slice(0, 3).map(item => (
              <div key={item.id} style={{ fontSize: 10, padding: "2px 7px", background: t.al, border: `1px solid ${t.bd}`, borderRadius: 3, display: "flex", alignItems: "center", gap: 4 }}>
                <i className="ti ti-check" style={{ fontSize: 8, color: t.gr }} />
                <span style={{ color: t.mu }}>{item.label}:</span>
                <span style={{ color: t.tx, fontWeight: 500 }}>{item.value.slice(0, 20)}{item.value.length > 20 ? "…" : ""}</span>
              </div>
            ))}
            <Btn t={t} xs onClick={() => go("context")}>+ Industry Context</Btn>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "14px 18px" }}>
            {pSecs.map(sec => (
              <div key={sec.title} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
                  <i className={`ti ${sec.icon}`} style={{ fontSize: 14, color: sec.ok ? t.sub : t.am }} />
                  <span style={{ fontWeight: 700, fontSize: 13 }}>{sec.title}</span>
                  {!sec.ok && <Badge t={t} label="Needs attention" color="amber" />}
                  <div style={{ marginLeft: "auto" }}><Btn t={t} xs><i className="ti ti-plus" style={{ fontSize: 10 }} /></Btn></div>
                </div>
                <Card t={t}>
                  {sec.items.map((it, i) => (
                    <div key={it.l} style={{ padding: "9px 14px", display: "grid", gridTemplateColumns: "160px 1fr 90px", gap: 12, alignItems: "start", borderBottom: i < sec.items.length - 1 ? `1px solid ${t.bd}` : "none" }}>
                      <div style={{ fontWeight: 600, fontSize: 11, color: t.sub }}>{it.l}</div>
                      <div style={{ fontSize: 12, lineHeight: 1.5 }}>{it.v}</div>
                      <div style={{ textAlign: "right" }}><Badge t={t} label={it.tag} color={tagColor[it.tag as keyof typeof tagColor] || "gray"} /></div>
                    </div>
                  ))}
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function Transcripts({ t, go, wctx = [], setWctx, idea }: { t: any; go: (s: string) => void; wctx?: any[]; setWctx?: any; idea?: string }) {
  // Preset raw transcript templates for immediate demonstration
  const PRESET_DOCUMENTS = [
    {
      name: "Customer Interview - Alex Chen (LogiTech).txt",
      content: "Alex Chen (LogiTech CFO) says: 'Our current cost is easily $2k-$10k per delayed bulk freight trip. We are happy to pilot the software on Day-1 provided the latency stays under 15 minutes. Also, our strict IT security policy mandates SSO (Single Sign-On) integration and regional data residency constraints under localized servers. We will not use it without self-serve SSO.'",
      type: "Meeting transcript",
      size: "4.8 KB",
      proj: "GW-0001",
      extracted: [
        { k: "SLA - Bulk Freight Delay Cost", v: "Concrete loss of $2k-$10k per trip confirmed by reference buyer", type: "Decision", tag: "Confirmed" },
        { k: "Security Standard - SSO Required", v: "LogiTech corporate IT policy mandates SSO for trial", type: "Requirement", tag: "Locked" },
        { k: "Data Localisation - Regional Clusters", v: "Must host and query data within adjacent local server clusters", type: "Requirement", tag: "Locked" }
      ]
    },
    {
      name: "Strategy Kickoff - Executive Alignment.md",
      content: "Arjun (CEO) and Priya (Tech Lead) kickoff: 'We are explicitly ruling out Route Optimization for version 1 because it adds massive scope creep and introduces a secondary operator persona. Focus wholly on freight visibility. Priya indicates we'll use a standard carrier pull pipeline instead of webhooks to fast-track MVP deployment within 45 days. SLA latency peak must handle 500ms maximum.'",
      type: "Document",
      size: "3.2 KB",
      proj: "GW-0001",
      extracted: [
        { k: "Scope - Explicitly Exclude Route Opt", v: "Pushed to v2 to avoid secondary persona complexity", type: "Decision", tag: "Ruled out" },
        { k: "Feasibility - Pull-Based REST Pipeline", v: "Selected over webhook telemetry to trim 30 days of setup", type: "Decision", tag: "Confirmed" },
        { k: "Feasibility Peak SLA Limit", v: "API round-trip peak target bound under 500ms max", type: "Requirement", tag: "Locked" }
      ]
    },
    {
      name: "Core Ledger Architecture Specification.pdf",
      content: "Official Core Architecture: 'Digital payment ledgers must operate dual-signature clearance validations. Processing latency limit on transactions cannot exceed 150 milliseconds. Total operational history log requires AES-256 state encryption at rest.'",
      type: "Document",
      size: "12.4 KB",
      proj: "GW-0002",
      extracted: [
        { k: "Architecture - Dual-Signature Ledger", v: "Explicit technical clearance mechanism for fintech billing gateways", type: "Requirement", tag: "Locked" },
        { k: "System Latency Limit - 150ms", v: "Hard transaction processing limit mandated under ledger SLA", type: "Requirement", tag: "Locked" },
        { k: "Security Standard - AES-256", v: "Ledger transaction database must enforce AES-256 encryption at rest", type: "Requirement", tag: "Locked" }
      ]
    }
  ];

  const [filesList, setFilesList] = React.useState<any[]>(FILES_DEMO);
  const [selectedPreset, setSelectedPreset] = React.useState<any>(PRESET_DOCUMENTS[0]);
  const [customText, setCustomText] = React.useState("");
  const [pastedFiles, setPastedFiles] = React.useState<any[]>([]);
  
  // AI Synapse Extractor State
  const [isExtracting, setIsExtracting] = React.useState(false);
  const [extractionProgress, setExtractionProgress] = React.useState<string[]>([]);
  const [activeStage, setActiveStage] = React.useState(0);
  const [extractedDirectives, setExtractedDirectives] = React.useState<any[]>([]);
  const [synapseSuccess, setSynapseSuccess] = React.useState(false);

  const typeColor = { 
    Decision: "black" as const, 
    "Customer quote": "green" as const, 
    Risk: "amber" as const, 
    Requirement: "blue" as const, 
    "Competitive intel": "gray" as const 
  };

  const tagColor = { 
    Locked: "black" as const, 
    Confirmed: "green" as const, 
    Open: "amber" as const, 
    "Ruled out": "red" as const, 
    Meeting: "gray" as const 
  };

  // Select Preset Document to try
  const selectPresetText = (preset: any) => {
    setSelectedPreset(preset);
    setCustomText(preset.content);
    setExtractionProgress([]);
    setExtractedDirectives([]);
    setSynapseSuccess(false);
    setActiveStage(0);
  };

  React.useEffect(() => {
    // Sync default preset text on load
    if (PRESET_DOCUMENTS.length > 0) {
      setCustomText(PRESET_DOCUMENTS[0].content);
    }
  }, []);

  // Run the Real-time AI extraction Synapse
  const runExtraction = () => {
    if (!customText.trim()) return;
    
    setIsExtracting(true);
    setExtractionProgress([]);
    setExtractedDirectives([]);
    setSynapseSuccess(false);
    setActiveStage(1);

    const stages = [
      "⚡ Continuous Synapse boot complete...",
      "🔍 Deep-scanning files for implicit stakeholder decisions & core spec bounds...",
      "⚖️ Comparing transcript variables against locked parent domain parameters...",
      "⚖️ Drift Check: Flagging business-to-dev requirements misalignments...",
      "✓ 3 Core Aligned Directives Extracted successfully!"
    ];

    let current = 0;
    const interval = setInterval(() => {
      setExtractionProgress(prev => [...prev, stages[current]]);
      current++;
      setActiveStage(current + 1);

      if (current >= stages.length) {
        clearInterval(interval);
        setIsExtracting(false);
        setSynapseSuccess(true);
        
        // Populate custom or selected preset extracted insights
        if (selectedPreset && customText.trim().includes(selectedPreset.content.substring(0, 40))) {
          setExtractedDirectives(selectedPreset.extracted);
        } else {
          // Fallback extracted mock matching the user's custom notepad input
          setExtractedDirectives([
            { k: "User Ingested Specification", v: customText.slice(0, 100) + "...", type: "Decision", tag: "Confirmed" },
            { k: "Extracted SLA Parameter", v: "Extracted directly from custom uploaded meeting context file", type: "Requirement", tag: "Locked" }
          ]);
        }

        // Add to files table as "Processed"
        const newFile = {
          name: selectedPreset ? selectedPreset.name : "Custom_Transcribed_Meeting_" + Math.floor(Math.random() * 1000) + ".txt",
          proj: "GW-0001",
          type: selectedPreset ? selectedPreset.type : "Meeting transcript",
          size: selectedPreset ? selectedPreset.size : "3.1 KB",
          date: "Just Now",
          status: "Processed",
          insights: selectedPreset ? selectedPreset.extracted.length : 2
        };

        setFilesList(prev => [newFile, ...prev]);
      }
    }, 600);
  };

  // Push Extracted variables directly into the live shared Context!
  const pushToActiveContext = () => {
    if (!extractedDirectives || extractedDirectives.length === 0) return;
    
    if (setWctx && wctx) {
      // Create wctx elements from the extracted fields
      const formattedItems = extractedDirectives.map((d, index) => ({
        id: "ext-" + Math.floor(Math.random() * 100000),
        label: d.k,
        value: d.v,
        status: "finalized"
      }));

      setWctx([...wctx, ...formattedItems]);
      alert(`🎉 Successfully synced ${formattedItems.length} alignment rules! Engineering Developers now see these exact parameters locked live in their workspace.`);
      setExtractedDirectives([]);
      setSynapseSuccess(false);
      setCustomText("");
      go("pcontext"); // Take them to see the updated context panel
    }
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: t.bg }}>
      <Topbar t={t} title="Knowledge Intake" sub="Zero-Friction Document Ingestion Hub — Align Sibling Teams on Day 0">
        <Btn t={t} sm ghost onClick={() => go("context")}><i className="ti ti-world" style={{ fontSize: 12 }} /> Domain Context</Btn>
        <Btn t={t} sm pri onClick={() => go("pcontext")}><i className="ti ti-eye" style={{ fontSize: 12 }} /> Project Context</Btn>
      </Topbar>

      {/* Rationale header to answer 'Why do we need this' */}
      <div style={{ background: t.surf, borderBottom: `1px solid ${t.bd}`, padding: "16px 24px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: t.hi + "15", display: "flex", alignItems: "center", justifyContent: "center", color: t.hi }}>
            <i className="ti ti-brain" style={{ fontSize: 18 }} />
          </div>
          <div>
            <span style={{ fontSize: 13, fontWeight: 800, color: t.tx, display: "block" }}>
              The Sibling Upload Engine
            </span>
            <p style={{ fontSize: 11.5, color: t.sub, margin: 0, lineHeight: 1.4 }}>
              Business leads perform countless client calls, audio recordings, or technical spec reviews that developers never hear about.
              Use this workspace to drop transcripts, notes, or logs. Groundwork's <strong>Continuous Living Synapse AI</strong> instantly extracts locked variables so devs build aligned software on Day 0.
            </p>
          </div>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        
        {/* LEFT COLUMN: UPLOAD & INGESTION TERMINAL */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", borderRight: `1px solid ${t.bd}`, overflow: "hidden" }}>
          
          <div style={{ padding: "11px 18px", background: t.surf, borderBottom: `1px solid ${t.bd}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <span style={{ fontSize: 11, fontWeight: 800 }}>Drag Docs, Audio, or Paste Transcripts</span>
            <div style={{ display: "flex", gap: 6 }}>
              <Badge t={t} label="Auto-Drift Check Active" color="green" />
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: 18, display: "flex", flexDirection: "column", gap: 14 }}>
            
            {/* Quick Presets Selection tabs */}
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, color: t.mu, textTransform: "uppercase", letterSpacing: "0.04em", marginBottom: 6 }}>
                Try with a pre-loaded enterprise specification/negotiation record:
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {PRESET_DOCUMENTS.map((p, idx) => {
                  const isCur = selectedPreset && selectedPreset.name === p.name;
                  return (
                    <div 
                      key={p.name}
                      onClick={() => selectPresetText(p)}
                      style={{
                        padding: "10px 12px",
                        background: isCur ? t.al : t.surf,
                        border: `1px solid ${isCur ? t.tx : t.bd}`,
                        borderRadius: 6,
                        cursor: "pointer",
                        transition: "all 0.1s ease"
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                        <i className={`ti ${p.name.endsWith(".txt") ? "ti-file-text" : p.name.endsWith(".md") ? "ti-markdown" : "ti-file-certificate"}`} style={{ fontSize: 14, color: isCur ? t.hi : t.mu }} />
                        <span style={{ fontSize: 11, fontWeight: 700, color: t.tx, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</span>
                      </div>
                      <div style={{ fontSize: 9.5, color: t.sub }}>{p.type} · {p.size}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Custom Interactive Notepad */}
            <div style={{ flex: 1, minHeight: 180, display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 11, fontWeight: 700 }}>Workspace Custom Notepad Integration</span>
                <span style={{ fontSize: 10, color: t.mu }}>Drag & Drop file to paste automatically</span>
              </div>
              
              <div style={{ flex: 1, position: "relative", display: "flex", flexDirection: "column" }}>
                <textarea
                  value={customText}
                  onChange={e => {
                    setSelectedPreset(null);
                    setCustomText(e.target.value);
                  }}
                  placeholder="Paste raw stakeholder meeting recordings, regional spec PDF text, customer audio transcript, or Swagger yaml variables here..."
                  style={{
                    flex: 1,
                    width: "100%",
                    boxSizing: "border-box",
                    padding: 14,
                    border: `1px solid ${t.bd2}`,
                    borderRadius: 8,
                    fontSize: 12,
                    lineHeight: 1.5,
                    fontFamily: "inherit",
                    background: t.surf,
                    color: t.tx,
                    outline: "none",
                    resize: "none"
                  }}
                />
              </div>
            </div>

            {/* ACTION TRIGGERS */}
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <div style={{ fontSize: 11, color: t.sub, flex: 1 }}>
                🤖 Groundwork parses this raw text against sector guidelines and auto-formats developers' JSON specs.
              </div>
              <Btn 
                t={t} 
                pri 
                onClick={runExtraction} 
                disabled={isExtracting || !customText.trim()}
                style={{ padding: "10px 24px" }}
              >
                {isExtracting ? (
                  <>
                    <i className="ti ti-loader-quarter animate-spin" /> Aligning with AI Synapse...
                  </>
                ) : (
                  <>
                    <i className="ti ti-brain" /> Align & Extract Variables <i className="ti ti-arrow-right" />
                  </>
                )}
              </Btn>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN: REAL-TIME BRAIN FEEDBACK */}
        <div style={{ width: 420, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          
          <div style={{ padding: "12px 18px", background: t.surf, borderBottom: `1px solid ${t.bd}`, flexShrink: 0 }}>
            <span style={{ fontSize: 11, fontWeight: 800 }}>Living Graph Feedback Panel</span>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: 18, display: "flex", flexDirection: "column", gap: 14 }}>
            
            {/* Real-time Extraction Console */}
            {activeStage > 0 && (
              <div style={{ background: "black", borderRadius: 8, padding: 14, fontFamily: "monospace", display: "flex", flexDirection: "column", gap: 4 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6, borderBottom: "1px solid #222", pb: 4 }}>
                  <span style={{ color: "#38bdf8", fontSize: 10, fontWeight: 700 }}>SYNAPSE TRACE OUTPUT //</span>
                  <span style={{ color: "#22c55e", fontSize: 9 }}>● ONLINE</span>
                </div>
                {extractionProgress.map((pLine, pIdx) => (
                  <div key={pIdx} style={{ fontSize: 10.5, color: pLine.startsWith("✓") ? "#22c55e" : "#e2e8f0", lineHeight: 1.4 }}>
                    {pLine}
                  </div>
                ))}
                {isExtracting && (
                  <div style={{ fontSize: 10.5, color: "#a1a1aa", display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
                    <span style={{ display: "inline-block", width: 6, height: 6, background: "#38bdf8", borderRadius: "50%" }} className="animate-ping" />
                    Searching semantic bounds...
                  </div>
                )}
              </div>
            )}

            {/* Extracted Directives Block */}
            {synapseSuccess && extractedDirectives.length > 0 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }} className="animate-fade-in">
                <div style={{ background: t.gr + "10", border: `1px dashed ${t.gr}`, borderRadius: 8, padding: "12px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <i className="ti ti-circle-check" style={{ fontSize: 16, color: t.gr }} />
                    <strong style={{ fontSize: 13, color: t.tx }}>Sync Ready: Extracted Declarative Rules</strong>
                  </div>
                  <p style={{ fontSize: 11, color: t.sub, margin: 0 }}>
                    These points were parsed from the input. Merging binds them immutably as active developer specifications.
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {extractedDirectives.map((d, index) => (
                    <div key={index} style={{ background: t.surf, border: `1px solid ${t.bd}`, borderRadius: 6, padding: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                        <span style={{ fontSize: 11.5, fontWeight: 850, color: t.tx }}>{d.k}</span>
                        <Badge t={t} label={d.tag} color={tagColor[d.tag as keyof typeof tagColor] || "gray"} />
                      </div>
                      <div style={{ fontSize: 11.5, color: t.sub, lineHeight: 1.4 }}>{d.v}</div>
                      <div style={{ display: "flex", gap: 4, marginTop: 6, fontSize: 9.5, color: t.mu }}>
                        <span>Role Scope:</span>
                        <span style={{ fontWeight: 600 }}>{d.type}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <Btn 
                  t={t} 
                  pri 
                  onClick={pushToActiveContext}
                  style={{ justifyContent: "center", padding: "10px 0", fontSize: 12 }}
                >
                  <i className="ti ti-arrows-merge" /> Deploy & Sync to Live Development Context
                </Btn>
              </div>
            )}

            {/* Default Placeholder */}
            {!isExtracting && !synapseSuccess && (
              <div style={{ border: `1.5px dashed ${t.bd}`, borderRadius: 8, padding: "50px 20px", textAlign: "center", color: t.mu, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 10 }}>
                <i className="ti ti-brain" style={{ fontSize: 32, color: t.mu }} />
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: t.tx, marginBottom: 2 }}>Extraction Engine Standby</div>
                  <div style={{ fontSize: 11, maxWidth: 260, lineHeight: 1.4, margin: "0 auto" }}>
                    Select a preset file on the left or paste discovery transcripts to view active extracted data guidelines in real time.
                  </div>
                </div>
              </div>
            )}

            {/* Extracted file feed tracker below */}
            <div style={{ borderTop: `1px solid ${t.bd}`, paddingTop: 14 }}>
              <span style={{ fontSize: 10, fontWeight: 800, color: t.mu, textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: 8 }}>
                Repository File Status Logs
              </span>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {filesList.slice(0, 4).map((f, i) => (
                  <div key={f.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "8px 10px", background: t.surf, border: `1px solid ${t.bd}`, borderRadius: 5 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, overflow: "hidden" }}>
                      <i className={`ti ${f.icon || "ti-file"}`} style={{ fontSize: 14, color: t.sub, flexShrink: 0 }} />
                      <div style={{ overflow: "hidden" }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: t.tx, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</div>
                        <div style={{ fontSize: 9.5, color: t.mu }}>{f.size} · {f.date}</div>
                      </div>
                    </div>
                    <Badge t={t} label={f.status} color={f.status === "Processed" ? "green" : "amber"} />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
