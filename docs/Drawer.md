# Drawer

A side panel that slides in from the left or right. The trigger element is passed as `children` — the component clones it and injects an `onClick` handler. The panel itself is rendered in a portal attached to `[data-altrone-root="true"]` (or `<body>` as fallback).

## Import

```tsx
import { Drawer } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactElement<{ onClick?: React.MouseEventHandler }>` | — | **Required.** Trigger element. Cloned with an `onClick` that opens the drawer, merged with any `onClick` it already has. |
| `title` | `string` | — | Panel title displayed in the header |
| `content` | `ReactElement \| ((ctx: { closeDrawer: () => void }) => ReactElement)` | — | Main content of the drawer. Rendered inside a `Scrollable`. Accepts a render function that receives `closeDrawer`. |
| `footer` | `ReactElement \| ((ctx: { closeDrawer: () => void }) => ReactElement)` | — | Footer content. Rendered at the bottom, outside the scrollable area. Accepts a render function that receives `closeDrawer`. |
| `placement` | `'start' \| 'end'` | `'start'` | Side from which the drawer slides in. `start` = left, `end` = right. |
| `width` | `number` | `400` | Width of the panel in pixels. Capped at the viewport minus its edge inset. |
| `startActions` | `ReactNode \| ((ctx: { closeDrawer: () => void }) => ReactNode)` | — | Controls on the start side of the header, after the close button. One element or several. |
| `endActions` | `ReactNode \| ((ctx: { closeDrawer: () => void }) => ReactNode)` | — | Controls on the end side of the header. One element or several. Replaces the default Done button when provided. |
| `onClose` | `() => void` | — | Called when the drawer is closed (CloseButton, backdrop click, or after `onDone` resolves) |
| `onDone` | `() => Promise<boolean \| void>` | — | Async handler for the Done button. If it returns `false`, the drawer stays open. Any other resolved value closes the drawer. While pending, the Done button shows a loading state. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref to the panel element |

---

## Examples

### Basic

```tsx
<Drawer
  title="Edit profile"
  content={<ProfileForm />}
>
  <Button label="Open drawer" />
</Drawer>
```

### With footer

```tsx
<Drawer
  title="Filters"
  content={<FilterPanel />}
  footer={
    <Button label="Apply filters" variant="submit" fullWidth onClick={applyFilters} />
  }
>
  <Button label="Filters" icon={<Filter />} />
</Drawer>
```

### Right-side placement

```tsx
<Drawer
  title="Notifications"
  content={<NotificationList />}
  placement="end"
>
  <Button label="View notifications" icon={<Bell />} showLabel={false} />
</Drawer>
```

### Custom width

```tsx
<Drawer title="Details" content={<DetailPanel />} width={600}>
  <Button label="Open" />
</Drawer>
```

### With async Done button

Return `false` from `onDone` to keep the drawer open (e.g. when validation fails).

```tsx
<Drawer
  title="Create task"
  content={<TaskForm ref={formRef} />}
  onDone={async () => {
    const ok = await formRef.current.submit();
    return ok ? undefined : false;  // false keeps the drawer open
  }}
  onClose={() => console.log('closed')}
>
  <Button label="New task" variant="submit" />
</Drawer>
```

### Custom header actions on both sides

`startActions` sits after the close button; `endActions` replaces the default
Done button. Either can be one element, several, or a render function that
receives `closeDrawer`. The title stays centred on the panel regardless.

```tsx
<Drawer
  title="Document"
  content={<DocPanel />}
  startActions={
    <Button label="History" icon={<History />} showLabel={false} variant="text" />
  }
  endActions={({ closeDrawer }) => [
    <Button key="share" label="Share" icon={<Share />} showLabel={false} variant="text" />,
    <Button key="save" label="Save" variant="submit" onClick={closeDrawer} />,
  ]}
>
  <Button label="Open document" />
</Drawer>
```

---

## Behavior details

- The drawer is **uncontrolled** — open/close state is managed internally.
- Opening: the trigger's existing `onClick` is preserved and called alongside the drawer open handler.
- Closing: a click on the backdrop, the close button, or the `Escape` key. `onClose` fires for all three (and after `onDone` resolves).
- Focus: trapped inside the panel while open (`focus-trap-react`), returned to the trigger on close. The panel body carries `role="dialog"`, `aria-modal="true"`, and `aria-labelledby` when a `title` is set.
- Animation: `motion/react` `AnimatePresence` — the panel slides in on an ease-out curve while scaling up from the screen edge it enters from, over a backdrop fade. Under `prefers-reduced-motion` both are dropped — the panel mounts/unmounts with no transition. The resting edge inset lives in CSS, so a reduced-motion drawer is still inset.
- Portal target: `document.querySelector('[data-altrone-root="true"]')` — the element rendered by `Application`. Falls back to `document.body` in environments where no root is found.
- SSR-safe: `portalRoot` is `null` on the server and the portal is simply not rendered.
