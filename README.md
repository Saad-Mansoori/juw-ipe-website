# JUW IPE Website — Complete Documentation

Static website for **Jinnah University for Women — Institute for Professional Excellence (IPE)** / JUW Continuing Education.

**Live:** https://shortcourses.juw.edu.pk  
**Local path:** `C:\Users\PC\Desktop\IPE web`  
**Last updated:** 24 September 2026

---

## Pages

| File | Purpose |
|------|---------|
| `index.html` | Homepage — hero, programs grid, filters, admission form |
| `about-ipe.html` | About IPE |
| `course-detail.html` | Course details via `?course=slug` + brochure download |
| `internship-application.html` | Internship Google Form embed |
| `README.md` | This documentation |

---

## Project Structure

```
IPE web/
├── index.html
├── about-ipe.html
├── course-detail.html
├── internship-application.html
├── images-juw/                 # ALL images (production folder name)
│   ├── img-01.jpg … img-04.jpg     # hero slideshow slides
│   ├── img-05.png                  # header/navbar badge logo
│   ├── img-06.jpg … img-12.jpg     # program card banners
│   ├── img-13.jpg                  # Applied Quality Control brochure
│   ├── img-15.png                  # SME LaunchPad brochure
│   ├── img-16.png                  # Lead Implementor brochure
│   ├── Canvas Painting Workshop Flyer.png
│   ├── Basic Crocheting.png
│   ├── Block Printing Workshop Flyer.jpg
│   ├── Organic Soap Making Flyer.png
│   ├── Serum MAking Workshop Flyer.png
│   ├── diploma-animation-basic-card.jpg       # Diploma card banner
│   ├── diploma-animation-advance-card.jpg     # Diploma card banner
│   ├── diploma-animation-basic-brochure.png   # Diploma brochure (download)
│   └── diploma-animation-advance-brochure.png # Diploma brochure (download)
└── README.md
```

> **Important:** Local folder is named `images-juw` (not `images`). All HTML paths use `images-juw/...`.

---

## Features

- Responsive layout (desktop / tablet / mobile)
- **Date-wise sorting** of program cards (earliest first)
- Course filter tabs + live search (sort re-applies on every filter change)
- Programs mega-dropdown sorted by date
- Dynamic course detail pages (URL slug)
- **Download Brochure** button (per-program flyer PDF/image)
- Other Programs grid sorted by date
- Admission form → Google Form
- Internship form (Google Form iframe)
- Sticky header, mega menu, mobile hamburger

---

## Chat Assistant (widget.js + engine.js)

- **One greeting, one language.** On open the bot greets in English by default, or in Urdu (RTL) when the page has `lang="ur"` or the browser language starts with `ur`. The two languages are never shown together.
- Greeting is followed **in the same turn** by quick replies: Programs, Admission, Internship, Fees, Contact (chips go through the normal reply pipeline).
- **Header switcher `EN / اردو`**: clears the transcript and re-sends the greeting in the chosen language. Later replies follow the forced language; typing Urdu/Roman Urdu still auto-switches back.
- Style: navy `#002B49` header with a 2px gold `#D4AF37` accent line, circular **IPE** avatar, muted timestamp under each message, outlined navy pill chips (maroon on hover/focus, gold focus ring). Only the chat window carries a shadow; no emoji in message bodies.
- `engine.reply(text, state, langOverride)` — the optional 3rd argument is presentation-only (used by the language switcher). Intent logic is unchanged, and `selfTest` still reports 26/26 + 10/10.

---

## Date-Wise Sorting (index.html)

Each program card has a `data-date` attribute (ISO format):

```html
<div class="course-card" data-type="workshop" data-date="2026-08-24">
```

**Default order (All Programs):**

| Date | Program |
|------|---------|
| 24 Aug 2026 | Block & Screen Print Workshop |
| 7 Sep 2026 | Canvas Painting Workshop |
| 8 Sep 2026 | Basic Crocheting Workshop |
| 9 Sep 2026 | Organic Soap Making Workshop |
| 10 Sep 2026 | Applied Quality Control in Zoological Sciences |
| 19 Sep 2026 | Lead Implementor Training Program |
| 29 Sep 2026 | SME LaunchPad Program |
| 30 Sep 2026 | Facial Serum Making Workshop |

