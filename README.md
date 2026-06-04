# AgentBuy: Multi-Agent Purchase Feasibility Advisor

AgentBuy is an interactive, responsive, and visually stunning web application that uses a simulated multi-agent AI framework to evaluate the financial feasibility of a user's target purchase. It helps buyers understand the true cost of their purchases, run comprehensive financial risk modeling, examine budget-friendly alternatives, and find optimal deals.

## Features

1. **Configure Purchase Profile**:
   * Search for specific high-profile items (Tesla Model 3, iPhone 16 Pro Max, MacBook Pro M3, DJI Avata 2) or enter custom products.
   * Fine-tune income, expenses, savings, and pricing.
   * Enable/disable financing options to evaluate interest rates (APR), terms, and down payments.

2. **Multi-Agent Simulation Console**:
   * **Scout Agent (🔍)**: Researches the product, calculates taxes, accessory costs, and first-year recurring costs.
   * **Advisor Agent (📊)**: Calculates financial safety matrices, savings runway, debt-to-income (DTI) ratio, and assigns a risk grade.
   * **Value Agent (🔄)**: Recommends budget-friendly alternatives and pre-owned alternatives, automatically calculates their relative feasibility index.
   * **Negotiator Agent (🤝)**: Highlights optimal market cycles, discount windows, and purchase strategy tips.
   * Features a live scrolling developer-style command line terminal reflecting agent debates in real-time.

3. **Feasibility Index Dashboard**:
   * Dynamic circular gauge indicating a feasibility percentage from 0 to 100%.
   * Realtime "What-If" Sandbox sliders to adjust pricing, savings, and cashflow in real-time with instant dashboard updates (no re-runs needed!).
   * Clean tabs to inspect each agent's individual reports.

## Tech Stack & Architecture

* **Frontend**: Semantic HTML5, CSS Grid, ES6 JavaScript.
* **Design**: Modern dark-mode palette, glowing vector grids, glassmorphism card panels (`backdrop-filter`), CSS variables, custom typography (Inter, JetBrains Mono, Outfit).
* **Dependencies**: None. 100% self-contained and client-side for zero-setup execution.

## Getting Started

To launch the project, simply open `index.html` directly in any web browser of your choice.

Alternatively, you can run a local web server in the project directory:

```bash
# Using Python
python -m http.server 8000

# Using Node.js
npx serve .
```

Then open your browser to `http://localhost:8000` (or the port specified by the server tool).
