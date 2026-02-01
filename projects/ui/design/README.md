# Design System (Pencil)

Design files and tokens for the Pencil-to-code workflow with the `projects/ui` library.

## Files

- **design-system.pen** – Pencil design file with foundations and component library (Foundations + Button, Card, Input). Open in Pencil to view/edit.
- **tokens-for-pencil.css** – Re-exports `variables.css` via @import. For Pencil: import from `projects/ui/src/design-tokens/variables.css` to get all 800+ variables.
- **PENCIL_GUIDE.md** – Component mapping and AI prompts for design-to-code generation.

## Setup

1. Install [Pencil](https://pencil.dev) (IDE extension or desktop app).
2. Open `design-system.pen` in Pencil (File → Open, or from your IDE).
3. To sync tokens: Cmd/Ctrl + K → *"Create Pencil variables from projects/ui/src/design-tokens/variables.css"*

## Making Components Reusable

Select a component frame (e.g. Button, Card) and press **Cmd/Ctrl + Option/Alt + K** to convert it to a reusable symbol. Use these symbols when designing new pages.
