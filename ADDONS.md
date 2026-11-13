# Add-ons for this build (read after MASTER-PROMPT.md; these win where they differ)

## 0. This client is a Strain Systems accountant / bookkeeping firm, not a law firm
TB Accounting Services (legal name TB Accounting Services, LLC) is an accounting
and bookkeeping services business built by Strain Systems. Wherever MASTER-PROMPT.md or BRIEF.md says attorney,
law firm, practice areas or legal, read it for this firm instead:
- "Practice areas" become **Services** (`/services/` overview + one page per service from the list below).
- The owner, Robert Carrillo, is the business owner, not an attorney. No "Attorney advertising"
  line, no bar admissions, no LegalService/Attorney schema (use AccountingService / LocalBusiness).
- Keep the honesty rules: no invented credentials (never "CPA", "certified", "licensed", "expert"
  unless the CSV or the current site states it), no guaranteed savings or refunds, no fake reviews,
  results or years in business. Footer disclaimer: general information only, not tax, legal or
  investment advice.
  - The service name **Expert Witness Services** may be used as a service title because it is in the
    onboarding form. Do not turn that into a personal "expert" or credential claim.
- Areas served: the CSV says "we have clients around the country and globe." with primary city
  "San Jose, Ca". Present the firm as serving clients nationwide and internationally, based in
  San Jose, California, and also able to work remotely or in person when needed (the current site
  already says this). Do **not** build an "Areas we serve" set of town pages — no towns were given.
  Say so in VERIFY.md.
- Domain: use **www.tbacct.com**. The "Existing Website URL" field on the form is blank, but
  https://www.tbacct.com is a live WordPress site. Treat that as the current site.
- Owner first name in any name placeholder: **Robert**.

### Services (one page each, plus a /services/ overview)
Use these names (title-cased from the CSV; keep the wording, only normalize capitalization):
1. Bookkeeping & Accounting
2. Controller Services
3. Fractional CFO
4. Tax Services
5. Forensic Accounting
6. Trust Accounting
7. Financial Investigations
8. Expert Witness Services

Do not invent extra service pages. The current site also describes "Outsourced Services" aimed at
construction / project-based work (WIP reporting, progress billing, certified payroll, job costing).
That is **not** in the onboarding services list. Do not add a separate service page for it unless
Akash or the client confirms; mention it only in VERIFY.md.

### Facts to verify (also put in VERIFY.md; do not invent a resolution)
- The form note says "we have a subsidiary for our tax division." Do **not** invent the
  subsidiary's name, brand, or a separate site. A short, factual line is enough only if the
  current site already names it; otherwise leave it out of public copy and flag it to verify.
- Address on the form and current site: 66 E Santa Clara St, Ste 7, San Jose, CA 95113. This
  matches the current Google Business listing used for the review link. Some older third-party
  directories still show 18 S Second St Ste 128, San Jose, CA 95113, with the same phone and
  website. Use the Santa Clara Street address unless told otherwise, and flag the mismatch.
- Website phone is 408-898-1701. The internal notification / cell number is 831-888-7823.
  Use only 408-898-1701 on the public site. The LinkedIn company about text currently publishes
  the cell as a "call me" number — do not copy that onto the new site.
- Brand colors and fonts were not provided (the colors field reads "i know know the colors",
  almost certainly "I don't know the colors"). The current logo mark uses blue and gold; if you
  take colors from the logo, list the sampled hex values in VERIFY.md as observed, not client-supplied.
- The current site's testimonials (David Thompson, Sarah Williams, Frank Miller) look generic.
  Do not copy testimonials, review counts, years in business, or staff photos from the current
  site unless they can be verified. The media library also contains leftover theme assets
  (cleaning-company stock photos and other businesses' logos) — do not reuse those.
- Do not invent CPA status. Some directories label the firm as a CPA; the onboarding form and
  the current site home page do not state it.

## 1. Opening animation
Show a short, elegant intro animation every time someone opens the website (logo/wordmark reveal
in the brand colours, about 1.5 to 2.5 seconds, then it fades away to the page). It must not block
the page if JavaScript fails, must be skippable by click/tap or keypress, and must be skipped
entirely when the visitor has prefers-reduced-motion set.

## 2. Logo
The client said the logo format is SVG / AI / EPS and pointed to a Google Drive assets folder,
but those originals could not be downloaded on this pass (the folder requires Google sign-in).
Until those files are available, use the best logo from the current site, already saved in this
build package under `public/images/` (and in the images zip, `logo/`):
- `logo/logo-mark.png` — official icon (blue open book + gold bars), 2001×1709 transparent PNG.
  Use this as the primary mark (navbar, favicon, opening animation). Pair it with a typographic
  wordmark reading "TB Accounting Services".
- `logo/logo-lockup-wide.png` — high-res transparent lockup that also includes the website,
  phone, and taglines. Do **not** use the full lockup in the navbar (too wide, and it hard-codes
  the phone and taglines). It is a reference for the icon and wordmark style only.
- `logo/logo-header-current.png` — the lower-res color lockup used in the current header; fallback
  reference only.

Only if no usable logo file is present, fall back to a typographic wordmark and note it in VERIFY.md.

## 3. Home button in the navbar
Add a "Home" link as the first item in the main menu (desktop and mobile) on every page.

## 4. Images
Images generated with Higgsfield for this site are in `public/images/` (see `public/images/README.md`
for what each one shows). Use them across the site where they fit. They are illustrative photos,
never present them as the real owner, staff, office or clients.

## 5. GoHighLevel embeds (use these exactly as given)
### Website contact form embed (Standard / inline, in a #contact section; never a sidebar overlay)
```html
<iframe
    src="https://api.leadconnectorhq.com/widget/form/B6mbkrbmNfkfvPxD8iLj"
    style="width:100%;height:100%;border:none;border-radius:10px"
    id="inline-B6mbkrbmNfkfvPxD8iLj"
    data-layout="{'id':'INLINE'}"
    data-trigger-type="alwaysShow"
    data-trigger-value=""
    data-activation-type="alwaysActivated"
    data-activation-value=""
    data-deactivation-type="neverDeactivate"
    data-deactivation-value=""
    data-form-name="Website Form (TB Accounting Services)"
    data-height="543"
    data-layout-iframe-id="inline-B6mbkrbmNfkfvPxD8iLj"
    data-form-id="B6mbkrbmNfkfvPxD8iLj"
    data-cookie-consent="true"
    data-cookie-consent-provider="auto"
    title="Website Form (TB Accounting Services)"
        >
</iframe>
<script src="https://link.msgsndr.com/js/form_embed.js"></script>
```

Contact / "get in touch" buttons must scroll to `#contact` on the same page (or go to `/contact/#contact`).
Do not use a sticky sidebar, popup or overlay layout. Reference layout:
https://www.infiniteaccountingservices.com/services/bespoke-services/#contact

### Chat widget embed (load once per page, before </body>, instead of the built-in chat)
```html
<script src="https://widgets.leadconnectorhq.com/loader.js" data-resources-url="https://widgets.leadconnectorhq.com/chat-widget/loader.js" data-widget-id="6af78677f31f8c02e6a53de4"></script>
```
