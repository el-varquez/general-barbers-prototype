# General Barbers — bound design system

This folder is the design-system binding the presentation links against. `styles.css` imports the real entry point two levels up (`../../styles.css`) and aliases the deck's token names (`--color-*`, `--font-heading`, `--font-body`, `--radius-*`) onto the semantic layer, so the deck and every card read the same tokens.

The full guidance lives in the root `readme.md`. `_ds_bundle.js` is the component bundle stub `presentation/ds-base.js` loads; this system ships plain HTML and CSS, so the bundle exposes nothing.
