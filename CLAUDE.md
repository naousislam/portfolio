# naous.dev

Naous Islam's portfolio. One long scrolling page whose only job is to get a business owner or
hiring manager to send a message. SvelteKit 3, Svelte 5 (runes), TypeScript, plain CSS,
deployed on Vercel from the `stable` branch.

## Commands

```sh
npm run dev      # local dev server
npm run check    # svelte-check (types)
npm run lint     # prettier --check, then eslint
npm run format   # prettier --write
npm run build    # production build
```

Run `check` and `lint` before calling any change done. On Windows `npm run build` compiles and
prerenders, then fails at the Vercel adapter's last step (`EPERM ... symlink`). That is a
Windows limitation, not a code error. Any other build error is real.

## Where things live

```
src/
  app.css               design tokens, base styles, shared utility classes
  app.html              page shell; inline script that applies a remembered dark theme
  env.ts                every environment variable, declared once
  lib/
    content/            every word on the site, as typed data (+ types.ts)
    components/
      ui/               shared building blocks
      sections/         one component per page section, plus its private parts
      SectionNav.svelte the floating bottom bar (section links + theme toggle)
    server/             server-only code: email template, rate limit, Turnstile check
    motion.ts           scroll reveal, sliding highlight, content-swap transitions
    theme.ts            light/dark switching
    turnstile.ts        browser half of the bot check
    assets/             images imported by components
  routes/
    +page.svelte        home: stacks the sections, sets SEO tags. Prerendered.
    contact/            the form action (+page.server.ts) and its no-JavaScript fallback page
    sitemap.xml/        prerendered sitemap
static/                 favicon set, og.png, robots.txt, webmanifest
```

## The rules that keep it consistent

### 1. Colour comes from tokens, never from a component

Every colour is a custom property in `src/app.css`. The dark theme re-points the same tokens
under `:root[data-theme='dark']`. A component must never contain a hex, rgb or named colour.
The only exceptions are shadows and the fixed peach backdrop behind the portrait.

| Token                                                       | Meaning                                                                                                           |
| ----------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `--bg` / `--surface` / `--card` / `--raised`                | The four layers, each sitting on the one before. In dark they are distinct tone steps because shadows don't show. |
| `--ink`, `--ink-soft`, `--muted`, `--muted-soft`, `--faint` | Text, strongest to weakest.                                                                                       |
| `--ink-fill` + `--on-fill`                                  | A filled shape (primary button, active tab, nav highlight) and the text on it.                                    |
| `--peach` + `--on-peach`                                    | The accent and the text or icon on it. `--on-peach` is dark in both themes.                                       |
| `--line`, `--line-strong`, `--ring`                         | Rules, borders, decorative strokes.                                                                               |
| `--ease`                                                    | The one easing curve for every transition.                                                                        |
| `--page-max`, `--gutter`, `--section-gap`                   | Page column, side padding, space between sections.                                                                |

To change a colour everywhere, change the token. "Make the primary button blue" means editing
`--ink-fill`, which also restyles the active tab and nav highlight, because they are the same
idea. If only buttons should change, give `Button.svelte` its own token; do not hard-code.

Sizes (spacing, font sizes, radii) are **not** tokenised yet. They are literal values in each
component, ported from the approved design. Don't invent a partial scale; if a scale is added,
apply it everywhere in the same change.

### 2. Reuse the building blocks in `ui/`

Before writing markup and CSS for something, check whether it already exists:

| Need                                      | Use                                                                     |
| ----------------------------------------- | ----------------------------------------------------------------------- |
| A pill button or pill link                | `Button` (`variant="primary" \| "outline"`, `href`, `external`, `icon`) |
| A round icon button                       | `RoundButton`                                                           |
| A small pill label                        | `Chip` (`tone="card" \| "raised" \| "peach"`)                           |
| A peach circle holding an icon or number  | `IconBadge`                                                             |
| The centred label above a section         | `SectionLabel`                                                          |
| A headline with italic serif accent words | `AccentHeadline` (data shape: `Headline`)                               |
| Three numbers with labels                 | `StatRow` (`size="large" \| "compact"`)                                 |
| A dialog                                  | `Modal` (native `<dialog>`; bind `open`)                                |
| An underlined "Read more →" link          | class `text-link` (app.css)                                             |
| The small grey heading inside a modal     | class `small-label` (app.css)                                           |
| Italic serif accent                       | class `accent`                                                          |
| Page column / section spacing             | classes `container`, `section`                                          |
| Show on one size only                     | classes `only-desktop`, `only-phone` (breakpoint: 860px)                |

