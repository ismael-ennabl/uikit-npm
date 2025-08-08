# Migration Guide: Adopting the UI Kit

This guide explains how this app consumes the shared UI kit in /lib and how to migrate components safely.

1) Source of truth
- The library in lib/ is canonical for Shadcn/Radix wrappers and foundational UI.
- App-level files in src/components/ui should re-export from lib unless they purposely override behavior or styles.

2) Import paths
- Prefer imports from the app alias paths for usage in src:
  import { Button } from '@/components/ui/button'
- Under the hood, many of these re-export from lib/components/ui/*.

3) Re-export pattern
- A typical src wrapper now contains only:
  export * from '../../../lib/components/ui/<component>'
- Keep an app override only when you need custom variants specific to this app.

4) Design tokens
- Use semantic Tailwind tokens only: background, foreground, muted, accent, input, border, primary, secondary, destructive, brand-blue, etc.
- Avoid raw hex values and Tailwind gray/blue scales directly in components.

5) Badge variants
- The kit’s Badge variants now include semantic options (new, processing, soon, restricted) using tokens.
- Use: <Badge variant="new" /> etc.

6) Common class name mappings
- text-gray-500/600 -> text-muted-foreground
- text-gray-900/black -> text-foreground
- border-gray-200/300 -> border-border
- bg-gray-100/200 -> bg-muted
- blue tints like bg-blue-50 -> bg-brand-blue/10 (or use component variants/CTA tokens)
- #0000C5 -> brand tokens (text-brand-blue, bg-brand-blue, hover:bg-brand-blue/90)

7) Theming
- All colors are HSL via CSS variables in index.css and Tailwind config.
- Do not hardcode colors; use semantic tokens.

8) Testing
- Run a smoke test (render pages, check console) and validate light/dark modes.

Questions? See lib/README.md and src/styles/tokens.ts for token references.
