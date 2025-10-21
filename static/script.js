// Comparison tiers for practical comparisons
const comparisonTiers = {
    5: ["A specialty coffee", "A breakfast sandwich", "A craft beer"],
    10: ["A fast food meal", "A lunch special", "Two gallons of milk"],
    15: ["A Chipotle meal", "A large pizza", "Takeout lunch"],
    20: ["A movie ticket", "A paperback book", "A tank fill-up (partial)"],
    25: ["A month of Netflix", "A bouquet of flowers", "Premium car wash"],
    30: ["Half a tank of gas", "A basic haircut", "Phone data add-on"],
    35: ["Dinner at a casual restaurant", "A concert lawn ticket", "Kitchen gadget"],
    40: ["A nice restaurant meal", "Monthly gym membership", "Portion of electric bill"],
    45: ["Family dinner out", "Date night", "Partial week of groceries"]
};

document.getElementById('offeringAmount').addEventListener('input', calculateTithe);
document.getElementById('incomeAmount').addEventListener('input', calculateTithe);

// Add listeners to all radio buttons
document.querySelectorAll('input[name="offeringFreq"]').forEach(radio => {
    radio.addEventListener('change', calculateTithe);
});
document.querySelectorAll('input[name="incomeFreq"]').forEach(radio => {
    radio.addEventListener('change', calculateTithe);
});

function calculateTithe() {
    const offeringAmount = parseFloat(document.getElementById('offeringAmount').value) || 0;
    const incomeAmount = parseFloat(document.getElementById('incomeAmount').value) || 0;
    
    const offeringFreq = parseFloat(document.querySelector('input[name="offeringFreq"]:checked').value);
    const incomeFreq = parseFloat(document.querySelector('input[name="incomeFreq"]:checked').value);
    
    const annualOffering = offeringAmount * offeringFreq;
    const annualIncome = incomeAmount * incomeFreq;
    
    // Update summary section
    updateSummary(annualOffering, annualIncome);
    
    if (annualIncome === 0) {
        document.getElementById('currentPercent').textContent = '0%';
        document.getElementById('increaseOptions').innerHTML = '';
        return;
    }
    
    const currentPercent = (annualOffering / annualIncome) * 100;
    document.getElementById('currentPercent').textContent = currentPercent.toFixed(2) + '%';
    
    // Generate increase options
    const increaseOptionsDiv = document.getElementById('increaseOptions');
    increaseOptionsDiv.innerHTML = '';
    
    for (let i = 1; i <= 5; i++) {
        const newPercent = currentPercent + i;
        const newAnnualGiving = (newPercent / 100) * annualIncome;
        const newWeeklyGiving = newAnnualGiving / 52;
        const weeklyIncrease = newWeeklyGiving - (annualOffering / 52);
        
        // Round down to nearest $5 for comparison
        const roundedIncrease = Math.floor(weeklyIncrease / 5) * 5;
        const comparison = getRandomComparison(roundedIncrease);
        
        const optionDiv = document.createElement('div');
        optionDiv.className = 'increase-option';
        optionDiv.innerHTML = `
            <div class="increase-header">
                <span class="increase-label">+${i}%</span>
                <span class="increase-target">${newPercent.toFixed(2)}% total</span>
            </div>
            <div class="increase-details">
                <span class="weekly-amount">$${newWeeklyGiving.toFixed(2)}/week</span>
                <span class="weekly-increase">(+$${weeklyIncrease.toFixed(2)}/week)</span>
            </div>
            ${comparison ? `<div class="comparison-text">Like ${comparison}</div>` : ''}
        `;
        increaseOptionsDiv.appendChild(optionDiv);
    }
}

function updateSummary(annualOffering, annualIncome) {
    // Update giving summary
    document.getElementById('annualGiving').textContent = '$' + annualOffering.toFixed(2);
    document.getElementById('monthlyGiving').textContent = '$' + (annualOffering / 12).toFixed(2);
    document.getElementById('weeklyGiving').textContent = '$' + (annualOffering / 52).toFixed(2);
    
    // Update income summary
    document.getElementById('annualIncome').textContent = '$' + annualIncome.toFixed(2);
    document.getElementById('monthlyIncome').textContent = '$' + (annualIncome / 12).toFixed(2);
    document.getElementById('weeklyIncome').textContent = '$' + (annualIncome / 52).toFixed(2);
}

function getRandomComparison(roundedAmount) {
    // Find the appropriate tier
    let tierAmount = 5;
    for (const amount in comparisonTiers) {
        if (roundedAmount >= parseInt(amount)) {
            tierAmount = parseInt(amount);
        }
    }
    
    // For amounts $45+, use the $45 tier
    if (roundedAmount >= 45) {
        tierAmount = 45;
    }
    
    const comparisons = comparisonTiers[tierAmount];
    if (comparisons && comparisons.length > 0) {
        return comparisons[Math.floor(Math.random() * comparisons.length)];
    }
    
    return null;
}

// Initial calculation
calculateTithe();