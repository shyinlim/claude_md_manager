# claude-setting-manager

[English](README.md)

團隊 CLAUDE.md 集中管理工具。可以集中管理跨專案 Repo 的 Claude Code 設定模板。

## 功能特色

- **模板管理**：集中管理 CLAUDE.md 和 SKILL.md 模板
- **團隊設定**：跨 repo 共享一致的 Claude Code 設定
- **輕鬆更新**：一個指令更新專案設定

## 安裝

### GitLab 使用者須先設定（GitHub 使用者請跳過）

GitLab 私有 registry 使用者，先在本機建立 `~/.npmrc`：

```
@YOUR_SCOPE:registry=https://gitlab.com/api/v4/projects/PROJECT_ID/packages/npm/
//gitlab.com/api/v4/projects/PROJECT_ID/packages/npm/:_authToken=YOUR_GITLAB_ACCESS_TOKEN
```

### 選擇一個套件管理器

```bash
# npm
npm install -g claude-setting-manager

# pnpm
pnpm add -g claude-setting-manager

# 或直接執行（不安裝）
npx claude-setting-manager --help
```

## 使用方式

| 來源 | 指令前綴 |
|------|----------|
| GitHub (npmjs.com) | `npx claude-setting-manager@latest` |
| GitLab (私有) | `npx @YOUR_SCOPE/claude-setting-manager@latest` |

### 指令

| 指令 | 說明 | 選項 |
|------|------|------|
| `list` | 列出可用模板 | `--all` 顯示所有模板 |
| `init` | 用模板初始化專案 | `--type` instruction/skill<br>`--category` 模板分類<br>`--profile` 設定檔名稱<br>`--force` 強制覆蓋<br>`--skip-base` 跳過基礎模板 |
| `update` | 從已設定的模板更新 | `--force` 強制更新<br>`--skip-base` 跳過基礎模板 |

### 範例

```bash
cd your-project

# 列出可用模板
npx claude-setting-manager@latest list

# 用 instruction 模板初始化
npx claude-setting-manager@latest init --type instruction --category sdet --profile sample_repo_1

# 用 skill 模板初始化
npx claude-setting-manager@latest init --type skill --category professional1

# 更新設定
npx claude-setting-manager@latest update
```

---

## 開發

### 環境需求

- Node.js >= 20.0.0
- pnpm >= 10.x

### 設定

```bash
# Clone 專案
git clone REPOSITORY
cd claude_setting_manager

# 安裝依賴
pnpm install

# 本地開發連結
pnpm link --global

# 測試 CLI
claude-setting-manager --help
```

### 開發指令

```bash
# 開發模式執行
pnpm dev

# 完成後解除連結
pnpm unlink --global
```

### 專案結構

```
claude_setting_manager/
├── bin/
│   └── cli.js             # CLI 進入點
├── src/
│   ├── command/           # 指令處理
│   ├── core/              # 核心邏輯
│   └── index.js           # 主程式
└── template/
    ├── instruction/       # CLAUDE.md 模板
    │   ├── sdet/
    │   │   ├── 00_base.md
    │   │   └── sample_repo_1.md
    │   └── team1/
    │       ├── 00_base.md
    │       └── sample_repo_1.md
    └── skill/             # SKILL.md 模板
        ├── professional1/
        │   └── SKILL.md
        └── professional2/
            └── SKILL.md
```

### 設定檔

執行 `init` 後，會在 `.claude/.claude.md.config.json` 建立設定檔：

```json
{
  "type": "instruction",
  "category": "sdet",
  "profile": "sample_repo_1"
}
```

### 新增模板

1. 在 `template/instruction/` 或 `template/skill/` 下建立新目錄
2. 新增 markdown 檔案（用 `00_base.md` 作為共用基礎內容）
3. 執行 `claude-setting-manager list` 確認

---

## 發布

| 平台 | Registry | 文件 |
|------|----------|------|
| GitHub Actions | npmjs.com (公開) | [.github/workflows/README.md](.github/workflows/README.md) |
| GitLab CI | GitLab npm registry (私有) | [.gitlab/README.md](.gitlab/README.md) |

兩者都使用 **CalVer** 版本格式：`YYYY.M.patch`（例如 `2025.12.0`）

---

## 授權

MIT
