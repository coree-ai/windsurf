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
      "args": ["--yes", "@coree-ai/coree@0.13.0", "serve"],
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

### Step 2 - Hooks (Optional)

Windsurf supports lifecycle hooks that inject coree context automatically. There are two scopes:

**Workspace scope** (project-specific, recommended):
Copy `.windsurf/hooks.json` from this repo into your project root:
```sh
mkdir -p .windsurf
curl -fsSL https://raw.githubusercontent.com/coree-ai/windsurf/main/.windsurf/hooks.json -o .windsurf/hooks.json
```

**User scope** (applies to all projects):
Copy to `~/.codeium/windsurf/hooks.json`.

Hook configs from both scopes are merged: system -> user -> workspace.

### Step 3 - Verify

In a Windsurf Cascade session, ask: `What coree tools are available?`

Cascade should list tools like `search`, `store_memories`, `capture_note`, etc.

## Hook Events

The workspace hooks template enables:

| Hook | Purpose |
|------|---------|
| `pre_user_prompt` | Injects relevant memories/notes before each prompt (with `show_output: true` so you can see what was injected) |
| `post_cascade_response` | Saves session summary after each response |

Windsurf exposes 12 total hook events. Pre-hooks can block execution by exiting with code 2.
All available events: `pre_user_prompt`, `pre_read_code`, `pre_write_code`, `pre_run_command`,
`pre_mcp_tool_use`, `post_cascade_response`, `post_cascade_response_with_transcript`,
`post_read_code`, `post_write_code`, `post_run_command`, `post_mcp_tool_use`, `post_setup_worktree`.

## Environment Variables

Set these in your shell profile (`~/.bashrc`, `~/.zshrc`, etc.):

| Variable | Description |
|----------|-------------|
| `COREE__MEMORY__REMOTE_AUTH_TOKEN` | Auth token for remote memory sync |
| `COREE__MEMORY__REMOTE_URL` | Remote memory database URL |
| `COREE__INDEX__REMOTE_AUTH_TOKEN` | Auth token for remote index sync |
| `COREE__INDEX__REMOTE_URL` | Remote index database URL |

Windsurf inherits env vars from the shell that launched it, so variables set in your profile
are available to MCP servers without additional configuration.

## Requirements

- [Node.js](https://nodejs.org) 18+ with `npx` on `PATH`
- Windsurf with Cascade and MCP support

## Version Bumping

```sh
node scripts/bump-version.mjs 0.14.0
```

Updates all version references in `mcp_config.json`, `.windsurf/hooks.json`, and `README.md`.
