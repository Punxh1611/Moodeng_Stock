---
name: Moodeng Stock
description: The Playful Hippo Pantry — A tactile, pastel-toned household inventory & shopping tracker
colors:
  primary: "#FFB5B5"
  primary-dark: "#E88B8B"
  neutral-bg: "#FFF5F7"
  neutral-canvas: "#FFFFFF"
  neutral-ink: "#3D3329"
  neutral-pencil: "#8B7E6A"
  status-warn: "#FFE082"
  status-danger: "#EF9A9A"
  status-mint: "#C8E6C9"
  alert-danger: "#EF665B"
typography:
  display:
    fontFamily: "Mali, Sarabun, cursive, sans-serif"
    fontSize: "clamp(2rem, 5vw, 2.75rem)"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "normal"
  headline:
    fontFamily: "Mali, Sarabun, cursive, sans-serif"
    fontSize: "1.75rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "normal"
  title:
    fontFamily: "Mali, Sarabun, cursive, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "normal"
  body:
    fontFamily: "Mali, Sarabun, cursive, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "Mali, Sarabun, cursive, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "normal"
rounded:
  sm: "4px"
  md: "8px"
  lg: "12px"
  xl: "16px"
  card: "24px"
  pill: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  2xl: "32px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-ink}"
    rounded: "{rounded.xl}"
    padding: "8px 16px"
  button-primary-hover:
    backgroundColor: "{colors.primary-dark}"
  button-secondary:
    backgroundColor: "{colors.neutral-bg}"
    textColor: "{colors.neutral-ink}"
    rounded: "{rounded.xl}"
    padding: "8px 16px"
  button-danger:
    backgroundColor: "{colors.status-danger}"
    textColor: "{colors.neutral-ink}"
    rounded: "{rounded.xl}"
    padding: "8px 16px"
---

# Design System: Moodeng Stock

## Overview

**Creative North Star: "The Playful Hippo Pantry"**

Moodeng Stock is designed as an inviting, tactile digital pantry. It borrows the warmth and charm of a kitchen whiteboard and hand-pinned sticky notes, combining pastel softness with clean structure. Rather than overwhelming users with noisy cartoon clutter or cold enterprise grids, the interface balances minimalist order with delightful tactile details.

Every surface is purposeful, organized, and optimized for quick one-handed mobile interactions. Content is chunked into clear, spacious cards outlined with warm espresso ink strokes that give every element weight and tangibility.

**Key Characteristics:**
- **Warm Pastel Harmony:** Soft blush pinks, cream papers, and soft kitchen blues create an approachable, low-stress environment.
- **Tactile Chunky Edges:** Solid 2px–3px dark ink strokes ground interactive components, recalling wooden toys and stationery.
- **Balanced Order:** Minimalist layout discipline ensures cards align neatly in a responsive 2-column mobile grid without disorienting skew.
- **No-Native Dialogue Doctrine:** All feedback uses custom in-app doodle toasts and mascot alerts, completely banishing sterile browser popups.

## Colors

The palette balances cozy bakery tones with fresh kitchen pastel accents.

