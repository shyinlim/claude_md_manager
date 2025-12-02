# CLAUDE.md - Pytest

##  Pytest command line
1. pytest -v -s

## Development Workflow
```commandline
# Setup
make dev              # Install in editable mode with dev dependencies
make verify           # Verify installation (package, plugin, health)
```

## Fixture
```commandline
@pytest.mark.confidence_check
def test_feature(confidence_checker):
    """Pre-execution confidence check - skips if < 70%"""
    context = {"test_name": "test_feature", "has_official_docs": True}
    assert confidence_checker.assess(context) >= 0.7

@pytest.mark.self_check
def test_implementation(self_check_protocol):
    """Post-implementation validation with evidence"""
    implementation = {"code": "...", "tests": [...]}
    passed, issues = self_check_protocol.validate(implementation)
    assert passed, f"Validation failed: {issues}"
```

---

## Common

### Coding Style
1. Should have type hint
```commandline python
def sample_code(self, account_id: int, amount: Decimal, status:int = None):
    pass
```

### MCP Integration
High Priority:
- Tavily: Web search (Deep Research)
- Context7: Official documentation (prevent hallucination)
- Sequential: Token-efficient reasoning (30-50% reduction)
- Serena: Session persistence
- Mindbase: Cross-session learning