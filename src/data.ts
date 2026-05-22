// Design tokens
export const L = {
  bg: "#f5f5f5", surf: "#ffffff", bd: "#e3e3e3", bd2: "#c0c0c0",
  tx: "#0a0a0a", sub: "#525252", mu: "#999999", al: "#eeeeee",
  hi: "#1d4ed8", hil: "#eff6ff", hit: "#1e40af",
  gr: "#15803d", gl: "#f0fdf4", gt: "#14532d",
  am: "#b45309", aml: "#fffbeb", amt: "#78350f",
  re: "#b91c1c", rl: "#fef2f2", rt: "#7f1d1d",
};

export const D = {
  bg: "#0c0c0c", surf: "#161616", bd: "#2a2a2a", bd2: "#404040",
  tx: "#f0f0f0", sub: "#a0a0a0", mu: "#505050", al: "#1e1e1e",
  hi: "#3b82f6", hil: "#1e3a8a", hit: "#93c5fd",
  gr: "#16a34a", gl: "#052e16", gt: "#86efac",
  am: "#d97706", aml: "#1c1002", amt: "#fcd34d",
  re: "#dc2626", rl: "#1c0505", rt: "#fca5a5",
};

// Role nav definitions
export const BUSINESS_NAV = [
  { id: "dashboard",    icon: "ti-layout-dashboard", label: "Dashboard"      },
  { id: "context",      icon: "ti-world",            label: "Domain Context" },
  { id: "transcripts",  icon: "ti-file-text",        label: "Knowledge Intake" },
  { id: "discover",     icon: "ti-stars",            label: "AI Discovery"   },
  { id: "scorecard",    icon: "ti-clipboard-check",  label: "AI Scorecard"   },
  { id: "blueprint",    icon: "ti-git-branch",       label: "Playbook Specs" },
  { id: "integrations", icon: "ti-plug",             label: "Integrations"   },
  { id: "export",       icon: "ti-download",         label: "Export & Share" },
];

export const ENGINEER_NAV = [
  { id: "eng-dashboard", icon: "ti-layout-dashboard", label: "Dashboard"      },
  { id: "context",       icon: "ti-world",            label: "Domain Context" },
  { id: "transcripts",   icon: "ti-file-text",        label: "Knowledge Intake" },
  { id: "blueprint",     icon: "ti-git-branch",       label: "Playbook Specs" },
  { id: "export",        icon: "ti-download",         label: "Export & Share" },
];

// Shared data
export const INIT_WCTX = [
  { id: "w1", label: "Market size",      value: "$14B TAM, 13.7% CAGR",             status: "finalized" },
  { id: "w2", label: "Primary user",     value: "Ops managers at shipper",          status: "finalized" },
  { id: "w3", label: "Core pain",        value: "$2–10k per missed delivery",        status: "finalized" },
  { id: "w4", label: "Workaround",       value: "8 carrier portals + spreadsheets", status: "finalized" },
  { id: "w5", label: "Competitors",      value: "project44, FourKites (enterprise)", status: "draft"     },
  { id: "w6", label: "GTM strategy",     value: "PLG mid-market, self-serve first",  status: "draft"     },
  { id: "w7", label: "Pricing target",   value: "$49–99/user/month",                status: "draft"     },
  { id: "w8", label: "Tech constraint",  value: "Carrier API reliability risk",      status: "draft"     },
];

