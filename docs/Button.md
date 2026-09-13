# Button

A clickable element that triggers an action. Rendered as a `Box` primitive (pill shape; `material`/`tone` derived from `variant`) with a `motion/react` press animation. Supports icons, badges, loading/success/failed states, toggle selection, and the `asChild` Slot pattern.

Press feedback is `:active`-only (from `Box`) — there is no hover background change.

Content changes (`label`, `icon`, `badge`) animate: the button eases to its new width via `motion`'s layout animation, respecting `prefers-reduced-motion`.

## Import

```tsx
import { Button } from 'altrone-ui';
```

---

## Key design decisions

- **`label` is required** and always a plain string — it drives the accessible name and the icon-only tooltip. Do not pass text as `children`.
- **`type` defaults to `"button"`**, not the browser default `"submit"`. Pass `type="submit"` explicitly on form submit buttons.
- **When `state` is not `"idle"`, the button is automatically disabled** — no need to also set `disabled`.

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Visible label text. Also used as the accessible name and as the fallback tooltip when `showLabel={false}`. |
| `variant` | `'default' \| 'submit' \| 'text'` | `'default'` | Visual style. `submit` = filled primary color; `text` = no background/border. |
| `size` | `'mini' \| 's' \| 'm' \| 'l' \| 'xl'` | `'m'` | Button size |
| `danger` | `boolean` | `false` | Applies danger (red) color treatment to any variant |
| `icon` | `ReactElement` | — | Icon displayed to the left of the label |
| `additionalIcon` | `ReactElement` | — | Icon displayed to the right of the label (e.g. a chevron) |
| `showLabel` | `boolean` | `true` | When `false`, hides the label and renders icon only. Automatically wraps the button in a `Tooltip` showing `tooltip ?? label`. |
| `tooltip` | `string \| ReactElement` | — | Custom tooltip content. Only used when `showLabel={false}`; overrides the default `label` tooltip. |
| `kbd` | `string` | — | Shortcut badge shown in the auto-tooltip (e.g. `"⌘S"`). Only used when `showLabel={false}`. |
| `badge` | `number \| string \| ReactElement` | — | Small badge (counter or status). Inline at the end of the content on a labelled button; a `plate` chip floating over the top-right corner on an icon-only button. |
| `state` | `'idle' \| 'loading' \| 'succeeded' \| 'failed'` | `'idle'` | Async feedback state. Any non-idle value disables the button and replaces content with a spinner, checkmark, or X icon. |
| `selected` | `boolean` | `false` | Toggle state. Sets `aria-pressed` and applies a selected visual style. |
| `disabled` | `boolean` | `false` | Disables the button. Also set implicitly when `state !== 'idle'`. |
| `type` | `'button' \| 'submit' \| 'reset'` | `'button'` | HTML button type |
| `asChild` | `boolean` | `false` | Merges Button styles and behaviour onto the single child element (Slot pattern). |
| `children` | `ReactNode` | — | Only used together with `asChild`. Ignored otherwise. |
| `ref` | `Ref<HTMLButtonElement>` | — | Forwarded ref |

All standard `React.ButtonHTMLAttributes<HTMLButtonElement>` are also accepted.

---

## Examples

### Variants

```tsx
<Button label="Save draft" />
<Button label="Submit form" variant="submit" />
<Button label="Cancel" variant="text" />
```

### Sizes

```tsx
<Button size="mini" label="Tiny" />
<Button size="s"    label="Small" />
<Button size="m"    label="Medium" />
<Button size="l"    label="Large" />
<Button size="xl"   label="Extra large" />
```

### Danger

```tsx
<Button label="Delete account" danger />
<Button label="Delete account" variant="submit" danger />
<Button label="Remove" variant="text" danger />
```

### With icons

```tsx
import { Send, ChevronDown, X } from 'lucide-react';

{/* Icon on the left */}
<Button label="Send message" icon={<Send />} />

{/* Icon on the right (e.g. dropdown trigger) */}
<Button label="More options" additionalIcon={<ChevronDown />} />

{/* Both sides */}
<Button label="Close" icon={<X />} additionalIcon={<ChevronDown />} />
```

### Icon-only with tooltip

When `showLabel={false}`, the label is hidden visually but used as the accessible name and shown as a tooltip on hover.

```tsx
<Button label="Close panel" showLabel={false} icon={<X />} />

{/* Custom tooltip text */}
<Button
  label="Sort ascending"
  showLabel={false}
  icon={<AArrowUp />}
  tooltip="Sort A → Z"
/>

{/* Tooltip with a shortcut badge — no need to wrap in <Tooltip> */}
<Button label="Save" showLabel={false} icon={<Save />} kbd="⌘S" />
```

### Badge

```tsx
{/* Counter */}
<Button label="Notifications" badge={5} />

{/* Text tag */}
<Button label="Export" badge="NEW" />

{/* Danger with badge */}
<Button label="Pay later" badge="+20%" danger />
```

### Async state

`state` controls loading/result feedback. The button is automatically disabled while state is non-idle.

```tsx
const [state, setState] = useState<'idle' | 'loading' | 'succeeded' | 'failed'>('idle');

async function handleSave() {
  setState('loading');
  try {
    await save();
    setState('succeeded');
  } catch {
    setState('failed');
  }
}

<Button label="Save" state={state} onClick={handleSave} />
```

> After a succeeded/failed state, reset `state` back to `'idle'` to re-enable the button.

### Toggle / selected

Use `selected` for buttons that represent an on/off state. Sets `aria-pressed` automatically.

```tsx
const [active, setActive] = useState(false);

<Button
  label="Wi-Fi"
  icon={<Wifi />}
  selected={active}
  onClick={() => setActive(v => !v)}
/>

{/* Icon-only toggle */}
<Button
  label="Bluetooth"
  icon={<Bluetooth />}
  showLabel={false}
  selected={active}
  onClick={() => setActive(v => !v)}
/>
```

### Form submit

Remember: `type` defaults to `"button"`. Set `type="submit"` explicitly in forms.

```tsx
<form onSubmit={handleSubmit}>
  <Button label="Create account" variant="submit" type="submit" />
</form>
```

### asChild — render as a different element

Use `asChild` when Button styles must be applied to a non-`<button>` element (e.g. a router link).

```tsx
import { Link } from 'react-router-dom';

<Button label="Go to profile" icon={<User />} asChild>
  <Link to="/profile" />
</Button>
```

```tsx
import { motion } from 'motion/react';

<Button label="Animated link" icon={<ExternalLink />} asChild>
  <motion.a href="https://example.com" />
</Button>
```

> **Note:** `asChild` requires exactly one valid React element as `children`. If `children` is not a valid element, the component returns `null` and logs an error.

---

## Accessibility

The component sets ARIA attributes automatically:

| Condition | Attribute set |
|-----------|--------------|
| `showLabel={false}` | `aria-label={label}` |
| `selected={true}` | `aria-pressed={true}` |
| `state="loading"` | `aria-busy={true}` |

---

## TypeScript

```ts
import type { ButtonProps } from 'altrone-ui';
```

`label` is required — omitting it is a type error:

```tsx
// ✗ Type error — label is missing
<Button variant="submit" />

// ✓ Correct
<Button label="Submit" variant="submit" />
```
