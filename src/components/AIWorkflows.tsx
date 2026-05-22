import React, { useState, useRef, useEffect } from "react";
import { Btn, Badge, Card, CardHeader, Topbar, Stepbar, ContextPanel } from "./CoreUI";
import { FLOW_DATA, PERSONAS, AI_STEPS, makeContextInit, scol, callOpenAI, DOMAINS_DATA } from "../data";

// ─── Flowchart SVG Component ───
export function FlowchartSVG({ flow, t }: { flow: any; t: any }) {
  if (!flow?.steps?.length) return <div style={{ color: t.mu, fontSize: 12, padding: 20 }}>No steps defined.</div>;
  const steps = flow.steps;
  const NODE_W = 130, NODE_H = 44, COL_GAP = 65, ROW_GAP = 72;

  // Assign grid positions
  const col: Record<string, number> = {};
  const row: Record<string, number> = {};
  
  function assign(id: string, c: number, r: number) {
    if (col[id] !== undefined) return;
    col[id] = c; row[id] = r;
    const nd = steps.find((s: any) => s.id === id);
    if (!nd) return;
    if (nd.type === "decision") {
      if (nd.yes) assign(nd.yes, c + 1, r);
      if (nd.no)  assign(nd.no,  c,     r + 1);
    } else if (nd.next) {
      assign(nd.next, c + 1, r);
    }
  }
  
  assign(steps[0].id, 0, 0);

  const colVals = Object.values(col);
  const rowVals = Object.values(row);
  const maxCol = colVals.length > 0 ? Math.max(...colVals) : 0;
  const maxRow = rowVals.length > 0 ? Math.max(...rowVals) : 0;
  const svgW = (maxCol + 1) * (NODE_W + COL_GAP) + 40;
  const svgH = (maxRow + 1) * (NODE_H + ROW_GAP) + 60;

  const nx = (id: string) => 30 + col[id] * (NODE_W + COL_GAP);
  const ny = (id: string) => 30 + row[id] * (NODE_H + ROW_GAP);

  const colors = { action: "#e8e8e8", decision: "#ffffff", trigger: "#d0d0d0", end: "#0a0a0a" };
  const borders = { action: "#cccccc", decision: "#0a0a0a", trigger: "#aaaaaa", end: "#0a0a0a" };
  const txcols = { action: "#0a0a0a", decision: "#0a0a0a", trigger: "#0a0a0a", end: "#ffffff" };

  return (
    <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} style={{ display: "block" }}>
      <defs>
        <marker id={`ah-${flow.n}`} markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
          <polygon points="0 0,8 3,0 6" fill="#888" />
        </marker>
      </defs>

      {/* Edges */}
      {steps.map((s: any) => {
        if (col[s.id] === undefined) return null;
        const mid = `url(#ah-${flow.n})`;
        const edges: React.ReactNode[] = [];
        if (s.type === "decision") {
          if (s.yes && col[s.yes] !== undefined) {
            const sameRow = row[s.yes] === row[s.id];
            if (sameRow) {
              const x1 = nx(s.id) + NODE_W, y1 = ny(s.id) + NODE_H / 2;
              const x2 = nx(s.yes), y2 = ny(s.yes) + NODE_H / 2;
              edges.push(
                <g key={`yes-${s.id}`}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#888" strokeWidth="1.5" markerEnd={mid} />
                  <text x={(x1 + x2) / 2} y={y1 - 5} fontSize="9" fill="#888" textAnchor="middle" fontFamily="Inter,sans-serif">Yes</text>
                </g>
              );
            } else {
              edges.push(<line key={`yes-${s.id}`} x1={nx(s.id)+NODE_W/2} y1={ny(s.id)+NODE_H} x2={nx(s.yes)+NODE_W/2} y2={ny(s.yes)} stroke="#888" strokeWidth="1.5" markerEnd={mid} />);
            }
          }
          if (s.no && col[s.no] !== undefined) {
            const x1 = nx(s.id) + NODE_W / 2, y1 = ny(s.id) + NODE_H + 6;
            const x2 = nx(s.no) + NODE_W / 2, y2 = ny(s.no);
            edges.push(
              <g key={`no-${s.id}`}>
                <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#888" strokeWidth="1.5" strokeDasharray="4,3" markerEnd={mid} />
                <text x={x1 + 8} y={(ny(s.id) + NODE_H + ny(s.no)) / 2} fontSize="9" fill="#888" fontFamily="Inter,sans-serif">No</text>
              </g>
            );
          }
        } else if (s.next && col[s.next] !== undefined) {
          const sameRow = row[s.next] === row[s.id];
          if (sameRow) {
            edges.push(<line key={`next-${s.id}`} x1={nx(s.id)+NODE_W} y1={ny(s.id)+NODE_H/2} x2={nx(s.next)} y2={ny(s.next)+NODE_H/2} stroke="#888" strokeWidth="1.5" markerEnd={mid} />);
          } else {
            edges.push(<line key={`next-${s.id}`} x1={nx(s.id)+NODE_W/2} y1={ny(s.id)+NODE_H} x2={nx(s.next)+NODE_W/2} y2={ny(s.next)} stroke="#888" strokeWidth="1.5" markerEnd={mid} />);
          }
        }
        return edges;
      })}

      {/* Nodes */}
      {steps.map((s: any) => {
        if (col[s.id] === undefined) return null;
        const x = nx(s.id), y = ny(s.id);
        const fill = colors[s.type as keyof typeof colors] || "#e8e8e8";
        const stroke = borders[s.type as keyof typeof borders] || "#ccc";
        const textCol = txcols[s.type as keyof typeof txcols] || "#0a0a0a";
        const label = s.label.length > 15 ? s.label.slice(0, 13) + "…" : s.label;

        return (
          <g key={s.id}>
            {s.type === "decision" ? (
              <>
                <polygon
                  points={`${x+NODE_W/2},${y-4} ${x+NODE_W+6},${y+NODE_H/2} ${x+NODE_W/2},${y+NODE_H+4} ${x-6},${y+NODE_H/2}`}
                  fill={fill} stroke={stroke} strokeWidth="1.5"
                />
                <text x={x+NODE_W/2} y={y+NODE_H/2-8} textAnchor="middle" fontSize="8" fill="#888" fontFamily="Inter,sans-serif">◆ decision</text>
              </>
            ) : s.type === "end" || s.type === "trigger" ? (
              <rect x={x} y={y} width={NODE_W} height={NODE_H} rx={NODE_H/2} fill={fill} stroke={stroke} strokeWidth="1.5" />
            ) : (
              <rect x={x} y={y} width={NODE_W} height={NODE_H} rx={5} fill={fill} stroke={stroke} strokeWidth="1" />
            )}
            <text x={x+NODE_W/2} y={y+NODE_H/2+(s.type==="decision"?5:4)} textAnchor="middle" fontSize="11" fill={textCol} fontFamily="Inter,sans-serif" fontWeight="500">
              {label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── Discover Component ───
export function Discover({ t, go, ctx, upCtx, wctx, onToggle, role = "business", setRole }: any) {
  const isEng = role === "engineer";

  // Business Track Conversation State
  const [msgs, setMsgs] = useState<any[]>(() => {
    const finalized = wctx.filter((i: any) => i.status === "finalized").length;
    return [{ role: "assistant", content: makeContextInit(ctx.idea, finalized, wctx.length) }];
  });
  const [input, setInput] = useState(ctx.idea || "");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  // Engineering Scope Chat State (isolated to avoid crosstalk)
  const [engMsgs, setEngMsgs] = useState<any[]>(() => {
    return [
      {
        role: "assistant",
        content: `### 🛠️ Engineering Scope Assistant\n\nWe are looking at **${ctx.idea || "this project"}** through the Engineering Track.\n\nAll raw brainstorm notes have been filtered out. Only finalized, immutable project decisions are loaded in your context container on the right.\n\nHow can I help you understand the system architecture, component dependencies, or execution guidelines?`
      }
    ];
  });
  const [engInput, setEngInput] = useState("");
  const [engLoading, setEngLoading] = useState(false);
  const engChatRef = useRef<HTMLDivElement>(null);

  useEffect(() => { 
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight; 
  }, [msgs]);

  useEffect(() => { 
    if (engChatRef.current) engChatRef.current.scrollTop = engChatRef.current.scrollHeight; 
  }, [engMsgs]);

  const send = async (text?: string) => {
    const txt = (text || input).trim();
    if (!txt || loading) return;
    const um = { role: "user", content: txt };
    const next = [...msgs, um];
    setMsgs(next);
    setInput("");
    upCtx({ idea: txt });
    setLoading(true);
    try {
      const reply = await callOpenAI(next, "You are a product discovery assistant. Ask 2–3 sharp follow-up questions per reply to surface assumptions, risks, competitors, user goals, and GTM. Be concise. After 3+ exchanges, suggest moving to Scorecard.");
      setMsgs(prev => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMsgs(prev => [...prev, { role: "assistant", content: "Error reaching API. Check your database connection." }]);
    }
    setLoading(false);
  };

  const sendEng = async (text?: string) => {
    const txt = (text || engInput).trim();
    if (!txt || engLoading) return;
    const um = { role: "user", content: txt };
    const next = [...engMsgs, um];
    setEngMsgs(next);
    setEngInput("");
    setEngLoading(true);
    try {
      const finalizedSummary = wctx.filter((i: any) => i.status === "finalized").map((i: any) => `* ${i.label}: ${i.value}`).join("\n");
      const systemContext = `The project is: "${ctx.idea}".\nHere are the finalized requirements & design variables:\n${finalizedSummary}\n\nHelp the engineer understand technical architecture, code modularity, database structures, or security protocols based ONLY on these decisions.`;
      const reply = await callOpenAI(next, `You are a professional system architect and lead developer assistant. ${systemContext}`);
      setEngMsgs(prev => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setEngMsgs(prev => [...prev, { role: "assistant", content: "Error reaching API. Check your database connection." }]);
    }
    setEngLoading(false);
  };

  const tags = [
    ["ti-alert-triangle","Risks",       "What are the biggest risks?"],
    ["ti-users",         "Competitors", "Who are the main competitors?"],
    ["ti-bulb",          "Assumptions", "Key assumptions we are making?"],
    ["ti-rocket",        "GTM",         "What is the go-to-market strategy?"],
    ["ti-currency-dollar","Monetization","What is the monetization model?"],
  ];

  const engTags = [
    ["ti-cpu", "Database Schema", "Can you design a Postgres layout for these finalised decisions?"],
    ["ti-api", "API Spec", "What REST endpoints are required for this scope?"],
    ["ti-list-check", "Sprint Tasks", "Break down this finalized scope into developer JIRA subtasks."],
    ["ti-shield-checkell", "Security Constraints", "Describe potential security and rate limiting requirements for this architecture."]
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Topbar 
        t={t} 
        title={isEng ? "Scope Exploration" : "Discovery"} 
        sub="Step 1 of 3" 
        onBack={() => go(isEng ? "eng-dashboard" : "dashboard")} 
        backLabel={isEng ? "Eng Dashboard" : "Dashboard"}
        role={role}
        setRole={setRole}
        go={go}
      >
        <Btn t={t} sm pri={!isEng} onClick={() => go(isEng ? "blueprint" : "scorecard")}>
          {isEng ? "View Blueprint" : "Continue to Scorecard"} <i className="ti ti-arrow-right" />
        </Btn>
      </Topbar>
      <Stepbar t={t} active={0} go={go} />
      
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {isEng ? (
          // 🛠️ ENGINEERING TRACK VIEW (Hides messy brainstorm thread, provides deep requirements scope chatbot)
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ background: t.al, padding: "8px 18px", borderBottom: `1px solid ${t.bd}`, display: "flex", alignItems: "center", gap: 8 }}>
              <i className="ti ti-info-circle" style={{ color: t.gr, fontSize: 13 }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: t.sub, letterSpacing: "0.02em" }}>
                ENGINEERING FILTER ACTIVE · Messy discovery brainstorms hidden. Reviewing finalized variables only.
              </span>
            </div>
            {/* Engineering chat workspace */}
            <div ref={engChatRef} style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 10, background: t.bg }}>
              {engMsgs.map((m, i) => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                  {m.role === "assistant" && <div style={{ width: 22, height: 22, borderRadius: 5, background: t.gr, color: "#fff", fontSize: 10, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}><i className="ti ti-code" style={{ fontSize: 10 }} /></div>}
                  <div style={{ padding: "10px 14px", fontSize: 12, lineHeight: 1.6, maxWidth: "78%", background: m.role === "user" ? t.tx : t.surf, color: m.role === "user" ? t.surf : t.tx, borderRadius: m.role === "user" ? "8px 0 8px 8px" : "0 8px 8px 8px", border: `1px solid ${m.role === "user" ? t.tx : t.bd}`, whiteSpace: "pre-line" }}>
                    {m.content}
                  </div>
                </div>
              ))}
              {engLoading && (
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ width: 22, height: 22, borderRadius: 5, background: t.gr, color: "#fff", fontSize: 10, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}><i className="ti ti-code" style={{ fontSize: 10 }} /></div>
                  <div style={{ padding: "8px 12px", fontSize: 12, background: t.surf, border: `1px solid ${t.bd}`, borderRadius: "0 8px 8px 8px", color: t.mu }}>Analyzing finalized context…</div>
                </div>
              )}
            </div>
            {/* Quick engineering prompts */}
            <div style={{ padding: "7px 18px", borderTop: `1px solid ${t.bd}`, borderBottom: `1px solid ${t.bd}`, background: t.surf, display: "flex", gap: 6, flexWrap: "wrap", flexShrink: 0 }}>
              {engTags.map(([icon, label, text]) => (
                <span key={label} onClick={() => sendEng(text)} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 4, background: t.al, border: `1px solid ${t.bd}`, fontSize: 11, color: t.sub, cursor: "pointer" }}>
                  <i className={`ti ${icon}`} style={{ fontSize: 11 }} /> {label}
                </span>
              ))}
            </div>
            {/* Engineering input */}
            <div style={{ padding: "10px 18px", background: t.surf, display: "flex", gap: 8, alignItems: "flex-end" }}>
              <textarea value={engInput} onChange={e => setEngInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendEng(); } }}
                placeholder="Ask technical clarification questions about the finalised scope Decisions…" rows={2}
                style={{ flex: 1, border: `1px solid ${t.bd}`, borderRadius: 6, padding: "8px 12px", fontSize: 12, outline: "none", color: t.tx, background: t.surf, resize: "none", fontFamily: "inherit", lineHeight: 1.5 }}
              />
              <Btn t={t} style={{ borderColor: t.gr, background: t.gr, color: "#fff" }} sm onClick={() => sendEng()} disabled={engLoading}>Consult AI</Btn>
            </div>
          </div>
        ) : (
          // 💼 BUSINESS TRACK VIEW (Full conversational product discovery)
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {/* Chat */}
            <div ref={chatRef} style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 10, background: t.surf }}>
              {msgs.map((m, i) => (
                <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                  {m.role === "assistant" && <div style={{ width: 20, height: 20, borderRadius: 4, background: t.tx, color: t.surf, fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>G</div>}
                  <div style={{ padding: "8px 12px", fontSize: 12, lineHeight: 1.6, maxWidth: "78%", background: m.role === "user" ? t.tx : t.al, color: m.role === "user" ? t.surf : t.tx, borderRadius: m.role === "user" ? "8px 0 8px 8px" : "0 8px 8px 8px", border: `1px solid ${m.role === "user" ? t.tx : t.bd}` }}>
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div style={{ display: "flex", gap: 8 }}>
                  <div style={{ width: 20, height: 20, borderRadius: 4, background: t.tx, color: t.surf, fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>G</div>
                  <div style={{ padding: "8px 12px", fontSize: 12, background: t.al, border: `1px solid ${t.bd}`, borderRadius: "0 8px 8px 8px", color: t.mu }}>Thinking…</div>
                </div>
              )}
            </div>
            {/* Quick tags */}
            <div style={{ padding: "7px 18px", borderTop: `1px solid ${t.bd}`, borderBottom: `1px solid ${t.bd}`, background: t.surf, display: "flex", gap: 6, flexWrap: "wrap", flexShrink: 0 }}>
              {tags.map(([icon, label, text]) => (
                <span key={label} onClick={() => send(text)} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 4, background: t.al, border: `1px solid ${t.bd}`, fontSize: 11, color: t.sub, cursor: "pointer" }}>
                  <i className={`ti ${icon}`} style={{ fontSize: 11 }} /> {label}
                </span>
              ))}
              <span onClick={() => go("context")} style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 4, background: t.al, border: `1px solid ${t.bd}`, fontSize: 11, color: t.sub, cursor: "pointer" }}>
                <i className="ti ti-upload" style={{ fontSize: 11 }} /> Domain Repository
              </span>
              <span onClick={() => go("scorecard")} style={{ marginLeft: "auto", display: "inline-flex", alignItems: "center", gap: 4, padding: "3px 8px", borderRadius: 4, border: `1px solid ${t.tx}`, fontSize: 11, color: t.tx, cursor: "pointer", fontWeight: 600 }}>
                <i className="ti ti-arrow-right" style={{ fontSize: 11 }} /> Move to Scorecard
              </span>
            </div>
            {/* Input */}
            <div style={{ padding: "10px 18px", background: t.surf, display: "flex", gap: 8, alignItems: "flex-end" }}>
              <textarea value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                placeholder="Reply or describe your idea…" rows={2}
                style={{ flex: 1, border: `1px solid ${t.bd}`, borderRadius: 6, padding: "8px 12px", fontSize: 12, outline: "none", color: t.tx, background: t.surf, resize: "none", fontFamily: "inherit", lineHeight: 1.5 }}
              />
              <Btn t={t} sm pri onClick={() => send()} disabled={loading}>Send</Btn>
            </div>
          </div>
        )}
        
        {/* Context panel with wctx - responds to engineering readOnly views */}
        <ContextPanel t={t} wctx={wctx} onToggle={onToggle} idea={ctx.idea} role={role} />
      </div>
    </div>
  );
}

