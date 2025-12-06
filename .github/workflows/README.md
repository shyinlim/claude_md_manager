# GitHub Actions - Publish to npm

## Versioning

Uses **CalVer**: `YYYY.M.patch` (e.g., `2025.12.0`, `2025.12.1`)

## Prerequisites

1. Register an account at [npmjs.com](https://www.npmjs.com/signup)

## CI Setup

1. Create npm token:
   - Go to npmjs.com > Click avatar > Access Tokens
   - Name should be same with package.json bin (ex. `claude-setting-manager`) > Generate New Token
   - Copy the token

2. Add to GitHub Secrets:
   - Repository > Settings > Secrets and variables > Actions
   - New repository secret
   - Name: `NPM_TOKEN`
   - Value: (paste your npm token)

## How it works

- Triggers on push to `master`
- Uses pnpm with `--frozen-lockfile`
- Auto-generates CalVer version based on existing npm versions
- Publishes to public npm registry
- Commits updated `package.json` back to repo
- Skips CI commits to prevent loop

## User Setup

No setup required. See [main README - Usage](../../../README.md#usage) for commands.
