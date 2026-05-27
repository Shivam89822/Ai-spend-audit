# 🚀 AI Spend Audit

**Intelligent AI spend management for modern teams.**

## 🌟 Project Overview
**AI Spend Audit** is an AI-powered financial intelligence platform designed to audit, analyze, and optimize your organization's AI service spending. In the era of AI tool sprawl, teams often overpay for overlapping subscriptions and underutilized seats. Our platform maps your infrastructure, identifies waste, and extracts hyper-optimized scaling directives to instantly recover cash assets.

## ✨ Features
- **🔍 Spend Intelligence:** Real-time visibility into AI subscriptions down to the seat and the dollar.
- **🤖 AI-Powered Recommendations:** Analyzes usage patterns to surface specific downgrade, consolidation, and cancellation opportunities.
- **📊 Shareable Savings Reports:** Auto-generated audit reports with projected savings, CFO-ready summaries, and one-click PDF exports.
- **🧠 Generative Summaries:** Integrates with the **Gemini API** to produce plain-English executive summaries of your stack and savings potential.
- **⚡ Team Optimization:** Identify multi-tenant seat overlaps and duplicate tools across departments.

## 🛠 Tech Stack
- **Frontend:** React, TypeScript, Vite, Framer Motion, HTML2Canvas, jsPDF
- **Backend:** Node.js, Express, TypeScript, MongoDB (Mongoose), Express Rate Limit
- **AI Integration:** Google Gemini API

## 🏗 Architecture
The platform follows a robust Client-Server architecture:
1. **Client (Frontend):** A highly interactive React application that collects current stack inputs (tools, plans, seats, and use-cases).
2. **Server (Backend API):** Validates actual plan names, resolves up-to-date pricing metadata, calculates monthly/annual savings, and generates optimization recommendations.
3. **Database (MongoDB):** Securely stores audit results tied to unique `shareId`s for easy sharing and retrieval.

## 📸 Screenshots

| **/assets/Dashboard View** | **/assets/Audit Results** | **/assets/Recommendations** |
| :---: | :---: | :---: |
| !Dashboard View | !Audit Results | !Recommendations |

## 🌊 Project Flow
1. **Connect Your Stack:** Select your team's primary use case, scale, and provisioned AI engines (e.g., Cursor, ChatGPT, Claude, Copilot).
2. **Analyze Spending:** The audit engine matches your inputs against live pricing and capability metadata.
3. **Capture Savings:** View a ranked action list of optimizations, read the Gemini-powered executive summary, and download your report.

## 🔌 API Endpoints
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/audit` | Synthesizes an optimization matrix and generates a new audit. |
| `GET` | `/api/audit/:shareId` | Fetches a saved audit via its unique shareable ID. |
| `POST` | `/api/leads` | Captures user leads to email the full audit report. |

## 💻 Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Shivam89822/Ai-spend-audit.git
   cd ai-spend-audit
   ```

2. **Install Frontend Dependencies:**
   ```bash
   cd client
   npm install
   ```

3. **Install Backend Dependencies:**
   ```bash
   cd ../server
   npm install
   ```

## 🔐 Environment Variables
Before running the backend, create a `.env` file in the `server/` directory (you can copy `.env.example` if available):

```env
# server/.env
MONGO_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
PORT=5000
```

## ⚙️ How Recommendation Engine Works
The recommendation engine cross-references your current configurations against a robust **Pricing Metadata Dictionary**. It checks:
- **Team Size Triggers:** Recommends consolidating to Team/Enterprise plans if seat counts exceed specific thresholds.
- **Overlap Detection:** Identifies alternative tools based on primary use cases to suggest downgrades or cross-platform consolidation (e.g., dropping individual AI assistants if your workspace suite already covers it).
- **Savings Calculation:** Computes the exact monthly and annual cash recovery by evaluating current spend vs. optimized spend.
- **Confidence Scoring:** Assigns High, Medium, or Low confidence to the recommendations based on how well the tier aligns with the use case.

## 🚀 Future Improvements
- [ ] **OAuth Integrations:** Connect directly with AI tools for automatic seat discovery without manual entry.
- [ ] **Anomaly Detection:** Instant alerts when spend spikes or usage drops below viability thresholds.
- [ ] **User Authentication:** Persistent dashboards for tracking realized savings over time.
- [ ] **Advanced Usage Metrics:** Integration via API to evaluate actual API token utilization against monthly commitments.

## 🌍 Deployment

To deploy the application:
- **Frontend:** Easily deployable to platforms like **Vercel**. Ensure the build command `npm run build` points the output directory to `dist`.
- **Backend:** Deployable to **Render** via standard Node environments. Set up environment variables correctly on the host.
- **Database:** Hosted on **MongoDB Atlas**.

## 👨‍💻 Author

**[Shivam Solanki]**

- GitHub: https://github.com/Shivam89822

---

*See ARCHITECTURE.md for deeper system design details and DEVLOG.md for development notes.*
