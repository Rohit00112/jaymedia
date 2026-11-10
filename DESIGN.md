# Jay Media Management — Design System

## 1. Identity

**The Light Table** is an editorial identity for a production house: warm paper,
deep forest ink, and a terracotta signal. It should feel like a printed culture
programme that happens to be interactive — curated, spacious, and confident.

- **Brand**: Jay Media Management Pvt. Ltd., Biratnagar, Nepal
- **Audience**: clients, sponsors, contestants, families, press
- **Tone**: assured, cultural, specific, never generic SaaS
- **Surfaces**: public website and studio CMS

### Guiding principles

1. **Paper over panels.** Sections are composed on open surfaces, not stacked
   into identical rounded cards.
2. **One expressive gesture per section.** A large serif headline, an arching
   image, an oversized index numeral — not all three competing.
3. **Hairlines do the structural work.** Rules, columns, and margins create
   rhythm; shadows are almost incidental.
4. **Warmth with contrast.** Terracotta and forest are used with restraint and
   tested for legibility.
5. **Motion serves reading.** Entrances are quiet; nothing chases the cursor.

---

## 2. Design tokens

All components consume semantic CSS custom properties declared in
`src/app/globals.css`. Raw hex values belong in the token layer only.

### 2.1 Color

| Token | Value | Role |
| :--- | :--- | :--- |
| `--color-paper` | `#FBF8F3` | Primary canvas |
| `--color-paper-deep` | `#F3EDE3` | Alternating editorial band |
| `--color-cream` | `#FFFDF8` | Text on forest, light media controls |
| `--color-card` | `#FFFFFF` | Raised content surfaces |
| `--color-sand` | `#ECE4D7` | Image placeholders, quiet fills |
| `--color-ink` | `#16211B` | Headlines and primary text |
| `--color-ink-soft` | `#33423A` | Long-form body copy |
| `--color-muted` | `#5B675F` | Secondary copy |
| `--color-faint` | `#667169` | Meta and labels (AA at normal size) |
| `--color-accent` | `#B4472A` | Primary signal, active states |
| `--color-accent-hover` | `#973A22` | Interactive hover |
| `--color-accent-soft` | `#F7E8E0` | Selected and informational fills |
| `--color-forest` | `#1F4D3D` | Contrast band, partnership panels |
| `--color-forest-soft` | `#E3EBE5` | Success and published states |
| `--color-gold` | `#D6B87E` | Labels on forest, ceremonial detail |
| `--color-line` | `rgba(22,33,27,.12)` | Default hairline |
| `--color-line-strong` | `rgba(22,33,27,.26)` | Emphasised border |

**Do not** reintroduce the former dark palette. A dark surface is permitted only
inside image lightboxes and video modals, framed by the light page.

### 2.2 Typography

| Role | Family | Usage |
| :--- | :--- | :--- |
| Display | **Fraunces** | Page titles, section headings, numerals |
| Accent | **Instrument Serif** italic | One emphasised word per heading |
| Body / UI | **Instrument Sans** | Paragraphs, navigation, buttons, forms |
| Label | **JetBrains Mono** | Eyebrows, indexes, metadata |

- Display sizes use `clamp()` from ~2.1rem to ~6.4rem.
- Headline line-height sits between `0.9` and `1.0`; body uses `1.6`–`1.85`.
- Uppercase mono labels are 8–10px with `0.16em`–`0.2em` tracking.
- Never set long paragraphs in mono or in the display serif.
- Use italic Instrument Serif for a single accent phrase, not whole headings.

### 2.3 Spacing and layout

- Page container: `max-width: 84rem`, fluid inline padding
  `clamp(1.15rem, 4vw, 3.5rem)`.
- Section rhythm: `5rem` on mobile, `7rem` on desktop.
- Editorial grids use a 12-column structure with intentional asymmetry
  (7/5, 8/4, 4/8) rather than equal thirds.
- Hairline rules separate content groups; avoid boxing everything.

### 2.4 Radius and elevation

- Radius is deliberately small: `4px` for tags, `6px` for media and cards,
  `8px` for large panels.
