# Build notes for the Strain Systems team

Internal notes for the operator. `VERIFY.md` is the client-facing list and can be emailed as is; this file is not for the client.

## How this build differs from the kit

- **Hosting is Vercel**, not Cloudflare Pages. The kit's Cloudflare steps were skipped: there is no `public/_headers`. `vercel.json` (output directory `public`, no build) already sends `X-Robots-Tag: noindex` on every `*.vercel.app` address, so previews stay out of Google.
- **robots.txt allows crawling** (plus GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Google-Extended, Bingbot, Googlebot) and points to the sitemap. The kit's "disallow all until launch" was a Cloudflare preview safeguard; on Vercel the host-scoped noindex header does that job, and robots.txt is already right for go-live.
- **Accounting firm, not a law firm** (from `ADDONS.md`): Services instead of practice areas, AccountingService schema, no attorney advertising line, footer disclaimer says general information only, not tax, legal, accounting or investment advice.
- **No town pages.** The client gave no towns ("we have clients around the country and globe."). The site says San Jose based, clients across the US and internationally, remote or in person.
- **8 service pages**, one per service on the form, as the add-ons require (the brief's 5-page cap was overridden).
- **Domain set to `www.tbacct.com`**, so every canonical, Open Graph URL and the sitemap already use `https://www.tbacct.com/`. The live WordPress site is still on that domain until go-live.
- **No placeholders or [VERIFY] markers on the pages** (MASTER-PROMPT section 5 wins over the brief here). Gaps are written neutrally on the page and listed in `VERIFY.md`. `node tools/check.mjs --missing` therefore reports nothing.

## Pages (21)

`/`, `/services/`, 8 service pages under `/services/`, `/service-areas/` plus 5 city pages (San Jose, Santa Clara, Sunnyvale, Milpitas, Campbell), `/about/`, `/contact/`, `/privacy/`, `/terms/`, and `404.html` (noindex). The Fees page was removed in revision 2; `/fees` and `/fees/` redirect to `/contact/` in `vercel.json`. Every page has a `#contact` section with the GoHighLevel form, the final call band, and the chat widget once before `</body>`.

## Integrations (in `site.json`, used character for character)

- **Form:** the Standard inline embed from `ADDONS.md`, inline in a `#contact` section on every page. Never a sidebar, popup or overlay. Its script loads once per page (one form per page). The form itself shows Full Name, Phone, "Short message about your needs" and a SEND TEXT button. Check that the GHL form has the A2P text-consent wording that matches the privacy policy and the note under the form.
- **Chat:** the LeadConnector loader script, once per page before `</body>`.
- **Review link:** no CRM review link was supplied. `integrations.review_link` is set to the Google Business Profile share link from the CSV (`https://share.google/0ApDcWpbmTD308oNJ`). Swap in the real review link when it exists: it appears in the footer only.

## Things to check on a real phone

- **Round buttons vs the chat bubble.** Our call and contact buttons are 56px, 20px from the bottom (`--fab` and `--fab-bottom` in `public/assets/site.css`). The GoHighLevel bubble could not be loaded in the build sandbox. If it is a different size or height, change those 2 variables so the 3 buttons line up.
- **Contact us landing.** Buttons scroll so the form sits centered between the header and the round buttons. On a short phone with browser bars showing (for example an iPhone 13 at 664px tall), the 543px form cannot fit with the header and buttons, so it lands with its top just under the header and about 40px under the round buttons. On taller phones it lands fully centered.
- **Opening animation.** Logo reveal in brand colours, about 2.4 seconds, skippable by click, tap, scroll or any key, never shown with reduced motion or without JavaScript. It plays on the first page of each visit (per browser tab session), not on every click between pages. To play it on every page load, delete the `sessionStorage` lines in `public/assets/intro.js`.

## Redirects for the old WordPress URLs (in `vercel.json`)

`/contact-us/` to `/contact/`; `/blogs/` and `/category/...` to `/services/`; `/sample-page/` to `/`; the 3 blog posts to the Bookkeeping & Accounting or Tax Services pages. The blog posts themselves were not carried over (the brief says no blog).

## Design system

- Colours (sampled from `logo-mark.png`, not client-supplied): blue `#005E94` (buttons, links, icons), gold `#CC9933` (rules, accents, button fill on navy, never text on white), navy `#0A2B44` (dark bands), tint `#F6F3EC`, gold text `#8A6214` for small labels on light backgrounds. All text pairs meet 4.5:1.
- Fonts self-hosted in `public/assets/fonts/`: Source Serif 4 600 (headings), Inter variable (body), Montserrat capitals subset (wordmark only).
- The header marks the current page with JavaScript (`aria-current`), because the header HTML must be identical on every page.

## Files made in this build

- `public/images/logo/logo-icon.png`: `logo-mark.png` trimmed to its edges and scaled to 320px. Same artwork, not redrawn or recoloured.
- `public/favicon.png` (512), `public/favicon-32.png`, `public/apple-touch-icon.png` (180, on white), `public/og-image.png` (1200x630).
- WebP copies of every photo at 800, 1280 and 1920px wide, plus an 800px JPG, used through `<picture>` and `srcset`.

## Checks run

- `node tools/check.mjs`: 15 pages, 0 to fix, 0 to know about (after revision 2).
- Browser checks (Playwright, phone and desktop): no broken internal links or image paths, no sideways scrolling on a phone, no skipped heading levels, no duplicate ids, a single form iframe per page, menu and dropdown work by keyboard, Contact us buttons land on the form, the intro plays once and skips correctly, and nothing shows with reduced motion.
- Search of `public/` for demo, lorem, placeholder, VERIFY, TODO, expert, specialist, guarantee and long dashes: the only "expert" hits are the service name Expert Witness Services and its address.

## Revision 2 (client feedback, November 2026)

- **Headline.** Home H1 is exactly `Clear books.<br>Clearer decisions.` at `--fs-h1` (about 40px on a phone, 68px on desktop), Source Serif 4 700 (self-hosted, `sourceserif4-700-latin.woff2`), letter-spacing -0.03em, line-height 1.05. Other pages use `--fs-h1-inner` (36 to 56px) at the same weight. The factual lede stays: 2 sentences under the headline, the rest after the buttons. On a phone the order is eyebrow, headline, short lede, photo, buttons, then the rest.
- **No pricing anywhere.** The Fees page, its nav, mobile menu and footer links, the home "How our fees work" link, the cost FAQs (home, Financial Investigations, Expert Witness Services, including their FAQPage JSON-LD), the Bookkeeping fees callout (now a free-consultation note) and the 404 fees link are gone. Step 4 on the home page is now "You get a clear scope". The only remaining fee words are a trust's own "taxes and fees" and "trustee fees" in the trust accounting checklist, which describe the client's trust, not our charges.
- **Spacing.** Proof strip items are 2 balanced lines each. Pain points are a 2 by 3 grid under a short intro, with the link after the list. The "why" row has the pull-quote and buttons on the left and 4 points in a 2 by 2 grid. The Robert card fills its row. The final call band has a matching action card. Short-heading rows on service pages were restacked (heading on top, statement and text side by side). Services hero facts sit in a tinted panel; "other support" and "industries" are single-column with pills.
- **Contact and chat.** The form embed and chat snippet are unchanged. The form disclaimer moved to the left column, away from the chat bubble corner, and the contact section has extra bottom room. On phones the round call and contact buttons fade out while the form is on screen and come back after. Contact buttons centre the form above the chat button zone (92px on phones, 100px on desktop).
- **Gold accent.** The hero image accent is now an offset gold frame with the same corner radius.

### Photos (resolved in revision 3)

Revision 2 could not download Higgsfield results. In revision 3 the operator approved `d8j0ntlcm91z4.cloudfront.net` and downloads worked, so all photos were replaced (below).

## Revision 3 (agency owner review, November 2026)

- **Photos.** All 9 first-build photo sets were deleted. 17 new Higgsfield photos (GPT Image 2.6, high, 2K, 16:9) were generated, each inspected for hands, faces, screens, charts, readable text, a glossy look, snow and big-city skylines, and all 17 passed first time. **Each photo is used on one page only**: `node tools/image-dupes.mjs public` (new, from the brief) checks it and prints OK. Page-to-photo map is in `public/images/README.md` and `site.json`. Alt text starts "Illustrative photo:". Note: the brief's grep for old filenames (`fractional-cfo\.`) also matches the new `svc-fractional-cfo.jpg` named in the brief; no old file remains.
- **No photos on cards.** Home and `/services/` service cards are icon cards. `/services/` has its own hero photo. The extra photo copies in the Bookkeeping cleanup section and the Financial Investigations tracing section are gone (3 icon cards and a 3 by 2 steps grid instead).
- **Service area pages.** `/service-areas/` and 5 city pages, each with 600 or more words of page-specific copy, the sections in the order the brief set, 4 FAQs (FAQPage JSON-LD), BreadcrumbList JSON-LD and an AccountingService block whose `areaServed` is that city. Sitewide JSON-LD now lists the 5 cities and Santa Clara County. "Service Areas" sits after Services in the main and mobile menus (fits on one row from 1100px; below that the hamburger menu shows), and the footer has a "Service areas" column. Linked from the home "Do you have to be in San Jose" section and from `/contact/`.
- **Kit checker change.** `tools/check.mjs` failed any page containing the word "breadcrumb", which blocked the required BreadcrumbList JSON-LD. It now ignores JSON-LD and still fails a visible breadcrumb.
- **Phone hero.** The round call and contact buttons stay hidden until the visitor scrolls past the hero (and while the form is on screen), so both hero buttons are clear at 390x844. On the home page the phone order is now headline, short lede, both buttons, then the photo (still fully inside the first screen at 390x844).
- **Spacing.** Sections are 96px on desktop and 56px on phones. No two same-colour bands touch on any page (checked in the browser). On phones, long lists are compacted: icon cards go horizontal, steps become numbered rows, and the home service lists become 2-column tiles (icon and linked title; the one-line summaries show on desktop and on each service page). A few repeats of nearby copy are hidden on phones only. The mobile home page went from 16,256px to about 11,430px.
- **H1s** are sentence case everywhere ("Expert witness services in San Jose").

## Revision 3b (chat bubble clearance, November 2026)

The chat widget's open welcome bubble covered hero copy on phones on 13 pages. Fixed the same way as the Wilkerson Consulting site, without touching the widget snippet, its welcome message or the form embed:

- **One hero layout on every page** (`hero_block`, classes `hero2-*` in `site.css`). Phone: eyebrow, headline, the first sentence of the lede, photo and both buttons (side by side) fill the first screen above a band of `--chat-zone` (210px) kept clear at the bottom for the bubble and the round buttons. The rest of the lede, the proof line and any side card (About owner card, Contact cards, 404 links) follow below that band. Desktop: copy on the left, photo or side card on the right, top-aligned. The photo stops `--chat-zone` (190px) plus 40px above the bottom of the screen, and the hero reaches the bottom of the first screen, so the bottom-right corner only ever shows hero background. Privacy and Terms have text-only heroes centred in the first screen above the band. The 3 image-left heroes (Controller, Trust, Expert witness) are now text-left like the rest, so no copy sits in the bubble's corner.
- **Contact us** centres the form in the space above the bubble corner (150px kept clear on phones, 190px on desktop), and the contact section has 56px more room below the form on phones.
- **Checked** at first load on all 21 pages: nothing in the bottom 210px at 390x844, and nothing in the bottom-right 420x190px at 1440x900. The same check, run on the previous commit, flags the pages that were reported.
- If a hero headline or lede is made longer, check that both hero buttons still end above the bottom 210px at 390x844.

## Service Areas dropdown (November 2026)

"Service Areas" in the main menu is now a dropdown like Services: the 5 city pages and "All service areas" (desktop: opens on hover, on keyboard focus or with the arrow button, Escape closes it; phone menu: expandable list). The menu still fits on one row from 1100px. A dropdown's top item is underlined only when you are on one of its own pages.