### Primary
- **Piggy Pink** (#FFB5B5): The soul of the design system. Used for primary buttons, active tab underlines, brand badges, and scrollbar thumbs.
- **Deep Piggy Pink** (#E88B8B): Grounded hover state and bold border outline for primary pink components.

### Secondary
- **Fresh Mint** (#C8E6C9): Success states, fresh inventory indicators, and positive alerts.
- **Honey Warm** (#FFE082): Cautionary low-stock flags and note highlights.
- **Strawberry Red** (#EF9A9A): Soft danger warnings, zero-stock badges, and delete indicators.
- **Vivid Coral** (#EF665B): High-visibility error toast bar.

### Neutral
- **Blush Paper** (#FFF5F7): Secondary container background, tab header background, and card inner wells.
- **Cream Canvas** (#FFFFFF): Clean base canvas and card surface color ensuring high legibility.
- **Espresso Ink** (#3D3329): Deep warm brown used for all body text, headings, icons, and chunky structural borders.
- **Pencil Taupe** (#8B7E6A): Muted secondary labels, timestamps, unit indicators, and placeholder notes.

### Named Rules
**The Espresso Outline Rule.** Never use pitch-black (#000000) for borders or text. Always use Espresso Ink (#3D3329). It preserves warmth while providing strong visual contrast.

**The Functional Pastel Rule.** Soft pastels (Piggy, Mint, Honey) are strictly paired with dark ink text. They are never paired with white text unless backed by a high-contrast state token like Vivid Coral (#EF665B).

## Typography

**Display Font:** Mali (with Sarabun, cursive, sans-serif)  
**Body Font:** Mali (with Sarabun, cursive, sans-serif)  
**Label/Mono Font:** Mali  

**Character:** Friendly, rounded Thai handwriting with open loops and cheerful bounce, remaining remarkably legible at compact mobile sizes.

### Hierarchy
- **Display** (Bold 700, clamp(2rem, 5vw, 2.75rem), line-height 1.1): Hero banners and prominent quantity counters.
- **Headline** (Bold 700, 1.75rem / 28px, line-height 1.2): Main page headers and modal titles.
- **Title** (Bold 700, 1.25rem / 20px, line-height 1.3): Card headings, dialog section titles, and tab labels.
- **Body** (Regular 400, 1rem / 16px, line-height 1.5): Standard descriptive text, table cells, and sticky note contents.
- **Label** (Bold 700, 0.875rem / 14px, line-height 1.2): Badges, button labels, units, and secondary meta details.

### Named Rules
**The Friendly Hand Rule.** Typography across all levels must consistently use Mali to uphold the handwriting aesthetic. If foreign scripts or icons are rendered, they must harmonize with rounded sans-serif geometry.

## Layout

- **Mobile-First 2-Column Grid:** The inventory list displays as a 2-column grid (`grid-cols-2`) on mobile viewports (≤640px) to maximize visible item density without feeling cramped.
- **Container Boundary:** Max-width constrained to centered 640px–768px viewports on desktop to retain the cozy app feel.
- **Consistent Rhythms:** Vertical rhythm adheres to 4px / 8px / 12px / 16px steps with generous 16px–24px bottom clearance for sticky mobile bars.

## Elevation & Depth

Moodeng Stock is flat-by-default and relies on chunky physical contours rather than blurry elevation.

- **Depth via Stroke:** Depth and boundary are communicated through 2px–3px solid Espresso Ink (#3D3329) or Deep Piggy (#E88B8B) borders.
- **Subtle Grounding Shadows:** Small, sharp offsets (`box-shadow: 0 2px 4px rgba(61, 51, 41, 0.08)`) are applied to cards and buttons to lift them slightly from the canvas without introducing muddy blur.
- **Interactive Lift:** On hover or active tap, buttons and cards subtly scale (`scale-105`) and shift elevation.

### Named Rules
**The Ink-Before-Shadow Rule.** Never rely solely on shadow to separate overlapping white-on-paper surfaces. Every card must carry an explicit ink border or distinct background tint.

## Shapes

- **Generous Radii:** Interactive containers use 16px (`rounded-xl`) to 24px (`rounded-[1.5rem]`), avoiding harsh 90-degree corners.
- **Circular Badges:** Status badges, increment buttons, and category badges use circular pills (`rounded-full`).
- **Organic Doodle Borders:** The signature `DoodleBorder` uses SVG dashed strokes (`strokeDasharray="10 4 20 5 8 3"`, rx 12, ry 14) to introduce hand-drawn charm to banners and summaries.

## Components

### Buttons (DoodleButton)
- **Shape:** Rounded-xl (16px) or Rounded-full (9999px) with 2px solid Espresso Ink border.
- **Primary:** Piggy Pink background with Espresso Ink text.
- **Secondary:** Blush Paper background with Espresso Ink text.
- **Danger:** Strawberry Red background with Espresso Ink text.
- **Ghost:** Transparent background with subtle Piggy tint on hover.
- **Interaction:** Scales to 105% with slight -1deg tilt on hover; disabled state drops opacity to 50% without tilt.

### Cards (ItemCard)
- **Shape:** 24px radius (`rounded-[1.5rem]`) with 3px solid ink border.
- **Status Tints:** White for normal stock, Light Yellow (#FFFBEB) with Honey border for low stock, Light Red (#FEF2F2) with Strawberry border for zero stock.
- **Always-Visible Actions:** Quick +/- stepper buttons are always visible at the bottom of the card (no hover requirement).

### Alerts & Modals (ToastAlert & ItemDetailPopup)
- **ToastAlert:** Floating top banner with 8px radius, icon indicator, and clear dismiss button. Error alerts use Vivid Coral (#EF665B) with white text.
- **ItemDetailPopup:** Fixed overlay with dark ink backdrop blur, 24px rounded paper card, and wiggle entry animation.

### Tabs (TabBar)
- **Shape:** Rounded-top tabs with 2px bottom ink border.
- **Active State:** Piggy Pink background, bold Espresso Ink text, and dark active indicator.

## Do's and Don'ts

### Do:
- **Do** keep action buttons visible at all times on cards to support mobile touch screens.
- **Do** use Espresso Ink (#3D3329) for borders, text, and icons instead of pure black.
- **Do** persist shopping cart and draft state to Local Storage across tab switches.
- **Do** use custom SVG doodle icons and mascot badges for feedback.

### Don't:
- **Don't** invoke native browser dialogs (`window.alert`, `window.confirm`, `window.prompt`).
- **Don't** hide critical buttons behind hover states (`group-hover:opacity-100`).
- **Don't** introduce pure black (#000000) or cold corporate blue palettes.
- **Don't** stretch item lists into a single wide desktop table; maintain the cozy card grid.
