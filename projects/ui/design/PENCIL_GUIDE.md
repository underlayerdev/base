# Pencil Design-to-Code Guide

Reference for AI-assisted code generation from Pencil designs. Use this guide when prompting Cmd/Ctrl + K to generate Angular 21+ components that match the `projects/ui` library.

---

## Library Path

- **UI library:** `projects/ui` (relative to workspace root `base`)
- **Design tokens:** `projects/ui/src/design-tokens/variables.css`
- **Full tokens (all variables):** `projects/ui/src/design-tokens/variables.css`
- **Lightweight re-export:** `projects/ui/design/tokens-for-pencil.css` (@import of variables.css)

---

## Component → Class Mapping

### Button (`pe-button` / `pe-btn`)

**Usage:** `<pe-button size="md" theme="fill-purple">Primary Action</pe-button>`

| Prop | Values | Maps to Class |
|------|--------|----------------|
| `size` | `sm`, `md`, `lg`, `xl` | `pe-btn--sm`, `pe-btn--md`, `pe-btn--lg`, `pe-btn--xl` |
| `theme` | See below | `pe-btn--fill-purple`, etc. |
| `iconOnly` | `true` | `pe-btn--icon-only` |
| `vertical` | `true` (lg only) | `pe-btn--vertical` |

**Theme values:** `fill-purple`, `fill-white`, `fill-yellow`, `fill-red`, `transparent-purple`, `transparent-white`, `transparent-red`, `transparent-black`, `ghost-purple`, `ghost-white`, `ghost-red`, `ghost-green`, `outline-white`, `outline-purple`, `outline-red`, `outline-green`

### Card (`pe-card`)

**Usage:**
```html
<pe-card
  cardCaption="Caption"
  cardTitle="Title"
  cardSubtitle="Subtitle">
  <div udsCardMedia>...</div>
  <div udsCardMediaOverlay>...</div>
  <div udsCardMediaAction>...</div>
  <ng-container udsCardFooter>...</ng-container>
</pe-card>
```

| Input | Values | Notes |
|-------|--------|-------|
| `cardCaption`, `cardTitle`, `cardSubtitle` | string | Content |
| `cardDirection` | `horizontal` \| `vertical` | `pe-card--horizontal` |
| `mediaAspectRatio` | `default` \| `square` \| `portrait` | Media shape |
| `footerDist` | `default` \| `equal` | Footer layout |
| `focused`, `disabled` | boolean | State classes |

**Slots:** `udsCardMedia`, `udsCardMediaOverlay`, `udsCardMediaAction`, `udsCardFooter`

### Input (`pe-input`)

**Usage:**
```html
<pe-input
  label="Email"
  placeholder="Enter your email"
  [value]="email()"
  (valueChange)="email.set($event)">
</pe-input>
```

| Input | Values | Notes |
|-------|--------|-------|
| `size` | `sm`, `md`, `lg` | `pe-input--sm`, etc. |
| `appearance` | `border-only` \| `subtle-tint` | Hover style |
| `error`, `disabled`, `readOnly` | boolean | State classes |
| `label`, `placeholder`, `helperText` | string | Labels |
| `type` | `text` \| `email` \| `password` | Input type |

**Projected content:** `[pe-input-left-elements]`, `[pe-input-right-elements]`

### Form Field Label / Helper

- `pe-form-field-label` (internal)
- `pe-form-field-helper` (internal)

### Navbar (`pe-navbar`)

**Usage:**
```html
<pe-navbar
  logoHref="/"
  [logoSrc]="logoUrl"
  [avatarSrc]="avatarUrl"
  [avatarInitials]="'JD'">
  <ng-container *peNavbarLogo>...</ng-container>
  <ng-container *peNavbarSearch>...</ng-container>
  <ng-container *peNavbarAvatar>...</ng-container>
</pe-navbar>
```

### Other Components

| Component | Selector | Import Path |
|-----------|----------|-------------|
| Avatar | `pe-avatar` | `@base/ui` |
| Breadcrumb | `pe-breadcrumb` | `@base/ui` |
| Calendar | `pe-calendar` | `@base/ui` |
| Checkbox | `pe-checkbox` | `@base/ui` |
| Collapse | `pe-collapse` | `@base/ui` |
| Dropdown | `pe-dropdown` | `@base/ui` |
| Footer | `pe-footer` | `@base/ui` |
| Hero | `pe-hero` | `@base/ui` |
| Icon | `pe-icon` | `@base/ui` |
| Modal | `pe-modal` | `@base/ui` |
| Pill | `pe-pill` | `@base/ui` |
| Radio | `pe-radio`, `pe-radio-group` | `@base/ui` |
| Select | `pe-select` | `@base/ui` |
| SearchSelect | `pe-search-select` | `@base/ui` |
| Sidebar | `pe-sidebar` | `@base/ui` |
| Status | `pe-status` | `@base/ui` |
| Table | `pe-table` | `@base/ui` |
| Textarea | `pe-textarea` | `@base/ui` |

---

## Typography Classes

