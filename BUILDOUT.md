# Peregrine Systems — Buildout Plan

> **Goal:** Ship a positioned site reflecting confirmed client direction. Skeleton phase
> complete and rebranded (formerly Northstrider, renamed 2026-05-06); copy and structural
> work now drive toward launch.
>
> **Status:** Astro + Tailwind v4 + MDX + Vercel adapter. Light theme, peregrine branding,
> all primary pages and a working `/api/contact` endpoint backed by Resend.
>
> **Operating plan:** Sections 1–6 below capture the original generic-launch plan from
> the skeleton phase. **Section 7 captures client direction from the 2026-05-06
> conversation and supersedes earlier sections where they conflict** — notably audience
> widening, service taxonomy, and the addition of System Mapping as a flagship offering.

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
  - [ ] Point `[brand-domain.tld]` and `www.` at Vercel (A/CNAME records per Vercel docs) — domain TBD between `peregrinesystems.io` and `peregrinesys.com`
  - [ ] Confirm `https://` enforced and www → apex (or apex → www) redirect set in Vercel
  - [ ] Verify production deployment loads at the real domain
- [ ] **Email (Resend)**
  - [ ] Add `[brand-domain.tld]` as a domain in Resend
  - [ ] Add the SPF/DKIM/DMARC DNS records the Resend dashboard provides
  - [ ] Wait for verification (usually <1 hour after DNS propagates)
  - [ ] Set `CONTACT_FROM_EMAIL` env var to `Peregrine Systems <hello@[brand-domain.tld]>`
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
  - [x] Client provided peregrine logo + favicon (2026-05-06) — installed at
        `public/logo.svg` and `public/favicon.svg`

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
6. Is `hello@[brand-domain.tld]` the correct destination for contact-form
   submissions? Or a different inbox/alias? (Domain itself still TBD.)
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

---

## 7. Client direction — May 6 conversation

Captured from a working session with the client on 2026-05-06. These items supersede the
generic-launch assumptions in Sections 1–3 where they conflict — notably audience widening,
service taxonomy, the removal of the case-studies surface, and the addition of System
Mapping as a flagship offering.

### Strategic shifts

- **Audience.** Site speaks to teams of every size — small to enterprise. The original
  "growing teams" / "small and mid-sized teams" framing is retired across all copy.
- **Two public-facing pillars** for what the firm sells, used as section eyebrows and
  headers across the site:
  - **True Consulting** — reduce rework by challenging requirements and building
    scalable, expandable solutions. Anti-pattern: literal implementation of the
    customer's first ask without questioning whether it's the right ask.
  - **Usable Knowledge** — visual end-to-end maps of the business process with the
    underlying automation overlaid. Standard documentation is siloed; one flow chart
    that combines process and automation lets stakeholders see the whole picture and
    make decisions on it.
- **Wedge against large SIs.** "Large doesn't mean responsive; generalist doesn't mean
  qualified for your specifics." Calls don't get returned, and big-firm seniors rarely
  know the answer to your specific question. Worth a copy block on About or homepage,
  framed without naming competitors.

### Phase A — Copy corrections (small, immediate edits) — *done 2026-05-06*