**How it works:**
1. `sortCardsByDate()` runs on page load and on every tab click / search input
2. Cards are re-ordered in DOM by `data-date` (fallback: parse date text from `.card-meta`)
3. Then filter (`data-type`) + search query are applied
4. Promo card always stays last; empty message first when no results

**To add a new card:** set `data-type` and `data-date="YYYY-MM-DD"` on the card div.

---

## Filter Tabs (index.html)

| Tab | `data-filter` value | Matches `data-type` |
|-----|---------------------|---------------------|
| All Programs | `all` | (shows everything) |
| Certified Short Courses | `certificate` | `certificate` |
| Industry Readiness Program | `industry` | `industry` |
| Diplomas | `diploma` | `diploma` |
| Workshops | `workshop` | `workshop` |
| Internship | `internship` | `internship` |

Currently `workshop`, `certificate` and `diploma` cards exist on the homepage. Empty tabs show: *"No programs listed in this category yet."*

Diploma cards have **no `data-date`** (no fixed start date) → they sort to the end of *All Programs* and appear first when the **Diplomas** tab is selected.

---

## Download Brochure (course-detail.html)

Sidebar button **Download Brochure** downloads the program's flyer when clicked.

```js
// In programs object:
'canvas-painting': {
  ...
  brochure: 'images-juw/Canvas%20Painting%20Workshop%20Flyer.png',
}
```

**Linked brochures:**

| Program | Brochure file |
|---------|---------------|
| Canvas Painting | `Canvas Painting Workshop Flyer.png` |
| Basic Crocheting | `Basic Crocheting.png` |
| Block & Screen Print | `Block Printing Workshop Flyer.jpg` |
| Organic Soap Making | `Organic Soap Making Flyer.png` |
| Facial Serum | `Serum MAking Workshop Flyer.png` |
| Applied Quality Control | `img-13.jpg` |
| SME LaunchPad | `img-15.png` |
| Lead Implementor | `img-16.png` |
| Animation & Game Design (Basic) | `diploma-animation-basic-brochure.png` |
| Animation & Game Design (Advance) | `diploma-animation-advance-brochure.png` |

If a program has no `brochure` field, the button is **hidden**.

**Filename note:** Spaces in paths are URL-encoded as `%20`. File names must match exactly on the server (case-sensitive on Linux).

---

## Course Slugs

Linked from homepage → `course-detail.html?course=...`

| Slug | Course |
|------|--------|
| `canvas-painting` | Canvas Painting Workshop |
| `basic-crocheting` | Basic Crocheting Workshop |
| `block-screen-print` | Block & Screen Print Workshop |
| `organic-soap` | Organic Soap Making Workshop |
| `facial-serum` | Facial Serum Making Workshop |
| `applied-quality-control` | Applied Quality Control in Zoological Sciences |
| `sme-launchpad` | SME LaunchPad Program |
| `lead-implementor` | 3 Days Lead Implementer Training Program |
| `industry-quality-assurance` | Industry Quality Assurance and Regulatory Laboratory Practices |
| `microbiology-food-safety` | Microbiology for a Safer Food Industry: Quality, Safety and Sustainability |
| `digital-marketing` | Digital Marketing & Social Media Strategy |
| `financial-accounting` | Financial Accounting |
| `hrm-diploma` | HRM Diploma |
| `public-speaking` | Public Speaking |
| `animation-game-design-basic` | Animation & Game Design (Basic) — 6 Months |
| `animation-game-design-advance` | Animation & Game Design (Advance) — 1 Year |

> Detail sidebar label: diploma entries set `dateLabel: 'Duration'` so the row reads **Duration / 6 Months** instead of **Date**.

**To add/edit a course:** edit the `programs` object in `course-detail.html` (search for `var programs`).

---

## Image Paths (Production)

All local images use relative path **`images-juw/`**:

