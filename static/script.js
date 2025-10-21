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

// Initial calculation
calculateTithe();