- [x] **Audience phrasing** — "small and mid-sized teams" / "growing teams" replaced
      with "teams from small to enterprise" across `Hero.astro`, `BaseLayout.astro`,
      `Footer.astro`, `about.astro`, `index.astro`, and the `ServicesGrid` intro.
      Default phrase pending client sign-off (open input #1).
- [x] **Rename service** — `Admin-as-a-Service` → `Managed Services` in
      `ServicesGrid.astro`, `services.astro`, `Footer.astro` Services nav,
      `BaseLayout.astro` default title, and `services.astro` page description.
      `#managed` anchor preserved.
- [x] **Drop bullets** — `ServicesGrid` Optimization bullets are now
      "Org health audit / Technical debt remediation / Architecture refactor".
      `services.astro` Optimization deliverables trimmed: dropped Flow line, dropped
      Reports refresh line, removed "reports" from the audit parenthetical, added
      "Architecture refactor and technical debt remediation" to round out.
- [x] **Removed Salesforce Partner badge slot** from `Footer.astro` (placeholder
      and TODO comment both deleted).
- [ ] **"Trusted by" → "Prior work with"** — deferred to Phase D when LogoStrip
      returns to the homepage. Component still hidden in v1.
- [x] **Dropped Training & Enablement** — tile removed from `ServicesGrid` defaults,
      section removed from `services.astro`, link removed from `Footer.astro` Services
      nav, "training" removed from `BaseLayout` and `services.astro` descriptions.
      `services.astro` PageHeader updated from "Four engagement shapes" to "Three".
- [x] **Removed the Case Studies surface entirely:**
  - [x] Deleted `src/pages/case-studies/index.astro`
  - [x] Deleted `src/pages/case-studies/[...slug].astro`
  - [x] Deleted `src/content/case-studies/sample-placeholder.mdx`
  - [x] Deleted `src/content.config.ts` (no remaining collections; `astro:content`
        `z` re-export still works for the contact-form route)
  - [x] Deleted `src/components/CaseStudyTease.astro`
  - [x] "Case Studies" removed from `Header.astro` nav and `Footer.astro` Company nav
  - [x] `index.astro` no longer imports or renders `<CaseStudyTease />`
- [x] **Kept "Outcomes over hours"** principle in `PrinciplesBand.astro` — confirmed
      present, untouched.

Build passes; 5 prerendered routes remain (`/`, `/about`, `/services`, `/industries`,
`/contact`) plus the `/api/contact` serverless function.

### Phase B — Mission & positioning rewrite (medium edits)

Restructure About around the client-provided What/How/Why. Surface the two pillars on
the homepage.

- [ ] **About page** — restructure into three blocks (What we do / How we do it /
      Why we do it) anchored on the client's mission statement, leading with True
      Consulting and Usable Knowledge as the two named pillars.
- [ ] **Homepage pillars callout** — short band introducing True Consulting and
      Usable Knowledge between `ServicesGrid` and CTA. Eyebrow + heading + 2–3
      sentences each, each linking to its respective treatment (About for True
      Consulting, `/system-mapping` for Usable Knowledge).
- [ ] **Wedge-against-large-SIs block** — short copy block on About (or homepage),
      framed without naming competitors. Sets up the size-of-firm question on our
      terms instead of the prospect's.

### Phase C — System Mapping treatment (the major unique value-add)

Three surfaces, per client's emphasis. If the homepage feels heavy after all three
land, the homepage callout is the first thing to scale back — the dedicated page and
service tile carry the offering on their own.

- [ ] **Service tile** in `ServicesGrid.astro` — fourth tile alongside Implementation,
      Optimization, Managed Services. Final four tiles tell a story: build new orgs
      (Implementation) · fix existing orgs (Optimization) · run them with you
      (Managed Services) · make them legible the whole time (System Mapping).
- [ ] **Dedicated page** at `/system-mapping`. Sections:
  - *What it is* — visual end-to-end business-process map with automation overlay.
  - *Why it matters* — interception points for new features (grooming tickets),
    prevents the "we asked for the wrong thing" failure mode, gives developers a
    place to suggest improvements proactively.
  - *How we deliver it* — Mermaid / flow-chart artifacts maintained alongside the
    org as it evolves; not a one-time deliverable, an ongoing source of truth.
  - *What you get* — artifact list (the diagram itself, the change log, integration
    with our Managed Services workflow).
- [ ] **Homepage callout** — short band linking to the dedicated page. Pairs
      naturally with the True Consulting / Usable Knowledge pillar block in Phase B.

### Phase D — Tech surface + credibility (data-dependent)

- [ ] **AgentForce** — surface in Implementation and Managed Services bullets;
      employee with current hands-on experience.
- [ ] **CPQ** — surface in Implementation; explicit "uncommon skillset" framing.
- [ ] **CI/CD** — short callout (paragraph or sub-section) on Services or System
      Mapping. CI/CD is a meaningful differentiator in this space — most Salesforce
      shops still ship via change sets — so it earns real estate, not a footnote.
      Name **Gearset** (broad applicability), **Copado** (enterprise-graded),
      **Prodly** (CPQ deployments — client confirmed this is in scope), and
      **Salesforce DX + GitHub Actions** (engineering depth, ties to GitHub on the
      "prior work with" line).
- [ ] **Org Health Audit framing** — keep mentioning, treated as a formal,
      semi-quantitative deliverable rather than ad-hoc activity. Capability the team
      is building toward; copy can be aspirational without overclaiming.
- [ ] **LogoStrip — names-only revival.** Re-import on homepage. Replace the
      placeholder text wordmarks with `Prior work with teams at GitHub, Komatsu,
      Splunk, [more]`. **No logo artwork** — written permission is not in hand;
      names-in-prose is the legally-clean treatment.
- [ ] **CertificationsStrip — needs data.** Goal copy: "40+ Salesforce certifications
      across the team." Surface lead names on About once confirmed (e.g.,
      Karlton Knight, PMP). Awaiting employee list from client → LinkedIn cert scrape.

### Open inputs needed from client

These block specific Phase B/C/D execution.

1. Confirmed audience copy line — "teams of every size" or alternative phrasing the
   client prefers. (Affects Hero, About, Footer, BaseLayout description.)
2. Mission-statement copy proofed by client — they wrote a draft; we'll tighten and
   ship, but they should sign off on the final wording before it lands publicly.
3. **System Mapping example artifact** — a real or sanitized Mermaid / flow chart
   we can render on the dedicated `/system-mapping` page. Without one, the page is
   abstract; with one, it sells the offering on its own.
4. **Employee list** — for the LinkedIn cert scrape and lead-name surfacing on About.
5. Confirmation that **GitHub, Komatsu, Splunk** are accurate "prior work with"
   relationships (firm- or employee-level), and any others to add.
6. Domain decision — `peregrinesystems.io` vs `peregrinesys.com`. Gates Phase 2
   DNS + Resend domain verification.
