# AgentBuy: Multi-Agent Purchase Feasibility Advisor

AgentBuy is an interactive, responsive, and visually stunning web application that uses a simulated multi-agent AI framework to evaluate the financial feasibility of a user's target purchase. It helps buyers understand the true cost of their purchases, run comprehensive financial risk modeling, examine budget-friendly alternatives, and find optimal deals.

## Application Overview

AgentBuy is designed to empower users with intelligent financial decision-making for major purchases. By simulating a collaborative AI ecosystem, the application provides holistic financial analysis that combines multiple perspectives: cost research, financial safety assessment, value optimization, and negotiation strategy.

### Purpose

The application solves a critical consumer problem: making informed purchase decisions requires considering numerous financial factors simultaneously. AgentBuy automates this analysis through intelligent agents that evaluate:
- Total cost of ownership (including taxes, fees, and recurring costs)
- Personal financial capacity and risk tolerance
- Alternative options that might better suit your budget
- Optimal timing and negotiation strategies

### Key Use Cases

- **Major Consumer Purchases**: Cars, laptops, phones, drones, and other high-ticket items
- **Financial Planning**: Understanding the true impact of large expenses on personal finances
- **Comparative Shopping**: Evaluating alternatives and pre-owned options
- **Timing Optimization**: Finding the best market window for purchases

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

## How It Works

### The Multi-Agent Framework

AgentBuy employs a sophisticated multi-agent system where each agent has specialized expertise:

1. **Information Gathering Phase**: The Scout Agent researches product details and calculates comprehensive costs
2. **Analysis Phase**: The Advisor Agent evaluates your financial situation and assigns risk metrics
3. **Optimization Phase**: The Value Agent identifies better alternatives and cost-saving opportunities
4. **Strategy Phase**: The Negotiator Agent provides timing and negotiation recommendations
5. **Synthesis Phase**: All insights are combined into a single Feasibility Index (0-100%)

### Real-Time Adjustments

The "What-If" Sandbox feature allows you to:
- Adjust purchase price instantly
- Modify monthly savings rate
- Change down payment amount
- Update financing terms
- See immediate impact on feasibility without recalculating

All changes update the dashboard in real-time with no server calls required.

## File Structure

```
├── index.html          # Main HTML structure and markup
├── styles.css          # Complete styling, animations, and dark-mode theme
├── app.js              # Core application logic and agent simulation
├── README.md           # This documentation file
```

### Component Breakdown

**index.html**:
- Semantic HTML5 structure
- Form inputs for purchase configuration
- Dashboard layout with tabs and widgets
- Agent console terminal for real-time output

**styles.css**:
- Modern dark-mode palette with glassmorphism effects
- Responsive CSS Grid layout
- Custom typography (Inter, JetBrains Mono, Outfit)
- CSS variables for themeable design
- Smooth animations and transitions

**app.js**:
- Agent simulation engine
- Financial calculation algorithms
- Real-time data binding between inputs and dashboard
- Terminal output streaming
- What-If sandbox state management

## Installation & Setup

### Prerequisites
- Any modern web browser (Chrome, Firefox, Safari, Edge)
- No backend server required
- No dependencies or package installations needed

### Quick Start (Option 1: Direct File Access)
1. Clone or download the repository
2. Open `index.html` directly in your browser
3. Start using the application immediately

### Using a Local Server (Option 2: Recommended)

**With Python 3:**
```bash
python -m http.server 8000
```

**With Node.js:**
```bash
npx serve .
```

**With Live Server (VS Code):**
- Install the "Live Server" extension
- Right-click `index.html` → "Open with Live Server"

Then navigate to `http://localhost:8000` (or the port shown by your server)

## Browser Compatibility

✅ **Fully Supported**:
- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

The application uses modern web APIs including:
- CSS Grid & Flexbox
- CSS Custom Properties (Variables)
- Fetch API
- LocalStorage
- ES6+ JavaScript features

## Usage Examples

### Example 1: Tesla Model 3 Purchase
1. Select "Tesla Model 3" from the dropdown
2. Set your monthly income, fixed expenses, and current savings
3. Choose financing options (loan term, APR)
4. Observe agent analysis in the terminal
5. Adjust sliders to see how different scenarios affect feasibility

### Example 2: Custom Product Analysis
1. Enter "Custom Product" in the search field
2. Set custom base price ($50,000)
3. Input your financial profile
4. Review all agent recommendations
5. Use What-If sandbox to explore alternatives

## Performance & Architecture

### Client-Side Processing
- All calculations run locally in your browser
- No data is sent to external servers
- Instant response to user interactions
- Works offline once loaded

### Calculation Engine
- Financial formulas for total cost of ownership
- Risk assessment algorithms
- Feasibility index computation
- Alternative recommendation logic

## Features in Detail

### 1. Purchase Configuration
- **Pre-configured Items**: Tesla Model 3, iPhone 16 Pro Max, MacBook Pro M3, DJI Avata 2
- **Custom Products**: Enter any item with custom pricing
- **Financial Parameters**: Income, monthly expenses, current savings
- **Financing Options**: APR rate, loan term (12-84 months), down payment percentage

### 2. Agent Reports

Each agent provides specialized analysis:

**Scout Agent Report**:
- Base product research
- Applicable taxes and fees
- Accessory costs
- First-year recurring maintenance/subscription costs
- Total first-year cost estimate

**Advisor Agent Report**:
- Monthly cash flow analysis
- Savings runway (months until depleted)
- Debt-to-income ratio
- Financial safety grade (A-F)
- Risk level assessment

**Value Agent Report**:
- Budget-friendly alternatives
- Pre-owned/refurbished options
- Relative affordability comparison
- Cost-saving recommendations

**Negotiator Agent Report**:
- Seasonal pricing patterns
- Best purchase timing windows
- Negotiation leverage points
- Discount opportunity alerts

### 3. Feasibility Index Dashboard
- **Central Gauge**: Visual representation of purchase feasibility (0-100%)
- **Color Coding**: Green (feasible) → Yellow (caution) → Red (risky)
- **Key Metrics**: Total cost, monthly impact, risk grade
- **Agent Tabs**: Detailed reports from each agent

## Technical Stack

### Frontend Technologies
- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern styling with Grid, Flexbox, backdrop filters
- **JavaScript (ES6+)**: Vanilla JS with no external dependencies

### Design Patterns
- **Agent Pattern**: Encapsulated agent logic with specialized responsibilities
- **State Management**: Centralized application state with reactive updates
- **Real-Time Binding**: Input-to-output synchronization without page reloads

### Browser APIs Used
- DOM Manipulation API
- CSS Custom Properties API
- LocalStorage (for potential data persistence)
- Template Literals and Destructuring (ES6)

## Limitations & Future Enhancements

### Current Limitations
- Agent responses are simulated (not AI-powered)
- No real-time market data integration
- Data not persisted across sessions
- Single-currency support (USD)

### Potential Future Features
- Real API integration for product pricing
- User accounts and saved analyses
- Multi-currency support
- Mobile app version
- Email report generation
- Comparison tool for multiple items

## Contributing

We welcome contributions! Areas for enhancement:
- Additional pre-configured products
- More sophisticated agent algorithms
- UI/UX improvements
- Performance optimizations
- Localization support
- Accessibility enhancements

## License

This project is provided as-is for educational and personal use.

## Support & Questions

For issues, questions, or suggestions:
- Open an issue on the GitHub repository
- Review the code documentation in `app.js`
- Check the inline comments in CSS for styling details

---

**Last Updated**: June 2026
**Version**: 1.0.0
**Status**: Production Ready
