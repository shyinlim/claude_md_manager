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