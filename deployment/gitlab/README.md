# GitLab NPM Registry Setup

## Steps

### 1. Edit package.json
- Change `name` to `@your-scope/your-package-name`
- Update `repository.url` to your GitLab repo

### 2. Create .npmrc
- Copy `.npmrc.example` to project root as `.npmrc`
- Replace placeholders with your values

### 3. Set CI/CD Variables
- Go to Settings → CI/CD → Variables
- Add `NPM_TOKEN` (your GitLab token)

### 4. Copy CI file
```bash
cp deployment/gitlab/.gitlab-ci.yml .gitlab-ci.yml
```

### 5. Push to master
Every push to master will automatically:
1. Generate version: `0.0.0-YYYYMMDD.g<commit>`
2. Create git tag
3. Publish to GitLab registry