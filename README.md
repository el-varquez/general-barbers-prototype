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

## Deploy to GitHub Pages

Push the repository to GitHub, then open the repository's **Settings → Pages**. Under **Build and deployment**, select **GitHub Actions** as the source.

The included workflow publishes `general-barbers/` whenever a commit is pushed to `main`. After the first successful deployment, the prototype will be available at:

```text
https://<github-username>.github.io/<repository-name>/
```

You can also run the **Deploy General Barbers to GitHub Pages** workflow manually from the repository's Actions tab.

## Regenerate the prototype

The files in `general-barbers/` are derived from the source prototypes in the repository root. To regenerate them, run:

```powershell
node build-general-barbers.js
```

The build script contains local Meridian and image-cache paths. Verify those paths before running it.

## Manual checks

After visual or interaction changes, verify the booking flow, QR check-in, barber start/done actions, completion, and role/page navigation. Check both the 390px mobile cards and 1440px desktop cards.
