// AgentBuy - Multi-Agent Feasibility Engine

// 1. Mock Database of Products
const productDatabase = {
    "iphone 16 pro max": {
        name: "iPhone 16 Pro Max",
        price: 1199,
        category: "Electronics",
        scoutCosts: [
            { name: "Estimated Sales Tax (8.5%)", cost: 102 },
            { name: "Mandatory Accessories (Charger & Case)", cost: 55 },
            { name: "AppleCare+ Protection (Optional)", cost: 199 }
        ],
        recurringCosts: [
            { name: "Cellular Premium Plan (Annual)", cost: 720 }
        ],
        alternatives: [
            { name: "iPhone 15 Pro (Apple Refurbished)", price: 849, savings: 350, badge: "Safe Swap" },
            { name: "Google Pixel 9 Pro (New)", price: 999, savings: 200, badge: "Value Focus" }
        ],
        timing: "Apple releases new iPhones every mid-September. Best carrier discounts occur during Black Friday (late November). If buying outright, wait for Apple certified refurb sales.",
        deals: [
            "Trade-in program offers up to $650 for carrier credits over 36 months.",
            "Purchase via Apple Card gives 3% daily cash back ($36 saved).",
            "Warehouse clubs (Costco, Sam's Club) offer extended warranty bundles at no cost."
        ]
    },
    "tesla model 3": {
        name: "Tesla Model 3",
        price: 38990,
        category: "Vehicles",
        scoutCosts: [
            { name: "Destination & Prep Fees", cost: 1390 },
            { name: "Estimated Tax, Title & Registration", cost: 3300 },
            { name: "Wall Connector & Home installation", cost: 950 }
        ],
        recurringCosts: [
            { name: "Annual Insurance Premium", cost: 1950 },
            { name: "Estimated Annual Electricity Charging", cost: 550 }
        ],
        alternatives: [
            { name: "Tesla Model 3 (Used - 2021 model)", price: 23500, savings: 15490, badge: "Used Discount" },
            { name: "Toyota Prius Hybrid (New Base)", price: 27950, savings: 11040, badge: "Reliability Alternative" }
        ],
        timing: "Tesla heavily discounts inventory models at the end of each fiscal quarter (March, June, Sept, Dec) to meet delivery quotas. Avoid ordering custom builds during these windows.",
        deals: [
            "Qualifies for up to $7,500 Federal EV tax credit (applied point of sale).",
            "Referral codes can yield 3 months of free Full Self-Driving and minor cash off.",
            "Check local utility companies for charging station rebate credits (up to $500)."
        ]
    },
    "macbook pro m3": {
        name: "MacBook Pro M3",
        price: 1599,
        category: "Electronics",
        scoutCosts: [
            { name: "Estimated Sales Tax (8.5%)", cost: 136 },
            { name: "USB-C Multiport Adaptor", cost: 49 },
            { name: "AppleCare+ Laptop Protection Plan", cost: 279}
        ],
        recurringCosts: [
            { name: "Cloud Storage & Dev Tools Subscription", cost: 120 }
        ],
        alternatives: [
            { name: "MacBook Air M3 (8-Core GPU/16GB)", price: 1099, savings: 500, badge: "Best Value" },
            { name: "Lenovo ThinkPad E14 Gen 6", price: 899, savings: 700, badge: "Workhorse PC" }
        ],
        timing: "Apple launches back-to-school promotions in June through September. Buying during this window secures an additional $150 gift card and 10% educational discount.",
        deals: [
            "Education pricing saves flat $100 off standard retail for any user with a .edu email.",
            "Authorized retailers (B&H Photo Video, Best Buy) often discount this laptop by $200.",
            "Buy Certified Refurbished from Apple for a full 1-year warranty and a 15% discount."
        ]
    },
    "dji avata 2 drone": {
        name: "DJI Avata 2 Drone (Fly More)",
        price: 999,
        category: "Gadgets",
        scoutCosts: [
            { name: "Estimated Sales Tax (8.5%)", cost: 85 },
            { name: "DJI Care Refresh (1-Year Plan)", cost: 99 },
            { name: "High-Speed MicroSD Card 256GB", cost: 35 }
        ],
        recurringCosts: [
            { name: "FAA Registration & Drone Insurance", cost: 25 }
        ],
        alternatives: [
            { name: "DJI Mini 4 Pro (Base RC)", price: 759, savings: 240, badge: "Lighter / Regulatory Safe" },
            { name: "BetaFPV Cetus X RTF Kit", price: 299, savings: 700, badge: "Beginner Trainer" }
        ],
        timing: "DJI rarely discounts current-gen items. However, third-party sellers on Amazon offer bundled additions (backpacks, landing pads) for free during Prime Day events.",
        deals: [
            "Get 1% cash back using the DJI official store credits for battery replacements.",
            "Federal/FAA registration is only $5, do not use 3rd party brokers.",
            "Check local drone club forums for mint condition pre-owned kits."
        ]
    }
};

