# claude_md_manager

Drafting ... ...

```angular2html
當下 repo 測試
npm run dev -- init --team sdet --template sample_repo_1 --force
npm run dev -- update
```

```angular2html
其他 repo 測試
pnpm link --global
claudemd-manager init --team sdet --template sample_repo_1
claudemd-manager update

pnpm unlink --global
```


```angular2html
  情境 1：開發測試
  # 用本地 template（local_provider）
  claudemd-manager init --team sdet --template sample_repo_1

  情境 2：使用公開 template
  claudemd-manager init --team sdet --template sample_repo_1




  情境 3：使用公司內部 template
  Part 1: 你的準備工作（一次性）
  步驟 1.1: 設定 package.json
  檔案： package.json

  {
    "name": "@your-company/claudemd-manager",  // 必須加 scope
    "version": "0.1.0",
    "publishConfig": {
      "@your-company:registry": "https://xxcompany.gitlab.com/api/v4/projects/PROJECT_ID/packages/npm/"
    }
  }

  說明：
  - @your-company = 你的 scope（公司名稱）
  - PROJECT_ID = GitLab 專案 ID（在專案頁面可以看到）

  ---
  步驟 1.2: 產生 GitLab Token（你）
  1. 到 GitLab：https://xxcompany.gitlab.com/-/profile/personal_access_tokens
  2. 點擊 Add new token
  3. 設定：
    - Name: npm-publish
    - Expiration: 選擇過期時間（或不過期）
    - Scopes: 勾選 api 或 write_repository
  4. 產生後複製 token：glpat-xxxxxxxxxxxxx

  步驟 1.3: 設定 npm 認證（你）
  # 方法 1：設定在 .npmrc（推薦）
  npm config set -- '//xxcompany.gitlab.com/api/v4/projects/PROJECT_ID/packages/npm/:_authToken' "glpat-xxx"
  # 方法 2：環境變數
  export NPM_TOKEN="glpat-xxx"
  ---
  Part 2: 發佈流程（你每次更新都要做）
  步驟 2.1: 確認檔案準備好
  # 確認要發佈的內容
  cd ~/Documents/shyin-personal-git-new/claude_md_manager
  # 檢查 package.json 的 files 欄位
  cat package.json
  確認 files 包含：
  {
    "files": [
      "bin/",
      "src/",
      "template/",  // ← 重要！templates 要包含
      "README.md"
    ]
  }

  ---
  步驟 2.2: 發佈到 GitLab

  # 1. 確認版本號（每次發佈要遞增）
  npm version patch  # 0.1.0 → 0.1.1
  # 或
  npm version minor  # 0.1.0 → 0.2.0

  # 2. 發佈
  npm publish

  # 成功訊息：
  # + @your-company/claudemd-manager@0.1.1

  ---
  步驟 2.3: 確認發佈成功

  到 GitLab 檢查：
  https://xxcompany.gitlab.com/your-team/claudemd-manager/-/packages
  應該會看到你的 package。

  ---
  Part 3: 同事安裝流程（一次性設定）
  步驟 3.1: 產生 GitLab Token（同事）
  每個同事都要自己產生 token：

  1. 到 GitLab：https://xxcompany.gitlab.com/-/profile/personal_access_tokens
  2. 點擊 Add new token
  3. 設定：
    - Name: npm-install
    - Scopes: 勾選 read_api 或 read_repository
  4. 產生後複製 token：glpat-yyyyyyyyy

  ---
  步驟 3.2: 設定 npm registry（同事，一次性）

  # 1. 設定 scope 對應的 registry
  npm config set @your-company:registry https://xxcompany.gitlab.com/api/v4/projects/PROJECT_ID/packages/npm/

  # 2. 設定認證 token
  npm config set -- '//xxcompany.gitlab.com/api/v4/projects/PROJECT_ID/packages/npm/:_authToken' "glpat-yyyyyyyyy"

  # 3. 確認設定
  npm config get @your-company:registry
  npm config get -- '//xxcompany.gitlab.com/api/v4/projects/PROJECT_ID/packages/npm/:_authToken'

  設定會存在： ~/.npmrc

  ---
  步驟 3.3: 安裝（同事）

  # 全域安裝
  npm install -g @your-company/claudemd-manager

  # 成功訊息：
  # + @your-company/claudemd-manager@0.1.1

  ---
  步驟 3.4: 使用（同事）

  # 直接使用
  claudemd-manager --help

  # 初始化專案
  cd ~/my-project
  claudemd-manager init --team sdet --template jkopay_api

  # 更新
  claudemd-manager update

  ---
  Part 4: 更新流程

  你發佈新版本

  # 1. 修改程式碼或 templates
  vim template/sdet/new_template.md

  # 2. 遞增版本
  npm version patch  # 0.1.1 → 0.1.2
  # 3. 發佈
  npm publish

  同事更新
  # 更新到最新版本
  npm update -g @your-company/claudemd-manager
  # 或重新安裝
  npm install -g @your-company/claudemd-manager@latest

  ---
  完整流程圖

  你（維護者）：
  1. 修改程式碼/templates
  2. npm version patch
  3. npm publish
     ↓
  GitLab Package Registry（存放）
     ↓
  同事（使用者）：
  1. 設定 npm registry（一次）
  2. 設定 token（一次）
  3. npm install -g @your-company/claudemd-manager
  4. claudemd-manager init --team sdet --template xxx

  ---
  快速參考

  你要做的（發佈）
  npm version patch
  npm publish

  同事要做的（第一次）
  npm config set @your-company:registry https://xxcompany.gitlab.com/api/v4/projects/PROJECT_ID/packages/npm/
  npm config set -- '//xxcompany.gitlab.com/api/v4/projects/PROJECT_ID/packages/npm/:_authToken' "glpat-xxx"
  npm install -g @your-company/claudemd-manager

  同事要做的（更新）
  npm update -g @your-company/claudemd-manager
```

```angular2html
 # 使用者安裝你的 CLI（從 npm）
  npm install -g @shyinlim/claude-md-manager

# 之後就可以用
claudemd-manager init --team sdet --template sample_repo_1
```