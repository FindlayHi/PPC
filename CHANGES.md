# Port Credit Cleaning — Pre-Launch Change Document

Site: currently at portcreditcleaners.findlayhilchie.workers.dev
Production domain: portcreditcleaning.ca (Cloudflare, custom domain on this project)

Replace placeholder tokens before or during implementation:
- `{{PHONE}}` = real VoIP.ms number in +1XXXXXXXXXX format
- `{{PHONE_DISPLAY}}` = formatted display version, e.g. (905) XXX-XXXX

---

## 1. Brand & domain alignment

- [ ] Rename brand sitewide from **"Port Credit Cleaners"** to **"Port Credit Cleaning"** to match the domain. Applies to: header logo/wordmark, page titles, meta og:site_name, og:title, footer, copyright line, schema/structured data if present, and any body copy.
- [ ] Change canonical URL from `https://www.portcreditcleaning.com/` to `https://portcreditcleaning.ca/` on all pages (no www unless DNS is configured for it — pick one and be consistent).
- [ ] Update all og:url values to the .ca equivalents.
- [ ] Update email address everywhere from `hello@portcreditcleaning.com` to `hello@portcreditcleaning.ca` (contact section, footer, mailto links).

## 2. Phone number

- [ ] Replace `(905) 555-0199` / `+19055550199` with `{{PHONE}}` in ALL locations. Known instances (verify none are missed with a global search for `555-0199` and `5550199`):
  - Header call link (desktop + mobile)
  - Hero "Text Us" SMS link (`sms:`)
  - Quote section "Call or text"
  - Footer contact list
  - Sticky/bottom mobile call bar
  - meta-description and og:description (both mention the number)

## 3. Truthfulness edits (required before launch)

- [ ] Change "200+ local homes" and "200+ cleans" to **"100+"** wherever they appear (hero trust bar, testimonials header).
- [ ] Reattribute the experience claim: "8 yrs cleaning homes locally" → **"Your cleaner brings 8 years of professional experience"** (or equivalent phrasing that attaches the claim to the cleaner, not the business).
- [ ] **Remove the "Fully insured & vetted" claim** from the hero trust bar. Do not replace with a softer insurance claim — remove entirely. (Will be reinstated post-validation once a policy is purchased.)
- [ ] **Remove the Findlay H. testimonial** entirely. Replace with a real third-party client quote (to be supplied) or reduce testimonial count to two.
- [ ] Edit the David T. testimonial (and any other quote) to **remove Sof's name**. Rewrite minimally, e.g. "Booked a deep clean before guests arrived and was blown away…" already works without a name — just ensure no first names of cleaners appear anywhere in quotes.

## 4. Depersonalization / team-accurate copy

Goal: keep a human, trust-forward tone without naming or picturing any individual cleaner, and stop promising a single cleaner (there will be 2+ cleaners plus overflow routing).

- [ ] "The same trusted cleaner every visit" → **"A consistent, dedicated cleaner for your home"**
- [ ] "Owner-operated. You deal directly with the person doing the work." → **"A small, local, owner-operated team — no call centers, no rotating franchise crews."**
- [ ] "A cleaner who actually knows your home" section heading is fine to keep; review body copy under it for any remaining single-person promises.
- [ ] "Run by your neighbours in Port Credit — not a faceless franchise." — keep as is.
- [ ] Do not add any founder story, cleaner names, or cleaner photos. Imagery should be finished rooms / work results only.

## 5. Intro offer

- [ ] Add an introductory-rate element as the trust-bar replacement for the removed insurance line and/or near the quote form CTA. Suggested copy: **"Introductory rates for our first Port Credit clients"**. Keep it as a claim, not a coupon code — no fixed discount percentage baked into the page.

## 6. Privacy policy & lead-sharing disclosure (required — PIPEDA)

- [ ] Create a `/privacy/` page. Plain-language policy covering: what the quote form collects (name, phone, email, address, home details), that submissions are used to provide quotes and schedule service, that **requests may be shared with a vetted local cleaning partner to fulfill the service**, retention, and a contact email for questions (hello@portcreditcleaning.ca). No analytics/cookie claims beyond what the site actually uses — check what's actually loaded and describe only that.
- [ ] Link the privacy policy in the footer.
- [ ] Add a single disclosure line directly under the quote form submit button: **"Your request may be handled by one of our vetted local cleaning partners. See our privacy policy."** (link the last two words).

## 7. Cleanup

- [ ] Remove the dead "Google Business Profile" footer link (currently `#`). Reinstate later when GBP is live.
- [ ] Remove the three empty social icon placeholders in the footer (`#` links).
- [ ] Verify the map embed still targets Port Credit and renders on the .ca domain.
- [ ] After brand rename, verify page `<title>` and meta description still read naturally and are under ~60 / ~155 chars respectively. Suggested:
  - Title: `House Cleaning in Port Credit | Port Credit Cleaning`
  - Meta description: `Locally-owned house & condo cleaning in Port Credit and South Mississauga. Recurring, deep, move-in/out, condo & Airbnb. Get a free quote or call {{PHONE_DISPLAY}}.`

## 8. Acceptance checks (run after all edits)

- [ ] Global grep: `555-0199`, `5550199` → zero results
- [ ] Global grep: `Cleaners` → zero results in brand/wordmark contexts (allowed only in generic copy if it reads naturally, e.g. none expected)
- [ ] Global grep: `.com` → zero results for portcreditcleaning.com
- [ ] Global grep: `insured` → zero results
- [ ] Global grep: `Sof`, `Findlay` → zero results in rendered pages
- [ ] Global grep: `200+` → zero results
- [ ] All internal links resolve on the .ca domain; canonical and og:url match the .ca on every page including /services/* subpages, /about/, /contact/
- [ ] Quote form: submits successfully, disclosure line visible, privacy link works
- [ ] Mobile: sticky call bar uses new number; SMS link opens with new number

## Out of scope for this pass
- Google Business Profile setup (done separately, in the owner's Google account)
- Facebook page / ads
- Insurance claims reinstatement (post-validation)
- Any redesign — copy and metadata edits only