// Fallback dynamic generator for unrecognized products
function generateFallbackProduct(searchQuery, typedPrice) {
    const cleanQuery = searchQuery.trim() || "Target Product";
    const price = parseFloat(typedPrice) || 500;
    
    return {
        name: cleanQuery.charAt(0).toUpperCase() + cleanQuery.slice(1),
        price: price,
        category: "General Purchase",
        scoutCosts: [
            { name: "Sales Tax Estimate (8.5%)", cost: Math.round(price * 0.085) },
            { name: "Ancillary Accessories (Est.)", cost: Math.round(price * 0.05) },
            { name: "Extended Warranty / Initial Setup", cost: Math.round(price * 0.08) }
        ],
        recurringCosts: [
            { name: "Yearly Maintenance & Insurance (Est.)", cost: Math.round(price * 0.04) }
        ],
        alternatives: [
            { name: `${cleanQuery} (Alternative Base Model)`, price: Math.round(price * 0.7), savings: Math.round(price * 0.3), badge: "Smart Alternative" },
            { name: `${cleanQuery} (Pre-owned / Open-Box)`, price: Math.round(price * 0.55), savings: Math.round(price * 0.45), badge: "Budget Choice" }
        ],
        timing: "Seasonal clearances generally yield the best pricing. For general consumer goods, target Memorial Day, Prime Day, or Black Friday sales.",
        deals: [
            "Check browser extensions like Honey or CamelCamelCamel for historical price graphs.",
            "Sign up for store newsletter coupons to receive 10-15% off first order.",
            "Inquire about cash-purchase discounts if buying from local independent merchants."
        ]
    };
}

// 2. Global State Variables
let currentProduct = null;
let profileData = {
    price: 1199,
    income: 5000,
    expenses: 3200,
    savings: 8500,
    financing: false,
    downPayment: 200,
    term: 24,
    apr: 7.5
};

// 3. UI Selectors
const searchInput = document.getElementById("product-search");
const suggestionsBox = document.getElementById("suggestions-box");
const clearSearchBtn = document.getElementById("clear-search");
const priceInput = document.getElementById("product-price");
const priceBadge = document.getElementById("price-badge");
const incomeInput = document.getElementById("user-income");
const incomeBadge = document.getElementById("income-badge");
const expensesInput = document.getElementById("user-expenses");
const expensesBadge = document.getElementById("expenses-badge");
const savingsInput = document.getElementById("user-savings");
const savingsBadge = document.getElementById("savings-badge");
const financingToggle = document.getElementById("enable-financing");
const financingFields = document.getElementById("financing-fields");
const downPaymentInput = document.getElementById("finance-down-payment");
const downPaymentBadge = document.getElementById("down-payment-badge");
const termSelect = document.getElementById("finance-term");
const termBadge = document.getElementById("term-badge");
const aprInput = document.getElementById("finance-apr");
const aprBadge = document.getElementById("apr-badge");
const runBtn = document.getElementById("run-simulation-btn");
const popularTags = document.querySelectorAll(".tag");

// Terminal & Dashboard selectors
const terminalLogs = document.getElementById("terminal-logs");
const liveStatusBadge = document.getElementById("terminal-live-status");
const dashboardCard = document.getElementById("dashboard-card");
const scoreText = document.getElementById("score-text");
const scoreLabel = document.getElementById("score-label");
const gaugeProgress = document.getElementById("gauge-progress");
const feasibilityVerdictText = document.getElementById("feasibility-verdict-text");

// Sandbox elements
const sandboxPrice = document.getElementById("sandbox-price");
const sandboxPriceVal = document.getElementById("sandbox-price-val");
const sandboxSavings = document.getElementById("sandbox-savings");
const sandboxSavingsVal = document.getElementById("sandbox-savings-val");
const sandboxCashflow = document.getElementById("sandbox-cashflow");
const sandboxCashflowVal = document.getElementById("sandbox-cashflow-val");
const savingsRatioBar = document.getElementById("savings-ratio-bar");
const savingsRatioText = document.getElementById("savings-ratio-text");
const incomeRatioBar = document.getElementById("income-ratio-bar");
const incomeRatioText = document.getElementById("income-ratio-text");

// Dashboard headers
const dashProductName = document.getElementById("dash-product-name");
const dashProductPriceBadge = document.getElementById("dash-product-price-badge");

// Tab Selectors
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

