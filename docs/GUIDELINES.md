# altrone-ui — Usage Guidelines

These rules apply to every task that involves UI work in this codebase. Read them before writing any component code.

---

## The core rule

**Never build a UI element from scratch if altrone-ui has a component for it.**

Before writing a `<div>`, `<button>`, `<input>`, `<a>`, `<ul>`, or any other raw HTML tag for UI purposes, check whether altrone-ui already provides that element. It almost always does. Use the library component.

---

## Import

All components come from a single package:

```tsx
import { Button, TextInput, Flex, Text, ... } from 'altrone-ui';
```

Never re-export, re-implement, or create wrappers around altrone-ui components.

---

## Component substitution map

When you feel the urge to create a custom element, use this table instead.

### Interactive controls

| What you want | Use instead |
|---------------|-------------|
| A button | `Button` |
| A link that looks like a button | `Button` with `asChild` + `<a>` |
| A checkbox | `Checkbox` |
| A toggle/switch | `Switch` |
| A radio group | `Radio` + `Radio.Item` |
| A text field | `TextInput` |
| A multi-line text field | `TextArea` |
| A number field | `NumberInput` |
| A password field | `PasswordInput` |
| A search field | `Search` |
| A dropdown select | `Select` |
| A date picker | `DatePicker` |
| A color picker | `ColorPicker` |
| An autocomplete input | `AutocompleteInput` |
| A range/slider | `Slider` |
| A file upload | `FilePicker` |

### Feedback & status

| What you want | Use instead |
|---------------|-------------|
| A toast / snackbar | `useToast().toast(...)` |
| A rich notification | `useToast().notification(...)` |
| An inline status message / banner | `Message` |
| A confirm / alert dialog (imperative) | `Dialog.showConfirm(...)` / `Dialog.showAlert(...)` |
| A modal dialog (declarative) | `Modal` |
| A loading spinner | `Loading` |
| A skeleton loading placeholder | `Skeleton` |
| An image / content placeholder | `Box` with `material="dotted"` |
| An empty state / feedback (error, success, …) | `Result` |
| A progress bar | `Progress` |

### Layout & structure

| What you want | Use instead |
|---------------|-------------|
| A flex row or column | `Flex` |
| A CSS grid | `Grid` + `Grid.Column` |
| A horizontal or vertical rule | `Divider` |
| A scrollable container | `Scrollable` |
| A resizable split layout | `Splitter` + `Splitter.Panel` |
| A full-page layout (sidebar + header + content) | `Screen` |
| A collapsible section | `Spoiler` |

### Navigation

| What you want | Use instead |
|---------------|-------------|
| A tab bar | `Tabs` + `Tabs.Item` |
| A sidebar nav (app routes) | `NavigationList` + sub-components |
| A top/bottom tab bar (mobile) | `BottomNavigation` |
| Breadcrumb trail | `Breadcrumbs` |
| In-page anchor TOC | `SideNavigation` |
| A dropdown menu | `Dropdown` + `Dropdown.Menu` + `Dropdown.Action` |
| A side panel / sheet | `Drawer` |

### Typography & display

| What you want | Use instead |
|---------------|-------------|
| Any text (headings, paragraphs, spans, lists) | `Text` |
| A status badge / tag chip | `Label` |
| A clickable tag/chip | `Tags.Item` |
| A user avatar / initials | `Avatar` |

### Data

| What you want | Use instead |
|---------------|-------------|
| A data table | `DataTable` |
| A paginator | `Pagination` |
| A "show N of many" collapsed list | `CollapsedList` |

### Overlays & popovers

| What you want | Use instead |
|---------------|-------------|
| A tooltip | `Tooltip` |
| A generic floating panel | `Popover` |
| A close / dismiss button | `CloseButton` |

### Forms

| What you want | Use instead |
|---------------|-------------|
| A form layout with labels and errors | `Form` + `Form.Field` |
| A field label | `Form.Field label` prop (not a standalone `<label>`) |

---

## Layout rules

### Use `Flex` and `Grid`, not raw divs with inline styles

```tsx
// Wrong
<div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>

// Correct
<Flex gap="m" align="center">
```

```tsx
// Wrong
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>

// Correct
<Grid gap="l">
  <Grid.Column size={4}>…</Grid.Column>
  <Grid.Column size={4}>…</Grid.Column>
  <Grid.Column size={4}>…</Grid.Column>
</Grid>
```

### Use gap tokens, not pixel values

Gap values in `Flex` and `Grid` use design-system tokens:
`'none' | 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl'`

Never pass `gap={16}` or `style={{ gap: '16px' }}`. Map pixel values to the nearest token.

---

## Typography rules

### Use `Text`, not raw HTML tags

```tsx
// Wrong
<h1 className="title">Dashboard</h1>
<p>Some description text.</p>
<span className="muted">Secondary info</span>

// Correct
<Text size={7} weight="bold" block>Dashboard</Text>
<Text block>Some description text.</Text>
<Text color="muted">Secondary info</Text>
```

`Text` covers all cases: headings (`size` 1–9), paragraphs (`block`), inline spans, links (`href`), lists (`list="marked"` / `list="numeric"`), list items (`item`), code (`code`), and arbitrary wrappers (`asChild`).

---

## Button rules

