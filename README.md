# claudemd-manager (Developing ... ...)

## Installation (Development)

```bash
# Go to repo
cd claude_md_manager

# Install dependencies
npm install

# Link for local development when clompleted coding
pnpm link --global

# Now you can use the CLI
claudemd-manager --help

# If changed code
pnpm unlink --global
```

### Quick Start

```bash
# Test in a separate directory
mkdir test-project
cd test-project

# Initialize config
claude-setting-manager init --type instruction --category sdet --profile sample_repo_1
claude-setting-manager init --type skill --category professional1

# Verify config file
cat .claude/.claude.md.config.json

# Test update
claudemd-manager update
```

### Adding New Templates

1. Create a new directory under `template/instruction/` or `template/skill/`
2. Add your markdown files
3. Run `claude-setting-manager list` to verify


### GitHub (Public npm)

**CI Setup:**
1. Create npm token: npmjs.com → Access Tokens → Generate New Token (Automation)
2. Add to GitHub: Repository → Settings → Secrets → Actions → `NPM_TOKEN`

**Usage:**
```bash
npm install claude-setting-manager
# or
npx claude-setting-manager@latest list
```

### GitLab (Private npm)

**CI Setup:**
1. Create GitLab token: Project → Settings → Access Tokens (with `api` scope)
2. Add CI variable: Settings → CI/CD → Variables → `CI_PUSH_TOKEN`
   - Protect variable: ❌
   - Mask variable: ✅
   - Expand variable reference: ❌

**User Setup (create `~/.npmrc`):**
```
@USER_NAME:registry=https://gitlab.com/api/v4/projects/PROJECTID/packages/npm/
//gitlab.com/api/v4/projects/PROJECTID/packages/npm/:_authToken=YOUR_GITLAB_TOKEN_HERE
```

**Usage:**
```bash
npx @USER_NAME/claude-setting-manager@latest list
npx @USER_NAME/claude-setting-manager@latest init --type instruction --category sdet --profile sample_repo_1
```