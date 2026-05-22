import React, { useState } from "react";
import { Btn, Badge } from "./CoreUI";

interface SharedProps {
  t: any;
  go: (s: string) => void;
  dark?: boolean;
  toggleDark?: () => void;
  upCtx?: (fields: any) => void;
}

export function Landing({ t, go, dark, toggleDark }: SharedProps) {
  const [track, setTrack] = React.useState<"business" | "engineer">("business");

  const businessStats = [
    {
      v: "100% Locked",
      badge: "COGNITIVE ALIGNMENT",
      l: "Decisive Multi-Project Hierarchy",
      d: "Coordinate core project goals, functional scope, and technical agreements under a single parent domain so child projects never drift.",
      icon: "ti-layers-intersect",
      col: t.hi
    },
    {
      v: "3 Domains",
      badge: "PRODUCT DOMAINS",
      l: "Centralized Product Baselines",
      d: "Instantly load functional specifications, pricing assumptions, third-party API constraints, and persona mappings.",
      icon: "ti-world",
      col: t.gr
    },
    {
      v: "Zero Waste",
      badge: "INTEGRATED DISCOVERY",
      l: "7-Dimension Venture Health Score",
      d: "Validate feasibility, pricing models, and market depth prior to development, eliminating expensive, out-of-scope code refactoring cycles.",
      icon: "ti-trending-up",
      col: t.am
    },
    {
      v: "Instant Sync",
      badge: "ALIGNED SYNC",
      l: "Spec Push Channels",
      d: "Ditch static paperwork. Automatically propagate live-generated schemas, flowcharts, and technical deliverables straight to Notion and ClickUp.",
      icon: "ti-plug",
      col: t.re
    }
  ];

  const engineerStats = [
    {
      v: "AI Brain",
      badge: "KNOWLEDGE GRAPH",
      l: "Context-Aligned Developer Assistant",
      d: "Query a centralized AI system that is pre-programmed with your locked project parameters and general sandbox rules.",
      icon: "ti-brain",
      col: t.hi
    },
    {
      v: "Instant Index",
      badge: "METADATA REPOSITORY",
      l: "API Spec & File Processor",
      d: "Drag and drop actual raw YAML specs or developer markdown docs, automatically aligning developer models to system constraints.",
      icon: "ti-upload-cloud",
      col: t.gr
    },
    {
      v: "Interactive Flow",
      badge: "VISUAL SCHEMAS",
      l: "State Diagrams Output",
      d: "Render logical pipelines, message triggers, and backend loops dynamically as standard, highly scannable high-contrast vector outputs.",
      icon: "ti-git-branch",
      col: t.re
    },
    {
      v: "Zero Noise",
      badge: "SPEC ISOLATION",
      l: "Immutable Workspace Sandbox",
      d: "Deliver razor-sharp technical clarity. Isolate devs from raw product brainstorming by rendering only locked database constraints.",
      icon: "ti-filter",
      col: t.am
    }
  ];

  const currentStats = track === "business" ? businessStats : engineerStats;

  return (
    <div style={{ flex: 1, overflowY: "auto", background: t.bg, display: "flex", flexDirection: "column" }}>
      
      {/* Top Banner Navigation */}
      <nav style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", height: 52, background: t.surf, borderBottom: `1px solid ${t.bd}`, flexShrink: 0, position: "sticky", top: 0, zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 26, height: 26, background: t.tx, borderRadius: 6, display: "flex", alignItems: "center", justifyContent: "center", color: t.surf, fontSize: 12, fontWeight: 800 }}>G</div>
          <span style={{ fontWeight: 800, fontSize: 15, letterSpacing: "-0.03em" }}>Groundwork</span>
          <span style={{ fontSize: 11, fontWeight: 600, color: t.mu }}>by Altir</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={toggleDark} style={{ border: "none", background: "transparent", cursor: "pointer", fontSize: 18, color: t.mu }} title="Toggle Canvas Mode">
            <i className={`ti ${dark ? "ti-sun" : "ti-moon"}`} />
          </button>
          <Btn t={t} sm onClick={() => go("login")}>Sign in</Btn>
          <Btn t={t} sm pri onClick={() => go("onboarding")}>Launch Sandbox <i className="ti ti-arrow-right" /></Btn>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ minHeight: 520, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textStyle: "normal", padding: "80px 40px 60px", borderBottom: `1px solid ${t.bd}`, background: t.surf }}>
        <div style={{ fontSize: 9, fontWeight: 800, letterSpacing: "0.15em", color: t.hi, background: t.hi + "10", border: `1px solid ${t.hi}25`, padding: "4px 14px", borderRadius: 20, marginBottom: 24, textTransform: "uppercase", display: "inline-block" }}>
          LIVING AI SYNAPSE FOR PRODUCT & ENGINEERING
        </div>
        
        <h1 style={{ fontSize: 46, fontWeight: 800, letterSpacing: "-0.05em", lineHeight: 1.1, marginBottom: 20, color: t.tx, maxWidth: 880, textAlign: "center" }}>
          Build the right thing.<br />
          <span style={{ color: t.hi }}>Before you build anything.</span>
        </h1>
        
        <p style={{ fontSize: 14.5, color: t.sub, lineHeight: 1.8, maxWidth: 660, margin: "0 auto 34px", textAlign: "center" }}>
          In traditional complex enterprise systems, product discovery and engineering represent two isolated worlds. 
          Groundwork unifies them with a <strong>continuous, living AI Context Brain</strong>. 
          Business decisions, domain compliance rules, and source-code specifications are synced on both sides in real time.
        </p>
        
        <div style={{ display: "flex", gap: 12, justifyContent: "center", marginBottom: 40 }} className="flex-col sm:flex-row">
          <button 
            onClick={() => go("onboarding")} 
            style={{ 
              fontSize: 13, 
              padding: "12px 28px", 
              borderRadius: 6, 
              background: t.tx, 
              color: t.surf, 
              border: "none", 
              cursor: "pointer", 
              fontWeight: 700, 
              fontFamily: "inherit", 
              display: "inline-flex", 
              alignItems: "center", 
              justifyContent: "center",
              gap: 8,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
          >
            Launch Aligned Dev Sandbox <i className="ti ti-rocket" />
          </button>
          <button 
            onClick={() => go("pitchdeck")} 
            style={{ 
              fontSize: 13, 
              padding: "12px 28px", 
              borderRadius: 6, 
              background: t.hi, 
              color: "white", 
              border: "none", 
              cursor: "pointer", 
              fontWeight: 700, 
              fontFamily: "inherit", 
              display: "inline-flex", 
              alignItems: "center", 
              justifyContent: "center",
              gap: 8,
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
            }}
          >
            📊 View Showcase Deck
          </button>
          <button 
            onClick={() => go("dashboard")} 
            style={{ 
              fontSize: 13, 
              padding: "12px 28px", 
              borderRadius: 6, 
              background: "transparent", 
              color: t.tx, 
              border: `1px solid ${t.bd2}`, 
              cursor: "pointer", 
              fontFamily: "inherit",
              fontWeight: 600,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 6
            }}
          >
            <i className="ti ti-eye" /> Access Enterprise Demo
          </button>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 11, color: t.mu }}>
          <div style={{ width: 6, height: 6, borderRadius: "50%", background: t.gr }} />
          <span>Real-time Spec Alignment</span>
          <span style={{ color: t.bd }}>·</span>
          <span>Zero Configuration Required</span>
          <span style={{ color: t.bd }}>·</span>
          <span>Dual Product-Engineering Interface Active</span>
        </div>
      </section>

      {/* WHY ENTERPRISE SECTION */}
      <section style={{ borderBottom: `1px solid ${t.bd}`, background: t.al, padding: "52px 24px" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <span style={{ fontSize: 9, fontWeight: 800, color: t.mu, letterSpacing: "0.1em", textTransform: "uppercase" }}>THE ALIGNMENT GAP</span>
            <h2 style={{ fontSize: 24, fontWeight: 800, letterSpacing: "-0.02em", marginTop: 4, color: t.tx }}>Eliminate Technical Drift Under Constant AI Guardrails</h2>
            <p style={{ fontSize: 13.5, color: t.sub, maxWidth: 580, margin: "8px auto 0", lineHeight: 1.6 }}>
              Enterprise sprint cycles are routinely discarded because engineering was unaware of final business decisions, user personas, or product lockouts. Groundwork enforces a dual-sync knowledge engine.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="flex-col md:flex-row">
            
            <div style={{ background: t.surf, border: `1px solid ${t.bd}`, borderRadius: 8, padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: t.re + "15", display: "flex", alignItems: "center", justifyContent: "center", color: t.re }}>
                  <i className="ti ti-circle-x" style={{ fontSize: 16 }} />
                </div>
                <strong style={{ fontSize: 14, color: t.tx }}>The Drift Problem</strong>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 11.5, color: t.sub }}>
                <p>⚠️ Product managers complete elaborate discovery sessions, leaving developers with zero active context.</p>
                <p>⚠️ Sibling microservices drift, as design decisions are buried in legacy sheets unread by developers.</p>
                <p>⚠️ Engineers duplicate API connections and build wrong payload schemas due to outdated handoffs.</p>
                <p>⚠️ Continuous handoff friction on schemas, payload specifications, and regional requirements block deployments.</p>
              </div>
            </div>

            <div style={{ background: t.surf, border: `1px dashed ${t.gr}`, borderRadius: 8, padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 28, height: 28, borderRadius: 6, background: t.gr + "15", display: "flex", alignItems: "center", justifyContent: "center", color: t.gr }}>
                  <i className="ti ti-brain" style={{ fontSize: 16 }} />
                </div>
                <strong style={{ fontSize: 14, color: t.tx }}>The Groundwork Synced Solution</strong>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 11.5, color: t.sub }}>
                <p>✅ **Continuous Living Brain**: Every question developers ask reads directly from real-time finalized product decisions.</p>
                <p>✅ **Declarative Locking**: Move automatically from product hypothesis to immutable development variables.</p>
                <p>✅ **Double-Sided Indexing**: Sync both product transcripts and raw API specs into a singular system knowledge graph.</p>
                <p>✅ **Automated Engineering Artifacts**: Instant clean flowcharts, bulletproof data schemas, and Jira mapping straight from specs.</p>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* TRACK SWITCHER & STATS */}
      <section style={{ background: t.bg, borderBottom: `1px solid ${t.bd}`, padding: "52px 24px" }}>
        <div style={{ maxWidth: 1040, margin: "0 auto" }}>
          
          <div style={{ textAlign: "center", marginBottom: 24 }}>
            <span style={{ fontSize: 9, fontWeight: 800, color: t.sub, letterSpacing: "0.1em", textTransform: "uppercase" }}>INTERACTIVE WORKSPACE DEMONSTRATOR</span>
            <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", marginTop: 4, color: t.tx }}>Explore Integrated Track Views</h2>
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: 30 }}>
            <div style={{ background: t.al, borderRadius: 30, padding: 4, display: "inline-flex", border: `1px solid ${t.bd}` }}>
              <button
                onClick={() => setTrack("business")}
                style={{
                  border: "none",
                  background: track === "business" ? t.surf : "transparent",
                  color: track === "business" ? t.tx : t.mu,
                  padding: "8px 20px",
                  borderRadius: 24,
                  fontSize: 12,
                  fontWeight: 800,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  transition: "all 0.15s ease",
                  boxShadow: track === "business" ? "0 1px 4px rgba(0,0,0,0.05)" : "none"
                }}
              >
                <i className="ti ti-briefcase" />
                Product & Business Lead
              </button>
              <button
                onClick={() => setTrack("engineer")}
                style={{
                  border: "none",
                  background: track === "engineer" ? t.surf : "transparent",
                  color: track === "engineer" ? t.tx : t.mu,
                  padding: "8px 20px",
                  borderRadius: 24,
                  fontSize: 12,
                  fontWeight: 800,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  transition: "all 0.15s ease",
                  boxShadow: track === "engineer" ? "0 1px 4px rgba(0,0,0,0.05)" : "none"
                }}
              >
                <i className="ti ti-code" />
                Engineering Developer
              </button>
            </div>
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 16 }}>
            {currentStats.map((st) => (
              <div 
                key={st.l} 
                style={{ 
                  background: t.surf, 
                  border: `1px solid ${t.bd}`, 
                  borderRadius: 12, 
                  padding: "24px 20px", 
                  display: "flex", 
                  flexDirection: "column", 
                  gap: 12,
                  boxShadow: "0 2px 8px rgba(0,0,0,0.02)"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ 
                    fontSize: 22, 
                    fontWeight: 900, 
                    letterSpacing: "-0.04em", 
                    color: t.tx, 
                    display: "flex", 
                    alignItems: "center", 
                    gap: 8 
                  }}>
                    <i className={`ti ${st.icon}`} style={{ fontSize: 20, color: st.col }} />
                    {st.v}
                  </span>
                  <span style={{ 
                    fontSize: 8.5, 
                    fontWeight: 800, 
                    background: t.al, 
                    border: `1px solid ${t.bd}`, 
                    padding: "2px 8px", 
                    borderRadius: 10, 
                    letterSpacing: "0.04em",
                    color: t.sub 
                  }}>{st.badge}</span>
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: t.tx, marginBottom: 4 }}>{st.l}</div>
                  <div style={{ fontSize: 11, color: t.sub, lineHeight: 1.5 }}>{st.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "30px 40px", display: "flex", alignItems: "center", justifyContent: "space-between", background: t.surf, borderTop: `1px solid ${t.bd}`, flexShrink: 0, marginTop: "auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 22, height: 22, background: t.tx, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", color: t.surf, fontSize: 10, fontWeight: 800 }}>G</div>
          <span style={{ fontWeight: 700, fontSize: 13 }}>Groundwork by Altir</span>
        </div>
        <div style={{ fontSize: 11, color: t.mu }}>© 2026 Altir Align Systems. All rights reserved.</div>
        <div style={{ display: "flex", gap: 16 }}>
          {["Legal","Privacy Policy","Regional Audits"].map(l => <span key={l} style={{ fontSize: 11, color: t.mu, cursor: "pointer" }}>{l}</span>)}
        </div>
      </footer>

    </div>
  );
}