// 4. Initialization & Event Listeners
document.addEventListener("DOMContentLoaded", () => {
    updateBadgeLabels();
    setupAutocomplete();
    
    // Bind slider inputs
    incomeInput.addEventListener("input", handleInputChange);
    expensesInput.addEventListener("input", handleInputChange);
    savingsInput.addEventListener("input", handleInputChange);
    priceInput.addEventListener("input", handleInputChange);
    downPaymentInput.addEventListener("input", handleInputChange);
    termSelect.addEventListener("change", handleInputChange);
    aprInput.addEventListener("input", handleInputChange);
    
    financingToggle.addEventListener("change", (e) => {
        profileData.financing = e.target.checked;
        financingFields.style.display = profileData.financing ? "block" : "none";
        // Reset downpayment default to 15% of product price
        if (profileData.financing) {
            const defaultDown = Math.round(profileData.price * 0.15);
            downPaymentInput.value = defaultDown;
            profileData.downPayment = defaultDown;
            downPaymentBadge.textContent = `$${defaultDown.toLocaleString()}`;
        }
        recalculateFormRanges();
    });

    // Tag Clicks
    popularTags.forEach(tag => {
        tag.addEventListener("click", () => {
            searchInput.value = tag.getAttribute("data-val");
            selectProduct(tag.getAttribute("data-val").toLowerCase());
            clearSearchBtn.style.display = "block";
        });
    });

    // Clear search
    clearSearchBtn.addEventListener("click", () => {
        searchInput.value = "";
        clearSearchBtn.style.display = "none";
        suggestionsBox.style.display = "none";
    });

    // Run Simulation
    runBtn.addEventListener("click", triggerAgentSimulation);

    // Sandbox adjustments
    sandboxPrice.addEventListener("input", handleSandboxChange);
    sandboxSavings.addEventListener("input", handleSandboxChange);
    sandboxCashflow.addEventListener("input", handleSandboxChange);

    // Tab buttons
    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            tabContents.forEach(c => c.classList.remove("active"));
            
            btn.classList.add("active");
            document.getElementById(btn.getAttribute("data-tab")).classList.add("active");
        });
    });
});

// Update label bubbles next to ranges
function updateBadgeLabels() {
    priceBadge.textContent = `$${parseInt(priceInput.value).toLocaleString()}`;
    incomeBadge.textContent = `$${parseInt(incomeInput.value).toLocaleString()}`;
    expensesBadge.textContent = `$${parseInt(expensesInput.value).toLocaleString()}`;
    savingsBadge.textContent = `$${parseInt(savingsInput.value).toLocaleString()}`;
    downPaymentBadge.textContent = `$${parseInt(downPaymentInput.value).toLocaleString()}`;
    termBadge.textContent = `${termSelect.value} mo`;
    aprBadge.textContent = `${parseFloat(aprInput.value)}%`;
}

// Adjust range bounds dynamically when values change
function recalculateFormRanges() {
    const p = parseInt(priceInput.value) || 0;
    // Downpayment cannot exceed price
    downPaymentInput.max = p;
    if (parseInt(downPaymentInput.value) > p) {
        downPaymentInput.value = p;
    }
    updateBadgeLabels();
}

function handleInputChange(e) {
    profileData.price = parseInt(priceInput.value) || 0;
    profileData.income = parseInt(incomeInput.value) || 0;
    profileData.expenses = parseInt(expensesInput.value) || 0;
    profileData.savings = parseInt(savingsInput.value) || 0;
    profileData.downPayment = parseInt(downPaymentInput.value) || 0;
    profileData.term = parseInt(termSelect.value) || 12;
    profileData.apr = parseFloat(aprInput.value) || 0;
    
    recalculateFormRanges();
    updateBadgeLabels();
}

// Autocomplete suggestions for input
function setupAutocomplete() {
    searchInput.addEventListener("input", () => {
        const val = searchInput.value.toLowerCase().trim();
        suggestionsBox.innerHTML = "";
        
        if (!val) {
            suggestionsBox.style.display = "none";
            clearSearchBtn.style.display = "none";
            return;
        }

        clearSearchBtn.style.display = "block";
        const keys = Object.keys(productDatabase);
        const filtered = keys.filter(k => k.includes(val));

        if (filtered.length > 0) {
            filtered.forEach(key => {
                const prod = productDatabase[key];
                const item = document.createElement("div");
                item.className = "suggestion-item";
                item.innerHTML = `
                    <span class="item-name">${prod.name}</span>
                    <span class="item-price">$${prod.price.toLocaleString()}</span>
                `;
                item.addEventListener("click", () => {
                    searchInput.value = prod.name;
                    selectProduct(key);
                    suggestionsBox.style.display = "none";
                });
                suggestionsBox.appendChild(item);
            });
            suggestionsBox.style.display = "block";
        } else {
            suggestionsBox.style.display = "none";
        }
    });

    // Close suggestion box if clicked outside
    document.addEventListener("click", (e) => {
        if (e.target !== searchInput && e.target !== suggestionsBox) {
            suggestionsBox.style.display = "none";
        }
    });
}

function selectProduct(key) {
    const prod = productDatabase[key];
    if (prod) {
        currentProduct = prod;
        priceInput.value = prod.price;
        profileData.price = prod.price;
        recalculateFormRanges();
    }
}