| Class | Use |
|-------|-----|
| `pe-typography-headline-s-extrabold` | 24px, headings |
| `pe-typography-headline-m-extrabold` | 28px |
| `pe-typography-headline-l-regular` | 32px |
| `pe-typography-body-m-regular` | 16px body |
| `pe-typography-body-l-regular` | 18px |
| `pe-typography-caption-l-regular` | 14px labels |
| `pe-typography-caption-mono-regular` | 14px mono |

**Weight variants:** `regular`, `medium`, `extrabold`, `extrablack`

---

## Utility Classes

| Category | Pattern | Example |
|----------|---------|---------|
| Text color | `pe-text-{color}` | `pe-text-primary`, `pe-text-tertiary` |
| Background | `pe-bg-{color}` | `pe-bg-main`, `pe-bg-grey-lvl-1`, `pe-bg-purple` |
| Border | `pe-border-{color}` | `pe-border-white-light` |
| Radius | `pe-rounded-{size}` | `pe-rounded-2`, `pe-rounded-3` |
| Spacing | `pe-p-{n}`, `pe-m-{n}`, `pe-gap-{n}` | `pe-p-4`, `pe-gap-4`, `pe-mb-4` |
| Shadow | `pe-shadow-sm`, `pe-shadow-md` | |

**Spacing scale:** 1 (4px), 2 (8px), 3 (12px), 4 (16px), 6 (24px), 8 (32px)  
**Radius scale:** 1 (4px), 2 (8px), 3 (12px), 4 (16px)

---

## Angular Code Generation Prompts

Use these when generating code from Pencil designs:

**Component:**
```
Generate an Angular standalone component for this design. Use the ui library at projects/ui. Import components from @base/ui (pe-button, pe-card, pe-input). Use SCSS with design tokens from projects/ui/src/design-tokens/variables.css. Apply pe-typography-*, pe-bg-*, pe-rounded-* classes where appropriate.
```

**Page:**
```
Create an Angular page from this Pencil frame. Use components from projects/ui: pe-card, pe-button, pe-navbar, pe-input. Follow patterns in projects/ui/src/components. Use the pe- prefix for all utility classes. Import from @base/ui.
```

**Full token import (all 800+ variables):**
```
Create Pencil variables from projects/ui/src/design-tokens/variables.css
```

**Lightweight import (tokens-for-pencil.css uses @import; if Pencil resolves it, you get all vars):**
```
Create Pencil variables from projects/ui/design/tokens-for-pencil.css
```

---

## Slot Selectors Reference

| Component | Slot Attribute | Purpose |
|-----------|----------------|---------|
| `pe-card` | `udsCardMedia` | Main media (image, etc.) |
| `pe-card` | `udsCardMediaOverlay` | Overlay on media |
| `pe-card` | `udsCardMediaAction` | Action button on media |
| `pe-card` | `udsCardFooter` | Footer actions |
| `pe-input` | `pe-input-left-elements` | Left slot |
| `pe-input` | `pe-input-right-elements` | Right slot |

---

## Workflow

### 1. Token Sync (Code → Pencil)

When design tokens change in `variables.css`:

1. Update `design/tokens-for-pencil.css` if you added new semantic tokens.
2. In Pencil, open `design-system.pen` and press **Cmd/Ctrl + K**.
3. Prompt: *"Create Pencil variables from projects/ui/src/design-tokens/variables.css"* (or use `tokens-for-pencil.css` if you prefer the design folder path)
4. Save the .pen file.

### 2. New Component Import (Code → Pencil)

When you add a new component to `projects/ui`:

1. Open `design/design-system.pen`.
2. Press **Cmd/Ctrl + K**.
3. Prompt: *"Recreate the [ComponentName] component from projects/ui/src/components/[component]"*
4. Review the result, convert to reusable symbol (Cmd+Option+K) if needed.

### 3. Design Tweak → Code (Pencil → Code)

When you change a design in Pencil:

1. Select the frame/component.
2. Press **Cmd/Ctrl + K**.
3. Prompt: *"Update projects/ui/src/components/[component]/[component].ts and [component].scss with this design"*
4. Review the diff and apply.

### 4. New Page (Design First)

1. Design the page in Pencil using component symbols from the design system.
2. Select the page frame.
3. Press **Cmd/Ctrl + K**.
4. Prompt: *"Generate an Angular standalone component for this design. Use projects/ui library. Import pe-card, pe-button, pe-navbar, pe-input from @base/ui. Use SCSS with tokens. See design/PENCIL_GUIDE.md for component mapping."*
5. Save to your app (e.g. `src/app/pages/my-page/`).

### 5. Sync Checklist

| Change type | Where to update | Then |
|-------------|-----------------|------|
| New color/token | `variables.css` or token source | Re-import into Pencil from `tokens-for-pencil.css` |
| New component | `projects/ui` | Import into Pencil via AI prompt |
| Design tweak in Pencil | Pencil canvas | "Update [Component].ts and [Component].scss with this design" |
| New page | Design in Pencil first | Generate Angular component with Cmd+K |
