# AGENTS.md — altrone-mcp

## Workspace instructions

Explicitly read ../AGENTS.md before working here and follow its workspace-wide rules. A session launched in this independent Git repository may not automatically discover parent instructions or skills. Shared rules are in ../.agents/rules/ and shared skills in ../.agents/skills/. Read the relevant SKILL.md explicitly if the skill is unavailable in the selector.

## Overview

MCP server (`@altrone/mcp`) that exposes `altrone-ui` component documentation to MCP clients such as Codex. Each component in `core/` has a matching Markdown doc file under `docs/` here.

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

Before work, explicitly read the applicable rule files below; these links are not automatic imports. For code changes always read typescript, comments, and communication. Paths are relative to this AGENTS.md.

- [typescript](../.agents/rules/typescript.md)
- [comments](../.agents/rules/comments.md)
- [communication](../.agents/rules/communication.md)
- [mcp-server](../.agents/rules/mcp-server.md)
