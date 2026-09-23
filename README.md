# General Barbers prototype

A static, clickable prototype for the General Barbers booking, queue, check-in, barber, front-desk, and owner experiences.

## View locally

Open `general-barbers/index.html` in a browser. No package installation or development server is required.

The main walkthrough includes:

- customer booking and downpayment
- QR check-in and live queue status
- barber start and completion actions
- front-desk settlement
- owner and staff dashboard screens

## Deploy to Vercel

Import this repository into Vercel and keep the default project settings:

- Framework preset: **Other**
- Build command: leave empty
- Output directory: leave empty
- Root directory: repository root

`vercel.json` redirects the deployment root to the presentation entry point at `general-barbers/`.

## Regenerate the prototype

The files in `general-barbers/` are derived from the source prototypes in the repository root. To regenerate them, run:

```powershell
node build-general-barbers.js
```

The build script contains local Meridian and image-cache paths. Verify those paths before running it.

## Manual checks

After visual or interaction changes, verify the booking flow, QR check-in, barber start/done actions, completion, and role/page navigation. Check both the 390px mobile cards and 1440px desktop cards.

