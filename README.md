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



