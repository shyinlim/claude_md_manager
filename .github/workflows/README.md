# GitHub Actions - Publish to npm

## Versioning

Uses **CalVer**: `YYYY.M.patch` (e.g., `2025.12.0`, `2025.12.1`)

## Setup

1. Create npm token: npmjs.com → Access Tokens → Generate New Token (Automation)
2. Add to GitHub: Repository → Settings → Secrets → Actions → `NPM_TOKEN`

## How it works

- Triggers on push to `master`
- Auto-generates CalVer version based on existing npm versions
- Publishes to public npm registry
- Commits updated `package.json` back to repo
- Skips CI commits to prevent loop
