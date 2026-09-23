# General Barbers booking app — design system and clickable mock

A standalone design system and interactive prototype for a booking, queue and check-in app for General Barbers, a barbershop with three branches in General Santos City (JP Laurel, Polomolok, Calumpang). Three surfaces share one system: the customer app, the barber app (the same app on a staff account) and the front desk dashboard.

Source: the shop's badge logo (uploads/general-barbers-logo.png) and a flow chart supplied at kickoff. No production codebase exists; everything here is authored from scratch as a pitch to the shop owner.

## The one idea

One QR code carries the whole visit. It is scanned three times, and each scan moves the booking through five statuses:

| Status | Who moves it | Where |
| --- | --- | --- |
| Booked | The customer pays the 50% downpayment | Customer app |
| In queue | Front desk scans the QR on arrival | Dashboard, front desk scan |
| In the chair | The barber scans the QR and taps Start cut | Barber app |
| Cut done | The barber taps Mark as done; the next customer is notified automatically | Barber app |
| Completed | Front desk scans again and collects the balance; the rating prompt goes out | Dashboard, front desk scan |

The dashboard's live queue can do every step by hand when a phone or the QR is down, and every manual step sends the same notification.

## The brand model

- **General Barbers** (`tokens/brand-general-barbers.css`, the `:root` default) is the only brand. The identity is the white badge (`uploads/logo-badge.png`, extracted from the shop's logo) on a textured green canvas (`--tex` over `--a-600`).
- The brand file owns the green-cast neutral ramp `--n-*`, the badge-green accent ramp `--a-*`, the fonts (Oswald for display, the system UI face for everything else), the radii, and the **app surface palette** `--app-*`: the phone and the dashboard are dark by design in every page theme.
- `data-theme="light"` is the reading theme for the cover, guideline cards and walkthrough asides; `data-theme="dark"` matches the app surfaces. Both are first-class.

## Token architecture

```
brand file (--n-* neutral ramp, --a-* accent ramp, fonts, radii, --tex, --app-*)
        ↓
semantic layer (tokens/semantic.css + status.css, per theme)
        ↓
components (components.css, gb-* classes) and the two app runtimes
```

Semantic roles: `--surface`, `--surface-raised/-sunken/-hover/-active/-inverse`, `--surface-page`, `--divider/--border/--border-strong`, `--text/-muted/-faint/-disabled/-inverse`, `--accent/-hover/-active/-contrast/-soft/-soft-text`, `--selection`, `--focus-ring`, `--shadow-sm/md/lg`, `--scrim`, and one status tone per booking state: `--status-{booked,queued,chair,done,complete,noshow}` (+ `-soft`/`-text`).

## Content fundamentals

- Plain, warm, sentence case. Verbs on buttons name what happens: "Start cut", "Mark as done", "Collect ₱100 & complete", "Post review". Never "Submit".
- Pesos everywhere (`₱200`, no decimals for a barbershop menu), 12-hour times (`2:00 PM`), dates as `Sep 3, 2026`.
- Real-feeling data always: booking `GB-0048`, Jay Reyes at chair 1, a skin fade at ₱200 with a ₱100 downpayment. Never lorem ipsum.
- Empty and waiting states give direction: "Show this QR at the front desk", "Chair open. Luis is next."
- Notifications say the one thing to do: "Your chair is ready. Go to Jay's chair now." or "You're up next. Check in at the front desk first."

## Visual foundations

- **Structure**: rounded cards on dark app surfaces, hairline borders from `--app-border`, no drop shadows inside the app except on the floating push banner and the modal.
- **Color**: one green, used as the badge canvas (`--a-600`) and as the bright accent (`--a-400`). Status tones carry every booking state. Amber marks the chair, blue marks a finished cut waiting for payment.
- **Type**: Oswald only where the badge lettering belongs (welcome headline, loading caption, storefront signage, deck titles). Everything else is the system face at 13 to 15px so the phone reads at arm's length.
- **Photography**: two of the shop's own photos, tinted partway into the brand green by the `.hero-photo` class: the JP Laurel storefront sign on the welcome screen (cropped so the sign fills the width) and the barbers at work on the sign-in screen. Any photo dropped into `uploads/` gets the same treatment.
- **Illustration**: a flat vector set in the badge's own style (`components/gb-art.js`): three storefronts, a barber-chair hero, six portrait avatars, six haircut silhouettes, a pseudo-QR, a camera viewfinder and a ticket. They stand in wherever the shop has no photo yet.
- **Motion**: one loading sequence, a push banner that slides in, a scan line on the viewfinder. Nothing else moves on its own; reduced motion is respected.

## Index

- `index.html` — the demo cover.
- `styles.css` — the single entry point (imports everything below).
- `tokens/` — `fonts.css`, `brand-general-barbers.css`, `spacing.css`, `typography.css`, `density.css`, `semantic.css`, `status.css`.
- `base.css` — body reset, links, focus, `.display/.eyebrow/.num/.mono`.
- `components.css` — the `gb-*` class layer: logo, buttons, status pills, cards, stat tiles, steppers, table, fields, toast, and the cover layout.
- `components/` — `gb-art.js` (the illustration library) and `primitives.card.html`.
- `guidelines/` — identity, color, type, booking statuses, roles and permissions, illustrations, the booking flow chart, and `open-questions.md`.
- `patterns/` — live status stepper, queue per chair, QR card, push banner, stat tiles.
- `ui_kits/mobile/` — the customer and barber apps as one runtime (`_app.js`, `_app.css`) opened at 23 preset screens. Every card is fully interactive from its preset.
- `ui_kits/desktop/` — the dashboard as one runtime (`_dash.js`, `_dash.css`, `_nav.js`) opened at 10 pages.
- `demo.js` — the demo chrome: beat counter, prev/next, theme toggle, phone bezel, walkthrough aside. Opened on a phone, a mobile card drops the chrome and fills the screen, and shows a one-time hint on adding it to the home screen.
- `manifest.json` + the icons in `uploads/` — the mobile cards are installable. Serve the folder over http (any static server), open `ui_kits/mobile/launch.card.html` on the phone, then Share → Add to Home Screen on iOS or Install app on Android. From the home screen it opens full screen with no browser bar, which is the intended mobile look.
- `presentation/` — the client deck (`Client Presentation.dc.html`) on `deck-stage.js`, with the same runtime files as the reference system.
- `uploads/` — the original logo, the extracted badge, the flow chart PNG.
- `screenshots/` — cover, deck and key screens.

## Open questions and roadmap

See `guidelines/open-questions.md`: the downpayment policy is unconfirmed, sales accuracy without a POS depends on capturing the payment method at completion, and the next customer is notified at Mark as done rather than at completion. The web admin now includes a minimal in-memory walk-in intake that joins the live queue. Not yet built: payment method on the complete step, editing a visit's services before completion, and reschedule or cancel flows.
