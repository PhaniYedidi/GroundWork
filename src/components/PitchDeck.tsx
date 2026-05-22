import React, { useState } from "react";
import { Btn, Badge } from "./CoreUI";

interface PitchDeckProps {
  t: any;
  go: (s: string) => void;
}

export function PitchDeck({ t, go }: PitchDeckProps) {
  const [slide, setSlide] = useState(0);
  const [copied, setCopied] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const handleCopyLink = () => {
    const link = `${window.location.origin}/?screen=pitchdeck`;
    navigator.clipboard.writeText(link).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error("Could not copy content link: ", err);
    });
  };

  const slides = [
    {
      title: "Groundwork by Altir",
      subtitle: "Build the right thing. Before you build anything.",
      tag: "01 / THE MISSION",
      color: t.hi,
      icon: "🚀",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 20, height: "100%", justifyContent: "center" }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 800, color: t.hi, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: 10 }}>
              ENTERPRISE COGNITIVE ALIGNMENT SYSTEM
            </div>
            <h2 style={{ fontSize: 34, fontWeight: 900, letterSpacing: "-0.04em", lineHeight: 1.15, color: t.tx, marginBottom: 14 }}>
              The dynamic synapse bridging raw business intent and executable code.
            </h2>
            <p style={{ fontSize: 14, color: t.sub, lineHeight: 1.6, maxWidth: 660 }}>
              Traditional product discovery and software engineering live in completely isolated environments. Groundwork unifies them into a single, continuous, real-time knowledge graph that eradicates development speculation forever.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14, marginTop: 8 }}>
            <div style={{ padding: "14px 18px", background: t.surf, border: `1px solid ${t.bd}`, borderRadius: 10, borderTop: `3px solid ${t.hi}` }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: t.tx, letterSpacing: "-0.03em" }}>10x</div>
              <div style={{ fontSize: 11, color: t.mu, fontWeight: 600, marginTop: 4 }}>Developer Path Clarity</div>
            </div>
            <div style={{ padding: "14px 18px", background: t.surf, border: `1px solid ${t.bd}`, borderRadius: 10, borderTop: `3px solid ${t.gr}` }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: t.gr, letterSpacing: "-0.03em" }}>0%</div>
              <div style={{ fontSize: 11, color: t.mu, fontWeight: 600, marginTop: 4 }}>Specification-to-Code Drift</div>
            </div>
            <div style={{ padding: "14px 18px", background: t.surf, border: `1px solid ${t.bd}`, borderRadius: 10, borderTop: `3px solid ${t.re}` }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: t.re, letterSpacing: "-0.03em" }}>-35%</div>
              <div style={{ fontSize: 11, color: t.mu, fontWeight: 600, marginTop: 4 }}>Engineering Code Rework</div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "The Core Problem: Building Blind",
      subtitle: "Why millions of dollars in enterprise sprint velocity are quietly incinerated.",
      tag: "02 / THE CRITICAL PROBLEM",
      color: t.re,
      icon: "🛑",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ fontSize: 13.5, color: t.sub, lineHeight: 1.6 }}>
            Product leads carry out deep customer conversations, expert legal compliance audits, and strategic regulatory whiteboard sessions. Yet, those rich business discoveries never reach the developer’s active coding branch.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 6 }}>
            <div style={{ padding: 16, background: t.bg, borderLeft: `4px solid ${t.re}`, borderRadius: "0 8px 8px 0", border: `1px solid ${t.bd}`, borderLeftWidth: 4 }}>
              <strong style={{ fontSize: 13, color: t.tx, display: "block", marginBottom: 6 }}>The Spec Gap</strong>
              <p style={{ fontSize: 11.5, color: t.sub, margin: 0, lineHeight: 1.5 }}>
                Engineers build mission-critical database schemas and telemetry handlers relying on guessing or brief, outdated Jira tickets.
              </p>
            </div>
            <div style={{ padding: 16, background: t.bg, borderLeft: `4px solid ${t.re}`, borderRadius: "0 8px 8px 0", border: `1px solid ${t.bd}`, borderLeftWidth: 4 }}>
              <strong style={{ fontSize: 13, color: t.tx, display: "block", marginBottom: 6 }}>Wasted Execution Cycles</strong>
              <p style={{ fontSize: 11.5, color: t.sub, margin: 0, lineHeight: 1.5 }}>
                When compliance parameters or client contracts require strict SLAs, weeks of engineered microservices are scrapped and rewritten from scratch.
              </p>
            </div>
          </div>

          <div style={{ background: t.surf, padding: "12px 16px", borderRadius: 8, border: `1px dashed ${t.bd}`, textAlign: "center", marginTop: 4 }}>
            <span style={{ fontSize: 12, fontStyle: "italic", color: t.mu }}>
              "Most software engineering failures aren't failures of coding—they are failures of alignment. Teams write robust code for the wrong product assumptions."
            </span>
          </div>
        </div>
      )
    },
    {
      title: "The Repercussions: Real Financial Risks",
      subtitle: "Downstream damage to operations, compliance, and corporate finance.",
      tag: "03 / THE IMPACT",
      color: t.re,
      icon: "💸",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <p style={{ fontSize: 13, color: t.sub, lineHeight: 1.5 }}>
            Misalignment is not just an organizational inconvenience—it directly damages the business bottom-line in measurable, severe ways:
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div style={{ padding: 14, background: t.surf, border: `1px solid ${t.bd}`, borderRadius: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 14 }}>⚠️</span>
                <strong style={{ fontSize: 12.5, color: t.tx }}>Severe Contractual Violations</strong>
              </div>
              <p style={{ fontSize: 11, color: t.sub, margin: 0, lineHeight: 1.4 }}>
                A client like LogiTech enforces a strict <strong>$10,000 SLA delay penalty</strong>. Building a latency monitor with standard parameters rather than LogiTech's limits leaves money on the table.
              </p>
            </div>

            <div style={{ padding: 14, background: t.surf, border: `1px solid ${t.bd}`, borderRadius: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 14 }}>🔒</span>
                <strong style={{ fontSize: 12.5, color: t.tx }}>Failed Identity Security Audits</strong>
              </div>
              <p style={{ fontSize: 11, color: t.sub, margin: 0, lineHeight: 1.4 }}>
                Failure to implement specific client SAML 2.0 corporate SSO requirements at release blocks deployment and violates enterprise compliance contracts.
              </p>
            </div>

            <div style={{ padding: 14, background: t.surf, border: `1px solid ${t.bd}`, borderRadius: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 14 }}>⏳</span>
                <strong style={{ fontSize: 12.5, color: t.tx }}>Crippled Release Cycles</strong>
              </div>
              <p style={{ fontSize: 11, color: t.sub, margin: 0, lineHeight: 1.4 }}>
                Sprints drag on endlessly as developers ask constant back-and-forth discovery questions, waiting days to verify simple business logic.
              </p>
            </div>

            <div style={{ padding: 14, background: t.surf, border: `1px solid ${t.bd}`, borderRadius: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: 14 }}>👥</span>
                <strong style={{ fontSize: 12.5, color: t.tx }}>Onboarding Sinking Debt</strong>
              </div>
              <p style={{ fontSize: 11, color: t.sub, margin: 0, lineHeight: 1.4 }}>
                Newly engaged contractors spend weeks sifting through scattered slack histories and obsolete wikis before writing their first correct coordinate.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Why Traditional Solutions Fail Us",
      subtitle: "Wikis, Jira boards, and text documents are dead graveyard systems.",
      tag: "04 / THE SYSTEMIC GAP",
      color: t.am,
      icon: "📉",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ fontSize: 13.5, color: t.sub, lineHeight: 1.5 }}>
            Traditional tools create a false sense of security but fail to solve the actual alignment challenge:
          </p>

          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 11.5, background: t.surf, borderRadius: 8, overflow: "hidden", border: `1px solid ${t.bd}` }}>
            <thead>
              <tr style={{ background: t.bg, borderBottom: `1px solid ${t.bd}` }}>
                <th style={{ padding: "10px 14px", textAlign: "left", color: t.tx, fontWeight: 700 }}>Approach</th>
                <th style={{ padding: "10px 14px", textAlign: "left", color: t.tx, fontWeight: 700 }}>The Fatal Flaw</th>
                <th style={{ padding: "10px 14px", textAlign: "left", color: t.tx, fontWeight: 700 }}>The End Result</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: `1px solid ${t.bd}` }}>
                <td style={{ padding: "10px 14px", fontWeight: 700, color: t.tx }}>Notion & Confluence Wikis</td>
                <td style={{ padding: "10px 14px", color: t.sub }}>They become stale 15 minutes after write-up and engineers rarely read them during active coding.</td>
                <td style={{ padding: "10px 14px", color: t.re, fontWeight: 600 }}>Stale documentation cemetery</td>
              </tr>
              <tr style={{ borderBottom: `1px solid ${t.bd}` }}>
                <td style={{ padding: "10px 14px", fontWeight: 700, color: t.tx }}>Static Jira Tickets</td>
                <td style={{ padding: "10px 14px", color: t.sub }}>Describe only transactional, isolated tasks with no global ecosystem guardrails or relationship map.</td>
                <td style={{ padding: "10px 14px", color: t.re, fontWeight: 600 }}>Fragmented focus bubbles</td>
              </tr>
              <tr>
                <td style={{ padding: "10px 14px", fontWeight: 700, color: t.tx }}>Slack / Teams History</td>
                <td style={{ padding: "10px 14px", color: t.sub }}>Transient decision chains where key constraints remain forever hidden in unstructured replies.</td>
                <td style={{ padding: "10px 14px", color: t.re, fontWeight: 600 }}>Information scavenger hunt</td>
              </tr>
            </tbody>
          </table>

          <div style={{ background: t.bg, padding: "10px 14px", borderRadius: 8, fontSize: 11.5, color: t.sub }}>
            💡 <strong>The Paradigm Shift:</strong> Specifications must not live as offline text. They must live as a <strong>continuous, queries-friendly knowledge graph</strong> that bridges product and code.
          </div>
        </div>
      )
    },
    {
      title: "The Groundwork Paradigm",
      subtitle: "Two dynamic tracks bound together by our Synapse Knowledge Graph.",
      tag: "05 / THE PARADIGM SHIFT",
      color: t.gr,
      icon: "✨",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 18, height: "100%", justifyContent: "center" }}>
          <p style={{ fontSize: 13.5, color: t.sub, lineHeight: 1.5 }}>
            Groundwork creates an interconnected double-track workspace designed to unite product, client requirements, and active development in perfect alignment:
          </p>

          <div style={{ display: "flex", gap: 12, alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
            {/* BOX 1 */}
            <div style={{ flex: 1, padding: 14, background: t.bg, borderRadius: 10, border: `1px solid ${t.bd}`, textAlign: "center" }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>📥</div>
              <strong style={{ fontSize: 12.5, color: t.tx, display: "block", marginBottom: 2 }}>The PM Track</strong>
              <span style={{ fontSize: 10.5, color: t.mu }}>Uploads transcripts, audio voice transcripts, regulatory briefs, extract specs.</span>
            </div>

            {/* SYNC BRIDGE */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "0 6px" }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: t.hi, fontFamily: "monospace", letterSpacing: "1px" }}>SYNAPSE</span>
              <span style={{ fontSize: 20, color: t.hi }}>⚡</span>
              <span style={{ fontSize: 11, fontWeight: 800, color: t.gr, fontFamily: "monospace", letterSpacing: "1px" }}>GRAPH</span>
            </div>

            {/* BOX 2 */}
            <div style={{ flex: 1, padding: 14, background: t.bg, borderRadius: 10, border: `1px solid ${t.bd}`, textAlign: "center" }}>
              <div style={{ fontSize: 20, marginBottom: 4 }}>💻</div>
              <strong style={{ fontSize: 12.5, color: t.tx, display: "block", marginBottom: 2 }}>The Dev Track</strong>
              <span style={{ fontSize: 10.5, color: t.mu }}>Instantly views DB frameworks, API endpoints, entity flowcharts conformant to live specs.</span>
            </div>
          </div>

          <div style={{ textAlign: "center", fontSize: 11, color: t.mu }}>
            If a business restriction changes on the PM track, the developer's guardrails are updated instantly.
          </div>
        </div>
      )
    },
    {
      title: "Step 1: Intelligent Transcripts Ingestion",
      subtitle: "Converting raw stakeholder conversations into formal compliance guidelines.",
      tag: "06 / WORKFLOW: INGESTION",
      color: t.hi,
      icon: "📥",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ fontSize: 13, color: t.sub, lineHeight: 1.5 }}>
            Instead of requiring templates or forcing PMs to write technical specs, Groundwork handles the messy translation automatically:
          </p>

          <div style={{ border: `1px solid ${t.bd}`, borderRadius: 10, background: t.bg, padding: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `1px solid ${t.bd}`, paddingBottom: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: t.tx }}>📄 RAW CLIENT INTERVIEW TRANSCRIPT</span>
              <Badge t={t} label="AI PARSING ENABLED" color="blue" />
            </div>
            
            <p style={{ fontSize: 11.5, color: t.sub, fontStyle: "italic", margin: "0 0 12px 0", lineHeight: 1.5 }}>
              "...Alex Chen emphasizes they absolutely require SAML 2.0 Identity Assertion so their corporate team can authenticate securely. Additionally, any delayed shipment telemetry updates exceeding 15 minutes invite a strict penalty of $10,000 as per SLA terms..."
            </p>

            <div style={{ display: "flex", gap: 10 }}>
              <div style={{ flex: 1, background: t.surf, padding: "10px 12px", borderRadius: 6, border: `1px solid ${t.bd}` }}>
                <span style={{ fontSize: 8, fontWeight: 800, color: t.hi, display: "block", marginBottom: 2 }}>EXTRACTED SLA CONSTRAINT</span>
                <strong style={{ fontSize: 11.5, color: t.tx }}>$10,000 Deficit Fine</strong>
              </div>
              <div style={{ flex: 1, background: t.surf, padding: "10px 12px", borderRadius: 6, border: `1px solid ${t.bd}` }}>
                <span style={{ fontSize: 8, fontWeight: 800, color: t.gr, display: "block", marginBottom: 2 }}>SECURITY PARAMETER</span>
                <strong style={{ fontSize: 11.5, color: t.tx }}>SAML 2.0 OAuth / SSO</strong>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Step 2: The Living Knowledge Graph",
      subtitle: "Fusing unstructured constraints into structured developer parameters.",
      tag: "07 / WORKFLOW: SYNAPSE SYNC",
      color: t.gr,
      icon: "⛓️",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ fontSize: 13, color: t.sub, lineHeight: 1.5 }}>
            Fusing extracted constraints directly into the system parameters binds business requirements to active development live:
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <div style={{ padding: 14, background: t.surf, border: `1px solid ${t.bd}`, borderRadius: 8 }}>
              <div style={{ fontSize: 18, marginBottom: 4 }}>1️⃣</div>
              <strong style={{ fontSize: 12.5, color: t.tx, display: "block", marginBottom: 2 }}>Immutable Directives</strong>
              <p style={{ fontSize: 10.5, color: t.sub, margin: 0, lineHeight: 1.4 }}>
                Variables are created inside Groundwork with verified links back to the original transcript sentence for absolute grounding truth.
              </p>
            </div>
            <div style={{ padding: 14, background: t.surf, border: `1px solid ${t.bd}`, borderRadius: 8 }}>
              <div style={{ fontSize: 18, marginBottom: 4 }}>2️⃣</div>
              <strong style={{ fontSize: 12.5, color: t.tx, display: "block", marginBottom: 2 }}>Enterprise Sync</strong>
              <p style={{ fontSize: 10.5, color: t.sub, margin: 0, lineHeight: 1.4 }}>
                Deploy & Sync passes these specifications instantly to the active Engineering track, transforming code structure constraints in real time.
              </p>
            </div>
          </div>

          <div style={{ background: t.bg, padding: "10px 14px", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 11, color: t.sub }}>Active Synced Constraints:</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: t.gr }}>● LogiTech SLA Limit Configured</span>
          </div>
        </div>
      )
    },
    {
      title: "Step 3: Automated Developer Workspace",
      subtitle: "Enforcing business-aligned PostgreSQL drafts, diagrams, and queries.",
      tag: "08 / WORKFLOW: CODE AUTOMATION",
      color: t.hi,
      icon: "💻",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ fontSize: 13, color: t.sub, lineHeight: 1.5 }}>
            Switching tracks to 'Engineering' allows developers to view auto-conformed system skeletons directly:
          </p>

          <div style={{ border: `1px solid ${t.bd}`, borderRadius: 10, background: "#0b0f19", padding: 14, fontFamily: "monospace" }}>
            <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #1f2937", paddingBottom: 6, marginBottom: 10, fontSize: 10, color: "#94a3b8" }}>
              <span>🛠️ POSTGRESQL SCHEMA SYNAPSE</span>
              <span style={{ color: t.gr }}>✓ BOUND TO LOGITECH CONTRACT</span>
            </div>
            <pre style={{ fontSize: 9.5, color: "#34d399", margin: 0, lineHeight: 1.4, overflowX: "auto" }}>
{`CREATE TABLE logitech_latency_slas (
  id SERIAL PRIMARY KEY,
  max_delay_minutes INT DEFAULT 15,
  penalty_fine_usd DECIMAL DEFAULT 10000.00,
  sso_enforced VARCHAR DEFAULT 'SAML_2_0_ASSERT'
);`}
            </pre>
          </div>

          <p style={{ fontSize: 11, color: t.mu, margin: 0, textAlign: "center" }}>
            Developers can also request guidelines from our <strong>AI Synapse Copilot Chat Channel</strong>, backed strictly by grounded raw data.
          </p>
        </div>
      )
    },
    {
      title: "The Groundwork Business Case (ROI)",
      subtitle: "Why bringing product and code together returns monumental returns.",
      tag: "09 / EXECUTIVE VALUE",
      color: t.gr,
      icon: "📈",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ fontSize: 13, color: t.sub, lineHeight: 1.5 }}>
            Groundwork creates customized value loops across your entire corporate hierarchy:
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <div style={{ padding: 12, background: t.surf, border: `1px solid ${t.bd}`, borderRadius: 8 }}>
              <span style={{ fontSize: 20, display: "block", marginBottom: 4 }}>📈</span>
              <strong style={{ fontSize: 12, color: t.tx, display: "block", marginBottom: 2 }}>Product Leaders</strong>
              <p style={{ fontSize: 10, color: t.sub, margin: 0, lineHeight: 1.4 }}>
                Ship right the first time. Zero spec-to-code drift means launch schedules remain predictable.
              </p>
            </div>
            <div style={{ padding: 12, background: t.surf, border: `1px solid ${t.bd}`, borderRadius: 8 }}>
              <span style={{ fontSize: 20, display: "block", marginBottom: 4 }}>💻</span>
              <strong style={{ fontSize: 12, color: t.tx, display: "block", marginBottom: 2 }}>CTOs & Engineers</strong>
              <p style={{ fontSize: 10, color: t.sub, margin: 0, lineHeight: 1.4 }}>
                No more guessing database or compliance scopes. Speed up newly hired developer onboarding 10x.
              </p>
            </div>
            <div style={{ padding: 12, background: t.surf, border: `1px solid ${t.bd}`, borderRadius: 8 }}>
              <span style={{ fontSize: 20, display: "block", marginBottom: 4 }}>🎯</span>
              <strong style={{ fontSize: 12, color: t.tx, display: "block", marginBottom: 2 }}>Sales & Account Execs</strong>
              <p style={{ fontSize: 10, color: t.sub, margin: 0, lineHeight: 1.4 }}>
                Close enterprise deals with physical prototype proofs instantly showing conformed identity schemas.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: "Conclusion: The Future is Grounded",
      subtitle: "Ditch the spec graves. Start synchronizing product and code on Day-0.",
      tag: "10 / LIVE SANDBOX DEMO",
      color: t.hi,
      icon: "🏁",
      content: (
        <div style={{ display: "flex", flexDirection: "column", gap: 20, height: "100%", justifyContent: "center" }}>
          <div style={{ padding: 18, background: t.bg, borderRadius: 10, border: `1px solid ${t.bd}`, textAlign: "center" }}>
            <strong style={{ fontSize: 14, color: t.tx, display: "block", marginBottom: 4 }}>Checklist for your sandbox walkthrough:</strong>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "center", marginTop: 8 }}>
              <span style={{ fontSize: 11.5, color: t.sub }}>1️⃣ Tap <strong>Alex Chen</strong> in the Intake dashboard to analyze raw SLA penalties.</span>
              <span style={{ fontSize: 11.5, color: t.sub }}>2️⃣ Click <strong>Deploy & Sync</strong> to propagate constraints dynamically.</span>
              <span style={{ fontSize: 11.5, color: t.sub }}>3️⃣ Toggle context track to <strong>Engineering</strong> to view PostgreSQL structures.</span>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", background: t.tx, color: t.surf, borderRadius: 8 }}>
            <div>
              <strong style={{ fontSize: 13, display: "block", color: t.surf }}>Ready to see the physical system in action?</strong>
              <span style={{ fontSize: 11, color: t.surf + "bb" }}>Launch our fully interactive, dual-track demo simulator.</span>
            </div>
            <Btn t={t} pri onClick={() => go("onboarding")}>Launch Active Sandbox ➔</Btn>
          </div>
        </div>
      )
    }
  ];

  const cur = slides[slide];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: t.al }}>
      
      {/* HEADER BAR */}
      <div style={{ padding: "12px 30px", background: t.surf, borderBottom: `1px solid ${t.bd}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ width: 22, height: 22, background: t.tx, borderRadius: 5, color: t.surf, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 11 }}>G</div>
          <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: "-0.01em" }}>Groundwork Show Deck</span>
          <Badge t={t} label={`SLIDE ${slide + 1} OF ${slides.length}`} color="blue" />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button
            onClick={handleCopyLink}
            style={{
              fontSize: 11,
              fontWeight: 700,
              padding: "6px 12px",
              background: copied ? t.gr : t.hi + "18",
              color: copied ? "white" : t.hi,
              border: `1px solid ${copied ? t.gr : t.hi}`,
              borderRadius: 6,
              cursor: "pointer",
              fontFamily: "inherit",
              display: "inline-flex",
              alignItems: "center",
              gap: 5,
              transition: "all 0.15s ease-in-out"
            }}
          >
            {copied ? "✓ Copied Link!" : "🔗 Copy Public Share Link"}
          </button>
          <Btn t={t} sm onClick={() => go("landing")}><i className="ti ti-arrow-left" style={{ fontSize: 11 }} /> Return Home</Btn>
        </div>
      </div>

      {/* ACTIVE PRESENTATION CANVAS */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px", overflowY: "auto" }}>
        
        <div 
          style={{ 
            width: "100%", 
            maxWidth: 820, 
            background: t.surf, 
            border: `2px solid ${t.tx}`, 
            borderRadius: 16, 
            boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
            padding: "40px 44px",
            minHeight: 460,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            transition: "all 0.25s ease-out"
          }}
        >
          {/* HEADER ROW */}
          <div style={{ display: "flex", alignItems: "center", justifyItems: "center", justifyContent: "space-between", borderBottom: `1px solid ${t.bd}`, paddingBottom: 16, marginBottom: 20 }}>
            <div>
              <span style={{ fontSize: 9, fontWeight: 900, color: cur.color, letterSpacing: "0.15em", textTransform: "uppercase" }}>{cur.tag}</span>
              <h3 style={{ fontSize: 24, fontWeight: 800, color: t.tx, letterSpacing: "-0.02em", marginTop: 2 }}>{cur.title}</h3>
              <p style={{ fontSize: 12, color: t.sub, marginTop: 1 }}>{cur.subtitle}</p>
            </div>
            <div style={{ width: 38, height: 38, borderRadius: 8, background: cur.color + "15", display: "flex", alignItems: "center", justifyContent: "center", color: cur.color, fontSize: 16, fontWeight: 800 }}>
              {cur.icon || "💡"}
            </div>
          </div>

          {/* PLAYGROUND CONTENT CARRIER */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {cur.content}
          </div>

          {/* NAVIGATIONAL CONTROLS BOTTOM BUTTONS */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: `1px solid ${t.bd}`, pt: 20, marginTop: 24 }}>
            <div style={{ display: "flex", gap: 6 }}>
              {slides.map((_, i) => (
                <div 
                  key={i} 
                  onClick={() => setSlide(i)}
                  style={{ 
                    width: 12, 
                    height: 12, 
                    borderRadius: "50%", 
                    background: i === slide ? cur.color : t.bd,
                    border: i === slide ? `2px solid ${t.tx}` : "none",
                    cursor: "pointer",
                    transition: "all 0.15s"
                  }} 
                />
              ))}
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              {slide > 0 && (
                <Btn t={t} onClick={() => setSlide(prev => prev - 1)}>
                  ◀ Back
                </Btn>
              )}
              {slide < slides.length - 1 ? (
                <button 
                  onClick={() => setSlide(prev => prev + 1)} 
                  style={{
                    background: t.tx,
                    color: t.surf,
                    border: "none",
                    borderRadius: 6,
                    padding: "8px 18px",
                    fontWeight: 700,
                    fontSize: 12.5,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    display: "flex",
                    alignItems: "center",
                    gap: 6
                  }}
                >
                  Continue Slide ➔
                </button>
              ) : (
                <button 
                  onClick={() => go("onboarding")}
                  style={{
                    background: t.hi,
                    color: "white",
                    border: "none",
                    borderRadius: 6,
                    padding: "8px 20px",
                    fontWeight: 700,
                    fontSize: 12.5,
                    cursor: "pointer",
                    fontFamily: "inherit"
                  }}
                >
                  Enter Live Sandbox 🚀
                </button>
              )}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
