# Base

Angular workspace that hosts the shared **UI library** — a design system built with Angular 21, following the **Industrial Arena Minimal** aesthetic for gaming, arena, and high-intensity dashboards.

## Repository structure

| Path           | Description                                      |
|----------------|--------------------------------------------------|
| `projects/ui/` | Shared UI library (components, foundations, tokens) |
| `.github/`     | CI/CD (e.g. Storybook deploy to GitHub Pages)    |

## Prerequisites

- **Node.js** 20+
- **npm** 10+

## Quick start

```bash
npm install
```

### Develop the UI library (Storybook)

From the workspace root:

```bash
npm run storybook
```

Storybook runs at [http://localhost:6006](http://localhost:6006) with the UI components and foundations.

### Build the UI library

Build the library (fonts, foundations CSS, and Angular package):

```bash
npm run build:ui
```

Output: `dist/ui/` (publishable package and pre-built styles under `dist/ui/styles/`).

### Run tests

```bash
ng test
```

Unit tests use [Vitest](https://vitest.dev/) (see `angular.json`).

## Main scripts

| Script                 | Description                                              |
|------------------------|----------------------------------------------------------|
| `npm run storybook`    | Start Storybook for the UI library (port 6006)           |
| `npm run build-storybook` | Build static Storybook (e.g. for deployment)         |
| `npm run build:ui`     | Copy fonts, compile foundations, build the UI library   |
| `npm run ui:copy-fonts`| Copy font files into `projects/ui/assets/styles/fonts/`  |
| `npm run ui:sass`      | Compile foundations SCSS to CSS                          |
| `ng test`              | Run unit tests (Vitest)                                  |

## Code scaffolding

Generate components (or other schematics) in the UI library from the workspace root:

```bash
ng generate component component-name --project=ui
```

List available schematics:

```bash
ng generate --help
```

## Documentation

- **UI library**: design direction, accessibility, and build details → [projects/ui/README.md](projects/ui/README.md)
- **Angular CLI**: [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli)
