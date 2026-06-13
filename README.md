# coree for Windsurf

Persistent memory and code intelligence for AI agents in [Windsurf](https://windsurf.com).

## Install

### Step 1 - MCP Server

Add coree to Windsurf's MCP config at `~/.codeium/windsurf/mcp_config.json`.

Merge the contents of [`mcp_config.json`](./mcp_config.json) from this repo into your config file:

```json
{
  "mcpServers": {
    "coree": {
      "command": "npx",
      "args": ["--yes", "@coree-ai/coree@0.14.1", "serve"],
      "env": {
        "COREE__MEMORY__REMOTE_AUTH_TOKEN": "${COREE__MEMORY__REMOTE_AUTH_TOKEN}",
        "COREE__MEMORY__REMOTE_URL": "${COREE__MEMORY__REMOTE_URL}",
        "COREE__INDEX__REMOTE_AUTH_TOKEN": "${COREE__INDEX__REMOTE_AUTH_TOKEN}",
        "COREE__INDEX__REMOTE_URL": "${COREE__INDEX__REMOTE_URL}",
        "COREE_BINARY_OVERRIDE": "${COREE_BINARY_OVERRIDE}",
        "COREE_MODEL_DIR": "${COREE_MODEL_DIR}"
      }
    }
  }
}
```

Restart Windsurf after saving.

### Step 2 - Steering Doc

Copy the `.windsurfrules` file from this repo to your project root so Windsurf
knows how to use coree:

```sh
curl -fsSL https://raw.githubusercontent.com/coree-ai/windsurf/main/.windsurfrules -o .windsurfrules
```

> **Important**: Windsurf Cascade hook stdout does not reach model context, so
> hooks are NOT used for injection (unlike some other hosts). The steering doc
> instructs the agent to call `session_context()` and `search()` on every task.
> This agent-pull approach is the official model for Windsurf.

### Step 3 - Verify

In a Windsurf Cascade session, after installing the MCP server and copying the
steering doc, ask: `What coree tools are available?`

Cascade should list tools like `search`, `store_memories`, `get_symbol`, etc.
The agent will call `session_context()` and `search()` following the steering doc.
