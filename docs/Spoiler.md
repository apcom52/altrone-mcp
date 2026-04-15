# Spoiler

A collapsible disclosure section with an animated height transition. The header is always visible; clicking it toggles the content area. Uses `motion/react` for the expand/collapse animation.

## Import

```tsx
import { Spoiler } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `title` | `string` | — | **Required.** Always-visible heading text |
| `children` | `ReactNode` | — | Content revealed when expanded |
| `openedByDefault` | `boolean` | `false` | Whether the spoiler starts expanded |
| `onToggle` | `(opened: boolean, event: MouseEvent) => void` | — | Called after each toggle. `opened` is the **new** state after the click. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

All standard `HTMLAttributes<HTMLDivElement>` are also accepted.

---

## Behavior

- **Uncontrolled** — open/close state is managed internally.
- The header shows a `Plus` icon when collapsed and a `Minus` icon when expanded.
- The content area animates from `height: 0` to `height: auto` (and back) over 200 ms.
- The header is keyboard-accessible (`tabIndex={0}`).

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
<Spoiler title="Installation" openedByDefault>
  <pre><code>npm install altrone-ui</code></pre>
</Spoiler>
```

### With toggle callback

```tsx
<Spoiler
  title="Advanced settings"
  onToggle={(opened) => console.log('Spoiler is now', opened ? 'open' : 'closed')}
>
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

### Inside a Form (DataGrid uses this pattern)

```tsx
<Spoiler title="Additional fields">
  <Form.Field name="notes" label="Notes">
    <Textarea value={notes} onChange={(e) => setNotes(e.target.value)} />
  </Form.Field>
  <Form.Field name="tags" label="Tags">
    <TextInput value={tags} onChange={(v) => setTags(v)} />
  </Form.Field>
</Spoiler>
```
