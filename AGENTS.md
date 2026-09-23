# Repository Guidelines

## Project Structure & Module Organization

This repository is a static, clickable design prototype for General Barbers; it has no package manager or production backend. The generated prototype lives in `general-barbers/`:

- `index.html` is the presentation entry point; `ui_kits/mobile/` and `ui_kits/desktop/` contain the interactive screen cards.
- `tokens/` defines brand, semantic, spacing, typography, and status variables. `base.css`, `components.css`, and `styles.css` compose the shared visual system.
- `components/gb-art.js` holds shared vector art; `demo.js` supplies the prototype frame and controls.
- `uploads/` contains image assets, `screenshots/` contains reference captures, and `guidelines/` documents design decisions.
- Root `general-barbers-mobile.html` and `general-barbers-web.html` are source prototypes. `build-general-barbers.js` derives files under `general-barbers/` from them.

## Build, Test, and Development Commands

- `node build-general-barbers.js` regenerates the derived prototype. It expects the hard-coded local Meridian and image-cache paths in that script; verify those paths before running it.
- Open `general-barbers/index.html` in a browser to review the full demo. Open individual `*.card.html` files for focused checks.
- `node --check general-barbers/ui_kits/mobile/_app.js` (and the equivalent desktop/runtime files) performs a fast JavaScript syntax check.

There is no automated test suite. Manually verify the booking flow: booking, QR check-in, barber start/done actions, completion, and role/page navigation. Check both the 390px mobile cards and 1440px desktop cards after visual changes.

## Coding Style & Naming Conventions

Use two-space indentation in HTML, CSS, and JavaScript. Preserve existing plain browser JavaScript: avoid build-tool dependencies and framework-specific patterns. Keep shared styling token-driven—use semantic `--surface`, `--text`, `--accent`, and status variables instead of literal colors when a suitable token exists. Follow existing lower-case, hyphenated names such as `live-queue.card.html`; reserve leading-underscore files (for example, `_app.js`) for shared runtime assets.

Keep prototype content grounded in the established product voice: sentence case, Philippine pesos (`₱200`), 12-hour times (`2:00 PM`), and realistic booking data.

## Commit & Pull Request Guidelines

This workspace has no Git history, so no project-specific commit convention can be inferred. Use concise imperative subjects, for example `Add barber availability state`. Keep each commit focused. Pull requests should describe the affected screens and interaction states, link the relevant request when available, and include before/after screenshots for visual or flow changes. Note any regenerated artifacts and manual checks performed.