// 5. Multi-Agent Dialogue Simulation Engine
function triggerAgentSimulation() {
    // Determine the product configuration
    const query = searchInput.value.trim();
    if (!query) {
        alert("Please enter a product search query first!");
        searchInput.focus();
        return;
    }

    const price = parseInt(priceInput.value) || 100;
    
    // Check if the query matches database, else generate dynamic
    const matchedKey = Object.keys(productDatabase).find(k => k === query.toLowerCase() || productDatabase[k].name.toLowerCase() === query.toLowerCase());
    if (matchedKey) {
        currentProduct = productDatabase[matchedKey];
    } else {
        currentProduct = generateFallbackProduct(query, price);
    }
    
    // Sync current price in profile
    profileData.price = currentProduct.price;

    // Lock UI and show loader
    runBtn.disabled = true;
    runBtn.querySelector(".btn-icon-spin").style.display = "inline-block";
    liveStatusBadge.classList.remove("hidden");
    dashboardCard.classList.add("hidden");

    // Clear logs
    terminalLogs.innerHTML = `
        <div class="system-msg">
            <span class="prompt">$</span> deploy_consensus_protocol --target="${currentProduct.name}" --cost=${currentProduct.price}
        </div>
    `;

    // Agent conversation timestamps
    const scoutNode = document.getElementById("avatar-scout");
    const advisorNode = document.getElementById("avatar-advisor");
    const altNode = document.getElementById("avatar-alternatives");
    const negNode = document.getElementById("avatar-negotiator");

    // Clear avatar visual states
    [scoutNode, advisorNode, altNode, negNode].forEach(node => node.className = "agent-avatar");

    // Sequence execution
    setTimeout(() => {
        scoutNode.classList.add("thinking");
        addTerminalMessage("system-update", "Consensus", "Deploying specialized sub-agents into workspace environment.");
    }, 400);

    // --- SCOUT STEP ---
    setTimeout(() => {
        scoutNode.classList.remove("thinking");
        scoutNode.classList.add("talking");
        
        const accessorySum = currentProduct.scoutCosts.reduce((sum, item) => sum + item.cost, 0);
        const text = `Analyzing transaction structure for "${currentProduct.name}". MSRP is $${currentProduct.price.toLocaleString()}. Found localized tax/setup charges of $${accessorySum.toLocaleString()} (including: ${currentProduct.scoutCosts.map(c => `${c.name}: $${c.cost}`).join(', ')}). Year-one maintenance baseline projected at $${(currentProduct.recurringCosts[0]?.cost || 0).toLocaleString()}. Relaying telemetry to Advisor.`;
        
        addTerminalMessage("scout", "Scout Agent [Retrieval]", text);
    }, 1800);

    // --- ADVISOR STEP ---
    setTimeout(() => {
        scoutNode.classList.remove("talking");
        advisorNode.classList.add("thinking");
    }, 3800);

    setTimeout(() => {
        advisorNode.classList.remove("thinking");
        advisorNode.classList.add("talking");
        
        const netCashflow = profileData.income - profileData.expenses;
        let response = "";
        
        if (profileData.financing) {
            const loanAmt = Math.max(0, currentProduct.price - profileData.downPayment);
            const r = (profileData.apr / 12) / 100;
            const n = profileData.term;
            const monthlyLoan = r > 0 ? (loanAmt * r) / (1 - Math.pow(1 + r, -n)) : (loanAmt / n);
            const totalOutlay = profileData.downPayment + currentProduct.scoutCosts.reduce((sum, item) => sum + item.cost, 0);
            
            response = `Financial profile loaded. Capital expenditure using Financing. Total upfront cash required: $${Math.round(totalOutlay).toLocaleString()} (Down payment: $${profileData.downPayment.toLocaleString()} + Scout ancillary fees). Monthly payment calculated at $${Math.round(monthlyLoan).toLocaleString()}/mo over ${n} months at ${profileData.apr}% APR. Post-purchase monthly cashflow cushion will decrease from $${netCashflow.toLocaleString()} to $${Math.round(netCashflow - monthlyLoan).toLocaleString()}. Checking safety margins.`;
        } else {
            const accessorySum = currentProduct.scoutCosts.reduce((sum, item) => sum + item.cost, 0);
            const totalOutlay = currentProduct.price + accessorySum;
            const remainingSavings = profileData.savings - totalOutlay;
            
            response = `Financial profile loaded. Capital expenditure via Cash Outlay. Total cash required: $${Math.round(totalOutlay).toLocaleString()}. Remaining savings post-purchase: $${Math.round(remainingSavings).toLocaleString()}. Savings buffer depletion rate: ${Math.round((totalOutlay / profileData.savings) * 100)}%. Evaluating impact on emergency fund.`;
        }

        addTerminalMessage("advisor", "Advisor Agent [Risk Model]", response);
    }, 5300);

    // --- VALUES & ALTERNATIVES STEP ---
    setTimeout(() => {
        advisorNode.classList.remove("talking");
        altNode.classList.add("thinking");
    }, 7300);

    setTimeout(() => {
        altNode.classList.remove("thinking");
        altNode.classList.add("talking");

        const alt1 = currentProduct.alternatives[0];
        const alt2 = currentProduct.alternatives[1];
        
        const text = `Evaluating value optimization profiles. To safeguard user's balance sheet, I recommend considering: 
        1) ${alt1.name} ($${alt1.price.toLocaleString()}, saving $${alt1.savings.toLocaleString()}) which improves net viability. 
        2) ${alt2.name} ($${alt2.price.toLocaleString()}) for optimized budget-to-performance efficiency. Transmitting comparison matrices to Negotiator.`;
        
        addTerminalMessage("alternatives", "Value Agent [Substitutes]", text);
    }, 8800);

    // --- NEGOTIATOR STEP ---
    setTimeout(() => {
        altNode.classList.remove("talking");
        negNode.classList.add("thinking");
    }, 10800);

    setTimeout(() => {
        negNode.classList.remove("thinking");
        negNode.classList.add("talking");

        const text = `Market cycles analyzed. ${currentProduct.timing} Actionable discount tactics: ${currentProduct.deals.slice(0, 2).join(' ')} Initializing dashboard compilation.`;
        addTerminalMessage("negotiator", "Negotiator Agent [Deals]", text);
    }, 12300);

    // --- CONSENSUS COMPLETED ---
    setTimeout(() => {
        negNode.classList.remove("talking");
        addTerminalMessage("system-update", "Consensus", "Multi-Agent Decision Process concluded. Synchronizing state parameters. Dashboard loaded.");
        
        // Sync sandbox values with primary input for first load
        sandboxPrice.value = currentProduct.price;
        // Limit max of sandbox ranges based on profile
        sandboxPrice.max = Math.max(currentProduct.price * 2, 5000);
        if (currentProduct.price > 25000) sandboxPrice.max = 150000;
        
        sandboxSavings.value = profileData.savings;
        sandboxSavings.max = Math.max(profileData.savings * 2, 10000);
        if (profileData.savings > 40000) sandboxSavings.max = 150000;
        
        const initialCashflow = profileData.income - profileData.expenses;
        sandboxCashflow.value = initialCashflow;
        sandboxCashflow.min = -2000;
        sandboxCashflow.max = Math.max(initialCashflow * 2, 5000);
        if (initialCashflow > 5000) sandboxCashflow.max = 150000;
        
        // Render Dashboard
        renderDashboardData();
        
        // Re-enable run buttons
        runBtn.disabled = false;
        runBtn.querySelector(".btn-icon-spin").style.display = "none";
        liveStatusBadge.classList.add("hidden");
    }, 13800);
}

