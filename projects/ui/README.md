# UI Library

Reusable Angular UI library and design system. Built with [Angular CLI](https://github.com/angular/angular-cli) (v21), intended for publishing as an npm package and consumption by applications (e.g. gaming, arena, or dashboard products).

**Try the library:** [**Live Storybook demo →**](https://lyamone.github.io/base/) (deployed via [GitHub Pages](../../.github/workflows/deploy-storybook.yml)).

## Contents

- [Design direction](#design-direction)
- [Accessibility & interaction patterns](#accessibility--interaction-patterns)
- [Development](#development)
- [Building & publishing](#building--publishing)
- [Testing](#testing)
- [Code scaffolding](#code-scaffolding)

---

## Design direction

The library follows an **Industrial Arena Minimal** aesthetic:

- **Tone**: Industrial / utilitarian core with restrained neon sport accents.
- **Differentiation**: Dense, dark surfaces with sharp neon typography, bold uppercase brand labels, and precise, chunky control geometry.
- **Primary use**: Gaming, arena, and high-intensity dashboards where clarity and power matter more than softness.

### DFII (Design Feasibility & Impact Index)

| Dimension               | Score | Notes                                                                 |
|-------------------------|-------|----------------------------------------------------------------------|
| Aesthetic impact        | 5     | Highly distinctive neon-on-carbon look with strong brand typography. |
| Context fit             | 4     | Well-suited for Ultra-branded gaming, wallets, and marketplaces.   |
| Implementation feasibility | 4  | Built on existing tokens (Ultra Brand, Ultra Nunito Sans, dark BG, neon). |
| Performance safety      | 4     | Minimal shadows/blur; motion kept sharp and sparse.                  |
| Consistency risk       | 2     | Rich token set; requires discipline on spacing, motion, naming.     |

**DFII score**: (5 + 4 + 4 + 4) − 2 = **15** → _Excellent_. Execute this direction consistently across all components.

### System principles

- **Typography**: `Ultra Nunito Sans` for functional text; `Ultra Brand` for loud, uppercase brand labels and key headlines.
- **Color**: Dark grey/black surfaces as base; purple as primary brand; green/yellow/orange only as functional status accents.
- **Spacing**: Tight baseline grid from tokenized spacing; no ad-hoc pixel values in components.
- **Motion**: Snappy, low-latency transitions — responsive and “mechanical”, not soft or bouncy.

---

## Accessibility & interaction patterns

### Disabled state

- Prefer the native `disabled` attribute on real form controls (`button`, `input`).
- When a component behaves like a control without a native element (e.g. complex cards), mirror state with `aria-disabled="true"`.
- Visually: reduced contrast, no hover/active effects, `cursor: not-allowed`.

### Keyboard activation

- Toggle-like components (accordion, collapse, selectable pills) must respond to **Space** and **Enter** as well as click.
- Shared pattern: if `event.key === ' '` or `'Enter'`, call `preventDefault()` and invoke the same handler as for click.

### ARIA patterns

- **Disclosure / accordion**
  - Triggers: `aria-expanded`, `aria-controls` pointing to content regions.
  - Content: `role="region"`, `aria-labelledby` pointing to the trigger.
- **Menus** (dropdown, carousel pagination)
  - Triggers: `aria-haspopup="menu"`, `aria-expanded` when open.
  - Items: clear labels and, where applicable, `aria-current` for the active item.

---

## Development

### Storybook

From the **workspace root**:

```bash
npm run storybook
```

Storybook runs at [http://localhost:6006](http://localhost:6006) and loads foundations CSS and fonts. Use it as the main way to develop and document components.

### Build (local)

Always use the full pipeline so foundations and fonts are up to date:

```bash
npm run build:ui
```

This runs, in order: **copy-fonts** → **sass** (foundations SCSS → CSS) → **ng build ui**. Artifacts go to `dist/ui/`, with pre-built styles under `dist/ui/styles/` (e.g. `foundations.css`, `fonts/`).

Running only `ng build ui` does **not** regenerate foundations or utility CSS; run `npm run build:ui` (or at least `ui:copy-fonts` and `ui:sass`) first.

Optional standalone steps:

- `npm run ui:copy-fonts` — copy font files into `projects/ui/assets/styles/fonts/`
- `npm run ui:sass` — compile foundations SCSS to `projects/ui/assets/styles/foundations.css`
- `ng build ui` — package the library (ng-packagr)

---

## Building & publishing

1. Build the library: `npm run build:ui` (from workspace root).
2. Go to the built package:
   ```bash
   cd dist/ui
   ```
3. Publish to npm:
   ```bash
   npm publish
   ```

---

## Testing

From the workspace root:

```bash
ng test
```

Unit tests use Vitest (see root `angular.json` and `projects/ui` test configuration).

---

## Code scaffolding

From the **workspace root**, generate components (or other schematics) in the UI library:

```bash
ng generate component component-name --project=ui
```

List available schematics:

```bash
ng generate --help
```

---

## Additional resources

- [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
