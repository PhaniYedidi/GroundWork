# Groundwork by Altir — Enterprise Cognitive Alignment System

> **Build the right thing. Before you build anything.**

Groundwork is an advanced, dual-track Enterprise Cognitive Alignment System designed to reconcile the systemic rift between product discovery and active software engineering. By unifying raw stakeholder intent, business contracts, and technical schemas into a single, continuous, real-time **Synapse Knowledge Graph**, Groundwork eliminates specification drift and engineering code rework entirely.

---

## 🌌 The Paradigm

Traditional enterprise software development cycles suffer from information decay. Product managers, legal teams, and clients establish high-fidelity rules in meetings, briefs, and transcripts, only for engineers to reconstruct those specifications from fragmented, outdated tickets. 

Groundwork solves this by providing **synchronized co-work spaces** designed to bridge raw intent to executable logic:

```
  [ Stakeholder Audio & Briefs ]
                 │
                 ▼ (PM Track / Intake)
      [ AI Transcription & Extraction ]
                 │
                 ▼ (Synapse Graph Sync)
   🌱 LIVING SPECIFICATION DEFINITIONS
                 │
                 ▼ (Dev Track / Automation)
      [ Conformed Database Schemas ]
      [ System Sequence Layouts ]
      [ Context-Grounded AI Copilot ]
```

---

## 🛠️ Core Capabilities

### 1. Unified dual-track Workspace
*   **The PM Track (Intake Dashboard)**: Paste client interview transcripts, upload regulatory specs, or drop stakeholder briefings directly. The system autonomously parses unstructured requirements into formal corporate constraints.
*   **The Dev Track (Engineering Terminal)**: Instantly reviews conformed PostgreSQL schema drafts, system endpoints, and interactive component flowcharts bound strictly to active product requirements.

### 2. Synapse Knowledge Graph & Traceability
*   Spec-to-code parameters are securely mapped inside a semantic registry.
*   Engineers can inspect any variable, database constraint, or SLA model to see the exact transcript source and stakeholder sentence it was derived from—providing absolute grounding truth.

### 3. Integrated Cognitive Copilot
*   A chat environment permitting both teams to query system parameters.
*   The Copilot generates code snippets, checks API design compliance, and reviews architectural rules based entirely on active intake files, preventing hallucinatory recommendations.

---

## 🎛️ Technology Stack

*   **Frontend**: 
    *   **React 18** paired with dynamic, high-performance UI components.
    *   **Tailwind CSS** for an off-black, modern, typography-centric design system.
    *   **Motion** for smooth state transitions and tactile interface feedback.
    *   **TypeScript** ensuring structural type safety.
*   **Backend**:
    *   **Node.js & Express** providing streamlined servers and cognitive bridging proxies.
    *   **tsx / esbuild** compiling TypeScript pathways directly to stable container builds.
*   **AI Integration**:
    *   **Google Gemini API** (securely routed server-side to prevent credential exposure in browser DevTools).

---

## ⚙️ Local Development Setup

To run Groundwork on your local workstation, proceed with the following steps:

### 1. Prerequisites
Ensure you have **Node.js** (v18 or higher) and **npm** installed on your machine.

### 2. Installation
Clone your workspace repository or unzip the downloaded codebase, navigate into the directory, and run the dependency installation utility:

```bash
npm install
```

### 3. Configure Secrets
Define your server-side environment variables by copying the template file:

```bash
cp .env.example .env
```

Open the newly created `.env` file and insert your secure API Credentials:

```env
# Server-side Gemini API Access Key (Never exposed client-side)
GEMINI_API_KEY=your_gemini_api_key_here
```

### 4. Directing your Dev Server
Start the development server with Hot Module Replacement and TypeScript type-stripping enabled:

```bash
npm run dev
```

Your Groundwork application will compile and become available locally at:
👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🎯 Production Engineering

When compiling the server and bundle into an optimized, enterprise-ready build for container deployment (such as Cloud Run, Vercel, or AWS ECS), run:

```bash
npm run build
npm start
```

This compiles your full React frontend bundle into standard, optimized static assets inside `dist/`, compiling the Node/Express backend cleanly into a standalone entry point (`dist/server.cjs`) using `esbuild` for fast, low-footprint server initialization.
