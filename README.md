# Shared Moment

Shared Moment is a simple, mobile-first PWA class project about making social events feel easier to navigate. This version is an **in-person activity tool**, not a live matching service. Guests can choose a conversation situation, take turns answering a question, compare private “this or that” choices on one phone, or try a tiny mission together. Each activity has multiple rounds and can be skipped. It also has Home, Explore, Play, and About screens. There is no sign-in, event creation, database, messages, analytics, or personal-data form. Activity state lives only in the current browser tab's memory and resets on refresh.

## Run locally

Use Node.js 20.9 or newer and pnpm:

```sh
pnpm install
pnpm dev
```

Open `http://127.0.0.1:3000`. If port 3000 is occupied, use the address printed by Next.js. No environment variables, Supabase project, email service, or domain are needed.

For an easy local preview of the built site, double-click `Open Shared Moment.command` in Finder. Keep its Terminal window open while viewing `http://127.0.0.1:3002/`; closing that window stops the local preview. A localhost address is available only on your own computer while its server is running. If your browser still shows the offline help page after starting the server, reload the tab.

## Build and test

```sh
pnpm typecheck
pnpm test
pnpm build
```

The static site is exported to `out/`. For a production preview, serve that folder with any static HTTP server. Deployment requires an HTTPS static host for PWA installation outside localhost.

## Deploy with Vercel

Import the public `annieko-sys/shared-moment` GitHub repository into Vercel. Use the Next.js framework preset, the repository root, and the `pnpm build` build command. The project uses Next.js static export. No environment variables or paid integrations are required. Pushes to `main` trigger new production deployments when the Git integration is connected.

After deployment, open the HTTPS production URL on a phone. In Safari, use Share → Add to Home Screen; in supported Android browsers, use the browser's install option. The local `127.0.0.1` preview address is not a public website.

## PWA behavior and privacy

`public/manifest.webmanifest` contains the app name, theme, and icons. The service worker caches only the generic offline page, manifest, and public icons. Page navigations use the network and fall back to the offline help page when unavailable. It does not cache visitor input or private content. No browser permissions are requested.

This version does not use the earlier Supabase project or Resend account. Those external resources remain in their respective dashboards; the website has no connection to them. Remove any unused project/domain there only if you decide you no longer need them.
