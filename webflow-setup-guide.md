# The Human AI Co — Webflow Setup

A 6-page site: Home, Foundation, Aurora, Clarity, Navigation, Contact. Built the same "hybrid" way as before — static content pastes in as native, fully editable Webflow elements; the two pieces of real interactivity (the Home hero and each service page's 3D object) live in Embed elements / a `<model-viewer>` tag.

## Files

| File | What it is | Where it goes |
|---|---|---|
| `webflow-global-styles.html` | Fonts (Manrope), color system, every shared component class (cards, stats, steps, buttons, nav, footer, hero, orbit), plus the `<model-viewer>` script loaded once site-wide | Site Settings → Custom Code → **Head Code** |
| `webflow-nav-footer.html` | Shared nav + footer | Paste nav at the top of every page, footer at the bottom of every page, then right-click each → **Create Symbol** so they stay in sync |
| `webflow-home-hero-embed.html` | Scroll-driven circle reveal, 3D brain, 4 orbiting service pills | One Embed element, Home page only, directly below the Nav symbol |
| `webflow-home-content.html` | Mission intro, Our Story, 4-service grid, CTA | Paste onto canvas, Home page, below the hero embed |
| `webflow-foundation.html` | Full Foundation page (hero + all sections) | Paste onto canvas, Foundation page, below the Nav symbol |
| `webflow-aurora.html` | Full Aurora page | Paste onto canvas, Aurora page, below the Nav symbol |
| `webflow-clarity.html` | Full Clarity page | Paste onto canvas, Clarity page, below the Nav symbol |
| `webflow-navigation.html` | Full Navigation page | Paste onto canvas, Navigation page, below the Nav symbol |
| `webflow-contact.html` | Contact form + details | Paste onto canvas, Contact page, below the Nav symbol |
| `/3d-models/*.glb` | 5 compressed, recolored 3D objects (~2–2.4MB each, down from ~40MB) | Needs external hosting — see below |

Every page ends with the Footer symbol.

## Build order

1. **Head code first.** Paste `webflow-global-styles.html` into Site Settings → Custom Code → Head Code. This loads Manrope, all shared styles, and the `<model-viewer>` script every other page depends on.
2. **Create the 6 pages** in Webflow's Pages panel: Home, Foundation, Aurora, Clarity, Navigation, Contact.
3. **Nav + Footer symbols.** On Home, paste the `<nav>` block from `webflow-nav-footer.html`, turn it into a Symbol. Do the same for the `<footer>` block. Then drop both Symbols onto the other 5 pages (top and bottom respectively).
4. **Host the 3D models** (see next section), then find-and-replace `MODEL_URL` in each hero file with your real hosting URL before pasting.
5. **Paste each page's content** per the table above.
6. **Preview** — scroll through the Home hero to confirm the circle reveal and orbiting pills work, then check each service page's 3D object loads and auto-rotates.

## Hosting the .glb files

Webflow's Asset Manager does not accept `.glb` uploads, so the 5 files in `/3d-models` need to live somewhere else that serves them over HTTPS with CORS enabled for your domain — a Cloudflare R2 bucket, AWS S3 + CloudFront, or similar. Once uploaded, you'll have 5 public URLs like:

```
https://your-cdn.com/3d-models/home-brain.glb
https://your-cdn.com/3d-models/foundation.glb
https://your-cdn.com/3d-models/aurora.glb
https://your-cdn.com/3d-models/clarity.glb
https://your-cdn.com/3d-models/navigation.glb
```

In each hero file, replace `MODEL_URL/xxx.glb` with the real URL before pasting into Webflow. Each model already has its brand color baked into its texture (saturated + brightened to match its page) and is Draco-compressed with 1024px WebP textures, so file size shouldn't be a problem once hosted on a real CDN.

## Per-page accent colors

| Page | Accent | Hex |
|---|---|---|
| Home / Contact | Warm amber | `#ff6a3d` |
| Foundation | Deep red | `#c22c3e` |
| Aurora | Magenta/pink | `#d6247e` |
| Clarity | Purple | `#7c3aed` |
| Navigation | Blue | `#2e62d6` |

Each page's outer `<div class="hai-page" style="--accent:#...">` controls this — change that one value to retint an entire page (buttons, glows, borders, stat numbers).

## What's editable vs. not

Fully editable in the Designer: all page copy, headings, cards, stats, process steps, footer links, the contact form fields. Not editable visually (lives in code): the Home hero's scroll/reveal mechanics and orbit animation, and the `<model-viewer>` 3D objects on every hero (you can still swap which `.glb` URL each one points to, or delete/replace the tag entirely with a static image if you'd rather not host 3D files).

## Known placeholders to swap

- `hello@thehumanai.co` — replace with your real inbox everywhere it appears (footer, Contact page).
- Social links (`#`) — LinkedIn and Instagram hrefs are placeholders.
- Contact form — currently plain HTML; convert to a native Webflow Form element so submissions reach your Webflow inbox/integrations.
- Nav/footer internal links assume clean URLs (`/foundation`, `/aurora`, etc.) — adjust if your Webflow page slugs differ.
