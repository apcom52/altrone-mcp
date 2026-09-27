# DatePicker

A family of date/time input components built on a shared `generatePicker` factory. All variants render a read-only `TextInput` (or a custom trigger — see `asChild`) that opens a calendar popover.

## Import

```tsx
import { DatePicker } from 'altrone-ui';
```

Four variants are available as static properties:

| Component | Picker level | Value type |
|-----------|-------------|------------|
| `DatePicker` | Day | `Dayjs` |
| `DatePicker.MonthPicker` | Month | `Dayjs` |
| `DatePicker.YearPicker` | Year | `Dayjs` |
| `DatePicker.RangePicker` | Day range | `(Dayjs \| undefined)[]` |

Requires `dayjs` as a peer dependency.

---

## Shared props (all variants)

Extends `TextInput` props (except `value`, `onChange`, `ref`).

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `Dayjs` (or `RangePickerValue` for RangePicker) | — | Selected date. Controlled. |
| `onChange` | `(value?: Dayjs, event?) => void` | — | Called when a date is selected or cleared. `value` is `undefined` when cleared. |
| `clearable` | `boolean` | `false` | Show a "Clear" button in the popover footer |
| `format` | `string` | locale default | Custom `dayjs` format string for the displayed value in the input (e.g. `'DD/MM/YYYY'`) |
| `minDate` | `Dayjs` | — | Minimum selectable date. Dates before this are disabled. |
| `maxDate` | `Dayjs` | — | Maximum selectable date. Dates after this are disabled. |
| `autoClose` | `boolean` | `true` | Automatically close the popover after a date is selected |
| `readOnly` | `boolean` | `false` | Disables the popover. Renders the value in a read-only style. |
| `asChild` | `boolean` | `false` | Use `children` as the trigger, merging `className` / `style` / click + ref onto it. |
| `children` | `ReactElement` | — | The trigger element when `asChild` is set. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref to the wrapper div |
| `prevIcon` | `ReactElement` | `Application.icons.prev` | Overrides the popover header's previous month/year icon. |
| `nextIcon` | `ReactElement` | `Application.icons.next` | Overrides the popover header's next month/year icon. |
| `triggerIcon` | `ReactElement` | lucide's `Calendar` | Overrides the trigger's trailing calendar glyph. Not a shared `Application.icons` role — unique to `DatePicker`. |

Also accepts `TextInput` props: `placeholder`, `invalid`, `size`, `disabled`, `inputClassName`, `inputStyle`, etc.

### `useDatePickerTrigger()`

Any component rendered inside an `asChild` trigger can read the live trigger state instead of receiving it as props:

```tsx
const { value, displayValue, expanded, disabled, clear } = useDatePickerTrigger();
```

Throws outside a `DatePicker` / `RangePicker`.

> **Warning:** If `minDate` is after `maxDate`, a console warning is emitted and the values are swapped internally.

---

## Examples

### Day picker

```tsx
const [date, setDate] = useState<Dayjs | undefined>(dayjs());

<DatePicker value={date} onChange={setDate} />
```

### Month picker

```tsx
<DatePicker.MonthPicker
  value={month}
  onChange={setMonth}
/>
```

### Year picker

```tsx
<DatePicker.YearPicker
  value={year}
  onChange={setYear}
/>
```

### Range picker

`value` is a two-element array `[startDate, endDate]`. Either element can be `undefined`.

```tsx
const [range, setRange] = useState<(Dayjs | undefined)[]>([]);

<DatePicker.RangePicker value={range} onChange={setRange} />
```

### With min/max dates

```tsx
<DatePicker
  value={date}
  onChange={setDate}
  minDate={dayjs('2024-01-01')}
  maxDate={dayjs('2024-12-31')}
/>
```

### Clearable

```tsx
<DatePicker
  value={date}
  onChange={(v) => setDate(v)}
  clearable
/>
```

### Custom display format

```tsx
<DatePicker
  value={date}
  onChange={setDate}
  format="DD/MM/YYYY"
/>
```

### No auto-close (multi-step selection)

```tsx
<DatePicker
  value={date}
  onChange={setDate}
  autoClose={false}
/>
```

### Read-only display

```tsx
<DatePicker value={date} onChange={() => {}} readOnly />
```

### With TextInput props

```tsx
<DatePicker
  value={date}
  onChange={setDate}
  placeholder="Select a date"
  invalid={!date}
  size="l"
/>
```

### Custom trigger

```tsx
// asChild — bring your own element
<DatePicker value={date} onChange={setDate} asChild>
  <Button label={date ? date.format('D MMM') : 'Pick a date'} />
</DatePicker>

// asChild + useDatePickerTrigger() — read the live state from a nested component
const MyTrigger = () => {
  const { displayValue, expanded } = useDatePickerTrigger();
  return (
    <Button
      label={displayValue || 'Pick a date'}
      additionalIcon={expanded ? <ChevronUp /> : <ChevronDown />}
    />
  );
};

<DatePicker value={date} onChange={setDate} asChild>
  <MyTrigger />
</DatePicker>
```

---

## Behavior details

- The day grid inside the popover is the library's `Calendar` component (`mode="single"` for `DatePicker`, `mode="range"` for `RangePicker`) — weekday names, first-day-of-week, range highlighting and the selected-day animation all come from it. The popover's header (with month/year drill-down) and footer are `DatePicker`-specific.
- The displayed value in the input is formatted using `dayjs(value).locale(locale).format(format)` where `locale` comes from the internal `useLocale()` hook, which currently defaults to `en-US` — there is no app-wide locale prop yet.
- When the popover closes, the view resets to the picker's native level (e.g. reopening a `DatePicker` always starts at the day view, not the month/year navigation view left from the previous session).
- The `readOnly` prop prevents the popover from opening but does not change the `TextInput` to `disabled` — the field remains focusable for screen readers.
