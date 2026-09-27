# FilePicker

A file selection control with optional automatic upload. Renders a hidden `<input type="file">` triggered by a button. Selected files are shown as removable chips. Supports both controlled and uncontrolled modes, single or multiple files, and custom upload/remove handlers.

## Import

```tsx
import { FilePicker } from 'altrone-ui';
```

---

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `FileItem[]` | — | Controlled file list. When provided, the component is controlled. |
| `defaultValue` | `FileItem[]` | `[]` | Initial file list for uncontrolled mode. |
| `onChange` | `(fileList: FileItem[], event) => void` | — | Called whenever the file list changes (file added or removed). |
| `multiple` | `boolean` | `false` | Allow selecting multiple files at once. |
| `accept` | `string` | — | Accepted file types. Passed directly to `<input accept>` (e.g. `"image/*"`, `".pdf,.docx"`). |
| `placeholder` | `string` | localized default | Label on the upload button. |
| `size` | `'mini' \| 's' \| 'm' \| 'l' \| 'xl'` | `'m'` | Scales the pick button and the file chips (height, text, inline retry/delete buttons). |
| `autoUpload` | `boolean` | `true` | Automatically upload files after selection using `url`/`method`/`name` or `autoUploadFn`. |
| `url` | `string` | — | Upload endpoint URL. Required when `autoUpload=true` and no `autoUploadFn` is provided. |
| `method` | `HTMLFormElement['method']` | — | HTTP method for upload (`'post'`, `'put'`, etc.). |
| `name` | `string` | — | Form field name used in the upload request. |
| `autoUploadFn` | `(ctx: FilePickerUploadContext) => Promise<void>` | — | Custom upload handler. Replaces the default `fetch` upload. Receives helpers to track progress. |
| `removeFileFn` | `(ctx: FilePickerRemoveContext) => Promise<void>` | — | Custom delete handler called when a file chip is removed or replaced (single mode). |
| `uploadIcon` | `ReactElement` | upload glyph | Icon for the pick/upload button. |
| `errorIcon` | `ReactElement` | shared `icons.error` | Icon shown on a file chip that failed to upload. |
| `retryIcon` | `ReactElement` | rotate glyph | Icon for the retry button on a failed file chip. |
| `deleteIcon` | `ReactElement` | trash glyph | Icon for the delete button on a file chip. |
| `ref` | `Ref<HTMLDivElement>` | — | Forwarded ref |

---

## FileItem shape

```ts
type FileItem = {
  id?: string;       // auto-generated if missing
  filename?: string; // display name
  file?: File;       // the native File object; absent for pre-existing server files
  [key: string]: unknown; // any extra fields
};
```

---

## autoUploadFn context

```ts
type FilePickerUploadContext = {
  url: string;
  method: string;
  name: string;
  file: File;
  pickerItem: FileItem;
  startUploading: () => void;           // call to enter loading state
  complete: () => void;                 // call on success
  setProgress: (bytes: number) => void; // call to update progress
  fail: (errorMessage?: string) => void; // call on error
};
```

---

## Examples

### Uncontrolled, single file, no auto-upload

```tsx
<FilePicker
  autoUpload={false}
  onChange={(files) => console.log(files)}
/>
```

### Multiple files

```tsx
<FilePicker
  multiple
  autoUpload={false}
  onChange={(files) => setFiles(files)}
/>
```

### Image files only

```tsx
<FilePicker accept="image/*" multiple autoUpload={false} />
```

### Auto-upload to an endpoint

```tsx
<FilePicker
  url="/api/upload"
  method="post"
  name="file"
  autoUpload
  onChange={(files) => setFiles(files)}
/>
```

### Custom upload function

Use `autoUploadFn` for complete control over the upload lifecycle.

```tsx
<FilePicker
  autoUpload
  autoUploadFn={async ({ file, startUploading, complete, fail, setProgress }) => {
    startUploading();
    try {
      const formData = new FormData();
      formData.append('file', file);
      await fetch('/api/upload', { method: 'POST', body: formData });
      complete();
    } catch {
      fail('Upload failed');
    }
  }}
  onChange={(files) => setFiles(files)}
/>
```

### Controlled mode

```tsx
const [files, setFiles] = useState<FileItem[]>([]);

<FilePicker
  value={files}
  onChange={setFiles}
  multiple
  autoUpload={false}
/>
```

### Pre-populated with server files

Pass existing files (without a `file` object) to show them as already-uploaded chips.

```tsx
<FilePicker
  value={[
    { id: 'srv-1', filename: 'report.pdf' },
    { id: 'srv-2', filename: 'invoice.pdf' },
  ]}
  onChange={setFiles}
  removeFileFn={async ({ pickerItem }) => {
    await deleteFile(pickerItem.id);
  }}
/>
```

---

## Behavior details

- In **single-file mode** (`multiple=false`), selecting a new file automatically deletes the previous one — it calls `removeFileFn` or the default delete request before updating the list.
- Each file is assigned a UUID as `id` if none is provided.
- The hidden `<input type="file">` is reset after each selection so the same file can be picked again.
