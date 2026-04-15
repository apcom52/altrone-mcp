# Tabs

A horizontal tab bar. `Tabs` is the container with `role="tablist"`; `Tabs.Item` is each tab. The active tab's backdrop animates between items using a shared `layoutId` from `motion/react`.

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
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

All standard `HTMLAttributes<HTMLDivElement>` are also accepted.

---

### Tabs.Item

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `label` | `string` | — | **Required.** Tab label text. Always used for `title` attribute (tooltip on truncation) and `aria-*`. |
| `selected` | `boolean` | `false` | Whether this tab is currently active. Shows the animated backdrop. |
| `icon` | `ReactElement` | — | Icon before the label |
| `showLabel` | `boolean` | `true` | Set to `false` to hide the text label (icon-only tabs) |
| `badge` | `string \| number \| ReactElement` | — | Badge rendered after the label |
| `asChild` | `boolean` | `false` | Merge tab styles onto the single child element (Slot pattern). Use for router links. |
| `children` | `ReactElement` | — | Child element when `asChild={true}` |
| `renderFunc` | `(ref, props) => ReactElement` | — | Fully custom render function. Receives the forwarded ref and all resolved props. |
| `ref` | `Ref<HTMLAnchorElement>` | — | Forwarded ref |

All standard `AnchorHTMLAttributes<HTMLAnchorElement>` are also accepted (except `children`).

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

### Custom render function

```tsx
<Tabs>
  {tabs.map((tab) => (
    <Tabs.Item
      key={tab.id}
      label={tab.name}
      selected={activeTab === tab.id}
      renderFunc={(ref, props) => (
        <MyCustomTab ref={ref} {...props} tabData={tab} />
      )}
    />
  ))}
</Tabs>
```
