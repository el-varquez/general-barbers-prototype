# Open questions

Decisions the prototype takes a position on, and what still needs the shop's answer.

## 1. Is the 50% downpayment real?

No public source confirms that General Barbers requires a downpayment. Their Facebook page (facebook.com/generalbarbersph) is behind a login wall and no directory lists a booking policy. The prototype pitches 50% via GCash or Maya as the anti-no-show mechanism; the deck frames it as a proposal. Ask the shop directly at +63 919 687 3013 before the pilot.

## 2. Sales without a POS

Every completed booking adds its service price to the report, so the sales figures stay true as long as:

- the front desk taps "Collect balance & complete" only when the money is actually collected;
- the complete step records the payment method (cash, GCash, Maya) and who tapped it, so the end-of-day cash count can be checked against the report;
- walk-ins are entered as walk-in bookings, and add-ons or discounts are edited onto the booking before completion.

None of those three are built yet. They are the first things to add for the pilot.

## 3. When is the next customer called?

The prototype notifies the next customer the moment the barber taps Mark as done, because that is when the chair is free. Waiting for the front desk's completion scan would leave the barber idle while the previous customer pays. If the shop prefers to hold the call until the balance is collected, it is a one-line change in both runtimes.

## 4. Staff accounts

Barbers never self-register. The owner adds them under Users and roles with the email or number they sign in with; the app matches the sign-in and applies the role. Anyone else who signs in is a customer. Confirm which sign-in each barber actually uses (many will be Facebook).

## 5. The welcome and sign-in photos

The welcome screen uses the shop's own sign (`uploads/hero-sign.jpg`, a close crop of the JP Laurel storefront) zoomed so the lettering fills the width; the sign-in screen uses the barbers at work (`uploads/hero-barbers.jpg`). Both are the shop's photos, tinted partway into the brand green by CSS (`.hero-photo` in `ui_kits/mobile/_app.css`), so any replacement photo dropped in gets the same look. The wider storefront (`uploads/hero-storefront.jpg`) and the interior shot (`uploads/hero-interior.jpg`) are kept as alternatives. Confirm the shop is happy for the barbers' photo to appear in the app.

## 6. Not yet built

Reschedule and cancel flows, editing services on a visit, the payment method on completion, branch-level views for managers, and any real integration with GCash or Maya. The current walk-in intake is a minimal in-memory prototype; persistence and cross-device synchronization remain production work.
