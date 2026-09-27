# Splitter

A resizable panel layout. Panels are separated by draggable dividers. Supports horizontal and vertical splitting, collapsible panels, min/max constraints, keyboard resizing (arrow keys on a focused divider, `Home`/`End`), and an imperative control API. Divider collapse buttons and panel `aria-label`s are localized via `useLocalization()`.

## Import

```tsx
import { Splitter } from 'altrone-ui';
```

---

## Components

### Splitter

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Direction panels are split |
| `sizes` | `number[]` | — | Controlled panel sizes (percent, aligned to panel order), pairs with `onSizesChange`. Omit for uncontrolled (each panel's own `defaultSize`). |
| `onSizesChange` | `(sizes: number[]) => void` | — | Fires whenever sizes settle — end of a drag, or a panel collapse/expand. Pairs with `sizes`. |
| `showControls` | `boolean` | `true` | Show collapse/expand toggle buttons on dividers |
| `collapsedControlsVisibility` | `'always' \| 'hover' \| 'never'` | `'always'` | How a collapsed panel's expand button is shown. `'always'` — persistently visible while collapsed. `'hover'` — only on divider hover / button focus. `'never'` — not rendered; expand via `controlRef`. |
| `onResize` | `(sizes: number[], event: PointerEvent) => void` | — | Fired on every pointer-move during drag. `sizes` is an array of panel percentages (0–100). |
| `onResizeStart` | `(sizes: number[], event: PointerEvent) => void` | — | Fired when drag begins |
| `onResizeEnd` | `(sizes: number[], event: PointerEvent) => void` | — | Fired when drag ends |
| `onCollapse` | `(panelIndex: number, collapsed: boolean, event?: MouseEvent) => void` | — | Fired when a panel is collapsed or expanded |
| `controlRef` | `Ref<SplitterHandle>` | — | Ref exposing the imperative API (see below) |
| `icons` | `Partial<SplitterIconSet>` | — | Overrides for the four directional chevrons used by the collapse controls (`chevronLeft`, `chevronRight`, `chevronUp`, `chevronDown`), each a `ReactElement` |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref to the container |

All standard `HTMLAttributes<HTMLDivElement>` are also accepted.

---

### Splitter.Panel

A descriptor component — carries configuration, children, and DOM attributes (`ref`/`className`/`style`/…). `Splitter` reads its props and renders each panel as its own sized `<div>`, forwarding those attributes onto it. `Panel` itself renders nothing.

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | Panel content |
| `defaultSize` | `number` | auto | Initial size in percent (0–100). Uncontrolled. Panels without one share the remaining space equally. |
| `minSize` | `number` | `0` | Minimum size in percent |
| `maxSize` | `number` | `100` | Maximum size in percent |
| `collapsible` | `boolean` | `false` | Allow this panel to be fully collapsed via the divider toggle button |
| `resizable` | `boolean` | `true` | When `false`, the adjacent divider becomes non-draggable |
| `className` | `string` | — | Merged onto the panel's root `<div>` (alongside the internal sizing class) |
| `style` | `CSSProperties` | — | Merged onto the panel's root `<div>` — the internal `flex` sizing always wins over a colliding `flex`/`flexGrow`/etc. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded to the panel's root `<div>`, alongside the internal drag/collapse ref |

All standard `HTMLAttributes<HTMLDivElement>` are also accepted and forwarded to the panel's root
element (`id` and `aria-label` are reserved — `Splitter` sets them itself for the divider's
`aria-controls` wiring and the localized panel name).

---

### SplitterHandle (imperative API via `controlRef`)

```ts
interface SplitterHandle {
  collapse(panelIndex: number): void;   // Collapse panel at index
  expand(panelIndex: number): void;     // Expand panel at index
  toggle(panelIndex: number): void;     // Toggle collapsed state
  getSizes(): number[];                 // Current sizes array (percentages)
  getCollapsed(): boolean[];            // Current collapsed state array
}
```

---

## Examples

### Basic two-panel split

```tsx
<div style={{ height: 400 }}>
  <Splitter>
    <Splitter.Panel defaultSize={30} minSize={20} maxSize={60}>
      <Sidebar />
    </Splitter.Panel>
    <Splitter.Panel>
      <MainContent />
    </Splitter.Panel>
  </Splitter>
</div>
```

### Vertical split

```tsx
<div style={{ height: 600 }}>
  <Splitter orientation="vertical">
    <Splitter.Panel defaultSize={60}>
      <Editor />
    </Splitter.Panel>
    <Splitter.Panel>
      <Preview />
    </Splitter.Panel>
  </Splitter>
</div>
```

### Three-panel layout

```tsx
<Splitter>
  <Splitter.Panel defaultSize={20} minSize={15} maxSize={30}>
    <FileTree />
  </Splitter.Panel>
  <Splitter.Panel defaultSize={55}>
    <CodeEditor />
  </Splitter.Panel>
  <Splitter.Panel>
    <Terminal />
  </Splitter.Panel>
</Splitter>
```

### Collapsible panel

```tsx
<Splitter>
  <Splitter.Panel defaultSize={25} collapsible>
    <Sidebar />
  </Splitter.Panel>
  <Splitter.Panel>
    <Content />
  </Splitter.Panel>
</Splitter>
```

### Imperative collapse/expand

```tsx
const controlRef = useRef<SplitterHandle>(null);

<>
  <Button label="Toggle sidebar" onClick={() => controlRef.current?.toggle(0)} />

  <Splitter controlRef={controlRef}>
    <Splitter.Panel defaultSize={30} collapsible>
      <Sidebar />
    </Splitter.Panel>
    <Splitter.Panel>
      <Content />
    </Splitter.Panel>
  </Splitter>
</>
```

### Hide collapse buttons

```tsx
<Splitter showControls={false}>
  <Splitter.Panel defaultSize={40}>
    <PanelA />
  </Splitter.Panel>
  <Splitter.Panel>
    <PanelB />
  </Splitter.Panel>
</Splitter>
```

### Controlled sizes (e.g. persist a layout)

Pass `sizes`/`onSizesChange` to own the layout from outside — useful for persisting it (localStorage, a user preference) and restoring it later. `onSizesChange` fires at the end of a drag and on collapse/expand, not on every pointer-move (that's still `onResize`, unchanged).

```tsx
const [sizes, setSizes] = useState(() => loadSavedSizes() ?? [30, 70]);

<Splitter sizes={sizes} onSizesChange={(next) => { setSizes(next); saveSizes(next); }}>
  <Splitter.Panel>
    <Left />
  </Splitter.Panel>
  <Splitter.Panel>
    <Right />
  </Splitter.Panel>
</Splitter>
```

### Respond to a live drag

`onResize` fires on every pointer-move; `onResizeEnd` once, when the drag ends. Both work the same whether `sizes` is controlled or not.

```tsx
<Splitter onResize={(sizes) => setLiveSizes(sizes)}>
  <Splitter.Panel defaultSize={40}>
    <Left />
  </Splitter.Panel>
  <Splitter.Panel>
    <Right />
  </Splitter.Panel>
</Splitter>
```