export const FLOW_DATA = [
  { p: 0, n: "Track live shipment", steps: [
    { id:"s1", label:"Search PO",       type:"action",   next:"s2" },
    { id:"s2", label:"Apply filters",   type:"decision", yes:"s3", no:"s1" },
    { id:"s3", label:"Select shipment", type:"action",   next:"s4" },
    { id:"s4", label:"View map + ETA",  type:"action",   next:"s5" },
    { id:"s5", label:"Set delay alert", type:"end" },
  ]},
  { p: 0, n: "Flag delayed shipment", steps: [
    { id:"s1", label:"Receive alert",   type:"trigger",  next:"s2" },
    { id:"s2", label:"View details",    type:"action",   next:"s3" },
    { id:"s3", label:"Contact carrier?",type:"decision", yes:"s4", no:"s5" },
    { id:"s4", label:"Contact carrier", type:"action",   next:"s5" },
    { id:"s5", label:"Log update",      type:"action",   next:"s6" },
    { id:"s6", label:"Notify team",     type:"end" },
  ]},
  { p: 0, n: "Generate delay report", steps: [
    { id:"s1", label:"Select date range",type:"action",  next:"s2" },
    { id:"s2", label:"Filter by status", type:"action",  next:"s3" },
    { id:"s3", label:"Data available?",  type:"decision",yes:"s4", no:"s1" },
    { id:"s4", label:"Preview report",   type:"action",  next:"s5" },
    { id:"s5", label:"Export CSV",       type:"end" },
  ]},
  { p: 1, n: "Onboard new carrier", steps: [
    { id:"s1", label:"Add credentials", type:"action",   next:"s2" },
    { id:"s2", label:"Configure API",   type:"action",   next:"s3" },
    { id:"s3", label:"API valid?",      type:"decision", yes:"s4", no:"s1" },
    { id:"s4", label:"Run test",        type:"action",   next:"s5" },
    { id:"s5", label:"Approve & activate",type:"end" },
  ]},
  { p: 1, n: "Set SLA thresholds", steps: [
    { id:"s1", label:"Define thresholds",type:"action",  next:"s2" },
    { id:"s2", label:"Assign routes",    type:"action",  next:"s3" },
    { id:"s3", label:"Enable alerts",    type:"action",  next:"s4" },
    { id:"s4", label:"Test flow",        type:"end" },
  ]},
  { p: 2, n: "API integration", steps: [
    { id:"s1", label:"Authenticate",    type:"action",   next:"s2" },
    { id:"s2", label:"Pull endpoints",  type:"action",   next:"s3" },
    { id:"s3", label:"Valid?",          type:"decision", yes:"s4", no:"s1" },
    { id:"s4", label:"Map fields",      type:"action",   next:"s5" },
    { id:"s5", label:"Push payload",    type:"action",   next:"s6" },
    { id:"s6", label:"Verify & deploy", type:"end" },
  ]},
];

export const PERSONAS = [
  { n: "Alex M.",  r: "Ops Manager",   g: "Unified visibility" },
  { n: "Sarah K.", r: "Logistics Lead", g: "Carrier & SLAs"    },
  { n: "Dev Team", r: "Engineering",    g: "API integration"   },
];

export const FILES_DEMO = [
  { name:"Kickoff meeting — May 14.txt",       type:"Meeting transcript",  proj:"GW-0001", size:"24 KB",  date:"May 14", status:"Processed", insights:6,  icon:"ti-file-text"     },
  { name:"Customer call — Alex Chen.vtt",       type:"Recording transcript",proj:"GW-0001", size:"81 KB",  date:"May 17", status:"Processed", insights:4,  icon:"ti-microphone"    },
  { name:"Competitive research.pdf",            type:"Document",            proj:"GW-0001", size:"340 KB", date:"May 12", status:"Processed", insights:3,  icon:"ti-file-type-pdf" },
  { name:"Scorecard review — internal.docx",   type:"Document",            proj:"GW-0001", size:"18 KB",  date:"May 20", status:"Processed", insights:2,  icon:"ti-file-word"     },
  { name:"Slack — #product-discovery.json",    type:"Slack export",        proj:"GW-0001", size:"6 KB",   date:"May 21", status:"Processing",insights:null,icon:"ti-brand-slack"  },
  { name:"Market sizing notes.md",             type:"Document",            proj:"All",     size:"4 KB",   date:"May 10", status:"Processed", insights:3,  icon:"ti-markdown"      },
];

export const ROADMAP_DATA = [
  { id:"GW-0001", n:"Real-time shipment tracker", phase:"Scorecard", sc:6.8, pri:"High",     q:"Q3 2026", owner:"Alex C.",  st:"Active"  },
  { id:"GW-0002", n:"Logistics visibility SaaS",  phase:"Build",     sc:8.2, pri:"Critical", q:"Q2 2026", owner:"Arjun R.", st:"Active"  },
  { id:"GW-0003", n:"AI onboarding assistant",    phase:"Scorecard", sc:7.5, pri:"High",     q:"Q3 2026", owner:"Priya S.", st:"Active"  },
  { id:"GW-0004", n:"Supplier portal v2",         phase:"Discovery", sc:null,pri:"Medium",   q:"Q4 2026", owner:"Jordan L.",st:"Planned" },
  { id:"GW-0005", n:"Carrier API marketplace",    phase:"Idea",      sc:null,pri:"Low",      q:"Q1 2027", owner:"Arjun R.", st:"Backlog" },
];

