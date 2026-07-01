# The Human AI Co — Framer Build Guide

You now have 6 Framer Code Components (in this `framer` folder) plus this guide, which tells you exactly what to place on each of the 6 pages and what text/colors to type into each one. Everything here is native Framer — text, layout and colors are all editable by clicking around, no code editing required after setup.

## 1. Add the code components to your Framer project

For each `.tsx` file in this folder:

1. In Framer, open the **Assets** panel (left sidebar) → **Code** tab.
2. Click **+** → **New Code File**.
3. Delete the placeholder content and paste in the full contents of one `.tsx` file.
4. Framer auto-saves and the component appears in your Assets panel, ready to drag onto any page.

Do this once for all 6 files: `Hero3D.tsx`, `HomeOrbitHero.tsx`, `ServiceCard.tsx`, `StatBlock.tsx`, `ProcessStep.tsx`, `BeforeAfterItem.tsx`.

Once added, drag as many copies of each onto your canvas as you need — every instance has its own property panel (right sidebar) where you type in text and pick colors, exactly like Framer's built-in elements.

## 2. Host your 5 .glb files

Framer, like Webflow, doesn't accept raw `.glb` uploads through its own asset manager. Same fix as before:

1. Create a free GitHub account, make one new **public** repo, and upload the 5 files from your `3d-models` folder.
2. Each file's public URL is: `https://cdn.jsdelivr.net/gh/YOUR-USERNAME/YOUR-REPO@main/foundation.glb` (swap the filename per model).
3. Paste that URL into the **Model URL** property of `Hero3D` (or `HomeOrbitHero`'s **Brain model URL**) on each page.

No-signup fallback: upload to [TinyGLB](https://tinyglb.com/glb-3d-model-hosting) instead — you'll get an iframe embed rather than a URL, so you'd swap the whole `Hero3D` component for a native Framer **Embed** element with that iframe code (you lose the custom rotation-speed/exposure controls, but it's zero setup).

## 3. Page-by-page build

Every page: add Framer's own Navbar (Insert → Navigation) with links Home / Foundation / Aurora / Clarity / Navigation / Contact, and a footer Stack at the bottom with the same links plus email `hello@thehumanai.co` and social links (LinkedIn, Email, Website, Instagram) — build this once, then turn it into a **Framer Component** (right-click → Create Component) so editing it updates every page at once.

### Home
- Drop **HomeOrbitHero** at the top of the page (it needs real page height — set the frame to "Fill" or a tall fixed height like 2200px so the scroll effect has room to play).
  - Headline: `AI, guided by\nhuman intelligence.`
  - Tagline: `A modern AI consultancy built around one belief: technology moves fast, but people still need people. Scroll to meet the four ways we help.`
  - Brain model URL: your hosted `home-brain.glb` link
  - Accent color: `#ff6a3d`
  - Orbit pills: Foundation `#c22c3e` → /foundation, Aurora `#d6247e` → /aurora, Clarity `#7c3aed` → /clarity, Navigation `#2e62d6` → /navigation
- Below it, add a Framer Text block for the mission intro:
  > When we hear "Artificial Intelligence" we think jobs disappearing, people being replaced, everything speeding up without anyone really choosing it. But that's not the full picture. Work is changing, and the real question is whether people stay in the driving seat or not.
  >
  > We are a modern consultancy specialising in AI. Our role is to bridge the gap so AI works with us rather than against us. We put humans first and stay clear about where AI helps and where it doesn't. That belief shapes how we work, and why everything we do sits within four simple services: Foundation, Aurora, Navigation and Clarity.
- **Our Story** section — Text blocks with this copy:
  > The Human AI Co. was built on one core belief: technology is moving faster than most people can keep up with, however human connection is more important than ever.
  >
  > We are living in a new world. AI is everywhere — from ChatGPT to Claude, Gemini and countless other platforms. Yet for most, AI is still misunderstood. That is exactly why The Human AI Co. exists. People still buy from people. People still trust people. And people still need people to help them navigate change.
  >
  > We set this business up to sit in the middle, between the fast-moving world of artificial intelligence and the real people, businesses and teams trying to make sense of it. That is where we come in.
  >
  > What we are seeing, especially here in the UK, is that many businesses are still operating with outdated back-end systems, inefficient processes and too much manual work. That gap is where we add value.
  >
  > We don't believe in replacing the human element. We believe in strengthening it.
  >
  > The future is AI-powered, but it should still feel human. That is what The Human AI Co. stands for.
- **Four services grid** — 4× `ServiceCard` in a row:
  1. Eyebrow `Foundation — Operational systems and automation`, Heading `How much of your time, money and brain power is wasted on repetitive admin?`, Body "Foundation brings automation to how admin is carried out, sales are tracked, and invoices are processed so nothing is missed.", Accent `#c22c3e`, Link `/foundation`
  2. Eyebrow `Aurora — Marketing execution and brand growth`, Heading `How many marketing ideas are still sitting unfinished, waiting on someone else?`, Body "Aurora combines human creativity with AI-powered production to turn ideas into real marketing output quickly.", Accent `#d6247e`, Link `/aurora`
  3. Eyebrow `Clarity — AI understanding and confident adoption`, Heading `How many people on your team are unsure how AI actually affects their role?`, Body "Clarity helps your team understand AI in a calm, practical way, with human-led guidance.", Accent `#7c3aed`, Link `/clarity`
  4. Eyebrow `Navigation — Business strategy and commercial direction`, Heading `How often are you making big decisions without full clarity or enough time to think?`, Body "Navigation gives you commercially grounded direction shaped by real founder and CEO experience.", Accent `#2e62d6`, Link `/navigation`
- CTA text block: **"Ready to dominate your industry?"** / "AI should work for people, not the other way around." + button to `/contact`.

### Foundation (accent `#c22c3e`)
- Hero: `Hero3D` (Model URL → your `foundation.glb`, Accent `#c22c3e`) beside a Text block: Heading "FOUNDATION", body copy "AI should work for people, not the other way around. Foundation brings automation to how administrative tasks are carried out..."
- 3× `ServiceCard` (no link): **More time** / **Better revenue** / **Lower costs** (copy in the original brief).
- 3× `StatBlock`: `1–2 Days`, `40%`, `Only 30%` (with their labels), accent `#c22c3e`.
- 6× `ProcessStep`: Steps 1–6 of the Foundation process (get a clear picture → identify areas costing time/money → design the structure → integrate carefully → test in real life → maintain and evolve).
- 3× `ServiceCard`: benefits broken down (more time / costs less / more money).
- `BeforeAfterItem` × 8 (4 Before, 4 After): leads sit in inboxes / follow-ups aren't done / sales statuses unclear / admin takes hours — vs. — all leads captured / follow-ups automatic / pipelines visible / reports automatic.

### Aurora (accent `#d6247e`)
- Hero: `Hero3D` → `aurora.glb`, Text: "AURORA — Marketing capability for modern businesses."
- 4× `ServiceCard`: Your brand / Your website / Your marketing / Your design.
- 4× `ServiceCard`: Faster execution / Clearer brand identity / More time for leaders / Usable creative work.
- 4× `ProcessStep`: the Aurora process steps 1–4.
- 3× `ServiceCard`: Ongoing marketing partnership / Project-based work / Fractional marketing support.
- 4× `ServiceCard` cross-linking the other 3 services + Aurora itself (Foundation `#c22c3e` → /foundation, Clarity `#7c3aed` → /clarity, Navigation `#2e62d6` → /navigation).
- `BeforeAfterItem` × 8: a typical day before/after Aurora.

### Clarity (accent `#7c3aed`)
- Hero: `Hero3D` → `clarity.glb`, Text: "CLARITY."
- 3× `ServiceCard`: Calmer employees / Confident teams / Better control.
- 6× `ProcessStep`: How Clarity works, steps 1–6.
- 3× `StatBlock`: `Over 60%`, `50%`, `Over 70%`.
- 4× `ServiceCard`: the 4 delivery formats (1:1 coaching, team workshops, business days, industry talks).
- `BeforeAfterItem` × 10: the 9am/10:30/12pm/3:15/9:30 before-and-after timeline.
- 3× `ServiceCard`: the 3 pressure points before/after.

### Navigation (accent `#2e62d6`)
- Hero: `Hero3D` → `navigation.glb`, Text: "NAVIGATION."
- 4× `ServiceCard`: Clear decision-making / Predictable growth / Better alignment / Reduced pressure.
- 3× `StatBlock`: `70%`, `2× faster`, `20–30%`.
- 4× `ProcessStep`: the Navigation process steps 1–4.
- Text block: the Black Book specialist list (Accountants, Legal, Commercial Advisers, Software Providers, Insurance Brokers, Marketing Partners, Operational Consultants, Customer Managers, Recruitment Support, Finance Experts, HR Specialists, Graduates).
- 4× `ServiceCard`: benefits broken down (clear decision-making / predictable growth / alignment / reduced pressure).

### Contact (accent `#ff6a3d`)
- Text: "Let's find out where AI fits." + intro copy.
- A native Framer Form (Insert → Forms) with Name / Email / Message fields.
- Text block: email `hello@thehumanai.co` + social links.
- Closing quote: "It was never about AI. It was always about the people."

## Notes

- Every `ServiceCard`, `StatBlock`, `ProcessStep` and `BeforeAfterItem` instance is independently editable in the right-hand property panel — no code needed after the initial paste-in.
- Keep each page's accent color consistent across all its component instances so the whole page reads as one color family.
- Full source copy for every page (in case you want the complete word-for-word text) is in the earlier Webflow files (`webflow-foundation.html`, `webflow-aurora.html`, `webflow-clarity.html`, `webflow-navigation.html`, `webflow-home-content.html`, `webflow-contact.html`) — the wording is identical, just delivered as Framer components here instead of raw HTML.
