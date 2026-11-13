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

## Pages (16)

`/`, `/services/`, 8 service pages under `/services/`, `/about/`, `/fees/`, `/contact/`, `/privacy/`, `/terms/`, and `404.html` (noindex). Every page has a `#contact` section with the GoHighLevel form, the final call band, and the chat widget once before `</body>`.

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

- `node tools/check.mjs`: 16 pages, 0 to fix, 0 to know about.
- Browser checks (Playwright, phone and desktop): no broken internal links or image paths, no sideways scrolling on a phone, no skipped heading levels, no duplicate ids, a single form iframe per page, menu and dropdown work by keyboard, Contact us buttons land on the form, the intro plays once and skips correctly, and nothing shows with reduced motion.
- Search of `public/` for demo, lorem, placeholder, VERIFY, TODO, expert, specialist, guarantee and long dashes: the only "expert" hits are the service name Expert Witness Services and its address.
