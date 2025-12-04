# CLAUDE.md - 🧪 PYTHON TESTING COORDINATION

### Changed 2025-12-04T16:30:09+00:00

🔬 Pytest Testing Strategy
Parallel Testing Setup:

# Test coordination pattern
[BatchTool]:
  - Write("tests/conftest.py", pytestConfig)
  - Write("tests/test_models.py", modelTests)
  - Write("tests/test_views.py", viewTests)
  - Write("tests/test_integration.py", integrationTests)
  - Write("pytest.ini", pytestSettings)
  - Bash("pytest tests/ -v --cov=src --cov-report=html")
  - Bash("pytest tests/integration/ --tb=short")
  - Bash("pytest tests/unit/ --parallel")

