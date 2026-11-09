# Jay Media Management Pvt. Ltd. — Design System & UI Implementation Guidance

## 1. Context and Goals

### 1.1 Design Intent
Deliver an implementation-ready, WCAG 2.2 AA compliant token architecture for Jay Media Management Pvt. Ltd. that unifies operator workflows across the dashboard web app with zero ambiguity, rigorous state management, and high execution speed.

### 1.2 Brand Context
- **Product/Brand**: Jay Media Management Pvt. Ltd.
- **Official URL**: [https://www.jaymediamanagement.com/](https://www.jaymediamanagement.com/)
- **Audience**: Authenticated operators, executive directors, event coordinators, and media technicians.
- **Product Surface**: Studio Operator Dashboard & Administrative Web App.
- **Visual Style**: Clean, functional, high-density, implementation-oriented.

---

## 2. Design Tokens and Foundations

All components must consume tokens exclusively via semantic variables. Raw hex codes, magic numbers, or ad-hoc rem/pixel values are strictly prohibited.

### 2.1 Typography Tokens

```css
:root {
  /* Font Family */
  --font-family-primary: 'Rubik', sans-serif;
  --font-family-stack: 'Rubik', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;

  /* Base Metrics */
  --font-size-base: 16px;
  --font-weight-base: 400;
  --font-line-height-base: 24px;

  /* Typography Scale */
  --font-size-xs: 14px;      /* Line height: 20px | Usage: Captions, meta tags, badges */
  --font-size-sm: 16px;      /* Line height: 24px | Usage: Body copy, form input labels */
  --font-size-md: 18px;      /* Line height: 26px | Usage: Subheaders, emphasized values */
  --font-size-lg: 20px;      /* Line height: 28px | Usage: Card headers, panel section titles */
  --font-size-xl: 28px;      /* Line height: 36px | Usage: Dashboard section headings */
  --font-size-2xl: 32px;     /* Line height: 40px | Usage: Major page display headlines */

  /* Weight Scale */
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-bold: 700;
}
```

### 2.2 Color Tokens

The palette is optimized for high-contrast dashboard surfaces, maintaining WCAG 2.2 AA compliance across dark base surfaces and high-visibility data tables.

```css
:root {
  /* Base Surfaces */
  --color-surface-base: #000000;             /* Root canvas and dark container backdrop */
  --color-surface-elevated: #101014;         /* Floating cards, modals, sidebars */
  --color-surface-muted: #e3e3e1;            /* Secondary light contrast panels and table rows */
  --color-surface-subtle: rgba(255, 255, 255, 0.05); /* Ghost row highlights, dividers */

  /* Text & Foreground */
  --color-text-primary: #ffffff;             /* High-priority headers, primary labels on dark surface */
  --color-text-secondary: #eef9ff;           /* Supporting body copy, metadata, secondary links */
  --color-text-tertiary: #01402b;            /* High-contrast status badges, light surface accents */
  --color-text-disabled: rgba(238, 249, 255, 0.38);

  /* Functional Accents & States */
  --color-accent-primary: #FF594F;           /* Interactive coral accent for actions & critical alerts */
  --color-accent-primary-hover: #e04a41;     /* Pressed / hovered interactive state */
  --color-border-default: rgba(238, 249, 255, 0.14);
  --color-border-focused: #FF594F;
  --color-border-error: #ef4444;
  --color-surface-error: rgba(239, 68, 68, 0.12);
  --color-surface-success: #01402b;
}
```

### 2.3 Spacing Scale

Spacers must adhere strictly to the 8-point harmonic rhythm with fine-grain micro-adjustments for compact table densities.

| Token | Computed Value | Intended Usage |
| :--- | :--- | :--- |
| `--space-1` | `4px` | Micro gap, icon-to-text spacing |
| `--space-2` | `5px` | Compact tag padding, inline badge offset |
| `--space-3` | `6px` | Dense table cell vertical padding |
| `--space-4` | `8px` | Standard button vertical padding, form field gap |
| `--space-5` | `10px` | Form field inner padding, menu item padding |
| `--space-6` | `16px` | Standard component margin, card internal padding |
| `--space-7` | `24px` | Container grid gap, panel margin |
| `--space-8` | `25px` | Section break padding, dashboard grid gutter |

### 2.4 Radius, Shadow & Motion Tokens

```css
:root {
  /* Corner Radii */
  --radius-xs: 2px;                          /* Micro badges, inputs, sharp data cards */
  --radius-sm: 10px;                         /* Modal dialogues, action sheets */
  --radius-md: 50px;                         /* Pill buttons, avatar rings, filter chips */

  /* Motion Timing */
  --motion-duration-instant: 300ms;          /* Hover transitions, active presses, tooltips */
  --motion-duration-fast: 500ms;             /* Drawers, modals, tab crossfades */
  --motion-easing-default: cubic-bezier(0.16, 1, 0.3, 1);

  /* Elevation Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.3);
  --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.45);
  --shadow-lg: 0 12px 32px rgba(0, 0, 0, 0.65);
}
```

---

## 3. Component-Level Implementation Rules

This web app features an intentional operational density across 6 component families:
- **Links** (42 instances across navigation, breadcrumbs, table actions, and pagination)
- **Buttons** (13 instances: primary actions, filters, modal triggers, bulk operations)
- **Inputs** (6 instances: search, text filters, dates, selects, textareas, toggles)
- **Cards** (5 instances: KPI summary, event roster, detail panel, status block, lead overview)
- **Navigation** (1 instance: persistent responsive sidebar & breadcrumb chain)
- **Lists** (1 instance: tabular activity feed & bulk data grid)

---

### 3.1 Buttons (Density: 13 Instances)

#### Anatomy
`[Leading Icon] + [Text Label] + [Trailing Shortcut/Badge/Spinner]`

#### Variants
1. **Primary**: Background `--color-accent-primary`, Text `--color-text-primary`.
2. **Secondary**: Background `--color-surface-subtle`, Border `--color-border-default`, Text `--color-text-secondary`.
3. **Tertiary (Ghost)**: Background transparent, Text `--color-text-secondary`.
4. **Destructive**: Background `--color-surface-error`, Border `--color-border-error`, Text `--color-text-primary`.

#### Required States
- **Default**: Font `--font-size-xs`, weight `--font-weight-medium`, padding `--space-4` `--space-6`, radius `--radius-xs`.
- **Hover**: Pointer changes to `cursor: pointer`. Primary shifts to `--color-accent-primary-hover`. Secondary elevates border to `--color-text-primary`.
- **Focus-visible**: Outline `2px solid var(--color-border-focused)`, offset `2px`. Outline must never be suppressed.
- **Active**: Scale `0.98` with `--motion-duration-instant`.
- **Disabled**: Opacity `0.4`, pointer-events `none`, cursor `not-allowed`. `aria-disabled="true"` must be set.
- **Loading**: Text remains readable or replaced by an animated spinner. Width must be locked to prevent layout jitter.
- **Error**: Border turns `--color-border-error`, triggers inline alert message.

#### Interaction Behavior
- **Keyboard**: Must trigger on both `Enter` and `Space`.
- **Pointer**: Debounced to prevent duplicate form or mutation submissions.
- **Touch**: Minimum touch target must meet `44x44px` via transparent pseudo-elements if visual button is compact.

---

### 3.2 Links (Density: 42 Instances)

#### Anatomy
`[Anchor Anchor Text] + [Optional External Arrow Indicator]`

#### Variants
1. **Navigational**: Sidebar, top bar, breadcrumb links.
2. **Inline Editorial**: Hyperlinks within narrative paragraphs and status cards.
3. **Table Row Action**: Compact action links (`Edit`, `Archive`, `View`).

#### Required States
- **Default**: Text `--color-text-secondary`, underline absent or subtle `1px` dotted.
- **Hover**: Text `--color-accent-primary`, underline solid `1.5px`.
- **Focus-visible**: `2px solid var(--color-border-focused)` bounding ring with `2px` offset.
- **Active**: Text brightness decreases by `10%`.
- **Disabled**: Text `--color-text-disabled`, pointer events removed.
- **Loading / Navigating**: Opacity pulses between `0.5` and `1.0`.

#### Interaction Behavior
- Must support middle-click, command-click, and context menu without script override.
- External links must include `rel="noopener noreferrer"` and an accessible screen-reader warning: `<span className="sr-only">(opens in new window)</span>`.

---

### 3.3 Inputs (Density: 6 Instances)

#### Anatomy
`[Field Label] + [Input Field Container (Icon + Text + Clear Action)] + [Helper/Error Message]`

#### Variants
1. **Search Input**: With leading magnifier and `Esc` clear action.
2. **Standard Text Input**: For strings and titles.
3. **Select / Dropdown Input**: For status and category assignment.
4. **Date/Time Input**: Native picker with custom visual trigger.
5. **Textarea**: Expandable multi-line editor for scopes and notes.
6. **Toggle Switch**: Binary state selector for publication states.

#### Required States
- **Default**: Background `--color-surface-base`, border `1px solid var(--color-border-default)`, text `--color-text-primary`, font `--font-size-sm`, padding `--space-5` `--space-6`, radius `--radius-xs`.
- **Hover**: Border color transitions to `--color-text-secondary`.
- **Focus-visible**: Border color `--color-border-focused`, box-shadow `0 0 0 1px var(--color-border-focused)`.
- **Disabled**: Background `rgba(255, 255, 255, 0.03)`, text `--color-text-disabled`, cursor `not-allowed`.
- **Loading**: Trailing spinner replaces clear button.
- **Error**: Border `--color-border-error`, aria-invalid `true`, error message displayed beneath with `id` linked via `aria-describedby`.

#### Long Content & Overflow
- Truncate with ellipsis on single-line inputs when content exceeds viewport.
- Multi-line inputs must preserve internal scroll with smooth wheel behavior.

---

### 3.4 Cards (Density: 5 Instances)

#### Anatomy
`[Header (Icon + Title + Status Pill)] + [Body Content / Metric] + [Footer / Action Row]`

#### Variants
1. **KPI Stat Card**: High-contrast numeral (`--font-size-2xl`), label (`--font-size-xs`), trend badge.
2. **Event Roster Card**: Thumbnail, title, venue, season, and published badge.
3. **Detail Inspector Card**: Multi-attribute metadata grid.
4. **Status Callout Card**: Background `--color-surface-elevated`, left border indicator.
5. **Inquiry Review Card**: Client details, budget band, timestamp, response toggle.

#### Required States
- **Default**: Background `--color-surface-elevated`, border `1px solid var(--color-border-default)`, radius `--radius-xs`.
- **Hover (Interactive Cards)**: Border `--color-border-focused`, subtle translate `-2px` with `--motion-duration-instant`.
- **Focus-visible**: If whole card is clickable, outline `2px solid var(--color-border-focused)`.
- **Empty State**: Centered placeholder illustration or icon with descriptive action prompt: *"No records match your criteria."*

---

### 3.5 Navigation (Density: 1 Instance)

#### Anatomy
`[Brand Identity] + [Hierarchical Section Links] + [System Utility Links] + [Operator Profile & Logout]`

#### Rules
- Must remain sticky or fixed on desktop viewports (`lg+`).
- Active link must be designated with `aria-current="page"` and colored `--color-accent-primary`.
- On mobile/tablet, collapse into an off-canvas drawer that traps focus and closes with `Escape`.

---

### 3.6 Data Lists & Tables (Density: 1 Instance)

#### Anatomy
`[Filter & Search Header] + [Column Header Row with Sort Toggles] + [Table Rows] + [Pagination Controls]`

#### Rules
- Column headers must feature `aria-sort` attributes when sortable.
- Rows must support hover states with background `--color-surface-subtle`.
- Selected rows must display high-contrast checkboxes with `aria-selected="true"`.
- Table container must support horizontal scroll on mobile with frozen identifier columns.

---

## 4. Accessibility Requirements & Testable Criteria (WCAG 2.2 AA)

### 4.1 Contrast Constraints
- **Primary Text on Surface Base (`#ffffff` on `#000000`)**: Ratio `21:1` (Exceeds `4.5:1` AA and `7:1` AAA).
- **Secondary Text on Surface Base (`#eef9ff` on `#000000`)**: Ratio `19.8:1` (Exceeds `4.5:1` AA and `7:1` AAA).
- **Coral Accent on Dark Surface (`#FF594F` on `#000000`)**: Ratio `4.64:1` (Passes `4.5:1` AA for normal body and headings).
- **Tertiary Dark Green on Surface Muted (`#01402b` on `#e3e3e1`)**: Ratio `8.41:1` (Exceeds `4.5:1` AA and `7:1` AAA).

### 4.2 Testable Acceptance Criteria

| Criteria ID | Requirement | Test Method | Pass/Fail Condition |
| :--- | :--- | :--- | :--- |
| `A11Y-01` | Focus-Visible | Tab traversal across all 13 buttons and 42 links | **PASS**: 2px outline visible on every focused element. **FAIL**: Any focused element lacks visual ring. |
| `A11Y-02` | Keyboard Operability | Form completion and submission using only keyboard | **PASS**: Space/Enter activates actions; Esc dismisses modals; Tab/Shift+Tab traverses sequentially. |
| `A11Y-03` | Contrast Verification | Automated color contrast audit (axe-core) | **PASS**: 100% of text and functional controls achieve ≥ 4.5:1 ratio. |
| `A11Y-04` | Screen Reader Labels | VoiceOver/NVDA audit of icon-only buttons | **PASS**: Every icon button has an unambiguous `aria-label` or `.sr-only` span. |
| `A11Y-05` | Form Error Associations | Form validation trigger test | **PASS**: `aria-invalid="true"` set and `aria-describedby` points to live error text element. |
| `A11Y-06` | Touch Target Dimensions | Mobile viewport touch tap test | **PASS**: All interactive elements have ≥ 44x44px activation area. |

---

## 5. Content & Tone Standards with Examples

The writing tone across the dashboard must be **concise, confident, and implementation-focused**. Avoid conversational fluff, ambiguous pronouns, and non-actionable warnings.

### 5.1 Standards Matrix

| Context | Prohibited (Don't) | Required Standard (Do) |
| :--- | :--- | :--- |
| **Action Buttons** | *"Click here"*, *"Submit"*, *"Okay"* | *"Publish Event"*, *"Save Configuration"*, *"Export Records"* |
| **Empty States** | *"Oops! Looks like nothing is here yet."* | *"No events created. Select 'Create New Event' to begin."* |
| **Error Feedback** | *"Something went wrong. Try again."* | *"Unable to save event: End date must occur after start date."* |
| **Success Notices** | *"Yay! Your changes worked."* | *"Event successfully published to public catalog."* |
| **Delete Confirmation** | *"Are you sure?"* | *"Delete Miss Koshi 2024? This action cannot be undone."* |

---

## 6. Anti-Patterns & Prohibited Implementations

1. **PROHIBITED: Raw Hex Injection**: Never write inline `color: #FF594F` or arbitrary Tailwind arbitrary values `text-[#01402b]`. Always use designated CSS custom properties or mapped Tailwind theme tokens.
2. **PROHIBITED: Suppressing Focus Rings**: Never declare `outline: none` or `focus:outline-none` without an explicit, accessible replacement (`focus-visible:ring-2 focus-visible:ring-offset-2`).
3. **PROHIBITED: Text in Images**: Never embed dates, contestant names, or event categories directly inside raster graphics without HTML semantic overlays.
4. **PROHIBITED: Modal Focus Leakage**: Modals must trap focus internally and restore focus to the triggering element upon closure.
5. **PROHIBITED: Ad-Hoc Spacing**: Spacing must never be computed arbitrarily (e.g., `margin-top: 13px`). Use the defined scale tokens: `4px, 5px, 6px, 8px, 10px, 16px, 24px, 25px`.

---

## 7. QA Checklist for Implementers

Before submitting any code change for the Jay Media Management dashboard, verify every item below:

- [ ] **Tokens Consumed**: All styles resolve to `--font-size-*`, `--space-*`, `--color-*`, `--radius-*`, and `--motion-*`.
- [ ] **7 Component States Handled**: Default, Hover, Focus-visible, Active, Disabled, Loading, Error verified for all inputs and buttons.
- [ ] **Keyboard Tested**: Full navigation achievable with `Tab`, `Shift+Tab`, `Enter`, `Space`, and `Escape`.
- [ ] **No Layout Shift**: Loading spinners and state transitions do not cause button or card width jumps.
- [ ] **Contrast Audited**: Color pairings pass WCAG 2.2 AA (minimum 4.5:1 for standard text, 3:1 for large text).
- [ ] **Mobile Touch Verified**: Touch targets meet or exceed 44x44px.
- [ ] **Labels Semantic**: No ambiguous buttons; screen reader labels present for all icon-only triggers.
- [ ] **Build Check**: `npm run build` succeeds with zero TypeScript errors and zero warnings.
