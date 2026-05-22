import React, { useState } from "react";
import { Btn, Badge, Topbar, Filterbar, Card, CardHeader } from "./CoreUI";
import { INTEGRATIONS_DATA, MEMBERS, NOTIFS } from "../data";

// ─── Integrations Component ───
export function Integrations({ t, go, ints, setInts }: any) {
  const n = Object.values(ints).filter(Boolean).length;
  const syncItems = [
    ["Auto-sync on scorecard complete",    "Push results to connected doc tools"],
    ["Auto-create tasks on flow export",   "Create tasks in ClickUp/Linear/Jira"],
    ["Notify team on Slack",               "Message when new scorecard finishes"],
    ["Sync roadmap to Notion",             "Keep Notion roadmap doc current"],
  ];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Topbar t={t} title="Integrations" sub={`${n} connected`}>
        <Btn t={t} sm ghost><i className="ti ti-plus" style={{ fontSize: 12 }} /> Request integration</Btn>
      </Topbar>
      <div style={{ flex: 1, overflowY: "auto" }}>
        <div style={{ padding: "14px 20px", background: t.surf, borderBottom: `1px solid ${t.bd}` }}>
          <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>Connected tools</div>
          <div style={{ fontSize: 12, color: t.sub }}>Click any card to connect or disconnect.</div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, padding: "16px 20px" }}>
          {INTEGRATIONS_DATA.map(it => {
            const on = ints[it.id];
            return (
              <div key={it.id} onClick={() => setInts((prev: any) => ({ ...prev, [it.id]: !prev[it.id] }))}
                style={{ background: t.surf, border: `1px solid ${on ? t.tx : t.bd}`, borderRadius: 6, padding: 14, cursor: "pointer", transition: "border-color 0.12s" }}>
                <div style={{ fontSize: 20, marginBottom: 12 }}>{it.icon}</div>
                <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>
                  {it.n} <Badge t={t} label={it.cat} color="gray" />
                </div>
                <div style={{ fontSize: 11, color: t.sub, lineHeight: 1.4 }}>{it.desc}</div>
                <div style={{ fontSize: 10, fontWeight: 700, marginTop: 10, textTransform: "uppercase", letterSpacing: "0.04em", color: on ? t.gr : t.mu }}>
                  {on ? "✓ Connected" : "Not connected"}
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ padding: "14px 20px", borderTop: `1px solid ${t.bd}`, background: t.surf }}>
          <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 10 }}>Sync settings</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, maxWidth: 600 }}>
            {syncItems.map(([label, desc]) => (
              <div key={label} style={{ padding: "10px 12px", border: `1px solid ${t.bd}`, borderRadius: 5, background: t.al, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500 }}>{label}</div>
                  <div style={{ fontSize: 11, color: t.mu, marginTop: 2 }}>{desc}</div>
                </div>
                <div style={{ width: 32, height: 18, borderRadius: 9, background: t.tx, cursor: "pointer", position: "relative", flexShrink: 0 }}>
                  <div style={{ position: "absolute", right: 2, top: 2, width: 14, height: 14, borderRadius: "50%", background: "#fff" }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Export Component ───
export function Export({ t, go, ctx, ints }: any) {
  const md = `# Groundwork — GW-0001\n## ${ctx.idea || "Real-time shipment tracker"}\n\n**Scorecard: ${ctx.evalResult?.overall?.toFixed(1) || "7.3"} / 10**\n${ctx.evalResult?.summary || "Strong market fit with quantified pain point."}\n\nStrengths:\n${ctx.evalResult?.strengths?.map((s: string) => `- ${s}`).join("\n") || "- Quantified pain\n- High switching cost\n- Expansion revenue"}\n\n**AI Reasoning** — 6-step evaluation pipeline logged.\nSee full prompt → output chain in the Scorecard AI Reasoning tab.\n\n**User Flows — Alex M. (Ops Manager)**\n1. Track live shipment (5 steps, 1 decision)\n2. Flag delayed shipment (6 steps, 1 decision)\n3. Generate delay report (5 steps, 1 decision)`;

  const fmts = [
    { icon:"ti-brand-notion", label:"Sync to Notion",     desc:"Push project doc to Notion page",      conn: ints.notion  },
    { icon:"ti-check",        label:"Create ClickUp tasks",desc:"Convert flows into ClickUp tasks",     conn: ints.clickup },
    { icon:"ti-map",          label:"Push to Linear",      desc:"Create Linear issues from flow steps", conn: ints.linear  },
    { icon:"ti-file-text",    label:"Download Markdown",   desc:"Full project as .md for any tool",     conn: true         },
    { icon:"ti-braces",       label:"Download JSON",       desc:"Structured data for your API",         conn: true         },
    { icon:"ti-copy",         label:"Copy to clipboard",   desc:"Paste anywhere instantly",             conn: true         },
    { icon:"ti-template",     label:"Excalidraw flowchart",desc:"Export flows as editable diagram",     conn: true         },
  ];

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Topbar t={t} title="Export & Share" onBack={() => go("playbook")} backLabel="Playbook" />
      <div style={{ flex: 1, overflowY: "auto", padding: 18, maxWidth: 760 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
          {fmts.map(f => (
            <div key={f.label} style={{ background: t.surf, border: `1px solid ${t.bd}`, borderRadius: 6, padding: "12px 14px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", gap: 11, alignItems: "center" }}>
                <i className={`ti ${f.icon}`} style={{ fontSize: 17, color: t.tx }} />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13 }}>{f.label}</div>
                  <div style={{ fontSize: 11, color: t.mu, marginTop: 1 }}>{f.desc}</div>
                </div>
              </div>
              {f.conn
                ? <Btn t={t} xs onClick={() => { if (f.label.includes("Copy") && navigator.clipboard) { navigator.clipboard.writeText(md); } }}>{f.label.includes("Copy") ? "Copy" : "Export"}</Btn>
                : <Btn t={t} xs onClick={() => go("integrations")}>Connect</Btn>
              }
            </div>
          ))}
        </div>
        <Card t={t}>
          <CardHeader t={t}>Preview — GW-0001</CardHeader>
          <div style={{ padding: 14 }}>
            <pre style={{ fontSize: 11, color: t.sub, lineHeight: 1.8, whiteSpace: "pre-wrap", fontFamily: "monospace", maxHeight: 240, overflowY: "auto" }}>{md}</pre>
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── Team Component ───
export function Team({ t }: any) {
  const [members, setMembers] = useState(MEMBERS);
  const [invite, setInvite] = useState("");
  const [role, setRole] = useState("Product");
  const perms = [
    ["Admin",   "Full access — create, scorecard, export, manage integrations, invite"],
    ["Product", "Create projects, run scorecards, generate flows, export"],
    ["Engineer","View flows, exports, and roadmap"],
    ["Design",  "View and comment on discovery sessions"],
  ];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Topbar t={t} title="Team" sub={`${members.length} members`}>
        <Btn t={t} sm pri><i className="ti ti-plus" style={{ fontSize: 12 }} /> Invite</Btn>
      </Topbar>
      <Filterbar t={t} selects={[["Role",["All","Admin","Product","Engineer","Design"]],["Status",["All","Active","Pending"]]]} searchPlaceholder="Search members…" />
      <div style={{ flex: 1, overflowY: "auto", padding: 18, maxWidth: 700 }}>
        <Card t={t} style={{ marginBottom: 12 }}>
          <CardHeader t={t}>Invite by email</CardHeader>
          <div style={{ padding: 14, display: "flex", gap: 8, alignItems: "center" }}>
            <i className="ti ti-mail" style={{ color: t.mu }} />
            <input value={invite} onChange={e => setInvite(e.target.value)} placeholder="colleague@company.com" style={{ flex: 1, padding: "7px 10px", border: `1px solid ${t.bd}`, borderRadius: 5, fontSize: 13, color: t.tx, background: t.surf, outline: "none", fontFamily: "inherit" }} />
            <select value={role} onChange={e => setRole(e.target.value)} style={{ padding: "7px 10px", border: `1px solid ${t.bd}`, borderRadius: 5, fontSize: 12, background: t.surf, color: t.tx, width: 110, fontFamily: "inherit" }}>
              {["Product","Engineer","Design","Admin"].map(r => <option key={r}>{r}</option>)}
            </select>
            <Btn t={t} sm pri onClick={() => { if (invite.trim()) { setMembers(m => [...m, { n: invite.split("@")[0], e: invite, r: role, s: "pending", j: "Invited" }]); setInvite(""); } }}>Invite</Btn>
          </div>
        </Card>
        <Card t={t} style={{ marginBottom: 12 }}>
          <CardHeader t={t}>Members</CardHeader>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 80px 90px 70px 24px", gap: 10, padding: "7px 14px", background: t.al, fontSize: 10, fontWeight: 700, color: t.mu, textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: `1px solid ${t.bd}` }}>
            <div>Member</div><div>Role</div><div>Status</div><div>Joined</div><div />
          </div>
          {members.map((m, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 80px 90px 70px 24px", gap: 10, padding: "10px 14px", alignItems: "center", borderBottom: i < members.length - 1 ? `1px solid ${t.bd}` : "none" }}>
              <div style={{ display: "flex", gap: 9, alignItems: "center" }}>
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: t.tx, color: t.surf, fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{m.n[0]}</div>
                <div><div style={{ fontWeight: 600, fontSize: 12 }}>{m.n}</div><div style={{ fontSize: 11, color: t.mu }}>{m.e}</div></div>
              </div>
              <div style={{ fontSize: 12, color: t.sub }}>{m.r}</div>
              <Badge t={t} label={m.s} color={m.s === "active" ? "green" : "amber"} />
              <div style={{ fontSize: 11, color: t.mu }}>{m.j}</div>
              <button onClick={() => setMembers(ms => ms.filter((_,j) => j !== i))} style={{ border: "none", background: "transparent", cursor: "pointer", color: t.mu, fontSize: 16 }}>×</button>
            </div>
          ))}
        </Card>
        <Card t={t}>
          <CardHeader t={t}>Permissions</CardHeader>
          <div style={{ padding: 14 }}>
            {perms.map(([r,d]) => (
              <div key={r} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: `1px solid ${t.bd}` }}>
                <div><div style={{ fontSize: 12, fontWeight: 600 }}>{r}</div><div style={{ fontSize: 11, color: t.sub }}>{d}</div></div>
                <Btn t={t} xs>Edit</Btn>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ─── Notifications Component ───
export function Notifications({ t }: any) {
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Topbar t={t} title="Notifications">
        <Btn t={t} sm ghost>Mark all read</Btn>
      </Topbar>
      <div style={{ flex: 1, overflowY: "auto", background: t.surf }}>
        {NOTIFS.map((n, i) => (
          <div key={i} style={{ display: "flex", gap: 10, padding: "11px 16px", borderBottom: `1px solid ${t.bd}`, cursor: "pointer", background: n.r ? t.surf : t.al, borderLeft: n.r ? "none" : `2px solid ${t.tx}` }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: n.r ? t.bd : t.tx, flexShrink: 0, marginTop: 5 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 500, marginBottom: 2 }}>{n.t}</div>
              <div style={{ fontSize: 11, color: t.mu }}>{n.m}</div>
            </div>
            {!n.r && <Badge t={t} label="New" color="black" />}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Settings Component ───
export function Settings({ t, go, dark, toggleDark }: any) {
  const wsItems = [["Workspace","Altir"],["Plan","Free · 1,000 AI calls/mo"],["API model","gemini-3.5-flash"],["API usage","243 / 1,000 this month"],["Member since","May 2026"]];
  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
      <Topbar t={t} title="Settings" />
      <div style={{ flex: 1, overflowY: "auto", padding: 18, maxWidth: 540 }}>
        <Card t={t} style={{ marginBottom: 12 }}>
          <CardHeader t={t}>Profile</CardHeader>
          <div style={{ padding: 14 }}>
            <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 14, paddingBottom: 14, borderBottom: `1px solid ${t.bd}` }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: t.tx, color: t.surf, fontSize: 16, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>A</div>
              <div><div style={{ fontWeight: 700, fontSize: 14 }}>Arjun Reddy</div><div style={{ fontSize: 12, color: t.sub }}>arjun@altir.io · Admin</div></div>
              <Btn t={t} sm style={{ marginLeft: "auto" }}>Change photo</Btn>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[["Display name","Arjun Reddy"],["Role","Product Manager"]].map(([l,v]) => (
                <div key={l}><label style={{ fontSize: 11, fontWeight: 500, color: t.sub, display: "block", marginBottom: 4 }}>{l}</label><input defaultValue={v} style={{ width: "100%", boxSizing: "border-box", padding: "7px 10px", border: `1px solid ${t.bd}`, borderRadius: 5, fontSize: 13, color: t.tx, background: t.surf, outline: "none", fontFamily: "inherit" }} /></div>
              ))}
              <div style={{ gridColumn: "1/-1" }}><label style={{ fontSize: 11, fontWeight: 500, color: t.sub, display: "block", marginBottom: 4 }}>Email</label><input type="email" defaultValue="arjun@altir.io" style={{ width: "100%", boxSizing: "border-box", padding: "7px 10px", border: `1px solid ${t.bd}`, borderRadius: 5, fontSize: 13, color: t.tx, background: t.surf, outline: "none", fontFamily: "inherit" }} /></div>
            </div>
            <Btn t={t} sm pri style={{ marginTop: 12 }}>Save changes</Btn>
          </div>
        </Card>
        <Card t={t} style={{ marginBottom: 12 }}>
          <CardHeader t={t}>Appearance</CardHeader>
          <div style={{ padding: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div><div style={{ fontSize: 13, fontWeight: 500 }}>Theme</div><div style={{ fontSize: 12, color: t.sub }}>Light or dark interface</div></div>
            <div style={{ display: "flex", gap: 4 }}>
              {["Light","Dark"].map(mode => (
                <span key={mode} onClick={() => { if ((mode === "Dark") !== dark) toggleDark(); }} style={{ padding: "4px 12px", border: `1px solid ${((mode==="Dark")===dark)?t.tx:t.bd}`, borderRadius: 4, fontSize: 12, cursor: "pointer", background: ((mode==="Dark")===dark) ? t.tx : t.surf, color: ((mode==="Dark")===dark) ? t.surf : t.sub, fontFamily: "inherit" }}>{mode}</span>
              ))}
            </div>
          </div>
        </Card>
        <Card t={t} style={{ marginBottom: 12 }}>
          <CardHeader t={t}>Workspace & API</CardHeader>
          <div style={{ padding: 14 }}>
            {wsItems.map(([l,v]) => (
              <div key={l} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${t.bd}` }}>
                <span style={{ fontSize: 12, color: t.sub }}>{l}</span>
                <span style={{ fontSize: 12, fontWeight: 500 }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop: 10, fontSize: 11, color: t.mu }}>API key stored server-side via GEMINI_API_KEY env secret. Never exposed to the browser.</div>
            <Btn t={t} sm pri style={{ marginTop: 12 }}>Upgrade to Pro</Btn>
          </div>
        </Card>
        <Card t={t}>
          <CardHeader t={t}>Danger zone</CardHeader>
          <div style={{ padding: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div><div style={{ fontSize: 12, fontWeight: 600 }}>Sign out</div><div style={{ fontSize: 11, color: t.sub }}>End your session</div></div>
            <Btn t={t} sm dng onClick={() => go("landing")}>Sign out</Btn>
          </div>
        </Card>
      </div>
    </div>
  );
}
export {};
