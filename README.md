# PASSUS — integrated storefront & Content Studio

This release updates the original PASSUS project. It is a **saved candidate**, not a published upgrade. The production URL remains https://passus-footwear.brownmole64.chatgpt.site/ . Do not deploy, replace DNS, or create paid hosting until the owner approves the launch plan.

The React/Vinext storefront retains PASSUS navigation, Messenger links, carousel motion, catalogue, galleries and checkout. Products, all three hero slides and website text/theme settings live in D1; uploaded images live in R2. Content changes do not require rebuilding: active storefronts refresh every 15 seconds and on focus, and same-browser tabs are notified after saves.

## Run and edit with VS Code

Use Node.js 24 and pnpm 11.25.0 (the lockfile is included). Open the extracted project folder in VS Code. On Windows, WSL is recommended for the supplied build scripts.

```sh
pnpm install --frozen-lockfile
pnpm typecheck
pnpm test
pnpm build
```

`pnpm dev` starts the local development app. Independent authentication uses Secure cookies, so test real sign-in over HTTPS; do not weaken cookies for an HTTP preview. For production, use the owner-controlled Cloudflare instructions in `docs/ownership/DEPLOYMENT.md`. Sites builds retain the supported `sites()` integration and `.openai/hosting.json` project identity.

## Administrator setup

1. Configure a private `PASSUS_SETUP_TOKEN` (at least 32 random bytes) and `PASSUS_SETUP_EMAIL=tanviul03@gmail.com` in the hosting environment. Use the environment template in `docs/ownership/`; never put real secrets in Git.
2. On the approved HTTPS site, open `/admin`. Enter that email and one-time setup key, then choose a new PASSUS-specific password of 12–128 characters. Never enter a Gmail/email-account password.
3. Remove the setup secret from the hosting environment after setup. The primary owner is protected in the database and cannot be disabled or deleted through the dashboard.
4. Use Administrators to invite up to two more people. Invitations reserve places, last 24 hours and work once. Share their links privately. Pending invites can be disabled/removed. Admins cannot manage other admins.
5. Disable/remove users or revoke their sessions immediately. Password-reset links expire after 30 minutes. Self-service reset email requires your own configured Resend account and verified sender; otherwise the owner can issue a private reset link. Losing the sole owner password before email recovery is configured requires a trusted hosting operator to perform database recovery.

The old ChatGPT-native owner/session tables are retained as historical data but grant **no access** to this release. Login does not transfer hosting ownership. The current Sites project remains controlled by its original ChatGPT account until a genuine ownership migration is completed.

## Products and photographs

Products supports add/edit, BDT prices, descriptions, category, audience, sizes, colour, feature flag, hide/show and reversible Trash. Every edit uses a version check to avoid overwriting another administrator's changes. Orders are not deleted with products.

Select JPEG, PNG or WebP images from your phone or computer, up to 8 MB each. Thumbnails appear in the editor; uploading, processing, failed/retry and stored-but-unsaved states are separate. The server checks file bytes and dimensions, writes to R2, reads the stored file back, and verifies its SHA-256 before reporting upload success. Identical bytes reuse one object. Files are not recoloured, AI-generated, recompressed or cropped.

A gallery holds up to 12 unique images. The **saved counter** comes from the saved product, not the upload queue. The draft count is shown separately. Preview, reorder, replace and remove photos, then Save product. Pending/failed uploads block saving. Success is confirmed against an authenticated database read and the public catalogue. Hidden products are correctly reported as hidden. Removing gallery links retains the stored originals for backup.

If a session expires, sign in again in another tab, return to the editor, and reconnect before retrying. Keep the editor open to retain its draft.

## Site Editor

Edit primary/secondary/accent/background/heading/text/button colours, homepage and footer text, supported section visibility and all three hero slides. Slide controls include headline, description, CTA/category, labels, theme and separate desktop/mobile photo alignment. The complete shoe photo uses `object-fit: contain`.

Preview storefront opens an in-page draft preview at selectable widths (320–1280 px); this does not save or publish. Save website settings and each Save slide button separately. Unsaved changes trigger navigation warnings. The primary colour controls brand/hero accents; heading colour controls ordinary section headings. Film/category headings retain their light-on-dark treatment.

## Commerce remains unchanged

The existing store is still in **preview checkout mode**, with no verified bKash merchant details configured. This upgrade does not activate payment collection. It retains 64 Bangladesh districts, server-calculated prices/deposits, request idempotency and manual payment-verification safeguards. Configure verified merchant and business policies separately before accepting real payments.

## Source map

| Area                                    | Files                                                            |
| --------------------------------------- | ---------------------------------------------------------------- |
| Storefront, responsive UI and checkout  | `app/components/`, `app/globals.css`                             |
| Independent login and dashboard         | `app/admin/`, `lib/admin/auth.ts`, `lib/admin/accounts.ts`       |
| Catalogue and upload APIs               | `lib/admin/service.ts`, `lib/admin/uploads.ts`, `lib/catalog.ts` |
| Website settings                        | `lib/site-settings.ts`, `app/admin/SiteEditor.tsx`               |
| Schema and additive migrations          | `db/schema.ts`, `drizzle/`                                       |
| Backup, restoration and migration tools | `scripts/ownership/`                                             |
| Owner-controlled hosting & recovery     | `docs/ownership/`                                                |
| Verification and remaining launch gates | `docs/admin/TEST-RESULTS.md`                                     |

No passwords, setup tokens, mail keys, Cloudflare credentials or live database snapshots belong in the source export. The encrypted business backup and its recovery key are separate deliverables.
