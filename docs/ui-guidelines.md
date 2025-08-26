# UI Guidelines (Tailwind + shadcn)

- Prefer shadcn/ui primitives; avoid ad-hoc CSS files.
- Rounded corners default to `--radius: 0.75rem` (see globals.css).
- Animations (if opted-in via Motion integration):
  - Use `MotionRoot` and central variants from `components/motion/transitions.ts`.
  - Respect `prefers-reduced-motion`.
- Accessibility:
  - Preserve focus-visible rings from shadcn.
  - Color contrast ≥ WCAG AA.
