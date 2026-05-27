# Future Improvements & Product Roadmap

This document outlines the strategic technical roadmap for **AI Spend Audit**. The objective is to scale the architecture from a point-in-time, manual-entry auditing tool into a **continuous, automated SaaS spend management platform**.

By implementing the following features, the platform will transition into a fully-fledged enterprise B2B product.

## 1. Real-Time SaaS Tracking & Automated Discovery
* **Current State:** Users manually input their configured tools and seat counts.
* **Future State:** Zero-touch infrastructure mapping.
* **Engineering Implementation:** 
  - **SSO/IdP Integration:** Integrate with Okta, Google Workspace, and Microsoft Entra ID via OAuth/SAML to automatically pull a list of provisioned AI applications across the organization.
  - **Shadow IT Detection:** Implement Plaid or Stripe Issuing APIs to scan corporate card ledgers for unauthorized, individual AI subscriptions (e.g., detecting an engineer expensing a personal ChatGPT Plus account when the company already pays for an Enterprise workspace).

## 2. Advanced Usage Analytics & Telemetry
* **Current State:** Cost optimization is calculated based on static seat counts and flat pricing rules.
* **Future State:** Optimization based on actual utilization and API activity.
* **Engineering Implementation:**
  - **API Token Tracking:** Connect directly to vendor APIs (OpenAI, Anthropic, GitHub Copilot) to track real token utilization against committed monthly minimums.
  - **Zombie Seat Detection:** Run background workers to identify active seats that haven't generated API calls or logged activity in >30 days, flagging them for immediate offboarding.

## 3. Stripe Integration & Automated Billing
* **Current State:** A free application designed to generate leads and shareable reports.
* **Future State:** A monetized platform with self-service B2B workflows.
* **Engineering Implementation:**
  - **Subscription Tiers:** Integrate Stripe Billing to allow organizations to subscribe to continuous monitoring tiers (e.g., Pro, Enterprise).
  - **Savings Commission Model:** Build logic to calculate the exact *realized* savings month-over-month, leveraging Stripe Metered Billing to automatically invoice a percentage of the saved capital as platform revenue.

## 4. Multi-Org Support & RBAC
* **Current State:** Single-tenant database model tied to ephemeral `shareId`s.
* **Future State:** Secure, enterprise-ready multi-tenant architecture.
* **Engineering Implementation:**
  - **Tenant Isolation:** Update MongoDB schemas to enforce strict multi-tenant isolation, ensuring every query requires an `orgId` index.
  - **Departmental Chargebacks:** Add granular grouping capabilities so finance teams can track AI costs by department (e.g., Engineering vs. Marketing) for accurate budget allocation.
  - **Role-Based Access Control (RBAC):** Introduce `Admin`, `Billing`, and `Viewer` roles using JWT-based authentication and route-level authorization guards.

## 5. Persistent Admin Dashboard & Anomaly Detection
* **Current State:** One-off generated audit reports.
* **Future State:** A persistent, real-time financial control center.
* **Engineering Implementation:**
  - **Time-Series Tracking:** Store historical audit runs in a time-series format to graph spend growth, reduction, and ROI over time.
  - **Cron Jobs & Webhooks:** Implement robust background task queues (e.g., using BullMQ or AWS SQS) to run daily automated audits. 
  - **Alerting Engine:** If projected spend spikes by >15% unexpectedly, trigger immediate webhook alerts via Slack or Email to the finance team.

## 6. Advanced Agentic AI Summaries
* **Current State:** The Gemini API summarizes static matrix outputs into a readable executive summary.
* **Future State:** The AI acts as a proactive, autonomous financial advisor.
* **Engineering Implementation:**
  - **Automated Vendor Negotiation:** Feed market benchmarking data into the LLM context window. Have the AI automatically draft highly specific negotiation emails to vendors (e.g., *"We noticed you have 150 GitHub Copilot seats. We have drafted an email to your Microsoft rep requesting the Volume Discount tier, which could save you $X/mo."*).
  - **Agentic Workflows:** Allow the AI to securely execute API calls on the user's behalf to downgrade unused seats directly in the vendor's admin portal.