export const INTEGRATIONS_DATA = [
  { id:"notion",     n:"Notion",     icon:"📄", desc:"Sync projects, scorecards and flows to Notion pages",     cat:"Docs"   },
  { id:"clickup",    n:"ClickUp",    icon:"✅", desc:"Convert flows into ClickUp tasks automatically",          cat:"PM"     },
  { id:"linear",     n:"Linear",     icon:"◆",  desc:"Push user flows as Linear issues with estimates",         cat:"PM"     },
  { id:"jira",       n:"Jira",       icon:"🟦", desc:"Create Jira epics and stories from flows",               cat:"PM"     },
  { id:"coda",       n:"Coda",       icon:"📐", desc:"Export discovery docs to Coda templates",                cat:"Docs"   },
  { id:"confluence", n:"Confluence", icon:"🌀", desc:"Publish scorecard reports to Confluence spaces",         cat:"Docs"   },
  { id:"slack",      n:"Slack",      icon:"💬", desc:"Get Slack alerts when scorecards complete",              cat:"Comms"  },
  { id:"figma",      n:"Figma",      icon:"🎨", desc:"Link flow steps to Figma screens",                       cat:"Design" },
  { id:"github",     n:"GitHub",     icon:"🐙", desc:"Auto-create GitHub issues from user flows",              cat:"Dev"    },
];

export const MEMBERS = [
  { n:"Arjun Reddy", e:"arjun@altir.io",  r:"Admin",   s:"active",  j:"Apr 2026" },
  { n:"Alex Chen",   e:"alex@altir.io",   r:"Product", s:"active",  j:"Apr 2026" },
  { n:"Priya Sharma",e:"priya@altir.io",  r:"Engineer",s:"active",  j:"May 2026" },
  { n:"Jordan Lee",  e:"jordan@altir.io", r:"Design",  s:"pending", j:"Invited"  },
];

export const NOTIFS = [
  { t:"GW-0002 synced to Notion",                   m:"2 min ago", r:false },
  { t:"Sarah K. joined the workspace",              m:"1 hr ago",  r:false },
  { t:"Scorecard updated: GW-0001 → 6.8/10",        m:"3 hrs ago", r:false },
  { t:"GW-0003 discovery session completed",        m:"Yesterday", r:true  },
  { t:"ClickUp integration connected",              m:"May 19",    r:true  },
  { t:"GW-0004 created by Arjun Reddy",             m:"May 1",     r:true  },
];

export const AI_STEPS = [
  { n:"01", title:"Context ingestion", desc:"Reads discovery transcript, project context, domain knowledge, and uploaded files to build a structured evaluation input.",
    prompt:"Summarise the product idea, target user, core pain, and known constraints. Output JSON: {idea, user, pain, constraints, competitors}",
    output:"Idea: Real-time shipment tracker for logistics ops. User: Ops managers at shippers. Pain: $2–10k per missed delivery, 50+ shipments across 8 carriers. Constraints: carrier API reliability. Competitors: project44, FourKites (enterprise-priced)." },
  { n:"02", title:"Feasibility scoring", desc:"Evaluates whether the idea can realistically be built with current tech, team, and resources.",
    prompt:"Score feasibility 1–10. Consider: technical complexity, team capability, dependency risk, build time. Explain in 2–3 sentences.",
    output:"Score: 8/10. Pull-based carrier API integration is technically well-understood. Main risk is API reliability variance across carriers — mitigated by middleware layer." },
  { n:"03", title:"Market potential scoring", desc:"Assesses market size, growth trajectory, and whether enough buyers exist to build a viable business.",
    prompt:"Score market potential 1–10. Consider: TAM/SAM, growth rate, buyer concentration, willingness to pay. Cite relevant data.",
    output:"Score: 7/10. $14B TAM (Mordor Intelligence 2024, 13.7% CAGR). Mid-market segment underserved by enterprise tools. $49–99/user/month WTP validated." },
  { n:"04", title:"Complexity & risk scoring", desc:"Evaluates technical complexity, go-to-market difficulty, and execution risk across 5 dimensions.",
    prompt:"Score complexity 1–10 (higher = more complex). Score risk 1–10. Identify top 3 risks with mitigations.",
    output:"Complexity: 6/10. Risk: 5/10. Top risks: (1) Dense competition — project44/FourKites dominate; mitigate via mid-market pricing. (2) Carrier API fragility; use middleware. (3) Long sales cycles; PLG motion." },
  { n:"05", title:"Competitive landscape scoring", desc:"Maps competitive positioning and evaluates differentiation potential against known alternatives.",
    prompt:"Score competitive landscape 1–10 (higher = more favourable). Identify competitors, their weaknesses, and defensible advantages.",
    output:"Score: 6/10. Productboard is closest. FourKites/project44 priced at $50k+/yr. Differentiation: AI-native discovery-to-spec + mid-market pricing + 9 integrations day one." },
  { n:"06", title:"Verdict synthesis", desc:"Combines all dimension scores into a weighted overall score with a human-readable recommendation.",
    prompt:"Given scores: Feasibility 8, Market 7, Complexity 6, Time-to-value 8, Risk 5, Competitive 6, Monetization 7 — compute weighted average. Provide 2-sentence verdict and GO/PAUSE/STOP recommendation.",
    output:"Overall: 7.3/10 — GO with conditions. Strong market fit with quantified pain and high switching cost once embedded. Sharpen competitive differentiation strategy before committing full engineering resources." },
];

