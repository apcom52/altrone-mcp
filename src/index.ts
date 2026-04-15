#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { readdir, readFile } from "fs/promises";
import { join, basename, extname } from "path";
import { fileURLToPath } from "url";
import { z } from "zod";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const DOCS_DIR = join(__dirname, "..", "docs");

async function listComponents(): Promise<string[]> {
  const files = await readdir(DOCS_DIR);
  return files
    .filter((f) => extname(f) === ".md" && basename(f, ".md") !== "GUIDELINES")
    .map((f) => basename(f, ".md"));
}

async function getComponentDocs(name: string): Promise<string> {
  const filePath = join(DOCS_DIR, `${name}.md`);
  return readFile(filePath, "utf-8");
}

async function getGuidelines(): Promise<string> {
  const filePath = join(DOCS_DIR, "GUIDELINES.md");
  return readFile(filePath, "utf-8");
}

const server = new McpServer({
  name: "altrone-mcp",
  version: "0.1.0",
});

server.tool(
  "list_components",
  "List all available Altrone UI components. IMPORTANT: before writing any UI code, call get_guidelines to read the mandatory usage rules for this library.",
  {},
  async () => {
    const components = await listComponents();
    return {
      content: [
        {
          type: "text",
          text: components.length
            ? `Available altrone-ui components:\n${components.map((c) => `- ${c}`).join("\n")}\n\nIMPORTANT: Call get_guidelines before writing any UI code to read the mandatory rules for using this library.`
            : "No components found.",
        },
      ],
    };
  },
);

server.tool(
  "get_component_docs",
  "Get documentation for a specific Altrone UI component",
  { component: z.string().describe("Component name, e.g. Button or Text") },
  async ({ component }) => {
    const components = await listComponents();
    const match = components.find(
      (c) => c.toLowerCase() === component.toLowerCase(),
    );

    if (!match) {
      return {
        content: [
          {
            type: "text",
            text: `Component "${component}" not found. Available: ${components.join(", ")}`,
          },
        ],
        isError: true,
      };
    }

    const docs = await getComponentDocs(match);
    return {
      content: [{ type: "text", text: docs }],
    };
  },
);

server.tool(
  "get_guidelines",
  "Get mandatory usage rules for altrone-ui: which components to use instead of raw HTML, layout rules, form rules, feedback patterns, and general principles. Read this before writing any UI code.",
  {},
  async () => {
    const guidelines = await getGuidelines();
    return {
      content: [{ type: "text", text: guidelines }],
    };
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);
