

## Problem Analysis

The bounce/jump when tapping the search box on mobile is caused by the interaction between multiple animation systems fighting each other:

1. **`motion.div layout`** on the search section (line 116-118 of Index.tsx) tells framer-motion to animate any position/size changes. When the hero collapses, this causes the search bar to animate its position shift -- but on mobile, the virtual keyboard opening simultaneously changes the viewport, creating a second layout recalculation. This produces the "bounce" effect.

2. **`AnimatePresence mode="wait"`** on the hero means the hero must fully exit (including its `height: 0` animation) before the mini-header enters, creating a visible gap frame.

3. The hero exit uses `height: 0, marginBottom: 0` which triggers a layout reflow mid-animation, and the `layout` prop on the search wrapper tries to smoothly animate that reflow -- but the two animations have different timing, causing the overshoot/bounce.

## Plan

**In `src/pages/Index.tsx`:**

1. **Remove the `layout` prop** from the `motion.div` wrapping the search section. This is the primary cause of the bounce -- it tries to animate the position change caused by the hero collapsing, but fights with the hero's own exit animation and mobile keyboard resize.

2. **Change hero `AnimatePresence` from `mode="wait"` to default mode** so the hero exit and mini-header entrance can overlap, preventing the jarring empty gap.

3. **Simplify the hero exit animation** -- remove `height: 0, marginBottom: 0` from the exit and just use opacity + y transform. Use `overflow-hidden` on the header wrapper instead, and let the content simply fade/slide out without collapsing height (which avoids the layout reflow that triggers the bounce).

4. **Wrap the hero in a container with a fixed `min-height`** on mobile so that when it disappears, the transition is purely visual (opacity/transform) rather than causing a DOM reflow that shifts the search bar's position.

Alternatively (simpler approach): Keep the height collapse but move the search bar to a fixed/sticky position during focus mode so it doesn't depend on the hero's layout at all. However, the cleanest fix is removing the `layout` prop and simplifying the exit.

## Technical Details

- Remove `layout` and `transition` props from the `<motion.div>` at line 116-118
- Change it to a plain `<div className="space-y-6">`
- Change `<AnimatePresence mode="wait">` (line 71) to `<AnimatePresence>`
- Simplify hero exit to `exit={{ opacity: 0, y: -20 }}` without height/margin collapse
- Add `overflow-hidden` to the hero wrapper so content clips cleanly during exit

