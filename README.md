# naous.dev

Portfolio site for Naous Islam. One long page built with SvelteKit 3, Svelte 5 and TypeScript, deployed on Vercel from the `stable` branch.

## Develop

```sh
npm install
npm run dev
```

`npm run check` type-checks, `npm run lint` runs Prettier and ESLint, `npm run build` makes the production build.

## Conventions

How the code is organised, which shared components and tokens to use, and the content rules are in [CLAUDE.md](CLAUDE.md). Read it before changing anything; it applies to people as much as to coding agents.

In short:

- Colours are tokens in `src/app.css`. Components never hard-code one.
- Shared building blocks are in `src/lib/components/ui/`. Reuse them.
- Every word on the page is typed data in `src/lib/content/`.
- Motion helpers are in `src/lib/motion.ts`.

## Environment

Copy `.env.example` to `.env`. Variables are declared in `src/env.ts`.

| Variable                   | Purpose                                                                        |
| -------------------------- | ------------------------------------------------------------------------------ |
| `RESEND_API_KEY`           | Sends contact form messages. Without it, the dev server logs messages instead. |
| `CONTACT_TO`               | Optional. Defaults to `nao@naous.dev`.                                         |
| `CONTACT_FROM`             | Optional. The sender; its domain must be verified in Resend.                   |
| `TURNSTILE_SITE_KEY`       | Optional. Turns on the Cloudflare Turnstile bot check. Public.                 |
| `TURNSTILE_SECRET_KEY`     | Required when the site key is set. The site's domain must be on the widget.    |
| `UPSTASH_REDIS_REST_URL`   | Optional. Shares the contact form's rate limit across server instances.        |
| `UPSTASH_REDIS_REST_TOKEN` | Optional. Goes with the URL above.                                             |

## Deploying

Pushing `stable` deploys to Vercel (project `portfolio`). The project needs Node 22 or newer and the variables above set in its settings.

Still to do:

- Add the public résumé PDF (no phone number) at `static/resume.pdf`, then remove the `handleHttpError` allowance in `vite.config.ts`.
- Turn on Web Analytics for the project in Vercel.
