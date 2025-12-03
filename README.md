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
  # 從 GitHub 下載（github_provider）
  claudemd-manager init --team sdet --template sample_repo_1 --source github

  情境 3：使用公司內部 template
  # 從 GitLab 下載（gitlab_provider）
  export GITLAB_TOKEN="your-token"
  claudemd-manager init --team sdet --template jkopay_api_test --source gitlab
```

```angular2html
 # 使用者安裝你的 CLI（從 npm）
  npm install -g @shyinlim/claude-md-manager

# 之後就可以用
claudemd-manager init --team sdet --template sample_repo_1
```