# Slider

A slider input for selecting a numeric value within a range. Fully controlled, built with a custom pointer-drag implementation. Supports horizontal and vertical orientations, keyboard navigation, and a read-only display mode.

Two visual variants:

- `default` — a thin track with a round thumb, the shape a native range control has almost everywhere. The filled part uses a solid accent fill. This is the default.
- `fill` — the iOS Control Center slab: the whole control is the track and its fill level is the handle (glass surface, value and icon shown inside). Expressive but heavy for a dense form.

In both variants the current value is shown in a solid chip, so it stays readable against the fill. For `default`, that chip is anchored to the thumb through a portal, so it is never clipped by a scrolling or `overflow: hidden` ancestor (a `Drawer` body, a `Popover`, a table cell). The `fill` variant keeps its chip inside the slab.

## Import

```tsx
import { Slider } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — | **Required.** Controlled current value |
| `onChange` | `(value: number, event: PointerEvent \| KeyboardEvent) => void` | — | **Required.** Called on every value change during drag and on keyboard input |
| `onChangeEnd` | `(value: number, event: PointerEvent \| KeyboardEvent) => void` | — | Called when a drag ends (`pointerup`) or a keyboard key is released. Use this to avoid firing expensive side effects on every pixel of drag. |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Step increment |
| `variant` | `'default' \| 'fill'` | `'default'` | `'default'` = thin track + round thumb; `'fill'` = iOS Control Center slab |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Slider orientation |
| `size` | `Size` | `'m'` | `'mini' \| 's' \| 'm' \| 'l' \| 'xl'` — drives track thickness, thumb diameter, and (for `fill`) slab height |
| `showCurrentValue` | `'active' \| 'always' \| false` | `'active'` | When to show the current value label. `'active'` = only while dragging, `'always'` = always visible, `false` = never. |
| `renderLabel` | `(value: number) => ReactNode` | — | Custom label renderer. Used for the displayed value and `aria-valuetext`. |
| `icon` | `ReactElement` | — | Icon displayed at the start of the track |
| `disabled` | `boolean` | `false` | Disables all interaction |
| `readOnly` | `boolean` | `false` | Shows a static label instead of an interactive slider |
| `name` | `string` | — | Name for the hidden `<input>` (for form submission) |
| `activeClassName` | `string` | — | Extra class name for the filled portion of the track |
| `activeStyle` | `CSSProperties` | — | Inline styles for the filled portion of the track |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

All standard `HTMLAttributes<HTMLDivElement>` are also accepted.

---

## Keyboard Navigation

| Key | Action |
|-----|--------|
| `ArrowLeft` / `ArrowDown` | Decrease by `step` |
| `ArrowRight` / `ArrowUp` | Increase by `step` |
| `Home` | Jump to `min` |
| `End` | Jump to `max` |

---

## Examples

### Basic

```tsx
const [volume, setVolume] = useState(50);
<Slider value={volume} onChange={(v) => setVolume(v)} />
```

### With min, max, step

```tsx
<Slider
  value={opacity}
  onChange={(v) => setOpacity(v)}
  min={0}
  max={1}
  step={0.01}
/>
```

### Only update on drag end (onChangeEnd)

```tsx
<Slider
  value={quality}
  onChange={(v) => setQuality(v)}       // local preview
  onChangeEnd={(v) => saveQuality(v)} // persist only when done
  min={1}
  max={100}
/>
```

### Always show value label

```tsx
<Slider
  value={brightness}
  onChange={(v) => setBrightness(v)}
  showCurrentValue="always"
/>
```

### Custom label format

```tsx
<Slider
  value={price}
  onChange={(v) => setPrice(v)}
  min={0}
  max={1000}
  renderLabel={(v) => `$${v}`}
  showCurrentValue="always"
/>
```

### Fill variant (Control Center slab)

```tsx
<Slider
  variant="fill"
  value={volume}
  onChange={(v) => setVolume(v)}
  icon={<Volume2 />}
  showCurrentValue="always"
/>
```

### Vertical orientation

```tsx
<div style={{ height: 200 }}>
  <Slider
    value={level}
    onChange={(v) => setLevel(v)}
    orientation="vertical"
  />
</div>
```

### Read-only

```tsx
<Slider
  value={75}
  onChange={() => {}}
  readOnly
  renderLabel={(v) => `${v}% complete`}
/>
```

### With icon

```tsx
<Slider
  value={volume}
  onChange={(v) => setVolume(v)}
  icon={<Volume2 />}
/>
```
