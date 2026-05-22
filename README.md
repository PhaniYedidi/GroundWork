# Groundwork — Product Discovery Specs Platform

Welcome to **Groundwork**! This application is designed to help product managers, engineers, and founders rapidly discover, evaluate, and blueprint product ideas using structured AI insights.

---

## 🛠️ The Tech Stack

This is a modern, high-performance, **full-stack web application**:

1. **Frontend**:
   - **React 18**: The world's most popular library for building responsive user interfaces.
   - **Vite**: A lightning-fast modern build engine.
   - **TypeScript**: Adds structural type safety so the code remains crash-free.
   - **Tailwind CSS**: A modern utility-first stylesheet library for custom visual aesthetics.
   - **Tabler Icons (`@tabler/icons-react` / `lucide-react`)**: High-fidelity modern vector iconography.

2. **Backend**:
   - **Express (Node.js)**: A lightweight, industry-standard server powering API routing.
   - **tsx / esbuild**: Native compilation engines bundling TypeScript straight into clean target deliverables.

3. **AI Core Interface**:
   - **Dual Compatibility Model**:
     - *Default*: Integrates with **Google Gemini (gemini-2.5-flash / gemini-3.5-flash)** using the server-secure `@google/genai` framework.
     - *Hackathon Direct Mode*: Configured to run on native **OpenAI GPT-4o** when an `OPENAI_API_KEY` is provided.
---

## 🚀 Step 1: Creating Your GitHub Repository (Zero Coding Needed)

Since you have never created a repository on GitHub before, here is the easiest step-by-step way to get set up:

1. **Create an Account**: Go to [GitHub](https://github.com/) and register a free account.
2. **Export your code**:
   - In **Google AI Studio**, click the **Export** or **Settings** menu at the top-right.
   - Choose **Export as ZIP**. Download it to your computer and unzip it.
3. **Upload to GitHub (The easy visual way)**:
   - On GitHub, click the **`+`** icon in the top right corner and select **New repository**.
   - Name it (e.g., `groundwork-product-discovery`).
   - Leave it **Public**, do **not** check "Add a README", and click **Create repository**.
   - On the next screen, you will see a link that says *"uploading an existing file"* right inside the setup section. Click it!
   - Drag and drop all the files from your unzipped folder (including `package.json`, `index.html`, and the `src` folder) directly into your browser window.
   - Click the green **Commit changes** button at the bottom.
   - 🎉 **Your repository is live!** Copy its URL (e.g., `https://github.com/your-username/groundwork-product-discovery`).

---

## 🖼️ Step 2: Pitch Deck & Video Uploads

For extra bonus points in your hackathon, organize these two critical assets:

### 1. Presentation Slide Deck 📊
* **How to build**: Use **Google Slides**, **Canva**, or **Pitch.com** to build 4 to 5 simple, visually elegant slides covering:
  * *Slide 1*: Hook & Problem (e.g. "Regional logistics loses up to $10k per delayed shipment due to manual tracking").
  * *Slide 2*: Solution (e.g. "Groundwork — Structured discovery, instant scorecards, and AI blueprinting connected to Notion").
  * *Slide 3*: Key Features (e.g., AI Discovery, 7-Dimension Scorecards, Automated User Flows).
  * *Slide 4*: Future Roadmap (Enterprise CRM connections, automated Jira sync).
* **Where to host**: Click *File -> Share* in Google Slides, set access to **"Anyone with the link can view"**, and copy that link!

### 2. Demo Video 🎥
* **How to record**: Use a free browser screen recorder like [Loom](https://www.loom.com/) or macOS's built-in QuickTime Player.
* **Flow (Keep it under 3 minutes)**:
  * *0:00 - 0:30*: Hook (Explain the problem Groundwork solves).
  * *0:30 - 1:30*: Run a Demo! Show the AI Chat in "Discovery", then navigate to the **Scorecard** tab and run an evaluation.
  * *1:30 - 2:30*: Showcase the **Playbook / Blueprint** and show the visual SVG Flowchart. Mention how easy it is to export directly to Notion.
  * *2:30 - 3:00*: Conclude with a solid technical "why" (server-side security, ready for immediate GPT-4o usage).
* **Where to host**: Loom provides a quick link immediately. Alternatively, upload to YouTube (unlisted) or Google Drive.

---

## 🌩️ Step 3: Deploying to Netlify / Vercel (Zero Coding Needed)

Since this app contains a secure full-stack Node/Express server handling backend API requests, deploying standard "static-only" hosting (like basic Netlify or basic GitHub Pages) will break backend calls. 

We highly recommend deploying using **Vercel** which supports seamless full-stack serverless rendering for Node.js out of the box!

### Option A: The Vercel Direct Git Sync (Easiest & Automatic)
1. Go to [Vercel](https://vercel.com/) and sign up using your **GitHub account** (this links them instantly).
2. Click **Add New** -> **Project**.
3. You will see a list of your GitHub repositories. Click **Import** next to your `groundwork-product-discovery` repository.
4. On the configuration page:
   - **Framework Preset**: Select **Vite** or leave on *Other*.
   - **Build and Output Settings**: Vercel handles this automatically, but if it asks:
     * *Build Command*: `npm run build`
     * *Output Directory*: `dist`
5. **Add your Environment Key** (Crucial step):
   - Expand the **Environment Variables** section.
   - Add Key: `OPENAI_API_KEY`
   - Add Value: *Your hackathon OpenAI API key.*
6. Click **Deploy**! In about 60 seconds, Vercel will give you a live production URL (e.g., `https://groundwork.vercel.app`).
7. Every time you push a change to your GitHub, Vercel updates the live site automatically!

---

## 📋 Hackathon Submission Checklist

Use these draft placeholders to prepare your final submission form:

* **Project Title**: Groundwork Product Discovery Specs
* **Short Description**: A collaborative product discovery platform with structured AI scoring, user flow logic, and instant specifications sync.
* **GitHub Repository URL**: `https://github.com/[YOUR_USERNAME]/groundwork-product-discovery` *(Update this!)*
* **Slide Deck URL**: `https://docs.google.com/presentation/d/[YOUR_SLIDES_ID]/edit?usp=sharing` *(Update this!)*
* **Demo Video URL**: `https://www.loom.com/share/[YOUR_LOOM_ID]` *(Update this!)*
* **Live App Deployment URL**: `https://[YOUR_PROJECT_NAME].vercel.app` *(Update this!)*