If a pattern appears a second time and isn't in this table, extract it into `ui/` (or a class
in app.css when it must work on different elements) and add a row here. Don't copy the CSS.

A component in `sections/` owns its layout and one-off styling in a scoped `<style>` block.
It may position a `ui/` component through a class prop and `:global(.that-class)`, but must
not restyle its colours or shape.

### 3. Words live in `content/`, not in components

All copy is typed data in `src/lib/content/*.ts`. Components render it; they don't contain
sentences. The few interface strings in components ("Read more", aria labels) are the
exception.

The copy is governed by the owner's content spec:

- **Never add, change, round or estimate a number.** Only figures the owner supplied.
- The fitness employer is "a 17-location fitness company". **Never name it.**
- No employer or client screenshots, data, internal names, file paths or URLs. Project
  pictures are the abstract drawings in `ProjectVisual.svelte`.
- Mai is "built and tested on Monody's own workspaces, not yet released to customers".
- Tool logos come from Simple Icons; interface icons from Lucide. Never draw a company's logo.
- Tone: plain, warm, modest, first person. No buzzwords.
- Anything that names or labels is in Title Case: buttons, links, chips, badges, tabs, section
  labels, card and modal headings, number labels ("Start a Project", "What I've Built",
  "Qualified Leads a Month"). Short joining words stay lower case (a, the, and, of, on, to,
  in, by, as, with, from).
- Anything that is a sentence stays in sentence case and ends with a period: paragraphs,
  one-line descriptions, and the hints under the contact links.

### 4. Motion goes through `motion.ts`

- Scroll reveal: `{@attach reveal(delayMs)}`.
- A highlight that slides between items: `slidingPill()` (Svelte `crossfade`).
- Content that swaps in place: `in:fly={swapIn} out:fade={swapOut}` inside one grid cell.
- CSS transitions use `var(--ease)`.
- A looping animation may only animate `opacity` and `transform`. Anything else (colour,
  width, `left`, shadows) makes the browser redraw on every frame and drops the frame rate
  on phones. To "change colour", fade a second shape in on top.
- Anything that loops forever sits inside `{@attach pauseOffscreen()}` so it stops when it
  can't be seen. Avoid `backdrop-filter` and animated `filter` on phones.
- Reduced motion stops only **continuous** movement (orbits, travelling dots, loops). Fades
  and slides stay. Give endless animations the `continuous` class or their own
  `prefers-reduced-motion` rule.

### 5. Use the platform and SvelteKit before writing your own

- Forms: SvelteKit form actions + `use:enhance`. No client-side fetch for form posts.
- Dialogs: native `<dialog>` via `Modal`. Carousels: Embla (`embla-carousel-svelte`).
- Images: `<enhanced:img>` with a `?enhanced` import.
- Same-page links are plain `<a href="#id">`; `SectionNav` makes them all land centred.
- No secrets in the repo. `.env` is ignored; `.env.example` is committed and holds no values.

## SvelteKit 3 specifics (different from older tutorials)

- Config is in `vite.config.ts`. There is no `svelte.config.js`.
- Import from `#lib/...`, with the file extension for `.ts` files:
  `import { site } from '#lib/content/site.ts'`.
- Environment variables are declared in `src/env.ts` with `defineEnvVars` and imported from
  `$app/env/private` or `$app/env/public`. Add a variable there first.
- `dev` and `browser` come from `$app/env`.
- Svelte 5 runes only: `$props`, `$state`, `$derived`, `$effect`, snippets, `{@attach}`.
  No `export let`, stores, slots or `on:` directives.
- Class lists use the array/object form: `class={['card', { focused }]}`.

## Things that are duplicated on purpose

- `src/lib/server/contact-email.ts` has its own copy of the colours, because email clients
  can't read CSS variables. Change it by hand when the palette changes.
- The dark page colour appears in `app.css`, `theme.ts` and the inline script in `app.html`.

## Git and deploy

- `stable` is the production branch; pushing it deploys naous.dev on Vercel
  (project `portfolio`, team `naous-projects`). Do work on a branch.
- Never push, merge to `stable`, or change Vercel settings without the owner saying so.
- The repo is public. Check `git status` for anything private before committing.
