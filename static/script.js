document.getElementById('offeringAmount').addEventListener('input', calculateTithe);
document.getElementById('incomeAmount').addEventListener('input', calculateTithe);

// Add listeners to all radio buttons
document.querySelectorAll('input[name="offeringFreq"]').forEach(radio => {
    radio.addEventListener('change', calculateTithe);
});
document.querySelectorAll('input[name="incomeFreq"]').forEach(radio => {
    radio.addEventListener('change', calculateTithe);
});

function getFrequencyLabel(frequency) {
    const labels = {
        52: 'week',
        26: 'bi-weekly period',
        12: 'month',
        1: 'year'
    };
    return labels[frequency] || 'period';
}

function calculateTithe() {
    const offeringAmount = parseFloat(document.getElementById('offeringAmount').value) || 0;
    const incomeAmount = parseFloat(document.getElementById('incomeAmount').value) || 0;
    
    const offeringFreq = parseFloat(document.querySelector('input[name="offeringFreq"]:checked').value);
    const incomeFreq = parseFloat(document.querySelector('input[name="incomeFreq"]:checked').value);
    
    const annualOffering = offeringAmount * offeringFreq;
    const annualIncome = incomeAmount * incomeFreq;
    
    updateSummary(annualOffering, annualIncome);
    
    if (annualIncome === 0) {
        document.getElementById('currentPercent').textContent = '0%';
        document.getElementById('increaseOptions').innerHTML = '';
        return;
    }
    
    const currentPercent = (annualOffering / annualIncome) * 100;
    document.getElementById('currentPercent').textContent = currentPercent.toFixed(2) + '%';
    
    const frequencyLabel = getFrequencyLabel(offeringFreq);
    const increaseOptionsDiv = document.getElementById('increaseOptions');
    increaseOptionsDiv.innerHTML = '';
    
    for (let i = 1; i <= 5; i++) {
        const newPercent = currentPercent + i;
        const newAnnualGiving = (newPercent / 100) * annualIncome;
        const newAmountInFreq = newAnnualGiving / offeringFreq;
        const increaseInFreq = newAmountInFreq - offeringAmount;
        
        const optionDiv = document.createElement('div');
        optionDiv.className = 'increase-option';
        optionDiv.innerHTML = `
            <div class="increase-left">
                <div class="increase-label">+${i}% INCREASE</div>
                <div class="increase-amount">$${newAmountInFreq.toFixed(2)}</div>
                <div class="increase-frequency">per ${frequencyLabel}</div>
                <div class="increase-delta">+$${increaseInFreq.toFixed(2)} more than current</div>
            </div>
            <div class="increase-right">
                <div class="increase-percent">${newPercent.toFixed(1)}%</div>
                <div class="increase-annual">of annual income</div>
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