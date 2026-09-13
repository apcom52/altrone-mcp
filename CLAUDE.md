# CLAUDE.md — altrone-mcp

## Overview

MCP server (`@altrone/mcp`) that exposes `altrone-ui` component documentation to MCP clients such as Claude Desktop. Each component in `core/` has a matching Markdown doc file under `docs/` here.

## Stack

- Node.js + TypeScript
- `@modelcontextprotocol/sdk`

## Structure

```
src/
└── index.ts        # server entry point, tool definitions
docs/                # one .md file per component, mirrors core/src/components
```

## Commands

```bash
npm run dev      # run directly with tsx, no build step
npm run build    # tsc -> dist/
npm run start    # run compiled server (dist/index.js)
```

## Rules

@../.claude/rules/typescript.md
@../.claude/rules/comments.md
@../.claude/rules/communication.md
@../.claude/rules/mcp-server.md
