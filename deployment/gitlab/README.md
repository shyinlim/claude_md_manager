  # GitLab NPM Registry Setup

  ## Steps

  1. **Edit package.json**
     - Change `name` to `@your-scope/your-package-name`
     - Update `repository.url` to your GitLab repo

  2. **Create .npmrc**
     - Copy `.npmrc.example` to project root as `.npmrc`
     - Replace placeholders with your values

  3. **Set CI/CD Variables**
     - Go to Settings → CI/CD → Variables
     - Add `NPM_TOKEN` (your GitLab token)

  4. **Copy CI file**
     - Copy `.gitlab-ci.yml` to project root

  5. **Publish**
     - Create a git tag: `git tag v1.0.0 && git push --tags`