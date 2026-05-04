# Northstrider Consulting — Buildout Plan

> **Goal:** Ship a generic-but-credible site in 1–2 weeks. Preserve every structural slot
> we'll need to expand into a positioned site once the client returns specific content.
>
> **Status:** Skeleton built (Astro + Tailwind v4 + MDX + Vercel adapter). Light theme, north
> star branding, all primary pages and a working `/api/contact` endpoint backed by Resend.

---

## 1. Strategy

Three principles guide every editing decision in the next two weeks:

1. **Genericize copy. Preserve structure.** Strip every opinionated claim from the visible
   copy. Keep the components, layouts, and credibility slots (partner badge, certs, logo
   strip, case studies) — they read as credible even when empty.
2. **Hide what needs content to look good.** A page with placeholder copy hurts more than
   a missing page. Pull anything from nav that requires a real client/founder/vertical to
   feel honest. Files stay; we flip them back on when content arrives.
3. **Productionize the deployment path.** Domain, email, analytics, legal, SEO basics. This
   is the actual gating work for "live."

The trap to avoid: writing convincing-sounding copy that the firm can't actually back up.
That's worse than blandness — it's a credibility liability the moment a real prospect arrives.

---

## 2. Scope at launch

### In

- Home page (genericized hero, services grid, principles → swapped for neutral copy, certs
  strip, dark CTA band)
- Services page (4 standard service blocks, no specific pricing/timelines)
- About page (short neutral firm description, no founder bio yet)
- Contact page (working form via Resend)
- Footer with disclaimers
- robots.txt + sitemap.xml + favicon
- Privacy / legal page (minimal but real)
- Plausible or GA4 analytics
- Verified Resend sending domain
- Custom domain on Vercel

### Out (until client returns content)

- **Industries page** — hidden from nav; file remains in `src/pages/industries.astro`
- **Sample case study** — kept in `src/content/case-studies/` but `draft: true` so it does
  not render in the index or the homepage tease (empty state shows instead)
- **Founder photo + bio block** on About — replaced with a neutral "about the team" block
- **Hero stat tiles** (10+ years, 6+ certs, --) — removed; will return once we have real numbers
- **Specific testimonial pull-quotes** — none; we won't fake them

---

## 3. Phases

### Phase 1 — Genericize (this week)

Edits inside the existing components/pages. No new architecture.

- [x] **Home: hero**
  - [ ] Replace italic tagline ("earns its keep") with neutral phrasing — *deferred per client; will revisit*
  - [x] Replace subhead "small and mid-sized teams" claim with audience-neutral language
  - [x] Remove the three-stat dl block (years/certs/orgs) until we have real numbers
- [x] **Home: principles band** — section removed from homepage; component file kept in `src/components/PrinciplesBand.astro` for future use
- [x] **Home: services grid** — descriptions softened, intro line genericized
- [x] **Services page**
  - [x] Replace pricing with "Pricing on request" across all four services
  - [x] Kept generic timeline ranges (option B per doc)
  - [x] Softened "Best for" lines and page lede
- [x] **About page**
  - [x] Removed founder block (photo placeholder + name + bio + social links)
  - [x] Removed Norse/Big Dipper origin story
  - [x] Replaced with neutral 2-paragraph firm description
  - [x] Kept certifications strip (see open question 1 below)
- [x] **Industries page** — removed from primary nav; file remains, page returns `noindex` so search engines won't surface it
- [x] **Case studies** — `sample-placeholder.mdx` set to `draft: true`; dynamic route filters drafts from `getStaticPaths` so the URL is no longer reachable; index shows "coming soon" empty state
- [ ] **Footer** — client review pending
  - [ ] Confirm Salesforce trademark disclaimer copy is acceptable to client
  - [ ] Drop the "Salesforce Partner badge — pending" indicator if client prefers no
        commitment-signal placeholder

### Phase 1 — Resolved: LogoStrip and CertificationsStrip hidden for v1

Decision: **Option 1.** Both sections removed from the homepage; CertificationsStrip
removed from the About page. Component files remain at
`src/components/LogoStrip.astro` and `src/components/CertificationsStrip.astro` for
re-use when real client logos and confirmed certs arrive (see Phase 3).

Result: homepage compresses to **Hero → Services → Case Study (empty state) → CTA**.
Reads as intentional rather than placeholder-laden.

### Phase 2 — Productionize (concurrent with Phase 1)

- [ ] **Domain**
  - [ ] Point `northstriderconsulting.com` and `www.` at Vercel (A/CNAME records per Vercel docs)
  - [ ] Confirm `https://` enforced and www → apex (or apex → www) redirect set in Vercel
  - [ ] Verify production deployment loads at the real domain
- [ ] **Email (Resend)**
  - [ ] Add `northstriderconsulting.com` as a domain in Resend
  - [ ] Add the SPF/DKIM/DMARC DNS records the Resend dashboard provides
  - [ ] Wait for verification (usually <1 hour after DNS propagates)
  - [ ] Set `CONTACT_FROM_EMAIL` env var to `Northstrider <hello@northstriderconsulting.com>`
        (or whatever sender alias they want)
- [ ] **Vercel env vars** (Production + Preview)
  - [ ] `RESEND_API_KEY`
  - [ ] `CONTACT_TO_EMAIL` — confirmed inbox the firm monitors
  - [ ] `CONTACT_FROM_EMAIL` — verified-domain sender (after Resend domain verification)
  - [ ] Redeploy after vars are set
