# Tabs

A compact segmented tab bar. `Tabs` is the container with `role="tablist"`; `Tabs.Item` is each tab (`role="tab"`). The active tab's backdrop slides between items via a shared `layoutId` (`motion/react`), with a small scale pulse on each hop. `Tabs` renders only the strip — swap the panel below yourself, keyed off `selected`.

**Keyboard:** `Tab` reaches the selected item (it's the only tab stop); `ArrowLeft`/`ArrowRight`/`ArrowUp`/`ArrowDown` and `Home`/`End` move focus between items (skipping disabled ones); `Enter`/`Space` activates.

## Import

```tsx
import { Tabs } from 'altrone-ui';
```

---

## Components

### Tabs

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | — | `Tabs.Item` elements |
| `size` | `'mini' \| 's' \| 'm' \| 'l' \| 'xl'` | `'m'` | Scales the tablist pill and every `Tabs.Item` inside it (height, icon size, text size, corner rounding). |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

All standard `HTMLAttributes<HTMLDivElement>` are also accepted.

---

### Tabs.Item

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Tab label text. Also the `title` (tooltip) and, when `showLabel={false}`, the `aria-label`. |
| `selected` | `boolean` | `false` | Whether this tab is active. Shows the sliding backdrop; sets `aria-selected` and makes this the tab stop (`tabindex={0}`). |
| `icon` | `ReactElement` | — | Icon before the label |
| `showLabel` | `boolean` | `true` | Set to `false` for an icon-only tab (label becomes the `aria-label`) |
| `disabled` | `boolean` | `false` | Not focusable, ignores activation, skipped by arrow-key navigation |
| `badge` | `string \| number \| ReactElement` | — | Corner pill, styled like a `Button`'s badge |
| `href` | `string` | — | Render an `<a href>` instead of a `<button>` |
| `asChild` | `boolean` | `false` | Merge the tab's role/styles/props onto the single child element (Slot pattern). Use for router links. |
| `children` | `ReactElement` | — | Child element when `asChild={true}` |
| `ref` | `Ref<HTMLElement>` | — | Forwarded to the `<button>` / `<a>` |

Default element is `<button type="button">`; `<a>` when `href` is set. All standard `AnchorHTMLAttributes<HTMLAnchorElement>` are also accepted (except `children`).

---

## Examples

### Basic

```tsx
const [tab, setTab] = useState('overview');

<Tabs>
  <Tabs.Item label="Overview"  selected={tab === 'overview'}  onClick={() => setTab('overview')} />
  <Tabs.Item label="Analytics" selected={tab === 'analytics'} onClick={() => setTab('analytics')} />
  <Tabs.Item label="Settings"  selected={tab === 'settings'}  onClick={() => setTab('settings')} />
</Tabs>
```

### With icons

```tsx
<Tabs>
  <Tabs.Item label="Dashboard" icon={<LayoutDashboard />} selected={…} onClick={…} />
  <Tabs.Item label="Users"     icon={<Users />}           selected={…} onClick={…} />
  <Tabs.Item label="Settings"  icon={<Settings />}        selected={…} onClick={…} />
</Tabs>
```

### Icon-only tabs

```tsx
<Tabs>
  <Tabs.Item label="Grid view" icon={<Grid />} showLabel={false} selected={…} onClick={…} />
  <Tabs.Item label="List view" icon={<List />} showLabel={false} selected={…} onClick={…} />
</Tabs>
```

### With badge

```tsx
<Tabs>
  <Tabs.Item label="Inbox" badge={12} selected={…} onClick={…} />
  <Tabs.Item label="Sent"            selected={…} onClick={…} />
</Tabs>
```

### With router links (asChild)

```tsx
<Tabs>
  <Tabs.Item label="Profile"  selected={pathname === '/profile'}  asChild>
    <Link to="/profile" />
  </Tabs.Item>
  <Tabs.Item label="Security" selected={pathname === '/security'} asChild>
    <Link to="/security" />
  </Tabs.Item>
</Tabs>
```

### Fully custom tab via asChild

```tsx
<Tabs>
  {tabs.map((tab) => (
    <Tabs.Item key={tab.id} label={tab.name} selected={activeTab === tab.id} asChild>
      <MyCustomTab tabData={tab} />
    </Tabs.Item>
  ))}
</Tabs>
```
