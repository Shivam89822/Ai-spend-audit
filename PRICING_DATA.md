# Pricing Data Reference

AI service pricing information and cost data, mirroring the internal deterministic pricing engine (`pricingData.ts`).

## Price Reference

### 🧑‍💻 AI Code Editors

| Tool | Plan | Price | Min Seats | Notes |
|---|---|---|---|---|
| **Cursor** | Hobby | $0/mo | 1 | Strict usage caps. Free for evaluation. |
| | Pro | $20/mo | 1 | Unlimited Tab, $20 premium model credits. |
| | Pro Plus | $60/mo | 1 | 3x premium frontier model credits. |
| | Ultra | $200/mo | 1 | Priority feature access, continuous loops. |
| | Teams | $40/seat | 5 | Centralized billing, shared team commands. |
| | Enterprise | Custom | 100 | SAML/OIDC SSO, advanced audit logs. |
| **GitHub Copilot** | Pro | $10/mo | 1 | Inline completions free, chat consumes credits. |
| | Pro Plus | $39/mo | 1 | High-tier individual account for intensive agent workflows. |
| | Business | $19/seat | 5 | Automatic credit pooling ($30 AI credits/user). |
| | Enterprise | $39/seat | 100 | Requires GH Enterprise Cloud. |
| **Windsurf** | Free | $0/mo | 1 | Standard cascade functionalities. |
| | Pro | $20/mo | 1 | Advanced reasoning & prioritized routing. |
| | Teams | $40/seat | 2 | Centralized workspace admin. |

### 🤖 AI Assistants

| Tool | Plan | Price | Min Seats | Notes |
|---|---|---|---|---|
| **ChatGPT** | Free / Go | $0 - $8/mo | 1 | Ad-supported / Consumer tier. |
| | Plus | $20/mo | 1 | GPT-5.5, Deep Research, Sora. |
| | Pro (Mid/High) | $100 - $200/mo | 1 | 5x to 20x raw message throughput over Plus limits. |
| | Business | $25/seat | 5 | Data privacy guaranteed (models not trained on data). |
| | Enterprise | ~$60/seat | 100 | SOC 2, HIPAA, SCIM execution. |
| **Claude** | Free / Pro | $0 - $17/mo | 1 | Claude Code CLI integration (Pro). |
| | Max (5x/20x) | $100 - $200/mo | 1 | Priority queue, huge context buffers for codebases. |
| | Team (Std/Prem)| $20 - $100/seat| 5 - 10 | Centralized administration. |
| | Enterprise | $20 base | 100 | Hybrid billing: Base seat + Pay-as-you-go usage. |
| **Gemini** | Advanced | $19.99/mo | 1 | 1M context integration boundaries. |
| | Workspace | $30/seat | 1 | Native Google Workspace integration. |

### 🔌 AI APIs (Pure Usage)

**OpenAI API**
- **Pay As You Go**
  - `gpt-4o`: $2.50/M Input | $10.00/M Output
  - `gpt-5.5`: $5.00/M Input | $30.00/M Output

**Anthropic API**
- **Pay As You Go**
  - `claude-4-6-sonnet`: $3.00/M Input | $15.00/M Output
  - `claude-4-6-opus`: $5.00/M Input | $25.00/M Output