// ─── ContextChat Component ───
export function ContextChat({ 
  t, 
  go, 
  ctx, 
  wctx, 
  onToggle, 
  role = "business", 
  setRole,
  activeDomainId,
  setActiveDomainId,
  projects,
  onSelectProject
}: any) {
  const selectedDomain = DOMAINS_DATA.find(d => d.id === activeDomainId) || DOMAINS_DATA[0];
  const [msgs, setMsgs] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => { 
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight; 
  }, [msgs]);

  // Sync welcome greeting when project or domain alignment changes
  useEffect(() => {
    setMsgs([
      { 
        role: "assistant", 
        content: `I have successfully aligned with **${ctx.id}** (${ctx.idea?.slice(0, 65)}...) and the **${selectedDomain.n}** domain guidelines.\n\nAll subsequent questions are contextualized with these technical and market constraints. What aspect of this domain-project model can I clarify or expand for you?` 
      }
    ]);
  }, [ctx.id, activeDomainId]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const um = { role: "user", content: input };
    const next = [...msgs, um];
    setMsgs(next);
    setInput("");
    setLoading(true);

    const finalizedSummary = wctx.filter((i: any) => i.status === "finalized").map((i: any) => `* ${i.label}: ${i.value}`).join("\n");
    const domainSummary = selectedDomain.sections.map((s: any) => {
      const entriesStr = s.entries.map((e: any) => `  - ${e.k}: ${e.v}`).join("\n");
      return `* ${s.cat}:\n${entriesStr}`;
    }).join("\n");

    const systemPrompt = `You are an engineering context assistant. Your conversation is strictly aligned to the following scope:
- Active Project: "${ctx.id} (${ctx.idea || "Draft stage"})"
- Finalized Project Scope decisions:
${finalizedSummary || "None finalized yet."}
- Current Domain Constraints (${selectedDomain.n}):
${domainSummary}

Help development teams explore the engineering implementation, identify technical constraints, draft API specs, write DB schemas, or decompose tasks strictly matching this domain guidance!`;

    try {
      const reply = await callOpenAI(next, systemPrompt);
      setMsgs(prev => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMsgs(prev => [...prev, { role: "assistant", content: "Error reaching API." }]);
    }
    setLoading(false);
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Topbar t={t} title="Context Chat" sub={`${ctx.id} · Connected to ${selectedDomain.n}`} onBack={() => go("eng-dashboard")} role={role} setRole={setRole} go={go}>
        <Btn t={t} sm pri onClick={() => go("blueprint")}>Open Blueprint <i className="ti ti-arrow-right" /></Btn>
      </Topbar>
      
      {/* Scope Alignment Controls */}
      <div style={{ background: t.surf, borderBottom: `1px solid ${t.bd}`, padding: "10px 18px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, flexShrink: 0 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ fontSize: 10, fontWeight: 700, color: t.mu, textTransform: "uppercase", letterSpacing: "0.06em" }}>Aligned Project Context</label>
          <select 
            value={ctx.id} 
            onChange={(e) => onSelectProject(e.target.value)}
            style={{ padding: "6px 10px", borderRadius: 5, border: `1px solid ${t.bd}`, background: t.al, color: t.tx, fontSize: 12, fontWeight: 600, outline: "none", width: "100%" }}
          >
            {projects.map((p: any) => (
              <option key={p.id} value={p.id}>{p.id} · {p.n}</option>
            ))}
          </select>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <label style={{ fontSize: 10, fontWeight: 700, color: t.mu, textTransform: "uppercase", letterSpacing: "0.06em" }}>Aligned Domain Knowledge</label>
          <select 
            value={activeDomainId} 
            onChange={(e) => setActiveDomainId(e.target.value)}
            style={{ padding: "6px 10px", borderRadius: 5, border: `1px solid ${t.bd}`, background: t.al, color: t.tx, fontSize: 12, fontWeight: 600, outline: "none", width: "100%" }}
          >
            {DOMAINS_DATA.map((d: any) => (
              <option key={d.id} value={d.id}>{d.n}</option>
            ))}
          </select>
        </div>
      </div>

      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div ref={chatRef} style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 10, background: t.surf }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                {m.role === "assistant" && <div style={{ width: 22, height: 22, borderRadius: 5, background: t.tx, color: t.surf, fontSize: 10, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}><i className="ti ti-brain" style={{ fontSize: 11 }} /></div>}
                <div style={{ padding: "8px 12px", fontSize: 12, lineHeight: 1.6, maxWidth: "78%", background: m.role === "user" ? t.tx : t.al, color: m.role === "user" ? t.surf : t.tx, borderRadius: m.role === "user" ? "8px 0 8px 8px" : "0 8px 8px 8px", border: `1px solid ${m.role === "user" ? t.tx : t.bd}`, whiteSpace: "pre-line" }}>
                  {m.content}
                </div>
              </div>
            ))}
            {loading && <div style={{ display: "flex", gap: 8 }}><div style={{ width: 22, height: 22, borderRadius: 5, background: t.tx, color: t.surf, fontSize: 10, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}><i className="ti ti-brain" style={{ fontSize: 11 }} /></div><div style={{ padding: "8px 12px", fontSize: 12, background: t.al, border: `1px solid ${t.bd}`, borderRadius: "0 8px 8px 8px", color: t.mu }}>Thinking…</div></div>}
          </div>
          <div style={{ padding: "10px 18px", background: t.surf, borderTop: `1px solid ${t.bd}`, display: "flex", gap: 8, alignItems: "flex-end" }}>
            <textarea value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder={`Ask about context scope limits for ${ctx.id} and ${selectedDomain.n} rules…`} rows={2}
              style={{ flex: 1, border: `1px solid ${t.bd}`, borderRadius: 6, padding: "8px 12px", fontSize: 12, outline: "none", color: t.tx, background: t.surf, resize: "none", fontFamily: "inherit", lineHeight: 1.5 }}
            />
            <Btn t={t} sm pri onClick={send} disabled={loading}>Send</Btn>
          </div>
        </div>
        <ContextPanel t={t} wctx={wctx} onToggle={onToggle} idea={ctx.idea} role={role} />
      </div>
    </div>
  );
}

