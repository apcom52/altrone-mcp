# Box

The shared visual primitive behind "chip-like" components — `Button`, `Badge`, `Tag`, `Avatar`, a card. Not for structurally complex components (`Splitter`, `Tabs`, `Slider`) — those use `Box` for individual internal parts, not as their whole implementation.

`Box` is SSR-safe and holds no React state: every interaction (`pressable`/`focusable`/`editable`) is implemented purely through CSS pseudo-classes.

## Import

```tsx
import { Box } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `shape` | `'rect' \| 'rounded' \| 'squircle' \| 'circle' \| 'pill'` | `'rounded'` | Corner **algorithm**. The rounding *amount* still comes from the inherited `--radius-outer` (concentric radius system) — `shape` doesn't set a radius value itself, except `rect` (forced `0`), `circle` (forced `50%`, and locks to a square aspect ratio), and `pill` (forced capsule ends — stays a capsule at any `size` or width, without constraining the aspect ratio). `rounded` (the default) floors at `--radius-mini` (`2px`), so a Box is never hard-square unless you ask for `shape="rect"`. `squircle` falls back to a plain `border-radius` (scaled by `--squircle-fallback-ratio`, see `radius`) wherever the CSS `corner-shape` property isn't supported. |
| `material` | `'solid' \| 'glass' \| 'plate' \| 'translucent' \| 'pale' \| 'transparent' \| 'outline' \| 'ghost' \| 'dotted'` | `'solid'` | Fill/blur/border treatment at rest — see table below. `plate` is a fixed neutral "raised glass control" (frosted fill + `--gray-a3` hairline + layered shadow); it reproduces the pre-Box default Button chrome and, unlike the others, does not tint with `tone` (only its text does). `pale` is `translucent`'s tint made opaque — use it instead of a dedicated "light" tone for a quiet neutral surface that shouldn't blend with what's behind it. |
| `tone` | `'neutral' \| 'accent' \| 'danger' \| 'success' \| 'warning' \| 'info'` | `'neutral'` | Semantic color. `danger`/`success`/`warning` are fixed hues; `info` aliases the consumer's chosen `accent` |
| `color` | `'red' \| 'orange' \| 'amber' \| 'green' \| 'teal' \| 'blue' \| 'indigo' \| 'purple' \| 'pink' \| 'brown' \| (string)` | — | Custom fill color, independent of the accent, taking priority over `tone`. A categorical hue name resolves to that hue's solid step (`--<hue>-9`); any other string is used as a raw CSS color. All materials work on top of it — `solid` fills with it (auto-contrasting text), the rest derive tints via `color-mix()`. |
| `size` | `'mini' \| 's' \| 'm' \| 'l' \| 'xl' \| number \| string` | `'m'` | A named tier controls min-height **and** internal padding. A number (px) or CSS string (`'8em'`, `'50%'`) turns the box into a **square** of that size (width = height). `width`/`height` take priority. Arbitrary sizes don't adjust padding — use `padding`. |
| `width` | `number \| string` | — | Explicit width (number = px). Overrides the width `size` would set. |
| `height` | `number \| string` | — | Explicit height (number = px). Overrides the height `size` would set. |
| `padding` | `number \| string \| { x?, y? }` | — | Internal padding, overriding the value the `size` tier sets (a number is px, a string is used verbatim e.g. `'var(--space-content)'`, an object sets each axis). Affects this box only — it does not change the radius of anything nested inside. |
| `radius` | `number \| string` | — | Seeds `--radius-outer` on this element (a number is px, a string is used verbatim, e.g. `'var(--radius-l)'`), starting a concentric radius scope — `rounded`/`squircle` round to it and nested boxes derive from it too. Ignored by `rect`/`circle`/`pill`. For `squircle`, this is the value used where `corner-shape` is supported; the plain-`border-radius` fallback is scaled by `--squircle-fallback-ratio` (`0.5`) so the corner doesn't look meaningfully rounder in older browsers. The correction is automatic. |
| `elevation` | `'flat' \| 'raised' \| 'sticky' \| 'overlay' \| 'modal' \| 'toast'` | `'flat'` | z-index + shadow, one role (see `Foundations/Elevation`) |
| `pressable` | `boolean` | `false` | Adds a two-step interaction — a lighter `:hover` preview and a fuller `:active` press (hover yields to press). Which property moves depends on `material` (see table). |
| `focusable` | `boolean` | `false` | Adds a `:focus-visible` ring, identical across every material |
| `editable` | `boolean` | `false` | For a `Box` wrapping a real form control: the "engaged" look triggers on `:focus-within` instead of hover/active |
| `asChild` | `boolean` | `false` | Radix Slot polymorphism — the only way to change the rendered element. `children` must be a single valid element when set. UA border, margin, font and underline of the element are reset. |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref |

All standard `HTMLAttributes` are also accepted (minus `className`/`style`, which come from `BasicComponentStyleConfig`).

### Materials — behavior table

| Material | Fill at rest | Blur | Border | On hover (`pressable`) | On press / engage |
|---|---|---|---|---|---|
| `solid` | 100% opaque (`tone`'s solid step) | — | — | `brightness(1.03)` | darkens — `brightness(0.92)` |
| `translucent` | semi-transparent | none | — | alpha → strong | alpha → strong + `brightness(0.97)` |
| `pale` | 100% opaque (same tint as `translucent`) | none | — | opaque → strong | opaque → strong + `brightness(0.97)` |
| `glass` | semi-transparent | yes (`backdrop-filter`) | — | `brightness(1.04)` | alpha → strong + backdrop saturation |
| `plate` | frosted (`--glass-background-color`, fixed — not tone-driven) | yes (`backdrop-filter`) | 1px `--gray-a3` hairline + layered contact/ambient shadow | `brightness(1.04)` | backdrop blur deepens + `brightness(1.1)` |
| `transparent` | none | — | none | translucent wash appears | wash → strong |
| `outline` | none | — | static | translucent wash appears | wash → strong + border strengthens |
| `ghost` | none | — | appears only on interaction | translucent wash appears | wash → strong + border appears |
| `dotted` | faint tinted wash + tone-driven dot pattern | — | 1px hairline (`tone`'s border) | wash → strong | wash → strong + border strengthens |

`dotted` is a **placeholder surface** — a "content goes here" stub, an empty drop target, an unset swatch. Tone-driven (the wash, the hairline and the dots all follow `tone`).

---

## Examples

### A status chip

```tsx
<Box material="translucent" tone="danger" size="s">
  3 issues
