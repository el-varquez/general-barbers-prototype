---
name: general-barbers-design
description: Use this skill to generate on-brand screens, slides and assets for the General Barbers booking app (customer app, barber app, front desk dashboard), either as throwaway prototypes or as production-ready markup. Contains the tokens, the badge identity, the booking status model, the illustration library and the two app runtimes.
user-invocable: true
---

Read the readme.md in this folder first, then explore the other files — especially tokens/brand-general-barbers.css (what the brand owns), tokens/status.css (the five booking statuses) and components.css (the gb-* class layer). The two app runtimes live in ui_kits/mobile/_app.js and ui_kits/desktop/_dash.js; new screens are thin cards that load a runtime and set a preset.
If creating visual artifacts (slides, mocks, new screens), create static HTML files linking styles.css from the right relative path, set data-theme ("light" for reading pages, "dark" for app surfaces) on the root element, and take every color, font and radius from the tokens. Reuse components/gb-art.js for illustrations rather than adding photos.
If the user invokes this skill without any other guidance, ask what they want to build or change in the booking flow, then act as the product designer for the shop, outputting HTML artifacts or production code as needed.
