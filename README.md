# claude-setting-manager

[繁體中文](README.zh-TW.md)

Centralized CLAUDE.md management tool for teams. Manage and distribute Claude Code configuration templates across multiple projects.

![ezgif-result.gif](readme%2Fezgif-result.gif)

## Features

- **Template Management**: Centralized templates for CLAUDE.md and SKILL.md files
- **Team Configuration**: Share consistent Claude Code settings across team repositories
- **Easy Updates**: Update project configurations from latest templates with one command

## Installation

### Before installation, GitLab user must setup (If Github pls ignore)

For GitLab private registry, create `~/.npmrc` in local first:

```
@YOUR_SCOPE:registry=https://gitlab.com/api/v4/projects/PROJECT_ID/packages/npm/
//gitlab.com/api/v4/projects/PROJECT_ID/packages/npm/:_authToken=YOUR_GITLAB_ACCESS_TOKEN
```

### Choose one package manager

```bash
# If using npm
npm install -g claude-setting-manager

# If using pnpm
pnpm add -g claude-setting-manager

# Or run directly without installing
npx claude-setting-manager --help
```

## Usage

| Source | Command Prefix |
|--------|----------------|
| GitHub (npmjs.com) | `npx claude-setting-manager@latest` |
| GitLab (private) | `npx @YOUR_SCOPE/claude-setting-manager@latest` |



### Commands

| Command | Description | Options |
|---------|-------------|---------|
| `list` | List available templates | `--all` Show all templates |
| `init` | Initialize project with template | `--type` instruction/skill<br>`--category` Template category<br>`--profile` Profile name<br>`--force` Overwrite existing<br>`--skip-base` Skip base template |
| `update` | Update from configured templates | `--force` Force update<br>`--skip-base` Skip base template |

### Examples

```bash
cd your-project

# List available templates
npx claude-setting-manager@latest list

# Initialize with instruction template
npx claude-setting-manager@latest init --type instruction --category sdet --profile sample_repo_1

# Initialize with skill template
npx claude-setting-manager@latest init --type skill --category professional1

# Update configuration
npx claude-setting-manager@latest update
```

---

## Development

### Prerequisites

- Node.js >= 20.0.0
- pnpm >= 10.x

### Setup

```bash
# Clone repository
git clone REPOSITORY
cd claude_setting_manager

# Install dependencies
pnpm install

# Link for local development
pnpm link --global

# Test CLI
claude-setting-manager --help
```

### Development Commands

```bash
# Run CLI in development
pnpm dev

# Unlink when done
pnpm unlink --global
```

### Project Structure

```
claude_setting_manager/
├── bin/
│   └── cli.js             # CLI entry point
├── src/
│   ├── command/           # Command handlers
│   ├── core/              # Core logic
│   └── index.js           # Main program
└── template/
    ├── instruction/       # CLAUDE.md templates
    │   ├── sdet/
    │   │   ├── 00_base.md
    │   │   └── sample_repo_1.md
    │   └── team1/
    │       ├── 00_base.md
    │       └── sample_repo_1.md
    └── skill/             # SKILL.md templates
        ├── professional1/
        │   └── SKILL.md
        └── professional2/
            └── SKILL.md
```

### Configuration File

After running `init`, a config file is created at `.claude/.claude.md.config.json`:

```json
{
  "type": "instruction",
  "category": "sdet",
  "profile": "sample_repo_1"
}
```

### Adding New Templates

1. Create a new directory under `template/instruction/` or `template/skill/`
2. Add your markdown files (use `00_base.md` for shared base content)
3. Run `claude-setting-manager list` to verify

---

## Release

| Platform | Registry | Documentation |
|----------|----------|---------------|
| GitHub Actions | npmjs.com (public) | [.github/README.md](.github/workflows/README.md) |
| GitLab CI | GitLab npm registry (private) | [.gitlab/README.md](.gitlab/README.md) |

Both use **CalVer** versioning: `YYYY.M.patch` (e.g., `2025.12.0`)

---

## License

MIT
