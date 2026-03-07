

## Replace Logo with Colored BookOpen Icon

Update `src/components/LanglyLogo.tsx` to render a custom SVG based on BookOpen, with subtle flag-inspired color accents:

- **Left page**: subtle warm gold/amber gradient (from German flag's gold)
- **Right page**: subtle navy/steel blue (from UK flag's blue)
- **Spine/binding**: deep charcoal or dark red (shared by both flags, understated)

The colors will be muted and desaturated so they read as a sophisticated palette rather than literal flags. The icon uses `currentColor` for the outer stroke to stay consistent with light/dark themes.

Implementation: Replace the PNG `img` tag with an inline SVG in `LanglyLogo.tsx`, keeping the existing `size` prop API (`sm`/`md`/`lg`) mapped to dimension classes.

