# Image

A figure for editorial content — a photo, illustration, or diagram with an optional caption. The picture itself can be a plain URL (`src`), or any custom element passed as `children` (`next/image`, a raw `<svg>`, a `<picture>` with sources — anything). While the picture loads, a `Skeleton` placeholder covers the frame; a broken `src` falls back to a neutral placeholder instead of the browser's broken-image glyph. The frame is always horizontally centered within the component, even when `width` is narrower than its container. In `src` mode, the picture itself (not the frame) gets a hairline inset border (`--border-a1`) and a light `--elevation-raised-shadow` — the same shadow role `Tabs.Item`/`DatePicker`'s day use — only once there's an actual picture to show; the loading skeleton and the broken-image placeholder don't get either. `fit="contain"`/`"scale-down"`/`"none"` shrink the picture's own box to its content so both hug the rendered picture, not the empty letterbox space around it. `children` mode gets neither border nor shadow, and always fills the frame regardless of `fit` — an arbitrary picture is the consumer's own to style, and content without an intrinsic size (e.g. a bare `<svg>`) has nothing reliable to shrink-wrap to anyway.

## Import

```tsx
import { Image } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `src` | `string` | — | URL of the picture. Ignored when `children` is passed. |
| `alt` | `string` | `''` | Alt text for the `src`-mode `<img>`; also used as the broken-image fallback's `aria-label`. |
| `children` | `ReactNode` | — | Any custom picture element (`next/image`, `<svg>`, `<picture>`, a video poster, …), rendered instead of `src`. `fit`/`objectPosition` still apply to it — they target whatever `img`/`svg`/`video` ends up in the DOM, not a specific renderer. |
| `fit` | `'cover' \| 'contain' \| 'fill' \| 'none' \| 'scale-down'` | `'cover'` | CSS `object-fit` applied to the picture. |
| `objectPosition` | `string` | — | CSS `object-position`. |
| `width` | `number \| string` | `100%` | Frame width. A number is px. |
| `height` | `number \| string` | `auto` | Frame height. A number is px. |
| `radius` | `number \| string` | `var(--radius-l)` (12px) | Frame corner radius. A number is px. |
| `caption` | `ReactNode` | — | Caption rendered centered below the frame. Accepts any node, not just a string. |
| `isLoading` | `boolean` | — | Controls the preloader for custom `children` — there's no native element to listen to a load event on, so the consumer drives it explicitly. Ignored in `src` mode, which tracks loaded/error state on its own from the `img`. |
| `preloader` | `ReactElement` | a `Skeleton` | Overrides the default preloader. |
| `brokenIcon` | `ReactElement` | `ImageOff` | Overrides the icon shown when the picture fails to load. |
| `onLoad` | `(event: SyntheticEvent<HTMLImageElement>) => void` | — | Fires when the `src` image finishes loading. `src` mode only. |
| `onError` | `(event: SyntheticEvent<HTMLImageElement>) => void` | — | Fires when the `src` image fails to load. `src` mode only. |
| `ref` | `Ref<HTMLElement>` | — | Forwarded ref, to the root `<figure>`. |

All standard `HTMLAttributes` are also accepted on the root `<figure>` (`className`, `style`, `id`, ARIA attributes, …).

---

## Loading & error states (`src` mode)

- Starts in `loading` — the preloader (default: `Skeleton`) covers the frame while the native `<img>` loads underneath it (kept mounted, not `display: none`, so it can still fire `load`/`error`).
- On `load`, the preloader is removed and the picture is revealed.
- On `error`, a neutral placeholder replaces the picture entirely — an icon in a gray circular chip, the same treatment `Result` uses for its status glyph; the `alt` text (or a localized fallback) is announced via `aria-label`.
- Changing `src` re-arms the loading state from scratch.

## Custom picture (`children` mode)

- `Image` doesn't know when an arbitrary child element has "loaded" — there's no single event to hook. The preloader instead follows the `isLoading` prop directly: `true` shows it, `false`/`undefined` doesn't.
- Useful when the picture is rendered by something else — a framework's own image component (e.g. `next/image`), an inline `svg`, a chart — that Image only needs to frame and caption.
- The wrapper always fills the frame at 100%×100% here (unlike `src` mode's `contain`/`scale-down`/`none` shrink-to-content); give the child its own explicit size (e.g. `width="100%" height="100%"` on an `<svg>`) if it needs to fill that box.
- No border/shadow either — those are `src` mode's own picture styling. Add your own if the custom picture needs one.

---

## Examples

### Basic

```tsx
<Image
  src="https://example.com/fjord.jpg"
  alt="A fjord at sunset"
  caption="Fjord at sunset"
  width="100%"
  height={240}
/>
```

### Object-fit

```tsx
<Image src={photo} alt="Portrait" fit="contain" width={220} height={140} />
```

### Custom picture via `children`

```tsx
<Image fit="cover" width="100%" height={200} caption="Aurora over Reykjavik">
  <NextImage src={photo} alt="Aurora over Reykjavik" fill />
</Image>
```

```tsx
<Image fit="contain" width="100%" height={160}>
  <svg viewBox="0 0 100 100" role="img" aria-label="Abstract mark">
    <circle cx="50" cy="50" r="40" fill="var(--accent-9)" />
  </svg>
</Image>
```

### Custom preloader

```tsx
<Image isLoading={isPhotoReady} preloader={<Loading size={32} />}>
  <NextImage src={photo} alt="Misty forest path" onLoadingComplete={...} />
</Image>
```

### Caption

```tsx
<Image src={photo} alt="Landscape" caption="Source: NASA" />
```
