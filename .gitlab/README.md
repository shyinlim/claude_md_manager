# GitLab CI - Publish to npm Registry

## Versioning

Uses **CalVer**: `YYYY.M.patch` (e.g., `2025.12.0`, `2025.12.1`)

## CI Setup

1. Create GitLab token: Project > Settings > Access Tokens (with `api` scope)
2. Add CI variable: Settings > CI/CD > Variables > `CI_PUSH_TOKEN`
   - Protect variable: No (✘)
   - Mask variable: Yes (✔)
   - Expand variable reference: (✘)

## How it works

- Triggers on push to `master`
- Uses pnpm with `--frozen-lockfile`
- Auto-generates CalVer version based on existing registry versions
- Publishes to GitLab npm registry (private)
- Commits updated `package.json` back to repo
- Skips CI commits to prevent loop

## User Setup

See [main README - Installation](../../README.md#installation) for `.npmrc` setup instructions.
