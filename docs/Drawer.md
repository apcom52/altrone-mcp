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
| `children` | `ReactElement<{ onClick: () => void }>` | — | **Required.** Trigger element. Must be a single React element that accepts an `onClick` prop. |
| `title` | `string` | — | Panel title displayed in the header |
| `content` | `ReactElement` | — | Main content of the drawer. Rendered inside a `Scrollable`. |
| `footer` | `ReactElement` | — | Footer content. Rendered at the bottom, outside the scrollable area. |
| `placement` | `'start' \| 'end'` | `'start'` | Side from which the drawer slides in. `start` = left, `end` = right. |
| `width` | `number` | `400` | Width of the panel in pixels |
| `showDoneButton` | `boolean` | — | Unused in current implementation — use `onDone` to show the done button |
| `renderActionButton` | `(ctx: { closeDrawer: () => void }) => ReactElement` | — | Custom action button in the header. Replaces the default Done button. Receives a `closeDrawer` function. |
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

### Custom action button in header

Replaces the default Done button entirely. Receives `closeDrawer` in context.

```tsx
<Drawer
  title="Share"
  content={<SharePanel />}
  renderActionButton={({ closeDrawer }) => (
    <Button label="Copy link" icon={<Link />} onClick={() => { copyLink(); closeDrawer(); }} />
  )}
>
  <Button label="Share" icon={<Share />} />
</Drawer>
```

---

## Behavior details

- The drawer is **uncontrolled** — open/close state is managed internally.
- Opening: the trigger's existing `onClick` is preserved and called alongside the drawer open handler.
- Animation: uses `motion/react` `AnimatePresence` with a spring transition and a backdrop fade.
- Portal target: `document.querySelector('[data-altrone-root="true"]')` — the element rendered by `AltroneApplication`. Falls back to `document.body` in environments where no root is found.
- SSR-safe: `portalRoot` is `null` on the server and the portal is simply not rendered.
