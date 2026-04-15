# altrone-mcp

MCP server for [Altrone UI](https://github.com/apcom/altrone) component library documentation.

Each component has a dedicated Markdown file in `docs/` describing its props, usage, and examples.

## Tools

| Tool | Description |
|------|-------------|
| `list_components` | List all documented components |
| `get_component_docs` | Get full documentation for a component by name |

## Setup

```bash
npm install
npm run build
```

### Claude Desktop config

Add to `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "altrone": {
      "command": "node",
      "args": ["/absolute/path/to/altrone-mcp/dist/index.js"]
    }
  }
}
```

Or for development (no build step):

```json
{
  "mcpServers": {
    "altrone": {
      "command": "npx",
      "args": ["tsx", "/absolute/path/to/altrone-mcp/src/index.ts"]
    }
  }
}
```

## Adding a new component

Create `docs/ComponentName.md` following the existing files as a template. The server picks it up automatically — no code changes needed.