- Pills are reserved for circular icon controls and avatars.
- Shadows: `0 1px 2px rgba(22,33,27,.04)` for cards; larger shadows only for
  overlays and floating editorial accents.

### 2.5 Motion

- Standard easing: `cubic-bezier(0.16, 1, 0.3, 1)`.
- Micro-interactions: 200–380ms. Scroll reveals: 900ms with a small rise and
  blur. Media entrances may run to 1500ms.
- Hover may lift a control by 2px; nothing should bounce or loop in content.
- `prefers-reduced-motion` disables reveals, parallax, marquee and smooth scroll.

---

## 3. Components

### Navigation

- Fixed masthead on translucent paper with a hairline that appears on scroll.
- Square ink monogram plus a two-line wordmark.
- Active section uses ink text and a terracotta underline.
- Mobile: full-screen paper index with large serif links, numbered, focus
  trapped, closed with Escape.

### Buttons

`btn` + one of `btn-primary`, `btn-outline`, `btn-accent`, `btn-white`, `btn-dark`.

- Rectangular (`6px`), minimum height `48px`, 13px semibold label.
- Hover slides the accent fill up from below and nudges the arrow.
- Visible focus ring is never removed. Disabled controls reduce opacity and
  block pointer events.

### Links

- Inline editorial links use `text-link` (hairline underline that turns
  terracotta).
- Navigation and footer links use `link-sweep` for a left-to-right underline.
- External links carry `rel="noopener noreferrer"` and descriptive labels.

### Cards and surfaces

- White `bg-card` panels with a hairline border for functional content.
- Editorial rows and image-led compositions are preferred over grids of
  interchangeable cards.
- Media always uses a `6px` radius, a hairline, and a paper-deep placeholder.

### Forms

- Labels are mono uppercase, inputs are paper-tinted fields with a hairline.
- Focus: terracotta border plus a 2px `accent/15` ring.
- Errors set `aria-invalid`, link `aria-describedby`, and show terracotta text
  beneath the field.
- Success and error summaries are announced with `role="status"` / `role="alert"`.

### Data and admin surfaces

- Tables and lists sit on white cards with hairline dividers.
- Active navigation uses `accent-soft` with terracotta text, never a solid
  accent block behind pale text.
- Status pills: new = accent soft, in progress = gold soft, published/completed
  = forest soft. Text must remain at least 4.5:1 against the pill.

---

## 4. Accessibility

- **Contrast**: ink on paper ≈ 15.7:1; muted on paper ≈ 5.5:1; faint on paper
  ≈ 4.8:1; accent on paper ≈ 5.2:1; cream on forest ≈ 9.5:1.
- **Focus**: every interactive element shows a 2px terracotta outline with 3px
  offset.
- **Keyboard**: menus trap focus and close on Escape; gallery lightbox supports
  arrow keys; accordions use native buttons with `aria-expanded`.
- **Touch**: interactive controls are at least 44×44px where practical.
- **Media**: meaningful alt text on photography; decorative marks hidden from
  assistive technology; reduced-motion respected globally.
- **Semantics**: one `h1` per page; landmark elements; skip-to-content link.

---

## 5. Content standards

| Context | Avoid | Prefer |
| :--- | :--- | :--- |
| Actions | "Click here", "Submit" | "Start the brief", "Explore productions" |
| Empty states | "Nothing here yet!" | "No productions published. Create the first event." |
| Errors | "Something went wrong" | "Unable to submit: add a reachable phone number." |
| Success | "Yay!" | "Inquiry received. The production desk replies within one business day." |

No placeholder names, venues, or statistics presented as verified facts beyond
the approved company content in `src/config`.

---

## 6. QA checklist

- [ ] All colors resolve to semantic tokens; no stray hex values in components.
- [ ] Consistent `6px` media/card radius and hairline borders.
- [ ] Hover, focus-visible, active, disabled, loading and error states exist.
- [ ] Layout reviewed at 390px, 768px, 1024px and 1440px with no horizontal scroll.
- [ ] `npm run build` and `npm run lint` pass.
- [ ] Reduced-motion mode has no content hidden by animation.