// ─── Scorecard Component ───
export function Scorecard({ t, go, ctx, upCtx, wctx, role, setRole }: any) {
  const [tab, setTab] = useState("overview");
  const [idea, setIdea] = useState(ctx.idea || "");
  const [result, setResult] = useState(ctx.evalResult || null);
  const [loading, setLoading] = useState(false);

  const DIMS = ["Feasibility","Market","Complexity","Time to value","Risk","Competitive","Monetization"];
  const SCRS = [8,7,6,8,5,6,7];

  const run = async () => {
    if (!idea.trim() || loading) return;
    setLoading(true);
    upCtx({ idea });
    const wctxSummary = wctx.filter((i: any) => i.status === "finalized").map((i: any) => `${i.label}: ${i.value}`).join("; ");
    const prompt = `Evaluate this product idea: "${idea}". Context: ${wctxSummary}. Respond ONLY as valid JSON with no markdown:\n{"scores":{"Feasibility":8,"Market":7,"Complexity":6,"Time to value":8,"Risk":5,"Competitive":6,"Monetization":7},"overall":7.3,"summary":"Two-sentence verdict.","strengths":["s1","s2","s3"],"risks":["r1","r2","r3"],"mitigations":["m1","m2","m3"]}`;
    try {
      const data = await callOpenAI([{ role: "user", content: prompt }], "", { json: true });
      if (data) { 
        setResult(data); 
        upCtx({ evalResult: data }); 
      }
    } catch { /* proceed with fallback simulation */ }
    setLoading(false);
  };

  const DEMO = {
    scores: { Feasibility:8, Market:7, Complexity:6, "Time to value":8, Risk:5, Competitive:6, Monetization:7 },
    overall: 7.3, summary: "Strong market fit with a well-quantified pain point and high switching costs once embedded. Competitive landscape is dense — sharpen differentiation on carrier coverage or pricing before committing to build.",
    strengths: ["$2–10k quantified pain — strong ROI pitch to ops teams","High switching cost once embedded in daily workflow","Expansion revenue via carrier integrations and analytics"],
    risks: ["Dense competition — project44 and FourKites dominate enterprise","Carrier API integrations are brittle and expensive to maintain","Long enterprise sales cycles delay early revenue"],
    mitigations: ["Target mid-market underserved by enterprise pricing","Use middleware (Ably) to reduce API integration cost","Design PLG motion so ops teams self-serve before procurement"],
  };
  const res = result || DEMO;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Topbar t={t} title="Scorecard" sub="Step 2 of 3" onBack={() => go("discover")} backLabel="Discovery" role={role} setRole={setRole} currentScreen="scorecard" go={go}>
        {res && <Btn t={t} sm ghost onClick={() => setResult(null)}><i className="ti ti-refresh" style={{ fontSize: 12 }} /> Re-run</Btn>}
        {res && <Btn t={t} sm pri onClick={() => go("blueprint")}>Generate Specs & Flowchart <i className="ti ti-arrow-right" /></Btn>}
      </Topbar>
      <Stepbar t={t} active={1} go={go} />

      {/* Tab bar */}
      <div style={{ display: "flex", borderBottom: `1px solid ${t.bd}`, background: t.surf, padding: "0 20px", flexShrink: 0 }}>
        {[["overview","Overview"],["ai-reasoning","AI Reasoning"],["dimensions","Dimensions"]].map(([id, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{ padding: "8px 16px", border: "none", background: "transparent", fontSize: 12, cursor: "pointer", fontWeight: tab === id ? 700 : 400, color: tab === id ? t.tx : t.mu, borderBottom: `2px solid ${tab === id ? t.tx : "transparent"}`, fontFamily: "inherit" }}>
            {label}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, overflowY: "auto", background: t.bg }}>
        {!result && tab === "overview" && (
          <div style={{ padding: 20, maxWidth: 580 }}>
            <Card t={t} style={{ marginBottom: 12 }}>
              <CardHeader t={t}>Your idea</CardHeader>
              <div style={{ padding: 14 }}>
                <textarea value={idea} onChange={e => setIdea(e.target.value)} rows={4} placeholder="Describe what you're building…"
                  style={{ width: "100%", boxSizing: "border-box", padding: "8px 10px", border: `1px solid ${t.bd}`, borderRadius: 5, fontSize: 13, color: t.tx, background: t.al, outline: "none", resize: "vertical", fontFamily: "inherit" }} />
              </div>
            </Card>
            <Btn t={t} pri onClick={run} disabled={loading}>{loading ? "Scoring…" : "Run Scorecard →"}</Btn>
          </div>
        )}

        {tab === "overview" && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", borderBottom: `1px solid ${t.bd}` }}>
              <div style={{ background: t.surf, padding: "18px 20px", borderRight: `1px solid ${t.bd}` }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: t.mu, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.06em" }}>Overall score</div>
                <div style={{ fontSize: 38, fontWeight: 800, color: t.gr, lineHeight: 1, letterSpacing: "-0.04em" }}>{res.overall?.toFixed(1)}<span style={{ fontSize: 16, fontWeight: 400, color: t.mu }}>/10</span></div>
                <div style={{ marginTop: 10 }}><Badge t={t} label="Strong potential — GO" color="green" /></div>
                <div style={{ marginTop: 12, fontSize: 11, color: t.mu }}>Scored May 20, 2026</div>
                <div style={{ marginTop: 10 }}><Btn t={t} xs onClick={() => setTab("ai-reasoning")}><i className="ti ti-cpu" style={{ fontSize: 11 }} /> See AI reasoning</Btn></div>
              </div>
              <div style={{ background: t.surf, padding: "18px 20px" }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: t.mu, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>Verdict</div>
                <div style={{ fontSize: 13, color: t.sub, lineHeight: 1.65, maxWidth: 520 }}>{res.summary}</div>
                <div style={{ marginTop: 12, display: "flex", gap: 6 }}>
                  <Btn t={t} xs><i className="ti ti-copy" style={{ fontSize: 11 }} /> Copy</Btn>
                  <Btn t={t} xs hi><i className="ti ti-brand-notion" style={{ fontSize: 11 }} /> Sync to Notion</Btn>
                </div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", borderBottom: `1px solid ${t.bd}` }}>
              {DIMS.map((d, i) => {
                const s = (res.scores as any)?.[d] || SCRS[i]; const c = scol(s);
                return (
                  <div key={d} style={{ background: t.surf, padding: "12px 6px", textAlign: "center", borderRight: i < 6 ? `1px solid ${t.bd}` : "none" }}>
                    <div style={{ fontSize: 9, color: t.mu, lineHeight: 1.4, marginBottom: 5, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>{d}</div>
                    <div style={{ fontSize: 20, fontWeight: 800, color: c }}>{s}</div>
                    <div style={{ height: 3, background: t.bd, marginTop: 5, overflow: "hidden", borderRadius: 2 }}>
                      <div style={{ height: "100%", width: `${s * 10}%`, background: c }} />
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, padding: "14px 20px" }}>
              {[["Strengths","green","ti-check",res.strengths],["Risks","red","ti-alert-triangle",res.risks],["Mitigations","amber","ti-bulb",res.mitigations]].map(([title, color, icon, items]) => (
                <Card key={title} t={t}>
                  <CardHeader t={t} color={color === "green" ? t.gr : color === "red" ? t.re : t.am}>{title}</CardHeader>
                  <div style={{ padding: 14 }}>
                    {(items as any)?.map((item: string, i: number) => (
                      <div key={i} style={{ display: "flex", gap: 8, marginBottom: 10, alignItems: "flex-start" }}>
                        <i className={`ti ${icon}`} style={{ color: color === "green" ? t.gr : color === "red" ? t.re : t.am, fontSize: 12, flexShrink: 0, marginTop: 1 }} />
                        <span style={{ fontSize: 11, color: t.sub, lineHeight: 1.5 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}

        {tab === "ai-reasoning" && (
          <>
            <div style={{ padding: "14px 20px", background: t.surf, borderBottom: `1px solid ${t.bd}`, display: "flex", alignItems: "center", gap: 10 }}>
              <i className="ti ti-cpu" style={{ fontSize: 18, color: t.sub }} />
              <div>
                <div style={{ fontWeight: 600, fontSize: 13 }}>AI evaluation pipeline — GW-0001</div>
                <div style={{ fontSize: 11, color: t.mu }}>Model: gemini-3.5-flash · 6 evaluation steps</div>
              </div>
              <Btn t={t} sm style={{ marginLeft: "auto" }}><i className="ti ti-download" style={{ fontSize: 11 }} /> Export reasoning</Btn>
            </div>
            <div style={{ padding: "16px 20px" }}>
              {AI_STEPS.map((es, i) => (
                <div key={es.n} style={{ display: "flex", gap: 0, marginBottom: 16, position: "relative" }}>
                  {i < AI_STEPS.length - 1 && <div style={{ position: "absolute", left: 17, top: 38, width: 1, height: "calc(100% - 8px)", background: t.bd }} />}
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: t.tx, color: t.surf, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, zIndex: 1 }}>{es.n}</div>
                  <div style={{ flex: 1, paddingLeft: 14 }}>
                    <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 3 }}>{es.title}</div>
                    <div style={{ fontSize: 11, color: t.sub, lineHeight: 1.5, marginBottom: 8 }}>{es.desc}</div>
                    <div style={{ marginBottom: 6 }}>
                      <div style={{ fontSize: 9, fontWeight: 700, color: t.mu, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Prompt sent to AI</div>
                      <div style={{ fontSize: 10, fontFamily: "monospace", background: t.al, border: `1px solid ${t.bd}`, borderRadius: 4, padding: "7px 10px", color: t.sub, lineHeight: 1.6 }}>{es.prompt}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 9, fontWeight: 700, color: t.gr, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>✓ AI Output</div>
                      <div style={{ fontSize: 11, background: t.surf, border: `1px solid ${t.bd}`, borderRadius: 4, padding: "8px 12px", lineHeight: 1.6 }}>{es.output}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {tab === "dimensions" && (
          <div style={{ padding: "16px 20px" }}>
            {DIMS.map((dim, i) => {
              const score = (res.scores as any)?.[dim] || SCRS[i]; const c = scol(score);
              const details = [
                { why: "Pull-based carrier API integration is well-understood. Main risk is API reliability variance across carriers — mitigated by middleware.", factors: ["Technical complexity","Team capability","Dependency risk","Build timeline"] },
                { why: "$14B TAM, 13.7% CAGR through 2030. Mid-market segment underserved by enterprise tools pricing at $50k+/yr.", factors: ["TAM / SAM size","Growth rate","Buyer concentration","Willingness to pay"] },
                { why: "Moderate-high. Carrier API integrations require ongoing maintenance. Multi-tenant architecture adds complexity.", factors: ["Technical depth","Integration surface","Architecture risk","Maintenance burden"] },
                { why: "PLG motion allows ops managers to self-serve and see value within days. No lengthy implementation vs enterprise alternatives.", factors: ["Onboarding friction","Time to first insight","Deployment speed","Learning curve"] },
                { why: "Dense competition from well-funded players. Long enterprise sales cycles may delay revenue. Carrier API fragility is operational risk.", factors: ["Market risk","Execution risk","Technology risk","Context drift risk"] },
                { why: "FourKites and project44 dominate enterprise. Clear mid-market gap exists but requires sharp positioning.", factors: ["Competitor moat","Switching costs","Differentiation clarity","Market share potential"] },
                { why: "$49–$99/user/month validated. PLG + sales-assist model proven. Expansion via carrier integrations and analytics.", factors: ["Pricing clarity","Revenue model fit","Expansion potential","LTV / CAC ratio"] },
              ][i];
              return (
                <div key={dim} style={{ background: t.surf, border: `1px solid ${t.bd}`, borderRadius: 6, padding: "14px 16px", marginBottom: 10, display: "grid", gridTemplateColumns: "140px 1fr 200px", gap: 14, alignItems: "start" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{dim}</div>
                    <div style={{ fontSize: 34, fontWeight: 800, color: c, lineHeight: 1, letterSpacing: "-0.04em" }}>{score}<span style={{ fontSize: 14, fontWeight: 400, color: t.mu }}>/10</span></div>
                    <div style={{ height: 4, background: t.bd, borderRadius: 2, marginTop: 8, overflow: "hidden", width: 100 }}>
                      <div style={{ height: "100%", width: `${score * 10}%`, background: c }} />
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: t.mu, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5 }}>AI Reasoning</div>
                    <div style={{ fontSize: 12, color: t.sub, lineHeight: 1.6 }}>{details.why}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: t.mu, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 5 }}>Factors evaluated</div>
                    {details.factors.map(f => <div key={f} style={{ fontSize: 11, color: t.sub, marginBottom: 3 }}>→ {f}</div>)}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Playbook / Blueprint Component ───
export function Playbook({ t, go, ctx, upCtx, isBlueprint = false, role, setRole }: any) {
  const [pi, setPi] = useState(0);
  const [selFlow, setSelFlow] = useState(0);
  const [idea, setIdea] = useState(ctx.idea || "");
  const [flows, setFlows] = useState<any[] | null>(ctx.flows || null);
  const [loading, setLoading] = useState(false);

  const vf = (flows ? flows.filter(f => f.p === pi) : FLOW_DATA.filter(f => f.p === pi));

  const generate = async () => {
    if (!idea.trim() || loading) return;
    setLoading(true);
    upCtx({ idea });
    const prompt = `Product: "${idea}". Identify 3 user personas. For each, create 3–4 user flows with step-by-step detail. Respond ONLY as JSON: {"flows":[{"p":0,"n":"flow name","steps":[{"id":"s1","label":"Step label","type":"action","next":"s2"}]}]}\nTypes: action, decision (add yes/no fields for branch ids), trigger, end. No markdown.`;
    try {
      const data = await callOpenAI([{ role: "user", content: prompt }], "", { json: true });
      if (data?.flows) { setFlows(data.flows); upCtx({ flows: data.flows }); }
    } catch { setFlows(FLOW_DATA); }
    setLoading(false);
  };

  const displayFlows = flows || FLOW_DATA;
  const curFlow = vf[selFlow] || vf[0];
  const title = isBlueprint ? "Blueprint" : "Playbook";
  const subtitle = isBlueprint ? (ctx.idea || "No project") : "Step 3 of 3";

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Topbar t={t} title={title} sub={subtitle} onBack={() => go(isBlueprint ? "eng-dashboard" : "scorecard")} backLabel={isBlueprint ? "Dashboard" : "Scorecard"} role={role} setRole={setRole} currentScreen={isBlueprint ? "blueprint" : "playbook"} go={go}>
        {!isBlueprint && <Btn t={t} sm ghost onClick={() => { setFlows(null); upCtx({ flows: null }); }}><i className="ti ti-refresh" style={{ fontSize: 12 }} /></Btn>}
        <Btn t={t} sm ghost><i className="ti ti-brand-notion" style={{ fontSize: 11 }} /> Notion</Btn>
        <Btn t={t} sm ghost><i className="ti ti-check" style={{ fontSize: 11 }} /> ClickUp</Btn>
        <Btn t={t} sm pri onClick={() => go("export")}>Export <i className="ti ti-download" /></Btn>
      </Topbar>
      {!isBlueprint && <Stepbar t={t} active={2} go={go} />}

      {!flows && !isBlueprint && (
        <div style={{ padding: 20, maxWidth: 560 }}>
          <Card t={t} style={{ marginBottom: 12 }}>
            <CardHeader t={t}>What are you building?</CardHeader>
            <div style={{ padding: 14 }}>
              <textarea value={idea} onChange={e => setIdea(e.target.value)} rows={3} placeholder="Describe your product…"
                style={{ width: "100%", boxSizing: "border-box", padding: "8px 10px", border: `1px solid ${t.bd}`, borderRadius: 5, fontSize: 13, color: t.tx, background: t.al, outline: "none", resize: "vertical", fontFamily: "inherit" }} />
              {ctx.evalResult && <div style={{ marginTop: 8, fontSize: 11, color: t.gr }}>✓ Using scorecard insights (score {ctx.evalResult.overall?.toFixed(1)}/10)</div>}
            </div>
          </Card>
          <Btn t={t} pri onClick={generate} disabled={loading}>{loading ? "Generating flows…" : "Generate Playbook →"}</Btn>
        </div>
      )}

      {(flows || isBlueprint) && (
        <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
          {/* Persona panel */}
          <div style={{ width: 168, background: t.surf, borderRight: `1px solid ${t.bd}`, display: "flex", flexDirection: "column", overflow: "hidden", flexShrink: 0 }}>
            <div style={{ fontSize: 10, fontWeight: 700, color: t.mu, padding: "9px 12px 6px", letterSpacing: "0.07em", textTransform: "uppercase", borderBottom: `1px solid ${t.bd}` }}>
              Personas ({PERSONAS.length})
            </div>
            {PERSONAS.map((p, i) => (
              <div key={i} onClick={() => { setPi(i); setSelFlow(0); }} style={{ padding: "8px 12px", cursor: "pointer", borderLeft: `2px solid ${i === pi ? t.tx : "transparent"}`, background: i === pi ? t.al : "transparent" }}>
                <div style={{ fontSize: 12, fontWeight: i === pi ? 700 : 500 }}>{p.n}</div>
                <div style={{ fontSize: 11, color: t.mu, marginTop: 1 }}>{p.r}</div>
                <div style={{ marginTop: 4 }}>
                  <Badge t={t} label={`${displayFlows.filter((f: any) => f.p === i).length} flows`} color="gray" />
                </div>
              </div>
            ))}
            <div style={{ marginTop: "auto", padding: "10px 12px", borderTop: `1px solid ${t.bd}` }}>
              <Btn t={t} xs fullWidth><i className="ti ti-plus" style={{ fontSize: 11 }} /> Add persona</Btn>
            </div>
          </div>

          {/* Flow chart area */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
            {/* Flow tab selector */}
            <div style={{ display: "flex", padding: "0 14px", background: t.surf, borderBottom: `1px solid ${t.bd}`, overflowX: "auto", flexShrink: 0 }}>
              {vf.map((f, i) => (
                <button key={i} onClick={() => setSelFlow(i)} style={{ padding: "8px 14px", border: "none", background: "transparent", fontSize: 12, fontWeight: i === selFlow ? 700 : 400, color: i === selFlow ? t.tx : t.mu, cursor: "pointer", whiteSpace: "nowrap", borderBottom: `2px solid ${i === selFlow ? t.tx : "transparent"}`, fontFamily: "inherit" }}>
                  {f.n}
                </button>
              ))}
            </div>

            {curFlow && (
              <>
                {/* Chart header */}
                <div style={{ padding: "10px 14px", borderBottom: `1px solid ${t.bd}`, background: t.al, display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: t.sub, textTransform: "uppercase", letterSpacing: "0.06em" }}>{curFlow.n} · {PERSONAS[pi].n}</div>
                  <div style={{ marginLeft: "auto", display: "flex", gap: 6 }}>
                    <Btn t={t} xs><i className="ti ti-zoom-in" style={{ fontSize: 11 }} /></Btn>
                    <Btn t={t} xs><i className="ti ti-download" style={{ fontSize: 11 }} /> Export SVG</Btn>
                  </div>
                </div>
                {/* Chart */}
                <div style={{ flex: 1, overflowX: "auto", overflowY: "auto", padding: "16px 14px", background: t.surf }}>
                  <FlowchartSVG flow={curFlow} t={t} />
                  {/* Legend */}
                  <div style={{ display: "flex", gap: 16, marginTop: 14, paddingTop: 10, borderTop: `1px solid ${t.bd}`, flexWrap: "wrap", flexShrink: 0 }}>
                    {[
                      { shape: "rect",    fill: "#e8e8e8", stroke: "#ccc",    label: "Action"    },
                      { shape: "diamond", fill: "#ffffff", stroke: "#0a0a0a", label: "Decision"  },
                      { shape: "pill",    fill: "#d0d0d0", stroke: "#aaa",    label: "Trigger"   },
                      { shape: "pill-b",  fill: "#0a0a0a", stroke: "#0a0a0a",label: "End state" },
                    ].map(({ shape, fill, stroke, label }) => (
                      <div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        {shape === "diamond"
                          ? <svg width="14" height="14"><polygon points="7,1 13,7 7,13 1,7" fill={fill} stroke={stroke} strokeWidth="1.5" /></svg>
                          : <div style={{ width: 14, height: 10, background: fill, border: `1px solid ${stroke}`, borderRadius: shape.includes("pill") ? 5 : 2 }} />
                        }
                        <span style={{ fontSize: 10, color: t.mu }}>{label}</span>
                      </div>
                    ))}
                    <span style={{ fontSize: 10, color: t.mu, marginLeft: "auto" }}>Solid = Yes / happy path · Dashed = No / error path</span>
                  </div>
                </div>
              </>
            )}

            {/* Flow list */}
            <div style={{ borderTop: `1px solid ${t.bd}`, flexShrink: 0, maxHeight: 180, overflowY: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                <thead>
                  <tr style={{ background: t.al }}>
                    {["Flow name","Steps","Decisions","Status",""].map(h => (
                      <th key={h} style={{ textAlign: "left", padding: "6px 14px", color: t.sub, fontWeight: 500, fontSize: 11, borderBottom: `1px solid ${t.bd}` }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {vf.map((f, i) => (
                    <tr key={i} onClick={() => setSelFlow(i)} style={{ cursor: "pointer", borderBottom: `1px solid ${t.bd}`, background: i === selFlow ? t.al : "transparent" }}>
                      <td style={{ padding: "7px 14px", fontWeight: 600 }}>{f.n}</td>
                      <td style={{ padding: "7px 14px", color: t.sub }}>{f.steps.length}</td>
                      <td style={{ padding: "7px 14px", color: t.sub }}>{f.steps.filter((s: any) => s.type === "decision").length}</td>
                      <td style={{ padding: "7px 14px" }}><Badge t={t} label="Mapped" color="green" /></td>
                      <td style={{ padding: "7px 14px" }}><Btn t={t} xs><i className="ti ti-external-link" style={{ fontSize: 11 }} /></Btn></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export { scol };
