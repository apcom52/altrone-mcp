# Spoiler

A collapsible disclosure section with an animated height transition. The header is always visible; clicking it (or focusing it and pressing `Enter` / `Space`) toggles the content area. Uses `motion/react` for the expand/collapse animation.

## Import

```tsx
import { Spoiler } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `ReactNode` | — | **Required.** Always-visible heading content (rendered inside a `<button>`) |
| `children` | `ReactNode` | — | Content revealed when expanded |
| `open` | `boolean` | — | Controlled open state. Omit for an uncontrolled spoiler (see `defaultOpen`). |
| `defaultOpen` | `boolean` | `false` | Initial open state for an uncontrolled spoiler. Ignored once `open` is passed. |
| `onToggle` | `(open: boolean, event: MouseEvent<HTMLButtonElement>) => void` | — | Called after each toggle. `open` is the **new** state. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref (root `<div>`) |

All standard `HTMLAttributes<HTMLDivElement>` are also accepted.

---

## Behavior

- **Controlled vs. uncontrolled** — pass `open` to drive it from your own state (`onToggle` reports every click, you decide whether to act on it); omit it and the spoiler tracks its own state internally, starting from `defaultOpen`.
- The header is a native `<button>` with `aria-expanded` and `aria-controls` pointing at the content region; it toggles on click and on `Enter` / `Space`.
- The header shows a `Plus` icon when collapsed and a `Minus` icon when expanded (`aria-hidden`).
- The content area animates open with a spring on `height` (plus a short fade) and closes with a quick tween. Padding sits on an inner wrapper so it doesn't jump while the height animates. Respects `prefers-reduced-motion` via the app-level `MotionConfig`.

---

## Examples

### Basic

```tsx
<Spoiler title="What is altrone-ui?">
  <p>altrone-ui is a React component library with a modern design system.</p>
</Spoiler>
```

### Open by default

```tsx
<Spoiler title="Installation" defaultOpen>
  <pre><code>npm install altrone-ui</code></pre>
</Spoiler>
```

### With toggle callback

```tsx
<Spoiler
  title="Advanced settings"
  onToggle={(open) => console.log('Spoiler is now', open ? 'open' : 'closed')}
>
  <AdvancedSettingsForm />
</Spoiler>
```

### Controlled

```tsx
const [open, setOpen] = useState(false);

<Spoiler title="Advanced settings" open={open} onToggle={setOpen}>
  <AdvancedSettingsForm />
</Spoiler>
```

### FAQ list

```tsx
{faqs.map((faq) => (
  <Spoiler key={faq.id} title={faq.question}>
    <p>{faq.answer}</p>
  </Spoiler>
))}
```

### Inside a Form

```tsx
<Spoiler title="Additional fields">
  <Form.Field name="notes" label="Notes">
    <TextArea value={notes} onChange={(e) => setNotes(e.target.value)} />
  </Form.Field>
  <Form.Field name="tags" label="Tags">
    <TextInput value={tags} onChange={(v) => setTags(v)} />
  </Form.Field>
</Spoiler>
```