- [ ] **Analytics**
  - [ ] Pick Plausible (privacy-friendly, paid) or GA4 (free, more data, more invasive)
  - [ ] Add the snippet to `BaseLayout.astro` head slot
  - [ ] Confirm pageviews register on production
- [ ] **Legal**
  - [ ] Add `/privacy` page — minimal but real (what data the form collects, who it's
        shared with, how long it's retained)
  - [ ] Link from footer
  - [ ] If targeting EU/UK visitors, decide on a cookie consent banner (Plausible avoids the need)
- [ ] **SEO basics**
  - [ ] Confirm `sitemap-index.xml` returns 200 in production
  - [ ] Add `robots.txt` allowing all + pointing to sitemap
  - [ ] Submit sitemap in Google Search Console (and Bing if client wants)
  - [ ] Replace `og-image.png` placeholder reference with a real OG image (1200x630)
  - [ ] Verify `<title>` and `<meta description>` per page render with the correct text
- [ ] **Favicon / brand**
  - [ ] Confirm the current SVG north-star favicon is acceptable as a placeholder, OR ask
        client for their preferred mark

### Phase 3 — Expansion (post-launch, as client returns content)

Each item below is a 5–60 minute edit because the slot already exists.

- [ ] **Salesforce Partner status** → drop badge image into footer, replace "pending" tag
- [ ] **Real client logos (3–5)** → re-import `LogoStrip` in `src/pages/index.astro`,
      replace text placeholders inside the component with logo SVGs
- [ ] **Real Salesforce certifications** → re-import `CertificationsStrip` in
      `src/pages/index.astro` and `src/pages/about.astro`; swap placeholder badges in
      the component for official credential SVGs; link each to Trailblazer profile
- [ ] **AppExchange listing link** → drop into footer + About page
- [ ] **First case study** → write MDX in `src/content/case-studies/`, set `draft: false`
- [ ] **Founder photo + bio** → un-hide About founder block, replace `[Founder Name]` placeholders
- [ ] **Vertical decision** → re-add Industries to nav once 1–2 verticals chosen; prune the
      industries list to only those
- [ ] **Calendly / Cal.com embed** → replace placeholder link in Contact sidebar
- [ ] **Testimonials** → add a Testimonial component (does not exist yet) once 2–3 quotes
      are approved by clients
- [ ] **Real hero stats** → restore the 3-stat dl block with confirmed numbers
- [ ] **Specific pricing** → restore concrete pricing/timeline copy on Services page

---

## 4. Open questions for the client

These block specific Phase 1 / 2 / 3 edits. Asked in priority order.

1. Are you a registered Salesforce Partner? (gates partner badge slot)
2. Which Salesforce certifications does the team hold? (gates cert badges)
3. Do you have an AppExchange consultant listing? Link?
4. Do you have written permission from any prior clients to use their logo / write a case
   study about the engagement?
5. Founder/principal name + role + headshot + 2-paragraph bio + LinkedIn URL
6. Is `team@northstriderconsulting.com` the correct destination for contact-form
   submissions? Or a different inbox/alias?
7. Is there a domain registrar/DNS account we have access to, or do we need to send the
   client DNS records to add themselves?
8. Are they OK with cookieless analytics (Plausible, ~$9/mo) or do they want GA4 (free)?
9. Privacy policy: do they have an existing one we should reuse, or write a minimal one?
10. Vertical / industry focus — even a tentative answer here unlocks much stronger copy
    in Phase 3

---

## 5. Launch checklist (D-day)

A separate, concrete sequence to run on the day of launch. Everything else above should
already be done by this point.

- [ ] Production deployment of latest `main` is green on Vercel
- [ ] Custom domain points to production deployment, HTTPS green
- [ ] All env vars set on Vercel (Production)
- [ ] Submit a real test form from a non-Resend-account email; confirm email arrives at
      the configured inbox within 1 minute
- [ ] Click every link in primary nav and footer — no 404s
- [ ] Lighthouse run on `/`, `/services`, `/contact` — Performance ≥ 90, Accessibility ≥ 95,
      Best Practices ≥ 95, SEO ≥ 95
- [ ] Page loads without console errors in Safari, Chrome, mobile Safari
- [ ] Sitemap XML loads at `/sitemap-index.xml`
- [ ] OG preview renders correctly (paste production URL into Slack / iMessage / Twitter)
- [ ] Hand off Vercel + Resend + analytics access to client (or document the credentials in
      whatever credential vault we agreed on)

---

## 6. Hand-off / maintenance

After launch the practical maintenance shape is:

- **Editing copy:** edit `.astro` files in `src/components/` and `src/pages/`, push to GitHub,
  Vercel auto-deploys.
- **Adding a case study:** drop a new `.mdx` file into `src/content/case-studies/`. The
  homepage tease and case studies index pick it up automatically.
- **Toggling Industries page back on:** add the entry back to the `nav` array in
  `src/components/Header.astro`.
- **Rotating Resend keys:** update `RESEND_API_KEY` in Vercel env vars and redeploy.

If the client wants to edit copy themselves (without touching code), Phase 3 could include
adding a CMS layer (Sanity, Contentlayer, or just MDX with a hosted Git editor like
TinaCMS). Not in scope for the 1–2 week launch.
