## Common

### PYTHON CODE QUALITY COORDINATION
🎨 Code Formatting and Linting
Quality Tools Batch:

[BatchTool]:
  - Write(".pre-commit-config.yaml", preCommitConfig)
  - Write("pyproject.toml", blackConfig)
  - Write(".flake8", flake8Config)
  - Write("mypy.ini", mypyConfig)
  - Bash("pip install black flake8 mypy isort pre-commit")
  - Bash("pre-commit install")
  - Bash("black src/ tests/ && flake8 src/ tests/ && mypy src/")
📝 Documentation Coordination
Documentation Setup:

[BatchTool]:
  - Write("docs/conf.py", sphinxConfig)
  - Write("docs/index.rst", docsIndex)
  - Write("docs/api.rst", apiDocs)
  - Bash("pip install sphinx sphinx-rtd-theme")
  - Bash("sphinx-build -b html docs/ docs/_build/")