// Add a line inside the Console log window
function addTerminalMessage(agentClass, sender, text) {
    const msg = document.createElement("div");
    msg.className = `log-message ${agentClass}`;
    msg.innerHTML = `
        <span class="sender-tag">${sender}</span>
        <span class="msg-content">${text}</span>
    `;
    terminalLogs.appendChild(msg);
    // Auto-scroll terminal
    terminalLogs.scrollTop = terminalLogs.scrollHeight;
}

// 6. Core Dashboard Math Calculation Engine
function renderDashboardData() {
    dashboardCard.classList.remove("hidden");
    
    // Sync names
    dashProductName.textContent = currentProduct.name;
    
    // Read Sandbox values
    const currentPrice = parseInt(sandboxPrice.value) || 0;
    const currentSavings = parseInt(sandboxSavings.value) || 0;
    const currentCashflow = parseInt(sandboxCashflow.value) || 0;

    // Update Sandbox badges
    sandboxPriceVal.textContent = `$${currentPrice.toLocaleString()}`;
    sandboxSavingsVal.textContent = `$${currentSavings.toLocaleString()}`;
    sandboxCashflowVal.textContent = `$${currentCashflow.toLocaleString()}`;
    dashProductPriceBadge.textContent = `$${currentPrice.toLocaleString()}`;

    // Compute accessory charges based on current product properties but scaled to sandbox price
    const baseMSRP = currentProduct.price || 1;
    const scaleFactor = currentPrice / baseMSRP;
    
    let simulatedSetupFeeSum = 0;
    const scoutUl = document.getElementById("scout-cost-breakdown");
    scoutUl.innerHTML = "";
    
    currentProduct.scoutCosts.forEach(item => {
        const scaledCost = Math.round(item.cost * scaleFactor);
        simulatedSetupFeeSum += scaledCost;
        scoutUl.innerHTML += `
            <li>
                <span>${item.name}</span>
                <span>$${scaledCost.toLocaleString()}</span>
            </li>
        `;
    });

    const scaledRecurringCost = Math.round((currentProduct.recurringCosts[0]?.cost || 0) * scaleFactor);
    if (scaledRecurringCost > 0) {
        scoutUl.innerHTML += `
            <li>
                <span>${currentProduct.recurringCosts[0].name}</span>
                <span>$${scaledRecurringCost.toLocaleString()}</span>
            </li>
        `;
    }

    const firstYearTotal = currentPrice + simulatedSetupFeeSum + scaledRecurringCost;
    document.getElementById("scout-first-year-total").textContent = `$${firstYearTotal.toLocaleString()}`;

    // Calculations
    let upfrontOutlay = 0;
    let monthlyLoanPayment = 0;
    
    if (profileData.financing) {
        // Financed Down Payment scaled with sandbox price
        const initialDownPaymentRatio = profileData.downPayment / profileData.price;
        const currentDownPayment = Math.round(currentPrice * initialDownPaymentRatio);
        
        upfrontOutlay = currentDownPayment + simulatedSetupFeeSum;
        const loanPrincipal = Math.max(0, currentPrice - currentDownPayment);
        const r = (profileData.apr / 12) / 100;
        const n = profileData.term;
        
        monthlyLoanPayment = r > 0 ? (loanPrincipal * r) / (1 - Math.pow(1 + r, -n)) : (loanPrincipal / n);
        monthlyLoanPayment = Math.round(monthlyLoanPayment);
    } else {
        upfrontOutlay = currentPrice + simulatedSetupFeeSum;
    }

    const remainingSavings = Math.max(0, currentSavings - upfrontOutlay);
    const savingsRatio = currentSavings > 0 ? Math.round((upfrontOutlay / currentSavings) * 100) : 100;
    
    // Monthly Expenses
    const originalMonthlyExpenses = profileData.expenses;
    const newMonthlyExpenses = originalMonthlyExpenses + (profileData.financing ? monthlyLoanPayment : 0);
    const monthlyIncome = profileData.income;
    const expenseIncomeRatio = monthlyIncome > 0 ? Math.round((newMonthlyExpenses / monthlyIncome) * 100) : 100;

    // Post-purchase savings runway
    const runwayBefore = originalMonthlyExpenses > 0 ? (currentSavings / originalMonthlyExpenses).toFixed(1) : "99+";
    const runwayAfter = newMonthlyExpenses > 0 ? (remainingSavings / newMonthlyExpenses).toFixed(1) : "0";
    
    document.getElementById("runway-before").textContent = runwayBefore === "99+" ? "Infinite" : `${runwayBefore} mo`;
    document.getElementById("runway-after").textContent = runwayAfter === "0" ? "None" : `${runwayAfter} mo`;
    
    const dtiRatioVal = profileData.financing && monthlyIncome > 0 ? ((monthlyLoanPayment / monthlyIncome) * 100).toFixed(1) : "0.0";
    document.getElementById("dti-ratio").textContent = profileData.financing ? `${dtiRatioVal}%` : "N/A (Paid Cash)";

    // Run Feasibility Scoring Logic
    let score = 0;
    
    // 1. Savings Cushion Sub-Score (Weight: 40%)
    let savingsScore = 0;
    if (currentSavings >= upfrontOutlay) {
        // If leftover savings can cover at least 6 months of living expenses, max score
        const leftoverRunway = newMonthlyExpenses > 0 ? (remainingSavings / newMonthlyExpenses) : 0;
        if (leftoverRunway >= 6) {
            savingsScore = 100;
        } else if (leftoverRunway > 0) {
            savingsScore = (leftoverRunway / 6) * 100;
        }
    } else {
        savingsScore = 0; // Can't even afford upfront
    }

    // 2. Cashflow comfort Sub-Score (Weight: 40%)
    let cashflowScore = 0;
    if (profileData.financing) {
        // If loan exceeds net cashflow, major issue
        if (currentCashflow <= 0) {
            cashflowScore = 0;
        } else if (monthlyLoanPayment >= currentCashflow) {
            cashflowScore = 10;
        } else {
            // Percent of cashflow remaining
            cashflowScore = ((currentCashflow - monthlyLoanPayment) / currentCashflow) * 100;
            // Penalty for high installment to income ratio (dti > 15%)
            const dtiPct = parseFloat(dtiRatioVal);
            if (dtiPct > 15) {
                cashflowScore = Math.max(0, cashflowScore - (dtiPct - 15) * 3);
            }
        }
    } else {
        // How long to recover this cash outlay using net cashflow?
        if (currentCashflow <= 0) {
            cashflowScore = 0;
        } else {
            const monthsToRecover = upfrontOutlay / currentCashflow;
            if (monthsToRecover <= 1) {
                cashflowScore = 100;
            } else if (monthsToRecover <= 12) {
                cashflowScore = (1 - (monthsToRecover - 1) / 11) * 100;
            } else {
                cashflowScore = 10;
            }
        }
    }

    // 3. Purchase Size / Allocation Sub-Score (Weight: 20%)
    let allocationScore = 0;
    if (profileData.financing) {
        // Lower interest and downpayment relative to savings is preferred
        const loanRatio = (currentPrice - profileData.downPayment) / (currentSavings + 1);
        if (loanRatio < 0.2) {
            allocationScore = 100;
        } else if (loanRatio < 1.0) {
            allocationScore = (1 - (loanRatio - 0.2) / 0.8) * 100;
        } else {
            allocationScore = 10;
        }
    } else {
        const ratio = upfrontOutlay / (currentSavings + 1);
        if (ratio < 0.1) {
            allocationScore = 100;
        } else if (ratio < 0.7) {
            allocationScore = (1 - (ratio - 0.1) / 0.6) * 100;
        } else {
            allocationScore = 20;
        }
    }

    // Weighted Consolidated Score
    score = Math.round((savingsScore * 0.4) + (cashflowScore * 0.4) + (allocationScore * 0.2));
    score = Math.max(0, Math.min(100, score));

    // UI Updates based on final score
    scoreText.textContent = score;
    
    // Update gauge graphics
    const circumference = 251.2; // 2 * pi * r (r=40)
    const strokeDashoffset = circumference - (score / 100) * circumference;
    gaugeProgress.style.strokeDashoffset = strokeDashoffset;

    // Apply color grades based on score boundaries
    let gradeClass = "text-red";
    let scoreStatus = "Dangerous";
    let verdict = "";
    let riskRating = "F (Severe Risk)";
    let advisorNarrativeText = "";
    
    if (score >= 75) {
        gradeClass = "text-green";
        scoreStatus = "Healthy";
        gaugeProgress.style.stroke = "var(--color-safe)";
        riskRating = "A (Safe & Stable)";
        
        if (profileData.financing) {
            verdict = "This purchase is highly feasible! The monthly finance payments fit easily within your cashflow margins, and you maintain a robust savings safety cushion.";
            advisorNarrativeText = `Our simulations confirm your financial structure is extremely resilient. Financing this product yields an installment-to-income burden under 10%. Leftover net savings remain above 5 months of runway, insulating you against unexpected income shocks. The Advisor approves this purchase.`;
        } else {
            verdict = "Purchase approved! Paying cash preserves a healthy cash flow, and you will retain substantial savings to absorb future emergencies.";
            advisorNarrativeText = `A single cash layout of $${upfrontOutlay.toLocaleString()} represents a safe allocation of your savings. You retain a strong residual savings runway of ${runwayAfter} months. Because you maintain a solid baseline cash surplus, you will fully recover this expense in a short window. The Advisor approves.`;
        }
    } else if (score >= 45) {
        gradeClass = "text-orange";
        scoreStatus = "Stretch";
        gaugeProgress.style.stroke = "var(--color-stretch)";
        riskRating = "C (Moderate Caution)";
        
        if (profileData.financing) {
            verdict = "Caution advised. While you can technically afford the financing plan, it eats into a significant portion of your disposable income, reducing your saving capacity.";
            advisorNarrativeText = `Financing this item at $${monthlyLoanPayment.toLocaleString()}/mo introduces moderate structural drag. Your post-purchase savings runway is at a vulnerable ${runwayAfter} months. If your monthly expenses spike, you will have minimal margin. Consider raising your down payment to decrease monthly obligations.`;
        } else {
            verdict = "Caution: Financial stretch. Spending cash upfront will heavily deplete your accessible reserves, leaving you exposed to short-term emergency risks.";
            advisorNarrativeText = `Paying cash will consume ${savingsRatio}% of your accessible savings. Your residual emergency reserves will shrink to a modest ${runwayAfter} months. Although you do not take on debt, your balance sheet loses liqudity. Alternatives are highly recommended to balance risk.`;
        }
    } else {
        gradeClass = "text-red";
        scoreStatus = "High Risk";
        gaugeProgress.style.stroke = "var(--color-risk)";
        riskRating = "F (Extreme Warning)";
        
        if (profileData.financing) {
            verdict = "Warning: Highly illiquid position! The monthly debt service is unsustainable under your current net cashflow parameters. Do not purchase.";
            advisorNarrativeText = `Our model flags this purchase as high risk. The monthly payment of $${monthlyLoanPayment.toLocaleString()} is either larger than your net cashflow, or depletes your savings safety runway to dangerous levels (${runwayAfter} months remaining). The Advisor issues an absolute block on this configuration.`;
        } else {
            verdict = "Warning: Capital depletion! Spending cash upfront will wipe out your emergency reserves or exceeds your current savings entirely. High risk of insolvency.";
            advisorNarrativeText = `This transaction is structurally unfeasible. Buying cash requires $${upfrontOutlay.toLocaleString()}, which exceeds or completely exhaust your current savings cushion of $${currentSavings.toLocaleString()}. Doing so eliminates all financial elasticity. Value alternatives are mandatory.`;
        }
    }

    scoreLabel.className = `score-status ${gradeClass}`;
    document.getElementById("risk-rating").className = `metric-value ${gradeClass}`;
    document.getElementById("risk-rating").textContent = riskRating;
    feasibilityVerdictText.textContent = verdict;
    document.getElementById("advisor-narrative-text").textContent = advisorNarrativeText;

    // Update What-If text metrics
    savingsRatioText.textContent = `${savingsRatio}%`;
    savingsRatioBar.style.width = `${Math.min(100, savingsRatio)}%`;
    savingsRatioBar.style.backgroundColor = savingsRatio > 70 ? "var(--color-risk)" : (savingsRatio > 35 ? "var(--color-stretch)" : "var(--color-safe)");

    incomeRatioText.textContent = `${expenseIncomeRatio}%`;
    incomeRatioBar.style.width = `${Math.min(100, expenseIncomeRatio)}%`;
    incomeRatioBar.style.backgroundColor = expenseIncomeRatio > 85 ? "var(--color-risk)" : (expenseIncomeRatio > 65 ? "var(--color-stretch)" : "var(--color-safe)");

    // Update alternatives table
    renderAlternatives(currentPrice, currentSavings, currentCashflow);

    // Update negotiator tab text based on score
    document.getElementById("negotiator-timing-text").textContent = currentProduct.timing;
    const tipsUl = document.getElementById("negotiator-discounts-list");
    tipsUl.innerHTML = "";
    
    currentProduct.deals.forEach(deal => {
        tipsUl.innerHTML += `<li>${deal}</li>`;
    });
    if (score < 45) {
        tipsUl.innerHTML += `<li><strong>Crucial:</strong> Because feasibility is low, look into financing with a 0% APR promotional credit card, but ONLY if you can pay the full balance before the promo period expires.</li>`;
    }
}

