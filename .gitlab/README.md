# GitLab CI - Publish to npm Registry

## Versioning

Uses **CalVer**: `YYYY.M.patch` (e.g., `2025.12.0`, `2025.12.1`)

## package.json Setup

```json
{
  "name": "@YOUR_SCOPE/your-package-name",
  "publishConfig": {
    "registry": "https://gitlab.com/api/v4/projects/PROJECT_ID/packages/npm/"
  }
}
```

## CI .npmrc Setup

Create `.gitlab/.npmrc` for CI to publish:

```
@YOUR_SCOPE:registry=https://gitlab.com/api/v4/projects/PROJECT_ID/packages/npm/
//gitlab.com/api/v4/projects/PROJECT_ID/packages/npm/:_authToken=${CI_JOB_TOKEN}
```

The CI workflow will copy this file to root: `cp .gitlab/.npmrc .npmrc`

See [.npmrc.example](.npmrc.example) for reference.

## CI .gitlab-ci.yml Setup

Update the package name in `.gitlab/.gitlab-ci.yml`:

```yaml
VERSIONS=$(npm view @YOUR_SCOPE/your-package-name versions --json 2>/dev/null || echo "[]")
```

## CI Variables Setup

1. Create GitLab token: Project > Settings > Access Tokens (with `api` scope)
2. Add CI variable: Settings > CI/CD > Variables > `CI_PUSH_TOKEN`
   - Protect variable: No
   - Mask variable: Yes
   - Expand variable reference: No

## How it works

- Triggers on push to `master`
- Copies `.gitlab/.npmrc` to root for registry auth
- Auto-generates CalVer version based on existing registry versions
- Publishes to GitLab npm registry (private)
- Commits updated `package.json` back to repo
- Skips CI commits to prevent loop

## User Setup

Create `~/.npmrc` on local machine:

```
@YOUR_SCOPE:registry=https://gitlab.com/api/v4/projects/PROJECT_ID/packages/npm/
//gitlab.com/api/v4/projects/PROJECT_ID/packages/npm/:_authToken=YOUR_GITLAB_ACCESS_TOKEN
```

Replace:
- `YOUR_SCOPE` - Your GitLab username or group name
- `PROJECT_ID` - GitLab project ID (number)
- `YOUR_GITLAB_ACCESS_TOKEN` - Personal Access Token with `read_api` scope

Then use:

```bash
npx @YOUR_SCOPE/claude-setting-manager@latest list
```
