  # GitHub + npm Registry Setup

  ## Steps

  ### 1. Get npm Token
  - Go to [npmjs.com](https://www.npmjs.com) → Account → Access Tokens
  - Create new token (Automation type)

  ### 2. Add Secret to GitHub
  - Go to your repo → Settings → Secrets and variables → Actions
  - Add new secret: `NPM_TOKEN` = your npm token

  ### 3. Copy CI file
  ```bash
  cp deployment/github/publish.yml .github/workflows/publish.yml

  4. Update package.json

  Edit package.json:
  - name: your package name
  - repository.url: your GitHub repo URL

  5. Push to master

  Every push to master will:
  1. Bump patch version (1.0.0 → 1.0.1)
  2. Create git tag
  3. Publish to npm
```