// Render dynamic alternative calculations
function renderAlternatives(currentPrice, currentSavings, currentCashflow) {
    const list = document.getElementById("alternatives-suggestions-list");
    list.innerHTML = "";

    currentProduct.alternatives.forEach(alt => {
        // Calculate a simulated alternative score
        let altScore = 0;
        const altPrice = alt.price;
        
        // Scale product accessory charges
        const baseMSRP = currentProduct.price || 1;
        const setupRatio = currentProduct.scoutCosts.reduce((sum, i) => sum + i.cost, 0) / baseMSRP;
        const altSetupCosts = Math.round(altPrice * setupRatio);
        const altUpfrontOutlay = altPrice + altSetupCosts;

        // Alternative savings calculations
        let altRemainingSavings = Math.max(0, currentSavings - altUpfrontOutlay);
        
        // 1. Savings cushion
        let altSavingsScore = 0;
        if (currentSavings >= altUpfrontOutlay) {
            const altRunway = profileData.expenses > 0 ? (altRemainingSavings / profileData.expenses) : 0;
            altSavingsScore = altRunway >= 6 ? 100 : (altRunway / 6) * 100;
        }

        // 2. Cashflow comfort
        let altCashflowScore = 0;
        if (currentCashflow > 0) {
            const monthsToRecoverAlt = altUpfrontOutlay / currentCashflow;
            altCashflowScore = monthsToRecoverAlt <= 1 ? 100 : (monthsToRecoverAlt <= 12 ? (1 - (monthsToRecoverAlt - 1) / 11) * 100 : 10);
        }

        // 3. Purchase size
        const altRatio = altUpfrontOutlay / (currentSavings + 1);
        const altAllocScore = altRatio < 0.1 ? 100 : (altRatio < 0.7 ? (1 - (altRatio - 0.1) / 0.6) * 100 : 20);

        altScore = Math.round((altSavingsScore * 0.4) + (altCashflowScore * 0.4) + (altAllocScore * 0.2));
        altScore = Math.max(0, Math.min(100, altScore));

        let altGradeColor = "text-red";
        let altBadgeText = "Risky Option";
        if (altScore >= 75) {
            altGradeColor = "text-green";
            altBadgeText = "Highly Feasible";
        } else if (altScore >= 45) {
            altGradeColor = "text-orange";
            altBadgeText = "Moderate Stretch";
        }

        list.innerHTML += `
            <div class="alt-card">
                <div class="alt-info">
                    <span class="alt-name">${alt.name}</span>
                    <span class="alt-price">Est. Price: $${alt.price.toLocaleString()}</span>
                </div>
                <div class="alt-metrics">
                    <span class="alt-savings">Saves $${(currentPrice - alt.price).toLocaleString()}</span>
                    <div class="alt-score">
                        <span class="alt-score-val ${altGradeColor}">${altScore}%</span>
                        <span class="alt-score-lbl">${altBadgeText}</span>
                    </div>
                </div>
            </div>
        `;
    });
}

// 7. Sandbox Sliders Realtime Updates
function handleSandboxChange() {
    // Sync slider input changes to values
    const currentPrice = parseInt(sandboxPrice.value) || 0;
    const currentSavings = parseInt(sandboxSavings.value) || 0;
    const currentCashflow = parseInt(sandboxCashflow.value) || 0;

    sandboxPriceVal.textContent = `$${currentPrice.toLocaleString()}`;
    sandboxSavingsVal.textContent = `$${currentSavings.toLocaleString()}`;
    sandboxCashflowVal.textContent = `$${currentCashflow.toLocaleString()}`;

    // Recalculate dashboard in real time
    renderDashboardData();
}