### Always use `Button`, never `<button>` or `<a>`

```tsx
// Wrong
<button className="btn btn-primary" onClick={save}>Save</button>
<a href="/settings" className="link-button">Settings</a>

// Correct
<Button label="Save" variant="submit" onClick={save} />
<Button label="Settings" asChild><a href="/settings" /></Button>
```

`Button` handles: `variant` (default / submit / danger / text / glass), `size`, `state` (idle / loading / success / error), `icon`, `additionalIcon`, `showLabel`, `fullWidth`, `asChild`.

### For icon-only buttons, pass `showLabel={false}` — do not omit `label`

`label` is always required. When `showLabel={false}`, the label becomes the accessible name and auto-wraps in a `Tooltip`.

```tsx
// Wrong
<Button icon={<Settings />} />

// Correct
<Button label="Settings" icon={<Settings />} showLabel={false} />
```

---

## Form rules

### Wrap inputs in `Form` + `Form.Field` to get labels, errors, and context propagation

```tsx
// Wrong
<div>
  <label htmlFor="email">Email</label>
  <input id="email" type="email" />
  {errors.email && <span className="error">{errors.email}</span>}
</div>

// Correct
<Form errorMessages={{ email: errors.email ? [errors.email] : [] }}>
  <Form.Field name="email" label="Email">
    <TextInput value={email} onChange={(v) => setEmail(v)} />
  </Form.Field>
</Form>
```

When an input is inside `Form.Field`, it automatically inherits `name`, `invalid`, `disabled`, and `size` from context. You do not need to pass these props manually.

---

## Feedback rules

### Use `useToast()` for transient notifications, never custom snackbars

```tsx
// Wrong
const [toast, setToast] = useState(null);
{toast && <div className="toast">{toast}</div>}

// Correct
const { toast } = useToast();
toast('Saved successfully.', { variant: 'success' });
```

### Use `Dialog.showConfirm()` for confirmation, never custom confirm modals

```tsx
// Wrong
const [showConfirm, setShowConfirm] = useState(false);
{showConfirm && <div className="overlay"><p>Are you sure?</p>…</div>}

// Correct
const confirmed = await Dialog.showConfirm({ title: 'Delete item?', description: 'This cannot be undone.' });
if (confirmed) deleteItem();
```

### Use `Message` for inline alerts, never custom alert boxes

```tsx
// Wrong
{error && <div className="alert alert-danger">{error}</div>}

// Correct
{error && <Message severity="danger" title={error} />}
```

---

## Loading & skeleton rules

### Use `Loading` for spinners, `Skeleton` for content placeholders

```tsx
// Wrong
<div className="spinner" />
<div className="skeleton-line" style={{ width: '60%', height: 16 }} />

// Correct
<Loading size="24px" />
<Skeleton width="60%" height="16px" radius="4px" />
```

### Use `Button` `state="loading"` for in-progress buttons — don't add a spinner next to a button

```tsx
// Wrong
<button disabled>{isLoading ? <Spinner /> : 'Save'}</button>

// Correct
<Button label="Save" state={isLoading ? 'loading' : 'idle'} onClick={save} />
```

---

## Dropdown / context menu rules

### Use `Dropdown`, never custom positioned menus

```tsx
// Wrong
{menuOpen && (
  <div className="context-menu" style={{ position: 'absolute', top: 40 }}>
    <div onClick={edit}>Edit</div>
    <div onClick={del}>Delete</div>
  </div>
)}

// Correct
<Dropdown content={
  <Dropdown.Menu>
    <Dropdown.Action label="Edit"   icon={<Pencil />} onClick={edit} />
    <Dropdown.Action label="Delete" icon={<Trash />}  danger onClick={del} />
  </Dropdown.Menu>
}>
  <Button label="Actions" icon={<MoreHorizontal />} showLabel={false} />
</Dropdown>
```

---

## Tooltip rules

### Use `Tooltip`, never `title` attribute or custom hover states

```tsx
// Wrong
<button title="Save changes (⌘S)">Save</button>

// Correct
<Tooltip content="Save changes" kbd="⌘S">
  <Button label="Save" onClick={save} />
</Tooltip>
```

---

## Divider rules

```tsx
// Wrong
<hr className="separator" />
<div style={{ height: 1, background: '#eee' }} />

// Correct
<Divider />
<Divider orientation="vertical" />
```

---

## Empty state / feedback rules

```tsx
// Wrong
{items.length === 0 && <div className="empty">No items found.</div>}

// Correct
{items.length === 0 && <Result title="No items found" />}
```

---

## General principles

1. **Check `list_components` before building anything.** If you are about to create a UI element, list the available components first.
2. **Read the docs before using a component.** Call `get_component_docs` for the component you need. Pay attention to non-obvious props — many components have context propagation, render functions, or `asChild` patterns.
3. **Do not recreate what the library already provides.** This includes CSS classes, animation effects, focus management, ARIA attributes, and keyboard handling — the components handle all of that.
4. **Do not wrap altrone-ui components in unnecessary containers.** `Flex`, `Grid`, and `Screen` are the intended layout primitives. Use them directly.
5. **Prefer composition over workarounds.** If something feels hard, there is likely a built-in prop for it (`asChild`, `content` render function, `ref` imperative API, etc.).