export function makeContextInit(idea: string, finalizedCount: number, totalCount: number) {
  if (!idea) {
    return "Hi — tell me what you're thinking about building. Describe the problem, the users, or anything you have so far.";
  }
  const pct = totalCount > 0 ? Math.round((finalizedCount / totalCount) * 100) : 0;
  return `We're working on: **${idea}**.\n\n${finalizedCount} of ${totalCount} context items are finalized (${pct}% agreed). Let's surface what's still unclear — assumptions, risks, competitors, GTM, or anything the team hasn't aligned on yet.\n\nWhat should we dig into first?`;
}

export function scol(v: number) { return v >= 7 ? "#15803d" : v >= 5 ? "#b45309" : "#b91c1c"; }
export function pcol(p: number) { return p === 100 ? "#15803d" : p >= 66 ? "#1d4ed8" : p >= 33 ? "#b45309" : "#999"; }

export async function callOpenAI(messages: any[], system = "", opts: any = {}) {
  const openAiMessages = system 
    ? [{ role: "system", content: system }, ...messages]
    : messages;

  const res = await fetch("/api/openai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      messages: openAiMessages,
      ...(opts.json ? { response_format: { type: "json_object" } } : {})
    }),
  });
  
  const d = await res.json();
  if (!res.ok) throw new Error(d.error?.message || d.error || "API error");
  
  const text = d.choices?.[0]?.message?.content || "";
  
  if (!opts.json) return text;
  try {
    return JSON.parse(text.replace(/```json|```/g, "").trim());
  } catch {
    return null;
  }
}

