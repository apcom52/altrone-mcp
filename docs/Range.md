# Range

A slider input for selecting a numeric value within a range. Fully controlled, built with a custom pointer-drag implementation. Supports horizontal and vertical orientations, keyboard navigation, and a read-only display mode.

## Import

```tsx
import { Range } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `number` | — | **Required.** Controlled current value |
| `onChange` | `(value: number, event: PointerEvent \| KeyboardEvent) => void` | — | **Required.** Called on every value change during drag and on keyboard input |
| `onValueCommit` | `(value: number, event: PointerEvent \| KeyboardEvent) => void` | — | Called when a drag ends (`pointerup`) or a keyboard key is released. Use this to avoid firing expensive side effects on every pixel of drag. |
| `min` | `number` | `0` | Minimum value |
| `max` | `number` | `100` | Maximum value |
| `step` | `number` | `1` | Step increment |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Slider orientation |
| `size` | `Size` | `'m'` | Track thickness: `'s' \| 'm' \| 'l'` |
| `showCurrentValue` | `'active' \| 'always' \| false` | `'active'` | When to show the current value label. `'active'` = only while dragging, `'always'` = always visible, `false` = never. |
| `renderLabel` | `(value: number) => ReactNode` | — | Custom label renderer. Used for the displayed value and `aria-valuetext`. |
| `icon` | `ReactElement` | — | Icon displayed at the start of the track |
| `disabled` | `boolean` | `false` | Disables all interaction |
| `readOnly` | `boolean` | `false` | Shows a static label instead of an interactive slider |
| `name` | `string` | — | Name for the hidden `<input>` (for form submission) |
| `activeTrackClassName` | `string` | — | Extra class name for the filled portion of the track |
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
<Range value={volume} onChange={(v) => setVolume(v)} />
```

### With min, max, step

```tsx
<Range
  value={opacity}
  onChange={(v) => setOpacity(v)}
  min={0}
  max={1}
  step={0.01}
/>
```

### Only update on drag end (onValueCommit)

```tsx
<Range
  value={quality}
  onChange={(v) => setQuality(v)}       // local preview
  onValueCommit={(v) => saveQuality(v)} // persist only when done
  min={1}
  max={100}
/>
```

### Always show value label

```tsx
<Range
  value={brightness}
  onChange={(v) => setBrightness(v)}
  showCurrentValue="always"
/>
```

### Custom label format

```tsx
<Range
  value={price}
  onChange={(v) => setPrice(v)}
  min={0}
  max={1000}
  renderLabel={(v) => `$${v}`}
  showCurrentValue="always"
/>
```

### Vertical orientation

```tsx
<div style={{ height: 200 }}>
  <Range
    value={level}
    onChange={(v) => setLevel(v)}
    direction="vertical"
  />
</div>
```

### Read-only

```tsx
<Range
  value={75}
  onChange={() => {}}
  readOnly
  renderLabel={(v) => `${v}% complete`}
/>
```

### With icon

```tsx
<Range
  value={volume}
  onChange={(v) => setVolume(v)}
  icon={<Volume2 />}
/>
```
