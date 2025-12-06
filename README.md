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
claudemd-manager init --type instruction --category sdet --profile sample_repo_1
claudemd-manager init --type skill --category professional1

# Verify config file
cat .claude/.claude.md.config.json

# Test update
claudemd-manager update
```

### Adding New Templates

1. Create a new directory under `template/instruction/` or `template/skill/`
2. Add your markdown files
3. Run `claudemd-manager list` to verify

### Release
```shell
CI_PUSH_TOKEN
# Gitlab gen GitLab Project → Settings → Access Tokens

# Settings > CI/CD > Variable
# CI_PUSH_TOKEN
    - Protect variable: ❌ 不要勾選（這可能導致只對 protected branch 生效）
    - Mask variable: ✅ 勾選
    - Expand variable reference: ❌ 不要勾選

BEFORE Request MR
# Local
$ npm install --legacy-peer-deps

# Generate package-lock.json

# Commit to branch

# Request MR


USER SIDE, AFTER RELEASED
create ~/.npmrc
```
# GitLab Registry for @shyin.lim.p scope
```shell
@USER_NAME:registry=https://gitlab.com/api/v4/projects/PROJECTID/packages/npm/
//gitlab.com/api/v4/projects/PROJECTID/packages/npm/:_authToken=YOUR_GITLAB_TOKEN_HERE
```

# command
$ npx @USER_NAME/claude-md-manager@latest list
npx @USER_NAME/claude-md-manager@latest init --type instruction --category sdet --profile sample_repo_1
```