export function Login({ t, go }: SharedProps) {
  return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: t.bg }}>
      <div style={{ background: t.surf, border: `1px solid ${t.bd}`, borderRadius: 8, padding: 30, width: 340, boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
          <div style={{ width: 24, height: 24, background: t.tx, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", color: t.surf, fontSize: 11, fontWeight: 800 }}>G</div>
          <span style={{ fontWeight: 700, fontSize: 14 }}>Groundwork</span>
        </div>
        
        <div style={{ fontSize: 17, fontWeight: 800, marginBottom: 4, letterSpacing: "-0.02em" }}>Enterprise Access</div>
        <div style={{ fontSize: 12, color: t.sub, marginBottom: 20 }}>Secure single sign-on aligned sandbox</div>
        
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 11, fontWeight: 600, color: t.sub, display: "block", marginBottom: 4 }}>Work Email</label>
          <input type="email" defaultValue="compliance@altir.io" style={{ width: "100%", boxSizing: "border-box", padding: "8px 10px", border: `1px solid ${t.bd}`, borderRadius: 5, fontSize: 13, color: t.tx, background: t.bg, outline: "none", fontFamily: "inherit" }} />
        </div>
        
        <div style={{ marginBottom: 12 }}>
          <label style={{ fontSize: 11, fontWeight: 600, color: t.sub, display: "block", marginBottom: 4 }}>Security Password</label>
          <input type="password" defaultValue="••••••••••" style={{ width: "100%", boxSizing: "border-box", padding: "8px 10px", border: `1px solid ${t.bd}`, borderRadius: 5, fontSize: 13, color: t.tx, background: t.bg, outline: "none", fontFamily: "inherit" }} />
        </div>

        <Btn t={t} pri fullWidth onClick={() => go("onboarding")} style={{ fontSize: 13, padding: "8px 0", justifyContent: "center", marginBottom: 14 }}>
          Sign in <i className="ti ti-arrow-right" />
        </Btn>
        
        <div style={{ textAlign: "center", fontSize: 11.5, color: t.sub }}>
          No account assigned? <span style={{ cursor: "pointer", textDecoration: "underline", fontWeight: 700 }} onClick={() => go("onboarding")}>Create Aligned Workspace</span>
        </div>
      </div>
    </div>
  );
}

