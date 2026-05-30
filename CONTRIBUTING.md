# Contributing to Awesome MCP Servers

Thanks for helping improve this catalog. This project keeps a curated list of MCP servers in `data/servers.json` and generates the README from that file.

## What belongs here

Add servers that are:

- Publicly available with a repo, docs page, or official registry listing
- Clearly scoped as MCP servers (not generic API wrappers without MCP support)
- Useful to researchers, developers, or teams evaluating MCP integrations
- Maintained or officially backed (avoid abandoned forks and spam listings)

## What to skip

- Duplicate mirrors of the same project
- Low-effort demos with no docs or clear purpose
- Projects impersonating official services
- Servers with no verifiable source or install path

## How to add an entry

1. Edit [`data/servers.json`](data/servers.json)
2. Add an object with these fields:

```json
{
  "name": "Example MCP Server",
  "url": "https://github.com/modelcontextprotocol/servers",
  "description": "One concise sentence describing what the server does.",
  "category": "developer-tools-and-code-intelligence",
  "language": "TypeScript",
  "provider": "Example Inc",
  "tags": ["github", "devtools"],
  "official": false
}
```

### Field guidelines

| Field | Required | Notes |
| --- | --- | --- |
| `name` | Yes | Human-readable project name |
| `url` | Yes | Primary repo, docs, or registry page |
| `description` | Yes | One sentence, factual, no hype |
| `category` | Yes | Must match an ID in `data/categories.json` |
| `language` | Yes | Primary implementation language |
| `provider` | Yes | Company, org, or `Community` |
| `tags` | Yes | 2–5 lowercase keywords |
| `official` | No | Set `true` only for official MCP or vendor-backed servers |

## Category selection

Use the category that best matches the server's primary use case. If a server spans multiple areas, pick the most important workflow and use tags for the rest.

Available categories are defined in [`data/categories.json`](data/categories.json).

## PR checklist

- [ ] Entry added to `data/servers.json`
- [ ] No duplicate names or URLs
- [ ] Description is accurate and concise
- [ ] Category and tags are appropriate
- [ ] Ran `node scripts/validate-data.mjs`
- [ ] Ran `node scripts/generate-readme.mjs`

## Validation

```bash
node scripts/validate-data.mjs
node scripts/generate-readme.mjs
```

Validation checks required fields, category validity, duplicate names/URLs, and minimum catalog size.

## Code of conduct

Be respectful, cite sources accurately, and prefer quality over quantity.
