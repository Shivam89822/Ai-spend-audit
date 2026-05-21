import type { IToolPricingData } from "./pricing.types";

export const pricingData: Record<string, IToolPricingData> = {
  cursor: {
    toolName: "Cursor",
    category: "ai_code_editor",
    supportedUseCases: ["code_completion", "agentic_workflows", "codebase_chat", "refactoring"],
    pricingPageUrl: "https://www.cursor.com/pricing",
    verifiedAt: "2026-05-21",
    plans: [
      {
        name: "Hobby",
        monthlyPrice: 0,
        pricingType: "seat_flat",
        isProductionReady: false,
        recommendedMinTeamSize: 1,
        recommendedMaxTeamSize: 1,
        enterpriseOnly: false,
        notes: "Strict usage caps on Agent and Tab auto-completions. Free tier for evaluation.",
        usagePricing: {
          customNotes: "No overages allowed. Hard stop when limits are reached."
        }
      },
      {
        name: "Pro",
        monthlyPrice: 20,
        pricingType: "seat_flat",
        isProductionReady: true,
        recommendedMinTeamSize: 1,
        recommendedMaxTeamSize: 2,
        enterpriseOnly: false,
        includedCredits: 20,
        notes: "Includes unlimited Tab completions, unlimited Auto mode using cheap routing, and $20 premium model credit pool.",
        usagePricing: {
          tokens: {
            auto_mode_routing: {
              inputPerMillion: 1.25,
              outputPerMillion: 6.00,
              cacheReadPerMillion: 0.25
            }
          }
        }
      },
      {
        name: "Pro Plus",
        monthlyPrice: 60,
        pricingType: "seat_flat",
        isProductionReady: true,
        recommendedMinTeamSize: 1,
        recommendedMaxTeamSize: 1,
        enterpriseOnly: false,
        includedCredits: 60,
        notes: "Identical features to Pro but bundles 3x premium frontier model credits for heavy agentic workflows.",
        usagePricing: {
          tokens: {
            auto_mode_routing: {
              inputPerMillion: 1.25,
              outputPerMillion: 6.00,
              cacheReadPerMillion: 0.25
            }
          }
        }
      },
      {
        name: "Ultra",
        monthlyPrice: 200,
        pricingType: "seat_flat",
        isProductionReady: true,
        recommendedMinTeamSize: 1,
        recommendedMaxTeamSize: 1,
        enterpriseOnly: false,
        includedCredits: 400,
        notes: "Designed for full-time developers running multi-file agentic loops continuously. Priority feature access.",
        usagePricing: {
          tokens: {
            auto_mode_routing: {
              inputPerMillion: 1.25,
              outputPerMillion: 6.00,
              cacheReadPerMillion: 0.25
            }
          }
        }
      },
      {
        name: "Teams",
        monthlyPrice: 40,
        pricingType: "seat_flat",
        isProductionReady: true,
        recommendedMinTeamSize: 5,
        recommendedMaxTeamSize: 150,
        enterpriseOnly: false,
        includedCredits: 20,
        notes: "Centralized billing, usage analytics, shared team commands, and organization-wide privacy mode enforcement.",
        usagePricing: {
          customNotes: "Credits are allocated per user slot ($20/user) but administered through central dashboard."
        }
      },
      {
        name: "Enterprise",
        monthlyPrice: null,
        pricingType: "seat_flat",
        isProductionReady: true,
        recommendedMinTeamSize: 100,
        recommendedMaxTeamSize: 100000,
        enterpriseOnly: true,
        notes: "SAML/OIDC SSO, advanced audit logs, custom pooled usage credits, and dedicated enterprise account management.",
        usagePricing: {
          customNotes: "Custom contract terms determine pooled token allowance structures."
        }
      }
    ],
    recommendationMetadata: {
      canDowngradeTo: "github_copilot",
      canUpgradeTo: "cursor",
      alternativeTools: ["windsurf", "github_copilot"],
      teamSizeTriggers: [
        { min: 1, max: 1, action: "downgrade" },
        { min: 2, max: 149, action: "upgrade" },
        { min: 150, max: 100000, action: "switch_to_enterprise" }
      ]
    }
  },
  github_copilot: {
    toolName: "GitHub Copilot",
    category: "ai_code_editor",
    supportedUseCases: ["code_completion", "inline_chat", "agentic_workflows", "pr_review"],
    pricingPageUrl: "https://github.com/features/copilot",
    verifiedAt: "2026-05-21",
    plans: [
      {
        name: "Copilot Pro",
        monthlyPrice: 10,
        pricingType: "seat_plus_usage",
        isProductionReady: true,
        recommendedMinTeamSize: 1,
        recommendedMaxTeamSize: 2,
        enterpriseOnly: false,
        includedCredits: 10,
        notes: "Billed monthly. Inline completions do not consume credits. Chat and agents consume new GitHub AI Credits.",
        usagePricing: {
          customNotes: "Transitioned to usage-based metering via GitHub AI Credits on June 1, 2026."
        }
      },
      {
        name: "Copilot Pro Plus",
        monthlyPrice: 39,
        pricingType: "seat_plus_usage",
        isProductionReady: true,
        recommendedMinTeamSize: 1,
        recommendedMaxTeamSize: 1,
        enterpriseOnly: false,
        includedCredits: 39,
        notes: "High-tier individual account with expanded base credit allotment for intensive agent workflows.",
        usagePricing: {
          customNotes: "Token consumption speeds up depletion on long-context code requests."
        }
      },
      {
        name: "Copilot Business",
        monthlyPrice: 19,
        pricingType: "seat_plus_usage",
        isProductionReady: true,
        recommendedMinTeamSize: 5,
        recommendedMaxTeamSize: 250,
        enterpriseOnly: false,
        includedCredits: 30,
        notes: "Features automatic credit pooling across seats allowing light users to offset heavy users. Policy management included.",
        usagePricing: {
          addOns: {
            copilot_code_review: { price: 1, unit: "consumes_github_actions_minutes" }
          },
          customNotes: "Base plan includes $30 in monthly AI credits per user pooled at the organization layer."
        }
      },
      {
        name: "Copilot Enterprise",
        monthlyPrice: 39,
        pricingType: "seat_plus_usage",
        isProductionReady: true,
        recommendedMinTeamSize: 100,
        recommendedMaxTeamSize: 100000,
        enterpriseOnly: true,
        includedCredits: 70,
        notes: "Requires GitHub Enterprise Cloud. Custom model fine-tuning hooks, deep documentation indexing, and advanced compliance.",
        usagePricing: {
          customNotes: "Includes $70 in monthly AI credits per user pooled at the corporate entity layer."
        }
      }
    ],
    recommendationMetadata: {
      canDowngradeTo: "github_copilot",
      canUpgradeTo: "cursor",
      alternativeTools: ["cursor", "windsurf"],
      teamSizeTriggers: [
        { min: 2, max: 249, action: "consolidate" },
        { min: 250, max: 100000, action: "switch_to_enterprise" }
      ]
    }
  },
  chatgpt: {
    toolName: "ChatGPT",
    category: "ai_assistant",
    supportedUseCases: ["conversational_ai", "deep_research", "data_analysis", "multimodal_generation"],
    pricingPageUrl: "https://openai.com/chatgpt/pricing",
    verifiedAt: "2026-05-21",
    plans: [
      {
        name: "Free",
        monthlyPrice: 0,
        pricingType: "seat_flat",
        isProductionReady: false,
        recommendedMinTeamSize: 1,
        recommendedMaxTeamSize: 1,
        enterpriseOnly: false,
        notes: "Access to GPT-5.3 Instant with strict message limitations. Displays contextual advertisements."
      },
      {
        name: "ChatGPT Go",
        monthlyPrice: 8,
        pricingType: "seat_flat",
        isProductionReady: true,
        recommendedMinTeamSize: 1,
        recommendedMaxTeamSize: 1,
        enterpriseOnly: false,
        notes: "Ad-supported consumer/light professional tier. Excludes frontier GPT-5.5 processing capabilities."
      },
      {
        name: "Plus",
        monthlyPrice: 20,
        pricingType: "seat_flat",
        isProductionReady: true,
        recommendedMinTeamSize: 1,
        recommendedMaxTeamSize: 2,
        enterpriseOnly: false,
        notes: "Access to frontier GPT-5.5, Deep Research, Sora video engine, and persistent standalone Agent Mode."
      },
      {
        name: "Pro Mid-Tier",
        monthlyPrice: 100,
        pricingType: "seat_flat",
        isProductionReady: true,
        recommendedMinTeamSize: 1,
        recommendedMaxTeamSize: 5,
        enterpriseOnly: false,
        notes: "Provides 5x the raw message throughput limits of Plus. Access to o1 Pro reasoning modules."
      },
      {
        name: "Pro High-Tier",
        monthlyPrice: 200,
        pricingType: "seat_flat",
        isProductionReady: true,
        recommendedMinTeamSize: 1,
        recommendedMaxTeamSize: 5,
        enterpriseOnly: false,
        notes: "Provides 20x Plus limits, up to 250 deep research runs per month, and unthrottled 1M token context windows."
      },
      {
        name: "Business",
        monthlyPrice: 25,
        pricingType: "seat_flat",
        isProductionReady: true,
        recommendedMinTeamSize: 5,
        recommendedMaxTeamSize: 150,
        enterpriseOnly: false,
        notes: "Requires 2-seat minimum. Price drops to $20/seat on annual billing layouts. Workspaces never train models on internal data."
      },
      {
        name: "Enterprise",
        monthlyPrice: 60,
        pricingType: "seat_flat",
        isProductionReady: true,
        recommendedMinTeamSize: 100,
        recommendedMaxTeamSize: 100000,
        enterpriseOnly: true,
        isAnnualOnly: true,
        notes: "Estimated base. Requires 150 seat minimum commitment. Includes SOC 2, HIPAA BAA compliance, SCIM execution, and full audit logging."
      }
    ],
    recommendationMetadata: {
      canDowngradeTo: "chatgpt",
      canUpgradeTo: "chatgpt",
      alternativeTools: ["claude", "gemini"],
      teamSizeTriggers: [
        { min: 2, max: 149, action: "consolidate" },
        { min: 150, max: 100000, action: "switch_to_enterprise" }
      ]
    }
  },
  claude: {
    toolName: "Claude",
    category: "ai_assistant",
    supportedUseCases: ["long_document_analysis", "coding_assistance", "workspace_knowledge", "agentic_workflows"],
    pricingPageUrl: "https://www.anthropic.com/claude",
    verifiedAt: "2026-05-21",
    plans: [
      {
        name: "Free",
        monthlyPrice: 0,
        pricingType: "seat_flat",
        isProductionReady: false,
        recommendedMinTeamSize: 1,
        recommendedMaxTeamSize: 1,
        enterpriseOnly: false,
        notes: "Basic web workspace access. Throttles heavily during high regional utilization spikes."
      },
      {
        name: "Pro",
        monthlyPrice: 17,
        pricingType: "seat_flat",
        isProductionReady: true,
        recommendedMinTeamSize: 1,
        recommendedMaxTeamSize: 1,
        enterpriseOnly: false,
        notes: "Unlocks Claude Code CLI integration inside terminal, file execution nodes, and extended context handling options."
      },
      {
        name: "Max 5x",
        monthlyPrice: 100,
        pricingType: "seat_flat",
        isProductionReady: true,
        recommendedMinTeamSize: 1,
        recommendedMaxTeamSize: 1,
        enterpriseOnly: false,
        notes: "Scales user conversation buffers to 5x base Pro levels. Direct priority queueing for Sonnet and Opus models."
      },
      {
        name: "Max 20x",
        monthlyPrice: 200,
        pricingType: "seat_flat",
        isProductionReady: true,
        recommendedMinTeamSize: 1,
        recommendedMaxTeamSize: 1,
        enterpriseOnly: false,
        notes: "Scales query capacity ceilings to 20x base Pro levels. Built for high-density code base mapping sessions."
      },
      {
        name: "Team Standard",
        monthlyPrice: 20,
        pricingType: "seat_flat",
        isProductionReady: true,
        recommendedMinTeamSize: 5,
        recommendedMaxTeamSize: 150,
        enterpriseOnly: false,
        notes: "Billed at $25/user/month on annual agreements. Includes centralized administration and standard data privacy policies."
      },
      {
        name: "Team Premium",
        monthlyPrice: 100,
        pricingType: "seat_flat",
        isProductionReady: true,
        recommendedMinTeamSize: 10,
        recommendedMaxTeamSize: 150,
        enterpriseOnly: false,
        notes: "Billed at $120/user/month on annual tracking. Standardizes access permissions for Claude Code execution profiles across teams."
      },
      {
        name: "Enterprise",
        monthlyPrice: 20,
        pricingType: "hybrid",
        isProductionReady: true,
        recommendedMinTeamSize: 100,
        recommendedMaxTeamSize: 100000,
        enterpriseOnly: true,
        isAnnualOnly: true,
        notes: "Base membership seat is $20. Crucial structural variant: contains zero bundled usage. Every prompt interaction scales metered API costs.",
        usagePricing: {
          customNotes: "Enterprise plan pipes active terminal or UI interactions straight to pay-as-you-go token infrastructure."
        }
      }
    ],
    recommendationMetadata: {
      canDowngradeTo: "claude",
      canUpgradeTo: "claude",
      alternativeTools: ["chatgpt", "gemini"],
      teamSizeTriggers: [
        { min: 2, max: 149, action: "consolidate" },
        { min: 150, max: 100000, action: "switch_to_enterprise" }
      ]
    }
  },
  openai_api: {
    toolName: "OpenAI API",
    category: "ai_api",
    supportedUseCases: ["custom_applications", "embeddings", "automated_pipelines", "fine_tuning"],
    pricingPageUrl: "https://openai.com/api/pricing",
    verifiedAt: "2026-05-21",
    plans: [
      {
        name: "Pay As You Go",
        monthlyPrice: 0,
        pricingType: "pure_usage",
        isProductionReady: true,
        recommendedMinTeamSize: 1,
        recommendedMaxTeamSize: 100000,
        enterpriseOnly: false,
        notes: "Tiered usage system based on historical monthly clearing velocity. Costs determined strictly per million tokens.",
        usagePricing: {
          tokens: {
            "gpt-5.5": {
              inputPerMillion: 5.00,
              outputPerMillion: 30.00
            },
            "gpt-5.4": {
              inputPerMillion: 2.50,
              outputPerMillion: 15.00
            },
            "gpt-4o": {
              inputPerMillion: 2.50,
              outputPerMillion: 10.00
            },
            "gpt-4o-mini": {
              inputPerMillion: 0.15,
              outputPerMillion: 0.60
            }
          }
        }
      }
    ],
    recommendationMetadata: {
      canDowngradeTo: "openai_api",
      canUpgradeTo: "openai_api",
      alternativeTools: ["anthropic_api", "gemini"],
      teamSizeTriggers: []
    }
  },
  anthropic_api: {
    toolName: "Anthropic API",
    category: "ai_api",
    supportedUseCases: ["agentic_orchestration", "llm_pipelines", "structured_data_extraction"],
    pricingPageUrl: "https://www.anthropic.com/api",
    verifiedAt: "2026-05-21",
    plans: [
      {
        name: "Pay As You Go",
        monthlyPrice: 0,
        pricingType: "pure_usage",
        isProductionReady: true,
        recommendedMinTeamSize: 1,
        recommendedMaxTeamSize: 100000,
        enterpriseOnly: false,
        notes: "Strict pay-as-you-go architecture with dynamic token evaluation boundaries.",
        usagePricing: {
          tokens: {
            "claude-3-5-sonnet": {
              inputPerMillion: 3.00,
              outputPerMillion: 15.00
            },
            "claude-4-6-sonnet": {
              inputPerMillion: 3.00,
              outputPerMillion: 15.00
            },
            "claude-4-6-opus": {
              inputPerMillion: 5.00,
              outputPerMillion: 25.00
            },
            "claude-4-5-haiku": {
              inputPerMillion: 1.00,
              outputPerMillion: 5.00
            }
          },
          addOns: {
            web_search: { price: 10.00, unit: "per_1000_searches" },
            code_execution: { price: 0.05, unit: "per_container_hour_after_50_free" }
          },
          customNotes: "Long-context surcharges of 2x input apply for processing metrics past 200k on specialized model sets."
        }
      }
    ],
    recommendationMetadata: {
      canDowngradeTo: "anthropic_api",
      canUpgradeTo: "anthropic_api",
      alternativeTools: ["openai_api", "gemini"],
      teamSizeTriggers: []
    }
  },
  gemini: {
    toolName: "Gemini",
    category: "ai_assistant",
    supportedUseCases: ["workspace_integration", "large_context_processing", "multimodal_workflows"],
    pricingPageUrl: "https://one.google.com/ai-premium",
    verifiedAt: "2026-05-21",
    plans: [
      {
        name: "Gemini Advanced",
        monthlyPrice: 19.99,
        pricingType: "seat_flat",
        isProductionReady: true,
        recommendedMinTeamSize: 1,
        recommendedMaxTeamSize: 1,
        enterpriseOnly: false,
        notes: "Individual Google One subscription framework. Offers native 1M context integration boundaries and Gemini 2.5 Pro access."
      },
      {
        name: "Gemini for Workspace",
        monthlyPrice: 30,
        pricingType: "seat_flat",
        isProductionReady: true,
        recommendedMinTeamSize: 1,
        recommendedMaxTeamSize: 100000,
        enterpriseOnly: false,
        notes: "Tiered into Business ($20) and Enterprise ($30) configurations natively wrapping directly into core Google Workspace operational setups."
      }
    ],
    recommendationMetadata: {
      canDowngradeTo: "gemini",
      canUpgradeTo: "gemini",
      alternativeTools: ["chatgpt", "claude"],
      teamSizeTriggers: []
    }
  },
  windsurf: {
    toolName: "Windsurf",
    category: "ai_code_editor",
    supportedUseCases: ["agentic_refactoring", "contextual_autocomplete", "terminal_orchestration"],
    pricingPageUrl: "https://codeium.com/windsurf/pricing",
    verifiedAt: "2026-05-21",
    plans: [
      {
        name: "Free Tier",
        monthlyPrice: 0,
        pricingType: "seat_flat",
        isProductionReady: false,
        recommendedMinTeamSize: 1,
        recommendedMaxTeamSize: 1,
        enterpriseOnly: false,
        notes: "Access to standard Codeium cascade functionalities with structural quota boundaries."
      },
      {
        name: "Pro",
        monthlyPrice: 20,
        pricingType: "seat_flat",
        isProductionReady: true,
        recommendedMinTeamSize: 1,
        recommendedMaxTeamSize: 1,
        enterpriseOnly: false,
        notes: "Competitive positioning against Cursor Pro. Unlocks advanced reasoning and prioritized routing mechanics."
      },
      {
        name: "Teams",
        monthlyPrice: 40,
        pricingType: "seat_flat",
        isProductionReady: true,
        recommendedMinTeamSize: 2,
        recommendedMaxTeamSize: 100000,
        enterpriseOnly: false,
        notes: "Centralized workspace administration panels and end-to-end telemetry safety protections."
      }
    ],
    recommendationMetadata: {
      canDowngradeTo: "github_copilot",
      canUpgradeTo: "windsurf",
      alternativeTools: ["cursor", "github_copilot"],
      teamSizeTriggers: [
        { min: 2, max: 100000, action: "consolidate" }
      ]
    }
  }
};