export function Onboarding({ t, go, upCtx }: SharedProps) {
  const [step, setStep] = useState(0);
  const [domainId, setDomainId] = useState("US-LOGISTICS");
  const [ideaInput, setIdeaInput] = useState("");
  const [lockedRule, setLockedRule] = useState("99.9% API SLA Uptime");

  const domains = [
    { id: "US-LOGISTICS", n: "US Logistics & Freight Ops", icon: "ti-truck", desc: "For real-time transport coordinates, freight billing standards, and API webhooks." },
    { id: "GLOBAL-HEALTHCARE", n: "Subscription SaaS & Payments Hub", icon: "ti-credit-card", desc: "For Stripe subscription tiers, billing callbacks, and transaction logs." },
    { id: "APAC-FINTECH", n: "Real-time Collaboration & AI Canvas", icon: "ti-layers", desc: "For real-time WebSockets, state synchronisation, and prompt mapping limits." }
  ];

  const handleFinish = () => {
    // Populate active context details so user lands in a pristine environment with actual choices
    if (upCtx) {
      upCtx({
        idea: ideaInput.trim() || `Enterprise tracking platform for ${domains.find(d => d.id === domainId)?.n}`,
        domain_id: domainId,
        id: "GW-0001",
        st: "Scorecard active",
        bc: "green"
      });
    }
    go("dashboard");
  };

  return (
    <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: t.bg, padding: 16 }}>
      <div style={{ background: t.surf, border: `1px solid ${t.bd}`, borderRadius: 8, padding: "32px 30px", width: 480, boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}>
        
        {/* LOGO BAR */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
          <div style={{ width: 24, height: 24, background: t.tx, borderRadius: 5, display: "flex", alignItems: "center", justifyContent: "center", color: t.surf, fontSize: 11, fontWeight: 800 }}>G</div>
          <span style={{ fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.03em" }}>Groundwork Initialize</span>
        </div>

        {/* PROGRESS INDICATOR */}
        <div style={{ display: "flex", gap: 6, marginBottom: 24 }}>
          {[0, 1].map((i) => (
            <div key={i} style={{ flex: 1, height: 3, borderRadius: 2, background: i <= step ? t.tx : t.bd, transition: "background 0.25s ease" }} />
          ))}
        </div>

        {/* STEP 1: SELECT PRODUCT WORKSPACE */}
        {step === 0 && (
          <div>
            <div style={{ fontSize: 9, fontWeight: 800, color: t.hi, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>Configure Environment</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: t.tx, marginBottom: 6 }}>1. Select System Workspace</div>
            <p style={{ fontSize: 12, color: t.sub, lineHeight: 1.5, marginBottom: 16 }}>
              Choose the active product domain. All workspace context files, technical variables, and active helper bots will conform strictly to this domain logic.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
              {domains.map(d => {
                const isSel = d.id === domainId;
                return (
                  <div
                    key={d.id}
                    onClick={() => setDomainId(d.id)}
                    style={{
                      border: `1px solid ${isSel ? t.tx : t.bd}`,
                      background: isSel ? t.al : "transparent",
                      borderRadius: 6,
                      padding: "12px 14px",
                      cursor: "pointer",
                      transition: "all 0.1s ease"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <i className={`ti ${d.icon}`} style={{ fontSize: 15, color: isSel ? t.hi : t.mu }} />
                      <span style={{ fontSize: 12, fontWeight: 700, color: t.tx }}>{d.n}</span>
                      {isSel && <Badge t={t} label="Primary Active" color="black" />}
                    </div>
                    <div style={{ fontSize: 10.5, color: t.sub, lineHeight: 1.4 }}>{d.desc}</div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Btn t={t} sm pri onClick={() => setStep(1)}>Next Step <i className="ti ti-arrow-right" /></Btn>
            </div>
          </div>
        )}

        {/* STEP 2: PROJECT PARAMS & INITIAL IDEA */}
        {step === 1 && (
          <div>
            <div style={{ fontSize: 9, fontWeight: 800, color: t.hi, letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 4 }}>Locked Deliverables</div>
            <div style={{ fontSize: 18, fontWeight: 800, color: t.tx, marginBottom: 6 }}>2. Define Sibling Initiative</div>
            <p style={{ fontSize: 12, color: t.sub, lineHeight: 1.5, marginBottom: 16 }}>
              Groundwork isolates your active pipeline constraints. Give your product idea a name or general scope to seed the environment.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: t.tx, display: "block", marginBottom: 4 }}>Your System Idea / Brainstorm Scope</label>
                <textarea
                  rows={3}
                  value={ideaInput}
                  onChange={e => setIdeaInput(e.target.value)}
                  placeholder="e.g., Centralized ledger for multi-bank APAC clearance and national QR rails conformance..."
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "8px 10px",
                    border: `1px solid ${t.bd}`,
                    borderRadius: 5,
                    fontSize: 12,
                    color: t.tx,
                    background: t.al,
                    outline: "none",
                    resize: "none",
                    fontFamily: "inherit",
                    lineHeight: 1.4
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: t.tx, display: "block", marginBottom: 4 }}>Your First Primary Locked Constraint</label>
                <input
                  type="text"
                  value={lockedRule}
                  onChange={e => setLockedRule(e.target.value)}
                  placeholder="e.g. Max api delay 250ms, data encrypted under localized region"
                  style={{
                    width: "100%",
                    boxSizing: "border-box",
                    padding: "8px 10px",
                    border: `1px solid ${t.bd}`,
                    borderRadius: 5,
                    fontSize: 12,
                    color: t.tx,
                    background: t.al,
                    outline: "none",
                    fontFamily: "inherit"
                  }}
                />
              </div>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Btn t={t} sm onClick={() => setStep(0)}>← Back</Btn>
              <Btn t={t} sm pri onClick={handleFinish}>Enter Spec Engine <i className="ti ti-rocket" /></Btn>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