| Usage | Path pattern |
|-------|--------------|
| Hero slides | `images-juw/img-01.jpg` … `img-04.jpg` |
| Logo | `images-juw/img-05.png` |
| Card banners | `images-juw/img-06.jpg` … `img-12.jpg` |
| Industry Readiness card banners | `images-juw/industry-quality-assurance-card.png`, `images-juw/food-safety-card.png` |
| Industry Readiness brochures | `images-juw/industry-quality-assurance-brochure.png`, `images-juw/food-safety-brochure.jpeg` |
| Brochures | `images-juw/<flyer file>` |

Unsplash images (external) are used for some card banners / course banners — these remain full `https://images.unsplash.com/...` URLs.

---

## Local Preview

Do not open via double-click (`file://`) if embeds/scripts misbehave. Use a local server:

```powershell
python -m http.server 8080
# or
npx --yes serve -p 8080
```

Then open `http://localhost:8080/index.html`.

**VS Code:** Live Server extension → *Open with Live Server*.

---

## Deploy (Production)

**Live URL:** https://shortcourses.juw.edu.pk/index.html  
**Server folder (example):** `htdocs/shortcourses.juw.edu.pk/`

### Upload checklist

1. Upload **all HTML files** to the site root (same directory as each other):
   - `index.html`
   - `about-ipe.html`
   - `course-detail.html`
   - `internship-application.html`
2. Upload folder **`images-juw/`** (not `images/`) to the same root:
   ```
   htdocs/shortcourses.juw.edu.pk/
   ├── index.html
   ├── course-detail.html
   ├── about-ipe.html
   ├── internship-application.html
   └── images-juw/
       ├── img-01.jpg
       ├── ...
       └── Canvas Painting Workshop Flyer.png
   ```
3. Filenames on server must match exactly (including spaces and case).

### After upload — force refresh

1. Open `https://shortcourses.juw.edu.pk/index.html`
2. Hard refresh: **Ctrl + Shift + R** (or Ctrl + F5)
3. Or open in Incognito window
4. Verify update: **Ctrl + U** (view source) → search for `data-date=`  
   - Found = new file is live  
   - Not found = old file still on server / wrong path / cache

### If changes don't appear

- Delete old file in File Manager, then re-upload (overwrite may fail silently)
- Clear hosting cache (cPanel → Flush Cache) if available
- Clear Cloudflare / CDN cache if used
- Test with cache buster: `https://shortcourses.juw.edu.pk/index.html?v=2`

---

## Files Changed (for updates)

When deploying latest local changes, replace at minimum:

| File | Contains |
|------|----------|
| `index.html` | Date sort, data-date attrs, filter logic, images-juw paths |
| `course-detail.html` | Brochure download, other-programs date sort, images-juw brochures |

`about-ipe.html` and `internship-application.html` — no path/sort changes required unless further edited.

---

## Tech

- Plain HTML5, CSS3, JavaScript (no framework / no build step)
- Google Fonts: Montserrat, Roboto
- Colors: navy `#002B49`, maroon `#800000`, gold `#D4AF37`

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Console shows *"file: URLs are treated as unique security origins"* | Page was opened by double-click (`file://`). Chrome blocks `knowledge.json` (and other file reads) across file origins. The chatbot detects this and switches to its built-in fallback dataset. To remove the warning and load live data, use a local server (see Local Preview) or the deployed site. |
| Cards not sorting by date | Confirm `data-date` on each card + `sortCardsByDate` in JS; hard refresh |
| Filter tab shows wrong/no cards | Check `data-type` matches tab's `data-filter` |
| Images broken on live | Folder must be `images-juw` at site root; filenames exact |
| Brochure not downloading | Check `brochure:` path in `programs` object; file exists in `images-juw/` |
| Changes not showing on live | Wrong upload path, or browser/server cache — see Deploy section |
| Search not working | Ensure `#courseSearch` input and `applyFilters()` still wired in script |

---

## Contact (site)

- Email: info@juw.edu.pk
- Phone: +92-21-36620857
- Address: 5C, Nazimabad, Karachi, Pakistan

---

© 2026 Jinnah University for Women. All Rights Reserved.
