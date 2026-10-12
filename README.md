# ⚡ Auroscale Pulse (Self-Serve AI Growth & Overlap Audit Studio)

> **A Product-Led Growth (PLG) Prototype built specifically for Auroscale.**
> Designed to solve top-of-funnel customer acquisition by turning the manual "30-minute discovery call" into an **instant 15-second self-serve diagnostic**.

---

## 🎯 The Problem This Solves for Auroscale

On [Auroscale.com](https://auroscale.com), every call to action directs prospects to:

> _"Book Your Free AI Marketing Audit (30 minutes · No prep required)"_

**The friction:** Busy growth leaders, CMOs, and agency directors hesitate to commit to a 30-minute Zoom call before seeing tangible proof of value.

**Auroscale Pulse solves this bottleneck:**

1. A prospect inputs their brand URL and monthly ad spend.
2. In **15 seconds**, Auroscale's 5 autonomous agents run an instant public audit:
   - **Audience Intelligence Agent (Agent 03):** Visualizes the duplicate cohort between Meta Ads and Google Ads and calculates exact ₹/mo wasted in self-cannibalizing bids (Auroscale's #1 differentiator).
   - **Creative Studio Agent (Agent 01):** Generates 3 multi-channel ad concepts (Instagram, LinkedIn, Google Search) pre-scored for predicted ROAS.
   - **WhatsApp Nurture Agent (Agent 05):** Simulates an India-first lead capture workflow where the user receives the full 12-page exclusion report directly on WhatsApp.

---

## 🛠️ Tech Stack & Architecture

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript (Strict mode)
- **Styling:** Tailwind CSS (Auroscale dark aesthetic `#09090B`, elevated cards `#121215`, subtle borders `#27272A`)
- **Animation & Visuals:** Framer Motion, Lucide Icons, Canvas Confetti
- **Deployment:** Vercel (Zero-configuration serverless)

---

## 📂 Project Structure

```text
├── app/
│   ├── api/audit/route.ts      # Serverless route executing the audit analysis
│   ├── globals.css             # Auroscale dark styling, grid backdrop, glow utilities
│   ├── layout.tsx              # Root HTML & metadata wrapper
│   └── page.tsx                # Interactive Command Center & Results Dashboard
├── components/
│   ├── Navbar.tsx              # Brand navigation & 5-agent live status badge
│   ├── HeroBanner.tsx          # High-impact value proposition
│   ├── AuditInputCard.tsx      # URL input, spend slider (₹50k-₹50L), channel chips
│   ├── ScanningTerminal.tsx    # Real-time multi-agent terminal simulation
│   ├── OverlapVisualizer.tsx   # Venn/Euler duplicate audience overlap diagram
│   ├── MetricsGrid.tsx         # Financial leakage, CAC inflation, ROAS lift cards
│   ├── CreativeStudioPreview.tsx # Multi-channel ad briefs with predicted ROAS
│   ├── WhatsAppNurtureModal.tsx  # WhatsApp delivery & conversational chat simulator
│   └── FounderNoteFooter.tsx   # Candidate note & architectural credit to Kartikeya
├── lib/
│   ├── audit-engine.ts         # Audience overlap & budget cannibalization math
│   ├── creative-generator.ts   # Copywriting heuristics & predicted virality scoring
│   ├── formatters.ts           # Indian (Lakhs/Crores) & USD currency formatters
│   └── types.ts                # Strict TypeScript interfaces
```

---

## 🚀 Running Locally

```bash
# Clone the repository
git clone https://github.com/sahil-v001/AUROSCALE_MVP.git
cd AUROSCALE_MVP

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 💡 Built for Kartikeya Neel Bakshi & Auroscale Team

Built with admiration for Kartikeya's thesis on **Human-Robot Collaboration** and eliminating repetitive business bottlenecks.

- **Candidate:** Sahil Verma
- **Role Targeted:** GTM Engineer
