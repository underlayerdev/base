# ship — Commit and optionally release changes in the base UI library

Perform a structured commit (and optional npm version bump + tag) for the `@underlayerdev/ui` library.

## Steps

### 1. Inspect the working tree

Run these in parallel:
- `git status` — list changed files
- `git diff` — see unstaged changes
- `git diff --cached` — see staged changes
- `git log --oneline -5` — see recent commits

### 2. Classify the change

Determine the change type from the diff:

| Type | When to use | npm bump |
|------|-------------|----------|
| `fix` | Bug fix, compile error, incorrect behavior | **patch** (0.0.x) |
| `feat` | New component, new input/output, new export | **minor** (0.x.0) |
| `chore` | Deps, CI, config, build tooling, gitignore | none |
| `docs` | README, comments, Storybook stories only | none |
| `refactor` | Internal restructure, no API change | none |
| `style` | SCSS/CSS only, no logic change | none |
| `ci` | GitHub Actions workflow changes | none |
| `BREAKING` | Removed export, renamed input, changed type | **major** (x.0.0) |

> A single commit may combine types (e.g. `feat` + `fix`) — pick the highest-impact type.

### 3. Draft the commit message

Follow **Conventional Commits** format:

```
<type>(<scope>): <short description>

[optional body — what changed and why, bullet points ok]

[optional footer — BREAKING CHANGE: description]
```

Rules:
- Subject line: max 72 chars, lowercase, no period
- Scope: component name or area (e.g. `button`, `toast`, `ci`, `deps`)
- Body: only when the why isn't obvious from the subject
- Breaking changes: must include `BREAKING CHANGE:` footer

Examples:
```
fix(input): remove duplicate valueChange output conflicting with model()

feat(toast): export ToastService from public API

chore(deps): upgrade Angular 21 → 22, Storybook 10.2 → 10.4

ci(workflows): bump Node.js to 22 in all GitHub Actions

feat(table): rename sortColumnChange → sortChange to avoid model conflict

BREAKING CHANGE: consumers using (sortColumnChange) must update to (sortChange)
```

### 4. Determine if a version bump is needed

A version bump is needed when the change affects the **published package** — i.e. anything under `projects/ui/src/` or `projects/ui/package.json`.

If yes:
- Read current version from `projects/ui/package.json`
- Apply semver rule from the table above
- Update `version` in `projects/ui/package.json`
- Update `version` in the root `package.json` to match
- Ask the user: "This is a `<type>` change — bumping version from X.X.X → Y.Y.Y. Confirm?"

If no (chore/ci/docs/style): skip version bump.

### 5. Stage and commit

Stage only relevant files — never use `git add -A` blindly:
- Always exclude: `dist/`, `node_modules/`, `projects/ui/assets/styles/foundations.css`, `.npmrc`
- Stage source changes, config changes, and `package.json` / `package-lock.json` if version was bumped

Commit using a HEREDOC:
```bash
git commit -m "$(cat <<'EOF'
<type>(<scope>): <description>

<body if needed>
EOF
)"
```

### 6. Tag and push (only if version was bumped)

If a version bump was made:
```bash
git tag v<new-version>
git push origin main
git push origin v<new-version>
```

The `v*` tag triggers the `publish.yml` workflow which publishes to npm automatically.

If no version bump:
```bash
git push origin main
```

### 7. Report

Print a summary:
```
✔ Committed: <type>(<scope>): <description>
✔ Version: X.X.X → Y.Y.Y  (or "no version bump")
✔ Tag: vY.Y.Y pushed  (or "no tag")
✔ npm publish: triggered by CI  (or "not triggered")
```
