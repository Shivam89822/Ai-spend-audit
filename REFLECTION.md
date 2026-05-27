# REFLECTION.md

## Project Reflection

Building the AI Spend Audit Platform turned out to be significantly more challenging than I initially expected. At the beginning of the project, I assumed the main difficulty would be frontend design and UI polish, but the real complexity came from designing financially defensible recommendation logic.

One of the biggest lessons from the project was understanding the difference between generating “AI-looking” recommendations and generating recommendations that are actually believable from a business perspective. Simple rule-based savings suggestions often produced unrealistic downgrade recommendations, especially when team collaboration features or enterprise workflows were involved. Because of this, I shifted the recommendation engine toward more constrained and deterministic logic rather than relying entirely on generated suggestions.

Another major learning experience was structuring pricing data. AI tools change pricing frequently, and different vendors use inconsistent naming conventions for similar plans. During development I encountered multiple issues where frontend plan names did not exactly match backend pricing data, causing validation failures and incorrect recommendations. Solving this forced me to think more carefully about data normalization and separation between pricing metadata and recommendation logic.

On the frontend side, I focused heavily on product presentation and UX quality. I intentionally avoided creating a traditional dashboard-style student project and instead aimed for a modern AI SaaS experience inspired by products like Vercel, Linear, and Perplexity. The biggest frontend challenge was balancing visual polish with performance. Heavy animations, blur effects, and glow layers created Lighthouse performance issues that required optimization and simplification.

One of the most valuable lessons from this project was learning how quickly complexity grows when frontend UX, backend business logic, pricing systems, persistence, and recommendation reasoning all interact together. Even relatively simple recommendation features required careful coordination between frontend forms, validation layers, backend services, and pricing datasets.

If I had more time, I would improve:

* real-time usage analytics
* smarter AI-generated summaries
* centralized pricing synchronization
* deeper recommendation intelligence
* organization/team-level audit management
* automated SaaS spend tracking integrations

Overall, this project improved my understanding of:

* full-stack architecture
* TypeScript application structure
* SaaS product UX
* recommendation system design
* API integration
* engineering tradeoffs under time constraints

The most important takeaway for me was realizing that building reliable product logic is usually much harder than building visually impressive UI.