export const DOMAINS_DATA = [
  {
    id: "US-LOGISTICS",
    n: "US Logistics & Freight Ops",
    health: "94%",
    stats: [["18","Directives"],["4","Areas"],["6","Files"],["Active","Shared in 3 projects"]],
    desc: "Multi-carrier API architecture, broker-to-shipper interfaces, real-time vehicle GPS latency bounds, and payload SLA mappings.",
    sections: [
      { cat: "Market & Customer Needs", icon: "ti-trending-up", entries: [
        { k: "Value proposition", v: "Eliminate manual carrier check-calls. Automate real-time tracking updates for major freight brokers.", src: "Product Discovery" },
        { k: "Primary personas",  v: "Logistics dispatchers and shipper operations managers who suffer from blind spots in transport.", src: "User Persona Study" },
        { k: "Willingness to pay", v: "$49 to $99 per user seat / month. Easily vindicated by avoiding a single missed shipment penalty.", src: "Pricing Validation" },
      ]},
      { cat: "Competitive Landscape", icon: "ti-users", entries: [
        { k: "Enterprise incumbents", v: "Legacy systems priced at $40k+/year requiring custom consultants. Missing clean self-serve developers APIs.", src: "Competitor Matrix" },
        { k: "Legacy Spreadsheet tracking", v: "90% of mid-market brokerages still use massive internal Google Sheets with brittle APIs.", src: "15 Customer Interviews" },
      ]},
      { cat: "Technical Bounds & SLAs", icon: "ti-code", entries: [
        { k: "Carrier API standard", v: "Highly fragmented endpoints. Mixed JSON webhooks, legacy SOAP payload specs, and direct REST fetches.", src: "Technical Spike" },
        { k: "GPS Refresh Latency", v: "Device telemetry stream updates lag behind 10 to 25 minutes depending on carrier server schedules.", src: "API Metadata Specs" },
        { k: "SLA Threshold Limit", v: "Alert engines must dispatch late notifications within 180 seconds of missed ETA triggers.", src: "Eng Architecture" },
      ]},
      { cat: "Product Scope Lock-outs", icon: "ti-lock", entries: [
        { k: "Excluded features",  v: "Explicitly ruling out automated route optimization for V1 to prevent scope creep on carrier personas.", src: "Strategy Call" },
        { k: "Onboarding flow",   v: "No-code email invites only for initial shippers, removing complex self-registration overhead.", src: "UX Spec draft" },
      ]},
    ]
  },
  {
    id: "GLOBAL-HEALTHCARE",
    n: "Subscription SaaS & Payments Hub",
    health: "97%",
    stats: [["22","Directives"],["4","Areas"],["8","Files"],["Active","Shared in 2 projects"]],
    desc: "Stripe billing schemes, tiered user subscriptions, webhook state sync, transaction validation boundaries, and audit logs.",
    sections: [
      { cat: "Market & Customer Needs", icon: "ti-trending-up", entries: [
        { k: "Value proposition", v: "Self-serve enterprise usage billing and multi-tier seat allocation with automated overage charges.", src: "Market Validation" },
        { k: "Primary personas",  v: "Finance controllers and software heads wanting to control seats and toggle licenses natively.", src: "UX Target Study" },
        { k: "Willingness to pay", v: "Tiered starting at $299/month for teams up to 25. Custom usage metrics beyond baseline tiers.", src: "Financial Model" },
      ]},
      { cat: "Competitive Landscape", icon: "ti-users", entries: [
        { k: "Generic pricing tools", v: "Configuring complex hybrid usage models takes months in typical legacy billing hubs.", src: "Competitive Intel" },
        { k: "In-house custom code", v: "Most startups spend 30-40% of their early engineering efforts rewriting payments and ledger systems.", src: "Tech Founder Poll" },
      ]},
      { cat: "Technical Bounds & SLAs", icon: "ti-code", entries: [
        { k: "Payment Engine TLS",  v: "All transactional requests route via standard secure TLS websockets with signed signature headers.", src: "SecOps Blueprint" },
        { k: "Webhook Latency Sync", v: "Stripe state sync responses must populate local user ledger screens under 250ms SLA maximum.", src: "Webhook Spec" },
        { k: "Idempotency Rule",     v: "Require strict UUID v4 header validation checks to prevent duplicate charge executions.", src: "API Protocol" },
      ]},
      { cat: "Product Scope Lock-outs", icon: "ti-lock", entries: [
        { k: "Excluded features",  v: "Third-party invoice collection agents will not be integrated. Use general Stripe defaults.", src: "Product Alignment" },
        { k: "Audit Trails log",   v: "Store read-only event parameters in backend memory with daily backup retention loops.", src: "Security Standard" },
      ]},
    ]
  },
  {
    id: "APAC-FINTECH",
    n: "Real-time Collaboration & AI Canvas",
    health: "88%",
    stats: [["19","Directives"],["4","Areas"],["4","Files"],["Active","Shared in 2 projects"]],
    desc: "Event-driven WebSockets, real-time message state synchronisation, prompt management limits, and vector index rules.",
    sections: [
      { cat: "Market & Customer Needs", icon: "ti-trending-up", entries: [
        { k: "Value proposition", v: "Instant double-sided collaboration so product, design, and engineering see exact active constraints.", src: "Problem Discovery" },
        { k: "Primary personas",  v: "Product Managers, Tech Leads, and QA testers switching hourly across complex features.", src: "User Surveys" },
        { k: "Friction metric",    v: "Normally takes 14 days of constant onboarding syncs to align engineers to a brand-new project.", src: "Team Metrics" },
      ]},
      { cat: "Competitive Landscape", icon: "ti-users", entries: [
        { k: "Wikis & static docs", v: "Confluence or Notion documents lie dead 48 hours after they are written, creating massive drift.", src: "Drift Audit" },
        { k: "Manual handovers",  v: "Tedious Jira tickets with cut-and-paste JSON examples that deviate from actual production code behavior.", src: "Productboard Poll" },
      ]},
      { cat: "Technical Bounds & SLAs", icon: "ti-code", entries: [
        { k: "WebSocket Transit",   v: "Active browser synchronization events must complete within 80 milliseconds to prevent drift feel.", src: "Performance Target" },
        { k: "Context Window Cache", v: "Throttle persistent context reads to 15-minute polling windows to optimize cloud costs.", src: "Infra Guidelines" },
        { k: "Database State Sync", v: "Entity schema state transitions must operate transactional safety locks in Postgres.", src: "Ledger Schema" },
      ]},
      { cat: "Product Scope Lock-outs", icon: "ti-lock", entries: [
        { k: "Excluded features",  v: "Audio/video call channels explicitly out of scope for early versions. Stick to reactive text threads.", src: "Product Roadmap" },
        { k: "Workspace limits",   v: "Cap simultaneous active collaborators to 12 members per living project workspace view.", src: "UX Framework" },
      ]},
    ]
  }
];