</Box>
```

### A category tag, colored independently of the accent

```tsx
<Box material="translucent" color="teal">Design</Box>
<Box material="translucent" color="indigo">Backend</Box>

// any CSS color also works:
<Box material="solid" color="#f0abfc">Custom</Box>
```

### An icon button, hand-built from Box

```tsx
<Box
  asChild
  shape="circle"
  material="solid"
  tone="accent"
  pressable
  focusable
  size="l"
>
  <button aria-label="Notifications" onClick={openNotifications}>
    <Bell size={16} />
  </button>
</Box>
```

### A search field (editable)

`editable` is meant for a `Box` that wraps a real `input`/`textarea` rather than rendering as one itself — the container lights up while the inner control has focus:

```tsx
<Box material="outline" tone="neutral" editable style={{ gap: 8 }}>
  <Search size={16} />
  <input placeholder="Search…" style={{ border: 'none', outline: 'none', background: 'transparent' }} />
</Box>
```

### A filter chip (pill)

`pill` forces fully-round capsule ends that survive any `size` or content width, unlike `circle` it doesn't lock the aspect ratio, and it ignores the ambient `--radius-outer`.

```tsx
<Box shape="pill" material="translucent" tone="accent" size="s" pressable>
  Active
</Box>
```

### An arbitrary size, or explicit width / height

An arbitrary `size` (number = px, or a CSS string) makes the box a square. For a non-square box use `width` / `height`, which win over `size`. None of them touch the padding.

```tsx
<Box material="solid" tone="accent" size={44} />        {/* 44×44 square */}
<Box material="solid" tone="accent" size="4em" />       {/* 4em square */}
<Box material="solid" tone="accent" width={120} height={40} />
```

### Nested inside a radius scope

```tsx
<Box shape="rounded" material="solid" tone="accent" />
{/* no ambient scope → --radius-mini (2px), the default floor */}

<div style={{ '--radius-outer': 'var(--radius-l)' }}>
  <Box shape="rounded" material="solid" tone="accent" />
  {/* picks up --radius-l from the ambient scope */}

  <Box shape="rect" material="solid" tone="accent" />
  {/* stays square regardless */}
</div>
```

### Seeding the radius scope

```tsx
<Box shape="squircle" material="glass" tone="neutral" radius={48}>
  A card with a specific radius, consistent across browsers
</Box>
```

`radius` just seeds `--radius-outer` on the element — equivalent to `style={{ '--radius-outer': 48 }}`, but it also means nested boxes stay concentric with it. Takes a token string too: `radius="var(--radius-xl)"`. For `squircle`, browsers without `corner-shape` support automatically get a smaller plain `border-radius` (`radius × --squircle-fallback-ratio`) so the corner doesn't read as noticeably rounder than the real squircle.

### Overriding the padding

```tsx
<Box material="outline" padding={4}>Compact</Box>
<Box material="outline" padding={{ x: 24, y: 6 }}>Wide, short</Box>
<Box material="outline" padding="var(--space-content)">Token</Box>
```

`padding` overrides the value the `size` tier would set and nothing else — it doesn't touch the radius of nested boxes.
