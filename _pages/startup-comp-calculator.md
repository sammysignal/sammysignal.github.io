---
layout: empty
permalink: /startup-comp-calculator/
title: Startup Compensation Calculator
---

{::nomarkdown}

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Startup Compensation Calculator</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; max-width: 900px; }
        input { margin: 5px 0; width: 200px; }
        table { border-collapse: collapse; margin-top: 20px; width: 100%; }
        td, th { border: 1px solid #999; padding: 8px; text-align: center; }
        .description { font-size: 0.9em; color: #555; margin-bottom: 20px; }
        label { font-weight: bold; }
        .total-col { background-color: #f0f8ff; }  /* light blue for totals */
        .annual-col { background-color: #f9f9f9; } /* light gray for annualized */
        .graph-container { margin-top: 40px; height: 400px; }
    </style>
</head>
<body>

<h1>Startup Compensation Calculator</h1>

<p class="description">
    This tool estimates startup compensation packages, balancing cash and stock options to match a target total compensation.
    Equity is modeled over a 4-year vesting schedule (1-year cliff assumed).
</p>

<div>
    <h3>Enter Inputs:</h3>

    <label>Target Total Compensation (Annual $)</label><br>
    <input type="number" id="targetComp" />
    <div class="description">The total annual compensation you're targeting (salary + equity).</div>

    <label>Total Company Shares (Fully Diluted)</label><br>
    <input type="number" id="totalShares" />
    <div class="description">Total fully diluted shares of the company (including options, preferred stock, etc).</div>

    <label>Expected Average Valuation ($)</label><br>
    <input type="number" id="valuation" />
    <div class="description">Estimate of the company's average valuation over the vesting period (blended midpoint of current & future value).</div>

    <label>Strike Price ($ per share)</label><br>
    <input type="number" id="strikePrice" />
    <div class="description">The strike price of the stock options (per share).</div>

    <button onclick="calculate()">Calculate Packages</button>

</div>

<div id="results"></div>

<script>
function calculate() {
    const targetComp = parseFloat(document.getElementById("targetComp").value);
    const totalShares = parseFloat(document.getElementById("totalShares").value);
    const valuation = parseFloat(document.getElementById("valuation").value);
    const strikePrice = parseFloat(document.getElementById("strikePrice").value);

    if (isNaN(targetComp) || isNaN(totalShares) || isNaN(valuation) || isNaN(strikePrice)) {
        alert("Please enter all inputs.");
        return;
    }

    const pricePerShare = valuation / totalShares;

    let html = `
    <h3>Compensation Packages</h3>
    <p class="description">
        Columns highlighted in <span style="background-color:#f0f8ff;">blue</span> are totals over 4 years.
        Columns highlighted in <span style="background-color:#f9f9f9;">gray</span> are annualized values.
    </p>
    <table>
    <tr>
        <th class="total-col">Ownership %<br>(Total 4 Years)</th>
        <th class="total-col">Total Options<br>(Total 4 Years)</th>
        <th class="annual-col">Options Vested Per Year</th>
        <th class="annual-col">Equity Value<br>(Annualized)</th>
        <th class="annual-col">Cash Compensation<br>(Annual)</th>
    </tr>`;

    for (let pct = 0.1; pct <= 1.01; pct += 0.1) {
        const ownershipPct = pct;
        const numOptions = (ownershipPct / 100) * totalShares;
        const optionsPerYear = numOptions / 4;
        const optionValue = ((pricePerShare - strikePrice) * optionsPerYear);
        const cashComp = targetComp - optionValue;

        html += `<tr>
                    <td class="total-col">${ownershipPct.toFixed(2)}%</td>
                    <td class="total-col">${numOptions.toLocaleString(undefined, {maximumFractionDigits: 0})}</td>
                    <td class="annual-col">${optionsPerYear.toLocaleString(undefined, {maximumFractionDigits: 0})}</td>
                    <td class="annual-col">$${optionValue.toLocaleString(undefined, {maximumFractionDigits: 0})}</td>
                    <td class="annual-col">$${cashComp.toLocaleString(undefined, {maximumFractionDigits: 0})}</td>
                 </tr>`;
    }
    html += "</table>";

    // Add equity value projection graph
    html += `
    <div class="graph-container">
        <h3>Equity Value Projection</h3>
        <p class="description">
            This graph shows how the value of your equity changes with different company valuations,
            accounting for dilution over time. The lines represent different ownership percentages.
            <br><br>
            <strong>Dilution Assumptions:</strong>
            <ul>
                <li>Assumes 20% total dilution over 4 years from future funding rounds</li>
                <li>Dilution is applied uniformly across all ownership percentages</li>
                <li>Strike price remains constant (not adjusted for dilution)</li>
            </ul>
            Note: Actual dilution may vary significantly based on company performance, funding needs, and market conditions.
        </p>
        <canvas id="equityValueChart"></canvas>
    </div>`;

    document.getElementById("results").innerHTML = html;

    // Create the equity value projection chart
    const ctx = document.getElementById('equityValueChart').getContext('2d');
    const ownershipPercentages = Array.from({length: 10}, (_, i) => 0.1 + i * 0.1);

    // Create linear scale from 5M to 1B
    const minVal = 5e6;  // 5M
    const maxVal = 1e9;  // 1B
    const numPoints = 10;
    const step = (maxVal - minVal) / (numPoints - 1);
    const valuations = Array.from({length: numPoints}, (_, i) => minVal + i * step);

    const datasets = ownershipPercentages.map((pct, index) => {
        const numOptions = (pct / 100) * totalShares;
        const values = valuations.map(v => {
            const dilutedPricePerShare = v / (totalShares * 1.2); // Assuming 20% dilution over 4 years
            return ((dilutedPricePerShare - strikePrice) * numOptions);
        });

        return {
            label: `${pct}% Ownership`,
            data: values,
            borderColor: `hsl(${index * 36}, 70%, 50%)`,
            fill: false,
            tension: 0.1
        };
    });

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: valuations.map(v => {
                if (v >= 1e9) return `$${(v/1e9).toFixed(1)}B`;
                return `$${(v/1e6).toFixed(1)}M`;
            }),
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Equity Value vs Company Valuation'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.dataset.label}: $${context.raw.toLocaleString(undefined, {maximumFractionDigits: 0})}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Company Valuation'
                    },
                    ticks: {
                        callback: function(value) {
                            const val = valuations[value];
                            if (val >= 1e9) return `$${(val/1e9).toFixed(1)}B`;
                            return `$${(val/1e6).toFixed(1)}M`;
                        }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Equity Value ($)'
                    },
                    ticks: {
                        callback: function(value) {
                            if (value >= 1e9) return `$${(value/1e9).toFixed(1)}B`;
                            return `$${(value/1e6).toFixed(1)}M`;
                        }
                    }
                }
            }
        }
    });
}
</script>

</body>
</html>

{:/}
