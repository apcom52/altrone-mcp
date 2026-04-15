# ColorPicker

A color input with a dropdown palette. Renders a read-only `TextInput` with a color swatch preview that opens a popover containing a full color picker (via `react-colorful`) and optional preset swatches. Supports the `asChild` Slot pattern to use a custom trigger.

## Import

```tsx
import { ColorPicker } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Current color value (any valid CSS color string, e.g. `#ff0000`, `rgb(...)`) |
| `onChange` | `(value: string \| undefined, event?: SyntheticEvent) => void` | — | **Required.** Called with the new color string. Called with `undefined` when the value is cleared. Note: `event` is optional because some color sources (e.g. react-colorful) do not expose DOM events. |
| `colorPresets` | `ColorPreset[]` | `[]` | Predefined color swatches shown in the dropdown. Each preset: `{ name: string; title: string; value: string }`. |
| `allowPalette` | `boolean` | `true` | Show the full color palette (hue/saturation picker) in the dropdown. Set to `false` for presets-only mode. |
| `clearable` | `boolean` | `false` | Show a "Clear" button in the dropdown to reset the value to `undefined`. |
| `size` | `'mini' \| 's' \| 'm' \| 'l' \| 'xl'` | `'m'` | Input size. Also controls the swatch preview dimensions. |
| `transparent` | `boolean` | — | Passes `transparent` variant to the inner `TextInput` |
| `readOnly` | `boolean` | `false` | Disables the popover trigger. Input renders in read-only visual style. |
| `asChild` | `boolean` | `false` | Merges trigger props onto the single child element instead of rendering `TextInput`. |
| `children` | `ReactNode` | — | Only used with `asChild`. Must be a single valid React element. |
| `ref` | `Ref<HTMLInputElement>` | — | Forwarded ref |

All standard `InputHTMLAttributes<HTMLInputElement>` are also accepted (except `onChange`, `size`, `value`, `children`).

---

## ColorPreset shape

```ts
type ColorPreset = {
  name: string;   // internal identifier
  title: string;  // shown as a tooltip on the swatch
  value: string;  // CSS color value
};
```

---

## Examples

### Basic

```tsx
const [color, setColor] = useState('#6366f1');

<ColorPicker value={color} onChange={setColor} />
```

### With presets only (no full palette)

```tsx
const BRAND_COLORS: ColorPreset[] = [
  { name: 'primary', title: 'Primary', value: '#6366f1' },
  { name: 'danger',  title: 'Danger',  value: '#ef4444' },
  { name: 'success', title: 'Success', value: '#10b981' },
  { name: 'warning', title: 'Warning', value: '#f59e0b' },
];

<ColorPicker
  value={color}
  onChange={setColor}
  colorPresets={BRAND_COLORS}
  allowPalette={false}
/>
```

### With presets and palette

```tsx
<ColorPicker
  value={color}
  onChange={setColor}
  colorPresets={BRAND_COLORS}
  allowPalette={true}
/>
```

### Clearable

```tsx
<ColorPicker
  value={color}
  onChange={(v) => setColor(v ?? '')}
  clearable
/>
```

### Read-only

```tsx
<ColorPicker value="#6366f1" onChange={() => {}} readOnly />
```

### asChild — custom trigger

Use `asChild` when you want a completely custom element to trigger the color picker popover. The component merges `data-value` and `data-opened` attributes onto the child.

```tsx
<ColorPicker value={color} onChange={setColor} asChild>
  <button
    style={{ width: 32, height: 32, background: color, borderRadius: 6 }}
    aria-label="Pick color"
  />
</ColorPicker>
```

---

## Behavior details

- The color value is always stored lowercase — `onChange` normalizes the string via `.toLowerCase()`.
- When no color is selected, the swatch area renders a `DummyBox` (skeleton placeholder) instead of a colored circle.
- The dropdown is disabled (`enabled={false}`) when `readOnly={true}`.
- The chevron icon in the trigger flips direction based on whether the dropdown is open.
